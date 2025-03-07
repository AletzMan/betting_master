import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BadRequestError, ConflictError, DefaultError, NotFoundError, ServerError, UnprocessableEntityError } from "../_services/errors";
import { SuccessCreate, SuccessDelete, SuccessResponse } from "../_services/successfulResponses";
import { ZodError } from "zod";
import { BetSchema } from "@/validations/betSchema";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {
    try {
        const bets = await prisma.bet.findMany({
            include: {
                userInfo: true,
                predictions: true, // Incluir las predicciones relacionadas
            },
        });

        if (bets) {
            return SuccessResponse(bets);
        }
        return NotFoundError();
    } catch (error) {
        console.error("Error al obtener las apuestas:", error);
        return ServerError();
    }
}


export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const validatedBetData = BetSchema.parse(data);

        const createdPredictions = await Promise.all(
            validatedBetData.predictions.map(async (prediction, index) => {
                return prisma.prediction.create({
                    data: {
                        prediction: prediction,
                        matchNumber: index,
                        id: randomUUID(),
                    },
                });
            })
        );

        const { predictions, ...betDataWithoutPredictions } = validatedBetData;

        const newBet = await prisma.bet.create({
            data: {
                ...betDataWithoutPredictions,
                paid: false,
                predictions: {
                    connect: createdPredictions.map((prediction) => ({ id: prediction.id })),
                },
            },
            include: { userInfo: true },
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

export async function DELETE(request: NextRequest) {
    try {
        const bets = await prisma.bet.deleteMany()
        const predictions = await prisma.prediction.deleteMany()

        if (bets.count > 0 && predictions.count > 0) {
            return SuccessDelete(bets);
        } else {
            return NotFoundError();
        }
    } catch (error) {
        return ServerError()
    }
}
