const ButtonUpload = ({ name, handle, enable }: any) => {
    return (
        <>
            <p className='text-white text-left font-semibold'>Selected file: {name}</p>
            <button
                disabled={enable}
                onClick={handle}
                className={`mt-4 py-2 px-4 text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-indigo-500 cursor-pointer ${enable && 'disabled:opacity-50 disabled:pointer-events-none'}`}>
                Upload
            </button >
        </>
    )
}

export default ButtonUpload;