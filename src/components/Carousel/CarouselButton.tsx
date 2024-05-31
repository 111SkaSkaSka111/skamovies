import React from "react";

interface CarouselButtonProps {
    handleNext: () => void;
    handlePrev: () => void;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({ handleNext, handlePrev }) => {
    return (
        <>
            <div className="absolute z-50 top-0 group-hover/button:opacity-100 text-white hover:text-black px-1 duration-200 opacity-0 hover:bg-white hover:bg-opacity-70 flex items-center justify-center bottom-0 left-0">
                <button onClick={handlePrev} className="hover:text-yellow-500 px-3 py-2 rounded-md hover:bg-black duration-300">
                    Prev
                </button>
            </div>
            <div className="absolute z-50 top-0 group-hover/button:opacity-100 text-white hover:text-black px-1 duration-200 opacity-0 hover:bg-white hover:bg-opacity-70 flex items-center justify-center bottom-0 right-0">
                <button onClick={handleNext} className="hover:text-yellow-500 px-3 py-2 rounded-md hover:bg-black duration-300">
                    Next
                </button>
            </div>
        </>
    );
};

export default CarouselButton;
