import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectWithCustom } from "@/components/ui/select-with-custom";
import { Volume2, Loader2, ArrowLeft, ArrowRight, Upload, X, Check, Star, Gift } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
const steps = [{
  number: 1,
  title: "Dados do destinatário"
}, {
  number: 2,
  title: "Personalização"
}, {
  number: 3,
  title: "Fotos e Plano"
}];

// Age options
const ageOptions = ["Você é um adorável bebê", "Você é um bebezinho", "Você é uma bebezinha", ...Array.from({
  length: 99
}, (_, i) => `${i + 1} ano${i + 1 === 1 ? '' : 's'}`), "Você já é bem grandinho", "Você já é bem grandinha"];

// Activity/Praise options
const activityOptions = [{
  boy: "é muito atencioso com a família",
  girl: "é muito atenciosa com a família",
  neutral: "estudou muito para passar de ano"
}, {
  boy: "é um grande leitor de livros",
  girl: "é uma grande leitora de livros",
  neutral: "se dedicou muito à sua carreira"
}, {
  boy: "é muito bom em resolver problemas",
  girl: "é muito boa em resolver problemas",
  neutral: "ajudou muito os colegas"
}, {
  boy: "é muito criativo em suas brincadeiras",
  girl: "é muito criativa em suas brincadeiras",
  neutral: "está sempre de bom humor e rindo à toa"
}, {
  boy: "está muito curioso sobre o mundo",
  girl: "está muito curiosa sobre o mundo",
  neutral: "superou um medo este ano"
}, {
  boy: "foi muito corajoso no último desafio",
  girl: "foi muito corajosa no último desafio",
  neutral: "está sempre organizando as coisas"
}, {
  boy: "adora cuidar do seu irmãozinho",
  girl: "adora cuidar da sua irmãzinha",
  neutral: "se destacou em seu hobby"
}, {
  boy: "",
  girl: "",
  neutral: "tem um coração muito perdoador"
}, {
  boy: "",
  girl: "",
  neutral: "sempre faz os outros se sentirem bem"
}, {
  boy: "",
  girl: "",
  neutral: "consegue ver o melhor em todas as pessoas"
}, {
  boy: "",
  girl: "",
  neutral: "é muito responsável com as tarefas de casa"
}, {
  boy: "",
  girl: "",
  neutral: "cuida muito bem da sua família"
}, {
  boy: "",
  girl: "",
  neutral: "adora rir muito"
}, {
  boy: "",
  girl: "",
  neutral: "está se dedicando à meditação"
}, {
  boy: "",
  girl: "",
  neutral: "demonstrou grande resiliência"
}];
const Formulario = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 states
  const [childName, setChildName] = useState("");
  const [gender, setGender] = useState("");
  const [behavior, setBehavior] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Step 2 states
  const [age, setAge] = useState("");
  const [ageSearch, setAgeSearch] = useState("");
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [secretMessage, setSecretMessage] = useState("");
  const [secretAdvice, setSecretAdvice] = useState("");
  const [activity, setActivity] = useState("");
  const [characteristic, setCharacteristic] = useState("");

  // Step 3 states
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [isGiftCard, setIsGiftCard] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"comum" | "exclusivo" | null>(null);
  const [acceptedImageTerms, setAcceptedImageTerms] = useState(false);
  const [imageTermsError, setImageTermsError] = useState(false);
  const [acceptedPurchaseTermsComum, setAcceptedPurchaseTermsComum] = useState(false);
  const [acceptedPurchaseTermsExclusivo, setAcceptedPurchaseTermsExclusivo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageTermsRef = useRef<HTMLDivElement | null>(null);
  const {
    toast
  } = useToast();
  const filteredAgeOptions = ageOptions.filter(option => option.toLowerCase().includes(ageSearch.toLowerCase()));
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "Arquivo muito grande",
          description: "A foto deve ter no máximo 10MB",
          variant: "destructive"
        });
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const getActivityOptions = () => {
    return activityOptions.map((option, index) => {
      if (gender === "menino" && option.boy) {
        return {
          value: `activity-${index}`,
          label: option.boy
        };
      } else if (gender === "menina" && option.girl) {
        return {
          value: `activity-${index}`,
          label: option.girl
        };
      } else if (option.neutral) {
        return {
          value: `activity-${index}`,
          label: option.neutral
        };
      }
      return null;
    }).filter(Boolean) as {
      value: string;
      label: string;
    }[];
  };
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
          description: "Ouça como o Papai Noel fala o nome"
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
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-primary mx-[70px]">
            Criar Vídeo Personalizado
          </h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Steps Progress */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, index) => <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div initial={{
                scale: 0.8,
                opacity: 0
              }} animate={{
                scale: currentStep >= step.number ? 1 : 0.8,
                opacity: currentStep >= step.number ? 1 : 0.5
              }} className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl transition-all ${currentStep >= step.number ? 'bg-primary text-white shadow-gold' : 'bg-muted text-muted-foreground'}`}>
                    {step.number}
                  </motion.div>
                  <p className={`mt-2 text-xs md:text-sm font-medium text-center ${currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && <div className="flex-1 h-1 mx-2 md:mx-4 bg-muted relative overflow-hidden">
                    <motion.div initial={{
                width: 0
              }} animate={{
                width: currentStep > step.number ? '100%' : '0%'
              }} transition={{
                duration: 0.3
              }} className="absolute inset-0 bg-primary" />
                  </div>}
              </div>)}
          </div>

          {/* Form Content */}
          <motion.div key={currentStep} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="glass rounded-2xl p-6 md:p-10 shadow-gold border-2 border-accent/20 bg-primary-foreground">
            {currentStep === 1 && <div className="space-y-8">
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center">
                    <h2 className="md:text-3xl font-bold text-foreground text-base">
                      {steps[0].number}
                      <sub className="text-lg">/2</sub> {steps[0].title}
                    </h2>
                    <button onClick={() => {
                  setIsGiftCard(true);
                  setCurrentStep(3);
                }} className="flex items-center gap-1.5 rounded-full border border-border bg-background hover:bg-accent/10 transition-colors text-xs md:text-sm font-medium px-[7px] py-[5px] mx-[40px]">
                      <span className="hidden md:inline text-muted-foreground">Sem tempo?</span>
                      <span className="flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-full">
                        <Gift className="w-3 h-3 md:w-4 md:h-4 bg-primary border-primary text-primary" />
                        <span className="whitespace-nowrap text-primary-foreground">Vale presente</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Nome da Criança */}
                <div className="space-y-3">
                  <Label htmlFor="childName" className="text-base md:text-lg font-semibold">
                    Adicione o nome da criança:
                  </Label>
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Input id="childName" type="text" placeholder="Digite o nome..." value={childName} onChange={e => setChildName(e.target.value.slice(0, 10))} className="text-base md:text-lg py-6 rounded-xl border-2 border-accent/30 focus:border-accent" maxLength={10} />
                      <p className="text-xs text-muted-foreground mt-1">
                        {childName.length}/10 caracteres
                      </p>
                    </div>
                    <Button onClick={handleGenerateVoice} disabled={isGenerating || !childName.trim()} variant="outline" size="lg" className="border-2 border-primary/30 hover:bg-primary/10 hover:border-primary text-primary px-4 py-6">
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                          <Volume2 className="w-5 h-5 mr-2" />
                          <span className="hidden md:inline">Escute</span>
                        </>}
                    </Button>
                  </div>
                  {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}
                </div>

                {/* Gênero */}
                <div className="space-y-4">
                  <Label className="text-base md:text-lg font-semibold">
                    A criança é menino ou menina:
                  </Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                    <div className="flex-1">
                      <div className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${gender === 'menino' ? 'border-primary bg-primary/5' : 'border-border hover:border-accent/50'}`} onClick={() => setGender('menino')}>
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
                      <div className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${gender === 'menina' ? 'border-primary bg-primary/5' : 'border-border hover:border-accent/50'}`} onClick={() => setGender('menina')}>
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
                    <div className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${behavior === 'sim' ? 'border-green-500 bg-green-500/5' : 'border-border hover:border-accent/50'}`} onClick={() => setBehavior('sim')}>
                      <div className="text-5xl">😊</div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="sim" id="sim" />
                        <Label htmlFor="sim" className="font-semibold cursor-pointer">
                          Sim
                        </Label>
                      </div>
                    </div>
                    <div className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${behavior === 'mais-ou-menos' ? 'border-orange-500 bg-orange-500/5' : 'border-border hover:border-accent/50'}`} onClick={() => setBehavior('mais-ou-menos')}>
                      <div className="text-5xl">😐</div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="mais-ou-menos" id="mais-ou-menos" />
                        <Label htmlFor="mais-ou-menos" className="font-semibold cursor-pointer text-center">
                          Mais ou menos
                        </Label>
                      </div>
                    </div>
                    <div className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${behavior === 'sem-resposta' ? 'border-blue-500 bg-blue-500/5' : 'border-border hover:border-accent/50'}`} onClick={() => setBehavior('sem-resposta')}>
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
                  <Button size="lg" onClick={() => setCurrentStep(2)} className="bg-primary hover:bg-primary/90 gap-2">
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>}

            {currentStep === 2 && <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {steps[1].number}
                  <sub className="text-lg">/3</sub> {steps[1].title}
                </h2>

                {/* Idade */}
                <div className="space-y-3">
                  <Label htmlFor="age" className="text-base md:text-lg font-semibold">
                    Qual a idade da criança?
                  </Label>
                  <div className="relative">
                    <Input id="age" type="text" placeholder="Digite para buscar ou selecione..." value={ageSearch} onChange={e => setAgeSearch(e.target.value)} onFocus={() => setIsAgeDropdownOpen(true)} onBlur={() => setTimeout(() => setIsAgeDropdownOpen(false), 200)} className="text-base md:text-lg py-6 rounded-xl border-2 border-accent/30 focus:border-accent" />
                    {isAgeDropdownOpen && <div className="absolute z-10 w-full mt-2 bg-background border-2 border-accent/30 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredAgeOptions.length > 0 ? filteredAgeOptions.map((option, index) => <div key={index} onClick={() => {
                    setAge(option);
                    setAgeSearch(option);
                    setIsAgeDropdownOpen(false);
                  }} className="px-4 py-3 hover:bg-accent/10 cursor-pointer transition-colors border-b border-border/50 last:border-0">
                              {option}
                            </div>) : <div className="px-4 py-3 text-muted-foreground">
                            Nenhuma opção encontrada
                          </div>}
                      </div>}
                  </div>
                </div>

                {/* Mensagem Secreta */}
                <div className="space-y-3">
                  <Label htmlFor="secretMessage" className="text-base md:text-lg font-semibold">
                    Mensagem Secreta
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    O que o Papai Noel deve dizer sobre a criança?
                  </p>
                  <Select value={secretMessage} onValueChange={setSecretMessage}>
                    <SelectTrigger className="text-base py-6 rounded-xl border-2 border-accent/30">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="É o melhor irmão.">É o melhor irmão.</SelectItem>
                      <SelectItem value="É a melhor irmã.">É a melhor irmã.</SelectItem>
                      <SelectItem value="É o melhor filho.">É o melhor filho.</SelectItem>
                      <SelectItem value="É a melhor filha.">É a melhor filha.</SelectItem>
                      <SelectItem value="É o melhor neto.">É o melhor neto.</SelectItem>
                      <SelectItem value="É a melhor neta.">É a melhor neta.</SelectItem>
                      <SelectItem value="É o melhor sobrinho.">É o melhor sobrinho.</SelectItem>
                      <SelectItem value="É a melhor sobrinha.">É a melhor sobrinha.</SelectItem>
                      <SelectItem value="É o melhor amigo do mundo.">É o melhor amigo do mundo.</SelectItem>
                      <SelectItem value="É a melhor amiga do mundo.">É a melhor amiga do mundo.</SelectItem>
                      <SelectItem value="É o melhor dançarino do mundo.">É o melhor dançarino do mundo.</SelectItem>
                      <SelectItem value="É a melhor dançarina do mundo.">É a melhor dançarina do mundo.</SelectItem>
                      <SelectItem value="É o melhor cantor do mundo.">É o melhor cantor do mundo.</SelectItem>
                      <SelectItem value="É a melhor cantora do mundo.">É a melhor cantora do mundo.</SelectItem>
                      <SelectItem value="É muito divertido.">É muito divertido.</SelectItem>
                      <SelectItem value="É muito divertida.">É muito divertida.</SelectItem>
                      <SelectItem value="É muito minucioso.">É muito minucioso.</SelectItem>
                      <SelectItem value="É muito minuciosa.">É muito minuciosa.</SelectItem>
                      <SelectItem value="É muito valente.">É muito valente.</SelectItem>
                      <SelectItem value="É muito respeitoso.">É muito respeitoso.</SelectItem>
                      <SelectItem value="É muito respeitosa.">É muito respeitosa.</SelectItem>
                      <SelectItem value="É muito bom em tecnologia.">É muito bom em tecnologia.</SelectItem>
                      <SelectItem value="É muito boa em tecnologia.">É muito boa em tecnologia.</SelectItem>
                      <SelectItem value="É um mestre na cozinha.">É um mestre na cozinha.</SelectItem>
                      <SelectItem value="É uma mestra na cozinha.">É uma mestra na cozinha.</SelectItem>
                      <SelectItem value="É um artista incrível.">É um artista incrível.</SelectItem>
                      <SelectItem value="É uma artista incrível.">É uma artista incrível.</SelectItem>
                      <SelectItem value="É o melhor colega de classe.">É o melhor colega de classe.</SelectItem>
                      <SelectItem value="É a melhor colega de classe.">É a melhor colega de classe.</SelectItem>
                      <SelectItem value="É muito dedicado ao que faz.">É muito dedicado ao que faz.</SelectItem>
                      <SelectItem value="É muito dedicada ao que faz.">É muito dedicada ao que faz.</SelectItem>
                      <SelectItem value="É muito bom em desenhar.">É muito bom em desenhar.</SelectItem>
                      <SelectItem value="É muito boa em desenhar.">É muito boa em desenhar.</SelectItem>
                      <SelectItem value="É muito criativo com as histórias.">É muito criativo com as histórias.</SelectItem>
                      <SelectItem value="É muito criativa com as histórias.">É muito criativa com as histórias.</SelectItem>
                      <SelectItem value="É muito honesto.">É muito honesto.</SelectItem>
                      <SelectItem value="É muito honesta.">É muito honesta.</SelectItem>
                      <SelectItem value="É muito gentil.">É muito gentil.</SelectItem>
                      <SelectItem value="É muito amigável.">É muito amigável.</SelectItem>
                      <SelectItem value="É muito inteligente.">É muito inteligente.</SelectItem>
                      <SelectItem value="É um bom líder.">É um bom líder.</SelectItem>
                      <SelectItem value="É uma boa líder.">É uma boa líder.</SelectItem>
                      <SelectItem value="É muito amoroso.">É muito amoroso.</SelectItem>
                      <SelectItem value="É muito amorosa.">É muito amorosa.</SelectItem>
                      <SelectItem value="É um excelente ouvinte.">É um excelente ouvinte.</SelectItem>
                      <SelectItem value="É uma excelente ouvinte.">É uma excelente ouvinte.</SelectItem>
                      <SelectItem value="Adora ler muito bem.">Adora ler muito bem.</SelectItem>
                      <SelectItem value="Cresce muito rápido.">Cresce muito rápido.</SelectItem>
                      <SelectItem value="Conta lindas histórias.">Conta lindas histórias.</SelectItem>
                      <SelectItem value="Adora fazer esportes.">Adora fazer esportes.</SelectItem>
                      <SelectItem value="Adora jogar jogos.">Adora jogar jogos.</SelectItem>
                      <SelectItem value="Adora rir.">Adora rir.</SelectItem>
                      <SelectItem value="Gosta de contar piadas.">Gosta de contar piadas.</SelectItem>
                      <SelectItem value="Gosta de tocar música.">Gosta de tocar música.</SelectItem>
                      <SelectItem value="Vai muito bem na escola.">Vai muito bem na escola.</SelectItem>
                      <SelectItem value="Sabe andar de bicicleta.">Sabe andar de bicicleta.</SelectItem>
                      <SelectItem value="Tem uma grande imaginação.">Tem uma grande imaginação.</SelectItem>
                      <SelectItem value="Tem um sorriso lindo.">Tem um sorriso lindo.</SelectItem>
                      <SelectItem value="Está atento(a) aos outros.">Está atento(a) aos outros.</SelectItem>
                      <SelectItem value="Estuda bastante.">Estuda bastante.</SelectItem>
                      <SelectItem value="Tem um senso de justiça admirável.">Tem um senso de justiça admirável.</SelectItem>
                      <SelectItem value="Gosta de cuidar dos animais.">Gosta de cuidar dos animais.</SelectItem>
                      <SelectItem value="Tem uma risada muito contagiante.">Tem uma risada muito contagiante.</SelectItem>
                      <SelectItem value="Consegue ver o lado bom das coisas.">Consegue ver o lado bom das coisas.</SelectItem>
                      <SelectItem value="É muito minucioso(a) com os detalhes.">É muito minucioso(a) com os detalhes.</SelectItem>
                      <SelectItem value="Adora passar tempo com o vovô.">Adora passar tempo com o vovô.</SelectItem>
                      <SelectItem value="Adora passar tempo com a vovó.">Adora passar tempo com a vovó.</SelectItem>
                      <SelectItem value="É um presente para todos nós.">É um presente para todos nós.</SelectItem>
                      <SelectItem value="Tem um coração muito generoso.">Tem um coração muito generoso.</SelectItem>
                      <SelectItem value="É o sol da nossa casa.">É o sol da nossa casa.</SelectItem>
                      <SelectItem value="Tem um senso de humor único.">Tem um senso de humor único.</SelectItem>
                      <SelectItem value="Escreve lindas histórias.">Escreve lindas histórias.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conselho Secreto */}
                <div className="space-y-3">
                  <Label htmlFor="secretAdvice" className="text-base md:text-lg font-semibold">
                    Conselho Secreto
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Qual deve ser o conselho final do Papai Noel para a criança?
                  </p>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-2">
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      ⚠️ <strong>Atenção:</strong> Escreva exatamente o que o Papai Noel vai falar. Preste atenção na ortografia e pontuação, pois será lido da forma que você escrever.
                    </p>
                  </div>
                  <Textarea id="secretAdvice" placeholder="Ex: Continue sendo essa criança maravilhosa e nunca deixe de sonhar!" value={secretAdvice} onChange={e => setSecretAdvice(e.target.value.slice(0, 80))} className="min-h-[80px] text-base rounded-xl border-2 border-accent/30 focus:border-accent resize-none" maxLength={80} />
                  <p className="text-xs text-muted-foreground text-right">
                    {secretAdvice.length}/80 caracteres
                  </p>
                </div>

                {/* Atividade ou Elogio */}
                <div className="space-y-3">
                  <Label htmlFor="activity" className="text-base md:text-lg font-semibold">
                    Opções de Atividade ou Elogio
                  </Label>
                  <SelectWithCustom value={activity} onValueChange={setActivity} placeholder="Selecione uma opção..." maxCustomLength={35} options={getActivityOptions()} />
                </div>

                {/* Característica Principal */}
                <div className="space-y-3">
                  <Label htmlFor="characteristic" className="text-base md:text-lg font-semibold">
                    Característica Principal
                  </Label>
                  <SelectWithCustom value={characteristic} onValueChange={setCharacteristic} placeholder="Selecione uma característica..." maxCustomLength={120} options={[{
                value: "caring",
                label: "Carinhoso(a)"
              }, {
                value: "brave",
                label: "Corajoso(a)"
              }, {
                value: "creative",
                label: "Criativo(a)"
              }, {
                value: "responsible",
                label: "Responsável"
              }, {
                value: "curious",
                label: "Curioso(a)"
              }, {
                value: "helpful",
                label: "Prestativo(a)"
              }, {
                value: "joyful",
                label: "Alegre"
              }]} />
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" size="lg" className="gap-2" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  <Button size="lg" onClick={() => setCurrentStep(3)} className="bg-primary hover:bg-primary/90 gap-2">
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>}

            {currentStep === 3 && <div className="space-y-8 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{
              color: '#2F3730'
            }}>
                  {isGiftCard ? "Vale Presente" : <>{steps[2].number}<sub className="text-lg">/3</sub> {steps[2].title}</>}
                </h2>

                {/* Upload de Foto - Hidden in gift card mode */}
                {!isGiftCard && <div className="space-y-3">
                  <Label className="text-base md:text-lg font-semibold" style={{
                color: '#2F3730'
              }}>
                    Foto da Criança
                  </Label>
                  <p className="text-sm mb-3" style={{
                color: '#2F3730',
                opacity: 0.7
              }}>
                    Adicione uma foto da criança para personalizar o vídeo
                  </p>
                  
                  {!photoPreview ? <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed rounded-xl p-8 md:p-12 hover:border-opacity-50 transition-all cursor-pointer" style={{
                borderColor: 'rgba(176, 141, 87, 0.5)',
                backgroundColor: 'rgba(176, 141, 87, 0.05)'
              }}>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                    backgroundColor: 'rgba(30, 89, 47, 0.1)'
                  }}>
                          <Upload className="w-8 h-8" style={{
                      color: '#1E592F'
                    }} />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold mb-1" style={{
                      color: '#2F3730'
                    }}>
                            Clique para fazer upload
                          </p>
                          <p className="text-sm" style={{
                      color: '#2F3730',
                      opacity: 0.6
                    }}>
                            JPG, PNG ou WEBP (máx. 10MB)
                          </p>
                        </div>
                      </div>
                    </div> : <div className="relative rounded-xl overflow-hidden border-2" style={{
                borderColor: 'rgba(176, 141, 87, 0.3)'
              }}>
                      <img src={photoPreview} alt="Preview da foto" className="w-full h-64 object-cover" />
                      <Button onClick={removePhoto} variant="destructive" size="icon" className="absolute top-2 right-2">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>}
                  
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="hidden" />

                  {/* Terms checkbox for image upload */}
                  <div ref={imageTermsRef} className="flex items-start gap-3 mt-4 p-4 rounded-xl transition-all" style={{
                backgroundColor: 'rgba(176, 141, 87, 0.1)',
                border: imageTermsError ? '2px solid #DC2626' : '1px solid rgba(176, 141, 87, 0.2)'
              }}>
                    <Checkbox id="imageTerms" checked={acceptedImageTerms} onCheckedChange={checked => {
                  setAcceptedImageTerms(checked as boolean);
                  if (checked) setImageTermsError(false);
                }} className="mt-0.5" style={{
                  borderColor: imageTermsError ? '#DC2626' : '#B08D57'
                }} />
                    <label htmlFor="imageTerms" className="text-xs leading-relaxed cursor-pointer" style={{
                  color: '#2F3730'
                }}>
                      Confirmo que tenho autorização legal para enviar estas imagens e dados, e concordo com os{" "}
                      <Link to="/politicas" className="hover:underline" style={{
                    color: '#B08D57'
                  }} target="_blank">
                        Termos de Uso e Política de Privacidade
                      </Link>.
                    </label>
                  </div>
                </div>}

                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base md:text-lg font-semibold" style={{
                color: '#2F3730'
              }}>
                    Email
                  </Label>
                  <p className="text-sm" style={{
                color: '#2F3730',
                opacity: 0.7
              }}>
                    Para qual email devemos enviar o vídeo?
                  </p>
                  <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="text-base py-6 rounded-xl border-2" style={{
                borderColor: 'rgba(176, 141, 87, 0.3)',
                backgroundColor: '#FFFBF2',
                color: '#2F3730'
              }} />
                </div>

                {/* Nome Completo */}
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-base md:text-lg font-semibold" style={{
                color: '#2F3730'
              }}>
                    Nome Completo
                  </Label>
                  <Input id="fullName" type="text" placeholder="Digite seu nome completo" value={fullName} onChange={e => setFullName(e.target.value)} className="text-base py-6 rounded-xl border-2" style={{
                borderColor: 'rgba(176, 141, 87, 0.3)',
                backgroundColor: '#FFFBF2',
                color: '#2F3730'
              }} />
                </div>

                {/* Telefone - Shows after email and fullName are filled */}
                {email && fullName && <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base md:text-lg font-semibold" style={{
                color: '#2F3730'
              }}>
                      Telefone
                    </Label>
                    <p className="text-xs" style={{
                color: '#2F3730',
                opacity: 0.7
              }}>Seu numero de telefone. Com +55 e DDD</p>
                    <Input id="phone" type="tel" placeholder="(00) 00000-0000" value={phone} onChange={e => setPhone(e.target.value)} className="text-base py-6 rounded-xl border-2" style={{
                borderColor: 'rgba(176, 141, 87, 0.3)',
                backgroundColor: '#FFFBF2',
                color: '#2F3730'
              }} />
                  </div>}

                {/* CPF/CNPJ - Shows after email and fullName are filled */}
                {email && fullName && <div className="space-y-3">
                    <Label htmlFor="cpfCnpj" className="text-base md:text-lg font-semibold" style={{
                color: '#2F3730'
              }}>
                      CPF ou CNPJ
                    </Label>
                    <p className="text-xs" style={{
                color: '#2F3730',
                opacity: 0.7
              }}>
                      Para segurança e integridade dos dados da criança
                    </p>
                    <Input id="cpfCnpj" type="text" placeholder="000.000.000-00" value={cpfCnpj} onChange={e => setCpfCnpj(e.target.value)} className="text-base py-6 rounded-xl border-2" style={{
                borderColor: 'rgba(176, 141, 87, 0.3)',
                backgroundColor: '#FFFBF2',
                color: '#2F3730'
              }} />
                  </div>}

                {/* Plans Section - Shows when all fields are filled */}
                {email && fullName && phone && cpfCnpj && <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-4">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2" style={{
                color: '#2F3730'
              }}>
                      <span style={{
                  color: '#1E592F'
                }}>🎄</span> ESCOLHA SEU PLANO
                    </h3>
                    <p className="mb-6" style={{
                color: '#2F3730',
                opacity: 0.7
              }}>
                      Selecione o plano ideal para sua experiência mágica
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Plano Comum */}
                      <div onClick={() => setSelectedPlan("comum")} className={`relative rounded-2xl p-5 md:p-6 cursor-pointer transition-all border flex flex-col ${selectedPlan === "comum" ? "shadow-lg" : ""}`} style={{
                  backgroundColor: '#FFFBF2',
                  borderColor: 'rgba(176, 141, 87, 0.3)'
                }}>
                        <div className="mb-4">
                          <h4 className="text-lg font-bold uppercase tracking-wide" style={{
                      color: '#2F3730'
                    }}>PLANO COMUM</h4>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-2xl md:text-3xl font-bold" style={{
                        color: '#7B2D3A'
                      }}>R$ 14,90</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-3 flex-1">
                          <li className="flex items-center gap-3">
                            <span className="text-sm" style={{
                        color: '#2F3730'
                      }}>• Vídeo personalizado qualidade comum</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-sm" style={{
                        color: '#2F3730'
                      }}>• Todas as personalizações anteriores</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-sm" style={{
                        color: '#2F3730'
                      }}>• Entrega comum em até 24h</span>
                          </li>
                        </ul>

                        <Button size="lg" onClick={() => {
                    if (!isGiftCard && !acceptedImageTerms) {
                      setImageTermsError(true);
                      toast({
                        title: "Atenção",
                        description: "Você precisa aceitar os termos de autorização de imagem para continuar.",
                        variant: "destructive"
                      });
                      imageTermsRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                      });
                      return;
                    }
                    if (!acceptedPurchaseTermsComum) {
                      toast({
                        title: "Atenção",
                        description: "Você precisa aceitar os Termos e Políticas para continuar.",
                        variant: "destructive"
                      });
                      return;
                    }
                    const phoneClean = phone.replace(/\D/g, '');
                    const phoneWithCountry = phoneClean.startsWith('55') ? phoneClean : `55${phoneClean}`;
                    const params = new URLSearchParams({
                      'customer.name': fullName,
                      'customer.email': email,
                      'customer.document': cpfCnpj.replace(/\D/g, ''),
                      'customer.phone': phoneWithCountry
                    });
                    window.location.href = `https://pay.kirvano.com/4e00c8b4-2d7b-4243-9ac6-0774f6b2fd57?${params.toString()}`;
                  }} className="w-full mt-4 font-semibold border-2" style={{
                    backgroundColor: 'transparent',
                    color: '#1E592F',
                    borderColor: '#1E592F'
                  }}>
                          Selecionar
                        </Button>

                        {/* Terms checkbox for purchase - Below button */}
                        <div className="flex items-start gap-3 mt-4 p-3 rounded-lg" style={{
                    backgroundColor: 'rgba(176, 141, 87, 0.1)'
                  }}>
                          <Checkbox id="purchaseTermsComum" checked={acceptedPurchaseTermsComum} onCheckedChange={checked => setAcceptedPurchaseTermsComum(checked as boolean)} className="mt-0.5" style={{
                      borderColor: '#B08D57'
                    }} />
                          <label htmlFor="purchaseTermsComum" className="text-[10px] leading-relaxed cursor-pointer" style={{
                      color: '#2F3730'
                    }}>
                            Confirmo que li e aceito os{" "}
                            <Link to="/politicas" className="hover:underline" style={{
                        color: '#B08D57'
                      }} target="_blank">
                              Termos e Políticas
                            </Link>
                          </label>
                        </div>
                      </div>

                      {/* Plano Exclusivo - Burgundy/Wine */}
                      <div onClick={() => setSelectedPlan("exclusivo")} className={`relative rounded-2xl p-5 md:p-6 cursor-pointer transition-all border flex flex-col ${selectedPlan === "exclusivo" ? "shadow-lg" : ""}`} style={{
                  backgroundColor: '#5C1A2E',
                  borderColor: '#5C1A2E'
                }}>
                        {/* Popular Badge */}
                        <div className="absolute -top-3 right-4">
                          <span className="text-xs font-bold px-3 py-1 rounded-sm flex items-center gap-1" style={{
                      backgroundColor: '#B08D57',
                      color: '#FFFBF2'
                    }}>
                            <Star className="w-3 h-3" /> POPULAR
                          </span>
                        </div>
                        
                        <div className="mb-4 mt-2">
                          <h4 className="text-lg font-bold italic uppercase" style={{
                      color: '#FFFBF2'
                    }}>PLANO EXCLUSIVO</h4>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-2xl md:text-3xl font-bold" style={{
                        color: '#B08D57'
                      }}>R$17,90</span>
                            <span className="text-sm line-through" style={{
                        color: 'rgba(255, 251, 242, 0.5)'
                      }}>R$ 49,90</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3">
                            <Check className="w-4 h-4" style={{
                        color: '#B08D57'
                      }} />
                            <span className="text-sm" style={{
                        color: '#FFFBF2'
                      }}>Tudo do plano comum</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <Check className="w-4 h-4" style={{
                        color: '#B08D57'
                      }} />
                            <span className="text-sm" style={{
                        color: '#FFFBF2'
                      }}>Vídeo em qualidade premium</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <Check className="w-4 h-4" style={{
                        color: '#B08D57'
                      }} />
                            <span className="text-sm" style={{
                        color: '#FFFBF2'
                      }}>Música de fundo</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <Check className="w-4 h-4" style={{
                        color: '#B08D57'
                      }} />
                            <span className="text-sm" style={{
                        color: '#FFFBF2'
                      }}>Entrega prioritária em até 12h</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <Check className="w-4 h-4" style={{
                        color: '#B08D57'
                      }} />
                            <span className="text-sm" style={{
                        color: '#FFFBF2'
                      }}>Suporte prioritário 24h</span>
                          </li>
                        </ul>

                        {/* Bônus Section */}
                        <div className="mt-4 pt-3 rounded-lg p-3" style={{
                    backgroundColor: 'rgba(176, 141, 87, 0.15)'
                  }}>
                          <p className="text-sm font-semibold mb-2 flex items-center gap-2" style={{
                      color: '#B08D57'
                    }}>
                            <Gift className="w-4 h-4" style={{
                        color: '#B08D57'
                      }} />
                            BÔNUS:
                          </p>
                          <ul className="space-y-1">
                            <li><span className="text-sm" style={{
                          color: '#FFFBF2'
                        }}>• Carta personalizada do Papai Noel</span></li>
                            <li><span className="text-sm" style={{
                          color: '#FFFBF2'
                        }}>• Certificado oficial criança especial</span></li>
                            <li><span className="text-sm" style={{
                          color: '#FFFBF2'
                        }}>• Lista de tarefas natalinas</span></li>
                            <li><span className="text-sm" style={{
                          color: '#FFFBF2'
                        }}>• Bilhete para deixar na árvore</span></li>
                          </ul>
                        </div>

                        <Button className="w-full mt-4 font-bold uppercase tracking-wide" size="lg" onClick={() => {
                    if (!isGiftCard && !acceptedImageTerms) {
                      setImageTermsError(true);
                      toast({
                        title: "Atenção",
                        description: "Você precisa aceitar os termos de autorização de imagem para continuar.",
                        variant: "destructive"
                      });
                      imageTermsRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                      });
                      return;
                    }
                    if (!acceptedPurchaseTermsExclusivo) {
                      toast({
                        title: "Atenção",
                        description: "Você precisa aceitar os Termos e Políticas para continuar.",
                        variant: "destructive"
                      });
                      return;
                    }
                    const phoneClean = phone.replace(/\D/g, '');
                    const phoneWithCountry = phoneClean.startsWith('55') ? phoneClean : `55${phoneClean}`;
                    const params = new URLSearchParams({
                      'customer.name': fullName,
                      'customer.email': email,
                      'customer.document': cpfCnpj.replace(/\D/g, ''),
                      'customer.phone': phoneWithCountry
                    });
                    window.location.href = `https://pay.kirvano.com/0055690f-e505-4609-8c00-913c29b3536b?${params.toString()}`;
                  }} style={{
                    backgroundColor: '#1E592F',
                    color: '#FFFFFF'
                  }}>
                          QUERO ESTE PLANO
                        </Button>

                        {/* Terms checkbox for purchase - Below button */}
                        <div className="flex items-start gap-3 mt-4 p-3 rounded-lg" style={{
                    backgroundColor: 'rgba(176, 141, 87, 0.15)'
                  }}>
                          <Checkbox id="purchaseTermsExclusivo" checked={acceptedPurchaseTermsExclusivo} onCheckedChange={checked => setAcceptedPurchaseTermsExclusivo(checked as boolean)} className="mt-0.5" style={{
                      borderColor: '#B08D57'
                    }} />
                          <label htmlFor="purchaseTermsExclusivo" className="text-[10px] leading-relaxed cursor-pointer" style={{
                      color: 'rgba(255, 251, 242, 0.8)'
                    }}>
                            Confirmo que li e aceito os{" "}
                            <Link to="/politicas" className="hover:underline" style={{
                        color: '#B08D57'
                      }} target="_blank">
                              Termos e Políticas
                            </Link>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-6">
                  {!isGiftCard ? <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" onClick={() => setCurrentStep(2)} style={{
                borderColor: '#1E592F',
                color: '#1E592F'
              }}>
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </Button> : <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" onClick={() => {
                setIsGiftCard(false);
                setCurrentStep(1);
              }} style={{
                borderColor: '#1E592F',
                color: '#1E592F'
              }}>
                      <ArrowLeft className="w-4 h-4" />
                      Voltar ao formulário
                    </Button>}
                </div>
              </div>}
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Formulario;