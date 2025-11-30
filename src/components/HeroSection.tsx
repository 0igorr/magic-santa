import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
const HeroSection = () => {
  return <section id="hero" className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img alt="Santa in cozy workshop" src="/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="max-w-3xl mx-auto">
          <p className="text-sm md:text-base text-accent font-semibold mb-3 tracking-wide uppercase">
            Novo Vídeo 2025!
          </p>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-3 leading-tight">Black Friday Com -40%
          <br />
            <span className="sm:text-6xl md:text-7xl lg:text-8xl text-4xl text-primary-foreground">​OFF em tudo </span>
            <br />
            
          </h1>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-base sm:text-lg md:text-xl text-white/95 mb-8 leading-relaxed px-4">
            Vídeo <span className="italic font-semibold">personalizado</span> do Papai Noel que irá{" "}
            <span className="font-semibold">encantar as crianças</span>. Leve a real{" "}
            <span className="italic font-semibold">magia do Natal</span> para seu lar!
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="flex flex-col items-center gap-4 mb-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-full shadow-button font-bold tracking-wide w-full max-w-md">
              Criar vídeo
            </Button>
            
            <button className="flex items-center gap-3 text-white hover:text-accent transition-colors">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5 text-primary">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="font-medium">Veja o vídeo</span>
            </button>
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/90 text-sm">
            {/* Trustpilot Section */}
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

            {/* Badge +5 Anos */}
            
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default HeroSection;