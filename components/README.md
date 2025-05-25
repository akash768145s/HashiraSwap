# Components

This folder contains all reusable React components for HashiraSwap.

## Component Structure

### 🎯 Core Components

#### `Header.js`

**Purpose**: Application header with navigation and wallet connection status

- Logo and branding
- Navigation menu (Swap, Pool, Analytics)
- Wallet connection button
- Connected wallet address display

**Usage**:

```jsx
import { Header } from "../components";

<Header />;
```

#### `MainContainer.js`

**Purpose**: Main content container that conditionally renders based on wallet connection

- Welcome message and description
- Conditionally shows `SwapCard` or `WalletConnect`
- Feature highlights section
- Footer information

**Usage**:

```jsx
import { MainContainer } from "../components";

<MainContainer />;
```

### 💰 Wallet Components

#### `WalletConnect.js`

**Purpose**: Wallet connection interface for non-connected users

- Connection prompt and instructions
- Connect wallet button with loading states
- MetaMask installation reminder
- Connected wallet info display

**Props**: None (uses Web3Context)

**Usage**:

```jsx
import { WalletConnect } from "../components";

<WalletConnect />;
```

### 🔄 Trading Components

#### `SwapCard.js`

**Purpose**: Main token swapping interface for connected users

- Token selection dropdowns
- Amount input/output fields
- Price quotes and slippage
- Swap execution
- Transaction status

**Props**:

```javascript
{
  provider, // Ethers provider
    account, // Wallet address
    uniswapRouter, // Uniswap contract instance
    signer, // Transaction signer
    network; // Network information
}
```

**Usage**:

```jsx
import { SwapCard } from "../components";

<SwapCard
  provider={provider}
  account={account}
  uniswapRouter={uniswapRouter}
  signer={signer}
  network={network}
/>;
```

#### `TokenModal.js`

**Purpose**: Token selection modal with search and categories

- Token search functionality
- Category filtering (Popular, Stablecoins, DeFi, etc.)
- Token list with icons and details
- Selection handling

**Props**:

```javascript
{
  isOpen, // Boolean - modal visibility
    onClose, // Function - close modal
    onSelect, // Function - token selection callback
    excludeToken; // Object - token to exclude from list
}
```

**Usage**:

```jsx
import { TokenModal } from "../components";

<TokenModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSelect={handleTokenSelect}
  excludeToken={selectedTokenIn}
/>;
```

## 🏗️ Component Architecture

### State Management

- **Global State**: Web3Context for wallet and blockchain data
- **Local State**: Component-specific state (modals, inputs, loading)
- **Props**: Data passed between components

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Design System**: Consistent colors, spacing, and components
- **Responsive**: Mobile-first responsive design
- **Glassmorphism**: Modern glass-like UI effects

### Web3 Integration

- **Ethers.js**: Blockchain interaction
- **Context Pattern**: Shared Web3 state
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback for async operations

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 0-640px
- **Tablet**: 640-768px
- **Desktop**: 768px+

### Features

- Collapsible navigation on mobile
- Responsive grid layouts
- Touch-friendly button sizes
- Optimized for all screen sizes

## 🎨 Design Tokens

### Colors

```css
/* Primary Gradients */
from-blue-500 to-purple-600    /* Primary buttons */
from-blue-900 via-purple-900 to-pink-900  /* Background */

/* Glass Effects */
bg-white/10 backdrop-blur-md   /* Glass cards */
border-white/20                /* Glass borders */

/* Status Colors */
text-green-400    /* Success states */
text-red-400      /* Error states */
text-gray-400     /* Secondary text */
```

### Spacing

- **Padding**: p-4, p-6, p-8
- **Margins**: mb-4, mb-6, mb-8
- **Gaps**: gap-4, gap-6

## 🔧 Best Practices

### Component Guidelines

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components can be used in different contexts
3. **Props Interface**: Clear and documented props
4. **Error Boundaries**: Graceful error handling
5. **Loading States**: Visual feedback for async operations

### Performance

- **Lazy Loading**: Components loaded as needed
- **Memoization**: Prevent unnecessary re-renders
- **Optimization**: Efficient state updates

### Accessibility

- **Semantic HTML**: Proper HTML structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab-friendly interfaces
- **Color Contrast**: WCAG compliant colors

## 🚀 Adding New Components

1. **Create Component File**:

   ```javascript
   // components/NewComponent.js
   "use client";

   export default function NewComponent({ prop1, prop2 }) {
     return <div>{/* Component JSX */}</div>;
   }
   ```

2. **Export in Index**:

   ```javascript
   // components/index.js
   export { default as NewComponent } from "./NewComponent";
   ```

3. **Use Component**:
   ```javascript
   import { NewComponent } from "../components";
   ```

## 📚 Dependencies

- **React 18**: Component framework
- **Next.js 15**: App router and SSR
- **Ethers.js v5**: Web3 integration
- **Tailwind CSS**: Styling framework

---

**Component library built for modern DeFi applications** 🚀
