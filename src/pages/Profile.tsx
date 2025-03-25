
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PenSquare, BookOpen, Bookmark, Settings, User as UserIcon } from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for profile
  const [myRecipes, setMyRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  
  useEffect(() => {
    // Simulate API call to get user data
    const fetchUserData = async () => {
      try {
        // Mock API response
        setTimeout(() => {
          setMyRecipes([
            { id: 1, title: "Mercimek Çorbası", image: "/placeholder.svg", likes: 24 },
            { id: 2, title: "Karnıyarık", image: "/placeholder.svg", likes: 18 },
            { id: 3, title: "Sütlaç", image: "/placeholder.svg", likes: 32 },
          ]);
          
          setFavoriteRecipes([
            { id: 4, title: "Mantı", image: "/placeholder.svg", likes: 45 },
            { id: 5, title: "İçli Köfte", image: "/placeholder.svg", likes: 38 },
          ]);
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast({
          title: "Hata",
          description: "Kullanıcı bilgileri yüklenirken bir hata oluştu.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [toast]);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const RecipeCard = ({ recipe }: { recipe: any }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 text-orange-800">{recipe.title}</h3>
        <div className="flex items-center text-orange-600">
          <Bookmark className="h-4 w-4 mr-1" />
          <span>{recipe.likes} beğeni</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-2 border-amber-200">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-amber-100 text-amber-800 text-xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h2 className="text-2xl font-bold text-orange-800 mb-1">{user.name}</h2>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="text-center">
                    <p className="font-bold text-orange-700">{myRecipes.length}</p>
                    <p className="text-xs text-muted-foreground">Tarifler</p>
                  </div>
                  <div className="h-8 border-r border-gray-200"></div>
                  <div className="text-center">
                    <p className="font-bold text-orange-700">{favoriteRecipes.length}</p>
                    <p className="text-xs text-muted-foreground">Favoriler</p>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <Button 
                    onClick={() => navigate("/tarif-ekle")}
                    className="w-full flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    <PenSquare className="h-4 w-4" />
                    <span>Tarif Ekle</span>
                  </Button>
                  <Button 
                    onClick={() => navigate("/settings")}
                    variant="outline"
                    className="w-full flex items-center gap-2 border-amber-200 text-orange-700 hover:bg-amber-50"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Ayarlar</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Tabs defaultValue="recipes">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="recipes" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Tariflerim</span>
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Favorilerim</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recipes">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-pulse">Yükleniyor...</div>
                  </div>
                ) : myRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="h-12 w-12 text-orange-300 mb-4" />
                      <h3 className="text-xl font-medium text-orange-800 mb-2">Henüz bir tarif eklememişsiniz</h3>
                      <p className="text-center text-muted-foreground mb-6">
                        İlk tarifinizi ekleyerek diğer kullanıcılarla paylaşmaya başlayın.
                      </p>
                      <Button 
                        onClick={() => navigate("/tarif-ekle")}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        <PenSquare className="mr-2 h-4 w-4" />
                        Tarif Ekle
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="favorites">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-pulse">Yükleniyor...</div>
                  </div>
                ) : favoriteRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Bookmark className="h-12 w-12 text-orange-300 mb-4" />
                      <h3 className="text-xl font-medium text-orange-800 mb-2">Favori tarifiniz bulunmuyor</h3>
                      <p className="text-center text-muted-foreground mb-6">
                        Tarifler sayfasına giderek beğendiğiniz tarifleri favorilerinize ekleyebilirsiniz.
                      </p>
                      <Button 
                        onClick={() => navigate("/tarifler")}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        Tariflere Göz At
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
