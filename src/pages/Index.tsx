import { lazy, Suspense } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Snowfall from "@/components/Snowfall";
import HeroSection from "@/components/HeroSection";
import TrustCarousel from "@/components/TrustCarousel";

// Lazy load below-the-fold components for better initial load
const VideoProofSection = lazy(() => import("@/components/VideoProofSection"));
const VideoDemo = lazy(() => import("@/components/VideoDemo"));
const Features = lazy(() => import("@/components/Features"));
const HowToOrder = lazy(() => import("@/components/HowToOrder"));
const MarqueeMessage = lazy(() => import("@/components/MarqueeMessage"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Pricing = lazy(() => import("@/components/Pricing"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));

// Simple loading fallback
const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Critical above-the-fold components loaded eagerly */}
      <AnnouncementBar />
      <div className="relative">
        <Header />
        <Snowfall />
        <HeroSection />
      </div>
      <TrustCarousel />
      
      {/* Below-the-fold components lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <VideoProofSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <VideoDemo />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <HowToOrder />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <MarqueeMessage />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;