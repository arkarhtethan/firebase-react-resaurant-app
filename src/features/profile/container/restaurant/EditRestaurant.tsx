import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { useAuth } from "../../../../context/AuthContext";
import useMounted from "../../../../hooks/useMounted";
import { createRetaurant, findRetaurantByUserId, IRestaurant } from "../../../../services/restaurant";
import { SubmitButton } from "../../../../shared/button";
import FormError, { ErrorMessage } from "../../../../shared/error/FormError";
import Header from "../../../../shared/Header";
import LoadingCmp from "../../../../shared/loader/LoadingCmp";

export default function EditRestaurant () {

    const [isChanged, setIsChanged] = useState(false);

    const [loading, setLoading] = useState(false);

    const [restaurant, setRestaurant] = useState<IRestaurant | null>();

    const { currentUser } = useAuth();

    const mounted = useMounted();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        mode: "onChange",
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const [fetching, setFetching] = useState(false);

    const { image, name, phoneNumber, city, street } = watch();

    const fetchAndSetRestaurantData = useCallback(() => {
        if (currentUser && currentUser.uid) {
            setFetching(true);
            return findRetaurantByUserId(currentUser.uid).then(snapshot => {
                if (snapshot.empty) {
                    setFetching(false);
                }
                snapshot.forEach(item => {
                    const restaurantData = item.data() as IRestaurant;
                    setRestaurant(restaurantData)
                    setValue("image", restaurantData.image);
                    setValue("name", restaurantData.name);
                    setValue("phoneNumber", restaurantData.phoneNumber);
                    setValue("city", restaurantData.city);
                    setValue("street", restaurantData.street);
                    setFetching(false);
                })
            })
        }
    }, [currentUser, setValue])

    useEffect(() => {
        fetchAndSetRestaurantData();
    }, [fetchAndSetRestaurantData])

    const isSameWithPrevValue = () => {
        return Boolean(
            restaurant
            && (restaurant.city === city)
            && (restaurant.street === street)
            && (restaurant.phoneNumber === phoneNumber)
            && (restaurant.name === name)
            && (restaurant.image === image)
        )
    }

    const isValid = () => {
        const dataList: string[] = [image, name, phoneNumber, city, street];
        const isNotEmpty = dataList.every(item => item && item.trim().length > 0)
        return isNotEmpty && isChanged && !isSameWithPrevValue();
    }

    if (!currentUser) {
        return <Navigate to="/" />
    }
    const onSubmit = () => {
        setLoading(true);
        const data: IRestaurant = {
            name,
            image,
            phoneNumber,
            city,
            street,
            userId: currentUser.uid,
        }
        createRetaurant(data)
            .then(res => {
                if (mounted) {
                    fetchAndSetRestaurantData();
                    setLoading(false);
                }
            })
            .catch(err => {
                if (mounted) {
                    setLoading(false);
                    setErrorMessage(err.message)
                }
            })
    }

    if (fetching) {
        return <LoadingCmp />
    }

    return (
        <div id="accountPanel" className="lg:px-10 px-4 pt-5 text-gray-900">
            <Header title="Edit Restaurant" description="Edit your restaurant." />
            <h3 className="text-2xl mb-4 font-bold">Edit Restaurant</h3>
            <hr className="border-black" />
            <p className="mb-3 mt-6 text-gray-500">
                Edit restaurant details.
            </p>
            <div className="lg:w-4/5 w-full flex">
                <div className="lg:w-2/5 w-full">
                    <div className={`mb-2 ${errorMessage ? 'block' : 'hidden'} duration-300 transition-all`}>
                        {(errorMessage) && <FormError onClick={() => setErrorMessage(null)} message={errorMessage} />}
                    </div>
                    <form action="" className="flex flex-col pb-8" onSubmit={handleSubmit(onSubmit)} onChange={() => setIsChanged(true)}>
                        <input
                            {...register("image", {
                                required: "This field is required.",
                                pattern: {
                                    value: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                                    message: "Invalid photo url"
                                }
                            })}
                            type="text"
                            placeholder="Restaurant Photo URL"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.image && errors.image.message && <ErrorMessage message={errors.image.message} />}
                        <input
                            {...register("name", {
                                minLength: {
                                    value: 6,
                                    message: "The name must be at least 6 characters long."
                                }, required: "This field is required."
                            })}
                            type="text"
                            placeholder="Restaurant Name"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.name && errors.name.message && <ErrorMessage message={errors.name.message} />}
                        <input
                            {...register("phoneNumber", {
                                required: "This field is required.",
                                pattern: {
                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                    message: "Invalid phone number"
                                }
                            })}
                            placeholder="Phone Number"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.phoneNumber && errors.phoneNumber.message && <ErrorMessage message={errors.phoneNumber.message} />}
                        <input
                            {...register("city", {
                                required: "This field is required.",
                            })}
                            placeholder="City"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.city && errors.city.message && <ErrorMessage message={errors.city.message} />}

                        <input
                            {...register("street", {
                                required: "This field is required.",
                            })}
                            placeholder="Street"
                            className="border-2 border-black p-2 md:mb-4 mb-2"
                        />
                        {errors.street && errors.street.message && <ErrorMessage message={errors.street.message} />}

                        <SubmitButton loading={loading} buttonText="Edit Retaurant" isValid={isValid()} />
                    </form>
                </div>
            </div>
        </div>

    );
}
