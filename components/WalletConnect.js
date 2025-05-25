"use client";

import { useWeb3 } from "../context/Web3Context";

export default function WalletConnect() {
  const { account, connectWallet, isConnecting, network } = useWeb3();

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="text-center">
        {account ? (
          <div>
            <p className="text-green-400 mb-4 flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Wallet Connected
            </p>

            <div className="bg-black/20 rounded-lg p-3 mb-4">
              <p className="text-white text-sm break-all font-mono">
                {account}
              </p>
            </div>

            {network && (
              <div className="text-sm text-gray-300">
                <p>Network: {network.name}</p>
                <p>Chain ID: {network.chainId}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
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

              <h3 className="text-xl font-semibold text-white mb-2">
                Connect Your Wallet
              </h3>
              <p className="text-gray-300 text-sm">
                Connect your wallet to start trading on HashiraSwap
              </p>
            </div>

            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h4c.256 0 .512.098.707.293l2 2a1 1 0 001.414 0l2-2A.997.997 0 0116 2h1a3 3 0 013 3v5c0 .256-.098.512-.293.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Connect Wallet
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 mt-3">
              Make sure you have MetaMask installed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
