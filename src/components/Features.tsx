
import React, { useRef, useEffect } from "react";
import { Utensils, Search, Clock, ChefHat, Star, Heart, BookOpen, Salad } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group p-6 rounded-xl hover-lift border border-border/50 hover:border-primary/20 transition-all hover:shadow-sm opacity-0"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="mb-4 p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Search size={24} />,
      title: "Kolay Tarif Arama",
      description: "Malzemelerinize göre uygun tarifleri anında bulun.",
    },
    {
      icon: <Utensils size={24} />,
      title: "5000+ Tarif",
      description: "Geniş tarif koleksiyonumuzla her damak tadına uygun yemekler.",
    },
    {
      icon: <Clock size={24} />,
      title: "Hızlı Hazırlanan Tarifler",
      description: "30 dakikadan kısa sürede hazırlayabileceğiniz lezzetli seçenekler.",
    },
    {
      icon: <ChefHat size={24} />,
      title: "Profesyonel Şef Tavsiyeleri",
      description: "Ünlü şeflerden püf noktaları ve teknikler.",
    },
    {
      icon: <Heart size={24} />,
      title: "Favorilere Ekleme",
      description: "Sevdiğiniz tarifleri kaydedin ve kolayca erişin.",
    },
    {
      icon: <Salad size={24} />,
      title: "Sağlıklı Seçenekler",
      description: "Besleyici ve sağlıklı tariflerle daha iyi beslenin.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div ref={featuresRef} className="text-center max-w-2xl mx-auto mb-16 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mutfakta Hayatınızı Kolaylaştırıyoruz</h2>
          <p className="text-muted-foreground text-lg">
            YemekyApp ile yemek pişirmenin keyfini çıkarın ve yeni lezzetler keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
