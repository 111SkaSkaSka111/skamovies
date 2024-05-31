import Link from "next/link";
import React, { Key } from "react";

const CarouselDetail = ({ apiData }: { apiData: any }) => {
    const titleOri = apiData.title;
    const title = titleOri
        .replace(/[^A-Za-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/ /g, "-");

    return (
        <div className="w-full min-h-[230px] flex flex-col justify-between pb-1">
            <div className="">
                <Link href={`/movie/${apiData.id}-${title}`} className="text-3xl font-bold font-podkova hover:text-yellow-500 line-clamp-1">
                    {apiData.title}
                </Link>
                <div className="flex items-center gap-1 mt-1">
                    {apiData.genres.map((genre: any, i: Key | null | undefined) => {
                        return (
                            <Link href={`/genre/${genre.id}/${genre.name}/movie`} key={i} className="border hover:opacity-70 rounded-full px-2 text-xs bg-green-300 text-green-700 border-green-700">
                                {genre.name}
                            </Link>
                        );
                    })}
                </div>
                <p className="mt-5 line-clamp-3">{apiData?.overview}</p>
            </div>
            <Link
                href={`/movie/${apiData.id}-${title}`}
                className="border relative z-[999] px-10 py-2 bg-black hover:bg-yellow-500 hover:text-black font-bold duration-200 hover:border-yellow-500 shadow-[4px_4px_0_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_white] w-fit"
            >
                See More
            </Link>
        </div>
    );
};

export default CarouselDetail;
