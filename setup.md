# Quick Setup Guide for HashiraSwap Testing

## 🚀 Get Started in 5 Minutes

### Step 1: Environment Setup

Create `.env.local` file:

```bash
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key_here
```

Get your Alchemy key: https://www.alchemy.com/

### Step 2: Install & Run

```bash
npm install
npm run fork:dev
```

### Step 3: MetaMask Setup

1. Add Forked Mainnet Network:

   **Ethereum Mainnet Fork**

   - Network Name: `Ethereum Mainnet (Fork)`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1`
   - Currency: `ETH`
   - Block Explorer: `https://etherscan.io`



2. Import Test Account:
   ```
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
   This account has 10,000 ETH for testing!

### Step 4: Start Trading

- Open http://localhost:3000
- Connect wallet
- Start swapping tokens!

## 🎯 Test Accounts (All have 10,000 ETH)

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

## 🔧 Troubleshooting

**"Could not fetch chain ID" error?**

- Try `http://localhost:8545` instead of `http://127.0.0.1:8545`
- Make sure `npm run fork` is running first
- Use Chain ID `31337` if detection fails

**"Wrong Network" error?**

- Make sure MetaMask is on the forked network you added
- Check that the RPC URL matches your Hardhat output

**"No liquidity" error?**

- You're on the fork with real mainnet data, so all pairs work!

**Need more test accounts?**

- Hardhat generates 20 accounts with 10,000 ETH each
- Check console output when running `npm run fork`
