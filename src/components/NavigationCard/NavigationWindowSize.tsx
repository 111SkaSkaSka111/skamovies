"use client";

import { getWindowSize } from "@/libs/getWindowSize";
import { MdDoubleArrow } from "react-icons/md";

interface NavigationWindowSizeProps {
    sizeRef: React.RefObject<HTMLDivElement>;
}

const NavigationWindowSize: React.FC<NavigationWindowSizeProps> = ({ sizeRef }) => {
    const { width } = getWindowSize();
    console.log("🚀 ~ width:", width);
    const container = sizeRef.current;

    const handleNext = () => {
        if (container) {
            container.scrollTo({
                left: container.scrollLeft + (width - 50),
                behavior: "smooth",
            });
        }
    };

    const handlePrev = () => {
        if (container) {
            container.scrollTo({
                left: container.scrollLeft - (width - 50),
                behavior: "smooth",
            });
        }
    };
    return (
        <>
            <button
                onClick={handleNext}
                className={`absolute ${
                    width > 600 ? `opacity-0` : `opacity-100`
                } group-hover:opacity-100 duration-300 border rounded-md bg-black bg-opacity-50 p-2 top-1/3 right-10 text-white text-4xl z-[9999] hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 hover:bg-opacity-80`}
            >
                <MdDoubleArrow />
            </button>
            <button
                onClick={handlePrev}
                className={`absolute ${
                    width > 600 ? `opacity-0` : `opacity-100`
                } group-hover:opacity-100 duration-300 border rounded-md bg-black bg-opacity-50 p-2 top-1/3 left-10 rotate-180 text-white text-4xl z-[9999] hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 hover:bg-opacity-80`}
            >
                <MdDoubleArrow />
            </button>
        </>
    );
};

export default NavigationWindowSize;
