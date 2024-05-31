import Carousel from "@/components/Carousel/Carousel";
import TabsPage from "@/components/Tabs/TabsPage";
import { getGenre } from "@/libs/getGenre";
import axios from "axios";

export default async function Home() {
    const [popularMovieRes, nowPlayingRes, topRatedRes, upcomingRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US&page=1`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/now_playing?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US&page=1`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US&page=1`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US&page=1`),
    ]);

    const popularMovies = await getGenre({ apiData: popularMovieRes });

    return (
        <main className="">
            <section className="w-full flex items-center justify-center px-5 md:px-20 py-10 h-[90vh] overflow-hidden bg-black">
                <Carousel apiData={popularMovies.slice(0, 8)} />
            </section>
            <section className="w-full relative">
                <TabsPage nowPlaying={nowPlayingRes?.data?.results} popular={popularMovieRes?.data?.results} topRated={topRatedRes?.data?.results} upcoming={upcomingRes?.data?.results} />
            </section>
        </main>
    );
}
