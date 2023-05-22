"use client";
import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';

import { chainId } from '~/root/utils/functions/chain';
import NoConnected from '~/app/components/NoConnected';
import getTotalFee from '~/root/utils/functions/getTotalFee';
import getFILPrice from '~/root/utils/functions/getFILPrice';
import { uploadFile } from '~/root/utils/functions/uploadFile';
import DropInput from '../../components/QuerySelector/DropInput';
import { createNewQuery } from '~/root/utils/functions/createNewQuery';
import { addStep, clearArray, selectStep } from '~/root/utils/slice/steps';
import { useAppDispatch, useAppSelector } from '~/root/hooks/useAppDispatch';
import getEncode, { IApplicantInformation } from '~/root/utils/functions/getEncode';

interface IProjection {
    loading: boolean,
    data: any[],
    done: boolean
}

interface ICurrentStep {
    loading?: boolean,
    done?: boolean,
    data?: any[],
    step: string
}

const Page = () => {

    const dispatch = useAppDispatch();
    const { address, isConnected } = useAccount();
    const steps: any = useAppSelector(selectStep);
    const [amount, setAmount] = useState<number>(22);
    const [currentStep, setCurrentStep] = useState<ICurrentStep>();
    const [loadingProjection, setLoadingProjection] = useState<IProjection>({ loading: false, data: [], done: false });

    const provider = useProvider(chainId);
    const { data: signer } = useSigner(chainId);

    const handleStepOneInfoChange = (event: any) => {
        event.preventDefault();
        const { name, files } = event.target;
        setCurrentStep((prevState: any) => ({
            ...prevState,
            data: [event],
            step: 'queryFile'
        }));
    };

    const handleFileUpload = async () => {
        toast.loading('Your file is being uploaded');

        setCurrentStep((prevState: any) => ({
            ...prevState,
            loading: true,
            done: false,
        }));

        if (currentStep?.data?.length == 0 || currentStep?.data === undefined) {
            setCurrentStep({
                loading: false,
                done: false,
                step: 'queryFile'
            });
            throw new Error("No data");
        }

        const CID = await uploadFile(currentStep?.data[0]);

        setCurrentStep({
            loading: false,
            done: true,
            data: [CID],
            step: 'queryFile'
        });

        dispatch(addStep({
            stepName: 'queryFile',
            CID
        }));

        setLoadingProjection(
            {
                loading: true,
                data: [{
                    dateOfEntry: '22/4/2023',
                    patientReferenceID: '#5862335286',
                    symptoms: 'Dizziness, Fatigue, Shortness of breath',
                    diagnosis: 'Hypertension'
                }],
                done: false
            }
        );

        setTimeout(() => {
            setLoadingProjection((prevState: any) => (
                {
                    ...prevState,
                    loading: false,
                    done: true,
                }
            ));
        }, 30000);

        toast.remove();
        toast.success('👏 Good Job!!')
    };

    const handleOnDropStep1 = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setCurrentStep({
            loading: false,
            done: true,
            data: [{ step: 'queryFile', file: files }],
            step: 'queryFile'
        });
    };

    const handleConfirm = async () => {

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
        await createNewQuery(provider, signer, [dataEncoded], amount);
        dispatch(clearArray)
        console.log(dataEncoded);
    };

    const router = useRouter();

    if (!address && !isConnected) {
        return <NoConnected />
    }

    return (
        <div className="flex flex-col items-center mt-[15vh] p-4" >
            <div className="relative">
                <div className="fixed right-0 p-4 mr-4 z-10 w-1/4 drop-shadow-lg border border-gray-700 rounded-md bg-neutral-800/70">
                    <ul className="p-2">
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {(currentStep?.loading && currentStep?.step === 'queryFile') ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${(currentStep?.done && currentStep?.step === 'queryFile') ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                <p className={`${currentStep?.loading || currentStep?.step === 'queryFile' && 'text-xl text-white'} transition ease-in-out delay-150 duration-300 hover:scale-110`}>Upload the query</p>
                            </div>
                        </li>
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {(loadingProjection?.loading) ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${(!loadingProjection?.loading && loadingProjection?.data?.length > 0) ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                <p className={`${(loadingProjection?.loading || loadingProjection?.done) && 'text-xl text-white'} transition ease-in-out delay-150 duration-300 hover:scale-110`}>Get the projection</p>
                            </div>
                        </li>
                        <li className="p-2 text-gray-400">
                            <div className='flex flex-row items-center'>
                                {(currentStep?.loading && currentStep?.step === 'runJob') ? <LoadingOutlined className="animate-spin h-5 w-5 mr-3" /> : <CheckCircleOutlined className={`${(currentStep?.done && currentStep?.step === 'runJob') ? '' : 'hidden'} z-5 text-center block text-sm mr-2 mx-1/2`} />}
                                <p className={`${(loadingProjection?.done) && 'text-xl text-white'} transition ease-in-out delay-150 duration-300 hover:scale-110`}>Run the job</p>
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
                <div className="z-0 bg-neutral-800/70 rounded-xl border border-gray-700 rounded-md">
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
                                <p className="mt-1 text-sm text-gray-400 font-semibold">
                                    This query represent how you want to requested records, if you don&apos;t need the entire data, you can provide a query to request specific data of the patients from the record bank.
                                </p>
                            </div>
                            <div className="shadow sm:rounded-md sm:overflow-hidden mt-4 rounded-md hover:border hover:border-gray-300">
                                <div className='p-2 block'>
                                    <CheckCircleOutlined className={`${(!currentStep?.loading && currentStep?.step === 'queryFile' && currentStep?.done) ? '' : 'hidden'} z-5 text-center block text-7xl text-green-500 mx-1/2`} />
                                    <a className={`${(!currentStep?.loading && currentStep?.step === 'queryFile' && currentStep?.done) ? '' : 'hidden'} z-5 text-center block text-xl text-green-500 mx-1/2`} target='_blank' href={'https://gateway.lighthouse.storage/ipfs/' + steps[0]?.CID}>Visit at Lighthouse</a>
                                </div>
                                <div className={`${steps?.CID && 'blur-md disabled:opacity-50 disabled:pointer-events-none'}`}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div>
                                            <label className="block text-sm font-medium text-white">
                                                Select file
                                            </label>
                                            <DropInput handleDrop={handleOnDropStep1} handleChange={handleStepOneInfoChange} customName={"queryFile"} id={"queryFile"} />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                        {currentStep?.data && (
                                            <>
                                                <p className='text-white text-left font-semibold'>Selected file: {currentStep?.step}</p>
                                                <button
                                                    disabled={steps?.CID}
                                                    onClick={handleFileUpload}
                                                    className={`mt-4 py-2 px-4 text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-indigo-500 cursor-pointer ${(steps[0]?.CID) && 'disabled:opacity-50 disabled:pointer-events-none'}`}>
                                                    Upload
                                                </button >
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="mt-0 max-w-md">
                            <div className="px-4 sm:px-0 m-4">
                                <h3 className="font-bold text-lg text-white">Projection</h3>
                                <p className="mt-1 text-sm text-gray-400 font-semibold">
                                    Indicates which specific fields or attributes you are interested in retrieving from the dataset. It&apos;s useful when working with large datasets.
                                </p>
                            </div>
                            <div className="py-4">
                                {
                                    loadingProjection?.loading ?
                                        (
                                            <div className='flex flex-col items-center justify-center'>
                                                <LoadingOutlined />
                                            </div>
                                        ) :
                                        (loadingProjection?.data?.length > 0) && (
                                            (
                                                <>
                                                    <h2 className='p-4'>Projection</h2>
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <table className='mx-2'>
                                                            <thead>
                                                                <tr>
                                                                    <th className='text-xs text-left text-gray-400 bg-gray-700'>DATE OF ENTRY</th>
                                                                    <th className='text-xs text-left text-gray-400 bg-gray-700'>PATIENT REFERENCE ID</th>
                                                                    <th className='text-xs text-left text-gray-400 bg-gray-700'>SYMPTOMS</th>
                                                                    <th className='text-xs text-left text-gray-400 bg-gray-700'>DIAGNOSIS</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr >
                                                                    <td className='text-xs text-left'>22/4/2023</td>
                                                                    <td className='text-xs text-left'>#5862335286</td>
                                                                    <td className='text-xs text-left'>Dizziness, Fatigue, Shortness of breath</td>
                                                                    <td className='text-xs text-left'>Hypertension</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                            )
                                        )
                                }
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
