
import React, { useRef, useEffect } from "react";
import { Button } from "./ui-custom/Button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef.current) {
              entry.target.classList.add("animate-fade-in");
            } else if (entry.target === contentRef.current) {
              entry.target.classList.add("animate-fade-up");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  const handleParallax = (e: React.MouseEvent) => {
    if (!sectionRef.current || !imageRef.current) return;
    
    const section = sectionRef.current;
    const image = imageRef.current;
    
    const speed = 0.03;
    const x = (window.innerWidth / 2 - e.pageX) * speed;
    const y = (window.innerHeight / 2 - e.pageY) * speed;
    
    image.style.transform = `translateX(${x}px) translateY(${y}px)`;
  };

  const popularRecipes = [
    {
      name: "Köfte Izgara",
      rating: 4.8,
      time: "30 dk",
      difficulty: "Orta",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
    },
    {
      name: "Fırında Tavuk",
      rating: 4.5,
      time: "45 dk",
      difficulty: "Kolay",
      image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Karnıyarık",
      rating: 4.7,
      time: "50 dk",
      difficulty: "Orta",
      image: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
      onMouseMove={handleParallax}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="max-w-lg opacity-0">
            <div className="inline-block px-4 py-1.5 bg-secondary rounded-full text-sm font-medium mb-6">
              Popüler Tarifler
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Herkesin Sevdiği Lezzetli Tarifler
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              En sevilen ve en çok pişirilen tariflerimizi keşfedin. Her biri detaylı anlatımlar ve püf noktaları ile birlikte sunuluyor.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Adım adım takip edilebilen tarifler",
                "Malzeme miktarları ve hazırlık süreleri",
                "Kullanıcı yorumları ve püf noktaları",
                "Beslenme değerleri ve kalori bilgileri"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/products">
              <Button iconRight={<ArrowRight className="ml-1 h-4 w-4" />}>
                Tüm Tarifleri Keşfet
              </Button>
            </Link>
          </div>
          
          <div 
            ref={imageRef} 
            className="relative opacity-0 lg:ml-12 will-change-transform grid grid-cols-1 gap-4"
          >
            {popularRecipes.map((recipe, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden shadow-lg hover-lift transition-all">
                <div className="flex">
                  <div className="w-1/3">
                    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${recipe.image})` }} />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="font-semibold text-lg mb-1">{recipe.name}</h3>
                    <div className="flex items-center text-amber-500 mb-2">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{recipe.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-secondary/70 rounded-full">{recipe.time}</span>
                      <span className="px-2 py-1 bg-secondary/70 rounded-full">{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
