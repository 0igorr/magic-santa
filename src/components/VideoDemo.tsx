import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Heart, Film } from "lucide-react";
const highlights = [{
  icon: Clock,
  stat: "5 min",
  label: "para criar"
}, {
  icon: Film,
  stat: "2h",
  label: "de entrega"
}, {
  icon: Sparkles,
  stat: "100%",
  label: "personalizado"
}, {
  icon: Heart,
  stat: "∞",
  label: "memórias"
}];
const VideoDemo = () => {
  return <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="text-secondary-foreground text-center">
            {/* Eyebrow */}
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              A experiência mágica
            </span>

            {/* Headline */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Um vídeo que seu filho 
              <span className="text-accent"> nunca vai esquecer</span>
            </h2>

            {/* Description */}
            <p className="text-secondary-foreground/80 text-base md:text-lg mb-8 leading-relaxed">O Papai Noel chama pelo nome, mostra sua foto no livro mágico, dá conselhos e ainda deixa uma mensagem especial. Tudo em um vídeo cinematográfico feito só para sua criança. E 100% personalizado por você.</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {highlights.map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }} className="text-center p-3 rounded-xl bg-secondary-foreground/5 backdrop-blur-sm">
                  <item.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <p className="text-2xl md:text-3xl font-heading font-bold text-secondary-foreground">
                    {item.stat}
                  </p>
                  <p className="text-xs text-secondary-foreground/70">{item.label}</p>
                </motion.div>)}
            </div>

            {/* CTA */}
            <Link to="/formulario" className="inline-block">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-10 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all" style={{
              boxShadow: "0 8px 30px rgba(212, 36, 38, 0.4)"
            }}>
                Criar vídeo agora
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default VideoDemo;