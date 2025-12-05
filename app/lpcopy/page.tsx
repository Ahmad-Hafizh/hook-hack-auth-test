import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { LogoCarousel } from "@/components/logo-carousel";
import { IntroSection } from "@/components/intro-section";
import { PlatformSection } from "@/components/platform-section";
import { FeaturesSection } from "@/components/features-section";
import { TemplatesSection } from "@/components/templates-section";
import { PickupSection } from "@/components/pickup-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { InterviewSection } from "@/components/interview-section";
import { CTASection } from "@/components/cta-section";
import { LPCopyFooter as Footer } from "@/components/lpcopy-footer";
import { PasswordWall } from "@/components/password-wall";

export default function LPCopyPage() {
  return (
    <PasswordWall>
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <LogoCarousel />
        <IntroSection />
        <PlatformSection />
        <FeaturesSection />
        <TemplatesSection />
        <PickupSection />
        <CaseStudiesSection />
        <InterviewSection />
        <CTASection />
        <Footer />
      </main>
    </PasswordWall>
  );
}
