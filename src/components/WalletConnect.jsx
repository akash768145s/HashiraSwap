"use client";

import { useWeb3 } from "../context/Web3Context";

export default function WalletConnect() {
  const { connectWallet, isConnecting, error } = useWeb3();

  return (
    <div className="bg-dark-bg-elevated/90 backdrop-blur-xl rounded-2xl border border-dark-border shadow-elevated overflow-hidden">
      <div className="p-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-glow">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-dark-text mb-4">
          Connect Wallet
        </h2>
        <p className="text-lg text-dark-text-secondary mb-8 max-w-sm mx-auto leading-relaxed">
          Securely connect your digital wallet to access institutional-grade
          trading features.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-status-error-bg border border-status-error/30 rounded-xl">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-status-error mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-status-error font-medium">
                {error}
              </span>
            </div>
          </div>
        )}

        {/* Connect Button */}
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full max-w-xs mx-auto bg-brand-gradient hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-glow hover:shadow-lg transform hover:-translate-y-0.5 text-lg"
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Connecting...
            </div>
          ) : (
            "Connect MetaMask"
          )}
        </button>

        {/* Info */}
        <div className="mt-8 pt-6 border-t border-dark-border">
          <p className="text-xs text-dark-text-muted mb-4">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>

          {/* Supported Wallets */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center space-x-2 text-dark-text-muted text-sm">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-card">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.08 12c0-5.52-4.48-10-10-10S2.08 6.48 2.08 12s4.48 10 10 10 10-4.48 10-10zM8.87 8.93c.19-.19.19-.51 0-.7-.19-.19-.51-.19-.7 0l-2.83 2.83c-.19.19-.19.51 0 .7l2.83 2.83c.19.19.51.19.7 0 .19-.19.19-.51 0-.7L6.34 12l2.53-2.53c.19-.19.19-.51 0-.7zm6.26 0c.19-.19.19-.51 0-.7-.19-.19-.51-.19-.7 0l-2.83 2.83c-.19.19-.19.51 0 .7l2.83 2.83c.19.19.51.19.7 0 .19-.19.19-.51 0-.7L12.6 12l2.53-2.53c.19-.19.19-.51 0-.7z" />
                </svg>
              </div>
              <span className="font-medium">MetaMask</span>
            </div>
            <div className="flex items-center space-x-2 text-dark-text-muted text-sm">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-card">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="font-medium">WalletConnect</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
