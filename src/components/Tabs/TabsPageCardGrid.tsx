import { formatDate } from "date-fns";
import Link from "next/link";
import React from "react";

const TabsPageCardGrid = ({ apiData, isChance }: { apiData: any; isChance: boolean }) => {
    return (
        <div className="grid xl:grid-cols-5 min-[900px]:grid-cols-3 grid-cols-2 gap-5 min-[600px]:gap-10 xl:gap-5">
            {apiData.map((data: any, i: number) => {
                const oriTitle = data.title || data.name;
                const title = oriTitle
                    .replace(/[^A-Za-z0-9\s]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .replace(/ /g, "-");

                let date;
                if (data.release_date !== null) {
                    const oriDate = new Date(data.release_date);
                    if (!isNaN(oriDate.getTime())) {
                        date = formatDate(oriDate, "yyyy");
                    }
                }

                const vote = data.vote_average ? Math.ceil((data.vote_average / 10) * 100) : null;

                return (
                    <Link href={`/movie/${data.id}-${title}`} key={i} className="bg-black bg-opacity-50 rounded-md p-2 group">
                        <div className="w-full aspect-[3/4] rounded-md overflow-hidden flex items-center justify-center">
                            {isChance ? (
                                <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-black animate-spin"></div>
                            ) : (
                                <img src={`${process.env.NEXT_PUBLIC_IMG_URL_W}${data.poster_path}`} alt="" className="w-full h-full group-hover:scale-110 duration-300 object-cover rounded" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-between w-full pt-1 relative">
                            <div className="w-12 h-12 rounded-full border-2 border-lime-500 absolute left-1/2 -top-1/2 translate-y-1/3 -translate-x-1/2 bg-black flex items-center justify-center text-white font-podkova">
                                <p>{vote ? `${vote}%` : "-"}</p>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="px-1 border rounded border-green-700 uppercase text-green-700 bg-green-300">{data.original_language ?? "-"}</p>
                                <p className="px-1 border rounded border-green-700 text-green-700 bg-green-300">{date}</p>
                            </div>
                            <h1 className="line-clamp-1 border group-hover:text-yellow-500 group-hover:bg-black duration-300 rounded-md border-white w-full text-2xl font-podkova font-bold text-center bg-white bg-opacity-50">
                                {data.title}
                            </h1>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default TabsPageCardGrid;
