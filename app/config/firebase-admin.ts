import { cert, getApps, initializeApp, } from "firebase-admin/app"
import { } from "firebase-admin/firestore"



const FirebaseAdminConfig = {
    credential: cert({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
        clientEmail: process.env.NEXT_PUBLIC_CLIENT_MAIL_FIREBASE,
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY_FIREBASE
            ? process.env.NEXT_PUBLIC_PRIVATE_KEY_FIREBASE?.replace(/\\n/gm, "\n")
            : undefined

    })
}

export function InitApp() {
    if (getApps().length <= 0) {
        initializeApp(FirebaseAdminConfig)
    }
}

