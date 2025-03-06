import { NextRequest } from "next/server";
import { SuccessDelete, SuccessResponse, SuccessUpdate } from "@/api/_services/successfulResponses";
import { ConflictError, NotFoundError, ServerError, UnprocessableEntityError } from "@/api/_services/errors";
import { BetUpdateSchema } from "@/validations/betUpdateSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const id = (await params).id

        const response = await prisma?.bet.findMany({
            where: { id: id }, include: {
                userInfo: true,
            },
        })

        if (response) {
            return SuccessResponse(response[0]);
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const id = (await params).id
        const data = await request.json()
        const updateMatchDay = await BetUpdateSchema.parseAsync(data)

        const response = await prisma?.bet.update({
            where: { id: id },
            data: {
                paid: updateMatchDay.paid
            }, include: {
                userInfo: true,
            },
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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const id = (await params).id

        const response = await prisma?.bet.delete({
            where: { id: id }, include: {
                userInfo: true,
            },
        })

        if (response) {
            return SuccessDelete();
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}
