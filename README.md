# HashiraSwap 🗲

A professional decentralized exchange (DEX) built on Uniswap V2 with Next.js 15, featuring institutional-grade UI and seamless Web3 integration.

## 🌟 Features

- **🚀 Modern Architecture**: Next.js 15 with App Router and `src/` directory structure
- **💼 Professional UI**: Satoshi font family with glassmorphism design
- **🔗 Web3 Integration**: MetaMask wallet connection with auto-reconnection
- **🔄 Token Swapping**: Real-time quotes via Uniswap V2 with slippage protection
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance Optimized**: Fast loading with optimized bundle size

## 🛠️ Tech Stack

| Category         | Technology                              |
| ---------------- | --------------------------------------- |
| **Frontend**     | Next.js 15, React 19, TypeScript        |
| **Styling**      | Tailwind CSS, Custom CSS                |
| **Web3**         | Ethers.js v5, MetaMask                  |
| **Blockchain**   | Ethereum Mainnet, Hardhat (development) |
| **DEX Protocol** | Uniswap V2                              |

## 📦 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/hashiraswap.git
   cd hashiraswap
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Setup](#-environment-setup))

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# Alchemy API (Required for mainnet forking)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here

# Commission Settings (Optional - for fee collection)
NEXT_PUBLIC_COMMISSION_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_COMMISSION_RATE=0.0001

# Development Settings (Optional)
NEXT_PUBLIC_NETWORK=mainnet
```

### How to Get API Keys

#### 1. Alchemy API Key (Recommended)

1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up for a free account
3. Create a new app
4. Select "Ethereum" → "Mainnet"
5. Copy your API key

### Environment File Example

```env
# .env.local
NEXT_PUBLIC_ALCHEMY_API_KEY=alch_1234567890abcdef1234567890abcdef
NEXT_PUBLIC_COMMISSION_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_COMMISSION_RATE=0.0001
```

## 🧪 Testing & Development

### Option 1: Hardhat Local Fork (Recommended for Testing)

This method creates a local blockchain fork with real mainnet data and gives you test ETH.

1. **Start Hardhat fork**

   ```bash
   npm run fork
   ```

   This starts a local blockchain at `http://localhost:8545` with 10,000 ETH in test accounts.

2. **In a new terminal, start the app**

   ```bash
   npm run dev
   ```

3. **Configure MetaMask for local testing**

   **Method 1: Manual Network Addition**

   - Network Name: `Ethereum Mainnet (Fork)`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1` (Important: Use 1, not 31337 for forked mainnet)
   - Currency Symbol: `ETH`
   - Block Explorer URL: `https://etherscan.io` (optional)


4. **Import a test account**
   Use one of these pre-funded private keys:

   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

5. **Run both fork and dev server together**
   ```bash
   npm run fork:dev
   ```

### Option 2: Testnet (Sepolia)

1. **Get Sepolia ETH**

   - [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - [Chainlink Sepolia Faucet](https://faucets.chain.link/sepolia)

2. **Switch to Sepolia in MetaMask**
   - Network: Sepolia Test Network
   - You'll need to modify the app to support Sepolia (currently mainnet only)

### Option 3: Mainnet (Real Trading)

⚠️ **Warning**: This uses real ETH and tokens. Only use small amounts for testing.

1. **Get ETH**

   - Buy from exchanges (Coinbase, Binance, etc.)
   - Bridge from other networks

2. **Connect MetaMask to Ethereum Mainnet**

## 🏗️ Project Structure

```
hashiraswap/
├── src/                          # Source code (Next.js 13+ convention)
│   ├── app/                      # App Router pages
│   │   ├── layout.jsx           # Root layout with Satoshi font
│   │   ├── page.jsx             # Home page with integrated header
│   │   ├── loading.jsx          # Loading UI
│   │   └── error.jsx            # Error boundary
│   ├── components/              # React components
│   │   ├── SwapCard.jsx         # Main trading interface
│   │   ├── WalletConnect.jsx    # Wallet connection UI
│   │   ├── TokenModal.jsx       # Token selection modal
│   │   └── index.js             # Component exports
│   └── context/                 # React contexts
│       └── Web3Context.jsx      # Web3 state management
├── constants/                   # Blockchain constants
│   ├── abis.js                 # Smart contract ABIs
│   └── addresses.js            # Contract and token addresses
├── styles/                     # Styling
│   └── globals.css             # Global styles with Satoshi font
├── public/                     # Static assets
│   ├── fonts/                  # Satoshi font files
│   └── tokens/                 # Token icons
├── hardhat.config.js           # Hardhat configuration
└── package.json               # Dependencies and scripts
```

## 🎯 Available Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start development server         |
| `npm run build`    | Build for production             |
| `npm run start`    | Start production server          |
| `npm run lint`     | Run ESLint                       |
| `npm run fork`     | Start Hardhat mainnet fork       |
| `npm run fork:dev` | Run fork and dev server together |

## 🪙 Supported Tokens

### Stablecoins

- **USDT** - Tether USD
- **USDC** - USD Coin
- **DAI** - Dai Stablecoin
- **BUSD** - Binance USD

### DeFi Tokens

- **UNI** - Uniswap
- **AAVE** - Aave
- **LINK** - Chainlink
- **COMP** - Compound
- **CRV** - Curve DAO

### Layer 2 & Scaling

- **MATIC** - Polygon
- **ARB** - Arbitrum
- **OP** - Optimism

### Gaming & NFT

- **SAND** - The Sandbox
- **MANA** - Decentraland

## 🔐 Security Features

- ✅ No private keys stored
- ✅ Client-side wallet connection only
- ✅ Verified Uniswap V2 contract addresses
- ✅ Slippage protection (0.5% default)
- ✅ Transaction deadline limits (20 minutes)
- ✅ Input validation and sanitization
- ✅ Network verification (Ethereum Mainnet only)

## 🚨 Troubleshooting

### Common Issues

**1. "Please install MetaMask" error**

- Install [MetaMask browser extension](https://metamask.io/)
- Refresh the page after installation

**2. "Wrong Network" warning**

- Switch MetaMask to Ethereum Mainnet
- Or use Hardhat fork for testing

**3. "Could not fetch chain ID" error when adding network**

- Try `http://localhost:8545` instead of `http://127.0.0.1:8545`
- Ensure Hardhat fork is running: `npm run fork`
- Some firewalls block 127.0.0.1, try localhost instead
- Clear MetaMask cache: Settings → Advanced → Reset Account

**4. "Insufficient ETH balance" error**

- For testing: Use Hardhat fork with pre-funded accounts
- For mainnet: Ensure you have enough ETH for gas + swap amount

**5. Transaction fails**

- Check gas price isn't too high (>100 gwei)
- Ensure sufficient token balance
- Try increasing slippage tolerance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add TypeScript types where applicable
- Test with Hardhat fork before mainnet
- Update documentation for new features
- Ensure responsive design works on mobile

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Uniswap](https://uniswap.org/) for the DEX protocol
- [Next.js](https://nextjs.org/) for the amazing framework
- [Ethers.js](https://ethers.org/) for Web3 integration
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Satoshi Font](https://www.fontshare.com/fonts/satoshi) for typography

**Built with ❤️ for the DeFi community**

_HashiraSwap - Professional DeFi Trading Platform_
