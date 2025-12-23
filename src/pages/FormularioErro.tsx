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
  title: "Fotos e Finalização"
}, {
  number: 4,
  title: "Revisão"
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
const FormularioErro = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [acceptedImageTerms, setAcceptedImageTerms] = useState(false);
  const [imageTermsError, setImageTermsError] = useState(false);
  const [acceptedFinalTerms, setAcceptedFinalTerms] = useState(false);
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
  const getActivityLabel = (value: string) => {
    const options = getActivityOptions();
    const found = options.find(opt => opt.value === value);
    return found ? found.label : value;
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
  const handleSubmitForm = async () => {
    if (!acceptedFinalTerms) {
      toast({
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos para continuar.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Convert photo to base64 if exists
      let photoBase64 = null;
      if (photo && photoPreview) {
        photoBase64 = photoPreview;
      }
      const formData = {
        childName,
        gender,
        behavior,
        age,
        secretMessage,
        secretAdvice,
        activity: getActivityLabel(activity),
        activityValue: activity,
        characteristic,
        photo: photoBase64,
        email,
        fullName,
        phone,
        cpfCnpj,
        submittedAt: new Date().toISOString()
      };
      const response = await fetch('https://n8n-n8n.lw9gve.easypanel.host/webhook/papainoel-poscompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      toast({
        title: "Formulário enviado!",
        description: "Seu vídeo personalizado será criado em breve."
      });

      // Reset form or redirect
      setCurrentStep(1);
      setChildName("");
      setGender("");
      setBehavior("");
      setAge("");
      setAgeSearch("");
      setSecretMessage("");
      setSecretAdvice("");
      setActivity("");
      setCharacteristic("");
      setPhoto(null);
      setPhotoPreview(null);
      setEmail("");
      setFullName("");
      setPhone("");
      setCpfCnpj("");
      setAcceptedImageTerms(false);
      setAcceptedFinalTerms(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar o formulário. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          <div className="w-24" />
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
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center">
                    <h2 className="md:text-3xl font-bold text-foreground text-base">
                      {steps[0].number}
                      <sub className="text-lg">/3</sub> {steps[0].title}
                    </h2>
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

                {/* Atividade ou Elogio */}
                <div className="space-y-3">
                  <Label htmlFor="activity" className="text-base md:text-lg font-semibold">
                    Opções de Atividade ou Elogio
                  </Label>
                  <SelectWithCustom
                    value={activity}
                    onValueChange={setActivity}
                    placeholder="Selecione uma opção..."
                    maxCustomLength={35}
                    options={getActivityOptions()}
                  />
                </div>

                {/* Característica Principal */}
                <div className="space-y-3">
                  <Label htmlFor="characteristic" className="text-base md:text-lg font-semibold">
                    Característica Principal
                  </Label>
                  <SelectWithCustom
                    value={characteristic}
                    onValueChange={setCharacteristic}
                    placeholder="Selecione uma característica..."
                    maxCustomLength={50}
                    options={[
                      { value: "Carinhoso", label: "Carinhoso" },
                      { value: "Carinhosa", label: "Carinhosa" },
                      { value: "Corajoso", label: "Corajoso" },
                      { value: "Corajosa", label: "Corajosa" },
                      { value: "Criativo", label: "Criativo" },
                      { value: "Criativa", label: "Criativa" },
                      { value: "Responsável", label: "Responsável" },
                      { value: "Curioso", label: "Curioso" },
                      { value: "Curiosa", label: "Curiosa" },
                      { value: "Prestativo", label: "Prestativo" },
                      { value: "Prestativa", label: "Prestativa" },
                      { value: "Alegre", label: "Alegre" },
                    ]}
                  />
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
                  <Textarea id="secretAdvice" placeholder="Ex: Continue sendo essa criança maravilhosa!" value={secretAdvice} onChange={e => setSecretAdvice(e.target.value.slice(0, 50))} className="min-h-[80px] text-base rounded-xl border-2 border-accent/30 focus:border-accent resize-none" maxLength={50} />
                  <p className="text-xs text-muted-foreground text-right">
                    {secretAdvice.length}/50 caracteres
                  </p>
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
                  {steps[2].number}<sub className="text-lg">/3</sub> {steps[2].title}
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

                  {/* Terms checkbox for image upload */}
                  <div ref={imageTermsRef} className={`flex items-start gap-3 mt-4 p-4 bg-muted/50 rounded-xl transition-all ${imageTermsError ? 'border-2 border-red-500' : 'border border-border/50'}`}>
                    <Checkbox id="imageTerms" checked={acceptedImageTerms} onCheckedChange={checked => {
                      setAcceptedImageTerms(checked as boolean);
                      if (checked) setImageTermsError(false);
                    }} className={`mt-0.5 ${imageTermsError ? 'border-red-500' : ''}`} />
                    <label htmlFor="imageTerms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      Confirmo que tenho autorização legal para enviar estas imagens e dados, e concordo com os{" "}
                      <Link to="/politicas" className="text-primary hover:underline" target="_blank">
                        Termos de Uso e Política de Privacidade
                      </Link>.
                    </label>
                  </div>
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

                {/* Telefone - Shows after email and fullName are filled */}
                {email && fullName && <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base md:text-lg font-semibold">
                      Telefone
                    </Label>
                    <p className="text-xs text-muted-foreground">Seu numero de telefone.</p>
                    <Input id="phone" type="tel" placeholder="(00) 00000-0000" value={phone} onChange={e => setPhone(e.target.value)} className="text-base py-6 rounded-xl border-2 border-accent/30 focus:border-accent" />
                  </div>}

                {/* CPF/CNPJ - Shows after email and fullName are filled */}
                {email && fullName && <div className="space-y-3">
                    <Label htmlFor="cpfCnpj" className="text-base md:text-lg font-semibold">
                      CPF ou CNPJ
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Para segurança e integridade dos dados da criança
                    </p>
                    <Input id="cpfCnpj" type="text" placeholder="000.000.000-00" value={cpfCnpj} onChange={e => setCpfCnpj(e.target.value)} className="text-base py-6 rounded-xl border-2 border-accent/30 focus:border-accent" />
                  </div>}

                {/* Create Video Button - Shows when all fields are filled */}
                {email && fullName && phone && cpfCnpj && photo && <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-4">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-6" disabled={!acceptedFinalTerms || !acceptedImageTerms} onClick={() => {
                      if (!acceptedImageTerms) {
                        setImageTermsError(true);
                        toast({
                          title: "Atenção",
                          description: "Você precisa aceitar os termos de autorização de imagem para continuar.",
                          variant: "destructive"
                        });
                        imageTermsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        return;
                      }
                      setCurrentStep(4);
                    }}>
                      Criar Vídeo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    {/* Terms checkbox for final submission */}
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border/50">
                      <Checkbox id="finalTerms" checked={acceptedFinalTerms} onCheckedChange={checked => setAcceptedFinalTerms(checked as boolean)} className="mt-0.5" />
                      <label htmlFor="finalTerms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                        Confirmo que li e aceito os{" "}
                        <Link to="/politicas" className="text-primary hover:underline" target="_blank">
                          Termos e Políticas
                        </Link>
                      </label>
                    </div>
                  </motion.div>}

                {/* Photo required warning */}
                {email && fullName && phone && cpfCnpj && !photo && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    ⚠️ <strong>Foto obrigatória:</strong> Você precisa enviar uma foto da criança para continuar.
                  </p>
                </div>}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-6">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                </div>
              </div>}

            {/* Step 4 - Review */}
            {currentStep === 4 && <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Revisão Final
                </h2>
                
                {/* Warning Banner */}
                <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4 md:p-6">
                  <p className="text-base md:text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                    ⚠️ ATENÇÃO: REVISE CUIDADOSAMENTE!
                  </p>
                  <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-2">
                    O Papai Noel vai ler <strong>exatamente</strong> o que está escrito abaixo. Não alteramos nenhuma letra, vírgula, nome ou concordância. Revise tudo antes de confirmar!
                  </p>
                  <p className="text-sm text-red-600/80 dark:text-red-400/80">
                    <strong>IMPORTANTE:</strong> Não abrevie palavras! Escreva tudo por extenso para que o Papai Noel leia corretamente.
                  </p>
                </div>

                {/* Review Section - Dados do destinatário */}
                <div className="space-y-4 p-4 md:p-6 bg-muted/30 rounded-xl border border-border/50">
                  <h3 className="text-lg font-semibold text-primary">1. Dados do Destinatário</h3>
                  
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Nome da Criança:</Label>
                      <Input 
                        value={childName} 
                        onChange={e => setChildName(e.target.value.slice(0, 10))} 
                        className="text-base py-4 rounded-xl border-2 border-accent/30 focus:border-accent"
                        maxLength={10}
                      />
                      <p className="text-xs text-muted-foreground text-right">{childName.length}/10</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Gênero:</Label>
                      <p className="text-base font-medium capitalize">{gender === 'menino' ? '👦 Menino' : '👧 Menina'}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Comportamento:</Label>
                      <p className="text-base font-medium">{behavior === 'sim' ? '😊 Sim' : behavior === 'mais-ou-menos' ? '😐 Mais ou menos' : '🤷 Sem resposta'}</p>
                    </div>
                  </div>
                </div>

                {/* Review Section - Personalização */}
                <div className="space-y-4 p-4 md:p-6 bg-muted/30 rounded-xl border border-border/50">
                  <h3 className="text-lg font-semibold text-primary">2. Personalização</h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Idade:</Label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="Digite para buscar ou selecione..." 
                          value={ageSearch} 
                          onChange={e => setAgeSearch(e.target.value)} 
                          onFocus={() => setIsAgeDropdownOpen(true)} 
                          onBlur={() => setTimeout(() => setIsAgeDropdownOpen(false), 200)} 
                          className="text-base py-4 rounded-xl border-2 border-accent/30 focus:border-accent" 
                        />
                        {isAgeDropdownOpen && <div className="absolute z-50 w-full mt-2 bg-background border-2 border-accent/30 rounded-xl shadow-lg max-h-60 overflow-y-auto">
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

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Atividade/Elogio:</Label>
                      <SelectWithCustom
                        value={activity}
                        onValueChange={setActivity}
                        placeholder="Selecione uma opção..."
                        maxCustomLength={35}
                        options={getActivityOptions()}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Característica Principal:</Label>
                      <SelectWithCustom
                        value={characteristic}
                        onValueChange={setCharacteristic}
                        placeholder="Selecione uma característica..."
                        maxCustomLength={50}
                        options={[
                          { value: "Carinhoso", label: "Carinhoso" },
                          { value: "Carinhosa", label: "Carinhosa" },
                          { value: "Corajoso", label: "Corajoso" },
                          { value: "Corajosa", label: "Corajosa" },
                          { value: "Criativo", label: "Criativo" },
                          { value: "Criativa", label: "Criativa" },
                          { value: "Responsável", label: "Responsável" },
                          { value: "Curioso", label: "Curioso" },
                          { value: "Curiosa", label: "Curiosa" },
                          { value: "Prestativo", label: "Prestativo" },
                          { value: "Prestativa", label: "Prestativa" },
                          { value: "Alegre", label: "Alegre" },
                        ]}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Mensagem Secreta:</Label>
                      <SelectWithCustom
                        value={secretMessage}
                        onValueChange={setSecretMessage}
                        placeholder="Selecione uma opção..."
                        maxCustomLength={50}
                        options={[
                          { value: "É o melhor irmão.", label: "É o melhor irmão." },
                          { value: "É a melhor irmã.", label: "É a melhor irmã." },
                          { value: "É o melhor filho.", label: "É o melhor filho." },
                          { value: "É a melhor filha.", label: "É a melhor filha." },
                          { value: "É o melhor neto.", label: "É o melhor neto." },
                          { value: "É a melhor neta.", label: "É a melhor neta." },
                          { value: "É o melhor sobrinho.", label: "É o melhor sobrinho." },
                          { value: "É a melhor sobrinha.", label: "É a melhor sobrinha." },
                          { value: "É o melhor amigo do mundo.", label: "É o melhor amigo do mundo." },
                          { value: "É a melhor amiga do mundo.", label: "É a melhor amiga do mundo." },
                          { value: "É muito divertido.", label: "É muito divertido." },
                          { value: "É muito divertida.", label: "É muito divertida." },
                          { value: "É muito gentil.", label: "É muito gentil." },
                          { value: "É muito inteligente.", label: "É muito inteligente." },
                          { value: "Adora rir.", label: "Adora rir." },
                        ]}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Conselho Secreto:</Label>
                      <Textarea 
                        value={secretAdvice} 
                        onChange={e => setSecretAdvice(e.target.value.slice(0, 50))} 
                        className="min-h-[60px] text-base rounded-xl border-2 border-accent/30 focus:border-accent resize-none" 
                        maxLength={50} 
                      />
                      <p className="text-xs text-muted-foreground text-right">{secretAdvice.length}/50</p>
                    </div>
                  </div>
                </div>

                {/* Review Section - Fotos e Dados */}
                <div className="space-y-4 p-4 md:p-6 bg-muted/30 rounded-xl border border-border/50">
                  <h3 className="text-lg font-semibold text-primary">3. Fotos e Dados</h3>
                  
                  <div className="space-y-3">
                    {photoPreview && <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Foto da Criança:</Label>
                      <img src={photoPreview} alt="Preview da foto" className="w-32 h-32 object-cover rounded-xl border-2 border-accent/30" />
                    </div>}

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Email:</Label>
                      <p className="text-base font-medium">{email}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Nome Completo:</Label>
                      <p className="text-base font-medium">{fullName}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">Telefone:</Label>
                      <p className="text-base font-medium">{phone}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium text-muted-foreground">CPF/CNPJ:</Label>
                      <p className="text-base font-medium">{cpfCnpj}</p>
                    </div>
                  </div>
                </div>

                {/* Final Warning */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    ⚠️ <strong>Última chance de revisar!</strong> Após confirmar, não será possível alterar as informações. O Papai Noel irá ler exatamente o que está escrito acima.
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-6">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft className="w-4 h-4" />
                    Voltar e Editar
                  </Button>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 gap-2" 
                    disabled={isSubmitting}
                    onClick={handleSubmitForm}
                  >
                    {isSubmitting ? <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </> : "Confirmar e Enviar"}
                  </Button>
                </div>
              </div>}
          </motion.div>
        </div>
      </div>
    </div>;
};
export default FormularioErro;