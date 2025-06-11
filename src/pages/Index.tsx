
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import { Button } from "@/components/ui-custom/Button";
import { Utensils, Search, BookOpen, ShoppingCart, ChefHat, Clock, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, Recipe } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

// Örnek malzeme verileri
const popularIngredients = [
  { id: "tomato", name: "Domates", imageUrl: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
  { id: "cucumber", name: "Salatalık", imageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
  { id: "onion", name: "Soğan", imageUrl: "https://images.unsplash.com/photo-1618512496248-a3c25032cd9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" },
  { id: "pepper", name: "Biber", imageUrl: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { id: "lentil", name: "Mercimek", imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { id: "chickpea", name: "Nohut", imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
];

// Örnek yemek verileri (API bağlantısı yoksa kullanılır)
const fallbackRecipes: Recipe[] = [
  {
    _id: "1",
    title: "Ev Yapımı Köfte",
    description: "Lezzetli ve kolay hazırlanan ev köftesi",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
    prepTime: 30,
    difficulty: "Kolay",
    rating: 4.8,
    category: "Ana Yemek",
    cookTime: 15,
    featured: true,
    ingredients: ["kıyma", "soğan", "maydanoz", "tuz", "karabiber"],
    instructions: ["Kıymayı geniş bir kaba alın", "Soğan ve maydanozu ince kıyın ve kıymaya ekleyin", "Tuz ve karabiber ekleyip iyice yoğurun", "Köfteleri şekillendirip pişirin"],
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    title: "Sebzeli Makarna",
    description: "Sağlıklı ve doyurucu sebzeli makarna",
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: 20,
    difficulty: "Kolay",
    rating: 4.6,
    category: "Ana Yemek",
    cookTime: 10,
    featured: true,
    ingredients: ["makarna", "kabak", "havuç", "biber", "soğan", "sarımsak", "zeytinyağı"],
    instructions: ["Makarnayı haşlayın", "Sebzeleri küçük küçük doğrayın", "Sebzeleri zeytinyağında soteleyin", "Haşlanmış makarnayı sebzelerle karıştırın"],
    createdAt: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Çıtır Tavuk",
    description: "Dışı çıtır içi yumuşacık tavuk",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    prepTime: 45,
    difficulty: "Orta",
    rating: 4.7,
    category: "Ana Yemek",
    cookTime: 30,
    featured: true,
    ingredients: ["tavuk göğsü", "un", "yumurta", "galeta unu", "tuz", "karabiber", "kekik"],
    instructions: ["Tavukları dilimleyin", "Una bulayıp yumurtaya batırın", "Galeta ununa bulayın", "Kızgın yağda pişirin"],
    createdAt: new Date().toISOString()
  },
  {
    _id: "4",
    title: "Karnıyarık",
    description: "Geleneksel Türk mutfağının vazgeçilmezi",
    imageUrl: "https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    prepTime: 60,
    difficulty: "Orta",
    rating: 4.9,
    category: "Ana Yemek",
    cookTime: 40,
    featured: true,
    ingredients: ["patlıcan", "kıyma", "soğan", "domates", "biber", "sarımsak", "zeytinyağı"],
    instructions: ["Patlıcanları boydan yarıp tuzlu suda bekletin", "Kıymalı harcı hazırlayın", "Patlıcanları kızartıp içini açın", "Kıymalı harcı doldurup fırınlayın"],
    createdAt: new Date().toISOString()
  }
];

const Index = () => {
  // API'den tarifleri çekme
  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: api.getRecipes,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 dakika
  });

  // Tarifleri karıştırma fonksiyonu (kullanıcıya hep farklı tarifler göster)
  const getShuffledRecipes = (recipeList: Recipe[] | undefined, count: number) => {
    if (!recipeList || recipeList.length === 0) {
      return fallbackRecipes.slice(0, count);
    }
    
    // Tarifleri karıştır
    const shuffled = [...recipeList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Güncel ve yüksek puanlı tarif önerileri
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Sayfa yüklendiğinde otomatik olarak karıştırılmış tarifleri göster
    if (recipes && recipes.length > 0) {
      setFeaturedRecipes(getShuffledRecipes(recipes, 4));
    } else {
      setFeaturedRecipes(fallbackRecipes);
    }
  }, [recipes]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "YemekyApp - Tarifler ve Malzemeler";
  }, []);

  return (
    <Layout>
      <Hero />
      
      {/* Günün Tarifleri - Dinamik Öneriler */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-orange-800 mb-3">Günün Tarifleri</h2>
          <p className="text-orange-700/80 max-w-2xl mx-auto">
            Her gün yenilenen lezzetli tarif önerileri ile mutfağınıza ilham katın!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Yükleme durumunda gösterilecek placeholder
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md bg-white/50 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : error ? (
            // Hata durumunda fallback tarifleri göster
            fallbackRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            // API'den gelen tarifleri göster
            featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          )}
        </div>
      </section>
      
      {/* Malzeme Seçimi Alanı */}
      <section className="container mx-auto px-4 py-12">
        <Card className="border border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="text-center border-b border-amber-100 pb-6">
            <CardTitle className="text-2xl text-orange-800">Ne Yapacağınıza Karar Veremediniz mi?</CardTitle>
            <CardDescription className="text-lg text-orange-700/80">
              Evdeki malzemelerinizi seçin, size özel tarif önerelim!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-amber-100/50 mb-6">
                <TabsTrigger value="popular" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">Popüler Malzemeler</TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">Tüm Malzemeler</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {popularIngredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex flex-col items-center p-3 rounded-lg hover:bg-amber-100/50 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-amber-200 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                        <img 
                          src={ingredient.imageUrl} 
                          alt={ingredient.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-amber-900 text-center">{ingredient.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="all" className="mt-6">
                <div className="text-center py-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <p className="text-orange-700/80 mb-4">Tüm malzemeleri görmek ve seçim yapmak için tam malzeme listesine gidin</p>
                  <Link to="/products">
                    <Button iconLeft={<ShoppingCart className="mr-2 h-5 w-5" />} variant="secondary">
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
      </section>
      
      {/* En Popüler Şefler ve Trend Tarifler */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-50 to-amber-100/70 rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-orange-800 mb-3">Şeflerden İlham Alın</h2>
            <p className="text-orange-700/80 max-w-2xl mx-auto">
              Tecrübeli şeflerimizin özel tarifleri ve püf noktaları ile mutfakta ustalaşın!
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/tarifler">
              <Button variant="primary" size="lg" iconRight={<Search className="ml-1 w-5 h-5" />}>
                Tüm Tarifleri Keşfet
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Features />
      <ProductShowcase />
    </Layout>
  );
};

// Tekrar kullanılabilir Tarif Kartı bileşeni
const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link to={`/tarifler/${recipe._id}`} className="group">
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1 h-full">
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
              <Clock className="h-4 w-4 mr-1" />
              {recipe.prepTime} dk
            </span>
            <span className="px-2 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Index;
