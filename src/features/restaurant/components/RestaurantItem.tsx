import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
const RestaurantItem = () => {
    return (
        <Link to="/restaurant/1" className="lg:w-1/4 md:w-2/4 w-full my-3 px-1 sm:mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div>
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iloveqatar.net%2Fpublic%2Fimages%2Flocal%2Fopen-restaurent-2.jpeg&f=1&nofb=1"
                        className="bg-cover h-44 w-full" />
                </div>
                <div className="px-2 py-4">
                    <p className="font-bold text-lg">My Restaurant</p>
                    <div className="flex space-x-2 text-sm mt-1 items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> <p className="font-bold text-sm text-gray-600">Mandalay</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RestaurantItem
