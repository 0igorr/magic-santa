const MarqueeMessage = () => {
  // Duplicate 8 times for seamless infinite loop
  const messages = Array(8).fill("Encante quem você mais ama");
  
  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden border-y border-accent/20">
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex animate-scroll-infinite w-max">
            {messages.map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center whitespace-nowrap"
              >
                <span className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mr-6 md:mr-8">
                  <span className="text-foreground">Encante </span>
                  <span 
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '2px hsl(var(--foreground))'
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
