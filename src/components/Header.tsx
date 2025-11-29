import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";

const navLinks = [
  { name: "Início", href: "#hero" },
  { name: "Como Funciona", href: "#features" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "Preços", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Menu Button - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground hover:bg-accent/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - Center */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              {/* Santa Hat Icon */}
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <path
                  d="M20 8 L12 28 L28 28 Z"
                  fill="#D42426"
                  stroke="#D42426"
                  strokeWidth="1"
                />
                <ellipse cx="20" cy="8" rx="3" ry="3" fill="white" />
                <rect x="10" y="27" width="20" height="4" rx="2" fill="white" />
              </svg>
            </div>
          </motion.div>

          {/* Cart - Right */}
          <button
            onClick={() => scrollToSection("#pricing")}
            className="relative p-2 text-foreground hover:bg-accent/10 rounded-full transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-background border-t border-border/50"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("#pricing")}
                className="bg-primary hover:bg-primary/90 text-white rounded-full w-full mt-2"
              >
                Criar Vídeo
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
