import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

const videoProofs = [
  { id: 1, username: "@maria_santos", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
  { id: 2, username: "@joao_silva", thumbnail: "/lovable-uploads/2139d4c4-0f1d-4d49-8f97-10254d5f96fc.webp" },
  { id: 3, username: "@ana_costa", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
  { id: 4, username: "@pedro_lima", thumbnail: "/lovable-uploads/2139d4c4-0f1d-4d49-8f97-10254d5f96fc.webp" },
  { id: 5, username: "@lucia_pereira", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
];

const VideoProofSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getIndex = (offset: number) => {
    const newIndex = currentIndex + offset;
    const len = videoProofs.length;
    return ((newIndex % len) + len) % len;
  };

  const scrollPrev = () => {
    setCurrentIndex((prev) => getIndex(-1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => getIndex(1));
  };

  const prevIndex = getIndex(-1);
  const nextIndex = getIndex(1);

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
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
        <div className="relative flex items-center justify-center">
          {/* Navigation Arrow Left */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          
          {/* Navigation Arrow Right */}
          <button
            onClick={scrollNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Videos Container */}
          <div className="flex items-center justify-center w-full">
            {/* Left partial video */}
            <div className="relative flex-shrink-0 w-8 md:w-16 h-[400px] md:h-[500px] overflow-hidden rounded-l-2xl -mr-1">
              <img
                src={videoProofs[prevIndex].thumbnail}
                alt={`Vídeo de ${videoProofs[prevIndex].username}`}
                className="w-full h-full object-cover object-right opacity-70"
              />
            </div>

            {/* Center video (main) */}
            <div className="relative flex-shrink-0 w-[280px] md:w-[350px] h-[400px] md:h-[500px] rounded-2xl overflow-hidden z-10 shadow-2xl">
              <img
                src={videoProofs[currentIndex].thumbnail}
                alt={`Vídeo de ${videoProofs[currentIndex].username}`}
                className="w-full h-full object-cover"
              />
              
              {/* Play Button */}
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play className="w-6 h-6 md:w-7 md:h-7 text-primary fill-primary ml-1" />
              </button>
              
              {/* Username */}
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-lg">
                {videoProofs[currentIndex].username}
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right partial video */}
            <div className="relative flex-shrink-0 w-8 md:w-16 h-[400px] md:h-[500px] overflow-hidden rounded-r-2xl -ml-1">
              <img
                src={videoProofs[nextIndex].thumbnail}
                alt={`Vídeo de ${videoProofs[nextIndex].username}`}
                className="w-full h-full object-cover object-left opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoProofSection;
