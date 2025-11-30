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
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Videos Container */}
          <div className="overflow-hidden px-12 md:px-4">
            {/* Mobile: Single video carousel */}
            <div className="md:hidden">
              <div className="relative">
                <div 
                  ref={containerRef}
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {videoProofs.map((video) => (
                    <div
                      key={video.id}
                      className="relative flex-shrink-0 w-full px-2"
                    >
                      <div className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-[500px] mx-auto">
                        <img
                          src={video.thumbnail}
                          alt={`Vídeo de ${video.username}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Play Button */}
                        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                        </button>
                        
                        {/* Username */}
                        <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-lg">
                          {video.username}
                        </div>
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: All videos visible */}
            <div className="hidden md:grid md:grid-cols-5 gap-3 lg:gap-4">
              {videoProofs.map((video) => (
                <div
                  key={video.id}
                  className="relative rounded-2xl overflow-hidden aspect-[9/16] group cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={`Vídeo de ${video.username}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Button */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-background rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 lg:w-6 lg:h-6 text-primary fill-primary ml-1" />
                  </button>
                  
                  {/* Username */}
                  <div className="absolute bottom-3 left-3 text-white text-xs lg:text-sm font-medium drop-shadow-lg">
                    {video.username}
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoProofSection;
