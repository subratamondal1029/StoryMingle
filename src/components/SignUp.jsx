import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import auth from "../Appwrite/authService";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkUser = async () => {
    try {
      const userData = await auth.getCurrentUser();
      if (userData) {
        dispatch(login(userData));
        navigate("/");
      }else checkUser()
    } catch (error) {
      console.log("checkUser :: error", error.message);
    }
  };

  const signUp = async (data) => {
    try {
      setError("");
      setIsLoading(true)
      const session = await auth.register(data);
      if (session) checkUser(); //checking the user is login properly and go to home page
    } catch (error) {
      setError(error.message);
      setIsLoading(false)
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
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signUp)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Name: "
              placeholder="Enter Your Name"
              {...register("name", {
                required: true,
              })}
            />
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
            <Button title="sign up" type="submit" classnames="w-full" isLoading={isLoading} LoadingText="Signing up">
            Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
