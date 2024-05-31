import React from "react";
import SearchButton from "./SearchButton";
import Link from "next/link";
import { formatDate } from "date-fns";

const SearchCard = ({ apiData, user, type }: { apiData: any; user: any; type: string }) => {
    return (
        <div className="rounded-xl p-4 bg-black flex flex-col gap-10">
            {apiData.map((data: any, i: number) => {
                const titleOri = data.title || data.name;
                const title = titleOri
                    .replace(/[^A-Za-z0-9\s]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .replace(/ /g, "-");

                const dateOri = data.release_date || data.first_air_date ? new Date(data.release_date || data.first_air_date) : null;
                const date = dateOri ? formatDate(dateOri, "dd-MM-yyyy") : "-";

                return (
                    <Link
                        href={`/${type}/${data.id}-${title}`}
                        key={i}
                        className="h-36 w-full overflow-hidden shadow-[4px_4px_0_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_white] duration-300 relative z-10 group/bg rounded-lg bg-slate-700 flex items-center gap-5"
                    >
                        <span className="absolute left-0 right-[100%] group-hover/bg:right-0 duration-300 bottom-0 top-0 bg-gradient-to-r from-transparent to-red-700 z-[-1] from-60%"></span>
                        <div className="h-full min-w-28 max-w-28 bg-white">
                            <img src={`${process.env.NEXT_PUBLIC_IMG_URL_W}${data.poster_path}`} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="h-full w-full flex flex-col justify-between py-2 pr-2">
                            <div>
                                <div className="w-full line-clamp-1 text-white flex items-center justify-between">
                                    <h1 className="text-xl line-clamp-1">{data.title || data.name}</h1>
                                    <p className="text-xs italic pr-1 whitespace-nowrap">{date}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    {data.genres.map((genre: any, i: number) => {
                                        return (
                                            <p key={i} className="border whitespace-nowrap rounded-full px-2 text-xs bg-green-300 border-green-700">
                                                {genre.name}
                                            </p>
                                        );
                                    })}
                                </div>
                                <p className="text-white mt-2 text-xs line-clamp-2">{data.overview}</p>
                            </div>
                            {user && <SearchButton data_id={data.id} data_image={data.poster_path} data_title={data.title || data.name} data_type={type} user_email={user.email} />}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SearchCard;
