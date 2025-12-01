import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Loader2, ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
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
  title: "Fotos e Upgrades"
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
        }} className="glass rounded-2xl p-6 md:p-10 shadow-gold border-2 border-accent/20">
            {currentStep === 1 && <div className="space-y-8">
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
                  <Button size="lg" disabled={!childName.trim() || !gender || !behavior} onClick={() => setCurrentStep(2)} className="bg-primary hover:bg-primary/90 gap-2">
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
                    O que o Papai Noel deve ler como uma mensagem particular (gratidão, apoio, ou um momento especial do ano)?
                  </p>
                  <Textarea id="secretMessage" placeholder="Digite a mensagem secreta..." value={secretMessage} onChange={e => setSecretMessage(e.target.value.slice(0, 150))} className="min-h-[100px] text-base rounded-xl border-2 border-accent/30 focus:border-accent resize-none" maxLength={150} />
                  <p className="text-xs text-muted-foreground text-right">
                    {secretMessage.length}/150 caracteres
                  </p>
                </div>

                {/* Conselho Secreto */}
                <div className="space-y-3">
                  <Label htmlFor="secretAdvice" className="text-base md:text-lg font-semibold">
                    Conselho Secreto
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Qual deve ser o conselho final do Papai Noel para a criança?
                  </p>
                  <Textarea id="secretAdvice" placeholder="Digite o conselho secreto..." value={secretAdvice} onChange={e => setSecretAdvice(e.target.value.slice(0, 80))} className="min-h-[80px] text-base rounded-xl border-2 border-accent/30 focus:border-accent resize-none" maxLength={80} />
                  <p className="text-xs text-muted-foreground text-right">
                    {secretAdvice.length}/80 caracteres
                  </p>
                </div>

                {/* Atividade ou Elogio */}
                <div className="space-y-3">
                  <Label htmlFor="activity" className="text-base md:text-lg font-semibold">
                    Opções de Atividade ou Elogio
                  </Label>
                  <Select value={activity} onValueChange={setActivity}>
                    <SelectTrigger className="text-base py-6 rounded-xl border-2 border-accent/30">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {getActivityOptions().map(option => <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Característica Principal */}
                <div className="space-y-3">
                  <Label htmlFor="characteristic" className="text-base md:text-lg font-semibold">
                    Característica Principal
                  </Label>
                  <Select value={characteristic} onValueChange={setCharacteristic}>
                    <SelectTrigger className="text-base py-6 rounded-xl border-2 border-accent/30">
                      <SelectValue placeholder="Selecione uma característica..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caring">Carinhoso(a)</SelectItem>
                      <SelectItem value="brave">Corajoso(a)</SelectItem>
                      <SelectItem value="creative">Criativo(a)</SelectItem>
                      <SelectItem value="responsible">Responsável</SelectItem>
                      <SelectItem value="curious">Curioso(a)</SelectItem>
                      <SelectItem value="helpful">Prestativo(a)</SelectItem>
                      <SelectItem value="joyful">Alegre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" size="lg" className="gap-2" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  <Button size="lg" disabled={!age || !secretMessage.trim() || !secretAdvice.trim() || !activity || !characteristic} onClick={() => setCurrentStep(3)} className="bg-primary hover:bg-primary/90 gap-2">
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>}

            {currentStep === 3 && <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {steps[2].number}
                  <sub className="text-lg">/3</sub> {steps[2].title}
                </h2>

                {/* Upload de Foto */}
                <div className="space-y-3">
                  <Label className="text-base md:text-lg font-semibold">
                    Foto da Criança
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Adicione uma foto da criança para personalizar o vídeo
                  </p>
                  
                  {!photoPreview ? <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-accent/50 rounded-xl p-8 md:p-12 hover:border-accent transition-all cursor-pointer bg-accent/5 hover:bg-accent/10">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground mb-1">
                            Clique para fazer upload
                          </p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG ou WEBP (máx. 10MB)
                          </p>
                        </div>
                      </div>
                    </div> : <div className="relative rounded-xl overflow-hidden border-2 border-accent/30">
                      <img src={photoPreview} alt="Preview da foto" className="w-full h-64 object-cover" />
                      <Button onClick={removePhoto} variant="destructive" size="icon" className="absolute top-2 right-2">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>}
                  
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="hidden" />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base md:text-lg font-semibold">
                    Email
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Para qual email devemos enviar o vídeo?
                  </p>
                  <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="text-base py-6 rounded-xl border-2 border-accent/30 focus:border-accent" />
                </div>

                {/* Nome Completo */}
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-base md:text-lg font-semibold">
                    Nome Completo
                  </Label>
                  <Input id="fullName" type="text" placeholder="Digite seu nome completo" value={fullName} onChange={e => setFullName(e.target.value)} className="text-base py-6 rounded-xl border-2 border-accent/30 focus:border-accent" />
                </div>

                {/* Upgrades Section - Shows when email and fullName are filled */}
                {email && fullName && <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="border-2 border-primary/30 rounded-xl p-6 bg-primary/5">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      ✨ Upgrades Disponíveis
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Aprimore seu vídeo com recursos extras!
                    </p>
                    
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                        <div>
                          <h4 className="font-semibold">Vídeo HD Premium</h4>
                          <p className="text-sm text-muted-foreground">Qualidade de vídeo superior</p>
                        </div>
                        <span className="font-bold text-primary">+ R$ 29,90</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                        <div>
                          <h4 className="font-semibold">Música Personalizada</h4>
                          <p className="text-sm text-muted-foreground">Adicione a música favorita</p>
                        </div>
                        <span className="font-bold text-primary">+ R$ 19,90</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                        <div>
                          <h4 className="font-semibold">Entrega Expressa</h4>
                          <p className="text-sm text-muted-foreground">Receba em até 24h</p>
                        </div>
                        <span className="font-bold text-primary">+ R$ 14,90</span>
                      </div>
                    </div>
                  </motion.div>}

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" size="lg" className="gap-2" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  <Button size="lg" disabled={!photo || !email.trim() || !fullName.trim()} className="bg-primary hover:bg-primary/90 gap-2">
                    Finalizar Pedido
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>}
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Formulario;