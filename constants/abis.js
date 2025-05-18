// constants/abis.js

// 👇 ABI for the Uniswap V2 Router contract
export const UNISWAP_ROUTER_ABI = [
  // 🔍 Read-only view functions (do not cost gas)

  // Returns the estimated output amount of tokens based on input amount and path
  "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",

  // Returns the estimated input amount of tokens needed to get a specific output amount
  "function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts)",

  // 🔁 State-changing functions (cost gas)

  // Swaps exact ETH sent with the transaction for tokens along the specified path
  // - amountOutMin: minimum tokens expected (slippage protection)
  // - path: array of token addresses (e.g., [WETH, DAI])
  // - to: recipient address
  // - deadline: timestamp after which the transaction will fail
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",

  // Swaps exact tokens for ETH
  // Requires prior token approval
  "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",

  // Swaps one token for another token
  // Requires prior token approval
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",

  // 🔗 Utility function

  // Returns the address of the Wrapped ETH (WETH) token
  "function WETH() public view returns (address)",
];

// 👇 ABI for standard ERC-20 token contracts
export const ERC20_ABI = [
  // 🔍 Read-only functions

  // Returns the token balance of a specific address
  "function balanceOf(address account) external view returns (uint256)",

  // Returns how many decimals the token uses (e.g., 18 for ETH, 6 for USDC)
  "function decimals() external view returns (uint8)",

  // Returns the token symbol (e.g., "USDT", "DAI")
  "function symbol() external view returns (string)",

  // Returns the amount a spender is still allowed to withdraw from the owner's account
  "function allowance(address owner, address spender) external view returns (uint256)",

  // 🔁 State-changing functions

  // Allows another address (usually a smart contract) to spend a specific amount of tokens
  "function approve(address spender, uint256 amount) external returns (bool)",

  // 📣 Events (for listening to blockchain changes)

  // Emitted when tokens are transferred between addresses
  "event Transfer(address indexed from, address indexed to, uint256 value)",

  // Emitted when an approval is made (allowing a spender to spend tokens on behalf of the owner)
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];



// “This file defines the ABI (Application Binary Interface) for two main smart contracts: the Uniswap V2 Router and standard ERC-20 tokens.
// It allows me to interact with these contracts from the frontend using Ethers.js, such as swapping tokens, checking balances, or approving spending.
// I use the router ABI to access swap and pricing logic and the ERC20 ABI to handle token-level operations like balance and allowance.”