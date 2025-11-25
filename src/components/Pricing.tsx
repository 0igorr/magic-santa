import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const benefits = [
  "Vídeo personalizado em Full HD",
  "Nome e apelido da criança",
  "Foto no livro mágico",
  "Idade e série escolar",
  "Mensagem de incentivo",
  "Entrega em até 24h",
  "Suporte dedicado",
];

const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 bg-secondary relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-accent text-foreground px-6 py-2 rounded-full font-bold text-sm mb-6 animate-bounce-subtle">
            🎁 OFERTA DE NATAL 🎁
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Garanta a Magia Agora
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Golden Ticket Card */}
          <div className="bg-gradient-to-br from-accent to-yellow-500 p-1 rounded-3xl shadow-gold">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-3xl md:text-4xl text-muted-foreground line-through">
                    R$ 69,90
                  </span>
                  <span className="text-5xl md:text-7xl font-bold text-primary">
                    R$ 29,90
                  </span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Mais de 57% de desconto
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white text-xl py-7 rounded-full shadow-button animate-pulse-glow font-bold uppercase tracking-wide"
              >
                Garantir Vídeo Agora
              </Button>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-3">
                  O Papai Noel sai para entrega em:
                </p>
                <div className="flex justify-center gap-4">
                  {[
                    { value: timeLeft.hours, label: "Horas" },
                    { value: timeLeft.minutes, label: "Min" },
                    { value: timeLeft.seconds, label: "Seg" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-primary text-white text-2xl md:text-3xl font-bold rounded-lg px-4 py-3 min-w-[70px]">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-gold opacity-30 blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
