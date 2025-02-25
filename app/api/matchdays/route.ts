import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConflictError, DefaultError, ServerError, UnprocessableEntityError } from "../_services/errors";
import { SuccessCreate, SuccessResponse } from "../_services/successfulResponses";
import { UserSchema } from "@/validations/userSchema";
import { ZodError } from "zod";
import { MatchDaySchema } from "@/validations/matchDaySchema";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {

    const response = await prisma?.matchDay.findMany()

    return SuccessResponse(response);
}

export async function POST(request: NextRequest) {
    try {

        const data = await request.json();
        const newMatchData = await MatchDaySchema.parseAsync(data);
        const day = newMatchData.day;
        const matches = newMatchData.matches;

        // 1. Crear los partidos
        const createdMatches = await Promise.all(
            matches.map(async (match) => {
                return prisma.match.create({
                    data: {
                        matchDay: day,
                        homeTeam: match.homeTeam,
                        awayTeam: match.awayTeam,
                    },
                });
            })
        );

        // 2. Obtener los IDs de los partidos creados
        const matchIds = createdMatches.map((match) => match.id);

        // 3. Crear la MatchDay con los IDs de los partidos
        const newMatchDay = await prisma.matchDay.create({
            data: {
                name: newMatchData.name,
                season: newMatchData.season,
                matches: matchIds,
                day: newMatchData.day
            },
        });

        if (newMatchDay) {
            return SuccessCreate(newMatchDay);
        }
        return DefaultError("Error al crear el registro");

    } catch (error) {
        console.log(error);
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

