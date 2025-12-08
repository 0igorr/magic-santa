import { memo } from "react";

// Using CSS animation instead of Framer Motion for critical above-the-fold component
const AnnouncementBar = memo(() => {
  return (
    <div 
      className="w-full bg-gradient-to-r from-[#1A4D2E] to-[#2d6b47] text-white py-3 px-4 text-center relative z-50 animate-fade-in-up"
    >
      <p className="text-sm md:text-base font-medium">
        💙 <span className="font-bold">BLACK FRIDAY ESTENDIDA </span> com 40% OFF EM TUDO! Não perca! 💙
      </p>
    </div>
  );
});

AnnouncementBar.displayName = "AnnouncementBar";

export default AnnouncementBar;