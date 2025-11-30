import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Snowfall from "@/components/Snowfall";
import HeroSection from "@/components/HeroSection";
import TrustCarousel from "@/components/TrustCarousel";
import VideoProofSection from "@/components/VideoProofSection";
import VoicePreview from "@/components/VoicePreview";
import Features from "@/components/Features";
import VideoDemo from "@/components/VideoDemo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import BenefitsSection from "@/components/BenefitsSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <AnnouncementBar />
      <div className="relative">
        <Header />
        <Snowfall />
        <HeroSection />
      </div>
      <TrustCarousel />
      <VideoProofSection />
      <VideoDemo />
      <VoicePreview />
      <Features />
      <Testimonials />
      <Pricing />
      <BenefitsSection />
      <FAQ />
      <Footer />
    </div>;
};
export default Index;