import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BadRequestError, ConflictError, DefaultError, NotFoundError, ServerError, UnprocessableEntityError } from "../_services/errors";
import { SuccessCreate, SuccessResponse } from "../_services/successfulResponses";
import { UserSchema } from "@/validations/userSchema";
import { ZodError } from "zod";
import { BetSchema } from "@/validations/betSchema";
import Error from "next/error";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {

    const bets = await prisma.bet.findMany({
        include: {
            userInfo: true,
        },
    });

    const betsWithPredictions = await Promise.all(
        bets.map(async (bet) => {
            const predictions = await prisma.prediction.findMany({
                where: {
                    id: {
                        in: bet.predictionIds,
                    },
                },
            });
            return {
                ...bet,
                predictions: predictions,
            };
        })
    );

    if (betsWithPredictions) {
        return SuccessResponse(betsWithPredictions);
    }
    return NotFoundError();
}



export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        // 1. Validar los datos de la apuesta 
        const validatedBetData = BetSchema.parse(data);

        // 2. Crear las Predictions
        const createdPredictions = await Promise.all(
            validatedBetData.predictions.map(async (prediction, index) => {
                return prisma.prediction.create({
                    data: {
                        prediction: prediction,
                        matchNumber: index,
                        id: randomUUID()
                    },
                });
            })
        );

        // 3. Obtener los IDs de las Predictions creadas
        const predictionIds = createdPredictions.map((prediction) => prediction.id);
        const { predictions, ...betDataWithoutPredictions } = validatedBetData;

        // 4. Crear la Bet con los predictionIds
        const newBet = await prisma.bet.create({
            data: {
                ...betDataWithoutPredictions,
                paid: false,
                userInfoId: betDataWithoutPredictions.uid,
                predictionIds: predictionIds,
            }, include: { userInfo: true }
        });
        if (newBet) {
            return SuccessCreate(newBet);
        }
        return DefaultError("Error al crear el registro");

    } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError) {
            return BadRequestError();
        }
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return ConflictError();
            }
        }
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        return ServerError();
    }
}

