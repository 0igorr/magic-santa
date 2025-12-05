import { motion } from "framer-motion";
import { FileVideo, Palette, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import stepChooseImg from "@/assets/step-01-choose.jpg";
import stepPersonalizeImg from "@/assets/step-02-personalize.jpg";
import stepEnchantImg from "@/assets/step-03-enchant.jpg";

const steps = [{
  number: "01",
  icon: FileVideo,
  title: "Escolha",
  description: "Selecione o roteiro perfeito para a idade do seu filho",
  image: stepChooseImg
}, {
  number: "02",
  icon: Palette,
  title: "Personalize",
  description: "Nome, foto, idade e uma mensagem especial em 5 minutos",
  image: stepPersonalizeImg
}, {
  number: "03",
  icon: PartyPopper,
  title: "Encante",
  description: "Receba o vídeo e veja a magia acontecer",
  image: stepEnchantImg
}];
const HowToOrder = () => {
  return <section className="bg-background relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
      backgroundSize: '40px 40px'
    }} />

      <div className="container mx-auto px-4 relative z-10 bg-[#ffe084] my-0 py-20 md:py-28">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16 md:mb-20">
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
            {steps.map((step, index) => <motion.div key={step.number} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.15
          }} className="relative">
              {/* Card */}
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full border-0">
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg" style={{
                      boxShadow: "0 8px 24px rgba(212, 36, 38, 0.25)"
                    }}>
                      <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
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
                </div>

                {/* Arrow connector - mobile only */}
                {index < steps.length - 1 && <div className="flex md:hidden justify-center my-4">
                    <ArrowRight className="w-5 h-5 text-accent rotate-90" />
                  </div>}
              </motion.div>)}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }} className="text-center mt-12 md:mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-10 py-6 rounded-full font-bold shadow-xl" style={{
          boxShadow: "0 8px 30px rgba(212, 36, 38, 0.35)"
        }}>
            Começar agora
          </Button>
          <p className="text-muted-foreground text-sm mt-4 my-[15px]">
            Pronto em menos de 5 minutos
          </p>
        </motion.div>
      </div>
    </section>;
};
export default HowToOrder;