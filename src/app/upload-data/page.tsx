"use client";
import { useAccount } from "wagmi";
import NoConnected from "../components/NoConnected";

const UploadData = () => {

    const { address, isConnected } = useAccount();

    const handleOnSubmit = (event: any) => {
        event.preventDefault();
    }

    if (!address || !isConnected) {
        return <NoConnected />
    }

    return (
        <div className="flex flex-col mt-24 items-center justify-center mt-[15vh]">
            <div className="grid lg:grid-cols-1 w-1/2">
                <div>
                    <h1 className="text-2xl">Provide data - File-Health</h1>
                    <form
                        onSubmit={handleOnSubmit}
                        className="p-4 rounded-md bg-gray-800 border border-gray-700 my-4"
                    >
                        <div className="flex flex-col gap-4">
                            <label className="text-white text-xl font-semibold">Data classification</label>
                            <input type="text" name="classification" className="p-2 border border-gray-700 bg-gray-800 rounded-md" placeholder="Some text to help us to classify your data, Example: Diabetes data" />
                            <label className="text-white text-xl font-semibold">Fee to request data</label>
                            <input type="text" name="requestDataFee" className="p-2 border border-gray-700 bg-gray-800 rounded-md" placeholder="The fee to request this data it's important to avoid anyone request data not usable" />
                            <label className="text-white text-xl font-semibold">Upload data file</label>
                            <input type="file" name="dataFile" className="p-2" accept=".pdf,.doc,.docx,.json,.csv,.xlsx" />
                            <div className="flex flex-col items-center justify-center">
                                <button type="submit" className="p-4 w-3/12 hover:bg-gray-700 border border-gray-700 rounded-md">Submit data</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default UploadData;