import { motion } from "framer-motion";
const AnnouncementBar = () => {
  return <motion.div initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="w-full bg-gradient-to-r from-[#1A4D2E] to-[#2d6b47] text-white py-3 px-4 text-center relative z-50">
      <p className="text-sm md:text-base font-medium">
        💙 <span className="font-bold">BLACK FRIDAY ESTENDIDA </span> com 40% OFF EM TUDO! Não perca! 💙{" "}
        
      </p>
    </motion.div>;
};
export default AnnouncementBar;