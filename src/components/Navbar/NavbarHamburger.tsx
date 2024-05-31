"use client";

import { LegacyRef, RefObject, useRef } from "react";

const NavbarHamburger = ({ linkRef }: { linkRef: RefObject<HTMLDivElement> }) => {
    const spanRefFirst: LegacyRef<HTMLDivElement> | undefined = useRef(null);
    const spanRefSecond: LegacyRef<HTMLDivElement> | undefined = useRef(null);
    const spanRefThird: LegacyRef<HTMLDivElement> | undefined = useRef(null);

    const handleClick = () => {
        if (spanRefFirst.current) {
            spanRefFirst.current.classList.toggle("span-first");
        }
        if (spanRefSecond.current) {
            spanRefSecond.current.classList.toggle("translate-x-[-150%]");
        }
        if (spanRefThird.current) {
            spanRefThird.current.classList.toggle("span-last");
        }
        if (linkRef.current) {
            linkRef.current.classList.toggle("scale-100");
        }
    };

    return (
        <div onClick={handleClick} className="w-10 h-10 cursor-pointer md:hidden flex items-center justify-center relative overflow-hidden">
            <span ref={spanRefFirst} className="w-8 absolute bg-white h-[2px] -translate-y-3 duration-300"></span>
            <span ref={spanRefSecond} className="w-8 absolute bg-white h-[2px] duration-300"></span>
            <span ref={spanRefThird} className="w-8 absolute bg-white h-[2px] translate-y-3  duration-300"></span>
        </div>
    );
};

export default NavbarHamburger;
