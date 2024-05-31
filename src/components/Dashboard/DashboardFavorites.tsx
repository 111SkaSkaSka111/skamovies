import { DashboardFavoritesProps } from "@/libs/typesAnno";
import { Favorites } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DashboardFavoritesCard from "./DashboardFavoritesCard";

const DashboardFavorites: React.FC<DashboardFavoritesProps> = ({ type, tvCount, movieCount, favoritesCount, favorites }) => {
    const teksFavorites = type === "tv" ? "Tv Series" : type === "movie" ? "Movies" : "Gallery";
    const countFavorites = type === "tv" ? tvCount : type === "movie" ? movieCount : favoritesCount;
    return (
        <>
            <div className="border-t border-b-2 pt-3 border-black flex items-center justify-between">
                <h1 className="text-3xl font-bold font-podkova">
                    Favorites {teksFavorites} ({countFavorites})
                </h1>
                <div className="flex items-center gap-3">
                    <Link href={"/user/dashboard"} className="underline hover:text-blue-500">
                        All ({favoritesCount})
                    </Link>
                    <Link href={"/user/dashboard?type=movie"} className="underline hover:text-blue-500">
                        Movie ({movieCount})
                    </Link>
                    <Link href={"/user/dashboard?type=tv"} className="underline hover:text-blue-500">
                        Tv Series ({tvCount})
                    </Link>
                </div>
            </div>
            <div className="my-5 p-5 bg-black bg-opacity-50">
                <DashboardFavoritesCard favorites={favorites} />
            </div>
        </>
    );
};

export default DashboardFavorites;
