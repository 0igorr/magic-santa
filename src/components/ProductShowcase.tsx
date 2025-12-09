import { memo } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
const ProductShowcase = memo(() => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="py-12 md:py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-8 md:mb-12 font-christmas">
          Os mais vendidos
        </h2>

        <div className="flex justify-center">
          <div className="bg-card rounded-2xl p-4 md:p-6 shadow-lg max-w-sm w-full border border-border/50">
            {/* Product Image Container */}
            <div className="relative rounded-xl overflow-hidden mb-4 group cursor-pointer" onClick={scrollToForm}>
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-md">
                -20%
              </div>

              {/* Product Image */}
              <div className="aspect-[4/3] bg-secondary/30 relative">
                <img src="/lovable-uploads/d22e1aad-ec41-4425-a972-eb2316affb90.jpg" alt="Vídeo personalizado do Papai Noel" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 md:w-7 md:h-7 text-primary fill-primary ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="text-center space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-wide">
                Vídeo do Papai Noel
              </h3>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-muted-foreground line-through text-sm">R$ 29,90</span>
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  R$ 14,90
                </span>
              </div>

              <Button onClick={scrollToForm} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 text-base md:text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                Criar vídeo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
});
ProductShowcase.displayName = "ProductShowcase";
export default ProductShowcase;