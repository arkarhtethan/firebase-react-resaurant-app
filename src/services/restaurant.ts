import { db } from "../utils/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, query, where, getDoc } from "firebase/firestore"

export interface IRestaurant {
    id?: string;
    name: string;
    phoneNumber: string;
    image: string;
    city: string;
    street: string;
    userId: string;
}

const restaurantsCollectionRefs = collection(db, 'restaurant')

export function findRetaurantByUserId (id: string) {
    const q = query(restaurantsCollectionRefs, where("userId", "==", id));
    return getDocs(q);
}

export function getRetaurantById (restaurantId: string) {
    const menuDoc = doc(db, "restaurant", restaurantId)
    return getDoc(menuDoc);
}

export function getRetaurants () {
    return getDocs(restaurantsCollectionRefs);
}

export async function createRetaurant (data: IRestaurant) {
    const snapshot = await findRetaurantByUserId(data.userId)
    if (snapshot.empty) {
        return addDoc(restaurantsCollectionRefs, data)
    } else {
        let docId: string = "";
        snapshot.forEach(snap => {
            docId = snap.id;
        })
        const restaurantDoc = doc(db, "restaurant", docId)
        return updateDoc(restaurantDoc, { ...data })
    }
}
