import { Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import Auth from "./features/auth/containers";
import Home from "./features/home/container";


export default function App () {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-gray-200 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </div>
    </div>
  )
}