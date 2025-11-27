import Navbar from "@/components/navbar";
import Hero from "@/components/landingpage/hero";
import TrustedBy from "@/components/landingpage/trusted-by";
import Features from "@/components/landingpage/features";
import DashboardPreview from "@/components/landingpage/dashboard-preview";
import Testimonial from "@/components/landingpage/testimonial";
import FeaturesDetail from "@/components/landingpage/features-detail";
import IndustrySamples from "@/components/landingpage/industry-samples";
import FeaturesHighlight from "@/components/landingpage/features-highlight";
import AIFeatures from "@/components/landingpage/ai-features";
import CTA from "@/components/landingpage/cta";
import Footer from "@/components/footer";
import Newsletter from "@/components/landingpage/newsletter";
import Benefit from "@/components/landingpage/benefit";
import MemberShowcase from "@/components/member-showcase";
import CompanyFooter from "@/components/company-footer";
import Explain from "@/components/landingpage/explain";
import Solutions from "@/components/landingpage/solutions";
import Schedule from "@/components/landingpage/schedule";
import Price from "@/components/landingpage/price";
import TrialDialog from "@/components/landingpage/TrialDialog";

// Demo

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Explain />
      <Solutions />
      {/* <TrustedBy /> */}
      <FeaturesDetail />
      <IndustrySamples />
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
        <TrialDialog
          trigger={
            <button className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 border-2 border-[#2af0ea] rounded-lg px-8 py-3 font-bold text-lg">
              1週間​無料トライアルで​今すぐ​制作
            </button>
          }
        />
      </div>
      <Footer />
    </div>
  );
}
