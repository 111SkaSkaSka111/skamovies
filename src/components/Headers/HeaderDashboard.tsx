const HeaderDashboard = ({ user, date }: { user: any; date: string | undefined }) => {
    return (
        <header className="flex items-center justify-between py-5 px-5 md:px-20 bg-gradient-to-b from-black to-cyan-500 text-white flex-col md:flex-row">
            <h1 className="text-4xl font-bold font-podkova">
                Welcome, <span className="text-yellow-500">{user?.name}</span>
            </h1>
            <p className="italic text-sm">Joined {date}</p>
        </header>
    );
};

export default HeaderDashboard;
