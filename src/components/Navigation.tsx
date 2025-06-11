
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "./ui-custom/Button";
import ProfileMenu from "./ProfileMenu";
import { cn } from "@/lib/utils";
import { Menu, X, ChefHat, Utensils } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add body lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-2 glass glass-border border-t-0 border-x-0 shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChefHat className="h-7 w-7 text-primary" />
            <div className="font-bold text-2xl tracking-tight text-foreground">YemekyApp</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg">
              Ana Sayfa
            </Link>
            <Link to="/tarifler" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg">
              Tarifler
            </Link>
            <Link to="/products" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg">
              Malzemeler
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/login")}
              >
                Giriş Yap
              </Button>
            )}
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
            className="flex md:hidden text-foreground focus:outline-none p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden pt-20 overflow-y-auto"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="container mx-auto px-6 py-8 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="py-3 text-lg font-medium border-b border-border hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/tarifler"
                className="py-3 text-lg font-medium border-b border-border hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tarifler
              </Link>
              <Link
                to="/products"
                className="py-3 text-lg font-medium border-b border-border hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Malzemeler
              </Link>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile"
                    className="py-3 text-lg font-medium border-b border-border hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profilim
                  </Link>
                  <Link 
                    to="/favorites"
                    className="py-3 text-lg font-medium border-b border-border hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Favorilerim
                  </Link>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full"
                >
                  Giriş Yap
                </Button>
              )}
              <Button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/tarif-ekle");
                }} 
                iconLeft={<Utensils className="mr-1 h-4 w-4" />}
                className="mt-2 w-full"
              >
                Tarif Ekle
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
