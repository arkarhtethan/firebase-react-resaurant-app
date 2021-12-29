import { db } from "../utils/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore"

const restaurantsCollectionRefs = collection(db, 'restaurant')

export interface IRestaurant {
    name: string;
    phoneNumber: string;
    image: string;
    city: string;
    street: string;
    userId: string;
}

export function findRetaurantById (id: string) {
    console.log(id);
    const q = query(restaurantsCollectionRefs, where("userId", "==", id));
    return getDocs(q);
}

export async function createRetaurant (data: IRestaurant) {
    const snapshot = await findRetaurantById(data.userId)
    console.log(snapshot.empty)
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
