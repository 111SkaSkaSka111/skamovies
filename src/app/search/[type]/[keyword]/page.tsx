import { getGenre } from "@/libs/getGenre";
import { redirect } from "next/navigation";
import SearchCard from "@/components/Search/SearchCard";
import getUser from "@/libs/getUser";
import axios from "axios";
import React from "react";
import PaginationSearch from "@/components/Pagination/PaginationSearch";

export async function generateMetadata({ params }: { params: any }) {
    const { keyword } = params;
    const decodeKeyword = decodeURI(keyword);
    return {
        title: `Search > ${decodeKeyword}`,
    };
}

const Page = async ({ params, searchParams }: { params: any; searchParams: any }) => {
    const { keyword, type } = params;
    const { page = "1" } = searchParams;
    const pageInt = parseInt(page);
    const decodeKeyword = decodeURI(keyword);
    const session = await getUser();
    const user = session.user;

    if (page <= 0) {
        redirect(`/search/${type}/${keyword}?page=1`);
    }

    const apiDataRes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/search/${type}?api_key=${process.env.NEXT_TMDB_KEY}&query=${keyword}&include_adult=false&language=en-US&page=${page}`);

    const apiData = await getGenre({ apiData: apiDataRes });
    const totalResults = apiDataRes?.data?.total_results;
    const totalPagesOri = apiDataRes?.data?.total_pages;
    const totalPages = totalPagesOri > 100 ? 100 : totalPagesOri;

    if (page > totalPages) {
        redirect(`/search/${type}/${keyword}?page=${totalPages}`);
    }

    return (
        <main>
            <header className="px-20 py-5 border-b text-white flex items-center justify-between">
                <h1 className="text-4xl border-b-2 rounded-full w-fit px-3 border-lime-500 bg-gradient-to-br from-black via-emerald-500 to-black from-20% to-80%">
                    Search &gt; <span>{decodeKeyword}</span>
                </h1>
                <p className="text-black border-b-2 border-black rounded-full px-2">
                    Total results: <span>{totalResults}</span>
                </p>
            </header>
            <section className="px-5 md:px-20 py-5">
                <SearchCard apiData={apiData} user={user} type={type} />
            </section>
            <section className="px-5 md:px-20 flex items-center justify-center py-5 border-t">
                <PaginationSearch pageInt={pageInt} totalPages={totalPages} keyword={keyword} type={type} />
            </section>
        </main>
    );
};

export default Page;
