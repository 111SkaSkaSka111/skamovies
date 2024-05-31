"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import NavigationGenreSort from "./NavigationGenreSort";
import { useParams, useSearchParams } from "next/navigation";

interface NavigationGenreProps {
    type: string;
    path: string;
    s: string;
    k: string;
    y: string;
    name: string;
    url: string;
}

const NavigationGenre: React.FC<NavigationGenreProps> = ({ type, path, s, k, y, name, url }) => {
    const urlPath = (typeUrl: string) => {
        // url === 'discover' ? `${path}/${typeUrl}?name=${name}&` : `${path}/${typeUrl}?`

        if (url === "discover") {
            return `${path}/${typeUrl}?name=${name}&`;
        } else {
            return `${path}/${typeUrl}?`;
        }
    };

    const createUrl = (typeUrl: string) => {
        if (k && s && y) {
            return `${urlPath(typeUrl)}k=${k}&s=${s}&y=${y}&page=1`;
        } else if (k && s) {
            return `${urlPath(typeUrl)}k=${k}&s=${s}&page=1`;
        } else if (k && y) {
            return `${urlPath(typeUrl)}k=${k}&y=${y}&page=1`;
        } else if (s && y) {
            return `${urlPath(typeUrl)}s=${s}&y=${y}&page=1`;
        } else if (k) {
            return `${urlPath(typeUrl)}k=${k}&page=1`;
        } else if (s) {
            return `${urlPath(typeUrl)}s=${s}&page=1`;
        } else if (y) {
            return `${urlPath(typeUrl)}y=${y}&page=1`;
        } else {
            return `${urlPath(typeUrl)}page=1`;
        }
    };

    const linkValidation = type === "movie" ? "primary_release_date" : "first_air_date";

    return (
        <div className="flex gap-5 ">
            <div className="group/type relative whitespace-nowrap">
                <p className="cursor-pointer flex items-center justify-center gap-3 group-hover/type:text-yellow-500">
                    {type === "movie" ? "Movie" : "Tv Series"}
                    <span>
                        <MdOutlineKeyboardArrowUp className="text-xl group-hover/type:rotate-180 duration-300" />
                    </span>
                </p>
                <div className="absolute top-[100%] scale-0 group-hover/type:scale-100 duration-300 origin-top border rounded-md bg-white flex flex-col z-[999] overflow-hidden shadow-md shadow-black">
                    <Link href={createUrl("movie")} className="py-2 pl-2 pr-10 hover:text-white w-full hover:bg-black hover:bg-opacity-30">
                        Movie
                    </Link>
                    <Link href={createUrl("tv")} className="py-2 pl-2 pr-10 hover:text-white w-full hover:bg-black hover:bg-opacity-30">
                        Tv Series
                    </Link>
                </div>
            </div>
            <div className="group/sort relative whitespace-nowrap">
                <p className="flex gap-3 items-center justify-center group-hover/sort:text-yellow-500 cursor-pointer">
                    Sort by <MdOutlineKeyboardArrowUp className="text-xl group-hover/sort:rotate-180 duration-300" />
                </p>
                <div className="absolute top-[100%] bg-white shadow-md shadow-black border rounded-md flex flex-col whitespace-nowrap scale-0 group-hover/sort:scale-100 duration-300 origin-top">
                    <NavigationGenreSort name={name} k={k} y={y} path={"popularity"} title="Popularity" />
                    <NavigationGenreSort name={name} k={k} y={y} path={"vote_average"} title="Rating" />
                    <NavigationGenreSort name={name} k={k} y={y} path={linkValidation} title="Released Date" />
                </div>
            </div>
        </div>
    );
};

export default NavigationGenre;
