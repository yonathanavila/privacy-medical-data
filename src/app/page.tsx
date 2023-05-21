"use client";
import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter();

  return (
    <>
      <div className="logoBck z-10" style={{ opacity: "65%", transform: "translateY(-50%)" }}></div>
      <div className=" flex flex-col mb-32 text-center lg:text-left mt-[20vh] p-4">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 h-screen">
          <div className="flex flex-col items-center justify-center h-1/2">
            <h1 className="text-7xl font-boxing font-semibold z-20 text-center">FileHealth</h1>
            <div className="w-1/2 bg-green-600 p-1 rounded-xl left-1/2"></div>
            <p className="text-xl mt-10 z-20">A decentrilized solition to request medical records</p>
            <p className="text-md mt-4 z-20">#FVMDataverse #2023</p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}
