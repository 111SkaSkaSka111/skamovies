import Link from "next/link";
import React from "react";
import { MdDoubleArrow } from "react-icons/md";

interface PaginationGenreProps {
    pageInt: number;
    totalPages: number;
    type: string | undefined;
    s: string;
    k: string;
    y: string;
    name: string;
    id: string;
}

const PaginationGenre: React.FC<PaginationGenreProps> = ({ pageInt, totalPages, type, k, s, y, name, id }) => {
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

    return (
        <div className="flex overflow-hidden gap-2 w-fit items-center justify-center p-2 rounded-xl bg-black text-white">
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

export default PaginationGenre;
