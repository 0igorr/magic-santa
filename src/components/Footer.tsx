import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-10 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-accent">
              Magic Santa Video
            </h3>
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              Levando a magia do Natal para milhares de famílias brasileiras.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Links Úteis</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Contato</h4>
            <ul className="space-y-2 text-white/80 text-sm md:text-base">
              <li>contato@magicsantavideo.com</li>
              <li>WhatsApp: (11) 99999-9999</li>
              <li>Atendimento: 24h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8 text-center">
          <p className="text-white/60 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs md:text-sm">
            <span>© 2024 Magic Santa Video.</span>
            <span className="flex items-center gap-1 sm:gap-2">
              Feito com <Heart className="w-3 h-3 md:w-4 md:h-4 fill-accent text-accent" /> para famílias brasileiras.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
