import { ethers } from 'ethers';
import { FetchSignerResult } from '@wagmi/core';
import { getMaxPriorityFeePerGas } from './getFee';
import { ABI } from './abi';
import EthToWei from './ethToWei';


const baseURI = process.env.NEXT_PUBLIC_BASE_URI || "/api/v1"
const medicalRecordsAddress = process.env.NEXT_PUBLIC_MR_ADDRESS!

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

    const maxPriorityFee = await getMaxPriorityFeePerGas(provider);
    const args: any[] = [
        _encodedQuery,
        {
            gasLimit: 1800000,
            maxPriorityFeePerGas: maxPriorityFee?.toString(),
            value: EthToWei(fee.toString())
        }
    ];

    console.log('args', args);

    try {
        const contract = new ethers.Contract(medicalRecordsAddress, ABI, signer);
        const tx = await contract.createNewQuery(...args);
        const receipt = await tx.wait();

        if (!receipt) {
            throw new Error('Transaction failed');
        }
        return {
            data: receipt,
            hasError: false
        };
    } catch (error: any) {
        console.error(error);
        throw new Error('Failed to reveal applicants');
    }
};
