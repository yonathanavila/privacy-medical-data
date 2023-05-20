const DropInput = ({ handleDrop, handleChange, customName }: any) => {
    return (
        <div
            onDrop={handleDrop}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-neutral-800/30">
            <div className="space-y-1 text-center">

                <svg className="mx-auto h-12 w-12 text-cyan-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L12 12M12 22L12 12M12 12L22 12M12 12L2 12" />
                </svg>

                <div className="flex text-sm text-gray-600">
                    <label htmlFor={customName} className="relative cursor-pointer bg-neutral-800/30 rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                        <span>Upload a file</span>
                        <input
                            id={customName}
                            name={customName}
                            type="file"
                            accept=".csv, .txt, .pdf, .json"
                            onChange={handleChange}
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
    )
}

export default DropInput;