import HeroSection from "@/components/HeroSection";
import MiddleSection from "@/components/MiddleSection";

export default function Home() {
  return (
    <main className="mainContainer min-h-screen bg-black/[0.96] antialiased">
      <HeroSection />
      <MiddleSection />
    </main>
  );
}
