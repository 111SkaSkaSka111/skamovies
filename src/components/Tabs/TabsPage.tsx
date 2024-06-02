"use client";

import React, { useState } from "react";
import TabsCard from "./TabsCard";
import TabsButton from "./TabsButton";
import TabsImgBackdrop from "./TabsImgBackdrop";
import Link from "next/link";
import { formatDate } from "date-fns";
import TabsPageCard from "./TabsPageCard";

interface TabsPageProps {
    nowPlaying: any;
    upcoming: any;
    popular: any;
    topRated: any;
}

const TabsPage: React.FC<TabsPageProps> = ({ nowPlaying, popular, upcoming, topRated }) => {
    const [active, setActive] = useState("tabs-1");
    const [isChance, setIsChance] = useState(false);

    const Tabs = [
        {
            id: "tabs-1",
            body: <TabsPageCard apiData={nowPlaying} isChance={isChance} />,
            link: (
                <Link href={"/discover/now_playing/movie"} className="underline text-black hover:text-blue-500">
                    See More
                </Link>
            ),
        },
        {
            id: "tabs-2",
            body: <TabsPageCard apiData={popular} isChance={isChance} />,
            link: (
                <Link href={"/discover/popular/movie"} className="underline text-black hover:text-blue-500">
                    See More
                </Link>
            ),
        },
        {
            id: "tabs-3",
            body: <TabsPageCard apiData={upcoming} isChance={isChance} />,
            link: (
                <Link href={"/discover/upcoming/movie"} className="underline text-black hover:text-blue-500">
                    See More
                </Link>
            ),
        },
        {
            id: "tabs-4",
            body: <TabsPageCard apiData={topRated} isChance={isChance} />,
            link: (
                <Link href={"/discover/top_rated/movie"} className="underline text-black hover:text-blue-500">
                    See More
                </Link>
            ),
        },
    ];

    const handleActive = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsChance(true);
        setActive(e.currentTarget.id);
        setTimeout(() => {
            setIsChance(false);
        }, 1000);
    };

    const activeTabs = Tabs.find((item) => item.id === active);

    return (
        <div className="flex flex-col gap-5 pt-5 relative z-10">
            <div className="flex flex-col gap-5 px-5 md:px-20 pb-5">
                <h1 className="text-4xl font-bold font-podkova border-b-4 rounded-full w-fit px-5 border-yellow-500">Movies</h1>
                <div className="flex items-center justify-between w-full">
                    <TabsButton active={active} handleActive={handleActive} />
                    {activeTabs && activeTabs.link}
                </div>
            </div>
            {activeTabs && activeTabs.body}
        </div>
    );
};

export default TabsPage;
