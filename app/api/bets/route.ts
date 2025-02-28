import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConflictError, DefaultError, NotFoundError, ServerError, UnprocessableEntityError } from "../_services/errors";
import { SuccessCreate, SuccessResponse } from "../_services/successfulResponses";
import { UserSchema } from "@/validations/userSchema";
import { ZodError } from "zod";
import { BetSchema } from "@/validations/betSchema";

export async function GET(request: NextRequest) {

    const response = await prisma?.bet.findMany()

    if (response) {
        return SuccessResponse(response);
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
            validatedBetData.predictions.map(async (prediction) => {
                return prisma.prediction.create({
                    data: {
                        prediction: prediction,
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
                predictionIds: predictionIds,
            },
        });
        if (newBet) {
            return SuccessCreate(newBet);
        }
        return DefaultError("Error al crear el registro");

    } catch (error) {
        console.error(error);
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

