import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Clock, MessageCircle, CreditCard } from "lucide-react";

const features = [
  { text: "Vídeo e ligação inéditos", highlight: "2025" },
  { text: "Personalização", highlight: "incomparável" },
  { text: "Qualidade", highlight: "cinematográfica" },
  { text: "Adicione seu", highlight: "próprio comentário" },
  { text: "Encomenda rápida: menos de", highlight: "5 minutos" },
  { text: "Entrega no seu e-mail em até", highlight: "2 horas" },
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

const VideoDemo = () => {
  return (
    <section className="relative">
      {/* Video Area - Black background */}
      <div className="relative bg-black aspect-video md:aspect-[21/9]">
        {/* Video placeholder - you'll replace this with actual video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/50 text-lg">Vídeo será inserido aqui</p>
        </div>
        
        {/* Volume button - top right */}
        <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Volume2 className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Content Area - Sage/green background */}
      <div className="bg-[#8B9D7C] text-white py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Title with large P */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Vídeo<br />
              do <span className="text-6xl md:text-7xl lg:text-8xl">P</span>apai Noel
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed max-w-2xl">
              Presenteie quem você ama com um vídeo único, com nome e foto. Crie memórias mágicas que aproximam e unem. O Papai Noel vai dizer o nome da pessoa, ver as fotos que você adicionou e até ler a mensagem que você escreveu.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  {/* Holly icon */}
                  <div className="flex-shrink-0 mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z" fill="#DC2626"/>
                      <path d="M7 13C8.10457 13 9 12.1046 9 11C9 9.89543 8.10457 9 7 9C5.89543 9 5 9.89543 5 11C5 12.1046 5.89543 13 7 13Z" fill="#DC2626"/>
                      <path d="M17 13C18.1046 13 19 12.1046 19 11C19 9.89543 18.1046 9 17 9C15.8954 9 15 9.89543 15 11C15 12.1046 15.8954 13 17 13Z" fill="#DC2626"/>
                      <path d="M8 7C8 7 9 5 11 5C11 5 10 3 8 3C6 3 5 5 5 7C5 7 6.5 6.5 8 7Z" fill="#16A34A"/>
                      <path d="M16 7C16 7 15 5 13 5C13 5 14 3 16 3C18 3 19 5 19 7C19 7 17.5 6.5 16 7Z" fill="#16A34A"/>
                      <path d="M12 9C12 9 13 7 12 5C12 5 11 7 12 9Z" fill="#16A34A"/>
                    </svg>
                  </div>
                  <p className="text-base md:text-lg">
                    {feature.text.split(feature.highlight)[0]}
                    <span className="font-bold">{feature.highlight}</span>
                    {feature.text.split(feature.highlight)[1]}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="space-y-6 pt-8">
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8"
            >
              <Button 
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg md:text-xl py-6 md:py-8 rounded-full font-bold shadow-xl"
              >
                Criar vídeo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
