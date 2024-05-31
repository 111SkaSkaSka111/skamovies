"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoWarningOutline } from "react-icons/io5";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
    email: z.string().trim().min(1, { message: "Please enter a valid email address" }).email().max(50, { message: "Maximum email must be 50 characters." }),
    password: z.string().trim().min(1, { message: "Password can't empty" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Maximum password must be 20 characters." }),
});

const SignInLayout = () => {
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsSubmiting(true);
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res?.status === 200) {
            setIsSubmiting(false);
            router.refresh();
            setTimeout(() => {
                router.push("/");
            }, 500);
        } else {
            setLoginFailed(true);
            setIsSubmiting(false);
        }
    };

    return (
        <div className="border p-5 bg-black rounded-2xl flex flex-col gap-5 w-[500px]">
            <h1 className="text-4xl font-bold font-podkova bg-slate-700 text-white text-center py-1 rounded-t-2xl">Sign In</h1>
            {loginFailed ? (
                <div className="border flex-col border-red-600 bg-red-400 text-red-600 rounded-xl flex items-center justify-center text-2xl w-full py-2">
                    <div className="flex gap-2 items-center justify-center">
                        <IoWarningOutline />
                        <p>Login Failed</p>
                    </div>
                    <p className="text-base text-black">
                        please check your <span className="text-blue-700">email</span> or <span className="text-blue-700">Password</span>
                    </p>
                </div>
            ) : null}
            <div className="border-t pt-5 flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-white p-2 py-7 bg-slate-700">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email :</label>
                        <input {...register("email")} type="text" id="email" placeholder="mail@example.com" className="min-w-80 w-full p-2  rounded-md text-black" />
                        {errors.email && (
                            <div className="text-base text-red-500 border border-red-500 rounded-md px-2 py-1 bg-red-300 mt-1 whitespace-nowrap flex gap-1 items-center justify-center">
                                <IoWarningOutline className="min-w-5" />
                                {errors.email.message as React.ReactNode}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password :</label>
                        <input {...register("password")} type="password" id="password" placeholder="Your Password" className="min-w-80 w-full p-2 rounded-md text-black" />
                        {errors.password && (
                            <div className="text-base text-red-500 border border-red-500 rounded-md px-2 py-1 bg-red-300 mt-1 whitespace-nowrap flex gap-1 items-center justify-center">
                                <IoWarningOutline className="min-w-5" />
                                {errors.password.message as React.ReactNode}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmiting}
                        className={`${
                            isSubmiting ? "cursor-not-allowed" : ""
                        } bg-yellow-500 text-black py-7 rounded-xl relative flex items-center justify-center mt-5 font-bold font-podkova text-xl group hover:translate-y-1 duration-200 hover:mx-1`}
                    >
                        <span className="group-hover:-translate-y-3 absolute inset-0 group-hover:-left-1 group-hover:-right-1 flex items-center justify-center group-hover:bg-[#ffffff70] group-hover:backdrop-blur-sm rounded-xl duration-200">
                            {isSubmiting ? "Loading..." : "Submit"}
                        </span>
                    </button>
                </form>
                <div className="bg-slate-700 flex items-center justify-end text-white py-5 px-2 rounded-b-2xl border-t">
                    <p>Dont have an account?</p>
                    <Link href={"/sign-up"} className="pr-1 text-blue-500 hover:underline ">
                        Sign Up
                    </Link>
                    <p>Here</p>
                </div>
            </div>
        </div>
    );
};

export default SignInLayout;
