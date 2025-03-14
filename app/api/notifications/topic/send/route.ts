import { NotFoundError, ServerError, UnprocessableEntityError } from "@/api/_services/errors";
import { SuccessCreate } from "@/api/_services/successfulResponses";
import { Message } from "firebase-admin/messaging";
import { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { getAccessToken } from "@/config/firebaseAdmin";
import { topicSchema } from "@/validations/topicSchema";
import { ZodError } from "zod";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID

export async function POST(request: NextRequest) {
    const { link, name, title, message } = await request.json()

    try {
        const validation = topicSchema.parse({ link, name, title, message });

        const payload: Message = {
            topic: validation.name,
            notification: {
                title: validation.title,
                body: validation.message
            },
            webpush: link && {
                fcmOptions: {
                    link: validation.link,
                }
            }
        }
        const accessToken = await getAccessToken()
        const fcmResponse = await axios.post(
            `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
            {
                message: payload
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return SuccessCreate({ success: true, message: "Notificaiones enviadas" })
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return NotFoundError()
            }
        }
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues)
        }
        return ServerError()
    }

}