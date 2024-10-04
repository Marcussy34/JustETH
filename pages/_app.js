import { useState } from 'react';
import { ThirdwebProvider, useAddress } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        activeChain="ethereum"
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        queryClient={queryClient}
      >
        <WalletWrapper Component={Component} pageProps={pageProps} />
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

function WalletWrapper({ Component, pageProps }) {
  const address = useAddress();

  return (
    <>
      <Navbar isWalletConnected={!!address} />
      <Component {...pageProps} isWalletConnected={!!address} />
    </>
  );
}

export default MyApp;