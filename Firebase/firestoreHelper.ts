import { addDoc, collection } from "firebase/firestore"
import { database } from "./firebaseSetup"

export interface goalData {
    text: string;
}

export async function writeToDB(data: goalData, collectionName: string) {
    const docRef = await addDoc(collection(database, collectionName), data)

}