import { formatDate } from "date-fns";
import Link from "next/link";
import React from "react";

interface TabsPageCardProps {
    apiData: any[];
    isChance: boolean;
}

const TabsPageCard: React.FC<TabsPageCardProps> = ({ apiData, isChance }) => {
    return (
        <div className="flex gap-5 flex-wrap p-5 pt-0 md:px-20 items-center justify-between">
            {apiData.map((data: any, i: number) => {
                const titleOri = data.title || data.name;
                const title = titleOri
                    .replace(/[^A-Za-z0-9\s]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .replace(/ /g, "-");

                let date = "-";
                if (data.release_date !== null) {
                    const oriDate = new Date(data.release_date);
                    if (!isNaN(oriDate.getTime())) {
                        date = formatDate(oriDate, "yyyy");
                    }
                }

                const vote = data.vote_average ? Math.ceil((data.vote_average / 10) * 100) : "-";

                return (
                    <Link key={i} href={`/movie/${data.id}-${title}`} className={`border group p-2 w-[220px] rounded-md bg-black bg-opacity-60 flex flex-col items-center`}>
                        {isChance ? (
                            <div className="w-full h-[360px] flex items-center justify-center rounded-md">
                                <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-black animate-spin"></div>
                            </div>
                        ) : (
                            <>
                                <div className="w-full h-72 rounded-md overflow-hidden">
                                    <img src={`${process.env.NEXT_PUBLIC_IMG_URL_W}${data.poster_path}`} alt="" className="w-full h-full object-cover rounded-md group-hover:scale-110 duration-300" />
                                </div>
                                <div className="w-full flex flex-col items-center justify-between gap-1 relative">
                                    <div className="absolute w-14 h-14 bg-black border-green-500 border-4 rounded-full left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 flex items-center justify-center">
                                        <p className="text-white font-podkova">{vote}%</p>
                                    </div>
                                    <div className="w-full flex items-center py-1 justify-between">
                                        <p className="border rounded px-1 border-green-700 text-green-700 bg-green-300 uppercase">{data.original_language ?? "-"}</p>
                                        <p className="border rounded px-1 border-green-700 text-green-700 bg-green-300">{date}</p>
                                    </div>
                                    <h1 className="text-2xl font-bold font-podkova w-full text-center line-clamp-1 group-hover:text-yellow-500 group-hover:border group-hover:bg-opacity-50 group-hover:bg-black group-hover:border-black border border-white bg-white bg-opacity-50 duration-300 rounded-md">
                                        {data.title}
                                    </h1>
                                </div>
                            </>
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default TabsPageCard;
