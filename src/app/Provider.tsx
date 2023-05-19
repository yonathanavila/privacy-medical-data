"use client"
// import next/dynamic to load components dynamically
import dynamic from 'next/dynamic';
import store from '~/root/utils/store';
import { Provider } from 'react-redux';

function Providers({ children }: any) {
    const chainId: any = process.env.NEXT_PUBLIC_MAINNET_TESTNET === "mainnet" ? 0 : 0;

    return (
        <>
            <Provider store={store}>
                {children}
            </Provider>
        </ >
    )
}

// dynamic export to avoid SSR
export default dynamic(() => Promise.resolve(Providers), {
    ssr: false,
});


