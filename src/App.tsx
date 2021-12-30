import { Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import Auth from "./features/auth/containers";
import RestaurantList from "./features/restaurant/containers/RestaurantList";
import Restaurant from "./features/restaurant/containers";
import Profile from "./features/profile/container";
import AuthContextProvider from "./context/AuthContext";
import PageNotFound from "./components/PageNotFound";


export default function App () {
  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="bg-gray-200 flex-grow">
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/restaurant/*" element={<Restaurant />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  )
}