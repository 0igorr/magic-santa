import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
const benefits = ["Vídeo personalizado em Full HD", "Nome e apelido da criança", "Foto no livro mágico", "Idade e série escolar", "Mensagem de incentivo", "Entrega em até 24h", "Suporte dedicado"];
const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        } else if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <section id="pricing" className="py-12 md:py-20 px-4 bg-secondary relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => <div key={i} className="absolute text-accent" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 20 + 10}px`
      }}>
            ✨
          </div>)}
      </div>

      
    </section>;
};
export default Pricing;