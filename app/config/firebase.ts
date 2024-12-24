// Import the functions you need from the SDKs you need
import { DocumentData } from "firebase-admin/firestore"
import { getApp, getApps, initializeApp } from "firebase/app"
import { child, get, getDatabase, onChildAdded, push, ref, set, update } from "firebase/database"
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	TwitterAuthProvider,
	getAuth,
	updateProfile,
} from "firebase/auth"
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore"
import {
	IBetData,
	IBetDataDocument,
	IBetDocument,
	ICurrentMatch,
	IMatchDay,
	IFinalsTeams,
	IFinalsParticipants,
	IResultsMatches,
	IUserSettings,
} from "../types/types"


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
	appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
	databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_FIREBASE,
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const TwitterProvider = new TwitterAuthProvider()
export const FacebookProvider = new FacebookAuthProvider()


export const GetBetsByDay = async (day: string) => {
	const year = new Date().getFullYear()

	let documets: IBetDocument[] | DocumentData = []
	try {
		const querySnapshot = await getDocs(collection(db, `bets`))
		querySnapshot.forEach((doc) => {
			documets.push(doc.data())
		})
		const documents = documets as IBetDocument[]

		return documents
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
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}



export const GetBetsByUser = async (uid: string) => {
	const year = new Date().getFullYear()

	let documets: IBetDocument[] | DocumentData = []
	try {
		const querySnapshot = await getDocs(collection(db, `bets`))
		querySnapshot.forEach((doc) => {
			documets.push(doc.data())
		})
		const Bets = [...(documets as IBetDocument[])]

		const filterByDay = Bets.filter((bet) => bet.uid === uid)

		return filterByDay
	} catch (error) {
		console.error(error)
		return [] as IBetDocument[]
	}
}


export const GetResultsByDay = async (day: string, tournament: string) => {
	const year = new Date().getFullYear()

	try {
		const querySnapshot = await getDoc(doc(db, `results`, `matchDay${day}${tournament}${year}`))
		const documents = querySnapshot.data() as IResultsMatches

		return documents
	} catch (error) {
		console.error(error)
		return {} as IResultsMatches
	}
}

export const AddResults = async (data: IResultsMatches, tournament: string) => {
	const year = new Date().getFullYear()

	try {
		const docRef = await setDoc(
			doc(db, `results`, `matchDay${data.day}${tournament}${year}`),
			data
		)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const AddMatchDay = async (data: IMatchDay, tournament: string, matchDay: number) => {
	const year = new Date().getFullYear()
	try {
		const docRef = await setDoc(doc(db, `matchday`, `matchday${tournament}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}


export const DeleteMatchDay = async (tournament: string) => {
	try {
		await deleteDoc(doc(db, `matchday`, `matchday${tournament}`))
		return "OK"
	} catch (e) {
		console.error("Error deleting document: ", e)
		return "FAIL"
	}
}


export const UpdateResultsMatchDay = async (
	data: string[],
	matches: ICurrentMatch[],
	tournament: string,
	isAvailable: boolean,
	isFinishGame: boolean
) => {
	const year = new Date().getFullYear()
	try {
		const docRef = await updateDoc(doc(db, `matchday`, `matchday${tournament}`), {
			results: data,
			matches,
			isAvailable,
			isFinishGame,
		})
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const GetCurrentMatchDay = async (tournament: string) => {
	const year = new Date().getFullYear()

	try {
		const querySnapshot = await getDoc(doc(db, `matchday`, `matchday${tournament}`))
		const documents = querySnapshot.data() as IMatchDay

		return documents
	} catch (error) {
		console.error(error)
		return {} as IMatchDay
	}
}

export const GetInfoUser = async (id: string) => {
	try {
		const querySnapshot = await getDoc(doc(db, `users`, `${id}`))
		const documents = querySnapshot.data() as IUserSettings
		if (documents) {
			return documents as IUserSettings
		} else {
			return { uid: "", account: "" } as IUserSettings
		}
		return documents
	} catch (error) {
		console.error(error)
		return { uid: "", account: "" } as IUserSettings
	}
}

export const GetUsers = async () => {
	try {
		let documents: IUserSettings[] = []
		const querySnapshot = await getDocs(collection(db, `users`))
		querySnapshot.forEach((doc) => {
			documents.push(doc.data() as IUserSettings)
		})
		const users = [...(documents as IUserSettings[])]
		return users
	} catch (error) {
		console.error(error)
		return [] as IUserSettings[]
	}
}



export const DeleteUser = async (uid: string) => {
	try {
		await deleteDoc(doc(db, `users`, `${uid}`))
		return "OK"
	} catch (e) {
		console.error("Error deleting document: ", e)
		return "FAIL"
	}
}

export const UpdateNotificationUser = async (uid: string, notifications: boolean) => {
	try {
		const docRef = await updateDoc(doc(db, `users`, `${uid}`), {
			notifications,
		})
		return "OK"
	} catch (e) {
		console.error(e)
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const CreateNotification = async (id: string, data: {}) => {
	try {
		const docRef = await setDoc(doc(db, `users`, `${id}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const SaveInfouser = async (id: string, data: IUserSettings) => {
	try {
		const docRef = await setDoc(doc(db, `users`, `${id}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const UpdateBetByUser = async (betId: string, paid: boolean) => {
	const year = new Date().getFullYear()
	try {
		const docRef = await updateDoc(doc(db, `bets`, `${betId}`), {
			paid,
		})
		return "OK"
	} catch (e) {
		console.error(e)
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const GetBetsByIDGroup = async (day: string) => {
	try {
		let response: IBetDataDocument[] | DocumentData = []
		const querySnapshot = await getDocs(collection(db, `bets`))
		querySnapshot.forEach((doc) => {
			const id = doc.id
			const data = doc.data() as IBetData
			response.push({ id, data } as IBetDataDocument)
		})
		const documents = response as IBetDataDocument[]

		const filterByDay = documents.filter((document) => document.data.day === day)

		return filterByDay
	} catch (error) {
		console.error(error)
		return [] as IBetDataDocument[]
	}
}

export const DeleteBet = async (betId: string) => {
	try {
		await deleteDoc(doc(db, `bets`, `${betId}`))
		return "OK"
	} catch (e) {
		console.error("Error deleting document: ", e)
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
		const docRef = await setDoc(doc(db, `finalsparticipants`, `${data.user_info.uid}`), data)
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