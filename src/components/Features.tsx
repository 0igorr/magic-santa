import { motion } from "framer-motion";
import { User, Image, Calendar, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: User,
    title: "Fala o Nome e Apelido",
    description: "O Papai Noel chama seu filho pelo nome verdadeiro e apelido carinhoso",
  },
  {
    icon: Image,
    title: "Mostra a Foto no Livro Mágico",
    description: "A foto da criança aparece magicamente no livro especial do Noel",
  },
  {
    icon: Calendar,
    title: "Comenta a Idade e Série Escolar",
    description: "Detalhes personalizados que provam que o Papai Noel conhece tudo",
  },
  {
    icon: Star,
    title: "Mensagem de Incentivo ou Elogio",
    description: "Palavras especiais de motivação personalizadas para seu filho",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            O Que O Papai Noel Vai Fazer?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada vídeo é único e feito especialmente para seu filho
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 md:p-8 hover:shadow-gold transition-all duration-300 border-2 border-accent/10 hover:border-accent/30 bg-card h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
