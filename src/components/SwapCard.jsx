// components/SwapCard.js
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { TOKENS, UNISWAP_ADDRESSES } from "../../constants/addresses";
import TokenModal from "./TokenModal";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
];

const COMMISSION_ADDRESS_ADMIN = process.env.NEXT_PUBLIC_COMMISSION_ADDRESS;
const COMMISSION_RATE_PRICE = process.env.NEXT_PUBLIC_COMMISSION_RATE;

export default function SwapCard({
  provider,
  account,
  uniswapRouter,
  signer,
  network,
}) {
  const [tokenInBalance, setTokenInBalance] = useState("0");
  const [tokenOutBalance, setTokenOutBalance] = useState("0");
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTokenIn, setSelectedTokenIn] = useState(TOKENS.WETH);
  const [selectedTokenOut, setSelectedTokenOut] = useState(TOKENS.USDT);

  // Fetch token balances
  const fetchBalances = async () => {
    if (!account || !provider) return;

    try {
      // For token IN
      if (selectedTokenIn.address === TOKENS.WETH.address) {
        const balance = await provider.getBalance(account);
        setTokenInBalance(ethers.utils.formatEther(balance));
      } else {
        const contract = new ethers.Contract(
          selectedTokenIn.address,
          ERC20_ABI,
          provider
        );
        const balance = await contract.balanceOf(account);
        setTokenInBalance(
          ethers.utils.formatUnits(balance, selectedTokenIn.decimals)
        );
      }

      // For token OUT
      const contractOut = new ethers.Contract(
        selectedTokenOut.address,
        ERC20_ABI,
        provider
      );
      const balanceOut = await contractOut.balanceOf(account);
      setTokenOutBalance(
        ethers.utils.formatUnits(balanceOut, selectedTokenOut.decimals)
      );
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  // Get price quote
  const getQuote = async (amountIn) => {
    if (!uniswapRouter || !amountIn || !selectedTokenIn || !selectedTokenOut)
      return;

    // Don't quote if same token
    if (selectedTokenIn.address === selectedTokenOut.address) {
      setOutputAmount("0");
      return;
    }

    // Check if we're on the right network
    if (network && network.chainId !== 1) {
      console.log("Not on Ethereum mainnet, chainId:", network.chainId);
      setOutputAmount("0");
      return;
    }

    try {
      const amountInWei = ethers.utils.parseUnits(
        amountIn.toString(),
        selectedTokenIn.decimals
      );

      // Build path with better routing logic
      let path = [selectedTokenIn.address, selectedTokenOut.address];

      // If neither token is WETH, route through WETH
      if (
        selectedTokenIn.address !== TOKENS.WETH.address &&
        selectedTokenOut.address !== TOKENS.WETH.address
      ) {
        path = [
          selectedTokenIn.address,
          TOKENS.WETH.address,
          selectedTokenOut.address,
        ];
      }

      console.log(
        "Getting quote for path:",
        path.map((addr) => {
          const token = Object.values(TOKENS).find((t) => t.address === addr);
          return token ? token.symbol : addr;
        })
      );

      // Try to get amounts with retry logic
      let amounts;
      try {
        amounts = await uniswapRouter.getAmountsOut(amountInWei, path);
      } catch (error) {
        console.log("Direct path failed, trying alternative routes...");

        // Try alternative paths through major tokens
        const alternativePaths = [
          // Through USDC
          [
            selectedTokenIn.address,
            TOKENS.USDC.address,
            selectedTokenOut.address,
          ],
          // Through USDT
          [
            selectedTokenIn.address,
            TOKENS.USDT.address,
            selectedTokenOut.address,
          ],
          // Through DAI
          [
            selectedTokenIn.address,
            TOKENS.DAI.address,
            selectedTokenOut.address,
          ],
        ];

        for (const altPath of alternativePaths) {
          try {
            console.log(
              "Trying alternative path:",
              altPath.map((addr) => {
                const token = Object.values(TOKENS).find(
                  (t) => t.address === addr
                );
                return token ? token.symbol : addr;
              })
            );
            amounts = await uniswapRouter.getAmountsOut(amountInWei, altPath);
            path = altPath; // Update path if successful
            break;
          } catch (altError) {
            console.log("Alternative path failed:", altError.message);
            continue;
          }
        }

        if (!amounts) {
          throw new Error("No valid trading path found");
        }
      }

      const outputAmountFormatted = ethers.utils.formatUnits(
        amounts[amounts.length - 1],
        selectedTokenOut.decimals
      );

      console.log("Quote successful:", {
        input: `${amountIn} ${selectedTokenIn.symbol}`,
        output: `${outputAmountFormatted} ${selectedTokenOut.symbol}`,
        path: path.map((addr) => {
          const token = Object.values(TOKENS).find((t) => t.address === addr);
          return token ? token.symbol : addr;
        }),
      });

      setOutputAmount(outputAmountFormatted);
    } catch (error) {
      console.error("Error getting quote:", error);
      console.log("Quote failed for:", {
        tokenIn: selectedTokenIn.symbol,
        tokenOut: selectedTokenOut.symbol,
        amount: amountIn,
        error: error.message,
        network: network?.name,
        chainId: network?.chainId,
      });
      setOutputAmount("0");
    }
  };

  // Handle token selection
  const handleTokenSelect = (token) => {
    if (modalType === "in") {
      if (token.address === selectedTokenOut.address) {
        setSelectedTokenOut(selectedTokenIn);
      }
      setSelectedTokenIn(token);
    } else {
      if (token.address === selectedTokenIn.address) {
        setSelectedTokenIn(selectedTokenOut);
      }
      setSelectedTokenOut(token);
    }
    setIsModalOpen(false);
  };

  const COMMISSION_ADDRESS = COMMISSION_ADDRESS_ADMIN;
  const COMMISSION_AMOUNT = ethers.utils.parseEther(
    COMMISSION_RATE_PRICE.toString()
  ); // 0.0001 WETH

  const WETH_ABI = [
    // Basic ERC20 functions
    "function transfer(address to, uint256 value) external returns (bool)",
    "function approve(address spender, uint256 value) external returns (bool)",
    "function balanceOf(address owner) external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    // WETH specific functions
    "function deposit() external payable",
    "function withdraw(uint256 wad) external",
  ];

  const wrapETH = async (amount) => {
    if (!signer || !provider) {
      throw new Error("Wallet not connected");
    }

    try {
      const wethContract = new ethers.Contract(
        TOKENS.WETH.address,
        WETH_ABI,
        signer
      );

      // Convert amount to Wei
      const amountInWei = ethers.utils.parseEther(amount.toString());

      // Check ETH balance
      const ethBalance = await provider.getBalance(account);
      if (ethBalance.lt(amountInWei)) {
        throw new Error("Insufficient ETH balance");
      }

      // Estimate gas
      const gasLimit = await wethContract.estimateGas.deposit({
        value: amountInWei,
      });

      // Get gas price
      const gasPrice = await provider.getGasPrice();

      // Add 20% buffer to gas limit
      const adjustedGasLimit = gasLimit.mul(120).div(100);

      console.log("Wrapping ETH with params:", {
        amount: amount,
        gasLimit: adjustedGasLimit.toString(),
        gasPrice: ethers.utils.formatUnits(gasPrice, "gwei") + " gwei",
      });

      // Execute deposit
      const tx = await wethContract.deposit({
        value: amountInWei,
        gasLimit: adjustedGasLimit,
        gasPrice: gasPrice,
      });

      console.log("Wrap transaction submitted:", tx.hash);
      const receipt = await tx.wait();
      console.log("Wrap transaction confirmed:", receipt);

      return true;
    } catch (error) {
      console.error("Detailed wrap error:", error);
      if (error.reason) {
        throw new Error(`Wrap failed: ${error.reason}`);
      } else if (error.data?.message) {
        throw new Error(`Wrap failed: ${error.data.message}`);
      } else {
        throw new Error(`Wrap failed: ${error.message || "Unknown error"}`);
      }
    }
  };

  const resetConnection = async () => {
    try {
      if (window.ethereum) {
        // Reset the connection
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });

        // Reload provider
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const web3Signer = web3Provider.getSigner();

        return { provider: web3Provider, signer: web3Signer };
      }
    } catch (error) {
      console.error("Reset connection error:", error);
      return null;
    }
  };

  // Updated handleSwap function with better error handling
  const handleSwap = async () => {
    if (!account || !uniswapRouter || !inputAmount || !signer) {
      alert("Please connect your wallet first!");
      return;
    }

    setIsLoading(true);

    try {
      // Check network connection first
      try {
        await provider.getNetwork();
      } catch (error) {
        console.log("Network connection issue, attempting to reconnect...");
        const newConnection = await resetConnection();
        if (!newConnection) {
          throw new Error("Failed to reconnect to network");
        }
        // Update provider and signer
        setProvider(newConnection.provider);
        setSigner(newConnection.signer);
      }

      // Check gas price
      const gasPrice = await provider.getGasPrice();
      const maxGasPrice = ethers.utils.parseUnits("100", "gwei");
      if (gasPrice.gt(maxGasPrice)) {
        throw new Error("Gas price is too high, please try later");
      }

      const amountIn = ethers.utils.parseUnits(
        inputAmount,
        selectedTokenIn.decimals
      );
      const isWethSwap = selectedTokenIn.symbol === "WETH";
      const isEthSwap = selectedTokenIn.address === TOKENS.WETH.address;

      // Add extra validation for transaction parameters
      if (amountIn.lte(0)) {
        throw new Error("Invalid amount");
      }

      // Handle WETH specific operations (commission and wrapping)
      if (isWethSwap) {
        try {
          const wethContract = new ethers.Contract(
            selectedTokenIn.address,
            WETH_ABI,
            signer
          );

          // Verify contract connection
          await wethContract.balanceOf(account);

          const wethBalance = await wethContract.balanceOf(account);
          const totalNeeded = amountIn.add(COMMISSION_AMOUNT);

          if (wethBalance.lt(totalNeeded)) {
            const ethBalance = await provider.getBalance(account);
            if (ethBalance.gt(totalNeeded)) {
              // Wrap ETH with explicit gas parameters
              const tx = await wethContract.deposit({
                value: totalNeeded,
                gasLimit: 100000,
                gasPrice: gasPrice,
              });
              await tx.wait(1); // Wait for 1 confirmation
            } else {
              throw new Error(
                `Insufficient ETH balance. Need ${ethers.utils.formatEther(
                  totalNeeded
                )} ETH`
              );
            }
          }

          // Transfer commission with explicit parameters
          console.log("Transferring commission...");
          const commissionTx = await wethContract.transfer(
            COMMISSION_ADDRESS,
            COMMISSION_AMOUNT,
            {
              gasLimit: 100000,
              gasPrice: gasPrice,
            }
          );
          await commissionTx.wait(1);

          // Approve WETH for Uniswap router
          const allowance = await wethContract.allowance(
            account,
            uniswapRouter.address
          );
          if (allowance.lt(amountIn)) {
            console.log("Approving WETH for Uniswap router...");
            const approveTx = await wethContract.approve(
              uniswapRouter.address,
              ethers.constants.MaxUint256,
              {
                gasLimit: 100000,
                gasPrice: gasPrice,
              }
            );
            await approveTx.wait(1);
          }
        } catch (error) {
          console.error("WETH operation error:", error);
          throw new Error(
            "Failed to process WETH operations. Please try again."
          );
        }
      } else {
        // Handle other ERC-20 token approvals (like USDT, USDC, etc.)
        try {
          const tokenContract = new ethers.Contract(
            selectedTokenIn.address,
            ERC20_ABI,
            signer
          );

          // Check token balance
          const tokenBalance = await tokenContract.balanceOf(account);
          if (tokenBalance.lt(amountIn)) {
            throw new Error(
              `Insufficient ${
                selectedTokenIn.symbol
              } balance. You have ${ethers.utils.formatUnits(
                tokenBalance,
                selectedTokenIn.decimals
              )} ${selectedTokenIn.symbol}`
            );
          }

          // Check and approve token for Uniswap router
          const allowance = await tokenContract.allowance(
            account,
            uniswapRouter.address
          );

          if (allowance.lt(amountIn)) {
            console.log(
              `Approving ${selectedTokenIn.symbol} for Uniswap router...`
            );
            const approveTx = await tokenContract.approve(
              uniswapRouter.address,
              ethers.constants.MaxUint256,
              {
                gasLimit: 100000,
                gasPrice: gasPrice,
              }
            );
            await approveTx.wait(1);
            console.log(`${selectedTokenIn.symbol} approved successfully`);
          }
        } catch (error) {
          console.error(`${selectedTokenIn.symbol} operation error:`, error);
          throw new Error(
            `Failed to process ${selectedTokenIn.symbol} operations. Please try again.`
          );
        }
      }

      // Setup swap parameters with improved routing
      let path = [selectedTokenIn.address, selectedTokenOut.address];

      // If neither token is WETH, route through WETH
      if (
        selectedTokenIn.address !== TOKENS.WETH.address &&
        selectedTokenOut.address !== TOKENS.WETH.address
      ) {
        path = [
          selectedTokenIn.address,
          TOKENS.WETH.address,
          selectedTokenOut.address,
        ];
      }

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      // Get amounts with retry logic and alternative paths
      let amounts;
      try {
        amounts = await uniswapRouter.getAmountsOut(amountIn, path);
      } catch (error) {
        console.log("Direct path failed in swap, trying alternative routes...");

        // Try alternative paths through major tokens
        const alternativePaths = [
          // Through USDC
          [
            selectedTokenIn.address,
            TOKENS.USDC.address,
            selectedTokenOut.address,
          ],
          // Through USDT
          [
            selectedTokenIn.address,
            TOKENS.USDT.address,
            selectedTokenOut.address,
          ],
          // Through DAI
          [
            selectedTokenIn.address,
            TOKENS.DAI.address,
            selectedTokenOut.address,
          ],
        ];

        for (const altPath of alternativePaths) {
          try {
            console.log(
              "Trying alternative swap path:",
              altPath.map((addr) => {
                const token = Object.values(TOKENS).find(
                  (t) => t.address === addr
                );
                return token ? token.symbol : addr;
              })
            );
            amounts = await uniswapRouter.getAmountsOut(amountIn, altPath);
            path = altPath; // Update path if successful
            break;
          } catch (altError) {
            console.log("Alternative swap path failed:", altError.message);
            continue;
          }
        }

        if (!amounts) {
          throw new Error("No valid trading path found for swap");
        }
      }

      const minOutput = amounts[amounts.length - 1].mul(995).div(1000); // 0.5% slippage

      console.log("Swap parameters:", {
        amountIn: ethers.utils.formatUnits(amountIn, selectedTokenIn.decimals),
        expectedOutput: ethers.utils.formatUnits(
          amounts[amounts.length - 1],
          selectedTokenOut.decimals
        ),
        minOutput: ethers.utils.formatUnits(
          minOutput,
          selectedTokenOut.decimals
        ),
        path: path,
        deadline: new Date(deadline * 1000).toISOString(),
      });

      // Execute swap with explicit parameters
      const swapTx = await uniswapRouter.swapExactTokensForTokens(
        amountIn,
        minOutput,
        path,
        account,
        deadline,
        {
          gasLimit: 300000,
          gasPrice: gasPrice,
          nonce: await provider.getTransactionCount(account),
        }
      );

      console.log("Waiting for swap confirmation...");
      await swapTx.wait(1);

      // Success handling
      const successMessage = document.createElement("div");
      successMessage.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      successMessage.textContent = isWethSwap
        ? "Swap successful! Commission charged."
        : `Swap successful! ${selectedTokenIn.symbol} → ${selectedTokenOut.symbol}`;
      document.body.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 5000);

      // Reset form
      setInputAmount("");
      setOutputAmount("0");
      await fetchBalances();
    } catch (error) {
      console.error("Detailed swap error:", error);
      let errorMessage = "Swap failed: ";

      if (error.code === -32603) {
        errorMessage += "Network error. Please try again.";
        // Attempt to reset connection
        await resetConnection();
      } else if (error.message.includes("insufficient")) {
        errorMessage += error.message;
      } else if (error.data?.message) {
        errorMessage += error.data.message;
      } else if (error.reason) {
        errorMessage += error.reason;
      } else {
        errorMessage += error.message || "Unknown error occurred";
      }

      const errorElement = document.createElement("div");
      errorElement.className =
        "fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      errorElement.textContent = errorMessage;
      document.body.appendChild(errorElement);
      setTimeout(() => errorElement.remove(), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      fetchBalances();
    }
  }, [account, selectedTokenIn, selectedTokenOut]);

  useEffect(() => {
    if (
      inputAmount &&
      inputAmount.trim() !== "" &&
      !isNaN(parseFloat(inputAmount)) &&
      parseFloat(inputAmount) > 0
    ) {
      getQuote(inputAmount);
    } else {
      setOutputAmount("0");
    }
  }, [inputAmount, selectedTokenIn, selectedTokenOut]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Swap Card */}
      <div className="bg-dark-bg-elevated/90 backdrop-blur-xl rounded-2xl border border-dark-border shadow-elevated overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-text">Swap Tokens</h2>
          </div>

          {/* Network Warning */}
          {network && network.chainId !== 1 && (
            <div className="mb-6 p-4 bg-status-warning-bg border border-status-warning/30 rounded-xl">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-status-warning mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="font-semibold text-status-warning">
                  Wrong Network
                </span>
              </div>
              <p className="text-sm text-status-warning mb-3">
                You&apos;re connected to{" "}
                <span className="font-mono">
                  {network.name || `Chain ID ${network.chainId}`}
                </span>
                . HashiraSwap only works on Ethereum Mainnet.
              </p>
              <button
                onClick={async () => {
                  try {
                    await window.ethereum.request({
                      method: "wallet_switchEthereumChain",
                      params: [{ chainId: "0x1" }], // Ethereum mainnet
                    });
                  } catch (error) {
                    console.error("Failed to switch network:", error);
                  }
                }}
                className="bg-status-warning text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-status-warning/90 transition-colors"
              >
                Switch to Ethereum Mainnet
              </button>
            </div>
          )}

          {/* From Token Section */}
          <div className="space-y-4">
            <div className="bg-dark-surface rounded-xl p-4 border border-dark-border-light">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-dark-text-muted">
                  From
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-dark-text-muted">
                    Balance: {parseFloat(tokenInBalance).toFixed(4)}
                  </span>
                  {parseFloat(tokenInBalance) > 0 && (
                    <button
                      onClick={() => setInputAmount(tokenInBalance)}
                      className="text-xs font-medium bg-brand-primary text-white px-2 py-1 rounded-md hover:bg-brand-primary-dark transition-colors"
                    >
                      MAX
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full text-3xl font-bold bg-transparent text-dark-text placeholder-dark-text-muted focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setModalType("in");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center space-x-2 bg-dark-bg-tertiary border border-dark-border-light rounded-xl px-4 py-3 hover:bg-dark-surface transition-colors shadow-card"
                >
                  <img
                    src={`/tokens/${selectedTokenIn.symbol.toLowerCase()}.svg`}
                    alt={selectedTokenIn.symbol}
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      e.target.src = "/tokens/hashira.jpg";
                      e.target.onerror = null;
                    }}
                  />
                  <span className="font-semibold text-dark-text">
                    {selectedTokenIn.symbol}
                  </span>
                  <svg
                    className="w-4 h-4 text-dark-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Swap Direction Button */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSelectedTokenIn(selectedTokenOut);
                  setSelectedTokenOut(selectedTokenIn);
                  setInputAmount("");
                  setOutputAmount("0");
                }}
                className="p-3 bg-dark-surface border border-dark-border-light rounded-xl hover:bg-dark-surface-hover transition-colors group shadow-card"
              >
                <svg
                  className="w-5 h-5 text-dark-text-muted group-hover:text-brand-primary transform group-hover:rotate-180 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To Token Section */}
            <div className="bg-dark-surface rounded-xl p-4 border border-dark-border-light">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-dark-text-muted">
                  To
                </span>
                <span className="text-sm text-dark-text-muted">
                  Balance: {parseFloat(tokenOutBalance).toFixed(4)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={outputAmount}
                    readOnly
                    placeholder="0.0"
                    className="w-full text-3xl font-bold bg-transparent text-dark-text placeholder-dark-text-muted focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setModalType("out");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center space-x-2 bg-dark-bg-tertiary border border-dark-border-light rounded-xl px-4 py-3 hover:bg-dark-surface transition-colors shadow-card"
                >
                  <img
                    src={`/tokens/${selectedTokenOut.symbol.toLowerCase()}.svg`}
                    alt={selectedTokenOut.symbol}
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      e.target.src = "/tokens/hashira.jpg";
                      e.target.onerror = null;
                    }}
                  />
                  <span className="font-semibold text-dark-text">
                    {selectedTokenOut.symbol}
                  </span>
                  <svg
                    className="w-4 h-4 text-dark-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Price Info */}
          {inputAmount && outputAmount !== "0" && (
            <div className="mt-6 p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/20">
              <div className="flex justify-between items-center text-sm">
                <span className="text-dark-text-muted">Exchange Rate</span>
                <span className="font-semibold text-brand-primary">
                  1 {selectedTokenIn.symbol} ={" "}
                  {(parseFloat(outputAmount) / parseFloat(inputAmount)).toFixed(
                    6
                  )}{" "}
                  {selectedTokenOut.symbol}
                </span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={
              isLoading ||
              !inputAmount ||
              outputAmount === "0" ||
              selectedTokenIn.address === selectedTokenOut.address ||
              (network && network.chainId !== 1)
            }
            className={`w-full mt-6 py-4 rounded-xl text-lg font-bold transition-all duration-200 ${
              isLoading ||
              !inputAmount ||
              outputAmount === "0" ||
              selectedTokenIn.address === selectedTokenOut.address ||
              (network && network.chainId !== 1)
                ? "bg-dark-surface text-dark-text-disabled cursor-not-allowed"
                : "bg-brand-gradient hover:opacity-90 text-white shadow-glow hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Processing...
              </div>
            ) : !inputAmount ? (
              "Enter Amount"
            ) : network && network.chainId !== 1 ? (
              "Switch to Ethereum Mainnet"
            ) : selectedTokenIn.address === selectedTokenOut.address ? (
              "Select Different Tokens"
            ) : outputAmount === "0" ? (
              "No Liquidity Available"
            ) : (
              `Swap ${selectedTokenIn.symbol} → ${selectedTokenOut.symbol}`
            )}
          </button>
        </div>
      </div>

      {/* Token Selection Modal */}
      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleTokenSelect}
        excludeToken={modalType === "in" ? selectedTokenOut : selectedTokenIn}
      />
    </div>
  );
}
