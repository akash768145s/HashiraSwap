"use client";

import { useWeb3 } from "../context/Web3Context";
import WalletConnect from "./WalletConnect";
import SwapCard from "./SwapCard";

export default function MainContainer() {
  const { account, provider, signer, uniswapRouter, network } = useWeb3();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}

        {/* Main Content */}
        <div className="animate-slide-up">
          {account && provider && signer && uniswapRouter ? (
            <SwapCard
              provider={provider}
              account={account}
              uniswapRouter={uniswapRouter}
              signer={signer}
              network={network}
            />
          ) : (
            <WalletConnect />
          )}
        </div>
      </div>
    </main>
  );
}
