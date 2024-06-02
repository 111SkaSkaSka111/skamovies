import PaginationUniv from "@/components/Pagination/PaginationUniv";
import SearchCard from "@/components/Search/SearchCard";
import { getGenre } from "@/libs/getGenre";
import getUser from "@/libs/getUser";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

interface PageProp {
    params: any;
    searchParams: any;
}

export async function generateMetadata({ params }: { params: any }) {
    const { runtime, type } = params;

    return {
        title: `${type === "tv" ? "TV Series" : "Movies"} > ${runtime === "now_playing" ? "Now Playing" : runtime === "upcoming" ? "Upcoming" : runtime === "popular" ? "Popular" : "Top Rated"}`,
    };
}

const Page: React.FC<PageProp> = async ({ params, searchParams }) => {
    const { runtime, type } = params;
    const { page = "1" } = searchParams;
    const pageInt = parseInt(page);

    const createUrl = (page: number) => {
        return `?page=${page.toString()}`;
    };

    if (pageInt < 1) {
        redirect(createUrl(1));
    }

    const session = await getUser();
    const user = session?.user;

    const decodeRuntime = runtime === "now_playing" ? "Now Playing" : runtime === "upcoming" ? "Upcoming" : runtime === "popular" ? "Popular" : "Top Rated";

    const apiDataRes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${runtime}?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`);

    const apiData = await getGenre({ apiData: apiDataRes });
    const totalResults = apiDataRes?.data?.total_results;
    const totalPagesOri = apiDataRes?.data?.total_pages || 1;
    const totalPages = totalPagesOri > 500 ? 500 : totalPagesOri;

    if (pageInt > totalPages) {
        redirect(createUrl(totalPages));
    }

    return (
        <main>
            <section className="p-5 md:px-20 flex items-center justify-between border-b-2">
                <h1 className="text-4xl font-bold font-podkova px-2 border-b-4 rounded-full border-yellow-500">
                    {type === "tv" ? "TV Series" : "Movies"} &gt; {decodeRuntime}
                </h1>
                <p className="border-b-2 rounded-full px-2 border-black italic">Total Results: {totalResults}</p>
            </section>
            <section className="p-5 md:px-20">
                <SearchCard apiData={apiData} type={type} user={user} />
            </section>
            <section className="p-5 md:px-20 border-t-2 flex items-center justify-center">
                <PaginationUniv pageInt={pageInt} totalPages={totalPages} />
            </section>
        </main>
    );
};

export default Page;
