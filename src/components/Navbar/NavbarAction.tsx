"use client";

import Link from "next/link";
import React, { LegacyRef, useRef } from "react";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import NavbarHamburger from "./NavbarHamburger";
import NavbarSearch from "./NavbarSearch";
import type { NavbarAction } from "@/libs/typesAnno";

const NavbarAction: React.FC<NavbarAction> = ({ link, teks, user }) => {
    const navRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

    return (
        <>
            <div className="flex items-center gap-5">
                <div ref={navRef} className="flex origin-top-right scale-0 md:scale-100 duration-300 absolute md:static flex-col md:flex-row right-10 bg-black p-5 md:p-0 px-2 rounded-md top-[150%] items-center justify-center gap-5">
                    <p className="w-full py-2 md:hidden text-center text-xl bg-gradient-to-br from-black from-30% via-teal-500 to-black to-70%">{user?.name}</p>
                    <Link href={link} className="border px-10 w-full md:w-fit font-bold relative group z-10 flex items-center justify-center overflow-hidden bg-yellow-500 py-2 text-black hover:text-white">
                        <span className="absolute w-0 h-full bg-slate-700 group-hover:w-[110%] duration-300 bg-opacity-70 z-[-1] flex items-center justify-center"></span>
                        {teks}
                    </Link>
                    {user && (
                        <Link href={"/user/dashboard"} className="text-4xl flex items-center gap-2 dasharray hover:bg-white md:hover:bg-transparent duration-300 hover:bg-opacity-50 rounded px-1">
                            <RiDashboardHorizontalFill className="text-[43px] custom-dasharray" />
                            <p className="text-2xl md:hidden">Dashboard</p>
                        </Link>
                    )}
                </div>
                <NavbarSearch />
                <NavbarHamburger linkRef={navRef} />
            </div>
        </>
    );
};

export default NavbarAction;
