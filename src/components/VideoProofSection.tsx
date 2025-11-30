import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useRef } from "react";

const videoProofs = [
  { id: 1, username: "@maria_santos", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
  { id: 2, username: "@joao_silva", thumbnail: "/lovable-uploads/2139d4c4-0f1d-4d49-8f97-10254d5f96fc.webp" },
  { id: 3, username: "@ana_costa", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
  { id: 4, username: "@pedro_lima", thumbnail: "/lovable-uploads/2139d4c4-0f1d-4d49-8f97-10254d5f96fc.webp" },
  { id: 5, username: "@lucia_pereira", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
];

const VideoProofSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videoProofs.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev === videoProofs.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Leve a<br />
            alegria do Natal para<br />
            quem você ama
          </h2>
          
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
          </div>
          
          {/* Badge */}
          <div className="inline-block bg-accent/20 px-6 py-3 rounded-full">
            <p className="text-foreground text-sm md:text-base">
              Junte-se a <span className="font-bold">450.000</span> clientes sorridentes
            </p>
          </div>
        </div>

        {/* Video Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Videos Container */}
          <div 
            ref={containerRef}
            className="flex items-center justify-center gap-3 md:gap-4 overflow-hidden px-12 md:px-16"
          >
            {videoProofs.map((video, index) => {
              const position = index - currentIndex;
              const isCenter = position === 0;
              const isVisible = Math.abs(position) <= 1 || 
                (currentIndex === 0 && index === videoProofs.length - 1) ||
                (currentIndex === videoProofs.length - 1 && index === 0);
              
              // Adjust position for wrap-around
              let adjustedPosition = position;
              if (currentIndex === 0 && index === videoProofs.length - 1) {
                adjustedPosition = -1;
              } else if (currentIndex === videoProofs.length - 1 && index === 0) {
                adjustedPosition = 1;
              }

              return (
                <div
                  key={video.id}
                  className={`relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 ${
                    isCenter 
                      ? "w-64 md:w-80 h-[400px] md:h-[500px] scale-100 opacity-100 z-10" 
                      : "w-16 md:w-24 h-[350px] md:h-[450px] scale-95 opacity-60"
                  } ${!isVisible ? "hidden md:block" : ""}`}
                  style={{
                    transform: `translateX(${adjustedPosition * 10}px)`,
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Vídeo de ${video.username}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Button - Only on center */}
                  {isCenter && (
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 md:w-7 md:h-7 text-primary fill-primary ml-1" />
                    </button>
                  )}
                  
                  {/* Username - Only on center */}
                  {isCenter && (
                    <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-lg">
                      {video.username}
                    </div>
                  )}
                  
                  {/* Gradient overlay */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoProofSection;
