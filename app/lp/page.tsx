import Navbar from "@/components/navbar";
import HeroLp from "@/components/landingpage/hero-lp";
import TrustedBy from "@/components/landingpage/trusted-by";
import Features from "@/components/landingpage/features";
import DashboardPreview from "@/components/landingpage/dashboard-preview";
import Testimonial from "@/components/landingpage/testimonial";
import FeaturesDetailLp from "@/components/landingpage/features-detail-lp";
import IndustrySamplesLp from "@/components/landingpage/industry-samples-lp";
import PMaxSectionLp from "@/components/landingpage/pmax-section-lp";
import PriceNewLp from "@/components/landingpage/pricenew-lp";
import FeaturesHighlight from "@/components/landingpage/features-highlight";
import AIFeatures from "@/components/landingpage/ai-features";
import CTA from "@/components/landingpage/cta";
import Footer from "@/components/footer";
import Newsletter from "@/components/landingpage/newsletter";
import Benefit from "@/components/landingpage/benefit";
import MemberShowcase from "@/components/member-showcase";
import CompanyFooter from "@/components/company-footer";
import ExplainLp from "@/components/landingpage/explain-lp";
import SolutionsLp from "@/components/landingpage/solutions-lp";
import Schedule from "@/components/landingpage/schedule";
import Price from "@/components/landingpage/price";
import TrialDialogLp from "@/components/landingpage/TrialDialog-lp";
import { PasswordWall } from "@/components/password-wall";

export default function LandingPage() {
  return (
    <PasswordWall>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroLp />
        {/* <ExplainLp /> */}
        <SolutionsLp />
        {/* <TrustedBy /> */}
        <FeaturesDetailLp />
        <IndustrySamplesLp />
        <PMaxSectionLp />
        <PriceNewLp />
        {/* <FeaturesHighlight /> */}
        {/* <Benefit />
      <Schedule />
      <Price /> */}
        <MemberShowcase />
        {/* <Features /> */}
        {/* <DashboardPreview />
      <Testimonial />
      <AIFeatures /> */}
        {/* <CTA /> */}
        {/* <Newsletter /> */}
        <CompanyFooter />
        <div className="mt-6 w-full flex justify-center items-center my-20">
          <TrialDialogLp
            trigger={
              <button className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 border-2 border-[#2af0ea] rounded-lg px-8 py-3 font-bold text-lg">
                1週間​無料トライアルで​今すぐ​制作
              </button>
            }
          />
        </div>
        <Footer />
      </div>
    </PasswordWall>
  );
}
