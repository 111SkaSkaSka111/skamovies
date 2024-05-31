"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface NavigationGenreSortProps {
    title: string;
    path: string;
    k: string;
    y: string;
    name: string;
}

const NavigationGenreSort: React.FC<NavigationGenreSortProps> = ({ title, path, k, y, name }) => {
    const pathname = usePathname();

    const createUrl = (sort: string) => {
        if (k && y) {
            return `${pathname}?name=${name}&k=${k}&y=${y}&s=${path}.${sort}&page=1`;
        } else if (k) {
            return `${pathname}?name=${name}&k=${k}&s=${path}.${sort}&page=1`;
        } else if (y) {
            return `${pathname}?name=${name}&y=${y}&s=${path}.${sort}&page=1`;
        } else {
            return `${pathname}?name=${name}&s=${path}.${sort}&page=1`;
        }
    };

    return (
        <div className="relative group">
            <p className="py-2 px-2 hover:bg-black hover:bg-opacity-30 w-40 rounded-t cursor-pointer hover:text-white flex items-center justify-between">
                {title} <MdOutlineKeyboardArrowLeft className="text-xl group-hover:rotate-180 duration-300" />{" "}
            </p>
            <div className="absolute left-[100%] top-0 px-5 scale-0 group-hover:scale-100 duration-300 origin-top-left">
                <Link href={createUrl("asc")} className="py-1 bg-white pl-2 w-20 block rounded-t-md border border-b-0 hover:bg-black hover:bg-opacity-30 hover:text-white">
                    Asc
                </Link>
                <Link href={createUrl("desc")} className="py-1 bg-white pl-2 w-20 block rounded-b-md border border-t-0 hover:bg-black hover:bg-opacity-30 hover:text-white">
                    Desc
                </Link>
            </div>
        </div>
    );
};

export default NavigationGenreSort;
