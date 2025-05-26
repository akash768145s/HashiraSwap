"use client";

import { useWeb3 } from "../context/Web3Context";

export default function Header() {
  const { account, connectWallet, isConnecting, network } = useWeb3();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-bg-secondary/80 border-b border-dark-border shadow-elevated">
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
                Professional DeFi
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-lg border border-brand-primary/20 transition-all hover:bg-brand-primary/20"
            >
              Swap
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-dark-text-secondary hover:text-dark-text rounded-lg hover:bg-dark-surface transition-all"
            >
              Pool
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-dark-text-secondary hover:text-dark-text rounded-lg hover:bg-dark-surface transition-all"
            >
              Analytics
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            {network && (
              <div className="hidden sm:flex items-center px-3 py-2 bg-status-success-bg rounded-lg border border-status-success/30">
                <div className="w-2 h-2 bg-status-success rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium text-status-success">
                  {network.name || "Connected"}
                </span>
              </div>
            )}

            {account ? (
              <div className="flex items-center space-x-2">
                <div className="bg-dark-surface rounded-lg px-4 py-2 border border-dark-border-light shadow-card">
                  <span className="text-sm font-mono text-dark-text">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                </div>
                <div className="w-10 h-10 bg-status-success rounded-lg flex items-center justify-center shadow-glow-success">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-brand-gradient hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 text-sm shadow-glow hover:shadow-lg transform hover:-translate-y-0.5 animate-pulse-glow"
              >
                {isConnecting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Connecting...
                  </div>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
