"use client";

import React, { useState } from "react";
import TabsCard from "../TabsCard";
import { nonNullBackdrop } from "@/libs/function";

interface TabsIdPageProps {
    recommendations: any;
    similar: any;
    type: string;
}

const TabsIdPage: React.FC<TabsIdPageProps> = ({ recommendations, similar, type }) => {
    const [active, setActive] = useState("tabs-1");

    const handleActive = (e: { preventDefault: () => void; currentTarget: { id: React.SetStateAction<string> } }) => {
        e.preventDefault();
        setActive(e.currentTarget.id);
    };

    const imageUrlSimilar = nonNullBackdrop(similar);
    const imageUrlRecommendations = nonNullBackdrop(recommendations);

    return (
        <div className="flex flex-col gap-5 pt-5 relative z-10 min-h-[550px] max-h-[550px] px-5 md:px-20 group">
            <div className={`absolute inset-0 z-[-1]`}>
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${imageUrlRecommendations}`} alt={``} className={`h-full w-full absolute object-cover duration-1000 ${active === "tabs-1" ? "opacity-100 delay-1000" : "opacity-0"}`} />
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${imageUrlSimilar}`} alt={""} className={`h-full w-full absolute object-cover duration-1000 ${active === "tabs-2" ? "opacity-100 delay-1000" : "opacity-0"}`} />
            </div>
            <div className="flex border-2 border-white rounded-full w-fit overflow-hidden bg-gradient-to-br from-black via-emerald-500 to-black from-15% to-85%">
                <button id="tabs-1" onClick={handleActive} className={`px-7 py-2 duration-300 font-bold ${active === "tabs-1" ? "text-2xl text-yellow-500 bg-black bg-opacity-50" : "hover:bg-black hover:bg-opacity-70 hover:text-white"}`}>
                    Recommendations
                </button>
                <button id="tabs-2" onClick={handleActive} className={`px-7 py-2 duration-300 font-bold ${active === "tabs-2" ? "text-2xl text-yellow-500 bg-black bg-opacity-50" : "hover:bg-black hover:bg-opacity-70 hover:text-white"}`}>
                    Similar
                </button>
            </div>
            <TabsCard type={type} apiData={recommendations} className={`${active === "tabs-1" ? "opacity-100 delay-1000 z-10 origin-right" : "opacity-0 z-[-1] scale-0 origin-left"} pb-10`} />
            <TabsCard type={type} apiData={similar} className={`${active === "tabs-2" ? "opacity-100 delay-1000 z-10 origin-right" : "opacity-0 z-[-1] scale-0 origin-left"} pb-10`} />
        </div>
    );
};

export default TabsIdPage;
