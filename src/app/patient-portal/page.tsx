"use client";

import { useRouter } from "next/navigation";
import { ClockCircleOutlined } from "@ant-design/icons";

const PatientPortal = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center mt-[15vh]">
            <div className="grid grid-cols-1 w-1/2 bg-gray-800 border border-gray-700 rounded-md">
                <div className="p-4">
                    <h1 className="text-white text-2xl p-4">Patient Portal</h1>
                    <p>On this platform, you have the capability to upload files and grant permission to researchers to access and utilize your data.</p>
                    <div className="block">
                        <div className="flex flex-row my-4 items-center justify-center">
                            <a onClick={() => router.push('/provide-data')} className="p-4 mr-2 bg-gray-800 cursor-pointer border border-gray-700 text-white hover:bg-gray-700 rounded-md">Provide Data</a>
                            <a onClick={() => router.push('/upload-data')} className="p-4 bg-gray-800 cursor-pointer border border-gray-700 text-white hover:bg-gray-700 rounded-md">Upload Data</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientPortal;