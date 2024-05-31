import prisma from "@/libs/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { user_email, data_id, data_title, data_image, data_type, data_origin_country } = await req.json();

    let originCountry = data_origin_country;

    if (!data_origin_country) {
        try {
            const dataOri = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${data_type}/${data_id}?api_key=${process.env.NEXT_TMDB_KEY}&language=en-US`);

            originCountry = dataOri?.data?.origin_country[0];
        } catch (error) {
            return NextResponse.json({ status: 500, message: "Gagal mengambil data origin country" });
        }
    }

    const data = { user_email, data_id, data_title, data_image, data_type, data_origin_country: originCountry };

    try {
        const createFavorites = await prisma.favorites.create({ data });

        return Response.json({ status: 202, message: "Added to favorites successfully" });
    } catch (error) {
        return NextResponse.json({ status: 509, message: "Added to favorites failed" });
    }
}
