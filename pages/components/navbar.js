import React from 'react';
import dynamic from 'next/dynamic';
const WalletModalProvider = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider), { ssr: false });
const WalletDisconnectButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletDisconnectButton), { ssr: false });
const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });


function NavBar() {
  return (
    <nav className="w-full max-w-screen-lg mx-auto px-4 py-2 md:py-4 flex items-center justify-between bg-opacity-40 backdrop-filter backdrop-blur-md rounded-t-lg sticky top-0">
      <div className="mx-auto max-w-md">
        <div className="text-gray-100 flex items-center justify-start space-x-4">
          <a href="#" className="font-bold ">Menu 1</a>
          <a href="#" className="font-bold">Menu 2</a>
          <a href="#" className="font-bold">Menu 3</a>
          <a href="#" className="font-bold">Menu 4</a>
        </div>
      </div>
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>
    </nav>
  );
}

export default NavBar;
