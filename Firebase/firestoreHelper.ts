import { addDoc, collection, doc, deleteDoc, getDoc, setDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseSetup"
import { User } from "../components/GoalUsers"

export interface goalData {
    text: string;
    warning?: boolean;

}   

export async function writeToDB(data: goalData | User , collectionName: string) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data)
        return docRef.id
    } catch (e) {
        console.error('Error adding document:', e)
    }

}

export async function deleteFromDB(id: string, collectionName: string) {
    try {
        await deleteDoc(doc(database, collectionName, id))}
    catch (e) {
        console.error('Error deleting document:', e)
    }
    
}

//  get a document by id   
export async function readDocFromDB(id: string, collectionName: string) {
    try {
        const docRef = doc(database, collectionName, id)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
            return docSnapshot.data()
        } 
        return null
    } catch (e) {
    console.error('Error getting document:', e)
    }
}

export async function updateDB(id: string, data:{[key: string]: any}, collectionName: string) {
    try {
        await setDoc(doc(database, collectionName, id), data, {merge: true})
    } catch (e) {
        console.error('Error updating document:', e)
    }
}

export async function deleteAllFromDB(collectionName: string) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName))
        querySnapshot.forEach((document) => {
            deleteDoc(doc(database, collectionName, document.id))
        })
    } catch (e) {
        console.error('Error deleting all documents:', e)
    }

}
    