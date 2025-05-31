"use client";

import { useWeb3 } from "../context/Web3Context";
import WalletConnect from "../components/WalletConnect";
import SwapCard from "../components/SwapCard";

export default function HomePage() {
  const { account, provider, signer, uniswapRouter, network } = useWeb3();

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Animated background mesh */}
      <div className="fixed inset-0 bg-mesh-gradient opacity-30 animate-float"></div>

      {/* Gradient overlays */}
      <div className="fixed inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 sticky top-0 backdrop-blur-xl bg-dark-bg-secondary/80 border-b border-dark-border shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center shadow-glow">
                <svg
                  className="w-6 h-6 text-white"
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
              <div>
                <h1 className="text-xl font-bold text-dark-text tracking-tight">
                  HashiraSwap
                </h1>
                <div className="text-xs text-dark-text-muted font-medium">
                  Professional DeFi Trading
                </div>
              </div>
            </div>

            {/* Center Badge */}
            <div className="hidden md:flex items-center">
              <div className="px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
                <span className="text-sm font-medium text-brand-primary">
                  Decentralized Exchange
                </span>
              </div>
            </div>

            {/* Network Status */}
            {network && (
              <div className="hidden sm:flex items-center px-3 py-2 bg-status-success-bg rounded-lg border border-status-success/30">
                <div className="w-2 h-2 bg-status-success rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium text-status-success">
                  {network.name || "Connected"}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
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
    </div>
  );
}
