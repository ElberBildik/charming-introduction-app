
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto py-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-orange-100 to-amber-50 p-8 rounded-2xl shadow-md border border-amber-100">
            <h2 className="text-2xl font-bold mb-4 text-orange-800">Tarif Bulmaya Başlayın</h2>
            <p className="mb-6 text-orange-700/80 max-w-lg mx-auto">
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
          <Card className="border border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader className="text-center border-b border-amber-100 pb-6">
              <CardTitle className="text-2xl text-orange-800">Ne Yapacağınıza Karar Veremediniz mi?</CardTitle>
              <CardDescription className="text-lg text-orange-700/80">
                Evdeki malzemelerinizi seçin, size özel tarif önerelim!
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="popular" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-amber-100/50">
                  <TabsTrigger value="popular" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">Popüler Malzemeler</TabsTrigger>
                  <TabsTrigger value="all" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">Tüm Malzemeler</TabsTrigger>
                </TabsList>
                <TabsContent value="popular" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {popularIngredients.map((ingredient) => (
                      <div key={ingredient.id} className="flex flex-col items-center p-2 rounded-lg hover:bg-amber-100/50 transition-colors cursor-pointer">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-amber-200 mb-2 shadow-sm">
                          <img 
                            src={ingredient.imageUrl} 
                            alt={ingredient.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-amber-900">{ingredient.name}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="all" className="mt-6">
                  <div className="text-center py-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <p className="text-orange-700/80 mb-4">Tüm malzemeleri görmek ve seçim yapmak için tam malzeme listesine gidin</p>
                    <Link to="/products">
                      <Button iconLeft={<ShoppingCart className="mr-2 h-5 w-5" />}>
                        Malzeme Seçimine Git
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-amber-100 pt-6">
              <Link to="/products">
                <Button size="lg" variant="primary">
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
