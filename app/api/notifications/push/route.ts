import { ServerError } from "@/api/_services/errors";
import { SuccessCreate } from "@/api/_services/successfulResponses";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';
import admin from 'firebase-admin';
import axios, { AxiosError } from "axios";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID

if (!admin.apps.length) {
    try {
        const serviceAccount = {
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
        };
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error) {
        console.error('Firebase Admin initialization error', error);
    }
}

export async function getAccessToken(): Promise<string | null> {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
        });

        const client = await auth.getClient();
        const accessTokenResponse = await client.getAccessToken();

        if (accessTokenResponse && accessTokenResponse.token) {
            return accessTokenResponse.token;
        } else {
            console.error('Failed to get access token from GoogleAuth');
            return null;
        }
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}


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
            console.log(error.cause)
            console.log(error.code)
            console.log(error.message)
            console.log(error.response)
        }
        return ServerError()
    }

}