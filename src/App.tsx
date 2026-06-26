import { HeroSection } from "./components/HeroSection";
import { StackProofSection } from "./components/StackProofSection";
import { ValueSection } from "./components/ValueSection";
import { PrototypesSection } from "./components/PrototypesSection";
import { OffersSection } from "./components/OffersSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTA } from "./components/FinalCTA";

export default function App() {
  return (
    <div className="relative bg-bg text-[#111111]">
      <a
        href="#main-content"
        className="focus-ring sr-only focus:not-sr-only fixed left-4 top-4 z-50 rounded-full bg-white px-4 py-2 text-sm text-[#111111] shadow-soft"
      >
        Passer au contenu principal
      </a>
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <ValueSection />
        <StackProofSection />
        <PrototypesSection />
        <OffersSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </div>
  );
}
