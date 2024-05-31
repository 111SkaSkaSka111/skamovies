const IdPageVoteUser = ({ voteCount }: { voteCount: number }) => {
    return (
        <div className="flex flex-col h-full items-center bg-slate-700 justify-between px-3 py-2 rounded-md text-white">
            <p className="border rounded-md px-2 text-sm bg-green-300 text-black">vote by</p>
            <p className="font-podkova">{voteCount ?? "-"}user</p>
        </div>
    );
};

export default IdPageVoteUser;
