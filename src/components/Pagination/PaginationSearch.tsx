import Link from "next/link";
import React from "react";
import { MdDoubleArrow } from "react-icons/md";

interface PaginationSearchProps {
    pageInt: number;
    totalPages: number;
    type: string;
    keyword: string;
}

const PaginationSearch: React.FC<PaginationSearchProps> = ({ pageInt, totalPages, type, keyword }) => {
    const createUrl = (page: number) => {
        return `/search/${type}/${keyword}?page=${page.toString()}`;
    };
    return (
        <div className="flex overflow-hidden gap-2 items-center justify-center p-2 rounded-xl bg-black text-white">
            {pageInt === 1 ? (
                <p className="hover:bg-white cursor-not-allowed bg-slate-700 hover:text-black px-5 py-3 rounded-md hover:bg-opacity-70">
                    <MdDoubleArrow className="rotate-180" />
                </p>
            ) : (
                <Link href={createUrl(1)} className="hover:bg-white bg-slate-700 hover:text-black px-5 py-3 rounded-md hover:bg-opacity-70">
                    <MdDoubleArrow className="rotate-180" />
                </Link>
            )}
            {pageInt === 1 ? (
                <p className={`cursor-not-allowed hover:bg-white bg-slate-700 hover:text-black px-5 py-2 rounded-md hover:bg-opacity-70`}>Prev</p>
            ) : (
                <Link href={createUrl(pageInt - 1)} className={`hover:bg-white bg-slate-700 hover:text-black px-5 py-2 rounded-md hover:bg-opacity-70`}>
                    Prev
                </Link>
            )}
            <p className="px-2 mx-3 rounded-md text-yellow-500 border-b-2">
                Page {pageInt} of {totalPages}
            </p>
            {pageInt === totalPages ? (
                <p className="cursor-not-allowed hover:bg-white bg-slate-700 hover:text-black px-5 py-2 rounded-md hover:bg-opacity-70">Next</p>
            ) : (
                <Link href={createUrl(pageInt + 1)} className="hover:bg-white bg-slate-700 hover:text-black px-5 py-2 rounded-md hover:bg-opacity-70">
                    Next
                </Link>
            )}
            {pageInt === totalPages ? (
                <p className="hover:bg-white cursor-not-allowed bg-slate-700 hover:text-black px-5 py-3 rounded-md hover:bg-opacity-70">
                    <MdDoubleArrow />
                </p>
            ) : (
                <Link href={createUrl(totalPages)} className="hover:bg-white bg-slate-700 hover:text-black px-5 py-3 rounded-md hover:bg-opacity-70">
                    <MdDoubleArrow />
                </Link>
            )}
        </div>
    );
};

export default PaginationSearch;
