"use client";

import { useEffect, useState } from "react";
import CarouselDetail from "./CarouselDetail";
import CarouselButton from "./CarouselButton";

const Carousel = ({ apiData }: { apiData: any }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [nextIndex, setNextIndex] = useState(false);

    const handlePrev = () => {
        setNextIndex(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + apiData.length) % apiData.length);
            setNextIndex(false);
        }, 500);
    };

    const handleNext = () => {
        setNextIndex(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % apiData.length);
            setNextIndex(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <section className={`border z-10 rounded-xl w-full group/button border-black origin-left h-[470px] overflow-hidden relative duration-500`}>
            <div className={`absolute top-0 bottom-0 right-0 z-[99999] bg-black duration-[.5s] ${nextIndex ? "left-[50%]" : "left-[100%] delay-300"}`}></div>
            <div className={`absolute top-0 bottom-0 left-0 z-[99999] bg-black duration-[.5s] ${nextIndex ? "right-[50%]" : "right-[100%] delay-300"}`}></div>
            <div className={`absolute right-0 bottom-0 left-0 z-[99999] bg-black duration-[.5s] ${nextIndex ? "top-[50%]" : "top-[100%] delay-300"}`}></div>
            <div className={`absolute top-0 right-0 left-0 z-[99999] bg-black duration-[.5s] ${nextIndex ? "bottom-[50%]" : "bottom-[100%] delay-300"}`}></div>
            <div className="absolute inset-0 z-[-1] bg-black bg-opacity-50">
                <img loading="lazy" src={`${process.env.NEXT_PUBLIC_IMG_URL_O}${apiData[currentIndex]?.backdrop_path}`} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute p-5 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black flex gap-5 text-white">
                <div className="min-h-[270px] min-w-[200px] max-h-[270px] max-w-[200px] hidden md:flex ">
                    <img loading="lazy" src={`${process.env.NEXT_PUBLIC_IMG_URL_W}${apiData[currentIndex]?.poster_path}`} alt="" className="min-h-[270px] min-w-[200px] max-h-[270px] max-w-[200px] rounded-md" />
                </div>
                <CarouselDetail apiData={apiData[currentIndex]} />
            </div>
            <CarouselButton handleNext={handleNext} handlePrev={handlePrev} />
            <div className="absolute w-full bottom-2 left-0 flex items-center justify-center gap-5 z-[999]">
                {apiData.map((_: any, i: number) => {
                    return (
                        <button
                            onClick={() => {
                                setNextIndex(true);
                                setTimeout(() => {
                                    setCurrentIndex(i);
                                    setNextIndex(false);
                                }, 500);
                            }}
                            key={i}
                            className={` rounded-full ${currentIndex === i ? "px-5 bg-yellow-500 border border-black py-[2px] cursor-not-allowed" : "hover:bg-blue-500"} p-1 duration-300 bg-black border-2 border-white`}
                        ></button>
                    );
                })}
            </div>
        </section>
    );
};

export default Carousel;
