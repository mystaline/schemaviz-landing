import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LiveDemo from "@/components/LiveDemo";
import Changelog from "@/components/Changelog";
import Footer from "@/components/Footer";
import RedirectGuard from "@/components/RedirectGuard";

export default function Home() {
  return (
    <RedirectGuard>
      <main>
        <Hero />
        <Features />
        <LiveDemo />
        <Changelog />
        <Footer />
      </main>
    </RedirectGuard>
  );
}
