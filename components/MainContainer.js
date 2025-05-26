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

        {/* Security Notice */}
        <div className="mt-12 p-4 bg-dark-surface/50 border border-dark-border rounded-xl text-center">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-5 h-5 text-status-success mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm font-medium text-status-success">
              Audited & Secure
            </span>
          </div>
          <p className="text-xs text-dark-text-muted">
            Smart contracts audited by leading security firms. Your funds never
            leave your wallet.
          </p>
        </div>
      </div>
    </main>
  );
}
