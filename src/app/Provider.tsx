"use client"
// import next/dynamic to load components dynamically
import dynamic from 'next/dynamic';
import store from '~/root/utils/store';
import { Provider } from 'react-redux';

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Toaster } from 'react-hot-toast';

import { chainSelected } from '~/root/utils/functions/chain';
import { wagmiClient } from '~/root/utils/functions/client';
import { chains } from '~/root/utils/functions/provider';


function Providers({ children }: any) {
    const chainId: any = process.env.NEXT_PUBLIC_MAINNET_TESTNET === "mainnet" ? 0 : 0;

    return (
        <>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider
                    chains={chains}
                    initialChain={chainSelected[Number(chainId || 0)]}
                    theme={midnightTheme()}
                >
                    <Provider store={store}>
                        {children}
                    </Provider>
                    <Toaster
                        toastOptions={{
                            className: 'bg-black-800 text-white font-bold border border-gray-700 rounded-md',
                        }}
                    />
                </RainbowKitProvider>
            </WagmiConfig>

        </ >
    )
}

// dynamic export to avoid SSR
export default dynamic(() => Promise.resolve(Providers), {
    ssr: false,
});


