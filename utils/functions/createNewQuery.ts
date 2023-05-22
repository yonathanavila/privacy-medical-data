import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { FetchSignerResult } from '@wagmi/core';

import { ABI } from './abi';
import EthToWei from './ethToWei';

const medicalRecordsAddress = process.env.NEXT_PUBLIC_MR_ADDRESS!
const gasLimit = process.env.NEXT_PUBLIC_GAS_LIMIT!

/// @notice Reveal Resume
interface RevealResponse {
    data: ethers.providers.TransactionReceipt;
    hasError: boolean;
}

export const createNewQuery = async (
    provider: ethers.providers.Provider,
    signer: FetchSignerResult<ethers.Signer> | undefined,
    _encodedQuery: string[],
    fee: number
): Promise<RevealResponse> => {
    // Input parameter validation

    if (!provider || !signer || !_encodedQuery || fee === undefined) {
        throw new Error('Invalid input parameters');
    }
    const args: any[] = [
        _encodedQuery,
        {
            gasLimit: gasLimit || 1800000,
            gasPrice: ethers.utils.parseUnits('2.5', 'gwei'),
            value: EthToWei(fee.toString())
        }
    ];

    console.log('args', args);

    try {
        const contract = new ethers.Contract(medicalRecordsAddress, ABI, signer);
        const tx = await contract.createNewQuery(...args);
        const receipt = await tx.wait();

        if (!receipt) {
            toast.remove();
            toast.error("This didn't work.")

            throw new Error('Transaction failed');
        }
        toast.remove();
        toast.success('👏 Good Job!!')
        return {
            data: receipt,
            hasError: false
        };
    } catch (error: any) {
        console.error(error);
        toast.remove();
        toast.error("This didn't work.")
        throw new Error('Failed to send transaction');
    }
};
