import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import auth from "../Appwrite/authService";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await auth.login(data);
      if (session) {
        const userData = await auth.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />

            <Input
              type="password"
              label="Password: "
              placeholder="Enter Your Password"
              {...register("password", { required: true, min: 8 })}
            />
            <Button
              title="sign In"
              type="submit"
              classnames="w-full"
              isLoading={isLoading}
              LoadingText="Loging In"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
