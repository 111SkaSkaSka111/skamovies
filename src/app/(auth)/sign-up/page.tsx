import SignUpLayout from "@/components/Auth/SignUp/SignUpLayout";
import getUser from "@/libs/getUser";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    return {
        title: "Sign Up",
    };
}

const Page = async () => {
    const session = await getUser();
    const user = await session?.user;

    if (user) {
        redirect("/");
    }

    return (
        <main className="w-full flex items-center justify-center py-10">
            <SignUpLayout />
        </main>
    );
};

export default Page;
