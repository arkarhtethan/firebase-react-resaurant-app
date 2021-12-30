import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormError, { ErrorMessage } from "../../../shared/error/FormError";
import { SubmitButton } from "../../../shared/button";
import Header from "../../../shared/Header";
import { signInWithGoogle } from "../../../utils/firebase";
import { useAuth } from "../../../context/AuthContext";
import useMounted from "../../../hooks/useMounted";

export const Login = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const { email, password } = getValues();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { loginUser } = useAuth();

    const mounted = useMounted();

    const loginSuccessHandler = () => {
        if (mounted) {
            setLoading(false);
            navigate("/profile");
        }
    };

    const loginErrorHandler = (err: any) => {
        if (mounted) {
            setLoading(false);
            setErrorMessage(err.message);
        }
    };

    const onSubmit = () => {
        if (loginUser && mounted) {
            setLoading(true);
            loginUser(email, password)
                .then(loginSuccessHandler)
                .catch(loginErrorHandler);
        }
    };

    const isValid = () => {
        return (
            email &&
            email.length !== 0 &&
            password &&
            password.length !== 0 &&
            Object.entries(errors).length === 0
        );
    };

    const handleChange = () => {
        setErrorMessage(null);
    };

    const loginWithGoogle = () => {
        signInWithGoogle().then(loginSuccessHandler).catch(loginErrorHandler);
    };

    return (
        <div className="py-16 mx-2">
            <Header title="LOGIN" description="Log in to your account." />
            <form
                className="flex flex-col w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg p-4 mx-auto"
                onSubmit={handleSubmit(onSubmit)}
                onChange={handleChange}
            >
                <h2 className="lg:text-2xl text-lg mb-4 font-bold">
                    Log In To Your Account{" "}
                </h2>
                <div
                    className={`mb-2 ${errorMessage ? "block" : "hidden"
                        } duration-300 transition-all`}
                >
                    {errorMessage && (
                        <FormError
                            onClick={() => setErrorMessage(null)}
                            message={errorMessage}
                        />
                    )}
                </div>
                <input
                    {...register("email", {
                        required: "Please enter an email address",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                    placeholder="user@example.com"
                    className="border-2 border-black p-2 md:mb-4 mb-2"
                />
                {errors.email && <ErrorMessage message={errors.email.message} />}
                <input
                    {...register("password", {
                        minLength: {
                            value: 6,
                            message: "The password must be at least 6 characters long.",
                        },
                        required: "This field is required.",
                    })}
                    type="password"
                    placeholder="*******"
                    className="border-2 border-black p-2 md:mb-4 mb-2"
                />
                {errors.password && <ErrorMessage message={errors.password.message} />}
                <div className="flex space-x-3">
                    <SubmitButton
                        loading={loading}
                        buttonText="Login"
                        classes="w-full"
                        isValid={isValid()}
                    />
                </div>
                <div className="flex items-center justify-between w-full">
                    <Link to="/auth/register" className="text-sm font-bold text-gray-500">
                        Forgot Password
                    </Link>
                    <Link to="/auth/register" className="text-sm text-gray-500 font-bold">
                        Register
                    </Link>
                </div>
                <div className="flex items-center my-2">
                    <hr className="border-gray-500 w-full" />
                    <p className="mx-2">OR</p>
                    <hr className="border-gray-500 w-full" />
                </div>
                <div
                    onClick={loginWithGoogle}
                    className="text-center border-black border-2 text-black py-2 flex justify-center items-center cursor-pointer"
                >
                    <span className="mr-2 font-bold text-xl">G</span>
                    <p className="text-sm">LogIn With Google</p>
                </div>
            </form>
        </div>
    );
};
