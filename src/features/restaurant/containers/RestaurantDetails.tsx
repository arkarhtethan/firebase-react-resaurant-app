import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import RestaurantDetailsHeader from "../components/RestaurantDetailsHeader";
import MenuItem from "../components/MenuItem";

const RestaurantDetails = () => {
    let menuItems = Array.from(Array(10).keys());
    return (
        <div className="">
            <div className="h-80 w-full">
                <RestaurantDetailsHeader
                    name="Karaweik Cafe"
                    location="Mandalay"
                    phone="+9509444054610"
                    imageUrl="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iloveqatar.net%2Fpublic%2Fimages%2Flocal%2Fopen-restaurent-2.jpeg&f=1&nofb=1"
                />
            </div>
            <div className="p-5 shadow-lg h-full bg-white py-12">
                <h1 className="mb-2 font-bold text-xl text-gray-800">Menu Items</h1>
                <hr className="border-gray-500" />
                <div className="my-12 ml-2 flex space-x-12">
                    <div className="flex space-x-4 items-center">
                        <p>Sort By</p>
                        <select className="w-24">
                            <option>Name</option>
                            <option>Price</option>
                        </select>
                    </div>
                    <div>
                        <input placeholder="Search" className="border-b-2 border-gray-600 outline-none" />
                    </div>
                </div>
                <div className="flex flex-wrap mt-5">
                    {menuItems.map(menuItem => <MenuItem name="Burger" price={20} imageUrl="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapersdsc.net%2Fwp-content%2Fuploads%2F2016%2F09%2FJunk-Food-Pictures.jpg&f=1&nofb=1" />)}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
