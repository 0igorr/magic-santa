import { Star, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const videoProofs = [
  { id: 1, username: "Ana Clara Silva", vimeoId: "1144177328" },
  { id: 2, username: "Carlos Eduardo", vimeoId: "1144177393" },
  { id: 3, username: "Juliana Santos", vimeoId: "1144177403" },
  { id: 4, username: "Rafael Oliveira", vimeoId: "1144176944" },
  { id: 5, username: "Mariana Costa", vimeoId: "1144177130" },
];

const VideoProofSection = () => {
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
  const iframeRefs = useRef<Map<number, HTMLIFrameElement>>(new Map());
  
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [autoplayPlugin.current]
  );

  // Simple postMessage to control Vimeo volume - no API loading needed
  const setVimeoVolume = useCallback((iframe: HTMLIFrameElement | null, volume: number) => {
    if (!iframe?.contentWindow) return;
    const data = JSON.stringify({ method: "setVolume", value: volume });
    iframe.contentWindow.postMessage(data, "*");
  }, []);

  const toggleAudio = useCallback((index: number) => {
    if (activeAudioId === index) {
      // Mute this video
      setVimeoVolume(iframeRefs.current.get(index) || null, 0);
      setActiveAudioId(null);
    } else {
      // Mute all others
      iframeRefs.current.forEach((iframe, idx) => {
        if (idx !== index) setVimeoVolume(iframe, 0);
      });
      // Unmute selected
      setVimeoVolume(iframeRefs.current.get(index) || null, 1);
      setActiveAudioId(index);
    }
  }, [activeAudioId, setVimeoVolume]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Static URL - never changes, prevents reloads
  const getVimeoUrl = (vimeoId: string, id: number) => 
    `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=0&badge=0&autopause=0&controls=0&playsinline=1&dnt=1&player_id=${id}`;

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
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

        <div className="relative max-w-7xl mx-auto">
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

          <div className="overflow-hidden px-8 md:px-16" ref={emblaRef}>
            <div className="flex gap-3 lg:gap-4">
              {videoProofs.map((video, index) => {
                const hasAudio = activeAudioId === index;

                return (
                  <div key={video.id} className="flex-none w-[200px] lg:w-[220px] xl:w-[240px]">
                    <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-muted">
                      <iframe
                        ref={(el) => {
                          if (el) iframeRefs.current.set(index, el);
                        }}
                        src={getVimeoUrl(video.vimeoId, video.id)}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={`Vídeo de ${video.username}`}
                      />
                      
                      <button
                        onClick={() => toggleAudio(index)}
                        className={`absolute bottom-12 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                          hasAudio 
                            ? "bg-destructive hover:bg-destructive/90" 
                            : "bg-background/90 hover:bg-background border border-border"
                        }`}
                        aria-label={hasAudio ? "Desativar som" : "Ativar som"}
                      >
                        {hasAudio ? (
                          <Volume2 className="w-5 h-5 text-destructive-foreground" />
                        ) : (
                          <VolumeX className="w-5 h-5 text-foreground" />
                        )}
                      </button>
                      
                      <div className="absolute bottom-3 left-3 right-14 z-10">
                        <span className="text-white text-xs lg:text-sm font-medium drop-shadow-lg line-clamp-1">
                          {video.username}
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {videoProofs.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-all"
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
