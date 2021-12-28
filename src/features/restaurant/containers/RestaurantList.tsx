import RestaurantItem from "../components/RestaurantItem";

const RestaurantList = () => {
    let restaurants = Array.from(Array(10).keys());
    return (
        <div className="w-4/5 mx-auto my-5 flex flex-wrap">
            {restaurants.map(restaurant => <RestaurantItem />)}
        </div>
    )
}

export default RestaurantList
