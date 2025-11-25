import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-accent">
              Magic Santa Video
            </h3>
            <p className="text-white/80 leading-relaxed">
              Levando a magia do Natal para milhares de famílias brasileiras.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Links Úteis</h4>
            <ul className="space-y-2">
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
            <h4 className="font-semibold mb-4 text-lg">Contato</h4>
            <ul className="space-y-2 text-white/80">
              <li>contato@magicsantavideo.com</li>
              <li>WhatsApp: (11) 99999-9999</li>
              <li>Atendimento: 24h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 flex items-center justify-center gap-2">
            © 2024 Magic Santa Video. Feito com{" "}
            <Heart className="w-4 h-4 fill-accent text-accent" /> para famílias
            brasileiras.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
