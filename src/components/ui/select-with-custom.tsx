import * as React from "react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit3 } from "lucide-react";

interface SelectWithCustomProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  maxCustomLength?: number;
  className?: string;
  triggerClassName?: string;
}

const CUSTOM_OPTION_VALUE = "__custom__";

export function SelectWithCustom({
  value,
  onValueChange,
  placeholder = "Selecione uma opção...",
  options,
  maxCustomLength = 120,
  className,
  triggerClassName = "text-base py-6 rounded-xl border-2 border-accent/30",
}: SelectWithCustomProps) {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState("");

  // Check if current value is a custom one (not in predefined options)
  const isCustomValue = value && !options.some(opt => opt.value === value) && value !== CUSTOM_OPTION_VALUE;

  React.useEffect(() => {
    if (isCustomValue) {
      setIsCustomMode(true);
      setCustomValue(value);
    }
  }, []);

  const handleSelectChange = (newValue: string) => {
    if (newValue === CUSTOM_OPTION_VALUE) {
      setIsCustomMode(true);
      setCustomValue("");
      onValueChange("");
    } else {
      setIsCustomMode(false);
      setCustomValue("");
      onValueChange(newValue);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxCustomLength);
    setCustomValue(newValue);
    onValueChange(newValue);
  };

  const handleBackToSelect = () => {
    setIsCustomMode(false);
    setCustomValue("");
    onValueChange("");
  };

  if (isCustomMode) {
    return (
      <div className={`space-y-2 ${className || ""}`}>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-2">
          <p className="text-xs text-amber-600 dark:text-amber-400">
            ⚠️ <strong>Atenção:</strong> Escreva exatamente como o Papai Noel deve falar. Preste atenção na ortografia e pontuação.
          </p>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Escreva sua mensagem personalizada..."
            value={customValue}
            onChange={handleCustomInputChange}
            className={triggerClassName}
            maxLength={maxCustomLength}
            autoFocus
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleBackToSelect}
            className="text-xs text-primary hover:text-primary/80 underline transition-colors"
          >
            ← Voltar para opções
          </button>
          <span className="text-xs text-muted-foreground">
            {customValue.length}/{maxCustomLength} caracteres
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Select value={value} onValueChange={handleSelectChange}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectItem 
            value={CUSTOM_OPTION_VALUE} 
            className="text-primary font-medium border-b border-border/50 mb-1"
          >
            <span className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Não achou? Escreva a sua mensagem
            </span>
          </SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
