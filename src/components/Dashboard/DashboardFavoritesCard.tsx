"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardFavoritesCard = ({ favorites }: { favorites: any }) => {
    const router = useRouter();

    const handleDelete = async (e: { preventDefault: () => void }, datas: any) => {
        e.preventDefault();
        const { data_id, user_email, id } = datas;
        const data = { data_id, user_email, id };

        const res = await fetch("/api/v1/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const deleteFavorites = await res.json();

        if (deleteFavorites.status === 200) {
            alert(deleteFavorites.message);
            router.refresh();
        } else {
            alert(deleteFavorites.message);
        }
    };

    return (
        <div className="rounded-md w-full gap-5  flex flex-wrap items-center">
            {favorites.map((data: any, i: number) => {
                const dataType = data.data_type;
                const type = dataType === "movie" ? "Movie" : "Tv Series";
                const titleOri = data.data_title;
                const title = titleOri
                    .replace(/[^A-Za-z0-9\s]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .replace(/ /g, "-");

                return (
                    <Link href={`/${dataType}/${data.data_id}-${title}`} key={i} className="min-w-[213px] overflow-hidden group/image min-h-[320px] max-w-[213px] max-h-[320px] z-10 rounded-md relative">
                        <button onClick={(e) => handleDelete(e, data)} className="absolute right-0 left-0 top-0 py-1 hidden font-bold items-center justify-center bg-red-500 bg-opacity-50 group-hover/image:flex hover:bg-opacity-100">
                            Delete
                        </button>
                        <Image
                            width={215}
                            height={350}
                            src={`${process.env.NEXT_PUBLIC_IMG_URL_W}${data.data_image}`}
                            alt={data.data_title}
                            className="absolute group-hover/image:scale-110 duration-300 min-w-[213px] min-h-[320px] max-w-[213px] max-h-[320px] inset-0 rounded object-cover bg-white z-[-1]"
                        />
                        <div className="absolute left-0 bottom-0 p-2 flex flex-col items-center justify-between gap-3 w-full">
                            <div className="flex items-center justify-between w-full">
                                <p className="border border-green-700 bg-green-300 text-green-700 px-1 rounded-md">{type}</p>
                                <p className="border border-green-700 bg-green-300 text-green-700 px-1 rounded-md">{data.data_origin_country}</p>
                            </div>
                            <p className="line-clamp-1 bg-white w-full px-1 bg-opacity-70 rounded-md group-hover/image:text-yellow-500 group-hover/image:bg-black duration-200">{data.data_title}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default DashboardFavoritesCard;
