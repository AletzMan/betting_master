// Import the functions you need from the SDKs you need
import { DocumentData } from "firebase-admin/firestore"
import { getApp, getApps, initializeApp } from "firebase/app"
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
	IFinalsParticipants,
	IMatchDay,
	IParticipants,
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
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const TwitterProvider = new TwitterAuthProvider()
export const FacebookProvider = new FacebookAuthProvider()

const db = getFirestore(app)

export const GetBetsByDay = async (day: string) => {
	console.log("GetBetsByDay")
	const year = new Date().getFullYear()

	let documets: IBetDocument[] | DocumentData = []
	try {
		const querySnapshot = await getDocs(collection(db, `bets`))
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
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
	console.log("AddBet")
	const year = new Date().getFullYear()

	try {
		const docRef = await addDoc(collection(db, `bets`), bet)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const AddFinalParticipant = async (data: IFinalsParticipants) => {
	console.log("AddFinalParticipant")
	const year = new Date().getFullYear()

	try {
		const docRef = await setDoc(doc(db, `finalsparticipants`, `${data.uid}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const GetFinalParticipants = async () => {
	console.log("GetBetsByIDGroup")
	try {
		let response: IFinalsParticipants[] | DocumentData = []
		const querySnapshot = await getDocs(collection(db, `finalsparticipants`))
		querySnapshot.forEach((doc) => {
			const id = doc.id
			const data = doc.data() as IFinalsParticipants
			response.push(data as IFinalsParticipants)
		})
		const documents = response as IParticipants[]

		//const filterByDay = documents.filter((document) => document.data.day === day)

		return documents
	} catch (error) {
		console.error(error)
		return [] as IParticipants[]
	}
}

export const UpdateFinalParticipants = async (betId: string, team: string) => {
	console.log("UpdateFinalParticipants")
	const year = new Date().getFullYear()
	try {
		const docRef = await updateDoc(doc(db, `finalsparticipants`, `${betId}`), {
			team,
		})
		return "OK"
	} catch (e) {
		console.log(e)
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const GetBetsByUser = async (uid: string) => {
	console.log("GetBetsByUser")
	const year = new Date().getFullYear()

	let documets: IBetDocument[] | DocumentData = []
	try {
		const querySnapshot = await getDocs(collection(db, `bets`))
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
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
	console.log("GetResultsByDay")
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
	console.log("AddResults")
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
	console.log("AddMatchDay")
	const year = new Date().getFullYear()
	try {
		const docRef = await setDoc(doc(db, `matchday`, `matchday${year}${tournament}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
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
	console.log("UpdateResultsMatchDay")
	try {
		const docRef = await updateDoc(doc(db, `matchday`, `matchday${year}${tournament}`), {
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
	console.log("GetCurrentMatchDay")
	const year = new Date().getFullYear()

	//console.log(`matchDay${year}${tournament}`)
	try {
		const querySnapshot = await getDoc(doc(db, `matchday`, `matchday${year}${tournament}`))
		const documents = querySnapshot.data() as IMatchDay

		return documents
	} catch (error) {
		console.error(error)
		return {} as IMatchDay
	}
}

export const GetInfoUser = async (id: string) => {
	console.log("GetInfoUser")
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

export const SaveInfouser = async (id: string, data: IUserSettings) => {
	console.log("SaveInfouser")
	try {
		const docRef = await setDoc(doc(db, `users`, `${id}`), data)
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const UpdateBetByUser = async (betId: string, paid: boolean) => {
	console.log("UpdateBetByUser")
	const year = new Date().getFullYear()
	try {
		const docRef = await updateDoc(doc(db, `bets`, `${betId}`), {
			paid,
		})
		return "OK"
	} catch (e) {
		console.log(e)
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}

export const GetBetsByIDGroup = async (day: string) => {
	console.log("GetBetsByIDGroup")
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
	console.log("UpdatePhotoUser")
	try {
		if (!auth.currentUser) return "FAIL"
		const docRef = await updateProfile(auth.currentUser, { photoURL: photo })
		return "OK"
	} catch (e) {
		console.error("Error adding document: ", e)
		return "FAIL"
	}
}
