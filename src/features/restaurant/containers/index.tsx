import { Routes, Route } from "react-router-dom"
import RestaurantDetails from "./RestaurantDetails"
import RestaurantList from "./RestaurantList"

const index = () => {
    return (
        <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/:id" element={<RestaurantDetails />} />
        </Routes>
    )
}

export default index
