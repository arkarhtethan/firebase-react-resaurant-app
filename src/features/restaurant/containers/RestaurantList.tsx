import { useEffect, useState } from "react";
import { getRetaurants, IRestaurant } from "../../../services/restaurant";
import Header from "../../../shared/Header";
import LoadingCmp from "../../../shared/loader/LoadingCmp";
import RestaurantItem from "../components/RestaurantItem";

const RestaurantList = () => {
    const [restaurants, setrestaurants] = useState<IRestaurant[]>([])
    const [fetching, setFetching] = useState(false);

    const fetchRestaurants = () => {
        setFetching(true);
        getRetaurants().then((res) => {
            const restaurantList: IRestaurant[] = []
            res.forEach(snapshot => {
                const restaurant: IRestaurant = { ...snapshot.data(), id: snapshot.id } as IRestaurant
                restaurantList.push(restaurant);
            })
            setFetching(false);
            setrestaurants(restaurantList);
        }).catch((err) => {
            setFetching(false);
        })
    }

    useEffect(() => {
        fetchRestaurants();
    }, [])

    if (fetching) {
        return <div className="flex items-center justify-center min-h-screen">
            <LoadingCmp />
        </div>
    }

    return (
        <div className={`w-4/5 md:mx-auto  my-5 flex flex-wrap`}>
            <Header title="Restaurants" description="List of restaurant." />
            {restaurants.map((restaurant, index) => <RestaurantItem key={index} restaurant={restaurant} />)}
        </div>
    )
}

export default RestaurantList
