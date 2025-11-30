import { Download, Clock, MessageCircle, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Download,
    title: "Baixe gratuitamente",
    description: "Calendário do Advento, Cartas para Papai Noel, Papéis de Parede Elfi.",
  },
  {
    icon: Clock,
    title: "Você tem 180 dias para solicitar o reembolso do valor pago",
    description: "Comprar livremente e devolver a qualquer momento. Sem qualquer justificativa.",
  },
  {
    icon: MessageCircle,
    title: "Aprovado pelos pais",
    description: "61.106 consumidores satisfeitos.",
  },
  {
    icon: CreditCard,
    title: "Métodos de pagamento",
    description: "Veja todas as formas de pagamento.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted flex items-center justify-center">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
