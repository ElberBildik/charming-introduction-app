
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui-custom/Button";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "YemekyApp - Tarifler ve Malzemeler";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main>
        <Hero />
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tarif Bulmaya Başlayın</h2>
          <p className="mb-6 text-muted-foreground max-w-lg mx-auto">
            Elinizde bulunan malzemeleri seçin ve size uygun tarifleri hemen keşfedin!
          </p>
          <Link to="/products">
            <Button size="lg">
              Malzemeleri Seçmeye Başla
            </Button>
          </Link>
        </div>
        <Features />
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
