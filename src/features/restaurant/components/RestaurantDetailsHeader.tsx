import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

interface IRestaurantDetailsHeaderProps {
    name: string;
    imageUrl: string;
    location: string;
}
const RestaurantDetailsHeader = ({ name, location, imageUrl }: IRestaurantDetailsHeaderProps) => {
    return (
        <div
            className="h-full bg-cover bg-no-repeat w-full bg-center flex items-center relative"
            style={{
                backgroundImage: `url(${imageUrl})`,
                maxWidth: "100%",
            }}
        >
            <div className="bg-black h-full w-full absolute opacity-50"></div>
            <div className="bg-white w-3/12 py-3 pl-16 z-10">
                <h4 className="text-2xl font-semibold mb-2">
                    {name}
                </h4>
                <div className="flex space-x-3 items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <h6 className="text-base mt-1">{location}</h6>

                </div>
            </div>

        </div>
    )
}

export default RestaurantDetailsHeader
