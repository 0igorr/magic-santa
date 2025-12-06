import { Star, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Video data with Vimeo IDs
const videoProofs = [
  { id: 1, username: "Ana Clara Silva", vimeoId: "1144177328" },
  { id: 2, username: "Carlos Eduardo", vimeoId: "1144177393" },
  { id: 3, username: "Juliana Santos", vimeoId: "1144177403" },
  { id: 4, username: "Rafael Oliveira", vimeoId: "1144176944" },
  { id: 5, username: "Mariana Costa", vimeoId: "1144177130" },
];

// Vimeo Player API type
declare global {
  interface Window {
    Vimeo?: {
      Player: new (element: HTMLIFrameElement, options?: object) => VimeoPlayer;
    };
  }
}

interface VimeoPlayer {
  setVolume: (volume: number) => Promise<void>;
  getVolume: () => Promise<number>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  on: (event: string, callback: (data?: any) => void) => void;
  ready: () => Promise<void>;
  destroy: () => void;
}

const VideoProofSection = () => {
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0, 1, 2])); // Preload first 3
  const [isApiReady, setIsApiReady] = useState(false);
  const playersRef = useRef<Map<number, VimeoPlayer>>(new Map());
  const iframeRefs = useRef<Map<number, HTMLIFrameElement>>(new Map());
  
  // Autoplay plugin config
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // Embla carousel with infinite loop
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    [autoplayPlugin.current]
  );

  // Load Vimeo Player API once
  useEffect(() => {
    if (window.Vimeo) {
      setIsApiReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = () => setIsApiReady(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup players on unmount
      playersRef.current.forEach((player) => {
        try {
          player.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
      });
    };
  }, []);

  // Initialize players when API is ready and iframes are loaded
  const initializePlayer = useCallback((index: number, iframe: HTMLIFrameElement) => {
    if (!isApiReady || !window.Vimeo || playersRef.current.has(index)) return;

    try {
      const player = new window.Vimeo.Player(iframe);
      playersRef.current.set(index, player);
      
      player.ready().then(() => {
        // Ensure video starts muted
        player.setVolume(0);
      }).catch(() => {
        // Ignore ready errors
      });
    } catch (e) {
      console.warn("Failed to initialize Vimeo player:", e);
    }
  }, [isApiReady]);

  // Lazy load videos based on carousel position
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      const totalSlides = videoProofs.length;
      
      // Preload current, prev, and next slides
      const indicesToLoad = [
        (selectedIndex - 1 + totalSlides) % totalSlides,
        selectedIndex,
        (selectedIndex + 1) % totalSlides,
      ];

      setLoadedVideos((prev) => {
        const newSet = new Set(prev);
        indicesToLoad.forEach((i) => newSet.add(i));
        return newSet;
      });
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Initial load

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Toggle audio using Vimeo API (no iframe reload)
  const toggleAudio = useCallback(async (index: number) => {
    const player = playersRef.current.get(index);
    if (!player) return;

    try {
      if (activeAudioId === index) {
        // Mute this video
        await player.setVolume(0);
        setActiveAudioId(null);
      } else {
        // Mute all other videos first
        for (const [idx, p] of playersRef.current.entries()) {
          if (idx !== index) {
            await p.setVolume(0);
          }
        }
        // Unmute and play this video
        await player.setVolume(1);
        await player.play();
        setActiveAudioId(index);
      }
    } catch (e) {
      console.warn("Audio toggle failed:", e);
    }
  }, [activeAudioId]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Build iframe URL with proper params for autoplay muted
  const getVimeoUrl = (vimeoId: string) => {
    const params = new URLSearchParams({
      autoplay: "1",
      loop: "1",
      muted: "1",
      background: "0",
      badge: "0",
      autopause: "0",
      controls: "0",
      playsinline: "1",
      dnt: "1",
      quality: "auto",
    });
    return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
  };

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            O presente que ficará na memória de quem você mais ama
          </h2>
          
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
          </div>
          
          <div className="inline-block bg-accent/20 px-6 py-3 rounded-full">
            <p className="text-foreground text-sm md:text-base">
              Junte-se a <span className="font-bold">450.000</span> clientes sorridentes
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors border border-border"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors border border-border"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden px-8 md:px-16" ref={emblaRef}>
            <div className="flex gap-3 lg:gap-4">
              {videoProofs.map((video, index) => {
                const isLoaded = loadedVideos.has(index);
                const hasAudio = activeAudioId === index;

                return (
                  <div
                    key={video.id}
                    className="flex-none w-[200px] lg:w-[220px] xl:w-[240px]"
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-muted">
                      {/* Lazy loaded iframe */}
                      {isLoaded ? (
                        <iframe
                          ref={(el) => {
                            if (el) {
                              iframeRefs.current.set(index, el);
                              initializePlayer(index, el);
                            }
                          }}
                          src={getVimeoUrl(video.vimeoId)}
                          className="absolute inset-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                          referrerPolicy="strict-origin-when-cross-origin"
                          title={`Vídeo de ${video.username}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-muted-foreground/20" />
                        </div>
                      )}
                      
                      {/* Audio Toggle Button - Bottom Right */}
                      <button
                        onClick={() => toggleAudio(index)}
                        className={`absolute bottom-12 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                          hasAudio 
                            ? "bg-destructive hover:bg-destructive/90" 
                            : "bg-background/90 hover:bg-background border border-border"
                        }`}
                        aria-label={hasAudio ? "Desativar som" : "Ativar som"}
                        aria-pressed={hasAudio}
                      >
                        {hasAudio ? (
                          <Volume2 className="w-5 h-5 text-destructive-foreground" />
                        ) : (
                          <VolumeX className="w-5 h-5 text-foreground" />
                        )}
                      </button>
                      
                      {/* Username Badge */}
                      <div className="absolute bottom-3 left-3 right-14 z-10">
                        <span className="text-white text-xs lg:text-sm font-medium drop-shadow-lg line-clamp-1">
                          {video.username}
                        </span>
                      </div>
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {videoProofs.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  loadedVideos.has(index) && emblaApi?.selectedScrollSnap() === index
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para vídeo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoProofSection;
