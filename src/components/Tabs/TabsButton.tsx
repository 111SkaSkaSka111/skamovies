"use client";

import React from "react";

interface TabsButtonProps {
    handleActive: (e: React.MouseEvent<HTMLButtonElement>) => void;
    active: string;
}

const TabsButton: React.FC<TabsButtonProps> = ({ handleActive, active }) => {
    return (
        <div className="flex border rounded-full bg-gradient-to-br from-black via-lime-500 to-black from-20% to-80% text-white overflow-hidden w-fit">
            <button
                id="tabs-1"
                onClick={handleActive}
                className={`${active === "tabs-1" ? "border-custom bg-opacity-50 bg-black text-yellow-500 font-podkova text-2xl" : "hover:bg-white hover:bg-opacity-50 hover:text-black"} py-2 duration-300 relative px-3`}
            >
                Now Playing
            </button>
            <button
                id="tabs-2"
                onClick={handleActive}
                className={`${active === "tabs-2" ? "border-custom bg-opacity-50 bg-black text-yellow-500 font-podkova text-2xl" : "hover:bg-white hover:bg-opacity-50 hover:text-black"} py-2 duration-300 relative px-3`}
            >
                Popular
            </button>
            <button
                id="tabs-3"
                onClick={handleActive}
                className={`${active === "tabs-3" ? "border-custom bg-opacity-50 bg-black text-yellow-500 font-podkova text-2xl" : "hover:bg-white hover:bg-opacity-50 hover:text-black"} py-2 duration-300 relative px-3`}
            >
                Upcoming
            </button>
            <button
                id="tabs-4"
                onClick={handleActive}
                className={`${active === "tabs-4" ? "border-custom bg-opacity-50 bg-black text-yellow-500 font-podkova text-2xl" : "hover:bg-white hover:bg-opacity-50 hover:text-black"} py-2 duration-300 relative px-3`}
            >
                Top Rated
            </button>
        </div>
    );
};

export default TabsButton;
