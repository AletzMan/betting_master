
import { IUserSettings } from "@/app/types/types";
import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)



export async function GET(request: NextRequest, context: any) {
    try {
        let documents: IUserSettings[] = []
        const querySnapshot = await getDocs(collection(db, `users`))

        querySnapshot.docs.forEach((doc) => {
            documents.push(doc.data() as IUserSettings)
        })
        const users = [...(documents as IUserSettings[])]

        return NextResponse.json({ users }, { status: 200 })
    } catch (error) {
        console.error(error)
        return [] as IUserSettings[]
    }
}