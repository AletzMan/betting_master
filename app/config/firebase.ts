// Import the functions you need from the SDKs you need
import { DocumentData } from "firebase-admin/firestore"
import { getApp, getApps, initializeApp } from "firebase/app"
import { child, get, getDatabase, onChildAdded, push, ref, set, update, } from "firebase/database"
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth, updateProfile, } from "firebase/auth"
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, } from "firebase/firestore"
import { IFinalsTeams, IFinalsParticipants, UserSession, } from "../types/types"
import { getMessaging } from "firebase/messaging"
import { getAnalytics } from "firebase/analytics"





// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
	appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
	databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_FIREBASE,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const messaging = getMessaging(app)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const GoogleProvider = new GoogleAuthProvider()
export const TwitterProvider = new TwitterAuthProvider()
export const FacebookProvider = new FacebookAuthProvider()

export const CreateNotification = async (id: string, data: {}) => {
	try {
		const docRef = await setDoc(doc(db, `users`, `${id}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const SaveInfouser = async (id: string, data: UserSession) => {
	try {
		const docRef = await setDoc(doc(db, `users`, `${id}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const UpdatePhotoUser = async (id: string, photo: string) => {
	try {
		if (!auth.currentUser) return "FAIL"
		const docRef = await updateProfile(auth.currentUser, { photoURL: photo })
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}


//------FINALISTS -----//

export const AddMatchFinals = async (data: string[]) => {
	const year = new Date().getFullYear()
	try {
		const docRef = await setDoc(doc(db, `finalists`, `teams`), { positions: data })
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const GetFinalistTeams = async () => {
	try {
		const querySnapshot = await getDoc(doc(db, `finalists`, "teams"))
		let document: IFinalsTeams = querySnapshot.data() as IFinalsTeams
		return document
	} catch (error) {
		console.error(error)
		return {} as IFinalsTeams
	}
}


export const AddFinalParticipant = async (data: IFinalsParticipants) => {
	const year = new Date().getFullYear()

	try {
		const docRef = await setDoc(doc(db, `finalsparticipants`, `${data.user_info.id}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}


export const GetFinalParticipants = async () => {
	try {
		let response: IFinalsParticipants[] | DocumentData = []
		const querySnapshot = await getDocs(collection(db, `finalsparticipants`))
		querySnapshot.forEach((doc) => {
			const id = doc.id
			const data = doc.data() as IFinalsParticipants
			response.push(data as IFinalsParticipants)
		})
		const documents = response as IFinalsParticipants[]

		//const filterByDay = documents.filter((document) => document.data.day === day)

		return documents
	} catch (error) {
		console.error(error)
		return [] as IFinalsParticipants[]
	}
}

export const UpdateFinalParticipants = async (uid: string, data: {}) => {
	const year = new Date().getFullYear()
	try {
		const docRef = await updateDoc(doc(db, `finalsparticipants`, `${uid}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}



//////-------------------------------------------FIREBASE REALTIME DATABASE------------------------------------/////

export const database = getDatabase(app)


export const WriteChatDraw = async (data: unknown, path: string) => {
	try {
		const chatListRef = ref(database, path)
		const newMessageRef = push(chatListRef)
		set(newMessageRef, data)
	} catch (error) {
		console.error(error)
	}
}


export const UpdatedRealDataTime = async (data: {}, path: string) => {
	try {
		update(ref(database, path), data)
	} catch (error) {
		console.error(error)
	}
}
export const WriteMustSpin = async (data: unknown, path: string) => {
	try {
		const chatListRef = ref(database, path)
		set(chatListRef, data)
	} catch (error) {
		console.error(error)

	}
}

export const ReadChatDraw = async (path: string) => {
	try {
		let messages
		const messagesRef = ref(database, path)
		onChildAdded(messagesRef, (snapshot) => {
			messages = snapshot.val()
		})
		return messages
	} catch (error) {
		console.error(error)
	}
}

export const GetDataRealDataTime = async (path: string): Promise<any | undefined> => {
	try {
		const dbRef = ref(database)
		const snapshot = await get(child(dbRef, `${path}`))
		if (snapshot.exists()) {
			return snapshot.val()
		}
		return undefined
	} catch (error) {
		console.error(error)
		return undefined
	}
}

