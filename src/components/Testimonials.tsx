import { motion } from "framer-motion";
import { Star } from "lucide-react";
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

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-secondary text-white overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Quem Fez, Se Emocionou ❤️
          </h2>
          <p className="text-lg text-white/80">
            Mais de 10.000 famílias já viveram essa magia
          </p>
        </motion.div>

        {/* Infinite Scroll Marquee */}
        <div className="relative">
          <div className="flex animate-[scroll_30s_linear_infinite] hover:pause">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-80 mx-4 p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-accent font-semibold">
                  — {testimonial.name}
                </p>
              </Card>
            ))}
          </div>
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
