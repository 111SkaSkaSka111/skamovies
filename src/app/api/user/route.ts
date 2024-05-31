import prisma from "@/libs/prisma";
import { hash } from "bcrypt";
import { z } from "zod";

const schema = z.object({
    username: z.string().trim().min(1, { message: "Username must be at least 5 character" }).max(20, { message: "Maximum username must be 20 characters." }),
    email: z.string().trim().min(1, { message: "Please enter a valid email address" }).email().max(50, { message: "Maximum email must be 50 characters." }),
    password: z.string().trim().min(1, { message: "Password can't empty" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Maximum password must be 20 characters." }),
    image: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password, email, image } = schema.parse(body);

        //cek apakah username sudah ada atau belum
        const existingUsername = await prisma.user.findUnique({ where: { username: username } });

        if (existingUsername) {
            return Response.json({
                user: null,
                status: 401,
                message: "Username already exists",
            });
        }

        // cek apakah email sudah ada atau belum
        const existingEmail = await prisma.user.findUnique({ where: { email: email } });

        if (existingEmail) {
            return Response.json({
                user: null,
                status: 402,
                message: "Email already exists",
            });
        }

        const hashedPassword = await hash(password, 10);
        const data = { username, password: hashedPassword, email, image };
        const user = await prisma.user.create({ data });
        const { password: newPassword, ...rest } = user;

        return Response.json({
            user: rest,
            status: 201,
            message: "User created successfully",
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json({
                user: null,
                status: 400,
                message: error.message,
            });
        }
        return Response.json({
            user: null,
            status: 501,
            message: "Error creating user",
        });
    }
}
