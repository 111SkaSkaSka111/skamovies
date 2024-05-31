"use client";

import { useEffect, useRef } from "react";

const IdPageVote = ({ vote }: { vote: number }) => {
    const progressRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.setProperty("--progress", vote + "%");
        }
    }, []);

    return (
        <div ref={progressRef} className="w-20 h-20 rounded-full progressbar relative">
            <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center text-white text-2xl">
                <p>{vote ?? "N/A"}%</p>
            </div>
        </div>
    );
};

export default IdPageVote;
