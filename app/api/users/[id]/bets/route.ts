import { NextRequest } from "next/server";
import { SuccessResponse } from "@/api/_services/successfulResponses";
import { NotFoundError, ServerError } from "@/api/_services/errors";


export async function GET(request: NextRequest, context: any) {
    try {

        const { id } = context.params

        const response = await prisma?.bet.findMany({ where: { uid: id } })

        if (response) {
            return SuccessResponse(response);
        }
        return NotFoundError();
    } catch (error) {
        return ServerError();
    }

}