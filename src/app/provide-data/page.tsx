"use client";
import { DownloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const ProvideData = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-[15vh]">
            <div className="grid grid-cols-1 w-1/2">
                <div>
                    <h1 className="p-4 text-2xl">Provide Data - File Health</h1>
                    <form className="bg-gray-700 p-4 rounded-md">
                        <div className="flex items-center text-yellow-500">
                            <ExclamationCircleOutlined className="mr-2" />
                            <h2 className="font-semibold text-md">Someone requested your data</h2>
                        </div>
                        <p className="text-white text-sm mt-2">You have some records requested for the researcher</p>
                        <div className="flex flex-col items-center justify-center border border-gray-600 rounded-md m-4">
                            <div className="flex items-center py-2">
                                <div className="flex items-center hover:text-yellow-500 bg-gray-700 hover:bg-gray-800 rounded-md p-4">
                                    <DownloadOutlined />
                                    <button className="text-center p-2">MedicalCare.json</button>
                                </div>
                            </div>
                            <p>Data usage royalties<span className="text-yellow-500 ml-2">${1050}</span></p>
                            <button className="p-4 bg-cyan-800 hover:bg-cyan-700 rounded-md my-4">Provide Data</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProvideData;