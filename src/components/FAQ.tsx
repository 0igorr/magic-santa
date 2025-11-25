import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o vídeo personalizado?",
    answer:
      "Você preenche um formulário simples com as informações da criança (nome, idade, foto). Nossa equipe cria um vídeo único onde o Papai Noel interage com essas informações de forma mágica e realista.",
  },
  {
    question: "Quanto tempo demora para receber o vídeo?",
    answer:
      "Entregamos o vídeo em até 24 horas após a confirmação do pagamento. Em datas próximas ao Natal, pode levar até 48h devido à alta demanda.",
  },
  {
    question: "O vídeo funciona para qualquer idade?",
    answer:
      "Sim! Criamos vídeos personalizados para crianças de 2 a 12 anos. Cada mensagem é adaptada conforme a idade da criança.",
  },
  {
    question: "Posso baixar o vídeo?",
    answer:
      "Sim! O vídeo é seu para sempre. Você pode baixar, compartilhar no WhatsApp, projetar na TV ou guardar como lembrança.",
  },
  {
    question: "É seguro fornecer a foto do meu filho?",
    answer:
      "Absolutamente! Todas as informações são tratadas com total segurança e privacidade. Os dados são usados apenas para criar o vídeo e depois são deletados.",
  },
  {
    question: "Posso pedir reembolso?",
    answer:
      "Sim! Se não ficar satisfeito com o vídeo, oferecemos reembolso integral em até 7 dias após a entrega.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa saber sobre o vídeo mágico
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-accent/20 rounded-lg px-6 bg-card shadow-card hover:shadow-gold transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
