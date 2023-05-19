"use client";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { addStep, selectStep } from '~/root/utils/slice/steps';
import { storeFiles } from '~/root/utils/functions/QuerySelector';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '~/root/hooks/useAppDispatch';
import DropInput from '../components/QuerySelector/DropInput';

const Page = () => {
    const dispatch = useAppDispatch();
    const steps: any = useAppSelector(selectStep);
    const [stepOneInfo, setStepOneInfo] = useState<any>(null);
    const [stepTwoInfo, setStepTwoInfo] = useState<any>(null);
    const [stepThreeInfo, setStepThreeInfo] = useState<any>(null);
    const [stepOne, setStepOne] = useState<any>("");
    const [stepTwo, setStepTwo] = useState<any>("");
    const [stepThree, setStepThree] = useState<any>("");

    useEffect(() => {
        // set query file if exist
        if (!stepOne) {

            const queryFile = findStep('queryFile');
            setStepOne(queryFile);
        }
    }, [steps]);

    const findStep = (stepName: string) => {
        if (steps.length > 0) {
            // call storage to seacrh step
            const index = steps.find((step: any) => step.stepName === stepName);
            if (index) {
                return index;
            }
            return undefined;
        }
        return undefined;
    }

    const handleStepOneInfoChange = (event: any) => {
        const { name, files } = event.target;
        console.log(name);
        setStepOneInfo(files[0]);
    };

    const handleStepTwoInfoChange = (event: any) => {
        const { name, files } = event.target;
        console.log(name);
        setStepTwoInfo(files[0]);
    };

    const handleStepThreeInfoChange = (event: any) => {
        const { name, files } = event.target;
        console.log(name);
        setStepThreeInfo(files[0]);
    };

    const setStepLoading = (step: number, loading: boolean) => {
        switch (step) {
            case 1:
                setStepOne({ loading });
                break;
            case 2:
                setStepTwo({ loading });
                break;
            case 3:
                setStepThree({ loading });
                break;
            default:
                throw new Error("Invalid step");
        }
    };

    const handleFileUpload = async (step: number) => {
        setStepLoading(step, true);

        let CID = ''
        switch (step) {
            case 1:
                if (!stepOneInfo) {
                    throw new Error("No data");
                }
                CID = await storeFiles(stepOneInfo);
                dispatch(addStep({
                    stepName: 'queryFile',
                    CID
                }));
                setStepOne({ loading: false, stepName: 'queryFile', CID });
                break;
            case 2:
                if (!stepTwoInfo) {
                    throw new Error("No data");
                }
                CID = await storeFiles(stepOneInfo);
                dispatch(addStep({
                    stepName: 'projectionFile',
                    CID
                }));
                setStepTwo({ loading: false, stepName: 'projectionFile', CID });
                break;
            case 3:
                if (!stepThreeInfo) {
                    throw new Error("No data");
                }
                CID = await storeFiles(stepOneInfo);
                dispatch(addStep({
                    stepName: 'scriptFile',
                    CID
                }));
                setStepThree({ loading: false, stepName: 'scriptFile', CID });
                break;
            default:
                throw new Error("Invalid step");
        }

    };

    const handleOnDropStep1 = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setStepOneInfo(files[0]);
        // Additional logic for step 1
    };

    const handleOnDropStep2 = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setStepTwoInfo(files[0]);
        // Additional logic for step 2
    };

    const handleOnDropStep3 = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setStepThreeInfo(files[0]);
        // Additional logic for step 3
    };

    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen items-center my-10 p-5">
            <div className="relative">
                <div className="fixed top-[12vh] right-0 p-4 mr-4 z-10 w-[20%] drop-shadow-lg border border-gray-700 rounded-md bg-gray-800">
                    <ul className="">
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {stepOne?.loading ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${stepOne ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                Upload the query selector
                            </div>
                        </li>
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {stepTwo?.loading ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${stepTwo ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                Upload the projection
                            </div>
                        </li>
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {stepThree?.loading ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${stepThree ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                Upload the script
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="z-0">
                    <button
                        onClick={() => router.push('/')}
                        className='bg-transparent border border-transparent hover:bg-neutral-800/30 hover:border-gray-300 p-4 rounded-md font-semibold'
                    >
                        Back to Home
                    </button>
                    <div className="mt-0 max-w-md">
                        <article >
                            <div className="px-4 sm:px-0 m-4">
                                <h3 className="font-bold text-lg text-white">
                                    Query
                                </h3>
                                <p className="mt-1 text-sm text-white">
                                    You need to provide a query to request the data before.
                                </p>
                            </div>
                            <div className="shadow sm:rounded-md sm:overflow-hidden border border-gray-300 mt-4 rounded-md">
                                <div className='p-2 block'>
                                    <CheckCircleOutlined className={`${stepOne ? '' : 'hidden'} z-5 text-center block text-7xl text-green-500 mx-1/2`} />
                                    <p className={`${stepOne ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`}>Your CID is:</p>
                                    <p className={`${stepOne ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`}>{stepOne?.CID}</p>
                                </div>
                                <div className={`${stepOne && 'blur-md'}`}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white">
                                                Select file
                                            </label>
                                            <DropInput handleDrop={handleOnDropStep1} handleChange={handleStepOneInfoChange} />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        {stepThreeInfo && (<ButtonUpload name={stepOneInfo?.name} handle={handleFileUpload(1)} />)}
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="mt-0 max-w-md">
                            <div className="px-4 sm:px-0 m-4">
                                <h3 className="font-bold text-lg text-white">Projection</h3>
                                <p className="mt-1 text-sm text-white">
                                    It allows you to define the specific data you want to retrieve from a database or data source.
                                </p>
                            </div>
                            <div className="shadow sm:rounded-md sm:overflow-hidden border border-gray-300 mt-4 rounded-md">
                                <div className='p-2'>
                                    <CheckCircleOutlined className={`${stepTwo ? '' : 'hidden'} z-5 text-center block text-7xl text-green-500 mx-1/2`} />
                                    <p className={`${stepTwo ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`}>{stepTwo?.CID}</p>

                                </div>
                                <div className={`${stepTwo && 'blur-md'}`}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white">
                                                Select file
                                            </label>
                                            <DropInput handleDrop={handleOnDropStep2} handleChange={handleStepTwoInfoChange} />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        {stepThreeInfo && (<ButtonUpload name={stepTwoInfo?.name} handle={handleFileUpload(2)} />)}
                                    </div>
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
                                <div className='p-2'>
                                    <CheckCircleOutlined className={`${stepThree ? '' : 'hidden'} z-5 text-center block text-7xl text-green-500 mx-1/2`} />
                                    <p className={`${stepThree ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`}>{stepThree?.CID}</p>

                                </div>
                                <div className={`${stepThree && 'blur-md'}`}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white">
                                                Select file
                                            </label>
                                            <DropInput handleDrop={handleOnDropStep3} handleChange={handleStepThreeInfoChange} />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        {stepThreeInfo && (<ButtonUpload name={stepThreeInfo?.name} handle={handleFileUpload(3)} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// dynamic export to avoid SSR
export default dynamic(() => Promise.resolve(Page), {
    ssr: false,
});
