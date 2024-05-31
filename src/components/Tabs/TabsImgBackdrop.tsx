import React from "react";

interface TabsImgBackdropProps {
    nowPlaying: any;
    popular: any;
    upcoming: any;
    topRated: any;
    active: string;
}

const TabsImgBackdrop: React.FC<TabsImgBackdropProps> = ({ nowPlaying, popular, upcoming, topRated, active }) => {
    return (
        <>
            <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${nowPlaying[0].backdrop_path}`}
                alt={`${process.env.NEXT_PUBLIC_IMG_URL_O}${nowPlaying[3].backdrop_path}`}
                className={`absolute top-0 w-full h-[550px] left-0 object-cover z-[-1] duration-1000 ${active === "tabs-1" ? "delay-1000 opacity-100" : "opacity-0"}`}
            />
            <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${popular[0].backdrop_path}`}
                alt={`${process.env.NEXT_PUBLIC_IMG_URL_O}${popular[3].backdrop_path}`}
                className={`absolute top-0 w-full h-[550px] left-0 object-cover z-[-1] duration-1000 ${active === "tabs-2" ? "delay-1000 opacity-100" : "opacity-0"}`}
            />
            <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${upcoming[0].backdrop_path}`}
                alt={`${process.env.NEXT_PUBLIC_IMG_URL_O}${upcoming[3].backdrop_path}`}
                className={`absolute top-0 w-full h-[550px] left-0 object-cover z-[-1] duration-1000 ${active === "tabs-3" ? "delay-1000 opacity-100" : "opacity-0"}`}
            />
            <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${topRated[0].backdrop_path}`}
                alt={`${process.env.NEXT_PUBLIC_IMG_URL_O}${topRated[3].backdrop_path}`}
                className={`absolute top-0 w-full h-[550px] left-0 object-cover z-[-1] duration-1000 ${active === "tabs-4" ? "delay-1000 opacity-100" : "opacity-0"}`}
            />
        </>
    );
};

export default TabsImgBackdrop;
