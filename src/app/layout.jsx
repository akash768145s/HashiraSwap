import { Web3Provider } from "../context/Web3Context";
import "../../styles/globals.css";

export const metadata = {
  title: "HashiraSwap - Professional DeFi Trading",
  description:
    "Institutional-grade decentralized exchange platform built for sophisticated traders and investors. Secure, fast, and professional.",
  keywords:
    "DeFi, DEX, professional trading, institutional, Uniswap, HashiraSwap, cryptocurrency exchange, blockchain",
  authors: [{ name: "HashiraSwap Team" }],
  openGraph: {
    title: "HashiraSwap - Professional DeFi Trading",
    description: "Institutional-grade decentralized exchange platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HashiraSwap - Professional DeFi Trading",
    description: "Institutional-grade decentralized exchange platform",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-satoshi antialiased bg-dark-bg text-dark-text">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
