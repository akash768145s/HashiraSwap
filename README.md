# HashiraSwap

A modern decentralized exchange (DEX) built on Uniswap V2 with Next.js 15 and the App Router.

## 🚀 Features

- **Next.js 15** with App Router for optimal performance
- **Web3 Integration** with MetaMask wallet connection
- **Uniswap V2** integration for token swapping
- **Modern UI** with Tailwind CSS and glassmorphism design
- **TypeScript Ready** for type safety
- **Responsive Design** for mobile and desktop

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Web3**: Ethers.js v5
- **Blockchain**: Ethereum Mainnet
- **DEX Protocol**: Uniswap V2

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/hashiraswap.git
   cd hashiraswap
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
hashiraswap/
├── app/                    # Next.js 15 App Router
│   ├── layout.js          # Root layout component
│   ├── page.js            # Home page
│   ├── loading.js         # Loading UI
│   └── error.js           # Error UI
├── components/            # Reusable React components
├── constants/             # Blockchain constants
│   ├── abis.js           # Smart contract ABIs
│   ├── addresses.js      # Contract and token addresses
│   └── README.md         # Constants documentation
├── context/               # React contexts
│   ├── Web3Context.js    # Web3 state management
│   └── README.md         # Context documentation
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS imports
└── public/               # Static assets
```

## 🌐 Web3 Features

### Wallet Connection

- MetaMask integration
- Auto-reconnection on page refresh
- Account switching support
- Network change handling

### Smart Contract Integration

- Uniswap V2 Router contract
- ERC-20 token contracts
- Real-time balance updates
- Transaction state management

### Supported Tokens

- **Stablecoins**: USDT, USDC, DAI, BUSD
- **DeFi Tokens**: UNI, AAVE, LINK, CRV, COMP
- **Layer 2**: MATIC, ARB, OP
- **Gaming**: SAND, MANA
- **Meme**: SHIB, PEPE
- **Others**: MKR, SNX, GRT, LDO, RPL, FXS

## 🚀 Scripts

- **Development**: `npm run dev` - Start development server
- **Build**: `npm run build` - Build for production
- **Start**: `npm start` - Start production server
- **Lint**: `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_INFURA_ID=your_infura_project_id
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_api_key
```

### Network Configuration

Currently configured for Ethereum Mainnet. To add other networks:

1. Update `constants/addresses.js` with network-specific addresses
2. Modify `context/Web3Context.js` to handle multiple networks
3. Add network switching logic

## 📱 Usage

1. **Connect Wallet**: Click "Connect Wallet" to link your MetaMask
2. **View Balance**: See your connected wallet address
3. **Network Check**: Ensure you're on Ethereum Mainnet
4. **Ready to Trade**: Wallet connected and ready for DEX features

## 🛡️ Security

- No private keys stored
- Client-side wallet connection only
- Verified contract addresses
- Slippage protection
- Transaction deadline limits

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Uniswap](https://uniswap.org/) for the DEX protocol
- [Next.js](https://nextjs.org/) for the amazing framework
- [Ethers.js](https://ethers.org/) for Web3 integration
- [Tailwind CSS](https://tailwindcss.com/) for styling


---

**Built with ❤️ for the DeFi community**


Console Error


Error: Insufficient ETH balance. Need 2.0 ETH

components\SwapCard.js (385:21) @ handleSwap


  383 |               await tx.wait(1); // Wait for 1 confirmation
  384 |             } else {
> 385 |               throw new Error(
      |                     ^
  386 |                 `Insufficient ETH balance. Need ${ethers.utils.formatEther(
  387 |                   totalNeeded
  388 |                 )} ETH`

how do i test the application i don't have eth in my account metamaks


@https://sepolia-faucet.pk910.de/ 

asking for 0.001 main met balance how to get to 


i want to do it via hardhat private key method can you help me with that


so that i can swap my tokens easierly