import { NotFoundError, ServerError } from "@/api/_services/errors";
import { SuccessCreate } from "@/api/_services/successfulResponses";
import { Message } from "firebase-admin/messaging";
import { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { getAccessToken } from "@/config/firebaseAdmin";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID

export async function POST(request: NextRequest) {
    const { link, token, title, message } = await request.json()

    const payload: Message = {
        token,
        notification: {
            title: title,
            body: message,
            imageUrl: "/logo.png"
        },
        webpush: link && {
            fcmOptions: {
                link,
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
        return SuccessCreate({ success: true, message: "Notification Sent" })
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return NotFoundError()
            }
        }
        return ServerError()
    }

}