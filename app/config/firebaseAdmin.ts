
import { google } from 'googleapis';
import admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';



const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID


if (!admin.apps.length) {
    try {
        const serviceAccount = {
            projectId: projectId,
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

export async function subscribeTopic(registrationTokens: string[], topic: string) {
    try {
        const response = await getMessaging().subscribeToTopic(registrationTokens, topic);
        if (response.errors.length === 0) {
            console.log(response)
            return response
        }
        return null
    } catch (error) {
        return null
    }
}

export async function unsubscribeTopic(registrationTokens: string[], topic: string) {
    try {
        const response = await getMessaging().unsubscribeFromTopic(registrationTokens, topic)
        if (response.errors.length === 0) {
            return response
        }
        return null
    } catch (error) {
        return null
    }
}