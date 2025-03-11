
import React, { useEffect, useRef } from "react";
import { Button } from "./ui-custom/Button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_calc(50%+var(--mouse-x,0.5)*50%)_calc(50%+var(--mouse-y,0.5)*35%),rgba(var(--primary,0,0,255),0.15),transparent_35%)]"
      style={{ '--mouse-x': '0.5', '--mouse-y': '0.5' } as React.CSSProperties}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.015] pointer-events-none" />
      
      <div className="container mx-auto px-6 pt-20 md:pt-28 pb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="inline-block mb-6 px-4 py-1.5 bg-secondary rounded-full text-sm font-medium animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Introducing the new design system
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Simplicity is about subtracting the obvious and adding the meaningful
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Experience design that prioritizes function, embraces minimalism, and creates an intuitive interface that disappears into the background.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" iconRight={<ArrowRight size={18} />}>
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="mt-20 md:mt-28 relative animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="aspect-[16/9] max-w-4xl mx-auto rounded-xl overflow-hidden bg-secondary/50 shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/20 flex items-center justify-center">
              <div className="glass p-8 rounded-lg text-center">
                <p className="text-xl font-medium">Product Showcase</p>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70" />
          <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
