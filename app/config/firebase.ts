// Import the functions you need from the SDKs you need
import { DocumentData } from "firebase-admin/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth } from "firebase/auth"
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore"
import { IBetDocument, ICurrentMatch, IMatchDay, IResultsMatches } from "../types/types";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const TwitterProvider = new TwitterAuthProvider()
export const FacebookProvider = new FacebookAuthProvider()

const db = getFirestore(app)

export const GetBetsByDay = async (day: string) => {
    const year = new Date().getFullYear()

    let documets: IBetDocument[] | DocumentData = []
    try {
        const querySnapshot = await getDocs(collection(db, `bets`));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            documets.push(doc.data())
        });
        const documents = documets as IBetDocument[]

        const filterByDay = documents.filter(document => document.day === day)

        return filterByDay
    } catch (error) {
        console.error(error)
        return [] as IBetDocument[]
    }
}

export const AddBet = async (bet: IBetDocument) => {
    const year = new Date().getFullYear()

    try {
        const docRef = await addDoc(collection(db, `bets`), bet)
        return "OK"
    } catch (e) {
        console.error("Error adding document: ", e);
        return "FAIL"
    }

}


export const GetBetsByUser = async (uid: string) => {
    const year = new Date().getFullYear()

    let documets: IBetDocument[] | DocumentData = []
    try {
        const querySnapshot = await getDocs(collection(db, `bets`));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            documets.push(doc.data())
        });
        const Bets = [...documets as IBetDocument[]]

        const filterByDay = Bets.filter(bet => bet.uid === uid)
        filterByDay.sort(function (a, b) {
            if (a.day > b.day) {
                return -1;
            }
            if (a.day < b.day) {
                return 1;
            }
            // a must be equal to b
            return 0;
        })

        return filterByDay
    } catch (error) {
        console.error(error)
        return [] as IBetDocument[]
    }
}

export const GetResultsByDay = async (day: string) => {
    const year = new Date().getFullYear()


    try {
        const querySnapshot = await getDoc(doc(db, `results`, `matchDay${day}`));
        const documents = querySnapshot.data() as IResultsMatches

        return documents
    } catch (error) {
        console.error(error)
        return {} as IResultsMatches
    }
}

export const AddResults = async (data: IResultsMatches) => {
    const year = new Date().getFullYear()

    try {
        const docRef = await setDoc(doc(db, `results`, `matchDay${data.day}`), data)
        return "OK"
    } catch (e) {
        console.error("Error adding document: ", e);
        return "FAIL"
    }

}


export const AddMatchDay = async (data: IMatchDay, tournament: string) => {
    const year = new Date().getFullYear()
    try {
        const docRef = await setDoc(doc(db, `matchday`, `matchday${year}${tournament}`), data)
        return "OK"
    } catch (e) {
        console.error("Error adding document: ", e);
        return "FAIL"
    }

}
export const UpdateResultsMatchDay = async (data: string[], matches: ICurrentMatch[], tournament: string) => {
    const year = new Date().getFullYear()
    try {
        const docRef = await updateDoc(doc(db, `matchday`, `matchday${year}${tournament}`), {
            results: data,
            matches
        })
        return "OK"
    } catch (e) {
        console.error("Error adding document: ", e);
        return "FAIL"
    }

}


export const GetCurrentMatchDay = async (tournament: string) => {
    const year = new Date().getFullYear()

    //console.log(`matchDay${year}${tournament}`)
    try {
        const querySnapshot = await getDoc(doc(db, `matchday`, `matchday${year}${tournament}`));
        const documents = querySnapshot.data() as IMatchDay

        return documents
    } catch (error) {
        console.error(error)
        return {} as IMatchDay
    }
}