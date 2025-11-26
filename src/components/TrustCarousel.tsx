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
      dragFree: false,
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    let autoplayInterval: NodeJS.Timeout;

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        emblaApi.scrollNext();
      }, 4500); // 4.5 seconds between slides
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    // Start autoplay immediately
    startAutoplay();

    // Pause only during active drag
    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('pointerUp', startAutoplay);

    return () => {
      stopAutoplay();
      emblaApi.off('pointerDown', stopAutoplay);
      emblaApi.off('pointerUp', startAutoplay);
    };
  }, [emblaApi]);

  return (
    <section className="py-8 bg-background overflow-hidden border-y border-accent/20">
      <div className="relative">
        <div 
          ref={emblaRef} 
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ 
            touchAction: 'pan-y',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <div className="flex" style={{ transition: 'transform 0.7s ease-in-out' }}>
            {/* Triple the items for smooth infinite loop */}
            {[...trustItems, ...trustItems, ...trustItems].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[50vw] px-4 flex flex-col items-center justify-center text-center pointer-events-none"
                  onClick={(e) => e.preventDefault()}
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
