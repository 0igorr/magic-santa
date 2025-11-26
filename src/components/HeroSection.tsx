import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import heroImage from "@/assets/santa-hero.jpg";
const HeroSection = () => {
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image without Overlay */}
      <div className="absolute inset-0 z-0">
        <img alt="Santa in cozy workshop" src="/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
            A Magia do Natal Nunca Foi{" "}
            <span className="text-accent">Tão Real.</span>
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
        }} className="text-base sm:text-lg md:text-2xl text-white/90 mb-8 md:mb-10 leading-relaxed px-4">
            Surpreenda seu filho com um vídeo onde o Papai Noel fala o nome dele,
            mostra a foto e sabe se ele se comportou.
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
        }} className="flex flex-col items-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full shadow-button animate-pulse-glow font-semibold uppercase tracking-wide w-full max-w-sm">
              Criar Meu Vídeo Agora
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white/90 hover:bg-white text-foreground text-sm md:text-base px-6 md:px-8 py-4 md:py-5 rounded-full font-medium flex items-center gap-2 backdrop-blur-sm"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white ml-0.5">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              Veja o vídeo
            </Button>
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-white/80 px-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />)}
            </div>
            <span className="text-xs sm:text-sm md:text-base">
              4.9/5 estrelas • Mais de 10.000 famílias encantadas
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 1
    }} className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div animate={{
          y: [0, 12, 0]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>;
};
export default HeroSection;