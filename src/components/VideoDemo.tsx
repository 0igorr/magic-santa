import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Clock, Sparkles, Heart, Film } from "lucide-react";

const highlights = [
  {
    icon: Clock,
    stat: "5 min",
    label: "para criar",
  },
  {
    icon: Film,
    stat: "2h",
    label: "de entrega",
  },
  {
    icon: Sparkles,
    stat: "100%",
    label: "personalizado",
  },
  {
    icon: Heart,
    stat: "∞",
    label: "memórias",
  },
];

const VideoDemo = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            {/* Video Container with elegant frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-foreground/90 aspect-[4/3]">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-foreground/80 to-foreground">
                {/* Play button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  style={{ boxShadow: "0 0 40px rgba(212, 36, 38, 0.5)" }}
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                </motion.button>
              </div>

              {/* Badge overlay */}
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Novo 2025
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-background rounded-xl p-4 shadow-xl"
            >
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary">11.479+</p>
              <p className="text-xs md:text-sm text-muted-foreground">famílias encantadas</p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 text-secondary-foreground"
          >
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
            <p className="text-secondary-foreground/80 text-base md:text-lg mb-8 leading-relaxed">
              O Papai Noel chama pelo nome, mostra a foto no livro mágico, comenta sobre a idade 
              e deixa uma mensagem especial. Tudo em um vídeo cinematográfico feito só para sua criança.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center p-3 rounded-xl bg-secondary-foreground/5 backdrop-blur-sm"
                >
                  <item.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <p className="text-2xl md:text-3xl font-heading font-bold text-secondary-foreground">
                    {item.stat}
                  </p>
                  <p className="text-xs text-secondary-foreground/70">{item.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-10 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
              style={{ boxShadow: "0 8px 30px rgba(212, 36, 38, 0.4)" }}
            >
              Criar vídeo agora
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
