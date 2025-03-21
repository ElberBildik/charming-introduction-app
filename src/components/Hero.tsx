
import React, { useEffect, useRef } from "react";
import { Button } from "./ui-custom/Button";
import { ArrowRight, ChefHat, Utensils, Search, Flame } from "lucide-react";
import { Link } from "react-router-dom";

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
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_calc(50%+var(--mouse-x,0.5)*50%)_calc(50%+var(--mouse-y,0.5)*35%),rgba(var(--primary,0,0,255),0.15),transparent_35%)]"
      style={{ '--mouse-x': '0.5', '--mouse-y': '0.5' } as React.CSSProperties}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.015] pointer-events-none" />
      
      <div className="container mx-auto px-6 pt-20 md:pt-28 pb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="inline-block mb-6 px-4 py-1.5 bg-secondary rounded-full text-sm font-medium animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <ChefHat className="inline-block mr-2 h-4 w-4" />
              Lezzetli Tarifler Keşfet
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Evinizde <span className="text-primary">Şef</span> Gibi Yemekler Hazırlayın
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Elinizde bulunan malzemeleri seçin ve size özel lezzetli tarifleri anında keşfedin. Artık yemek yapmak çok daha kolay!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                iconLeft={<Utensils className="h-5 w-5 mr-2" />}
              >
                Malzemeleri Seç
              </Button>
            </Link>
            <Link to="/tarifler">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-amber-400 text-amber-700 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                iconLeft={<Flame className="h-5 w-5 mr-2 text-orange-500" />}
              >
                Popüler Tarifler
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up bg-white/30 backdrop-blur-sm p-4 rounded-xl shadow-md" style={{ animationDelay: '0.6s' }}>
            <div className="text-sm text-amber-800 font-medium flex items-center">
              <Search className="h-4 w-4 mr-1 text-amber-600" />
              Hızlı Tarif Ara:
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Köfte", "Çorba", "Pilav", "Makarna", "Tatlı"].map((item, idx) => (
                <Link to={`/tarifler?q=${item}`} key={idx}>
                  <span className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full text-sm cursor-pointer transition-colors">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
