
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui-custom/Button";
import { Utensils, Search, BookOpen, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Örnek malzeme verileri
const popularIngredients = [
  { id: "tomato", name: "Domates", imageUrl: "/placeholder.svg" },
  { id: "cucumber", name: "Salatalık", imageUrl: "/placeholder.svg" },
  { id: "onion", name: "Soğan", imageUrl: "/placeholder.svg" },
  { id: "pepper", name: "Biber", imageUrl: "/placeholder.svg" },
  { id: "lentil", name: "Mercimek", imageUrl: "/placeholder.svg" },
  { id: "chickpea", name: "Nohut", imageUrl: "/placeholder.svg" },
];

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "YemekyApp - Tarifler ve Malzemeler";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
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
        
        {/* Yeni eklenen malzeme seçim bölümü */}
        <div className="container mx-auto py-12 px-4">
          <Card className="border border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ne Yapacağınıza Karar Veremediniz mi?</CardTitle>
              <CardDescription className="text-lg">
                Evdeki malzemelerinizi seçin, size özel tarif önerelim!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="popular" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="popular">Popüler Malzemeler</TabsTrigger>
                  <TabsTrigger value="all">Tüm Malzemeler</TabsTrigger>
                </TabsList>
                <TabsContent value="popular" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {popularIngredients.map((ingredient) => (
                      <div key={ingredient.id} className="flex flex-col items-center p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-background border border-border mb-2">
                          <img 
                            src={ingredient.imageUrl} 
                            alt={ingredient.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{ingredient.name}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="all" className="mt-6">
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">Tüm malzemeleri görmek ve seçim yapmak için tam malzeme listesine gidin</p>
                    <Link to="/products">
                      <Button iconLeft={<ShoppingCart className="mr-2 h-5 w-5" />}>
                        Malzeme Seçimine Git
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Link to="/products">
                <Button size="lg" variant="default">
                  Malzeme Seçimini Tamamla ve Tarif Bul
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <Features />
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
