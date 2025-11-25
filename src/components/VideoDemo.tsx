import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VideoDemo = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Veja Como Fica o Vídeo Mágico
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Um exemplo real de como seu filho vai se emocionar
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-accent shadow-gold">
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center p-4">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-accent fill-accent" />
                </div>
                <p className="text-white text-base md:text-xl font-semibold px-4">
                  Clique para assistir o exemplo
                </p>
              </div>
            </div>
            
            {/* Decorative Corner Elements */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-accent rounded-tl-lg" />
            <div className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-accent rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 md:border-b-4 md:border-l-4 border-accent rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 md:border-b-4 md:border-r-4 border-accent rounded-br-lg" />
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-gold opacity-20 blur-xl -z-10 group-hover:opacity-30 transition-opacity duration-300" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6 md:mt-8 text-sm md:text-base text-muted-foreground px-4"
        >
          Vídeo em Full HD, pronto para compartilhar ou projetar na TV
        </motion.p>
      </div>
    </section>
  );
};

export default VideoDemo;
