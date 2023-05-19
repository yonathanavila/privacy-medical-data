"use client";
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleFileSelect = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileDrop = (event: any) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = () => {
        /* ---------------------------
         |--> Call api python |
         ---------------------------*/
        if (!selectedFile) {
            return; // No file selected, handle the error
        }


        const formData = new FormData();
        formData.append('file', selectedFile);


        const options = {
            method: 'POST',
            body: selectedFile
        };

        fetch('/api/v1/upload-file', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        console.log(selectedFile);
    };

    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen items-center">
            <button
                onClick={() => router.push('/')}
                className='bg-transparent border border-transparent hover:bg-neutral-800/30 hover:border-gray-300 p-4 rounded-md font-semibold font-roboto'
            >
                Back to Home
            </button>
            <div className="md:mt-0 md:col-span-2 max-w-md">
                <div className="px-4 sm:px-0 m-4">
                    <h3 className="font-roboto text-lg text-white">Profile</h3>
                    <p className="mt-1 text-sm text-white">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
                <form onSubmit={handleFileUpload}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden border border-gray-300">
                        <div className="px-4 py-5 sm:p-6">
                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Select file
                                </label>
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleFileDrop}
                                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-neutral-800/30">
                                    <div className="space-y-1 text-center">

                                        <svg className="mx-auto h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L12 12M12 22L12 12M12 12L22 12M12 12L2 12" />
                                        </svg>

                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-neutral-800/30 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    accept=".csv, .txt, .pdf, .json"
                                                    onChange={handleFileSelect} className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PDF, JSON, CSV, TXT up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 text-right sm:px-6 bg-neutral-800/30">

                            {selectedFile && (
                                <div>
                                    <p className='text-white text-left font-semibold'>Selected file: {selectedFile.name}</p>
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Upload
                                    </button>
                                </div>
                            )}
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
