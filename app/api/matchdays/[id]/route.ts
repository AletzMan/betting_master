import { NextRequest } from "next/server";
import { SuccessDelete, SuccessResponse, SuccessUpdate } from "../../_services/successfulResponses";
import { ConflictError, NotFoundError, ServerError, UnprocessableEntityError } from "../../_services/errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { MatchDayPatchSchema } from "@/validations/matchDayPatchSchema";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {


        const id = (await params).id
        const response = await prisma?.matchDay.findMany({ where: { id: Number(id) } })

        if (response && response?.length > 0) {
            return SuccessResponse(response[0]);
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const id = (await params).id

        const response = await prisma?.matchDay.delete({ where: { id: Number(id) } })

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
        const updateMatchDay = await MatchDayPatchSchema.parseAsync(data)
        const id = (await params).id

        const response = await prisma?.matchDay.update({
            where: { id: Number(id) }, data: {
                ...updateMatchDay
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
        console.error(error)
        return ServerError();
    }
}