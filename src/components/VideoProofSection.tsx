import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useRef, useCallback } from "react";

const videoProofs = [{
  id: 1,
  username: "Ana Clara Silva",
  vimeoId: "1144177328"
}, {
  id: 2,
  username: "Carlos Eduardo",
  vimeoId: "1144177393"
}, {
  id: 3,
  username: "Juliana Santos",
  vimeoId: "1144177403"
}, {
  id: 4,
  username: "Rafael Oliveira",
  vimeoId: "1144176944"
}, {
  id: 5,
  username: "Mariana Costa",
  vimeoId: "1144177130"
}];

const VideoProofSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
  const [volumes, setVolumes] = useState<Record<number, number>>(() => 
    videoProofs.reduce((acc, v) => ({ ...acc, [v.id]: 0.7 }), {})
  );
  const [showVolumeControl, setShowVolumeControl] = useState<number | null>(null);
  const iframeRefs = useRef<Record<number, HTMLIFrameElement | null>>({});

  // Vimeo postMessage format
  const sendVimeoCommand = useCallback((iframe: HTMLIFrameElement | null, method: string, value?: any) => {
    if (!iframe?.contentWindow) return;
    const data: any = { method };
    if (value !== undefined) data.value = value;
    iframe.contentWindow.postMessage(JSON.stringify(data), '*');
  }, []);

  const scrollPrev = () => {
    setCurrentIndex(prev => prev === 0 ? videoProofs.length - 1 : prev - 1);
  };

  const scrollNext = () => {
    setCurrentIndex(prev => prev === videoProofs.length - 1 ? 0 : prev + 1);
  };

  const toggleAudio = (id: number) => {
    const iframe = iframeRefs.current[id];
    
    if (activeAudioId === id) {
      // Turn off audio
      sendVimeoCommand(iframe, 'setVolume', 0);
      setActiveAudioId(null);
      setShowVolumeControl(null);
    } else {
      // Mute all others first
      videoProofs.forEach(v => {
        if (v.id !== id) {
          sendVimeoCommand(iframeRefs.current[v.id], 'setVolume', 0);
        }
      });
      // Enable audio for this one
      sendVimeoCommand(iframe, 'setVolume', volumes[id] || 0.7);
      setActiveAudioId(id);
      setShowVolumeControl(id);
    }
  };

  const handleVolumeChange = (id: number, value: number) => {
    setVolumes(prev => ({ ...prev, [id]: value }));
    sendVimeoCommand(iframeRefs.current[id], 'setVolume', value);
    
    if (value > 0 && activeAudioId !== id) {
      // Mute others
      videoProofs.forEach(v => {
        if (v.id !== id) {
          sendVimeoCommand(iframeRefs.current[v.id], 'setVolume', 0);
        }
      });
      setActiveAudioId(id);
    } else if (value === 0) {
      setActiveAudioId(null);
      setShowVolumeControl(null);
    }
  };

  const getVisibleVideos = () => {
    const prev = currentIndex === 0 ? videoProofs.length - 1 : currentIndex - 1;
    const next = currentIndex === videoProofs.length - 1 ? 0 : currentIndex + 1;
    return { prev, current: currentIndex, next };
  };

  const visibleVideos = getVisibleVideos();

  const VideoCard = ({
    video,
    showControls = true
  }: {
    video: typeof videoProofs[0];
    showControls?: boolean;
  }) => {
    const isActive = activeAudioId === video.id;
    const volume = volumes[video.id] ?? 0.7;
    const showVolume = showVolumeControl === video.id;

    // Static URL - videos always autoplay muted, we control volume via postMessage
    const vimeoUrl = `https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&loop=1&muted=1&background=0&badge=0&autopause=0&player_id=${video.id}&app_id=58479&controls=0&playsinline=1&dnt=1`;
    
    return (
      <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-muted">
        <iframe
          ref={el => { iframeRefs.current[video.id] = el; }}
          src={vimeoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full pointer-events-none"
          title={video.username}
        />
        
        {/* Play Button - Always visible, always Play icon */}
        {showControls && (
          <button
            onClick={() => toggleAudio(video.id)}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10 ${
              isActive ? 'bg-destructive/80' : 'bg-destructive'
            }`}
          >
            <Play className={`w-6 h-6 text-destructive-foreground ${isActive ? 'opacity-70' : ''}`} />
          </button>
        )}
        
        {/* Volume Control - Bottom Right */}
        {showControls && showVolume && (
          <div 
            className="absolute bottom-12 right-3 z-20 animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-24 w-8 bg-black/80 rounded-full flex flex-col items-center justify-center py-2 backdrop-blur-sm border border-white/10">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={e => handleVolumeChange(video.id, parseFloat(e.target.value))}
                className="h-16 w-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [writing-mode:vertical-lr] [direction:rtl] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
          </div>
        )}
        
        {/* Username */}
        <div className="absolute bottom-3 left-3 text-white text-xs lg:text-sm font-medium drop-shadow-lg z-10">
          {video.username}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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
              <div className="w-[200px] flex-shrink-0 -ml-[160px]">
                <VideoCard video={videoProofs[visibleVideos.prev]} showControls={false} />
              </div>
              <div className="relative w-[200px] flex-shrink-0">
                <VideoCard video={videoProofs[visibleVideos.current]} showControls={true} />
              </div>
              <div className="w-[200px] flex-shrink-0 -mr-[160px]">
                <VideoCard video={videoProofs[visibleVideos.next]} showControls={false} />
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex justify-center gap-3 lg:gap-4 px-16">
            {videoProofs.map(video => (
              <div key={video.id} className="relative w-[180px] lg:w-[200px] xl:w-[220px] flex-shrink-0">
                <VideoCard video={video} showControls={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoProofSection;