import { Navigate, Route, Routes, useLocation } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { Login } from "./Login";
import { Register } from "./Register";

export { Login } from "./Login";
export { Register } from "./Register";

export default function Auth () {
    const { currentUser } = useAuth();
    const { state } = useLocation();
    if (currentUser) {
        const locationState = state as any;
        if (locationState && locationState.redirectUrl) {
            return <Navigate to={locationState.redirectUrl} />
        } else {
            return <Navigate to="/" />
        }
    }
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
