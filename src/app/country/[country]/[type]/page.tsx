import NavigationGenre from "@/components/NavigationGenre/NavigationGenre";
import PaginationCountry from "@/components/Pagination/PaginationCountry";
import SearchCard from "@/components/Search/SearchCard";
import { getGenre } from "@/libs/getGenre";
import getUser from "@/libs/getUser";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({ params, searchParams }: { params: any; searchParams: any }) {
    const { name } = searchParams;
    const { type } = params;
    const decodeName = decodeURI(name);
    const typeUrl = type === "tv" ? "TV Series" : "Movies";

    return {
        title: `${typeUrl} > ${decodeName}`,
    };
}

const Page = async ({ params, searchParams }: { params: any; searchParams: any }) => {
    const { type, country } = params;
    const { page = "1" } = searchParams;
    const { name } = searchParams;
    const { k = "" } = searchParams; // with_origin_country
    const { s = `popularity.desc` } = searchParams; // sort_by
    const { y = "" } = searchParams; // primary_release_year
    const decodeName = decodeURI(name);
    const session = await getUser();
    const user = session?.user;
    const pageInt = parseInt(page);

    const createUrl = (page: number) => {
        if (k && s && y) {
            return `/country/${country}/${type}?name=${name}&k=${k}&s=${s}&y=${y}&page=${page.toString()}`;
        } else if (k && y) {
            return `/country/${country}/${type}?name=${name}&k=${k}&y=${y}&page=${page.toString()}`;
        } else if (k && s) {
            return `/country/${country}/${type}?name=${name}&k=${k}&s=${s}&page=${page.toString()}`;
        } else if (s && y) {
            return `/country/${country}/${type}?name=${name}&s=${s}&y=${y}&page=${page.toString()}`;
        } else if (k) {
            return `/country/${country}/${type}?name=${name}&k=${k}&page=${page.toString()}`;
        } else if (y) {
            return `/country/${country}/${type}?name=${name}&y=${y}&page=${page.toString()}`;
        } else if (s) {
            return `/country/${country}/${type}?name=${name}&s=${s}&page=${page.toString()}`;
        } else {
            return `/country/${country}/${type}?name=${name}&page=${page.toString()}`;
        }
    };

    if (pageInt < 1) {
        redirect(createUrl(1));
    }

    const year = type === "tv" ? "first_air_date_year" : "primary_release_year";
    const discoverRes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/discover/${type}?api_key=${process.env.NEXT_TMDB_KEY}&with_origin_country=${country}&page=${page}&sort_by=${s}&${year}=${y}`);

    const oriTotalPages = discoverRes?.data?.total_pages || 1;
    const totalPages = oriTotalPages > 100 ? 100 : oriTotalPages;
    const totalResults = discoverRes?.data?.total_results;

    if (pageInt > totalPages) {
        redirect(createUrl(totalPages));
    }

    const apiData = await getGenre({ apiData: discoverRes });

    return (
        <main>
            <section className="py-5 px-5 md:px-20 w-full flex items-center justify-between relative border-b-2">
                <h1 className="text-4xl font-podkova font-bold">
                    {type === "tv" ? "Tv Series" : "Movies"} &gt; {decodeName}
                </h1>
                <p className="text-sm border-b-2 border-black rounded-lg px-1">Total results: ({totalResults})</p>
                <div className="absolute left-1/2 -translate-x-1/2 w-fit bottom-0 z-[99999]">
                    <NavigationGenre url="discover" path={`/country/${country}`} type={type} k={k} s={s} y={y} name={name} />
                </div>
            </section>
            <section className="py-5 px-5 md:px-20">
                <SearchCard apiData={apiData} type={type} user={user} />
            </section>
            <section className="py-5 px-5 md:px-20 flex items-center justify-center border-t-2">
                <PaginationCountry country={country} k={k} name={name} pageInt={pageInt} s={s} totalPages={totalPages} type={type} y={y} />
            </section>
        </main>
    );
};

export default Page;
