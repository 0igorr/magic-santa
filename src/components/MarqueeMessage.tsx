const MarqueeMessage = () => {
  // Duplicate 3 times for seamless infinite loop
  const messages = Array(3).fill("Encante quem você mais ama");
  
  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden border-y border-accent/20">
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex animate-scroll-infinite w-max">
            {messages.map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 md:px-12 flex items-center whitespace-nowrap"
              >
                <span className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">
                  <span className="text-foreground">Encante </span>
                  <span 
                    className="text-transparent"
                    style={{
                      WebkitTextStroke: '2px currentColor',
                      color: 'hsl(var(--foreground))'
                    }}
                  >
                    quem você 
                  </span>
                  <span className="text-foreground"> mais ama</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeMessage;
