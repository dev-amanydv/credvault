import Background from "@/components/landing-page/Background";
import CTA from "@/components/landing-page/CTA";
import Development from "@/components/landing-page/Development";
import Features from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import NeedOfCredVault from "@/components/landing-page/NeedOfCredVault";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white overflow-x-clip">
      <header>
        <Navbar />
      </header>
      <main className={`${inter.className}`}>
        <Background />
        <Hero />
        <NeedOfCredVault />
        <Features />
        <CTA/>
        <Footer />
      </main>
    </div>
  );
}
