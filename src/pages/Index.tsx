
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import { Button } from "@/components/ui-custom/Button";
import { Utensils, Search, BookOpen, ShoppingCart } from "lucide-react";
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
const fallbackRecipes = [
  {
    _id: "1",
    title: "Ev Yapımı Köfte",
    description: "Lezzetli ve kolay hazırlanan ev köftesi",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
    prepTime: 30,
    difficulty: "Kolay",
    rating: 4.8
  },
  {
    _id: "2",
    title: "Sebzeli Makarna",
    description: "Sağlıklı ve doyurucu sebzeli makarna",
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: 20,
    difficulty: "Kolay",
    rating: 4.6
  },
  {
    _id: "3",
    title: "Çıtır Tavuk",
    description: "Dışı çıtır içi yumuşacık tavuk",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    prepTime: 45,
    difficulty: "Orta",
    rating: 4.7
  },
  {
    _id: "4",
    title: "Karnıyarık",
    description: "Geleneksel Türk mutfağının vazgeçilmezi",
    imageUrl: "https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    prepTime: 60,
    difficulty: "Orta",
    rating: 4.9
  }
];

// Sezonluk tarif önerileri
const seasonalRecipes = [
  {
    _id: "5",
    title: "Kabak Mücver",
    description: "Yaz aylarının vazgeçilmezi",
    imageUrl: "https://images.unsplash.com/photo-1571167530942-9d6900045ed8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: 25,
    difficulty: "Kolay",
    rating: 4.7
  },
  {
    _id: "6",
    title: "Balkabağı Çorbası",
    description: "Sonbahar lezzeti",
    imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    prepTime: 40,
    difficulty: "Orta",
    rating: 4.5
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
  const [rotateRecipes, setRotateRecipes] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde otomatik olarak karıştırılmış tarifleri göster
    if (recipes && recipes.length > 0) {
      setFeaturedRecipes(getShuffledRecipes(recipes, 4));
    } else {
      setFeaturedRecipes(fallbackRecipes);
    }

    // Belirli aralıklarla tarifleri değiştir
    const interval = setInterval(() => {
      setRotateRecipes(prev => !prev);
    }, 60000); // Her dakika tarifleri yenile

    return () => clearInterval(interval);
  }, [recipes, rotateRecipes]);

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
      <div className="container mx-auto py-12">
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
      </div>
      
      {/* Sezonluk Öneriler */}
      <div className="container mx-auto py-12">
        <div className="bg-gradient-to-r from-amber-100/80 to-orange-100/80 rounded-2xl p-8 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-800 mb-3">Sezonun Lezzetleri</h2>
            <p className="text-orange-700/80 max-w-2xl mx-auto">
              Mevsimin en taze malzemeleriyle hazırlanan özel tarifler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seasonalRecipes.map((recipe) => (
              <div key={recipe._id} className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-orange-800">{recipe.title}</h3>
                    <p className="text-orange-700/70 mb-4">{recipe.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-amber-100 rounded-full text-sm font-medium text-amber-800">
                        {recipe.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-amber-100 rounded-full text-sm font-medium text-amber-800">
                        {recipe.prepTime} dk
                      </span>
                    </div>
                  </div>
                  <Link to="/tarifler" className="self-start">
                    <Button variant="primary" size="sm">
                      Tarifi Gör
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Malzeme Seçimi Alanı - Ortada Kaldı */}
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
      </div>
      
      {/* Popüler Tarifler (Binlerce Tarif Keşfedin) - En alta taşındı */}
      <div className="container mx-auto py-16 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-3xl my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-orange-800 mb-4">Binlerce Tarif Keşfedin</h2>
          <p className="text-orange-700/80 max-w-2xl mx-auto">
            En sevilen ve en çok pişirilen tariflerimizi keşfedin. Her damak zevkine uygun yüzlerce tarif sizleri bekliyor!
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {['Kahvaltılıklar', 'Ana Yemekler', 'Tatlılar', 'İçecekler'].map((category, index) => (
            <Link key={index} to="/tarifler" className="group">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1 h-full">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                    <Utensils className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-orange-800">{category}</h3>
                  <p className="text-orange-700/70 text-sm">
                    {index === 0 && 'Güne enerji dolu başlamak için...'}
                    {index === 1 && 'Ailece keyifle yiyebileceğiniz...'}
                    {index === 2 && 'Tatlı krizleriniz için çözümler...'}
                    {index === 3 && 'Serinleten ve enerji veren...'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/tarifler">
            <Button variant="primary" size="lg">
              Tüm Kategorileri Keşfet
            </Button>
          </Link>
        </div>
      </div>
      
      <Features />
      <ProductShowcase />
    </Layout>
  );
};

// Tekrar kullanılabilir Tarif Kartı bileşeni
const RecipeCard = ({ recipe }: { recipe: any }) => {
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
