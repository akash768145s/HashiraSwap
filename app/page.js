"use client";

import { Header, MainContainer } from "../components";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Animated background mesh */}
      <div className="fixed inset-0 bg-mesh-gradient opacity-30 animate-float"></div>

      {/* Gradient overlays */}
      <div className="fixed inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <MainContainer />
      </div>
    </div>
  );
}
