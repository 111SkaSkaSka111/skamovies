"use client";

import React, { useState } from "react";

interface SearchButtonProps {
    user_email: string;
    data_id: string;
    data_title: string;
    data_image: string;
    data_type: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ user_email, data_id, data_title, data_image, data_type }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleButton = async (e: { preventDefault: () => void }) => {
        setIsLoading(true);
        e.preventDefault();
        const body = { user_email, data_id, data_title, data_image, data_type, data_origin_country: undefined };

        // console.log("🚀 ~ handleButton ~ body:", body);

        const res = await fetch("/api/v1/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const createFavorites = await res.json();
        if (createFavorites.status === 202) {
            alert(createFavorites.message);
            setIsLoading(false);
        } else {
            alert(createFavorites.message);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleButton}
            disabled={isLoading}
            className={`border ${
                isLoading ? "cursor-not-allowed translate-x-1 translate-y-1 shadow-[0_0_0_white] bg-yellow-500 text-black" : "text-white bg-black"
            } px-2 w-fit mb-1 shadow-[4px_4px_0_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_white] flex items-center gap-2 py-1 duration-200 hover:bg-yellow-500 hover:text-black text-sm`}
        >
            {isLoading ? (
                <>
                    <span className="h-4 w-4 flex border-2 border-l-white border-black animate-spin rounded-full"></span>
                    <p>Loading...</p>
                </>
            ) : (
                "Add to Favorites"
            )}
        </button>
    );
};

export default SearchButton;
