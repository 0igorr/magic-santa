import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Politicas = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/formulario" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-primary">
            Termos e Políticas
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Termos de Privacidade */}
          <section className="glass rounded-2xl p-6 md:p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Termos de Privacidade
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Somos uma plataforma de criação automatizada de vídeos personalizados, por meio de inteligência artificial, utilizando imagens e informações enviadas voluntariamente pelo usuário. As imagens e dados são utilizados apenas para gerar o vídeo solicitado e não são revendidos, compartilhados ou utilizados para qualquer outra finalidade comercial. Os dados podem ser armazenados temporariamente apenas durante o processamento técnico e são excluídos de forma automática após a conclusão. Ao enviar fotos, áudios, nomes ou dados relacionados a terceiros (especialmente crianças), o usuário confirma que possui autorização ou responsabilidade legal para esse envio.
            </p>
          </section>

          {/* Política de Reembolso */}
          <section className="glass rounded-2xl p-6 md:p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Política de Reembolso
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Por se tratar de um produto digital personalizado e exclusivo, criado sob demanda com base em dados enviados pelo próprio comprador, não oferecemos reembolso após o início da produção. Em caso de erro técnico comprovado, arquivo corrompido ou entrega diferente do contratado, o usuário pode solicitar revisão gratuita ou reenvio do material. Não oferecemos reembolso por expectativas subjetivas (ex.: "não ficou como imaginei").
            </p>
          </section>

          {/* Isenção de Responsabilidade */}
          <section className="glass rounded-2xl p-6 md:p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Isenção de Responsabilidade
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              O usuário é integralmente responsável pelo conteúdo que envia, incluindo imagens, nomes, áudios, e demais informações. Não nos responsabilizamos por uso inadequado do material após a entrega. A plataforma não cria representação de pessoas públicas ou figuras protegidas por direitos autorais, exceto mediante consentimento de uso fornecido pelo cliente. Ao prosseguir com o envio dos dados e a compra, o usuário concorda com todos os termos acima.
            </p>
          </section>

          <div className="text-center pt-4">
            <Link to="/formulario">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Formulário
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politicas;
