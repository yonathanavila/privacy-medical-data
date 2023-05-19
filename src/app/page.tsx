"use client";
import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter();

  return (
    <>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          onClick={() => router.push('/upload-file')}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:cursor-pointer"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Upload file{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`} style={{ fontFamily: 'Roboto' }}>
            Upload file provided by the user (python script) to the backend.
          </p>

          <div className="font-roboto">
            This text will use the custom font.
          </div>
        </a>

      </div>
    </>
  )
}
