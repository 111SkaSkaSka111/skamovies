"use client";

import { useRouter } from "next/navigation";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiCrossedAxes } from "react-icons/gi";

const NavbarSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("movie");
    const searchRef: LegacyRef<HTMLInputElement> = useRef(null);
    const containerRef: LegacyRef<HTMLDivElement> = useRef(null);
    const router = useRouter();

    const handleSelect = (e: { target: { value: React.SetStateAction<string> } }) => {
        setSelected(e.target.value);
    };

    const handleSearchButton = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const handleCtrlK = (e: { ctrlKey: any; key: string }) => {
        if (e.ctrlKey && e.key === "k") {
            setIsOpen(true);
        }
    };

    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleOutside = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const keyword = searchRef.current?.value.trim();
        if (keyword !== "") {
            setIsOpen(false);
            router.push(`/search/${selected}/${keyword}`);
            if (searchRef.current) {
                searchRef.current.value = "";
            }
        }
    };

    const Search = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(e);
            // const keyword = searchRef.current?.value.trim();
            // if (keyword !== "") {
            //     setIsOpen(false);
            //     router.push(`/search/${selected}/${keyword}`);
            //     if (searchRef.current) {
            //         searchRef.current.value = "";
            //     }
            // }
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleCtrlK);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleCtrlK);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <>
            <button onClick={handleSearchButton} className="border rounded-full md:rounded-xl relative z-50 hover:bg-opacity-10 cursor-pointer bg-white bg-opacity-30 px-3 py-1 flex items-center gap-2">
                <FaMagnifyingGlass className="text-2xl" />
                <p className="hidden md:flex">Search</p>
                <p className="border px-1 rounded bg-violet-900 border-violet-500 text-sm hidden md:flex">ctrlK</p>
            </button>
            <div ref={containerRef} className={`absolute z-[9999] left-5 right-5 top-3 rounded-xl overflow-hidden bottom-3 ${isOpen ? "-translate-y-0" : "-translate-y-40"} duration-300 bg-white z-50 flex items-center`}>
                <div onClick={handleSearch} className="bg-black cursor-pointer hover:text-yellow-500 focus-visible:text-yellow-500 bg-opacity-50 w-fit ml-[-8px] h-full px-5 flex items-center justify-center gap-2">
                    <p className="hidden md:flex">Search</p>
                    <FaMagnifyingGlass className="text-2xl" />
                </div>
                <div className="border-2 w-full h-full border-black rounded-r-lg">
                    <input onKeyUp={Search} ref={searchRef} type="text" className="text-black w-full h-full px-3 rounded-r-xl" placeholder={`Search ${selected === "movie" ? "Movies" : "Tv Series"}...`} />
                </div>
                <div className="absolute cursor-pointer right-5 z-50 flex items-center gap-3 text-black">
                    <select name="type" id="type" className="px-2 py-1" value={selected} onChange={handleSelect}>
                        <option value="movie">Movies</option>
                        <option value="tv">Tv Series</option>
                    </select>
                    <button onClick={() => setIsOpen(false)}>
                        <GiCrossedAxes className="text-2xl text-black hover:text-yellow-500" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavbarSearch;
