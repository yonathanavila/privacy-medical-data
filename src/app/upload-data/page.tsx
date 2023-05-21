const UploadData = () => {

    const handleOnSubmit = (event: any) => {
        event.preventDefault();
    }

    return (
        <div className="flex flex-col mt-24 h-screen items-center justify-center">
            <div className="grid lg:grid-cols-1 w-1/2">
                <div>
                    <h1 className="text-2xl">Provide data - File-Health</h1>
                    <form
                        onSubmit={handleOnSubmit}
                        className="p-4 rounded-md bg-gary-800 border border-gray-700"
                    >
                        <label className="text-white text-xl font-semibold">Data classification</label>
                        <input type="text" name="classification" className="p-2" />
                        <label className="text-white text-xl font-semibold">Fee to request data</label>
                        <input type="text" name="requestDataFee" className="p-2" />
                        <label className="text-white text-xl font-semibold">Upload data file</label>
                        <input type="file" name="dataFile" className="p-2" />
                        <button type="submit" className="p-4">Submit data</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default UploadData;