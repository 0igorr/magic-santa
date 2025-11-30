import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Snowfall from "@/components/Snowfall";
import HeroSection from "@/components/HeroSection";
import TrustCarousel from "@/components/TrustCarousel";
import VoicePreview from "@/components/VoicePreview";
import Features from "@/components/Features";
import VideoDemo from "@/components/VideoDemo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <Snowfall />
      <HeroSection />
      <TrustCarousel className="bg-[#fbf6e9]" />
      <VoicePreview className="bg-[#fbf6e9]" />
      <Features />
      <VideoDemo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>;
};
export default Index;