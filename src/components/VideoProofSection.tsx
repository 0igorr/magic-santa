import { Star, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const videoProofs = [
  {
    id: 1,
    username: "Ana Clara Silva",
    video: "/videos/prova-1.mp4"
  },
  {
    id: 2,
    username: "Carlos Eduardo",
    video: "/videos/prova-2.mp4"
  },
  {
    id: 3,
    username: "Juliana Santos",
    video: "/videos/prova-3.mp4"
  },
  {
    id: 4,
    username: "Rafael Oliveira",
    video: "/videos/prova-4.mp4"
  },
  {
    id: 5,
    username: "Mariana Costa",
    video: "/videos/prova-5.mp4"
  }
];

const VideoProofSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [playingVideos, setPlayingVideos] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const scrollPrev = () => {
    setCurrentIndex(prev => prev === 0 ? videoProofs.length - 1 : prev - 1);
  };

  const scrollNext = () => {
    setCurrentIndex(prev => prev === videoProofs.length - 1 ? 0 : prev + 1);
  };

  const toggleVideo = (id: number) => {
    const video = videoRefs.current[id];
    if (video) {
      if (playingVideos[id]) {
        video.pause();
      } else {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach(key => {
          const otherId = parseInt(key);
          if (otherId !== id && videoRefs.current[otherId]) {
            videoRefs.current[otherId]?.pause();
          }
        });
        setPlayingVideos({});
        video.play();
      }
      setPlayingVideos(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const getVisibleVideos = () => {
    const prev = currentIndex === 0 ? videoProofs.length - 1 : currentIndex - 1;
    const next = currentIndex === videoProofs.length - 1 ? 0 : currentIndex + 1;
    return {
      prev,
      current: currentIndex,
      next
    };
  };

  const visibleVideos = getVisibleVideos();

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            O presente que ficará na memória de quem você mais ama
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

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden">
            <div className="flex items-center justify-center gap-3">
              {/* Previous Video */}
              <div className="w-[200px] flex-shrink-0 -ml-[160px]">
                <div className="relative rounded-2xl overflow-hidden aspect-[9/16]">
                  <video
                    ref={el => videoRefs.current[videoProofs[visibleVideos.prev].id] = el}
                    src={videoProofs[visibleVideos.prev].video}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Current Video */}
              <div className="relative w-[200px] flex-shrink-0">
                <div 
                  className="relative rounded-2xl overflow-hidden aspect-[9/16] cursor-pointer"
                  onClick={() => toggleVideo(videoProofs[visibleVideos.current].id)}
                >
                  <video
                    ref={el => videoRefs.current[videoProofs[visibleVideos.current].id] = el}
                    src={videoProofs[visibleVideos.current].video}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                  />
                  
                  {/* Play/Pause Button */}
                  {!playingVideos[videoProofs[visibleVideos.current].id] && (
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-destructive-foreground fill-destructive-foreground ml-1" />
                    </button>
                  )}
                  
                  {/* Username */}
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-lg">
                    {videoProofs[visibleVideos.current].username}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Next Video */}
              <div className="w-[200px] flex-shrink-0 -mr-[160px]">
                <div className="relative rounded-2xl overflow-hidden aspect-[9/16]">
                  <video
                    ref={el => videoRefs.current[videoProofs[visibleVideos.next].id] = el}
                    src={videoProofs[visibleVideos.next].video}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: All 5 videos visible */}
          <div className="hidden md:flex justify-center gap-3 lg:gap-4 px-16">
            {videoProofs.map(video => (
              <div
                key={video.id}
                className="relative rounded-2xl overflow-hidden aspect-[9/16] w-[180px] lg:w-[200px] xl:w-[220px] group cursor-pointer flex-shrink-0"
                onClick={() => toggleVideo(video.id)}
              >
                <video
                  ref={el => videoRefs.current[video.id] = el}
                  src={video.video}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  muted
                />
                
                {/* Play/Pause Button */}
                {!playingVideos[video.id] && (
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 lg:w-6 lg:h-6 text-destructive-foreground fill-destructive-foreground ml-1" />
                  </button>
                )}
                
                {/* Username */}
                <div className="absolute bottom-3 left-3 text-white text-xs lg:text-sm font-medium drop-shadow-lg">
                  {video.username}
                </div>
                
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
