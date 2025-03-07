import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConflictError, DefaultError, NotFoundError, ServerError, UnprocessableEntityError } from "../_services/errors";
import { SuccessCreate, SuccessDelete, SuccessResponse } from "../_services/successfulResponses";
import { ZodError } from "zod";
import { MatchDaySchema } from "@/validations/matchDaySchema";

export async function GET(request: NextRequest) {

    const response = await prisma?.matchDay.findMany({ include: { matchesRel: true, bets: { include: { userInfo: true, predictions: true } } } })
    return SuccessResponse(response);
}

export async function POST(request: NextRequest) {
    try {

        const data = await request.json();
        const newMatchData = await MatchDaySchema.parseAsync(data);
        const day = newMatchData.day;
        const matches = newMatchData.matches;
        // 1. Crear MatchDay primero
        const newMatchDay = await prisma.matchDay.create({
            data: {
                season: newMatchData.season,
                day: newMatchData.day,
            },
        });

        if (!newMatchDay) {
            return DefaultError("Error al crear MatchDay");
        }

        // 2. Crear Matches después de MatchDay
        const createdMatches = await Promise.all(
            newMatchData.matches.map(async (match) => {
                return prisma.match.create({
                    data: {
                        matchDay: day,
                        homeTeam: match.homeTeam,
                        awayTeam: match.awayTeam,
                        status: match.status,
                        startDate: match.startDate,
                    },
                });
            })
        );

        if (createdMatches) {
            // 3. Actualizar MatchDay con los IDs de los partidos creados
            const matchIds = createdMatches.map((match) => match?.id);
            await prisma.matchDay.update({
                where: {
                    id: newMatchDay.id,
                },
                data: {
                    matches: matchIds as string[],
                },
            });
            return SuccessCreate(newMatchDay);
        }
        return DefaultError("Error al crear el registro");

    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Error de tipo:", error.message);
            // ... manejar error de tipo ...
        }
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return ConflictError();
            }
        }
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.log(error);
        return ServerError();
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const matchday = await prisma.matchDay.deleteMany()


        if (matchday.count > 0) {
            return SuccessDelete(matchday);
        } else {
            return NotFoundError();
        }
    } catch (error) {
        return ServerError()
    }
}
