import { motion } from "framer-motion";
import { Star, Download, Clock, MessageCircle, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Maria S.",
    text: "A reação do Pedro foi impagável! Chorou de emoção ao ver o Papai Noel falando o nome dele.",
    rating: 5,
  },
  {
    name: "João P.",
    text: "Parece filme de cinema, muito realista. Minha filha assistiu 10 vezes no mesmo dia!",
    rating: 5,
  },
  {
    name: "Ana L.",
    text: "Melhor presente de Natal que já dei. A qualidade é incrível e o atendimento perfeito.",
    rating: 5,
  },
  {
    name: "Carlos M.",
    text: "Meu filho de 6 anos acreditou completamente. A magia do Natal voltou pra nossa casa!",
    rating: 5,
  },
  {
    name: "Fernanda R.",
    text: "Recebi em menos de 24h. Qualidade cinematográfica, recomendo muito!",
    rating: 5,
  },
];

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

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 md:py-20 px-4 bg-secondary text-white overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Quem Fez, Se Emocionou ❤️
          </h2>
          <p className="text-base md:text-lg text-white/80">
            Mais de 10.000 famílias já viveram essa magia
          </p>
        </motion.div>

        {/* Infinite Scroll Marquee */}
        <div className="relative">
          <div className="flex animate-[scroll_30s_linear_infinite] hover:pause">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-72 md:w-80 mx-3 md:mx-4 p-5 md:p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="flex gap-1 mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                  "{testimonial.text}"
                </p>
                <p className="text-accent font-semibold text-sm md:text-base">
                  — {testimonial.name}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-20 space-y-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
