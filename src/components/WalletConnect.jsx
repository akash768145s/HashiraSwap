"use client";

import { useWeb3 } from "../context/Web3Context";

export default function WalletConnect() {
  const { connectWallet, isConnecting, error } = useWeb3();

  return (
    <div className="bg-dark-bg-elevated/90 backdrop-blur-xl rounded-2xl border border-dark-border shadow-elevated overflow-hidden">
      <div className="p-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <img
            src="/metamask.png"
            alt="MetaMask"
            className="w-full h-full object-contain"
          />
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-card overflow-hidden">
                <img
                  src="/metamask.png"
                  alt="MetaMask"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-medium">MetaMask</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
