"use client";

import type { IdPageFavorites } from "@/libs/typesAnno";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const IdPageFavorites: React.FC<IdPageFavorites> = ({ engTitle, apiData, user, type }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const title = apiData.title || apiData.name;
    const image = apiData.poster_path;
    const originCountry = apiData.origin_country[0];

    const handleFavorites = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const body = { user_email: user?.email, data_id: apiData.id, data_title: title, data_image: image, data_type: type, data_origin_country: originCountry };

        // console.log(body);

        const res = await fetch("/api/v1/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const createFavorites = await res.json();

        if (createFavorites.status === 202) {
            alert(createFavorites.message);
            setLoading(false);
            router.refresh();
        } else {
            alert(createFavorites.message);
            setLoading(false);
            router.refresh();
        }
    };

    return (
        <div onClick={handleFavorites} className={`text-white flex gap-5 mt-5 w-fit ${loading ? "cursor-not-allowed" : ""}`}>
            <div className={`border px-2 rounded justify-center bg-[#00000060] flex gap-2 items-center relative group cursor-pointer hover:text-yellow-500 hover:border-yellow-500`}>
                {loading ? (
                    <p className="flex gap-2 items-center">
                        <span className="p-[6px] border-[3px] border-l-black animate-spin rounded-full"></span>Loading...
                    </p>
                ) : (
                    <p className="flex gap-2 items-center">
                        <FaHeart /> Favorites
                    </p>
                )}

                <div className="pointer-events-none group-hover:scale-100 absolute top-[150%] border rounded px-2 bg-black scale-0 duration-300 border-yellow-500 origin-top">
                    <div className="whitespace-nowrap">Add {engTitle} to Favorites</div>
                    <span className="absolute w-3 h-3 border bg-black top-[-6px] rounded-br-full left-1/2 translate-x-[-50%] border-r-transparent border-b-transparent rotate-[45deg] border-yellow-500"></span>
                </div>
            </div>
        </div>
    );
};

export default IdPageFavorites;
