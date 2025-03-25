
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, ThumbsUp, Search, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";

const Favorites = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Simulate API call to get favorite recipes
    const fetchFavorites = async () => {
      try {
        // Mock API response
        setTimeout(() => {
          setFavorites([
            {
              id: 1,
              title: "Mantı",
              description: "Geleneksel Türk mantısı, yoğurt ve baharatlı tereyağı ile servis edilir.",
              image: "/placeholder.svg",
              prepTime: "45 dakika",
              likes: 128,
              category: "Ana Yemek"
            },
            {
              id: 2,
              title: "İçli Köfte",
              description: "İçli köfte, dışı bulgur içi kıymalı Türk mutfağının meşhur yemeği.",
              image: "/placeholder.svg",
              prepTime: "60 dakika",
              likes: 96,
              category: "Meze"
            },
            {
              id: 3,
              title: "Sütlaç",
              description: "Klasik Türk tatlısı sütlaç, pirinç ve süt ile hazırlanır, fırında kızartılır.",
              image: "/placeholder.svg",
              prepTime: "30 dakika",
              likes: 157,
              category: "Tatlı"
            },
            {
              id: 4,
              title: "Patlıcan Kebabı",
              description: "Közlenmiş patlıcan ve et ile hazırlanan lezzetli bir kebap çeşidi.",
              image: "/placeholder.svg",
              prepTime: "50 dakika",
              likes: 84,
              category: "Ana Yemek"
            },
            {
              id: 5,
              title: "Baklava",
              description: "İnce yufka, fındık ve şerbetle hazırlanan geleneksel Türk tatlısı.",
              image: "/placeholder.svg",
              prepTime: "90 dakika",
              likes: 215,
              category: "Tatlı"
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching favorites", error);
        toast({
          title: "Hata",
          description: "Favori tarifler yüklenirken bir hata oluştu.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, [toast]);
  
  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((recipe: any) => recipe.id !== id));
    toast({
      title: "Favorilerden çıkarıldı",
      description: "Tarif favorilerinizden kaldırıldı.",
    });
  };
  
  const filteredFavorites = favorites.filter((recipe: any) => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-orange-800">Favori Tariflerim</h1>
            <p className="text-muted-foreground">Beğendiğiniz ve kaydettiğiniz tüm tarifler</p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tariflerde ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64 border-amber-200 focus:border-amber-300"
              />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse">Yükleniyor...</div>
          </div>
        ) : filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((recipe: any) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="absolute w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                      onClick={() => handleRemoveFavorite(recipe.id)}
                    >
                      <Bookmark className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-500/90 text-white text-xs py-1 px-2 rounded-full">
                        {recipe.category}
                      </span>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-orange-800">{recipe.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {recipe.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{recipe.prepTime}</span>
                    <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    <span>{recipe.likes} beğeni</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    onClick={() => navigate(`/tarifler/${recipe.id}`)}
                  >
                    Tarifi Görüntüle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Utensils className="h-12 w-12 text-orange-300 mb-4" />
              {searchQuery ? (
                <>
                  <h3 className="text-xl font-medium text-orange-800 mb-2">Arama sonucu bulunamadı</h3>
                  <p className="text-center text-muted-foreground mb-6">
                    "{searchQuery}" ile eşleşen bir tarif bulamadık. Farklı bir arama yapmayı deneyin.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-medium text-orange-800 mb-2">Henüz favori tarifiniz yok</h3>
                  <p className="text-center text-muted-foreground mb-6">
                    Tarifler sayfasına giderek beğendiğiniz tarifleri favorilerinize ekleyebilirsiniz.
                  </p>
                </>
              )}
              <Button 
                onClick={() => navigate("/tarifler")}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Tariflere Göz At
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
