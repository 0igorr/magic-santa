import { useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";

// Lazy load Dialog for better initial bundle size
const Dialog = lazy(() => import("@/components/ui/dialog").then(m => ({
  default: m.Dialog
})));
const DialogContent = lazy(() => import("@/components/ui/dialog").then(m => ({
  default: m.DialogContent
})));
const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();
  const handleCTA = () => {
    setIsVideoOpen(false);
    navigate("/formulario");
  };
  return <>
      <section id="hero" className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image - Optimized with native lazy loading disabled for LCP */}
        <div className="absolute inset-0 z-0">
          <img alt="Santa in cozy workshop" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" src="/lovable-uploads/4abb2f41-013f-4b5f-a3a1-07eb01379fbd.webp" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content - CSS animations instead of Framer Motion for critical path */}
        <div className="relative z-10 container text-center my-0 px-[15px] py-0 mx-0 pb-20 pt-[70px]">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight text-primary-foreground text-2xl">
              A melhor e inesquecível surpresa
              <br />
              <span className="sm:text-6xl md:text-7xl lg:text-8xl text-4xl text-accent"> de natal </span>
              <br />
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 leading-relaxed px-4 animate-fade-in-up" style={{
            animationDelay: "0.2s"
          }}>
              Vídeo <span className="italic font-semibold">personalizado</span> do Papai Noel que irá{" "}
              <span className="font-semibold">encantar as crianças</span>. Leve a real{" "}
              <span className="italic font-semibold">magia do Natal</span> para seu lar!
            </p>

            <div className="flex flex-col items-center gap-4 mb-6 animate-fade-in-up" style={{
            animationDelay: "0.4s"
          }}>
              <Link to="/formulario" className="w-full max-w-md">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-full shadow-button font-bold tracking-wide w-full">
                  Criar vídeo
                </Button>
              </Link>
              
              <button onClick={() => setIsVideoOpen(true)} className="flex items-center gap-3 text-white hover:text-accent transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5 text-primary">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-medium">Veja o vídeo</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/90 text-sm animate-fade-in-up" style={{
            animationDelay: "0.6s"
          }}>
              {/* Trustpilot Section - Inline SVG for faster render */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="bg-white px-2 py-1 rounded">
                  <svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6h6v10H0z" fill="#00B67A" />
                    <path d="M8 0l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" fill="#00B67A" />
                    <text x="20" y="11" fontSize="10" fill="#00B67A" fontWeight="bold">Trustpilot</text>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
                  </div>
                  <span className="text-xs font-medium">4,7 de 1429 avaliações</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal - Lazy loaded */}
      {isVideoOpen && <Suspense fallback={<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" /></div>}>
          <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
            <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black/95 border-white/10 overflow-hidden">
              <button onClick={() => setIsVideoOpen(false)} className="absolute right-3 top-3 z-50 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="relative w-full" style={{
            paddingTop: "56.25%"
          }}>
                <iframe src="https://player.vimeo.com/video/1144733735?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&title=0&byline=0&portrait=0" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0 w-full h-full" title="Vídeo de apresentação" loading="lazy" />
              </div>

              <div className="p-4 flex justify-center">
                <Button onClick={handleCTA} size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 py-6 rounded-full shadow-button font-bold">
                  Criar o vídeo mágico ✨
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </Suspense>}
    </>;
};
export default HeroSection;