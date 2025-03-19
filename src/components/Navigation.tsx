
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui-custom/Button";
import { cn } from "@/lib/utils";
import { Menu, X, ChefHat, Utensils, BookOpen } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 glass glass-border border-t-0 border-x-0 shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-7 w-7 text-primary" />
            <div className="font-bold text-2xl tracking-tight">YemekyApp</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <Link to="/tarifler" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Tarifler
            </Link>
            <Link to="/products" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Malzemeler
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/login")}
            >
              Giriş Yap
            </Button>
            <Button 
              size="sm" 
              iconLeft={<Utensils className="mr-1 h-4 w-4" />}
              onClick={() => navigate("/tarif-ekle")}
            >
              Tarif Ekle
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="flex md:hidden text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background md:hidden transition-transform duration-300 ease-in-out pt-20",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="py-3 text-lg font-medium border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/tarifler"
              className="py-3 text-lg font-medium border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tarifler
            </Link>
            <Link
              to="/products"
              className="py-3 text-lg font-medium border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Malzemeler
            </Link>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/login");
              }}
            >
              Giriş Yap
            </Button>
            <Button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/tarif-ekle");
              }} 
              iconLeft={<Utensils className="mr-1 h-4 w-4" />}
            >
              Tarif Ekle
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
