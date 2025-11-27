import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Play, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VoicePreview = () => {
  const [childName, setChildName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!childName.trim()) return;
    
    if (childName.length > 10) {
      toast({
        title: "Nombre muy largo",
        description: "El nombre debe tener máximo 10 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-santa-voice`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: childName }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate voice');
      }

      const data = await response.json();

      if (data?.audioContent) {
        // Convert base64 to audio URL
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setIsReady(true);
      }
    } catch (error) {
      console.error('Error generating voice:', error);
      toast({
        title: "Error al generar voz",
        description: "No se pudo generar la voz. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-accent/10 to-background">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 px-4">
            Escucha la Voz Mágica de Papá Noel
          </h2>
          <p className="text-base md:text-lg text-muted-foreground px-4">
            Escribe el nombre y prueba la magia ahora
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 md:p-12 shadow-gold border-2 border-accent/20"
        >
          <div className="space-y-5 md:space-y-6">
            <div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Escribe el nombre..."
                  value={childName}
                  onChange={(e) => setChildName(e.target.value.slice(0, 10))}
                  className="text-base md:text-lg py-5 md:py-6 rounded-xl border-2 border-accent/30 focus:border-accent"
                  disabled={isGenerating || isReady}
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {childName.length}/10 caracteres
                </p>
              </div>
            </div>

            {!isReady && !isGenerating && (
              <Button
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-primary/90 text-white py-5 md:py-6 rounded-xl text-base md:text-lg font-semibold"
                disabled={!childName.trim()}
              >
                <Mic className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Escuchar la Voz de Papá Noel
              </Button>
            )}

            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-16 bg-gradient-gold rounded-full"
                      animate={{
                        scaleY: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <p className="text-accent font-semibold">Generando voz mágica...</p>
              </div>
            )}

            {isReady && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="bg-gradient-magic rounded-xl p-6 border border-accent/30">
                  <p className="text-xl font-semibold text-accent mb-4">
                    ✨ ¡Nombre encontrado en la Lista del Polo Norte!
                  </p>
                  <Button
                    className="bg-accent hover:bg-accent/90 text-foreground font-semibold px-8 py-3 rounded-full"
                    onClick={handlePlay}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Escuchar Muestra
                  </Button>
                  <audio ref={audioRef} src={audioUrl || undefined} className="hidden" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Esta es solo una demostración. ¡El video completo tendrá mucha más magia!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoicePreview;
