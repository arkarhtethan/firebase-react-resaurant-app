import { db } from "../utils/firebase";
import { collection, getDocs, addDoc, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore"

const menuCollectionRefs = collection(db, 'menu')

export interface IMenu {
    id?: string;
    price: number;
    image: string;
    name: string;
    restaurantId: string;
}

export function createMenu (data: IMenu) {
    return addDoc(menuCollectionRefs, data)
}

export function getMenuItems (restaurantId: string) {
    const q = query(menuCollectionRefs, where("restaurantId", "==", restaurantId));
    return getDocs(q)
}

export function updateMenu (menu: IMenu) {
    const menuDoc = doc(db, "menu", menu.id!)
    return updateDoc(menuDoc, { ...menu })
}

export function deleteMenuItem (menuId: string) {
    const menuDoc = doc(db, "menu", menuId)
    return deleteDoc(menuDoc)
}
