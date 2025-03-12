import { NotFoundError, ServerError } from "@/api/_services/errors";
import { SuccessCreate } from "@/api/_services/successfulResponses";
import { Message } from "firebase-admin/messaging";
import { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { getAccessToken } from "@/config/firebaseAdmin";
import { topicSchema } from "@/validations/topicSchema";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID

export async function POST(request: NextRequest) {
    const { link, topic, title, message } = await request.json()

    const validation = topicSchema.parse({ link, topic, title, message });

    const payload: Message = {
        topic: validation.topic,
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
    try {
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
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return NotFoundError()
            }
        }
        return ServerError()
    }

}