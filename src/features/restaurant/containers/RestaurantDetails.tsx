import RestaurantDetailsHeader from "../components/RestaurantDetailsHeader";
import MenuItem from "../components/MenuItem";
import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { getRetaurantById, IRestaurant } from "../../../services/restaurant";
import { getMenuItems, IMenu } from "../../../services/menu";
import LoadingCmp from "../../../shared/loader/LoadingCmp";

const RestaurantDetails = (props: any) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fetching, setFetching] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<IMenu[]>([]);
    const [restaurant, setRestaurant] = useState<IRestaurant | null>();
    const [menuItems, setMenuItems] = useState<IMenu[]>([]);

    const fetchRestaurantDetails = useCallback(() => {
        if (id) {
            setFetching(true);
            getRetaurantById(id).then((snapshot) => {
                setFetching(false);
                if (snapshot.exists()) {
                    const restaurantData = {
                        ...snapshot.data(),
                        id: snapshot.id,
                    } as IRestaurant;
                    setRestaurant(restaurantData);
                    fetchMenuByRestaurantId(restaurantData.id!);
                } else {
                    navigate("/404");
                }
            });
        }
    }, [id, navigate]);

    const sortMenuItemByName = () => {
        if (search.length > 0) {
            const menuItemsToSort = searchResults.slice();
            const sortedList = menuItemsToSort.sort((a, b) =>
                a.name > b.name ? 1 : -1
            );
            setSearchResults(sortedList);
        }
        else {
            const menuItemsToSort = menuItems.slice();
            const sortedList = menuItemsToSort.sort((a, b) =>
                a.name > b.name ? 1 : -1
            );
            setMenuItems(sortedList);
        }
    };

    const sortMenuItemByPrice = () => {
        if (search.length > 0) {
            let menuItemsToSort = searchResults.slice();
            const sortedList = menuItemsToSort.sort((a, b) =>
                a.price > b.price ? 1 : -1
            );
            setSearchResults(sortedList);
        } else {
            let menuItemsToSort = menuItems.slice();
            const sortedList = menuItemsToSort.sort((a, b) =>
                a.price > b.price ? 1 : -1
            );
            setMenuItems(sortedList);
        }
    };

    const fetchMenuByRestaurantId = (restaurantId: string) => {
        getMenuItems(restaurantId).then((res) => {
            const menuList: IMenu[] = [];
            res.forEach((snapshot) => {
                const menuData = { ...snapshot.data(), id: snapshot.id } as IMenu;
                menuList.push(menuData);
            });
            const sortedList = menuList.sort((a, b) => (a.name > b.name ? 1 : -1));
            setMenuItems(sortedList);
            setFetching(false);
        });
    };

    const sortTypeChangeHandler = (event: any) => {
        const sortBy = event.target.value;
        if (sortBy === "price") {
            sortMenuItemByPrice();
        } else {
            sortMenuItemByName();
        }
    };

    const searchChanged = (event: any) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
        if (searchTerm.length > 0) {
            const menuList = [...menuItems];
            const results = menuList.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }
    };

    useEffect(() => {
        if (id) {
            fetchRestaurantDetails();
        }
    }, [id, fetchRestaurantDetails]);

    if (fetching || !restaurant) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingCmp />
            </div>
        );
    }

    return (
        <div className="">
            <div className="h-80 w-full">
                <RestaurantDetailsHeader
                    name={restaurant.name}
                    city={restaurant.city}
                    street={restaurant.street}
                    phone={restaurant.phoneNumber}
                    imageUrl={restaurant.image}
                />
            </div>
            <div className="p-5 shadow-lg h-full bg-white py-12">
                <h1 className="mb-2 font-bold text-xl text-gray-800">Menu Items</h1>
                <hr className="border-gray-500" />
                <div className="my-12 ml-2 flex lg:flex-row flex-col lg:space-x-12 space-y-12 lg:space-y-0">
                    <div className="flex space-x-4 items-center">
                        <p>Sort By</p>
                        <select className="w-24" onChange={sortTypeChangeHandler}>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    <div>
                        <input
                            onChange={searchChanged}
                            placeholder="Search"
                            className="border-b-2 border-gray-600 outline-none"
                        />
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
                    {search.length > 0
                        ?
                        (
                            searchResults.map((menuItem) => (
                                <MenuItem key={menuItem.id} menu={menuItem} />
                            ))
                        )

                        : menuItems.map((menuItem) => (
                            <MenuItem key={menuItem.id} menu={menuItem} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
