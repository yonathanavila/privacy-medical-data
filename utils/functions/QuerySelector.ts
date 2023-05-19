import { Web3Storage } from 'web3.storage';

const web3storage = process.env.NEXT_PUBLIC_WEB3STORAGE!;

export async function storeFiles(files: any) {
    const client = makeStorageClient();
    const cid = await client.put([files]);
    return cid
}

function makeStorageClient() {
    return new Web3Storage({ token: web3storage })
}
