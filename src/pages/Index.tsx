
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import { Button } from "@/components/ui-custom/Button";
import { Utensils, Search, BookOpen, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Popüler tarifler
const popularRecipes = [
  {
    id: 1,
    title: "Ev Yapımı Köfte",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
    prepTime: "30 dk",
    difficulty: "Kolay"
  },
  {
    id: 2,
    title: "Sebzeli Makarna",
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: "20 dk",
    difficulty: "Kolay"
  },
  {
    id: 3,
    title: "Çıtır Tavuk",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    prepTime: "45 dk",
    difficulty: "Orta"
  },
  {
    id: 4,
    title: "Karnıyarık",
    imageUrl: "https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    prepTime: "60 dk",
    difficulty: "Orta"
  }
];

// Örnek malzeme verileri
const popularIngredients = [
  { id: "tomato", name: "Domates", imageUrl: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
  { id: "cucumber", name: "Salatalık", imageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
  { id: "onion", name: "Soğan", imageUrl: "https://images.unsplash.com/photo-1618512496248-a3c25032cd9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" },
  { id: "pepper", name: "Biber", imageUrl: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { id: "lentil", name: "Mercimek", imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { id: "chickpea", name: "Nohut", imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
];

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "YemekyApp - Tarifler ve Malzemeler";
  }, []);

  return (
    <Layout>
      <Hero />
      
      {/* Popüler Tarifler Bölümü - Yeni eklenen bölüm */}
      <div className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-orange-800 mb-4">Popüler Tarifler</h2>
          <p className="text-orange-700/80 max-w-2xl mx-auto">
            En çok tercih edilen lezzetli tarifleri keşfedin ve hemen mutfağa koşun!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRecipes.map((recipe) => (
            <Link key={recipe.id} to="/tarifler" className="group">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-gradient-to-br from-white to-amber-50">
                  <h3 className="font-semibold text-lg mb-2 text-orange-800">{recipe.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-700/70 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {recipe.prepTime}
                    </span>
                    <span className="px-2 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/tarifler">
            <Button variant="primary" size="lg">
              Tüm Tarifleri Keşfet
            </Button>
          </Link>
        </div>
      </div>
      
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
    </Layout>
  );
};

export default Index;
