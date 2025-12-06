import { Star, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
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
  const [volumes, setVolumes] = useState<Record<number, number>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const scrollPrev = () => {
    setCurrentIndex(prev => prev === 0 ? videoProofs.length - 1 : prev - 1);
  };

  const scrollNext = () => {
    setCurrentIndex(prev => prev === videoProofs.length - 1 ? 0 : prev + 1);
  };

  const toggleVideo = async (id: number) => {
    const video = videoRefs.current[id];
    if (video) {
      if (playingVideos[id]) {
        video.pause();
        setPlayingVideos(prev => ({ ...prev, [id]: false }));
      } else {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach(key => {
          const otherId = parseInt(key);
          if (otherId !== id && videoRefs.current[otherId]) {
            videoRefs.current[otherId]?.pause();
            videoRefs.current[otherId]!.currentTime = 0;
            videoRefs.current[otherId]!.muted = true;
          }
        });
        setPlayingVideos({ [id]: true });
        
        // For mobile: start muted first, then unmute after play starts
        video.muted = true;
        video.volume = volumes[id] ?? 0.5;
        
        try {
          await video.play();
          // After play starts successfully, unmute
          video.muted = false;
        } catch (error) {
          console.error('Error playing video:', error);
          // Fallback: keep playing muted if autoplay with sound fails
          video.muted = true;
          video.play().catch(console.error);
        }
      }
    }
  };

  const handleVolumeChange = (id: number, value: number) => {
    const video = videoRefs.current[id];
    if (video) {
      video.volume = value;
      video.muted = value === 0;
    }
    setVolumes(prev => ({ ...prev, [id]: value }));
  };

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      if (video.volume > 0) {
        handleVolumeChange(id, 0);
      } else {
        handleVolumeChange(id, 0.5);
      }
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

  const VolumeControl = ({ videoId }: { videoId: number }) => {
    const volume = volumes[videoId] ?? 0.5;
    
    return (
      <div 
        className="absolute bottom-12 left-2 right-2 flex items-center gap-2 bg-black/60 rounded-full px-3 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={(e) => toggleMute(videoId, e)} className="text-white">
          {volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => handleVolumeChange(videoId, parseFloat(e.target.value))}
          className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
        />
      </div>
    );
  };

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
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                    preload="auto"
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
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    playsInline
                    preload="auto"
                  />
                  
                  {/* Play/Pause Button */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    {playingVideos[videoProofs[visibleVideos.current].id] ? (
                      <Pause className="w-6 h-6 text-destructive-foreground fill-destructive-foreground" />
                    ) : (
                      <Play className="w-6 h-6 text-destructive-foreground fill-destructive-foreground ml-1" />
                    )}
                  </button>
                  
                  {/* Volume Control */}
                  {playingVideos[videoProofs[visibleVideos.current].id] && (
                    <VolumeControl videoId={videoProofs[visibleVideos.current].id} />
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
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                    preload="auto"
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
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  playsInline
                  preload="auto"
                />
                
                {/* Play/Pause Button */}
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {playingVideos[video.id] ? (
                    <Pause className="w-5 h-5 lg:w-6 lg:h-6 text-destructive-foreground fill-destructive-foreground" />
                  ) : (
                    <Play className="w-5 h-5 lg:w-6 lg:h-6 text-destructive-foreground fill-destructive-foreground ml-1" />
                  )}
                </button>
                
                {/* Volume Control */}
                {playingVideos[video.id] && (
                  <VolumeControl videoId={video.id} />
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
