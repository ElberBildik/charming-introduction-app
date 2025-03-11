
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui-custom/Button";
import { Utensils, Search, BookOpen } from "lucide-react";

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
        <div className="container mx-auto py-16 text-center">
          <div className="max-w-3xl mx-auto bg-secondary/30 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Tarif Bulmaya Başlayın</h2>
            <p className="mb-6 text-muted-foreground max-w-lg mx-auto">
              Elinizde bulunan malzemeleri seçin ve size uygun tarifleri hemen keşfedin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" iconLeft={<Search className="mr-2 h-5 w-5" />}>
                  Malzemelere Göre Ara
                </Button>
              </Link>
              <Link to="/tarifler">
                <Button variant="outline" size="lg" iconLeft={<BookOpen className="mr-2 h-5 w-5" />}>
                  Tüm Tariflere Göz At
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Features />
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
