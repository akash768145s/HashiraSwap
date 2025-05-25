"use client";

import { useWeb3 } from "../context/Web3Context";
import WalletConnect from "./WalletConnect";
import SwapCard from "./SwapCard";

export default function MainContainer() {
  const { account, provider, signer, uniswapRouter, network } = useWeb3();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Trade Tokens Instantly
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Swap tokens seamlessly on the decentralized exchange powered by
          Uniswap V2
        </p>
      </div>

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

      <div className="text-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Fast Swaps</h3>
            <p className="text-gray-400 text-sm">
              Execute token swaps instantly with minimal slippage
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-400"
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
            </div>
            <h3 className="text-white font-semibold mb-2">Secure</h3>
            <p className="text-gray-400 text-sm">
              Your funds are safe with non-custodial trading
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Low Fees</h3>
            <p className="text-gray-400 text-sm">
              Competitive fees powered by Uniswap V2
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-400 text-sm">
            Powered by Uniswap V2 • Built with Next.js 15
          </p>
        </div>
      </div>
    </div>
  );
}
