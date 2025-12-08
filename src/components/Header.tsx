import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";

const navLinks = [
  { name: "Início", href: "#hero" },
  { name: "Como Funciona", href: "#features" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "Preços", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const Header = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 pt-4 px-2">
      <div className="w-full">
        <div className="flex items-start justify-between my-0 py-0">
          {/* Menu Button - Left */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="w-14 h-14 flex items-center justify-center text-foreground rounded-full transition-colors bg-white shadow-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <span className="text-xs text-white font-medium drop-shadow-md">Menu</span>
          </div>

          {/* Logo - Center - Using CSS animation instead of Framer Motion */}
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              {/* Santa Hat Icon - Inline SVG for instant render */}
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <path d="M20 8 L12 28 L28 28 Z" fill="#D42426" stroke="#D42426" strokeWidth="1" />
                <ellipse cx="20" cy="8" rx="3" ry="3" fill="white" />
                <rect x="10" y="27" width="20" height="4" rx="2" fill="white" />
              </svg>
            </div>
          </div>

          {/* Cart - Right */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => scrollToSection("#pricing")}
              aria-label="Cart"
              className="w-14 h-14 flex items-center justify-center text-foreground rounded-full transition-colors bg-white shadow-lg"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <span className="text-xs text-white font-medium drop-shadow-md">Cesta</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu - CSS transition instead of AnimatePresence */}
      <div
        className={`bg-background border-t border-border/50 overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
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
          <Link to="/formulario" className="w-full">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full w-full mt-2">
              Criar Vídeo
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;