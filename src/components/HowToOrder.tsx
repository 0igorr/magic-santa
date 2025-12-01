import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Escolha o Roteiro",
    description: "Selecione o modelo de vídeo perfeito para surpreender seu filho"
  },
  {
    number: "2",
    title: "Personalize",
    description: "Adicione o nome, foto e detalhes especiais em apenas 5 minutos"
  },
  {
    number: "3",
    title: "Encante!",
    description: "Receba o vídeo mágico e veja a alegria no rosto da criança"
  }
];

const HowToOrder = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Como pedir?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Em 3 passos simples, crie a magia do Natal
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-start gap-5 md:gap-8"
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <span className="font-heading text-5xl md:text-6xl lg:text-7xl text-accent/30 font-light leading-none">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="pt-2 md:pt-3">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-1 md:mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final flourish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10 md:mt-14"
        >
          <span className="font-heading text-2xl md:text-3xl text-accent italic">
            Feito!
          </span>
          <p className="text-muted-foreground text-sm mt-2">
            Simples assim ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToOrder;
