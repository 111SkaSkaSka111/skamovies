"use client";

import { useEffect } from "react";

const CommentDisqus = () => {
    useEffect(() => {
        // Code ini hanya akan dieksekusi di sisi klien (browser)
        var d = document,
            s = d.createElement("script");
        s.src = "https://http-localhost-c5xbwotim3.disqus.com/embed.js";
        s.setAttribute("data-timestamp", `${+new Date()}`);
        (d.head || d.body).appendChild(s);

        // Membersihkan skrip saat komponen di-unmount
        return () => {
            (d.head || d.body).removeChild(s);
        };
    }, []);

    return (
        <div className="p-5 ">
            <div className="border-b-2 border-slate-400 p-2 bg-black bg-opacity-50 rounded-t">
                <h1 className="text-2xl text-blue-500 font-bold">Comment</h1>
            </div>
            <div id="disqus_thread" className="bg-black pt-5 p-1 bg-opacity-50 rounded-b"></div>
        </div>
    );
};

export default CommentDisqus;
