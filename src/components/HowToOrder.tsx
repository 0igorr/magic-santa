import { motion } from "framer-motion";
import { FileVideo, Palette, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: FileVideo,
    title: "Escolha",
    description: "Selecione o roteiro perfeito para a idade do seu filho",
  },
  {
    number: "02",
    icon: Palette,
    title: "Personalize",
    description: "Nome, foto, idade e uma mensagem especial em 5 minutos",
  },
  {
    number: "03",
    icon: PartyPopper,
    title: "Encante",
    description: "Receba o vídeo e veja a magia acontecer",
  },
];

const HowToOrder = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
            Simples e rápido
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
            3 passos para a magia
          </h2>
        </motion.div>

        {/* Steps - Horizontal on desktop, vertical on mobile */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line - desktop only */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 shadow-lg mx-auto md:mx-0"
                    style={{ boxShadow: "0 8px 24px rgba(212, 36, 38, 0.25)" }}
                  >
                    <step.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                  </div>

                  {/* Step number */}
                  <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block text-center md:text-left">
                    Passo {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 text-center md:text-left">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-center md:text-left">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector - mobile only */}
                {index < steps.length - 1 && (
                  <div className="flex md:hidden justify-center my-4">
                    <ArrowRight className="w-5 h-5 text-accent rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-10 py-6 rounded-full font-bold shadow-xl"
            style={{ boxShadow: "0 8px 30px rgba(212, 36, 38, 0.35)" }}
          >
            Começar agora
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            Pronto em menos de 5 minutos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToOrder;
