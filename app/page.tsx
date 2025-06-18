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
      <CTA />
      {/* <Newsletter /> */}
      <CompanyFooter />
      <Footer />
    </div>
  );
}
