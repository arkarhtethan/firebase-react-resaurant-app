import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

interface IRestaurantDetailsHeaderProps {
    name: string;
    imageUrl: string;
    location: string;
    phone: string;
}
const RestaurantDetailsHeader = ({ name, location, imageUrl, phone }: IRestaurantDetailsHeaderProps) => {
    return (
        <div
            className="h-full bg-cover bg-no-repeat w-full bg-center flex items-center relative"
            style={{
                backgroundImage: `url(${imageUrl})`,
                maxWidth: "100%",
            }}
        >
            <div className="bg-black h-full w-full absolute opacity-50"></div>
            <div className="bg-white lg:w-3/12 py-3 pl-16 z-10 lg:pr-0 pr-12">
                <h4 className="text-2xl font-semibold mb-2">
                    {name}
                </h4>
                <div className="flex space-x-3 items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <h6 className="text-base mt-1">{location}</h6>
                </div>
                <div className="flex space-x-3 items-center mt-2">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <h6 className="text-base text-gray-800 font-semibold mt-1">{phone}</h6>
                </div>
            </div>

        </div>
    )
}

export default RestaurantDetailsHeader
