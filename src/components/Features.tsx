import { motion } from "framer-motion";
import { User, BookOpen, GraduationCap, Heart } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Chama pelo nome",
    highlight: "e apelido carinhoso",
    description: "O Papai Noel fala o nome verdadeiro e aquele apelido especial que só a família conhece",
  },
  {
    icon: BookOpen,
    title: "Mostra a foto",
    highlight: "no livro mágico",
    description: "A foto da criança aparece magicamente nas páginas do livro encantado do Noel",
  },
  {
    icon: GraduationCap,
    title: "Sabe a idade",
    highlight: "e a série escolar",
    description: "Detalhes personalizados que provam que o Papai Noel conhece tudo sobre seu filho",
  },
  {
    icon: Heart,
    title: "Deixa uma mensagem",
    highlight: "de carinho",
    description: "Palavras especiais de motivação e elogio personalizadas para encantar",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
            Personalização completa
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mb-4">
            O que o Papai Noel faz<br className="hidden sm:block" /> no seu vídeo?
          </h2>
        </motion.div>

        {/* Features List */}
        <div className="max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-5 md:gap-6 py-6 md:py-8 border-b border-secondary-foreground/10 last:border-b-0"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-heading text-lg md:text-xl text-secondary-foreground mb-1">
                  {feature.title}{" "}
                  <span className="text-accent">{feature.highlight}</span>
                </h3>
                <p className="text-secondary-foreground/70 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
