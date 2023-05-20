const ButtonUpload = ({ name, handle }: any) => {

    console.log(name)
    return (
        <>
            <p className='text-white text-left font-semibold'>Selected file: {name}</p>
            <button
                onClick={handle}
                className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Upload
            </button>
        </>
    )
}

export default ButtonUpload;