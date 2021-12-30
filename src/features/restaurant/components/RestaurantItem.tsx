import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { IRestaurant } from '../../../services/restaurant'

interface IRestaurantItemProps {
    restaurant: IRestaurant,
}

const RestaurantItem = ({ restaurant }: IRestaurantItemProps) => {
    return (
        <Link to={`/restaurant/${restaurant.id}`} className="lg:w-1/4 md:w-2/4 w-full my-3 px-1 sm:mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div>
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="bg-cover h-44 w-full" />
                </div>
                <div className="px-2 py-4">
                    <p className="font-bold text-lg">{restaurant.name}</p>
                    <div className="flex space-x-2 text-sm mt-1 items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> <p className="font-bold text-sm text-gray-600">{restaurant.city}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RestaurantItem
