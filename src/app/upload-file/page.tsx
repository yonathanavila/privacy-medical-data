"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [formInfo, setFormInfo] = useState<any>({
        queryFile: "",
        projectionFile: "",
        scriptFile: ""
    });

    useEffect(() => {
        console.log(formInfo);
    }, [formInfo])

    const handleCallerInfoChange = (event: any) => {
        const { name, files } = event.target;
        console.log(name);
        setFormInfo({ ...formInfo, [name]: files[0] });
    };

    const handleOnDropQuery = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        const updatedFormInfo = { ...formInfo };
        delete updatedFormInfo['queryFile'];
        setFormInfo({ ...formInfo, ['queryFile']: files[0] });
    };

    const handleOnDropProjection = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        const updatedFormInfo = { ...formInfo };
        delete updatedFormInfo['queryFile'];
        setFormInfo({ ...formInfo, ['projectionFile']: files[0] });
    };

    const handleOnDropScript = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        const updatedFormInfo = { ...formInfo };
        delete updatedFormInfo['queryFile'];
        setFormInfo({ ...formInfo, ['scriptFile']: files[0] });
    };

    const handleFileUpload = () => {
        /* ---------------------------
         |--> Call api python |
         ---------------------------*/
        if (!formInfo) {
            return; // No file selected, handle the error
        }

        const options: any = {
            method: 'POST',
            body: formInfo
        };

        fetch('/api/v1/upload-file', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

    };

    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen items-center my-10 p-5">
            <button
                onClick={() => router.push('/')}
                className='bg-transparent border border-transparent hover:bg-neutral-800/30 hover:border-gray-300 p-4 rounded-md font-semibold'
            >
                Back to Home
            </button>
            <div className="mt-0 max-w-md">
                <div className="px-4 sm:px-0 m-4">
                    <h3 className="font-bold text-lg text-white">Query</h3>
                    <p className="mt-1 text-sm text-white">
                        You need to provide a query to request the data before.
                    </p>
                </div>
                <form onSubmit={handleFileUpload}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden border border-gray-300 mt-4 rounded-md">
                        <div className="px-4 py-5 sm:p-6">
                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Select file
                                </label>
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleOnDropQuery}
                                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-neutral-800/30">
                                    <div className="space-y-1 text-center">

                                        <svg className="mx-auto h-12 w-12 text-cyan-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L12 12M12 22L12 12M12 12L22 12M12 12L2 12" />
                                        </svg>

                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="queryFile" className="relative cursor-pointer bg-neutral-800/30 rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                                                <span>Upload a file</span>
                                                <input
                                                    id="queryFile"
                                                    name="queryFile"
                                                    type="file"
                                                    accept=".csv, .txt, .pdf, .json"
                                                    onChange={handleCallerInfoChange}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-cyan-500">
                                            JSON, CSV, TXT up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 text-right sm:px-6">

                            {formInfo?.queryFile && (
                                <div>
                                    <p className='text-white text-left font-semibold'>Selected file: {formInfo?.queryFile?.name}</p>
                                    <button type="submit" className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Upload
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-0 max-w-md">
                        <div className="px-4 sm:px-0 m-4">
                            <h3 className="font-bold text-lg text-white">Projection</h3>
                            <p className="mt-1 text-sm text-white">
                                It allows you to define the specific data you want to retrieve from a database or data source.
                            </p>
                        </div>
                        <div className="shadow sm:rounded-md sm:overflow-hidden border border-gray-300 mt-4 rounded-md">
                            <div className="px-4 py-5 sm:p-6">
                                <div>
                                    <label className="block text-sm font-medium text-white">
                                        Select file
                                    </label>
                                    <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleOnDropProjection}
                                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-neutral-800/30">
                                        <div className="space-y-1 text-center">

                                            <svg className="mx-auto h-12 w-12 text-cyan-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 2L12 12M12 22L12 12M12 12L22 12M12 12L2 12" />
                                            </svg>

                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="projectionFile" className="relative cursor-pointer bg-neutral-800/30 rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="projectionFile"
                                                        name="projectionFile"
                                                        type="file"
                                                        accept=".csv, .txt, .pdf, .json"
                                                        onChange={handleCallerInfoChange}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-cyan-500">
                                                JSON, CSV, TXT up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-right sm:px-6">

                                {formInfo?.projectionFile && (
                                    <div>
                                        <p className='text-white text-left font-semibold'>Selected file: {formInfo?.projectionFile?.name}</p>
                                        <button type="submit" className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Upload
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-0 max-w-md">
                        <div className="px-4 sm:px-0 m-4">
                            <h3 className="font-bold text-lg text-white">Upload Script</h3>
                            <p className="mt-1 text-sm text-white">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                        <div className="shadow sm:rounded-md sm:overflow-hidden border border-gray-300 mt-4 rounded-md">
                            <div className="px-4 py-5 sm:p-6">
                                <div>
                                    <label className="block text-sm font-medium text-white">
                                        Select file
                                    </label>
                                    <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleOnDropScript}
                                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-neutral-800/30">
                                        <div className="space-y-1 text-center">

                                            <svg className="mx-auto h-12 w-12 text-cyan-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 2L12 12M12 22L12 12M12 12L22 12M12 12L2 12" />
                                            </svg>

                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="scriptFile" className="relative cursor-pointer bg-neutral-800/30 rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="scriptFile"
                                                        name="scriptFile"
                                                        type="file"
                                                        accept=".csv, .txt, .pdf, .json"
                                                        onChange={handleCallerInfoChange}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-cyan-500">
                                                JSON, CSV, TXT up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-right sm:px-6">

                                {formInfo?.scriptFile && (
                                    <div>
                                        <p className='text-white text-left font-semibold'>Selected file: {formInfo?.scriptFile?.name}</p>
                                        <button type="submit" className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Upload
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

// dynamic export to avoid SSR
export default dynamic(() => Promise.resolve(Page), {
    ssr: false,
});
