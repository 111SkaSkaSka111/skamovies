import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { IoSettings } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

interface detailUser {
    userInfo: User;
}

const DetailUser: React.FC<detailUser> = ({ userInfo }) => {
    return (
        <div className="w-full min-h-52 border flex-col md:flex-row border-black rounded-md flex gap-10 px-3 py-1 bg-slate-700 text-yellow-500">
            <div className="flex flex-col justify-between pb-3">
                <div>
                    <h1 className="text-2xl from-bold font-podkova ">About :</h1>
                    <div className="px-5 font-semibold mt-1 min-w-fit whitespace-nowrap">
                        <p className="text-lg">
                            Location : <span className="text-white text-xl font-bold font-podkova ml-2">N/A</span>
                        </p>
                        <p className="text-lg">
                            Gender : <span className="text-white text-xl font-bold font-podkova ml-2">N/A</span>
                        </p>
                        <p className="text-lg">
                            Age : <span className="text-white text-xl font-bold font-podkova ml-2">N/A</span>
                        </p>
                    </div>
                </div>
                <Link
                    href={"/"}
                    className="border w-fit px-10 mt-5 md:mt-0 whitespace-nowrap group flex gap-1 items-center bg-black text-white hover:text-yellow-500 hover:border-yellow-500 py-2 shadow-[4px_4px_0_white] hover:translate-x-1 hover:translate-y-1 duration-300 hover:shadow-[0_0_0_white] mb-1"
                >
                    <IoSettings className="group-hover:rotate-180 duration-300" />
                    Account Setting
                </Link>
            </div>
            <div className="flex flex-col justify-between pb-3 gap-3 w-full">
                <div className="flex flex-col h-full w-full">
                    <h1 className="text-2xl from-bold font-podkova">Bio :</h1>
                    <div className="px-5 py-3 font-semibold mt-1 bg-black border w-full h-full">
                        <p>Your bio here...!</p>
                    </div>
                </div>
                {userInfo?.role === "USER" ? null : (
                    <Link
                        href={"/"}
                        className="border w-fit px-10 whitespace-nowrap bg-black text-white hover:text-yellow-500 hover:border-yellow-500 py-2 shadow-[4px_4px_0_white] hover:translate-x-1 flex items-center gap-1 hover:translate-y-1 duration-300 hover:shadow-[0_0_0_white] mb-1"
                    >
                        <MdAdminPanelSettings className="text-xl" />
                        Admin Dashboard
                    </Link>
                )}
            </div>
        </div>
    );
};

export default DetailUser;
