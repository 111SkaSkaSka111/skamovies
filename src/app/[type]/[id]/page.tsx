import CommentDisqus from "@/components/Comment/CommentDisqus";
import IdPage from "@/components/PageId/IdPage";
import TabsIdPage from "@/components/Tabs/TabsId/TabsIdPage";
import getUser from "@/libs/getUser";
import prisma from "@/libs/prisma";
import axios from "axios";

const Page = async ({ params }: { params: any }) => {
    const { id, type } = params;
    const ids = id.split("-")[0];
    const session = await getUser();
    const user = session?.user;

    const [apiDataRes, favoritesRes, recomendationRes, similarRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${ids}?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US`),
        prisma.favorites.findFirst({ where: { user_email: user?.email, data_id: parseInt(ids) } }),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${ids}/recommendations?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US&page=1`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${ids}/similar?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US&page=1`),
    ]);

    const apiData = apiDataRes?.data;
    const recommendations = recomendationRes?.data?.results;
    const similar = similarRes?.data?.results;

    return (
        <main>
            <section className="w-full px-5 lg:px-20 min-h-[85vh] flex items-center justify-center relative z-10">
                <IdPage apiData={apiData} type={type} user={user} favorites={favoritesRes} />
            </section>
            <section className="">
                <TabsIdPage type={type} recommendations={recommendations} similar={similar} />
            </section>
            <section className="md:px-20 px-5 py-5 bg-gradient-to-b from-black to-white">
                <CommentDisqus />
            </section>
        </main>
    );
};

export default Page;
