import DashboardFavorites from "@/components/Dashboard/DashboardFavorites";
import DetailUser from "@/components/Dashboard/DetailUser";
import HeaderDashboard from "@/components/Headers/HeaderDashboard";
import PaginationDashboard from "@/components/Pagination/PaginationDashboard";
import PaginationSearch from "@/components/Pagination/PaginationSearch";
import getUser from "@/libs/getUser";
import prisma from "@/libs/prisma";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface PageUserProps {
    searchParams: Record<string, string | undefined>;
}

const Page: React.FC<PageUserProps> = async ({ searchParams }) => {
    const session = await getUser();
    const user = session?.user;
    const { type = undefined } = searchParams;
    const { page = "1" } = searchParams;
    const pageInt = parseInt(page);

    const createUrl = (page: number) => {
        if (type) {
            return `/user/dashboard?page=${page.toString()}&type=${type}`;
        } else {
            return `/user/dashboard?page=${page.toString()}`;
        }
    };

    if (pageInt < 1) {
        redirect(createUrl(1));
    }

    const itemDisplay = 15;
    const skip = (pageInt - 1) * itemDisplay;

    const [userInfo, favorites, favoritesCount, movieCount, tvCount] = await Promise.all([
        prisma.user.findUnique({ where: { email: user?.email } }),
        prisma.favorites.findMany({ where: { user_email: user?.email, data_type: type }, skip: skip, take: itemDisplay, orderBy: { createdAt: "desc" } }),
        prisma.favorites.count({ where: { user_email: user?.email } }),
        prisma.favorites.count({ where: { user_email: user?.email, data_type: "movie" } }),
        prisma.favorites.count({ where: { user_email: user?.email, data_type: "tv" } }),
    ]);

    const totalPagesAll = Math.ceil(favoritesCount / itemDisplay) || 1;
    const totalPagesMovie = Math.ceil(movieCount / itemDisplay) || 1;
    const totalPagesTv = Math.ceil(tvCount / itemDisplay) || 1;

    const dateOri = userInfo?.createdAt;
    const newDate = dateOri ? new Date(dateOri) : dateOri;
    const date = newDate ? formatDistanceToNow(newDate) : newDate;

    const validationPage = type === "movie" ? totalPagesMovie : type === "tv" ? totalPagesTv : totalPagesAll;

    if (pageInt > validationPage) {
        redirect(createUrl(validationPage));
    }

    return (
        <main className="">
            <HeaderDashboard user={user} date={date} />
            <section className="md:px-20 py-5 px-5 flex items-center flex-col md:flex-row gap-5 bg-gradient-to-b from-cyan-500 to-white to-50% ">
                <div className="min-w-36 min-h-52 max-w-36 max-h-52 rounded-md">
                    {userInfo && <Image width={150} height={250} src={userInfo?.image} alt="" className="rounded-md min-w-36 min-h-52 border border-black max-w-36 max-h-52 object-cover" />}
                </div>
                {userInfo && <DetailUser userInfo={userInfo} />}
            </section>
            <section className="w-full px-5 md:px-20 border-b">
                <DashboardFavorites favoritesCount={favoritesCount} movieCount={movieCount} tvCount={tvCount} type={type} favorites={favorites} />
            </section>

            <section className="flex items-center justify-center py-5">
                <PaginationDashboard pageInt={pageInt} totalPages={validationPage} type={type} />
            </section>
        </main>
    );
};

export default Page;
