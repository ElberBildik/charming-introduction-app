
import React, { useState, useEffect } from "react";
import { Filter, Search, ChevronDown, Book } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui-custom/Button";
import { cn } from "@/lib/utils";

// Veri modelleri
type Category = {
  id: string;
  name: string;
  type: "fruits" | "vegetables" | "legumes";
};

type Ingredient = {
  id: string;
  name: string;
  categoryId: string;
  imageUrl: string;
};

type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  imageUrl: string;
};

// Örnek veriler
const categories: Category[] = [
  { id: "fruits", name: "Meyveler", type: "fruits" },
  { id: "vegetables", name: "Sebzeler", type: "vegetables" },
  { id: "legumes", name: "Bakliyatlar", type: "legumes" },
];

const ingredients: Ingredient[] = [
  { id: "apple", name: "Elma", categoryId: "fruits", imageUrl: "/placeholder.svg" },
  { id: "banana", name: "Muz", categoryId: "fruits", imageUrl: "/placeholder.svg" },
  { id: "orange", name: "Portakal", categoryId: "fruits", imageUrl: "/placeholder.svg" },
  { id: "strawberry", name: "Çilek", categoryId: "fruits", imageUrl: "/placeholder.svg" },
  { id: "tomato", name: "Domates", categoryId: "vegetables", imageUrl: "/placeholder.svg" },
  { id: "cucumber", name: "Salatalık", categoryId: "vegetables", imageUrl: "/placeholder.svg" },
  { id: "pepper", name: "Biber", categoryId: "vegetables", imageUrl: "/placeholder.svg" },
  { id: "carrot", name: "Havuç", categoryId: "vegetables", imageUrl: "/placeholder.svg" },
  { id: "onion", name: "Soğan", categoryId: "vegetables", imageUrl: "/placeholder.svg" },
  { id: "lentil", name: "Mercimek", categoryId: "legumes", imageUrl: "/placeholder.svg" },
  { id: "chickpea", name: "Nohut", categoryId: "legumes", imageUrl: "/placeholder.svg" },
  { id: "bean", name: "Fasulye", categoryId: "legumes", imageUrl: "/placeholder.svg" },
  { id: "pea", name: "Bezelye", categoryId: "legumes", imageUrl: "/placeholder.svg" },
];

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Sebzeli Mercimek Çorbası",
    description: "Lezzetli ve besleyici sebzeli mercimek çorbası",
    ingredients: ["lentil", "tomato", "carrot", "onion"],
    instructions: "Mercimekleri yıkayın. Soğanları doğrayın ve zeytinyağında kavurun. Havuç ve domatesleri ekleyip karıştırın. Mercimekleri ve suyu ekleyin. Kaynayınca ateşi kısın ve 30 dakika pişirin.",
    prepTime: 15,
    cookTime: 30,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Meyveli Salata",
    description: "Tatlı ve taze meyveli salata",
    ingredients: ["apple", "banana", "strawberry", "orange"],
    instructions: "Tüm meyveleri küp şeklinde doğrayın. Bir kaseye koyun ve karıştırın. İsteğe bağlı olarak balımsı bir sos ile servis yapabilirsiniz.",
    prepTime: 10,
    cookTime: 0,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Nohutlu Sebze Yemeği",
    description: "Lezzetli nohutlu sebze yemeği",
    ingredients: ["chickpea", "tomato", "pepper", "onion"],
    instructions: "Nohutu bir gece önceden ıslatın. Soğanları doğrayın ve zeytinyağında kavurun. Biber ve domatesleri ekleyin. Nohutu ekleyin ve 45 dakika pişirin.",
    prepTime: 20,
    cookTime: 45,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Karışık Sebze Salatası",
    description: "Hafif ve sağlıklı sebze salatası",
    ingredients: ["tomato", "cucumber", "pepper", "onion"],
    instructions: "Tüm sebzeleri ince ince doğrayın. Bir kaseye koyun ve zeytinyağı, limon suyu, tuz ve karabiber ile karıştırın.",
    prepTime: 15,
    cookTime: 0,
    imageUrl: "/placeholder.svg"
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [matchingRecipes, setMatchingRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Sayfa yüklendiğinde başlığı ayarla
    document.title = "YemekyApp - Malzemeler ve Tarifler";
    
    // İlk yüklemede tüm tarifleri göster
    findMatchingRecipes();
  }, []);

  // İçerik filtreleme mantığı
  useEffect(() => {
    findMatchingRecipes();
  }, [selectedIngredients, searchTerm]);

  const findMatchingRecipes = () => {
    if (selectedIngredients.length === 0 && searchTerm === "") {
      setMatchingRecipes(recipes);
      return;
    }

    const filtered = recipes.filter(recipe => {
      // Arama terimini kontrol et
      const titleMatch = searchTerm === "" || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Seçili malzemeler varsa kontrol et
      const ingredientsMatch = selectedIngredients.length === 0 || 
        selectedIngredients.every(ing => recipe.ingredients.includes(ing));
      
      return titleMatch && ingredientsMatch;
    });
    
    setMatchingRecipes(filtered);
  };

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const filteredIngredients = activeCategory === "all"
    ? ingredients
    : ingredients.filter(item => item.categoryId === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">YemekyApp</h1>
          <p className="text-muted-foreground">Malzemelerinizi seçin, size uygun tarifleri bulun!</p>
        </div>

        {/* Arama */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Tarif ara..."
            className="w-full pl-10 pr-4 py-2 border border-input rounded-full bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Kategoriler */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} />
            <h2 className="text-lg font-medium">Kategoriler</h2>
          </div>
          
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

        {/* Malzemeler */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ChevronDown size={18} />
              <h2 className="text-lg font-medium">Malzemeler</h2>
            </div>
            
            {selectedIngredients.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedIngredients([])}
              >
                Temizle
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredIngredients.map(ingredient => (
              <div 
                key={ingredient.id}
                onClick={() => toggleIngredient(ingredient.id)}
                className={cn(
                  "relative cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md",
                  selectedIngredients.includes(ingredient.id) 
                    ? "border-primary bg-primary/10" 
                    : "border-border bg-background"
                )}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={ingredient.imageUrl} 
                      alt={ingredient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{ingredient.name}</span>
                </div>
                
                {selectedIngredients.includes(ingredient.id) && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tarifler */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Book size={18} />
            <h2 className="text-lg font-medium">Bulunan Tarifler ({matchingRecipes.length})</h2>
          </div>
          
          {matchingRecipes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Seçili malzemelerle uyumlu tarif bulunamadı.</p>
              <p className="text-sm">Farklı malzemeler seçmeyi deneyin veya aramanızı değiştirin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingRecipes.map(recipe => (
                <div key={recipe.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{recipe.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{recipe.description}</p>
                    
                    <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                      <div>Hazırlık: {recipe.prepTime} dk</div>
                      <div>Pişirme: {recipe.cookTime} dk</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">İçindekiler:</div>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.map(ingId => {
                          const ingredient = ingredients.find(i => i.id === ingId);
                          return (
                            <span 
                              key={ingId}
                              className={cn(
                                "inline-block px-2 py-1 text-xs rounded-full",
                                selectedIngredients.includes(ingId)
                                  ? "bg-primary/20 text-primary"
                                  : "bg-secondary text-secondary-foreground"
                              )}
                            >
                              {ingredient?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <Button className="w-full">Tarifi Görüntüle</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
