import { BadRequestError, ServerError, UnprocessableEntityError } from "@/api/_services/errors";
import { SuccessCreate, SuccessDelete } from "@/api/_services/successfulResponses";
import { NextRequest } from "next/server";
import { subscribeTopic, unsubscribeTopic } from "@/config/firebaseAdmin";
import { ZodError } from 'zod';
import { subscribeSchema } from "@/validations/subscribeSchema";
import { prisma } from "@/lib/db"


export async function POST(request: NextRequest) {
    try {
        const { topic, tokens } = await request.json();
        const validation = subscribeSchema.parse({ topic, tokens });

        const success = await subscribeTopic(validation.tokens, validation.topic);

        if (success) {
            //const response = await prisma.
            return SuccessCreate({ success: true, message: "Suscripción al tema exitosa." });
        } else {
            return BadRequestError();
        }
    } catch (error: any) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error("Error en POST /subscribe:", error);
        return ServerError();
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { topic, tokens } = await request.json();
        subscribeSchema.parse({ topic, tokens });

        const success = await unsubscribeTopic(tokens, topic);

        if (success) {
            return SuccessDelete({ success: true, message: "Desuscripción del tema exitosa." });
        } else {
            return BadRequestError();
        }
    } catch (error: any) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error("Error en DELETE /unsubscribe:", error);
        return ServerError();
    }
}