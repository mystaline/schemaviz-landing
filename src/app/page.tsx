import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LiveDemo from "@/components/LiveDemo";
import Changelog from "@/components/Changelog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <LiveDemo />
      <Changelog />
      <Footer />
    </main>
  );
}
