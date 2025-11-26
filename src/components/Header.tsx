import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - Center on mobile, Left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 flex items-center gap-2"
          >
            <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-accent" />
            <span className="text-lg md:text-xl font-heading font-bold text-foreground">
              Magic Santa
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </motion.button>
            ))}
            <Button
              onClick={() => scrollToSection("#pricing")}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            >
              Criar Vídeo
            </Button>
          </nav>

          {/* Right Icon - Cart or User */}
          <button
            className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Account"
          >
            <Sparkles className="w-6 h-6" />
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
            className="md:hidden bg-background border-t border-border/50"
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
