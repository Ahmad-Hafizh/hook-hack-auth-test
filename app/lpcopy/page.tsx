import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HighlightFeatureProcess } from "@/components/highlight-feature-process";
import { SolutionsSection } from "@/components/solutions-section";
import { ScrollColorSection } from "@/components/scroll-color-section";
import { MainBenefitSection } from "@/components/mainbenefit-section";
import { IndustrySampleVideosSection } from "@/components/industry-sample-videos-section";
import { PMaxSection } from "@/components/pmax-section";
import { PricingSection } from "@/components/pricing-section";
import { TeamShowcaseSection } from "@/components/team-showcase-section";
import { CompanyOverviewSection } from "@/components/company-overview-section";
import { LogoCarousel } from "@/components/logo-carousel";
import { IntroSection } from "@/components/intro-section";
import { PlatformSection } from "@/components/platform-section";
import { FeaturesSection } from "@/components/features-section";
import { TemplatesSection } from "@/components/templates-section";
import { PickupSection } from "@/components/pickup-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { InterviewSection } from "@/components/interview-section";
import { CTASection } from "@/components/cta-section";
import { PromotionSection } from "@/components/promotion-section";
// import { LPCopyFooterNew as Footer } from "@/components/lpcopy-footer-new";
import { LPCopyFooterSimple as Footer } from "@/components/lpcopy-footer-simple";
// import { PasswordWall } from "@/components/password-wall";

// TODO: Re-enable PasswordWall when auth is needed
export default function LPCopyPage() {
  return (
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <HighlightFeatureProcess />
        <ScrollColorSection startColor="#ffffff" endColor="#999999">
          <SolutionsSection />
        </ScrollColorSection>
        <div id="main-features">
          <MainBenefitSection />
        </div>
        <div id="sample-videos">
          <IndustrySampleVideosSection />
        </div>
        <PMaxSection />
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="team">
          <TeamShowcaseSection />
        </div>
        <div id="company">
          <CompanyOverviewSection />
        </div>
        {/* <LogoCarousel />
        <IntroSection />
        <PlatformSection />
        <FeaturesSection />
        <TemplatesSection />
        <PickupSection />
        <CaseStudiesSection />
        <InterviewSection /> */}
        {/* <CTASection /> */}
        {/* <PromotionSection /> */}
        <Footer />
      </main>
  );
}
