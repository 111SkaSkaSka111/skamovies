/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "image.tmdb.org",
            },
            {
                hostname: "utfs.io",
            },
        ],
    },
};

export default nextConfig;
