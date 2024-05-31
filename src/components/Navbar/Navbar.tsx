import getUser from "@/libs/getUser";
import NavbarAction from "./NavbarAction";
import Link from "next/link";

interface User {
    name: string;
    email: string;
    image: string;
}

interface Session {
    user: User;
}

// Menggunakan union type antara Session dan null
type NullSession = Session | any;

const Navbar = async () => {
    const session: NullSession = await getUser();
    const user = session?.user;

    const teks = user ? "Sign Out" : "Sign In";
    const link = user ? "/api/auth/signout" : "/sign-in";

    return (
        <section className="md:px-20 px-5 py-3 bg-black flex items-center justify-between relative text-white">
            <Link href={"/"} className="text-4xl underline hover:text-yellow-500 font-bold font-podkova">
                SkaMovies
            </Link>
            <NavbarAction link={link} teks={teks} user={user} />
        </section>
    );
};

export default Navbar;
