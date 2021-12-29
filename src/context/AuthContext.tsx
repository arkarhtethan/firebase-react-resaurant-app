import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
interface IAuthContextType {
    currentUser: User | null;
    registerUser: null | ((email: string, password: string) => Promise<any>);
    loginUser: null | ((email: string, password: string) => Promise<any>);
    logoutUser: null | (() => Promise<any>);
}
const AuthContext = createContext<IAuthContextType>({
    currentUser: null,
    registerUser: null,
    loginUser: null,
    logoutUser: null,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider ({ children }: { children: any }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    async function registerUser (email: string, password: string) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function loginUser (email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function logoutUser () {
        return signOut(auth);
    }

    const value = {
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}