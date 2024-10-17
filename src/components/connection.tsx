import * as React from 'react';
import { createContext, useContext, useMemo, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider, useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletContextState } from '@solana/wallet-adapter-react';


// Define the props type for the provider
interface WalletContextProviderProps {
    children: ReactNode;
}

// Create the context with the correct type
const WalletContext = createContext<WalletContextState | null>(null);

export const CustomWalletMultiButton = () => {
    const wallet = useSolanaWallet();
 
    
    // Conditionally render button text based on connection state
    const Buttontext = wallet.connected ? null : 'Phantom';

    return (
        <WalletMultiButton style={connectNavBarStyles}>
            {Buttontext}
        </WalletMultiButton>
    );
};

// Button styles
const connectNavBarStyles: React.CSSProperties = {
    backgroundColor: 'transparent', // Bootstrap 'primary' color
    color: 'black',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '30px',
};

const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
    ], [network]);

    const wallet = useSolanaWallet();

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletContext.Provider value={wallet}>
                        {children}
                    </WalletContext.Provider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === null) {
        throw new Error('useWallet must be used within a WalletContextProvider');
    }
    return context;
};

export default WalletContextProvider;