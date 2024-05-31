"use client";

import UploadThings from "@/components/UploadThings";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoWarningOutline } from "react-icons/io5";
import { z } from "zod";

const schema = z
    .object({
        username: z.string().trim().min(1, { message: "Username must be at least 5 character" }).max(20, { message: "Maximum username must be 20 characters." }),
        email: z.string().trim().min(1, { message: "Please enter a valid email address" }).email().max(50, { message: "Maximum email must be 50 characters." }),
        password: z.string().trim().min(1, { message: "Password can't empty" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Maximum password must be 20 characters." }),
        confirmPassword: z.string().trim().min(1, { message: "Confirm Password can't empty" }).min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

const SignUpLayout = () => {
    const [imgUrl, setImgUrl] = useState<string>("");
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsSubmiting(true);
        if (imgUrl.length) {
            const body = { username: data.username, email: data.email, password: data.password, image: imgUrl };

            const res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const createUser = await res.json();

            if (createUser.status === 201) {
                alert(createUser.message);
                setIsSubmiting(false);
                router.push("/sign-in");
            } else {
                alert(createUser.message);
                setIsSubmiting(false);
            }
        } else {
            setIsSubmiting(false);
            scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setIsUploaded(true);
        }
    };

    return (
        <div className="border p-5 bg-black rounded-xl flex flex-col gap-5 w-[500px]">
            <h1 className="text-4xl font-bold font-podkova bg-slate-700 text-white text-center py-1 rounded-t-2xl">Sign Up</h1>
            <div className="border-t pt-5 flex flex-col">
                <UploadThings imgUrl={imgUrl} setImgUrl={setImgUrl} isUploaded={isUploaded} />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-white p-2 pb-7 bg-slate-700">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Username :</label>
                        <input {...register("username")} type="text" id="username" placeholder="Username" className="min-w-80 w-full p-2  rounded-md text-black" />
                        {errors.username && (
                            <div className="text-base text-red-500 border border-red-500 rounded-md px-2 py-1 bg-red-300 mt-1 whitespace-nowrap flex gap-1 items-center justify-center">
                                <IoWarningOutline className="min-w-5" />
                                {errors.username.message as React.ReactNode}
                            </div>
                        )}
                    </div>
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
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword">Re-Enter Your Password :</label>
                        <input {...register("confirmPassword")} type="password" id="confirmPassword" placeholder="Re-Enter Your Password" className="min-w-80 w-full p-2 rounded-md text-black" />
                        {errors.confirmPassword && (
                            <div className="text-base text-red-500 border border-red-500 rounded-md px-2 py-1 bg-red-300 mt-1 whitespace-nowrap flex gap-1 items-center justify-center">
                                <IoWarningOutline className="min-w-5" />
                                {errors.confirmPassword.message as React.ReactNode}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmiting}
                        className={`${
                            isSubmiting ? "cursor-not-allowed" : ""
                        } bg-yellow-500 text-black py-5 rounded-xl relative flex items-center justify-center mt-5 font-bold font-podkova text-xl group hover:translate-y-1 duration-200 hover:mx-1`}
                    >
                        <span className="group-hover:-translate-y-3 absolute inset-0 group-hover:-left-1 group-hover:-right-1 flex items-center justify-center group-hover:bg-[#ffffff70] group-hover:backdrop-blur-sm rounded-xl duration-200">
                            {isSubmiting ? "Loading..." : "Submit"}
                        </span>
                    </button>
                </form>
                <div className="bg-slate-700 flex items-center justify-end text-white py-5 px-2 rounded-b-2xl border-t">
                    <p>Already have an account?</p>
                    <Link href={"/sign-in"} className="pr-1 text-blue-500 hover:underline ">
                        Sign In
                    </Link>
                    <p>Here</p>
                </div>
            </div>
        </div>
    );
};

export default SignUpLayout;
