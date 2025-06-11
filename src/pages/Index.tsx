
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductShowcase from "@/components/ProductShowcase";
import { Button } from "@/components/ui-custom/Button";
import { Utensils, Search, BookOpen, ShoppingCart, ChefHat, Clock, Star, Filter, TrendingUp } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

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

  // Arama fonksiyonu
  const handleSearch = (recipeList: Recipe[] | undefined) => {
    if (!recipeList || recipeList.length === 0) {
      return searchTerm === "" ? fallbackRecipes : 
        fallbackRecipes.filter(recipe => 
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
    }

    if (searchTerm === "") {
      return getShuffledRecipes(recipeList, 4);
    }

    return recipeList.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    // Sayfa yüklendiğinde otomatik olarak karıştırılmış tarifleri göster
    if (recipes && recipes.length > 0) {
      const searchResults = handleSearch(recipes);
      setFilteredRecipes(searchResults);
      if (searchTerm === "") {
        setFeaturedRecipes(searchResults);
      }
    } else {
      const searchResults = handleSearch(undefined);
      setFilteredRecipes(searchResults);
      setFeaturedRecipes(searchResults);
    }
  }, [recipes, searchTerm]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "YemekyApp - Tarifler ve Malzemeler";
  }, []);

  return (
    <Layout>
      {/* Kompakt Hero Bölümü */}
      <section className="relative pt-20 pb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
              <ChefHat className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">YemekyApp'e Hoş Geldiniz</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
              Hangi Tarifi Denemek İstiyorsunuz?
            </h1>
            <p className="text-green-700/80 text-lg max-w-2xl mx-auto">
              Malzemelerinizi seçin veya popüler tarifleri keşfedin
            </p>
          </div>
        </div>
      </section>

      {/* Hızlı Arama ve Kategori Seçimi */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tarif veya malzeme arayın..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Link to="/products">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Malzeme Seç
                </Button>
              </Link>
              <Link to="/tarifler">
                <Button className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Tüm Tarifler
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hızlı Kategori Seçimi */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { name: "Kahvaltı", icon: "☕", path: "/kahvalti", color: "from-yellow-400 to-red-400" },
            { name: "Ana Yemek", icon: "🍽️", path: "/ana-yemekler", color: "from-red-400 to-pink-400" },
            { name: "Çorbalar", icon: "🍲", path: "/corbalar", color: "from-green-400 to-blue-400" },
            { name: "Tatlılar", icon: "🍰", path: "/tatlilar", color: "from-purple-400 to-pink-400" }
          ].map((category, index) => (
            <Link key={index} to={category.path}>
              <div className={`bg-gradient-to-br ${category.color} rounded-xl p-4 text-white hover:scale-105 transition-transform cursor-pointer shadow-md`}>
                <div className="text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-semibold">{category.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Öne Çıkan Tarifler */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">
              {searchTerm ? `"${searchTerm}" için Sonuçlar` : "Öne Çıkan Tarifler"}
            </h2>
          </div>
          <Link to="/tarifler">
            <Button variant="outline" size="sm">Tümünü Gör</Button>
          </Link>
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
          ) : filteredRecipes.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">"{searchTerm}" için tarif bulunamadı.</p>
              <p className="text-gray-400 text-sm mt-2">Farklı bir arama terimi deneyin.</p>
            </div>
          ) : (
            filteredRecipes.slice(0, 8).map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          )}
        </div>
      </section>

      {/* Popüler Malzemeler - Hızlı Seçim */}
      <section className="container mx-auto px-4 py-8">
        <Card className="border border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-green-800 flex items-center justify-center gap-2">
              <Utensils className="h-5 w-5" />
              Popüler Malzemeler ile Tarif Bul
            </CardTitle>
            <CardDescription className="text-green-700/80">
              Malzeme seçin, size özel tarifleri görün
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {popularIngredients.map((ingredient) => (
                <div key={ingredient.id} className="flex flex-col items-center p-3 rounded-lg hover:bg-green-100/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-green-200 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={ingredient.imageUrl} 
                      alt={ingredient.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-green-900 text-center">{ingredient.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Detaylı Malzeme Seçimi
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

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
        <div className="p-4 bg-gradient-to-br from-white to-green-50">
          <h3 className="font-semibold text-lg mb-2 text-green-800">{recipe.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700/70 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {recipe.prepTime} dk
            </span>
            <span className="px-2 py-1 bg-green-100 rounded-full text-xs font-medium text-green-800">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Index;
