"use client";

import { Header, MainContainer } from "../components";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <Header />
      <MainContainer />
    </div>
  );
}
