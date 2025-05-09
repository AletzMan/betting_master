import { ConflictError, NotFoundError, ServerError, UnprocessableEntityError } from "@/api/_services/errors";
import { SuccessDelete, SuccessResponse, SuccessUpdate } from "@/api/_services/successfulResponses";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { MatchUpdateSchema } from "@/validations/matchUpdateSchema";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        // 1. Obtener la MatchDay por su ID
        const matchDay = await prisma.matchDay.findUnique({
            where: { id: parseInt(id) },
        });

        if (!matchDay) {
            return NotFoundError(); // MatchDay no encontrada
        }

        const sortBy = request.nextUrl.searchParams.get("sortBy");
        const sortOrder = request.nextUrl.searchParams.get("sortOrder");

        // 2. Crear objeto orderBy
        let orderBy = {};
        if (sortBy && sortOrder) {
            orderBy = {
                [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc",
            };
        }

        // 2. Obtener los partidos por sus IDs
        const matches = await prisma.match.findMany({
            where: {
                id: {
                    in: matchDay.matches, // Usar el array de IDs de Match
                },
            },
            orderBy: orderBy, // Usar orderBy
        });

        if (matches && matches.length > 0) {
            return SuccessResponse(matches); // Devolver los objetos Match completos
        }
        return NotFoundError();
    } catch (error) {
        console.error(error)
        return ServerError();
    }

}

export async function DELETE(request: NextRequest, context: any) {
    try {

        const { id } = context.params

        const response = await prisma?.match.delete({ where: { id: id } })

        if (response) {
            return SuccessDelete(response);
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const data = await request.json()
        const updateMatch = await MatchUpdateSchema.parseAsync(data)
        const id = (await params).id

        const response = await prisma?.match.update({
            where: { id: id }, data: {
                ...updateMatch
            }
        })

        if (response) {
            return SuccessUpdate(response);
        }
        return NotFoundError();
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NotFoundError();
            }
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