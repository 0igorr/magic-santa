import Header from "@/components/Header";
import Snowfall from "@/components/Snowfall";
import HeroSection from "@/components/HeroSection";
import VoicePreview from "@/components/VoicePreview";
import Features from "@/components/Features";
import VideoDemo from "@/components/VideoDemo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Snowfall />
      <HeroSection />
      <VoicePreview />
      <Features />
      <VideoDemo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
