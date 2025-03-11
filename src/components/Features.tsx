
import React, { useRef, useEffect } from "react";
import { Layers, Cpu, Shield, Zap, RefreshCw, Award } from "lucide-react";

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
      icon: <Layers size={24} />,
      title: "Layered Architecture",
      description: "A thoughtfully designed system with clear separation of concerns.",
    },
    {
      icon: <Cpu size={24} />,
      title: "Powerful Core",
      description: "Built on a foundation of performance and reliability.",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure by Default",
      description: "Every aspect of the system is designed with security in mind.",
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast",
      description: "Optimized for speed and responsiveness in every interaction.",
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Seamless Updates",
      description: "Continuous improvement with non-disruptive updates.",
    },
    {
      icon: <Award size={24} />,
      title: "Award-winning Design",
      description: "Recognized for excellence in user experience and aesthetics.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div ref={featuresRef} className="text-center max-w-2xl mx-auto mb-16 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfectly Crafted Features</h2>
          <p className="text-muted-foreground text-lg">
            Every feature is designed with purpose, focusing on what matters most.
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
