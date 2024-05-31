"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useState } from "react";
import { GiSkullCrossedBones } from "react-icons/gi";
import { CiWarning } from "react-icons/ci";
import { PiWarningOctagon } from "react-icons/pi";

interface UploadThingsProps {
    imgUrl: string;
    setImgUrl: React.Dispatch<React.SetStateAction<string>>;
    isUploaded: boolean;
    // setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadThings: React.FC<UploadThingsProps> = ({ imgUrl, setImgUrl, isUploaded }) => {
    const [success, setSuccess] = useState<boolean>(false);
    const [failed, setFailed] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center justify-center gap-5 p-2 bg-slate-700">
            <div className="flex w-full flex-col gap-1">
                <p className="border-2 animate-ping-sm z-10 relative rounded-md px-2 border-black bg-yellow-300 text-black py-1 gap-3 w-full flex items-center justify-center">
                    <PiWarningOctagon className="text-3xl" />
                    First, You need to upload your image
                </p>
                {isUploaded && (
                    <p className="border-2 animate-bounce rounded-md px-2 border-red-700 bg-red-300 text-red-700 py-1 w-full flex items-center justify-center gap-2">
                        <CiWarning className="text-3xl" />
                        You need provide an image
                    </p>
                )}
                {success ? <p className="border rounded-md px-2 border-green-700 bg-green-300 text-green-700 py-1 text-center w-full">🚀 Upload Successfully 🚀</p> : null}
                {failed ? (
                    <p className="border rounded-md px-2 border-red-700 bg-red-300 text-red-700 py-1 flex items-center justify-between gap-1 w-full">
                        <GiSkullCrossedBones /> Upload Failed <GiSkullCrossedBones />
                    </p>
                ) : null}
            </div>

            <div className="min-w-32 min-h-44 max-w-32 max-h-44 border rounded-xl border-black flex items-center justify-center bg-black bg-opacity-50 text-white">
                {imgUrl.length ? <Image height={300} width={200} src={imgUrl} alt="" className="min-w-32 min-h-44 max-w-32 max-h-44 object-cover rounded-xl" /> : <p>Preview...</p>}
            </div>

            <UploadButton
                className="ut-allowed-content:text-red-500"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    // console.log("Files: ", res);
                    setSuccess(true);
                    setImgUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    setFailed(true);
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
};

export default UploadThings;
