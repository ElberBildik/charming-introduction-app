
import React, { useRef, useEffect } from "react";
import { Button } from "./ui-custom/Button";

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
              Next Generation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Designed for the way you work
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our products are crafted to enhance your workflow, not disrupt it. Every detail is thoughtfully considered to create tools that feel like natural extensions of your creative process.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Intuitive interactions that feel natural",
                "Seamless integration with your workflow",
                "Thoughtful details that enhance productivity",
                "Refined aesthetics that inspire creativity"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button>
              Discover More
            </Button>
          </div>
          
          <div 
            ref={imageRef} 
            className="relative opacity-0 lg:ml-12 will-change-transform"
          >
            <div className="aspect-square max-w-md mx-auto rounded-xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/50 flex items-center justify-center">
                <div className="glass p-8 rounded-lg text-center">
                  <p className="text-xl font-medium">Product Image</p>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
