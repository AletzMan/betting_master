import { NextRequest } from "next/server";
import { SuccessDelete, SuccessResponse, SuccessUpdate } from "../../_services/successfulResponses";
import { ConflictError, NotFoundError, ServerError, UnprocessableEntityError } from "../../_services/errors";
import { UserSchema } from "@/validations/userSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export async function GET(request: NextRequest, context: any) {
    try {

        const { id } = context.params

        const response = await prisma?.user.findMany({ where: { id: id } })

        if (response) {
            return SuccessResponse(response[0]);
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}

export async function DELETE(request: NextRequest, context: any) {
    try {

        const { id } = context.params

        const response = await prisma?.user.delete({ where: { id: id } })

        if (response) {
            return SuccessDelete();
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}

export async function PUT(request: NextRequest, context: any) {
    try {
        const data = await request.json()
        const newUser = await UserSchema.parseAsync(data)
        const { id } = context.params

        const response = await prisma?.user.update({
            where: { id: id }, data: {
                ...newUser
            }
        })

        if (response) {
            return SuccessUpdate(response);
        }
        return NotFoundError();
    } catch (error) {
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