import toast from 'react-hot-toast';

const baseURI = process.env.NEXT_PUBLIC_BASE_URI || "/api/v1"

const Q1 = async (data: any) => {
    const { result, formInfo, address }: any = data;
    try {
        const response = await fetch(`${baseURI}/Q1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                C1: formInfo.classification,
                C2: Number(formInfo.requestDataFee),
                C3: result,
                C4: address
            }),
        });
        const supaResponse = await response.json();

        if (supaResponse.error) {
            toast.remove()
            toast.error('Error saving');
            throw new Error(supaResponse.error);

        }

        if (supaResponse.length > 0) {
            toast.remove();
            toast.success("Perfect, your transaction was saved");
            return supaResponse;
        } else {
            toast.remove()
            toast.error('Error saving');
            throw new Error("Error saving");
        }

    } catch (error: any) {
        toast.remove()
        toast.error('Error saving');
        throw new Error(error);
    }
}

export default Q1;