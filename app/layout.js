import { Web3Provider } from "../context/Web3Context";
import "../styles/globals.css";

export const metadata = {
  title: "HashiraSwap - Decentralized Token Exchange",
  description: "A modern DEX built on Uniswap V2 with Next.js 15",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
