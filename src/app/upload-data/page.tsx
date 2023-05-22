"use client";
import Q1 from "~/root/utils/functions/Q1";
import NoConnected from "../components/NoConnected";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { toast } from 'react-hot-toast';
import lighthouse from '@lighthouse-web3/sdk';
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";

const apiKey = process.env.NEXT_PUBLIC_API_KEY!

const UploadData = () => {

    const { address, isConnected } = useAccount();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [file, setSelectedFile] = useState();
    const [formInfo, setFormInfo] = useState<any>();


    const progressCallback = (progressData: any) => {
        let percentageDone = 100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
        if (percentageDone == 99) {
            setLoading(false);
            setDone(true);
        }
        console.log(percentageDone);
    };

    useEffect(() => {
        /* ListeningLitConnected(setNetworkLoading);
        console.log(networkLoading); */
        document.addEventListener(
            "lit-ready",
            function (e) {
                console.log("LIT network is ready");
            },
            false
        );
    }, []);

    const uploadFile = async (e: any) => {
        setLoading(true);
        try {
            // Push file to lighthouse node
            // Both file and folder are supported by upload function
            const output = await lighthouse.upload(e, apiKey, progressCallback);
            console.log('File Status:', output);
            /*
              output:
                data: {
                  Name: "filename.txt",
                  Size: 88000,
                  Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
                }
              Note: Hash in response is CID.
            */


            console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
            return output.data.Hash;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleOnSubmit = async (event: any) => {
        event.preventDefault();
        if (!address || formInfo.length <= 0 || !file) {
            toast.remove();
            toast.error("Invalid data provided");
            throw new Error("Soma data lost");
        }
        toast.loading('Your transaction was sended');
        const result = await uploadFile(file);
        await Q1({ result, formInfo, address })
    }

    const handleFileChange = (event: any) => {
        event.preventDefault()
        const file = event.target.files[0];
        setSelectedFile(event);
    };

    const handleOnChange = (event: any) => {
        const { name, value } = event.target
        setFormInfo({ ...formInfo, [name]: value });
    }

    if (!address || !isConnected) {
        return <NoConnected />
    }

    return (
        <div className="flex flex-col mt-24 items-center justify-center mt-[15vh]">
            <div className="grid lg:grid-cols-1 w-1/2">
                <div>
                    <h1 className="text-2xl text-semibold">Provide data - File-Health</h1>
                    <form
                        onSubmit={handleOnSubmit}
                        className="p-4 rounded-md bg-gray-800 border border-gray-700 my-4"
                    >
                        <div className="flex flex-col gap-4">
                            <label className="text-white text-xl font-semibold">Data classification</label>
                            <input onChange={handleOnChange} type="text" name="classification" className="p-2 border border-gray-700 bg-gray-800 rounded-md" placeholder="Some text to help us to classify your data, Example: Diabetes data" />
                            <label className="text-white text-xl font-semibold">Fee to request data</label>
                            <input onChange={handleOnChange} type="text" pattern="[0-9]*\.?[0-9]*" inputMode="decimal" name="requestDataFee" className="p-2 border border-gray-700 bg-gray-800 rounded-md" placeholder="To ensure the usefulness of data requests, a nominal fee is required" />
                            <label className="text-white text-xl font-semibold">Upload data file</label>
                            <input type="file" name="dataFile" className="p-2" accept=".pdf,.doc,.docx,.json,.csv,.xlsx" onChange={handleFileChange} />
                            <div className="flex flex-col items-center">
                                <button type="submit" className="flex items-center justify-center p-4 w-3/12 hover:bg-gray-700 border border-gray-700 rounded-md">
                                    {loading && <LoadingOutlined className="mr-2" />}
                                    {done && <CheckOutlined className="mr-2" />}
                                    Submit data
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default UploadData;