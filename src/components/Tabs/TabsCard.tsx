import { formatDate } from "date-fns";
import Link from "next/link";
import React from "react";

interface TabsCardsProps {
    apiData: any[];
    className: string;
    type: string;
}

const TabsCard: React.FC<TabsCardsProps> = ({ apiData, className, type }) => {
    return (
        <>
            {apiData.length > 0 ? (
                <div className={`${className} rounded flex items-center gap-5 absolute bottom-5 left-0 right-0 overflow-auto h-fit md:px-20 px-5 duration-1000`}>
                    {apiData.map((data: any, index: number) => {
                        const titleOri = data.title || data.name;
                        const title = titleOri
                            .replace(/[^A-Za-z0-9\s]/g, " ")
                            .replace(/\s+/g, " ")
                            .trim()
                            .replace(/ /g, "-");

                        const dateOri = data.release_date || data.first_air_date ? new Date(data.release_date || data.first_air_date) : null;
                        const date = dateOri ? formatDate(dateOri, "yy") : "-";

                        const voteOri = data.vote_average;
                        const vote = Math.ceil(voteOri * 10);

                        return (
                            <Link href={`/${type}/${data.id}-${title}`} key={index} className="border p-2 flex flex-col rounded-xl bg-white bg-opacity-50 group/card">
                                <div className="min-w-48 min-h-64 max-w-48 max-h-64 z-10 h-full border bg-black relative rounded-lg overflow-hidden">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_IMG_URL_W}${data.poster_path}`}
                                        loading="lazy"
                                        alt=""
                                        className="absolute left-0 w-full group-hover/card:scale-110 group-hover/card:skew-x-3 duration-300 top-0 h-full object-cover z-[-1]"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 mt-1 relative">
                                    <div className="absolute bottom-[100%] translate-y-1/2 w-[50px] h-[50px] shadow-[inset_0_0_0_3px_chartreuse] bg-black rounded-full left-1/2 z-[999] -translate-x-1/2 flex items-center justify-center text-white font-podkova">
                                        <p>{vote}%</p>
                                    </div>
                                    <div className="flex w-full items-center justify-between">
                                        <p className="border font-semibold rounded px-1 py-[2px] border-green-700 text-green-700 bg-green-200 text-sm uppercase">{data.original_language}</p>
                                        <p className="border font-semibold rounded px-1 py-[2px] border-green-700 text-green-700 bg-green-200 text-sm">{date}</p>
                                    </div>
                                    <p className="px-2 py-[2px] line-clamp-1 group-hover/card:text-yellow-500 group-hover/card:bg-black duration-200 bg-white bg-opacity-60 border rounded-md">{data.title || data.name}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className={`${className} rounded origin-top-left flex items-center justify-center gap-5 absolute bottom-5 left-0 right-0 overflow-auto h-full z-[-1] md:px-20 px-5 duration-1000 bg-black`}>
                    <p className="text-white text-4xl">Kosong nih</p>
                </div>
            )}
        </>
    );
};

export default TabsCard;
