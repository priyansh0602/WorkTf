/**
 * LandingPage — Root landing page assembling all sections.
 *
 * Layout order: TopNav → HeroSection → DashboardPreview →
 * FeaturesSection → Footer. The main content area is centered
 * within a 1440px max-width container.
 */

import TopNav from "@components/layout/TopNav";
import HeroSection from "./HeroSection";
import DashboardPreview from "./DashboardPreview";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sticky top navigation */}
      <TopNav onGetStarted={onGetStarted} onLogin={() => {}} />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          maxWidth: 1440,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <HeroSection onGetStarted={onGetStarted} />
        <DashboardPreview />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
