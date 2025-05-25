# Constants

This folder contains essential blockchain constants including contract addresses and ABIs (Application Binary Interfaces) needed for Web3 interactions.

## Files Overview

- **`abis.js`** - Smart contract ABIs for blockchain interaction
- **`addresses.js`** - Contract addresses and token definitions

---

## 📋 abis.js

Contains ABIs for interacting with smart contracts on Ethereum.

### Available ABIs

#### UNISWAP_ROUTER_ABI

Complete ABI for Uniswap V2 Router contract functionality:

**Read Functions:**

- `getAmountsOut()` - Get estimated output amounts for a swap
- `getAmountsIn()` - Get required input amounts for desired output
- `WETH()` - Get WETH contract address

**Write Functions:**

- `swapExactETHForTokens()` - Swap ETH for tokens
- `swapExactTokensForETH()` - Swap tokens for ETH
- `swapExactTokensForTokens()` - Swap one token for another

#### ERC20_ABI

Standard ERC-20 token contract interface:

**Read Functions:**

- `balanceOf()` - Get token balance of an address
- `decimals()` - Get token decimal places
- `symbol()` - Get token symbol
- `allowance()` - Check spending allowance

**Write Functions:**

- `approve()` - Approve spending allowance

**Events:**

- `Transfer` - Token transfer events
- `Approval` - Allowance approval events

### Usage Example

```javascript
import { UNISWAP_ROUTER_ABI, ERC20_ABI } from "./constants/abis";
import { ethers } from "ethers";

// Initialize contracts
const router = new ethers.Contract(routerAddress, UNISWAP_ROUTER_ABI, signer);
const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
```

---

## 📍 addresses.js

Contains contract addresses and token definitions for Ethereum mainnet.

### Uniswap Contracts

```javascript
UNISWAP_ADDRESSES = {
  V2_ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Main router for swaps
  FACTORY: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // Creates token pairs
};
```

### Token Categories

#### 🌐 Native Wrapped

- **WETH** - Wrapped Ethereum (ERC-20 version of ETH)

#### 💵 Stablecoins

- **USDT** - Tether USD (6 decimals)
- **USDC** - USD Coin (6 decimals)
- **DAI** - Dai Stablecoin (18 decimals)
- **BUSD** - Binance USD (18 decimals)

#### 🔗 DeFi Tokens

- **UNI** - Uniswap governance token
- **AAVE** - Aave lending protocol token
- **LINK** - Chainlink oracle token
- **CRV** - Curve DAO token
- **COMP** - Compound lending token

#### ⚡ Layer 2 Tokens

- **MATIC** - Polygon scaling solution
- **ARB** - Arbitrum L2 token
- **OP** - Optimism L2 token

#### 🎮 Gaming & Metaverse

- **SAND** - The Sandbox metaverse
- **MANA** - Decentraland virtual world

#### 🐶 Meme Tokens

- **SHIB** - Shiba Inu
- **PEPE** - Pepe meme token

#### 📈 Other Major Tokens

- **MKR** - Maker DAO governance
- **SNX** - Synthetix derivatives
- **GRT** - The Graph indexing
- **LDO** - Lido staking
- **RPL** - Rocket Pool staking
- **FXS** - Frax Share

### Token Object Structure

Each token includes:

```javascript
{
  address: "0x...",     // Contract address
  decimals: 18,         // Number of decimal places
  symbol: "TOKEN",      // Token symbol
  name: "Token Name"    // Full token name
}
```

### Usage Examples

```javascript
import { TOKENS, UNISWAP_ADDRESSES } from "./constants/addresses";

// Get token info
const daiAddress = TOKENS.DAI.address;
const daiDecimals = TOKENS.DAI.decimals;

// Create swap path
const swapPath = [TOKENS.WETH.address, TOKENS.USDC.address];

// Get router address
const routerAddress = UNISWAP_ADDRESSES.V2_ROUTER;
```

### Working with Decimals

Different tokens use different decimal places:

- **18 decimals**: Most tokens (ETH, DAI, UNI, etc.)
- **6 decimals**: USDT, USDC

```javascript
// Convert to Wei for 18 decimal token
const amount = ethers.utils.parseUnits("100", TOKENS.DAI.decimals);

// Convert to Wei for 6 decimal token
const usdcAmount = ethers.utils.parseUnits("100", TOKENS.USDC.decimals);
```

---

## Best Practices

1. **Always use constants** instead of hardcoding addresses
2. **Check decimals** before parsing amounts
3. **Verify addresses** on Etherscan before use
4. **Use mainnet addresses** only for production
5. **Import specific tokens** you need to avoid bloating bundle size

```javascript
// ✅ Good - specific imports
import { TOKENS } from "./constants/addresses";
const { DAI, USDC } = TOKENS;

// ❌ Avoid - hardcoded addresses
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
```

---

## Network Support

Currently configured for:

- **Ethereum Mainnet** (Chain ID: 1)

For other networks, you would need separate constant files or network-specific address mappings.
