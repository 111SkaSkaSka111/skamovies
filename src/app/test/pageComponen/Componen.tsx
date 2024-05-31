"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ComponentPage = () => {
    const [selectedSection, setSelectedSection] = useState("");

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            setSelectedSection(hash);
        };

        // Handle initial load
        handleHashChange();

        // Handle hash change events
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [selectedSection]);

    return (
        <main className="w-full h-[90vh]">
            <header className="flex flex-col gap-2 w-fit px-20">
                <h1>Test</h1>
                <div className="flex border rounded-full bg-gradient-to-br from-black via-emerald-500 overflow-hidden to-black from-20% to-80% text-white">
                    <Link href="#popular" className="px-5 py-2 hover:bg-white hover:bg-opacity-50 hover:text-black">
                        Popular
                    </Link>
                    <Link href="#upcoming" className="px-5 py-2 hover:bg-white hover:bg-opacity-50 hover:text-black">
                        Upcoming
                    </Link>
                    <Link href="#now-playing" className="px-5 py-2 hover:bg-white hover:bg-opacity-50 hover:text-black">
                        Now Playing
                    </Link>
                    <Link href="#top-rated" className="px-5 py-2 hover:bg-white hover:bg-opacity-50 hover:text-black">
                        Top Rated
                    </Link>
                </div>
            </header>
            <section className="mt-4 px-20">
                {(selectedSection === "popular" || selectedSection === "") && <div id="popular">Content for Popular</div>}
                {selectedSection === "upcoming" && <div id="upcoming">Content for Upcoming</div>}
                {selectedSection === "now-playing" && <div id="now-playing">Content for Now Playing</div>}
                {selectedSection === "top-rated" && <div id="top-rated">Content for Top Rated</div>}
            </section>
        </main>
    );
};

export default ComponentPage;
