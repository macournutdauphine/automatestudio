import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { ContactSection } from "./components/ContactSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { IntegrationsSection } from "./components/IntegrationsSection";
import { Navbar } from "./components/Navbar";
import { OfferSection } from "./components/OfferSection";
import { StudioSection } from "./components/StudioSection";
import { UseCasesSection } from "./components/UseCasesSection";
import { HeroSection } from "./components/hero/HeroSection";
import { RealisationsSection } from "./components/realisations/RealisationsSection";

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-50 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only"
        >
          Passer au contenu principal
        </a>
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <IntegrationsSection />
          <UseCasesSection />
          <RealisationsSection />
          <OfferSection />
          <StudioSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
