import { ethers } from 'ethers';

export default function EthToWei(n: string) {
	try {
		return ethers.utils.parseUnits(n.toString(), 'ether');
	} catch (error: any) {
		throw new Error(`[Error] EthToWei: ${error.message}`);
	}
}
