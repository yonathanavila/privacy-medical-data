import toast from 'react-hot-toast';
import lighthouse from '@lighthouse-web3/sdk';


const api_key = process.env.NEXT_PUBLIC_API_KEY!;

const progressCallback = (progressData: any) => {
  let current: any = (progressData?.total / progressData?.uploaded)?.toFixed(2)
  let percentageDone = 100 - current;
  return percentageDone;
};

export const uploadFile = async (e: any) => {
  console.log('Enter', e)
  try {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    const output: any = await lighthouse.upload(e, api_key, progressCallback);
    console.log('File Status:', output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    return output.data.Hash;
  } catch (error) {
    toast.error("This didn't work.")
    toast.remove();
    console.error(error)
  }

}