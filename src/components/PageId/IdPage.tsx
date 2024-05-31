import { formatDate } from "date-fns";
import Link from "next/link";
import React from "react";
import IdPageFavorites from "./IdPageFavorites";
import IdPageVote from "./IdPageVote";
import IdPageVoteUser from "./IdPageVoteUser";
import { IdPageProps } from "@/libs/typesAnno";

const IdPage: React.FC<IdPageProps> = ({ apiData, type, user, favorites }) => {
    const engTitle = apiData?.title || apiData?.name;
    const oriTitle = apiData?.original_title || apiData?.original_name;
    const title = oriTitle === engTitle ? `${engTitle}` : `${engTitle}(${oriTitle})`;
    const oriBudget = apiData?.budget;
    const oriRevenue = apiData?.revenue;

    const originCountryRes = apiData?.production_countries.map((data: any) => {
        return data;
    });
    const originCountry = originCountryRes[0];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    };

    const budget = oriBudget ? formatCurrency(oriBudget) : "-";
    const revenue = oriRevenue ? formatCurrency(oriRevenue) : "-";

    const oriVote = apiData?.vote_average;
    const vote = Math.ceil((oriVote / 10) * 100);

    const oriRuntime = apiData?.runtime;
    const hours = Math.floor(oriRuntime / 60);
    const minutes = oriRuntime % 60;

    const runtime = oriRuntime ? `${hours}h ${minutes}m` : "-";

    const episode = type === "tv" ? apiData.number_of_episodes : null;

    let date;
    if (apiData?.release_date !== null) {
        const oriDate = new Date(apiData?.release_date || apiData?.first_air_date);
        if (!isNaN(oriDate.getTime())) {
            date = formatDate(oriDate, "dd-MM-yyyy");
        }
    }

    return (
        <>
            <div className="absolute inset-0 z-[-2]">
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${apiData?.backdrop_path}`} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent to-black from-70%"></div>
            <div className="flex items-center justify-center gap-5 py-5 w-full flex-col md:flex-row">
                <div className="min-h-[400px] min-w-[260px]">
                    <img src={`${process.env.NEXT_PUBLIC_IMG_URL_W}${apiData?.poster_path}`} alt="" className="w-full h-full min-h-[400px] min-w-[260px] max-h-[460px] max-w-[260px] rounded-xl" />
                </div>
                <div className="w-full min-h-[400px] flex flex-col px-5 justify-between bg-black bg-opacity-50 rounded-xl py-3">
                    <div className="">
                        <h1 className="text-4xl line-clamp-1 text-yellow-500 font-bold">{title}</h1>
                        <div className="flex items-center gap-2">
                            <p className="text-white text-sm">{date}</p>
                            <span className="p-[2px] bg-white rounded-full"></span>
                            {apiData?.genres.map((genre: any, i: number) => {
                                return (
                                    <Link href={`/genre/${genre.id}/${genre.name}/${type}`} key={i} className="border hover:opacity-70 rounded-full text-xs px-2 text-green-700 bg-green-300 border-green-700">
                                        {genre.name}
                                    </Link>
                                );
                            })}
                            <span className="p-[2px] bg-white rounded-full"></span>
                            <Link href={`/country/${originCountry?.iso_3166_1}/${type}?name=${originCountry?.name}`} className="border rounded px-1 uppercase border-green-700 bg-green-300 text-green-700 text-sm">
                                {originCountry?.iso_3166_1}
                            </Link>
                        </div>
                        <div className="flex gap-5 mt-5 flex-col md:flex-row">
                            <div className="p-1 bg-black bg-opacity-70 max-w-fit whitespace-nowrap rounded-l-full flex items-center justify-center gap-3">
                                <IdPageVote vote={vote} />
                                <IdPageVoteUser voteCount={apiData?.vote_count} />
                            </div>
                            <div className="flex flex-col w-full justify-between text-white">
                                <div className="border px-2 py-1 flex items-center gap-5">
                                    <p>Budget: {budget ?? "-"}</p>
                                    <p>Revenue: {revenue ?? "-"}</p>
                                    {type === "tv" ? <p>Episode: {episode ?? "-"}</p> : null}
                                </div>
                                <div className="border px-2 py-1 flex items-center gap-5">
                                    <p>Status: {apiData?.status ?? "-"}</p>
                                    <p>
                                        Runtime: <span className="whitespace-nowrap">{runtime}</span>
                                    </p>
                                    <p>
                                        Language: <span className="uppercase border rounded px-1 border-green-700 bg-green-300 text-green-700">{apiData?.original_language ?? "-"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {user && !favorites && <IdPageFavorites apiData={apiData} user={user} type={type} engTitle={engTitle} />}
                    </div>
                    <div className="flex flex-col justify-between h-full w-full gap-5 text-white">
                        <p className="italic font-semibold text-slate-300">{apiData?.tagline}</p>
                        <div>
                            <p className="border-b mb-2">Overview:</p>
                            <p className="text-sm text-slate-200 line-clamp-4">{apiData?.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IdPage;
