// firebaseAdmin.ts
import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';

if (!admin.apps.length) {
    try {
        const serviceAccount = {
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
        };
        admin.initializeApp({
            credential: cert(serviceAccount),
        });
    } catch (error) {
        console.error('Firebase Admin initialization error', error);
    }
}

export const firebaseAdmin = admin;

