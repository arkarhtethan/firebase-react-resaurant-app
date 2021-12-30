import { db } from "../utils/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore"

const userCollectionRefs = collection(db, 'user')

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export function createUser (data: IUser) {
    return addDoc(userCollectionRefs, data)
}

export function getUser (id: string) {
    const q = query(userCollectionRefs, where("id", "==", id));
    return getDocs(q)
}
