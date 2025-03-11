
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "Essentio - Minimal Design System";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
