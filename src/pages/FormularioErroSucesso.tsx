import { CheckCircle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Snowfall from "@/components/Snowfall";

const FormularioErroSucesso = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-christmas-dark via-christmas-red to-christmas-dark flex items-center justify-center p-4 relative overflow-hidden">
      <Snowfall />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-christmas-gold opacity-20">
        <Gift size={80} />
      </div>
      <div className="absolute bottom-10 right-10 text-christmas-gold opacity-20">
        <Gift size={60} />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-lg w-full text-center border border-christmas-gold/30 shadow-2xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <CheckCircle className="w-24 h-24 text-christmas-green mx-auto" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 font-christmas"
        >
          Formulário Enviado!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-lg mb-8"
        >
          Seus dados foram recebidos com sucesso. Em breve você receberá a mensagem mágica do Papai Noel! 🎅
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate("/formularioerro")}
            className="bg-christmas-gold hover:bg-christmas-gold/90 text-christmas-dark font-bold py-4 px-8 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Preencher Novo Formulário
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FormularioErroSucesso;
