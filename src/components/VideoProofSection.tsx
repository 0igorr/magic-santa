import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const videoProofs = [
  { id: 1, username: "@ania.skalska.firlej", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
  { id: 2, username: "@mostecjuszka", thumbnail: "/lovable-uploads/2139d4c4-0f1d-4d49-8f97-10254d5f96fc.webp" },
  { id: 3, username: "@ally_an_tcz", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
  { id: 4, username: "@aurelia_and_laura", thumbnail: "/lovable-uploads/2139d4c4-0f1d-4d49-8f97-10254d5f96fc.webp" },
  { id: 5, username: "@moze.kiedys", thumbnail: "/lovable-uploads/4f9cc7e5-9b01-47c1-8598-f6d1bdf372d9.webp" },
];

const VideoProofSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at center video
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videoProofs.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev === videoProofs.length - 1 ? 0 : prev + 1));
  };

  // Get visible videos for mobile (current + adjacent)
  const getVisibleVideos = () => {
    const prev = currentIndex === 0 ? videoProofs.length - 1 : currentIndex - 1;
    const next = currentIndex === videoProofs.length - 1 ? 0 : currentIndex + 1;
    return { prev, current: currentIndex, next };
  };

  const visibleVideos = getVisibleVideos();

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
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors border border-border"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors border border-border"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Mobile Carousel - Center with peek */}
          <div className="md:hidden overflow-hidden px-10">
            <div className="relative flex items-center justify-center">
              {/* Previous Video (Peek Left) */}
              <div className="absolute left-0 w-16 h-[400px] -translate-x-1/2 opacity-70 scale-95">
                <div className="relative rounded-2xl overflow-hidden h-full">
                  <img
                    src={videoProofs[visibleVideos.prev].thumbnail}
                    alt={`Vídeo de ${videoProofs[visibleVideos.prev].username}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Current Video (Center) */}
              <div className="relative w-64 flex-shrink-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[9/16]">
                  <img
                    src={videoProofs[visibleVideos.current].thumbnail}
                    alt={`Vídeo de ${videoProofs[visibleVideos.current].username}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Button */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-destructive-foreground fill-destructive-foreground ml-1" />
                  </button>
                  
                  {/* Username */}
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-lg">
                    {videoProofs[visibleVideos.current].username}
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Next Video (Peek Right) */}
              <div className="absolute right-0 w-16 h-[400px] translate-x-1/2 opacity-70 scale-95">
                <div className="relative rounded-2xl overflow-hidden h-full">
                  <img
                    src={videoProofs[visibleVideos.next].thumbnail}
                    alt={`Vídeo de ${videoProofs[visibleVideos.next].username}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: All 5 videos visible */}
          <div className="hidden md:flex justify-center gap-3 lg:gap-4 px-16">
            {videoProofs.map((video) => (
              <div
                key={video.id}
                className="relative rounded-2xl overflow-hidden aspect-[9/16] w-[180px] lg:w-[200px] xl:w-[220px] group cursor-pointer flex-shrink-0"
              >
                <img
                  src={video.thumbnail}
                  alt={`Vídeo de ${video.username}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button */}
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 lg:w-6 lg:h-6 text-destructive-foreground fill-destructive-foreground ml-1" />
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
    </section>
  );
};

export default VideoProofSection;
