import prisma from "@/libs/prisma";

export async function DELETE(req: Request) {
    const { id, data_id, user_email } = await req.json();

    try {
        const deleteFavorites = await prisma.favorites.delete({ where: { data_id: data_id, user_email: user_email, id: id } });

        return Response.json({
            status: 200,
            message: "Favorites deleted successfully",
        });
    } catch (error) {
        return Response.json({
            status: 500,
            message: "Favorites deleted failed",
        });
    }
}
