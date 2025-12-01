import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Escolha",
    description: "Selecione o roteiro ideal",
  },
  {
    number: "2",
    title: "Personalize",
    description: "Nome, foto e mensagem",
  },
  {
    number: "3",
    title: "Encante",
    description: "Receba e surpreenda",
  },
];

const HowToOrder = () => {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Simple header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-accent font-semibold text-sm tracking-widest uppercase mb-12 md:mb-16"
        >
          Como funciona
        </motion.p>

        {/* Steps - horizontal layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center flex-1"
            >
              {/* Step content */}
              <div className="flex flex-col items-center text-center px-4 md:px-8">
                {/* Large number */}
                <span className="text-6xl md:text-7xl font-heading font-bold text-accent/20 leading-none mb-2">
                  {step.number}
                </span>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-1">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm md:text-base">
                  {step.description}
                </p>
              </div>

              {/* Connector - hidden on last item */}
              {index < steps.length - 1 && (
                <div className="hidden md:block w-16 lg:w-24 h-[2px] bg-gradient-to-r from-accent/40 to-accent/10 flex-shrink-0" />
              )}
              
              {/* Mobile connector */}
              {index < steps.length - 1 && (
                <div className="md:hidden w-[2px] h-8 bg-gradient-to-b from-accent/40 to-accent/10 my-2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 rounded-full font-bold text-base md:text-lg"
          >
            Começar agora
          </Button>
          <p className="text-muted-foreground text-xs md:text-sm mt-3">
            Pronto em 5 minutos
          </p>
        </motion.div>
      </div>
      
      {/* Accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
    </section>
  );
};

export default HowToOrder;
