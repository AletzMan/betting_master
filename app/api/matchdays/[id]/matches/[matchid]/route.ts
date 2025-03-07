import { ConflictError, NotFoundError, ServerError, UnprocessableEntityError } from "@/api/_services/errors";
import { SuccessDelete, SuccessResponse, SuccessUpdate } from "@/api/_services/successfulResponses";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { MatchUpdateSchema } from "@/validations/matchUpdateSchema";

export async function GET(request: NextRequest, { params }: { params: Promise<{ matchid: string }> }) {
    try {
        const id = (await params).matchid
        const response = await prisma?.match.findUnique({ where: { id: id } })

        if (response) {
            return SuccessResponse(response);
        }
        return NotFoundError();
    } catch (error) {
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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ matchid: string, id: string }> }) {
    try {
        const data = await request.json()
        const updateMatch = await MatchUpdateSchema.parseAsync(data)
        const matchid = (await params).matchid
        const id = Number((await params).id)
        const response = await prisma?.match.update({
            where: { id: matchid, AND: { matchDay: id } },
            data: {
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
        console.log(error)
        return ServerError();
    }

}