import { lazy, Suspense } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Snowfall from "@/components/Snowfall";
import HeroSection from "@/components/HeroSection";
import TrustCarousel from "@/components/TrustCarousel";

// Skeleton loaders for each section type
import VideoProofSkeleton from "@/components/skeletons/VideoProofSkeleton";
import VideoDemoSkeleton from "@/components/skeletons/VideoDemoSkeleton";
import FeaturesSkeleton from "@/components/skeletons/FeaturesSkeleton";
import TestimonialsSkeleton from "@/components/skeletons/TestimonialsSkeleton";
import FooterSkeleton from "@/components/skeletons/FooterSkeleton";
import GenericSectionSkeleton from "@/components/skeletons/GenericSectionSkeleton";

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

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Critical above-the-fold components loaded eagerly - NEVER lazy load these */}
      <AnnouncementBar />
      <div className="relative">
        <Header />
        <Snowfall />
        <HeroSection />
      </div>
      <TrustCarousel />
      
      {/* Below-the-fold components lazy loaded with specific skeletons */}
      <Suspense fallback={<VideoProofSkeleton />}>
        <VideoProofSection />
      </Suspense>
      <Suspense fallback={<VideoDemoSkeleton />}>
        <VideoDemo />
      </Suspense>
      <Suspense fallback={<FeaturesSkeleton />}>
        <Features />
      </Suspense>
      <Suspense fallback={<GenericSectionSkeleton />}>
        <HowToOrder />
      </Suspense>
      <Suspense fallback={<GenericSectionSkeleton height="py-8" bgClass="bg-primary" />}>
        <MarqueeMessage />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<GenericSectionSkeleton />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<GenericSectionSkeleton />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;