export default function Loading() {
    return (
        <main className="w-full h-[90vh] bg-black">
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-44 h-44 rounded-full relative border-[20px] border-slate-700 flex items-center justify-center">
                    <div className="border-[20px] absolute top-[-20px] left-[-20px] right-[-20px] bottom-[-20px] rounded-full border-l-transparent border-r-transparent border-yellow-500 animate-spin"></div>
                    <div className="border-[30px] border-r-yellow-500 border-l-yellow-500 border-t-transparent border-b-transparent rounded-full animate-spin bg-black bg-opacity-50"></div>
                </div>
            </div>
        </main>
    );
}
