"use client";
import { useRouter } from "next/navigation";
import { ArrowRightOutlined } from "@ant-design/icons"
import { mockData } from "~/root/utils/functions/mockData"

export default async function List() {

    const router = useRouter();

    return (
        <div className="flex flex-col lg:p-5 mt-[16vh] items-center justify-center">
            <div className="grid grid-cols-1 w-3/4">
                <h1 className="text-2xl font-bold p-4">Medical records</h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto md:overflow-x-hidden mb-5 border border-b-[1px] border-[#374151] rounded-md">
                        <table className="bg-gray-800 lg:p-4 lg:py-10 max-h-screen">
                            <thead className='bg-gray-700 text-[#9CA3AF] rounded-md'>
                                <tr className='text-left'>
                                    <th className="px-4 py-2 font-semibold">TRANSACTIONS H.</th>
                                    <th className="px-4 py-2 font-semibold">TYPE OF MOVEMENT</th>
                                    <th className="px-4 py-2 font-semibold">DATE</th>
                                    <th className="px-4 py-2 font-semibold">PROJECT</th>
                                    <th className="px-4 py-2 font-semibold">REFERENCE ID</th>
                                    <th className="px-4 py-2 font-semibold">VALUE</th>
                                    <th className="px-4 py-2 font-semibold">COIN</th>
                                    <th className="px-4 py-2 font-semibold">OPTION</th>
                                </tr>
                            </thead>
                            <tbody className='text-white'>
                                {mockData.map((value: any, i: number) => {
                                    return (
                                        <tr className='border-b-[1px] border-[#374151]' key={i}>
                                            <td className="text-left px-4 py-2">{value?.transaction}</td>
                                            <td className="text-left px-4 py-2 text-[#9CA3AF]">{value?.typeOfMovement}<p className='text-white font-bold'>{value?.nameOfProyect}</p></td>
                                            <td className="text-left px-4 py-2">{value?.date}</td>
                                            <td className="text-left px-4 py-2">{value?.project}</td>
                                            <td className="text-left px-4 py-2">{value?.referenceId}</td>
                                            <td className="text-left px-4 py-2">{value?.value}</td>
                                            <td className="text-left px-4 py-2">{value?.coin}</td>
                                            <td className="text-left px-4 py-2">
                                                <button
                                                    className="p-2 bg-gray-800 rounded-md border border-gray-700 hover:bg-gray-700"
                                                    onClick={() => router.push('/request-data/' + value?.referenceId.slice(1))}
                                                >
                                                    Request Data
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className='px-2 py-5 bg-gray-800 text-white'>
                            <div className='flex justify-between items-center'>
                                <p className='ml-2 cursor-pointer'>
                                    <span className='text-gray-400 top-1/2 mr-2'>Showing</span>
                                    1-10
                                    <span className='text-gray-400 mx-2'>of</span>
                                    1000
                                </p>
                                <button className='px-3 py-2 text-sm border border-b-[1px] border-[#374151] rounded-md flex items-center hover:bg-gray-700'>
                                    See all transactions <ArrowRightOutlined className='ml-2' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}