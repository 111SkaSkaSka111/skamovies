import SignInLayout from "@/components/Auth/SignIn/SignInLayout";
import getUser from "@/libs/getUser";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    return {
        title: "Sign In",
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
            <SignInLayout />
        </main>
    );
};

export default Page;
