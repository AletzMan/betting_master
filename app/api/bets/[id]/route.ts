import { NextRequest } from "next/server";
import { SuccessDelete, SuccessResponse } from "@/api/_services/successfulResponses";
import { NotFoundError, ServerError } from "@/api/_services/errors";


export async function GET(request: NextRequest, context: any) {
    try {

        const { id } = context.params

        const response = await prisma?.bet.findMany({ where: { id: id } })

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

        const response = await prisma?.bet.delete({ where: { id: id } })

        if (response) {
            return SuccessDelete();
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}
