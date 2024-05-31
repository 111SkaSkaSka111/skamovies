import PaginationGenre from "@/components/Pagination/PaginationGenre";
import SearchCard from "@/components/Search/SearchCard";
import getUser from "@/libs/getUser";
import axios from "axios";
import React from "react";
import { getGenre } from "@/libs/getGenre";
import { redirect } from "next/navigation";
import NavigationGenre from "@/components/NavigationGenre/NavigationGenre";

interface ParamsProps {
    id: string;
    name: string;
    type: string;
}

interface searchParamsProps {
    page: string;
    s: string;
    k: string;
    y: string;
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
    const { name } = params;
    const decodeName = decodeURI(name);

    return {
        title: `Genre > ${decodeName}`,
    };
}

const Page: React.FC<{ params: ParamsProps; searchParams: searchParamsProps }> = async ({ params, searchParams }) => {
    const { id, name, type } = params;
    const { page = "1" } = searchParams;
    const session = await getUser();
    const user = session.user;
    const { k = "" } = searchParams; // with_origin_country
    const { s = `popularity.desc` } = searchParams; // sort_by
    const { y = "" } = searchParams; // primary_release_year
    const pageInt = parseInt(page);
    const decodeName = decodeURI(name);

    const createUrl = (page: number) => {
        if (k && s && y) {
            return `/genre/${id}/${name}/${type}?k=${k}&s=${s}&y=${y}&page=${page.toString()}`;
        } else if (k && s) {
            return `/genre/${id}/${name}/${type}?k=${k}&s=${s}&page=${page.toString()}`;
        } else if (k && y) {
            return `/genre/${id}/${name}/${type}?k=${k}&y=${y}&page=${page.toString()}`;
        } else if (s && y) {
            return `/genre/${id}/${name}/${type}?s=${s}&y=${y}&page=${page.toString()}`;
        } else if (k) {
            return `/genre/${id}/${name}/${type}?k=${k}&page=${page.toString()}`;
        } else if (s) {
            return `/genre/${id}/${name}/${type}?s=${s}&page=${page.toString()}`;
        } else if (y) {
            return `/genre/${id}/${name}/${type}?y=${y}&page=${page.toString()}`;
        } else {
            return `/genre/${id}/${name}/${type}?page=${page.toString()}`;
        }
    };

    if (pageInt < 1) {
        redirect(createUrl(1));
    }

    const fixWord =
        s === "popularity.asc"
            ? "Popularity Asc"
            : s === "popularity.desc"
            ? "Popularity Desc"
            : s === "vote_average.asc"
            ? "Rating Asc"
            : s === "vote_average.desc"
            ? "Rating Desc"
            : s === "primary_release_date.asc"
            ? "Release Date Asc"
            : s === "primary_release_date.desc"
            ? "Release Date Desc"
            : s === "title.asc"
            ? "Title Asc"
            : s === "title.desc"
            ? "Title Desc"
            : s;

    const discoverRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/discover/${type}?api_key=${process.env.NEXT_TMDB_KEY}&include_video=false&language=en-US&page=${page}&sort_by=${s}&with_genres=${id}&with_origin_country=${k}&primary_release_year=${y}`
    );

    const oriTotalPages = discoverRes?.data?.total_pages || 1;
    const totalPages = oriTotalPages > 100 ? 100 : oriTotalPages;
    const totalResults = discoverRes?.data?.total_results;
    const apiData = await getGenre({ apiData: discoverRes });

    if (pageInt > totalPages) {
        redirect(createUrl(totalPages));
    }

    return (
        <main>
            <header className="w-full px-5 md:px-20 py-5 border-b-2 flex items-center justify-between relative">
                <div className="flex gap-5 items-center">
                    <h1 className="border-b-4 rounded-full border-yellow-500 font-semibold font-podkova px-3 text-4xl whitespace-nowrap line-clamp-1">Genre &gt; {decodeName}</h1>
                </div>
                <div className="absolute bottom-0 left-1/2 pt-2 -translate-x-1/2 z-[999] h-full flex flex-col items-center justify-between   ">
                    <p>{fixWord}</p>
                    <NavigationGenre url="genre" path={`/genre/${id}/${name}`} name="" type={type} k={k} s={s} y={y} />
                </div>
                <p className="text-sm border-b border-black rounded-lg px-1">Total results: ({totalResults})</p>
            </header>
            <section className="py-5 px-5 md:px-20">
                <SearchCard apiData={apiData} type={type} user={user} />
            </section>
            <section className="w-full flex items-center justify-center py-5 px-5 md:px-20 border-t-2">
                <PaginationGenre k={k} pageInt={pageInt} s={s} totalPages={totalPages} type={type} y={y} id={id} name={name} />
            </section>
        </main>
    );
};

export default Page;
