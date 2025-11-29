import { Clock, Gift, Video, Star, Heart } from "lucide-react";

const trustItems = [
  {
    icon: Clock,
    text: "Entrega a partir de 10 minutos",
  },
  {
    icon: Gift,
    text: "Surpresa de natal perfeita",
  },
  {
    icon: Video,
    text: "Personalize seu vídeo em 5 minutos",
  },
  {
    icon: Star,
    text: "Nota 4,8 de 11.479 comentários",
  },
  {
    icon: Heart,
    text: "O presente perfeito para uma criança querida",
  },
];

const TrustCarousel = () => {
  return (
    <section className="py-8 bg-background overflow-hidden border-y border-accent/20">
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex animate-scroll-infinite">
            {/* Duplicate items multiple times for seamless infinite loop */}
            {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] px-6 flex flex-col items-center justify-center text-center"
                >
                  <Icon className="w-8 h-8 mb-3 text-accent" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustCarousel;
