import { Clock, Gift, Video, Star, Heart } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 35, // 700ms / 20 = 35 (Embla uses a different scale)
      align: "start",
      slidesToScroll: 1,
      skipSnaps: false,
    },
    []
  );

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    
    const play = () => {
      emblaApi.scrollNext();
    };

    const interval = setInterval(play, 4500); // 4.5 seconds between slides

    // Pause on hover/touch
    const container = emblaApi.rootNode();
    
    const pause = () => clearInterval(interval);
    const resume = () => {
      clearInterval(interval);
      const newInterval = setInterval(play, 4500);
      return newInterval;
    };

    let currentInterval = interval;
    
    container.addEventListener('mouseenter', pause);
    container.addEventListener('touchstart', pause);
    container.addEventListener('mouseleave', () => {
      currentInterval = resume();
    });
    container.addEventListener('touchend', () => {
      currentInterval = resume();
    });

    return () => {
      clearInterval(interval);
      clearInterval(currentInterval);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchend', resume);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    autoplay();
  }, [emblaApi, autoplay]);

  return (
    <section className="py-8 bg-background overflow-hidden border-y border-accent/20">
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex" style={{ transition: 'transform 0.7s ease-in-out' }}>
            {/* Triple the items for smooth infinite loop */}
            {[...trustItems, ...trustItems, ...trustItems].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[50vw] px-4 flex flex-col items-center justify-center text-center"
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
