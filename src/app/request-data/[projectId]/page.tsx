"use client";

import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';

import { chainId } from '~/root/utils/functions/chain';
import NoConnected from '~/app/components/NoConnected';
import getTotalFee from '~/root/utils/functions/getTotalFee';
import getFILPrice from '~/root/utils/functions/getFILPrice';
import { uploadFile } from '~/root/utils/functions/uploadFile';
import DropInput from '../../components/QuerySelector/DropInput';
import ButtonUpload from '../../components/QuerySelector/ButtonUpload';
import { createNewQuery } from '~/root/utils/functions/createNewQuery';
import { addStep, clearArray, selectStep } from '~/root/utils/slice/steps';
import { useAppDispatch, useAppSelector } from '~/root/hooks/useAppDispatch';
import getEncode, { IApplicantInformation } from '~/root/utils/functions/getEncode';

const Page = () => {

    const dispatch = useAppDispatch();
    const { address, isConnected } = useAccount();
    const steps: any = useAppSelector(selectStep);
    const [stepOne, setStepOne] = useState<any>("");
    const [stepTwo, setStepTwo] = useState<any>("");
    const [amount, setAmount] = useState<number>(22);
    const [stepThree, setStepThree] = useState<any>("");
    const [currentStep, setCurrentStep] = useState<any>("");
    const [stepOneInfo, setStepOneInfo] = useState<any>("");
    const [stepTwoInfo, setStepTwoInfo] = useState<any>("");
    const [stepThreeInfo, setStepThreeInfo] = useState<any>("");

    const provider = useProvider(chainId);
    const { data: signer } = useSigner(chainId);

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
        event.preventDefault();
        const { name, files } = event.target;
        setStepOneInfo(
            { name, file: event }
        )
    };

    const handleStepTwoInfoChange = (event: any) => {
        event.preventDefault();
        const { name, files } = event.target;
        setStepTwoInfo({ name, file: event });
    };

    const handleStepThreeInfoChange = (event: any) => {
        event.preventDefault();
        const { name, files } = event.target;
        setStepThreeInfo({ name, file: event });
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
        toast.loading('Your file is being uploaded');
        setStepLoading(step, true);
        let CID = ''
        switch (step) {
            case 1:
                if (!stepOneInfo) {
                    throw new Error("No data");
                }
                CID = await uploadFile(stepOneInfo.file);
                dispatch(addStep({
                    stepName: 'queryFile',
                    CID
                }));
                setStepOne({ loading: false, stepName: 'queryFile', CID });
                setCurrentStep({
                    current: 'queryFile',
                    next: 'projectionFile'
                });

                toast.remove();
                toast.success('👏 Good Job!!')
                break;
            case 2:
                if (!stepTwoInfo) {
                    throw new Error("No data");
                }
                CID = await uploadFile(stepTwoInfo.file);
                dispatch(addStep({
                    stepName: 'projectionFile',
                    CID
                }));
                setStepTwo({ loading: false, stepName: 'projectionFile', CID });
                setCurrentStep({
                    current: 'projectionFile',
                    next: 'scriptFile'
                });
                toast.remove();
                toast.success('👏 Good Job!!')
                break;
            case 3:
                if (!stepThreeInfo) {
                    throw new Error("No data");
                }
                CID = await uploadFile(stepThreeInfo.file);
                dispatch(addStep({
                    stepName: 'scriptFile',
                    CID
                }));
                setStepThree({ loading: false, stepName: 'scriptFile', CID });
                setCurrentStep({
                    current: 'scriptFile',
                    next: ''
                });
                toast.remove();
                toast.success('👏 Good Job!!')
                break;
            default:
                toast.remove();
                toast.error("This didn't work.")
                throw new Error("Invalid step");
        }

    };

    const handleOnDropStep1 = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setStepOneInfo(
            { name: 'queryFile', file: files }
        )
        // Additional logic for step 1
    };

    const handleOnDropStep2 = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setStepTwoInfo({ name: 'projectionFile', file: event });
        // Additional logic for step 2
    };

    const handleOnDropStep3 = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setStepThreeInfo({ name: 'scriptFile', file: event });
        // Additional logic for step 3
    };

    const handleConfirm = () => {

        toast.loading('Sending transaction...');

        const _steps = [
            {
                "stepName": "queryFile",
                "CID": "QmQJBu9G8WZ2SbDKNogxcLDxWGTVsQPPcigd4pm7hayCKa"
            },
            {
                "stepName": "projectionFile",
                "CID": "QmaPDtj3dPFkDLZqdsMiaATpQgyADFiVSC6CSEKMGobBmC"
            },
            {
                "stepName": "scriptFile",
                "CID": "QmcAk1yZXPg77DhfE538vb2iVFLeM7LvqbmxXKKtUdsqLa"
            }
        ]
        const data: IApplicantInformation = {
            amount,
            dataProvider: "0x6a30fcA0254812026931117773DCa2B5ABcaF386",
            queryCID: _steps[0].CID,
            projectionCID: _steps[1].CID,
            scriptCID: _steps[2].CID
        };
        const dataEncoded = getEncode(data);
        createNewQuery(provider, signer, [dataEncoded], amount);
        dispatch(clearArray)
        console.log(dataEncoded);
    };

    const router = useRouter();


    if (!address && !isConnected) {
        return <NoConnected />
    }

    return (
        <div className="flex flex-col min-h-screen items-center my-10 p-5" >
            <div className="relative">
                <div className="fixed top-[25vh] right-0 p-4 mr-4 z-10 w-[20%] drop-shadow-lg border border-gray-700 rounded-md bg-neutral-800/70">
                    <ul className="p-2">
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {stepOne?.loading ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${stepOne ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                <p className={`${stepOne?.loading || currentStep?.current === 'queryFile' && 'text-xl text-white'} transition ease-in-out delay-150 duration-300 hover:scale-110`}>Upload the query</p>
                            </div>
                        </li>
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {stepTwo?.loading ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${stepTwo ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                <p className={`${stepTwo?.loading || currentStep?.current === 'projectionFile' && 'text-xl text-white'} transition ease-in-out delay-150 duration-300 hover:scale-110`}>Upload the projection</p>
                            </div>
                        </li>
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {stepThree?.loading ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${stepThree ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                <p className={`${stepThree?.loading || currentStep?.current === 'scriptFile' && 'text-xl text-white'} transition ease-in-out delay-150 duration-300 hover:scale-110`}>Upload the script</p>
                            </div>
                        </li>
                    </ul>
                    <p className='text-center text-sm'>1 FIL = 4.5 USD</p>
                    <div className="text-right mt-4 text-black dark:text-slate-500 font-medium">
                        <div className="ml-auto text-right mt-4">
                            <div className="text-md text-slate-500 dark:text-slate-500">Total</div>
                            <div className="text-xl text-black dark:text-white">{getTotalFee([{ fee: 1000 }]).total} FIL</div>
                            <div className="text-md text-slate-500 dark:text-slate-500">${getFILPrice(getTotalFee([{ fee: 1000 }]).total)}</div>
                        </div>
                    </div>
                    <button
                        className='p-4 w-full bg-cyan-700 rounded-xl mt-2 hover:bg-cyan-800'
                        onClick={handleConfirm}
                    >
                        Confirm order
                    </button>
                </div>
                <div className="z-0 bg-neutral-800/70 rounded-xl">
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
                            <div className="shadow sm:rounded-md sm:overflow-hidden mt-4 rounded-md hover:border hover:border-gray-300">
                                <div className='p-2 block'>
                                    <CheckCircleOutlined className={`${stepOne ? '' : 'hidden'} z-5 text-center block text-7xl text-green-500 mx-1/2`} />
                                    <a className={`${stepOne ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`} target='_blank' href={'https://gateway.lighthouse.storage/ipfs/' + stepOne?.CID}>Visit at Lighthouse</a>
                                </div>
                                <div className={`${stepOne && 'blur-md disabled:opacity-50 disabled:pointer-events-none'}`}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white">
                                                Select file
                                            </label>
                                            <DropInput handleDrop={handleOnDropStep1} handleChange={handleStepOneInfoChange} customName={"queryFile"} id={"queryFile"} />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        {stepOneInfo?.file && (<ButtonUpload name={stepOneInfo?.name} handle={() => handleFileUpload(1)} enable={stepOne?.CID ? true : false} />)}
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
                            <div className="shadow sm:rounded-md sm:overflow-hidden hover:border hover:border-gray-300 mt-4 rounded-md">
                                <div className='p-2'>
                                    <CheckCircleOutlined className={`${stepTwo ? '' : 'hidden'} z-5 text-center block text-7xl text-green-500 mx-1/2`} />
                                    <a className={`${stepTwo ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`} target='_blank' href={'https://gateway.lighthouse.storage/ipfs/' + stepTwo?.CID}>Visit at Lighthouse</a>

                                </div>
                                <div className={`${stepTwo && 'blur-md disabled:opacity-50 disabled:pointer-events-none'}`}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white">
                                                Select file
                                            </label>
                                            <DropInput handleDrop={handleOnDropStep2} handleChange={handleStepTwoInfoChange} customName={"projectionFile"} id="projectionFile" />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        {stepTwoInfo && (<ButtonUpload name={stepTwoInfo?.name} handle={() => handleFileUpload(2)} enable={stepTwo?.CID ? true : false} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-0 max-w-md">
                            <div className="px-4 sm:px-0 m-4">
                                <h3 className="font-bold text-lg text-white">Upload Script</h3>
                                <p className="mt-1 text-sm text-white">
                                    The script allows to execute the query over the data.
                                </p>
                            </div>
                            <div className="shadow sm:rounded-md sm:overflow-hidden hover:border hover:border-gray-300 mt-4 rounded-md">
                                <div className='p-2'>
                                    <CheckCircleOutlined className={`${stepThree ? '' : 'hidden'} z-5 text-center block text-7xl text-green-500 mx-1/2`} />
                                    <a className={`${stepThree ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`} target='_blank' href={'https://gateway.lighthouse.storage/ipfs/' + stepThree?.CID}>Visit at Lighthouse</a>

                                </div>
                                <div className={`${stepThree && 'blur-md disabled:opacity-50 disabled:pointer-events-none'}`}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white">
                                                Select file
                                            </label>
                                            <DropInput handleDrop={handleOnDropStep3} handleChange={handleStepThreeInfoChange} customName={"scriptFile"} id="scriptFile" />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        {stepThreeInfo && (<ButtonUpload name={stepThreeInfo?.name} handle={() => handleFileUpload(3)} enable={stepThree?.CID ? true : false} />)}
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
