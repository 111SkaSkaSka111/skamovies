import { getServerSession } from "next-auth";
import authOption from "./authOption";
interface User {
    name: string;
    email: string;
    image: string;
}

interface Session {
    user: User;
}

type NullSession = Session | any;

const getUser = async () => {
    const session: NullSession = await getServerSession(authOption);
    return session;
};

export default getUser;
