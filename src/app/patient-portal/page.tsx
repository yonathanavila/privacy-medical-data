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
                    <div className="block">
                        <div className="flex flex-row">
                            <a onClick={() => router.push('/provide-data')} className="p-4 mr-2 bg-gray-800 cursor-pointer border border-gray-700 text-white hover:bg-gray-700 rounded-md">Provide Data</a>
                            <a onClick={() => router.push('/upload-data')} className="p-4 bg-gray-800 cursor-pointer border border-gray-700 text-white hover:bg-gray-700 rounded-md">Upload Data</a>
                        </div>
                        <div className="flex items-center text-yellow-500 text-center my-4">
                            <ClockCircleOutlined />
                            <p className="text-white p-2">
                                Note: Data supplied are anonymized and it will not be possible to link it to you.
                            </p>
                        </div>
                        <p className="text-sm text-center my-4">
                            Another disclaimer: data provided to IPFS are be able to regenerate if you provide the same data struct
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientPortal;