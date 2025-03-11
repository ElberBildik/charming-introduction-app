
import React, { useState, useEffect } from "react";
import { Search, Filter, ChefHat, Clock, Tags, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui-custom/Button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Recipe categories
const categories = [
  { id: "main", name: "Ana Yemekler" },
  { id: "soup", name: "Çorbalar" },
  { id: "dessert", name: "Tatlılar" },
  { id: "vegetarian", name: "Vejetaryen" },
  { id: "vegan", name: "Vegan" },
  { id: "breakfast", name: "Kahvaltı" },
  { id: "snack", name: "Atıştırmalık" }
];

// Recipe difficulty levels
const difficultyLevels = ["Kolay", "Orta", "Zor"];

// Example recipe data
const recipes = [
  {
    id: "1",
    title: "Sebzeli Mercimek Çorbası",
    description: "Lezzetli ve besleyici sebzeli mercimek çorbası",
    category: "soup",
    prepTime: 15,
    cookTime: 30,
    difficulty: "Kolay",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    featured: true,
    ingredients: ["Mercimek", "Soğan", "Havuç", "Domates", "Zeytinyağı", "Tuz", "Karabiber"],
  },
  {
    id: "2",
    title: "Mantarlı Risotto",
    description: "Kremalı ve lezzetli İtalyan risotto",
    category: "main",
    prepTime: 20,
    cookTime: 30,
    difficulty: "Orta",
    imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.6,
    featured: true,
    ingredients: ["Arborio Pirinci", "Mantar", "Soğan", "Sarımsak", "Beyaz Şarap", "Parmesan Peyniri"],
  },
  {
    id: "3",
    title: "Fırında Sütlaç",
    description: "Geleneksel Türk tatlısı, fırında karamelize edilmiş",
    category: "dessert",
    prepTime: 15,
    cookTime: 60,
    difficulty: "Kolay",
    imageUrl: "https://images.unsplash.com/photo-1600289031464-74d374b64991?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.9,
    featured: false,
    ingredients: ["Pirinç", "Süt", "Şeker", "Vanilya", "Tereyağı"],
  },
  {
    id: "4",
    title: "Izgara Köfte",
    description: "Ev yapımı baharatlı Türk köftesi",
    category: "main",
    prepTime: 30,
    cookTime: 15,
    difficulty: "Orta",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.7,
    featured: true,
    ingredients: ["Kıyma", "Soğan", "Maydanoz", "Sarımsak", "Kimyon", "Kırmızı Biber"],
  },
  {
    id: "5",
    title: "Avokado Tostu",
    description: "Sağlıklı ve lezzetli kahvaltı seçeneği",
    category: "breakfast",
    prepTime: 10,
    cookTime: 5,
    difficulty: "Kolay",
    imageUrl: "https://images.unsplash.com/photo-1603046891744-76163e7acce1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    featured: false,
    ingredients: ["Ekşi Maya Ekmeği", "Avokado", "Limon", "Kırmızı Biber Pulu", "Tuz"],
  },
  {
    id: "6",
    title: "Patlıcan Musakka",
    description: "Geleneksel Türk mutfağından lezzetli bir ana yemek",
    category: "main",
    prepTime: 30,
    cookTime: 45,
    difficulty: "Zor",
    imageUrl: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    featured: false,
    ingredients: ["Patlıcan", "Kıyma", "Soğan", "Domates", "Biber", "Sarımsak"],
  }
];

const Tarifler = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  
  useEffect(() => {
    // Set page title
    document.title = "YemekyApp - Tarifler";
    
    // Filter recipes based on search, category, and difficulty
    const filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "all" || recipe.category === activeCategory;
      const matchesDifficulty = activeDifficulty === "all" || recipe.difficulty === activeDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    setFilteredRecipes(filtered);
  }, [searchTerm, activeCategory, activeDifficulty]);

  // Featured recipes
  const featuredRecipes = recipes.filter(recipe => recipe.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <div className="bg-primary/10 py-12 mb-8 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Lezzetli Tarifler</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Birbirinden lezzetli ve kolay yapılabilir tariflerimizi keşfedin.
                Her seviyeye uygun yemekler ve pratik püf noktaları.
              </p>
              <div className="relative max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Tarif ara..."
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-input bg-background shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        {/* Featured recipes */}
        <section className="container mx-auto px-6 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="text-2xl font-bold">Öne Çıkan Tarifler</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map(recipe => (
              <div key={recipe.id} className="group relative rounded-xl overflow-hidden shadow-md hover-lift">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/80 rounded-full text-xs font-medium">
                        {categories.find(cat => cat.id === recipe.category)?.name}
                      </span>
                      <span className="px-2 py-1 bg-black/30 rounded-full text-xs font-medium flex items-center">
                        <Clock size={12} className="mr-1" />
                        {recipe.prepTime + recipe.cookTime} dk
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{recipe.title}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(recipe.rating) ? "text-amber-400" : "text-gray-400"}`}>★</span>
                      ))}
                      <span className="text-xs ml-1">{recipe.rating}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/tarifler/${recipe.id}`} className="absolute inset-0">
                  <span className="sr-only">Tarifi görüntüle</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
        
        {/* Filters */}
        <section className="container mx-auto px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} />
            <h2 className="text-lg font-bold">Filtreler</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Categories */}
            <div className="w-full md:w-auto">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Tags size={16} />
                Kategoriler
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeCategory === "all" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("all")}
                  className="rounded-full"
                >
                  Tümü
                </Button>
                
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className="rounded-full"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Difficulty */}
            <div className="w-full md:w-auto">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                <ChefHat size={16} />
                Zorluk
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeDifficulty === "all" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveDifficulty("all")}
                  className="rounded-full"
                >
                  Tümü
                </Button>
                
                {difficultyLevels.map(level => (
                  <Button
                    key={level}
                    variant={activeDifficulty === level ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setActiveDifficulty(level)}
                    className="rounded-full"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Recipe list */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ChefHat className="text-primary" size={24} />
            {filteredRecipes.length > 0 ? "Tarifler" : "Hiç tarif bulunamadı"}
          </h2>
          
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Aramanızla eşleşen tarif bulunamadı.</p>
              <p className="text-sm mt-2">Lütfen farklı bir arama terimi kullanın veya filtreleri değiştirin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} className="border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/60 text-white rounded-full text-xs">
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{recipe.title}</h3>
                      <div className="flex items-center text-amber-500">
                        <span className="text-sm mr-1">{recipe.rating}</span>
                        <span>★</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{recipe.description}</p>
                    
                    <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{recipe.prepTime + recipe.cookTime} dk</span>
                      </div>
                      <div className="px-2 py-0.5 bg-secondary rounded-full text-xs">
                        {categories.find(cat => cat.id === recipe.category)?.name}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-medium uppercase text-muted-foreground mb-2">Malzemeler:</h4>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                            {ing}
                          </span>
                        ))}
                        {recipe.ingredients.length > 4 && (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                            +{recipe.ingredients.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Link to={`/tarifler/${recipe.id}`}>
                      <Button className="w-full">Tarifi Görüntüle</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tarifler;
