import axios from "axios";

export const getGenre = async ({ apiData }: { apiData: any }) => {
    const [genreMoviesRes, genreTvRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_TMDB_KEY}&language=en`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/genre/tv/list?api_key=${process.env.NEXT_TMDB_KEY}&language=en`),
    ]);

    const genreMovie = genreMoviesRes?.data?.genres;
    const genreTv = genreTvRes?.data?.genres;

    const apiGenre = [...genreMovie, ...genreTv];

    const genreMap: { [key: number]: string } = {};

    apiGenre?.forEach((item) => {
        genreMap[item.id] = item.name;
    });

    const movieGenres = apiData?.data?.results.map((data: { genre_ids: any[] }) => {
        const genreNames = data.genre_ids.map((genreId) => genreMap[genreId]);
        const genres = data.genre_ids.map((genreId) => ({
            id: genreId,
            name: genreMap[genreId],
        }));
        return {
            ...data,
            genres,
        };
    });

    return movieGenres;
};
