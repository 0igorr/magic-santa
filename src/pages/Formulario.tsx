import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Volume2, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const steps = [
  { number: 1, title: "Dados do destinatário" },
  { number: 2, title: "Fotos" },
  { number: 3, title: "Upgrades" },
];

const Formulario = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [childName, setChildName] = useState("");
  const [gender, setGender] = useState("");
  const [behavior, setBehavior] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleGenerateVoice = async () => {
    if (!childName.trim()) {
      toast({
        title: "Nome necessário",
        description: "Digite o nome da criança primeiro",
        variant: "destructive"
      });
      return;
    }

    if (childName.length > 10) {
      toast({
        title: "Nome muito longo",
        description: "O nome deve ter máximo 10 caracteres",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-santa-voice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          text: childName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate voice');
      }

      const data = await response.json();
      if (data?.audioContent) {
        const audioBlob = new Blob([Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))], {
          type: 'audio/mpeg'
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Play automatically
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }, 100);

        toast({
          title: "Voz gerada!",
          description: "Ouça como o Papai Noel fala o nome",
        });
      }
    } catch (error) {
      console.error('Error generating voice:', error);
      toast({
        title: "Erro ao gerar voz",
        description: "Não foi possível gerar a voz. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-primary">
            Criar Vídeo Personalizado
          </h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Steps Progress */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: currentStep >= step.number ? 1 : 0.8,
                      opacity: currentStep >= step.number ? 1 : 0.5
                    }}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl transition-all ${
                      currentStep >= step.number
                        ? 'bg-primary text-white shadow-gold'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.number}
                  </motion.div>
                  <p className={`mt-2 text-xs md:text-sm font-medium text-center ${
                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 md:mx-4 bg-muted relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: currentStep > step.number ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-primary"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-2xl p-6 md:p-10 shadow-gold border-2 border-accent/20"
          >
            {currentStep === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {steps[0].number}
                  <sub className="text-lg">/2</sub> {steps[0].title}
                </h2>

                {/* Nome da Criança */}
                <div className="space-y-3">
                  <Label htmlFor="childName" className="text-base md:text-lg font-semibold">
                    Adicione o nome da criança:
                  </Label>
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Input
                        id="childName"
                        type="text"
                        placeholder="Digite o nome..."
                        value={childName}
                        onChange={(e) => setChildName(e.target.value.slice(0, 10))}
                        className="text-base md:text-lg py-6 rounded-xl border-2 border-accent/30 focus:border-accent"
                        maxLength={10}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {childName.length}/10 caracteres
                      </p>
                    </div>
                    <Button
                      onClick={handleGenerateVoice}
                      disabled={isGenerating || !childName.trim()}
                      variant="outline"
                      size="lg"
                      className="border-2 border-primary/30 hover:bg-primary/10 hover:border-primary text-primary px-4 py-6"
                    >
                      {isGenerating ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Volume2 className="w-5 h-5 mr-2" />
                          <span className="hidden md:inline">Escute</span>
                        </>
                      )}
                    </Button>
                  </div>
                  {audioUrl && (
                    <audio ref={audioRef} src={audioUrl} className="hidden" />
                  )}
                </div>

                {/* Gênero */}
                <div className="space-y-4">
                  <Label className="text-base md:text-lg font-semibold">
                    A criança é menino ou menina:
                  </Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                    <div className="flex-1">
                      <div
                        className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          gender === 'menino'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                        onClick={() => setGender('menino')}
                      >
                        <div className="text-6xl">👦</div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="menino" id="menino" />
                          <Label htmlFor="menino" className="font-semibold cursor-pointer">
                            Menino
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          gender === 'menina'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                        onClick={() => setGender('menina')}
                      >
                        <div className="text-6xl">👧</div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="menina" id="menina" />
                          <Label htmlFor="menina" className="font-semibold cursor-pointer">
                            Menina
                          </Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Comportamento */}
                <div className="space-y-4">
                  <Label className="text-base md:text-lg font-semibold">
                    A criança se comportou bem?
                  </Label>
                  <RadioGroup value={behavior} onValueChange={setBehavior} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        behavior === 'sim'
                          ? 'border-green-500 bg-green-500/5'
                          : 'border-border hover:border-accent/50'
                      }`}
                      onClick={() => setBehavior('sim')}
                    >
                      <div className="text-5xl">😊</div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="sim" id="sim" />
                        <Label htmlFor="sim" className="font-semibold cursor-pointer">
                          Sim
                        </Label>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        behavior === 'mais-ou-menos'
                          ? 'border-orange-500 bg-orange-500/5'
                          : 'border-border hover:border-accent/50'
                      }`}
                      onClick={() => setBehavior('mais-ou-menos')}
                    >
                      <div className="text-5xl">😐</div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="mais-ou-menos" id="mais-ou-menos" />
                        <Label htmlFor="mais-ou-menos" className="font-semibold cursor-pointer text-center">
                          Mais ou menos
                        </Label>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        behavior === 'sem-resposta'
                          ? 'border-blue-500 bg-blue-500/5'
                          : 'border-border hover:border-accent/50'
                      }`}
                      onClick={() => setBehavior('sem-resposta')}
                    >
                      <div className="text-5xl">🤷</div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="sem-resposta" id="sem-resposta" />
                        <Label htmlFor="sem-resposta" className="font-semibold cursor-pointer text-center">
                          Sem resposta
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <Link to="/">
                    <Button variant="outline" size="lg" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    disabled={!childName.trim() || !gender || !behavior}
                    onClick={() => setCurrentStep(2)}
                    className="bg-primary hover:bg-primary/90 gap-2"
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Etapa 2 - Em breve</h2>
                <p className="text-muted-foreground mb-8">Upload de fotos será implementado aqui</p>
                <Button onClick={() => setCurrentStep(1)} variant="outline">
                  Voltar
                </Button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Etapa 3 - Em breve</h2>
                <p className="text-muted-foreground mb-8">Upgrades serão implementados aqui</p>
                <Button onClick={() => setCurrentStep(2)} variant="outline">
                  Voltar
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
