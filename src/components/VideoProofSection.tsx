import { Star, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useState, useRef, useCallback, useEffect, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const videoProofs = [
  { id: 1, username: "Ana Clara Silva", vimeoId: "1144177328" },
  { id: 2, username: "Carlos Eduardo", vimeoId: "1144177393" },
  { id: 3, username: "Juliana Santos", vimeoId: "1144177403" },
  { id: 4, username: "Rafael Oliveira", vimeoId: "1144176944" },
  { id: 5, username: "Mariana Costa", vimeoId: "1144177130" },
];

// Pre-computed placeholder colors for faster initial render
const placeholderColors = [
  "bg-gradient-to-br from-primary/20 to-secondary/30",
  "bg-gradient-to-br from-accent/20 to-primary/30",
  "bg-gradient-to-br from-secondary/20 to-accent/30",
  "bg-gradient-to-br from-primary/30 to-accent/20",
  "bg-gradient-to-br from-accent/30 to-secondary/20",
];

const VideoProofSection = memo(() => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videoProofs[0] | null>(null);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<string>>(new Set());
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Intersection Observer for lazy loading thumbnails
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch thumbnails only when in view
  useEffect(() => {
    if (!isInView) return;

    const fetchThumbnails = async () => {
      const thumbs: Record<string, string> = {};
      
      // Fetch in parallel with error handling
      await Promise.allSettled(
        videoProofs.map(async (video) => {
          try {
            const response = await fetch(
              `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${video.vimeoId}&width=640`
            );
            if (response.ok) {
              const data = await response.json();
              let thumbUrl = data.thumbnail_url;
              thumbUrl = thumbUrl.replace(/_\d+x\d+/, '_480x854');
              thumbs[video.vimeoId] = thumbUrl;
            }
          } catch {
            // Silent fail - will show placeholder
          }
        })
      );
      
      setThumbnails(thumbs);
    };
    
    fetchThumbnails();
  }, [isInView]);

  const handleThumbnailLoad = useCallback((vimeoId: string) => {
    setLoadedThumbnails(prev => new Set(prev).add(vimeoId));
  }, []);

  const getFullVideoUrl = (vimeoId: string) => 
    `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=0&badge=0&autopause=0&controls=1&playsinline=1&dnt=1`;

  const handleVideoClick = useCallback((video: typeof videoProofs[0]) => {
    setSelectedVideo(video);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const handleCTA = useCallback(() => {
    const formSection = document.getElementById('formulario');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/formulario';
    }
    handleClose();
  }, [handleClose]);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-background overflow-hidden">
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
              {videoProofs.map((video, index) => (
                <div key={video.id} className="flex-none w-[200px] lg:w-[220px] xl:w-[240px]">
                  <div 
                    className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-secondary cursor-pointer group"
                    onClick={() => handleVideoClick(video)}
                  >
                    {/* Placeholder with gradient */}
                    <div className={`absolute inset-0 ${placeholderColors[index % placeholderColors.length]}`} />
                    
                    {/* Thumbnail Image - Lazy loaded */}
                    {thumbnails[video.vimeoId] && (
                      <img
                        src={thumbnails[video.vimeoId]}
                        alt={`Vídeo de ${video.username}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          loadedThumbnails.has(video.vimeoId) ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => handleThumbnailLoad(video.vimeoId)}
                      />
                    )}
                    
                    {/* Play button overlay */}
                    <button
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10"
                      aria-label={`Assistir vídeo de ${video.username}`}
                    >
                      <Play className="w-6 h-6 text-destructive-foreground ml-1" fill="currentColor" />
                    </button>
                    
                    {/* Username */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <span className="text-white text-xs lg:text-sm font-medium drop-shadow-lg line-clamp-1">
                        {video.username}
                      </span>
                    </div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              ))}
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

      {/* Video Popup Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-lg p-0 bg-card border-border overflow-hidden gap-0">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-50 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors border border-border"
            aria-label="Fechar vídeo"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          {selectedVideo && (
            <div className="flex flex-col">
              <div className="relative aspect-[9/16] w-full max-h-[60vh] bg-black">
                <iframe
                  src={getFullVideoUrl(selectedVideo.vimeoId)}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  title={`Vídeo de ${selectedVideo.username}`}
                  loading="lazy"
                />
              </div>

              <div className="p-4 bg-card">
                <p className="text-center text-sm text-muted-foreground mb-3">
                  Vídeo de <span className="font-semibold text-foreground">{selectedVideo.username}</span>
                </p>
                <Button 
                  onClick={handleCTA}
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6 text-base"
                >
                  🎅 Criar o vídeo mágico
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
});

VideoProofSection.displayName = "VideoProofSection";

export default VideoProofSection;