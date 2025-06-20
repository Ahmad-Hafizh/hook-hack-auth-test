import Navbar from "@/components/navbar";
import Hero from "@/components/landingpage/hero";
import TrustedBy from "@/components/landingpage/trusted-by";
import Features from "@/components/landingpage/features";
import DashboardPreview from "@/components/landingpage/dashboard-preview";
import Testimonial from "@/components/landingpage/testimonial";
import FeaturesDetail from "@/components/landingpage/features-detail";
import AIFeatures from "@/components/landingpage/ai-features";
import CTA from "@/components/landingpage/cta";
import Footer from "@/components/footer";
import Newsletter from "@/components/landingpage/newsletter";
import Benefit from "@/components/landingpage/benefit";
import MemberShowcase from "@/components/member-showcase";
import CompanyFooter from "@/components/company-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      {/* <TrustedBy /> */}
      <FeaturesDetail />
      <Benefit />
      <MemberShowcase />
      {/* <Features /> */}
      {/* <DashboardPreview />
      <Testimonial />
      <AIFeatures /> */}
      {/* <CTA /> */}
      {/* <Newsletter /> */}
      <CompanyFooter />
      <div className="mt-6 w-full flex justify-center items-center my-20">
        <a
          href="/app"
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#4000B3] to-[#6D01D7] hover:from-[#6D01D7] hover:to-[#4000B3] text-white border-2 border-[#75f567] rounded-lg"
        >
          無料トライアルを申し込む
        </a>
      </div>
      <Footer />
    </div>
  );
}
