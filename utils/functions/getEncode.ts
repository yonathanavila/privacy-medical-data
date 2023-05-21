import { ethers } from 'ethers';

export interface IApplicantInformation {
    amount: number | string,
    dataProvider: any,
    queryCID: string,
    projectionCID: string,
    scriptCID: string
}

export default function getEncode(
    applicantInformation: IApplicantInformation
): string {

    try {
        // Handle decimal numbers by multiplying with the appropriate factor
        const amountWei = ethers.utils.parseUnits(applicantInformation.amount.toString(), 18);

        // Encode the function call data
        const encodedData = ethers.utils.defaultAbiCoder.encode(
            ["uint256", "address", "string", "string", "string"],
            [amountWei, applicantInformation.dataProvider, applicantInformation.queryCID, applicantInformation.projectionCID, applicantInformation.scriptCID]
        );

        return encodedData;

    } catch (error: any) {
        throw new Error(`[Error] getEncode: ${error.message} `);
    }
}
