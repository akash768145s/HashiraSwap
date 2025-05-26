"use client";

import { useState, useMemo } from "react";
import { TOKENS } from "../constants/addresses";

const TOKEN_CATEGORIES = {
  POPULAR: ["WETH", "USDT", "USDC", "DAI"],
  STABLECOINS: ["USDT", "USDC", "DAI", "BUSD"],
  DEFI: ["UNI", "AAVE", "LINK", "COMP"],
  LAYER2: ["MATIC", "ARB", "OP"],
  GAMING: ["SAND", "MANA"],
  MEME: ["SHIB", "PEPE"],
  OTHER: ["MKR", "SNX", "GRT", "LDO", "RPL", "FXS"],
};

export default function TokenModal({
  isOpen,
  onClose,
  onSelect,
  excludeToken,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("POPULAR");

  // Filter tokens based on search and selected category
  const filteredTokens = useMemo(() => {
    const tokens = searchQuery
      ? Object.values(TOKENS).filter(
          (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : TOKEN_CATEGORIES[activeCategory].map((symbol) => TOKENS[symbol]);

    // Exclude the token that's already selected in the other input
    return excludeToken
      ? tokens.filter((token) => token.address !== excludeToken.address)
      : tokens;
  }, [searchQuery, activeCategory, excludeToken]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-dark-bg-elevated/95 backdrop-blur-xl rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-dark-border shadow-elevated">
        {/* Header */}
        <div className="p-6 border-b border-dark-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-dark-text">Select Token</h2>
            <button
              onClick={onClose}
              className="p-2 text-dark-text-muted hover:text-dark-text rounded-lg hover:bg-dark-surface transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search input */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name or symbol"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-surface border border-dark-border-light text-dark-text pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-text-muted hover:text-dark-text rounded-md"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="px-6 py-4 border-b border-dark-border">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.keys(TOKEN_CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-brand-primary text-white shadow-glow"
                      : "text-dark-text-secondary hover:text-dark-text hover:bg-dark-surface"
                  }`}
                >
                  {category.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Token list */}
        <div className="overflow-y-auto max-h-96">
          {filteredTokens.length > 0 ? (
            <div className="p-2">
              {filteredTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => onSelect(token)}
                  className="w-full flex items-center p-4 hover:bg-dark-surface rounded-xl transition-colors group"
                >
                  <img
                    src={`/tokens/${token.symbol.toLowerCase()}.svg`}
                    alt={token.symbol}
                    className="w-10 h-10 rounded-full mr-4 ring-2 ring-dark-border-light"
                    onError={(e) => {
                      e.target.src = "/tokens/hashira.jpg";
                      e.target.onerror = null;
                    }}
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-dark-text group-hover:text-brand-primary transition-colors">
                        {token.symbol}
                      </span>
                      <span className="text-sm text-dark-text-muted truncate ml-2 max-w-32">
                        {token.name}
                      </span>
                    </div>
                    <div className="text-xs text-dark-text-muted font-mono mt-1">
                      {token.address.slice(0, 8)}...{token.address.slice(-6)}
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-dark-text-muted group-hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-all ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg
                className="w-12 h-12 text-dark-text-muted mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-dark-text-secondary text-sm">
                No tokens found
              </p>
              <p className="text-dark-text-muted text-xs mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
