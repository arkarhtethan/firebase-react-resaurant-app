import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../context/AuthContext";
import {
    createMenu,
    deleteMenuItem,
    getMenuItems,
    IMenu,
    updateMenu,
} from "../../../../services/menu";
import {
    findRetaurantByUserId,
    IRestaurant,
} from "../../../../services/restaurant";
import { SubmitButton } from "../../../../shared/button";
import { ErrorMessage } from "../../../../shared/error/FormError";
import Header from "../../../../shared/Header";
import LoadingCmp from "../../../../shared/loader/LoadingCmp";
import MenuItem from "../../../restaurant/components/MenuItem";

const Menu = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const { userInfo } = useAuth();

    const restaurant = useRef<IRestaurant | null>();

    const [isChanged, setIsChanged] = useState(false);

    const [errorMessage, setErrorMessage] = useState<string | null>();

    const [editingMenu, setEditingMenu] = useState<IMenu | null>();

    const [menuItems, setMenuItems] = useState<IMenu[]>([]);

    const { name, image, price } = watch();

    const [loading, setLoading] = useState(false);

    const [fetching, setFetching] = useState(false);

    const fetchMenuItems = () => {
        if (restaurant.current!.id) {
            const menuList: IMenu[] = [];
            setFetching(true);
            getMenuItems(restaurant.current!.id).then((data) => {
                data.forEach((snapshot) => {
                    const menu = { ...snapshot.data(), id: snapshot.id } as IMenu;
                    menuList.push(menu);
                });
                setFetching(false);
                setMenuItems(menuList);
            });
        }
    };

    useEffect(() => {
        if (userInfo) {
            setFetching(true);
            findRetaurantByUserId(userInfo.id).then((data) => {
                if (data.size > 0) {
                    data.forEach((snapshot) => {
                        restaurant.current = {
                            ...snapshot.data(),
                            id: snapshot.id,
                        } as IRestaurant;
                        fetchMenuItems();
                    });
                    setFetching(false);
                } else {
                    setErrorMessage("Please create a restaurant first.")
                    setFetching(false);
                    restaurant.current = null;
                }
            });
        }
    }, [userInfo]);

    const deleteHandler = (id: string) => {
        setFetching(true);
        deleteMenuItem(id)
            .then((data) => {
                fetchMenuItems();
            })
            .catch((err) => {
                setFetching(false);
            });
    };

    const onSubmit = () => {
        if (restaurant.current!.id && !editingMenu) {
            setLoading(true);
            createMenu({ image, name, price, restaurantId: restaurant.current!.id })
                .then((res) => {
                    reset();
                    setLoading(false);
                    fetchMenuItems();
                })
                .catch((err) => {
                    setLoading(false);
                });
        } else if (editingMenu && restaurant.current!.id) {
            setLoading(true);
            updateMenu({
                id: editingMenu.id,
                image,
                name,
                price,
                restaurantId: restaurant.current!.id,
            }).then((res) => {
                reset();
                setLoading(false);
                fetchMenuItems();
            }).catch((err) => {
                setLoading(false);
            });
        }
    };

    const isSameWithPrevValue = () => {
        return Boolean(
            editingMenu &&
            editingMenu.name === name &&
            editingMenu.price === price &&
            editingMenu.image === image
        );
    };

    const updateHandler = (menu: IMenu) => {
        setEditingMenu(menu);
        setValue("name", menu.name);
        setValue("price", menu.price);
        setValue("image", menu.image);
    };

    const isValid = () => {
        const dataList: string[] = [image, name];
        const isNotEmpty =
            dataList.every((item) => item && item.trim().length > 0) && price > 0;
        if (editingMenu) {
            return isNotEmpty && isChanged && !isSameWithPrevValue();
        }
        return isNotEmpty;
    };

    if (fetching) {
        return <LoadingCmp />;
    }

    if (errorMessage) {
        return <div className="flex items-center justify-center h-full">
            {errorMessage}
        </div>
    }

    return (
        <div
            id="accountPanel"
            className="lg:px-10 px-4 pt-5 text-gray-900 bg-gray-100 h-full"
        >
            <Header title="Edit Menu" description="Edit your restaurant." />
            <h3 className="text-2xl mb-4 font-bold">Edit Menu</h3>
            <hr className="border-black" />
            <p className="mb-3 mt-6 text-gray-500">Edit Menu details.</p>
            <div>
                <form
                    action=""
                    className="flex lg:flex-row flex-col lg:space-x-4"
                    onSubmit={handleSubmit(onSubmit)}
                    onChange={() => setIsChanged(true)}
                >
                    ;
                    <div className="flex flex-col">
                        <input
                            {...register("image", {
                                required: "This field is required.",
                                pattern: {
                                    value:
                                        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                                    message: "Invalid photo url",
                                },
                            })}
                            type="text"
                            placeholder="Menu Photo URL"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.image && errors.image.message && (
                            <ErrorMessage message={errors.image.message} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <input
                            {...register("name", {
                                required: "This field is required.",
                            })}
                            type="text"
                            placeholder="Menu Name"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.name && errors.name.message && (
                            <ErrorMessage message={errors.name.message} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <input
                            {...register("price", {
                                required: "This field is required.",
                            })}
                            type="number"
                            placeholder="Menu Price"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.price && errors.price.message && (
                            <ErrorMessage message={errors.price.message} />
                        )}
                    </div>
                    <SubmitButton
                        loading={loading}
                        buttonText={editingMenu ? "EDIT" : "Submit"}
                        isValid={isValid()}
                        classes="px-3 h-10"
                    />
                </form>
            </div>
            <hr className="my-4" />
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
                {menuItems.map((menu) => (
                    <MenuItem
                        key={menu.id}
                        menu={menu}
                        deleteHandler={() => deleteHandler(menu.id!)}
                        updateHandler={() => updateHandler(menu)}
                        showAction={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
