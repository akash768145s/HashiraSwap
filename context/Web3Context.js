"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { UNISWAP_ROUTER_ABI } from "../constants/abis";
import { UNISWAP_ADDRESSES } from "../constants/addresses";

// Create a React context for Web3 functionality
const Web3Context = createContext();

export function Web3Provider({ children }) {
  // State management for Web3-related data
  const [account, setAccount] = useState(""); // Current connected wallet address
  const [provider, setProvider] = useState(null); // Ethers.js provider instance
  const [signer, setSigner] = useState(null); // Signer for transaction signing
  const [uniswapRouter, setUniswapRouter] = useState(null); // Uniswap contract instance
  const [network, setNetwork] = useState(null); // Current network information
  const [isConnecting, setIsConnecting] = useState(false); // Connection loading state

  // Function to connect user's wallet (MetaMask)
  const connectWallet = async () => {
    try {
      setIsConnecting(true);

      // Check if we're in the browser environment
      if (typeof window === "undefined" || !window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Request user's wallet connection
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Initialize ethers.js provider and signer (compatible with ethers v5)
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      const networkInfo = await web3Provider.getNetwork();

      // Initialize Uniswap Router contract with ABI and signer
      const router = new ethers.Contract(
        UNISWAP_ADDRESSES.V2_ROUTER,
        UNISWAP_ROUTER_ABI,
        web3Signer
      );

      // Update state with Web3 information
      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setUniswapRouter(router);
      setNetwork(networkInfo);

      // Set up event listeners for wallet changes
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      setAccount("");
      setProvider(null);
      setSigner(null);
      setUniswapRouter(null);
      setNetwork(null);
    } else {
      setAccount(accounts[0]); // Update account when user switches wallets
    }
  };

  // Handle network changes
  const handleChainChanged = (chainId) => {
    window.location.reload(); // Reload page on network change
  };

  // Cleanup event listeners when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  // Auto-connect if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  // Context value that will be available to all children components
  const value = {
    account, // Current wallet address
    provider, // Ethers provider for blockchain interaction
    signer, // Signer for transaction signing
    uniswapRouter, // Uniswap contract instance for swaps
    network, // Current network information
    isConnecting, // Connection loading state
    connectWallet, // Function to connect wallet
  };

  // Provide Web3 context to all children components
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

// Custom hook to easily access Web3 context in any component
export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}
