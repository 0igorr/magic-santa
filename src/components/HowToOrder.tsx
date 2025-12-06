import { memo } from "react";
import { FileVideo, Palette, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const HowToOrder = memo(() => {
  return (
    <section className="bg-background relative overflow-hidden">
      {/* Subtle pattern overlay - simplified */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10 bg-[#ffe084] my-0 py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
            Simples e rápido
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
            3 passos para a magia
          </h2>
        </div>

        {/* Steps - Horizontal on desktop, vertical on mobile */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line - desktop only */}
          <div
            className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full border-0 p-6 md:p-8">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg mx-auto md:mx-0 mb-4 shadow-button"
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
                  <div className="flex md:hidden justify-center my-4" aria-hidden="true">
                    <ArrowRight className="w-5 h-5 text-accent rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12 md:mt-16 animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          <Link to="/formulario">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-10 py-6 rounded-full font-bold shadow-xl shadow-button"
            >
              Começar agora
            </Button>
          </Link>
          <p className="text-muted-foreground text-sm mt-4 my-[15px]">
            Pronto em menos de 5 minutos
          </p>
        </div>
      </div>
    </section>
  );
});

HowToOrder.displayName = "HowToOrder";

export default HowToOrder;
