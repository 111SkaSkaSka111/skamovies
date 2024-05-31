"use client";

import React, { useState } from "react";
import TabsCard from "./TabsCard";
import TabsButton from "./TabsButton";
import TabsImgBackdrop from "./TabsImgBackdrop";

interface TabsPageProps {
    nowPlaying: any;
    upcoming: any;
    popular: any;
    topRated: any;
}

const TabsPage: React.FC<TabsPageProps> = ({ nowPlaying, popular, upcoming, topRated }) => {
    // console.log("🚀 ~ nowPlaying:", nowPlaying);
    const [active, setActive] = useState("tabs-1");
    const [isChance, setIsChance] = useState(false);

    const handleActive = (e: React.MouseEvent<HTMLButtonElement>) => {
        setActive(e.currentTarget.id);
        setIsChance(true);
        setTimeout(() => {
            setIsChance(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-5 pt-5 relative z-10 min-h-[550px] max-h-[550px]">
            <TabsImgBackdrop active={active} nowPlaying={nowPlaying} popular={popular} topRated={topRated} upcoming={upcoming} />
            <div className={`px-20 flex flex-col gap-5 w-fit duration-1000`}>
                <h1 className={`text-4xl font-bold font-podkova w-fit border-b-4 rounded-full px-5 py-1 border-yellow-500 ${isChance ? "text-black" : "text-white"}`}>Movies</h1>
                <TabsButton active={active} handleActive={handleActive} />
            </div>
            {/* <div className="flex gap-5 items-center relative min-h-96 px-10 border w-full overflow-auto"> */}
            <TabsCard type="movie" className={`${active === "tabs-1" ? "delay-1000 opacity-100 z-10" : "opacity-0 z-0"} py-5`} apiData={nowPlaying} />
            <TabsCard type="movie" className={`${active === "tabs-2" ? "delay-1000 opacity-100 z-10" : "opacity-0 z-0"} py-5`} apiData={popular} />
            <TabsCard type="movie" className={`${active === "tabs-3" ? "delay-1000 opacity-100 z-10" : "opacity-0 z-0"} py-5`} apiData={upcoming} />
            <TabsCard type="movie" className={`${active === "tabs-4" ? "delay-1000 opacity-100 z-10" : "opacity-0 z-0"} py-5`} apiData={topRated} />
            {/* </div> */}
        </div>
    );
};

export default TabsPage;
