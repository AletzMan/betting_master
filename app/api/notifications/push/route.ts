import { ServerError } from "@/api/_services/errors";
import { SuccessCreate } from "@/api/_services/successfulResponses";
import { firebaseAdmin } from "@/config/firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { link, token, title, message } = await request.json()

    const payload: Message = {
        token,
        notification: {
            title: title,
            body: message
        },
        webpush: link && {
            fcmOptions: {
                link,
            }
        }
    }
    try {
        await firebaseAdmin.messaging().send(payload);
        return SuccessCreate({ success: true, message: "Notification Sent" })
    } catch (error) {
        return ServerError()
    }

}