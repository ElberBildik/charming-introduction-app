
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Heart, MessageCircle, Share2, Clock, ChefHat, User, Star, Plus, Filter, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

// Örnek kullanıcı tarifleri verisi
const userRecipes = [
  {
    id: "user-1",
    title: "Annemin Elma Tatlısı",
    description: "Çocukluğumdan beri en sevdiğim tatlı, annemin özel tarifi",
    author: {
      name: "Ayşe Kaya",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=40&h=40&fit=crop&crop=face",
      level: "Ev Aşçısı"
    },
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&w=500&q=80",
    category: "Tatlı",
    difficulty: "Kolay",
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    likes: 142,
    comments: 18,
    shares: 7,
    rating: 4.8,
    createdAt: "2 gün önce",
    ingredients: ["elma", "şeker", "tarçın", "tereyağı", "un"],
    isLiked: false,
    tags: ["aile tarifi", "geleneksel", "kolay"]
  },
  {
    id: "user-2", 
    title: "Fit Protein Topları",
    description: "Spor sonrası ideal atıştırmalık, tamamen doğal malzemeler",
    author: {
      name: "Mehmet Özkan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: "Fitness Gurme"
    },
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&w=500&q=80",
    category: "Sağlıklı",
    difficulty: "Kolay",
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    likes: 89,
    comments: 12,
    shares: 15,
    rating: 4.6,
    createdAt: "1 hafta önce",
    ingredients: ["yulaf", "protein tozu", "fıstık ezmesi", "bal", "chia"],
    isLiked: true,
    tags: ["protein", "sağlıklı", "spor"]
  },
  {
    id: "user-3",
    title: "Babamın Köfte Tarifi",
    description: "50 yıllık aile sırrı, enfes baharatlarla hazırlanan özel köfte",
    author: {
      name: "Fatma Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      level: "Usta Aşçı"
    },
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&w=500&q=80",
    category: "Ana Yemek",
    difficulty: "Orta",
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    likes: 256,
    comments: 34,
    shares: 28,
    rating: 4.9,
    createdAt: "3 gün önce",
    ingredients: ["dana kıyma", "soğan", "maydanoz", "özel baharat karışımı"],
    isLiked: false,
    tags: ["aile sırrı", "geleneksel", "köfte"]
  },
  {
    id: "user-4",
    title: "Vegan Quinoa Salatası",
    description: "Rengarenk sebzelerle dolu, tok tutan ve çok lezzetli salata",
    author: {
      name: "Zeynep Aktaş",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      level: "Vegan Şef"
    },
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500&q=80",
    category: "Salata",
    difficulty: "Kolay",
    prepTime: 25,
    cookTime: 15,
    servings: 3,
    likes: 178,
    comments: 22,
    shares: 41,
    rating: 4.7,
    createdAt: "5 gün önce",
    ingredients: ["quinoa", "avokado", "cherry domates", "nohut", "roka"],
    isLiked: true,
    tags: ["vegan", "sağlıklı", "quinoa"]
  }
];

const categories = ["Tümü", "Ana Yemek", "Tatlı", "Salata", "Sağlıklı", "Geleneksel"];
const sortOptions = ["En Yeni", "En Popüler", "En Çok Beğenilen", "En Çok Yorum"];

const KullaniciTarifleriPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortBy, setSortBy] = useState("En Yeni");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState(userRecipes);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleLike = (recipeId: string) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId 
        ? { 
            ...recipe, 
            likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1,
            isLiked: !recipe.isLiked 
          }
        : recipe
    ));
  };

  const handleShare = (recipe: any) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === "Tümü" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <Helmet>
        <title>Kullanıcı Tarifleri | YemekyApp</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Topluluk Tarifleri
          </h1>
          <p className="text-green-600 text-lg mb-6">
            Kullanıcılarımızın özenle hazırladığı, denediği ve paylaştığı lezzetli tarifler
          </p>
          <Link to="/tarif-ekle">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Kendi Tarifini Paylaş
            </Button>
          </Link>
        </div>

        {/* Arama ve Filtreler */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Tarif, yazar veya içerik ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <select 
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tarifler Listesi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecipes.map(recipe => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Yazar Bilgisi */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={recipe.author.avatar} 
                      alt={recipe.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{recipe.author.name}</h4>
                      <p className="text-xs text-gray-500">{recipe.author.level} • {recipe.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Tarif Görseli */}
                <div className="relative">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                {/* Tarif İçeriği */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-green-800">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                  
                  {/* Tarif Detayları */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{recipe.prepTime + recipe.cookTime} dk</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-3 w-3" />
                      <span>{recipe.servings} kişilik</span>
                    </div>
                  </div>
                  
                  {/* Etiketler */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Etkileşim Butonları */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(recipe.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          recipe.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${recipe.isLiked ? 'fill-current' : ''}`} />
                        <span>{recipe.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => setShowComments(showComments === recipe.id ? null : recipe.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{recipe.comments}</span>
                      </button>
                      
                      <button
                        onClick={() => handleShare(recipe)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>{recipe.shares}</span>
                      </button>
                    </div>
                    
                    <Link to={`/kullanici-tarifleri/${recipe.id}`}>
                      <Button size="sm" variant="outline">
                        Tarifi Gör
                      </Button>
                    </Link>
                  </div>

                  {/* Yorumlar Bölümü */}
                  {showComments === recipe.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="space-y-3 mb-4">
                        <div className="flex gap-3">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                            alt="Yorum yapan"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="bg-gray-100 rounded-lg p-3">
                              <h5 className="font-medium text-sm">Ali Veli</h5>
                              <p className="text-sm text-gray-600">Harika bir tarif, kesinlikle deneyeceğim! 👍</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-3">2 saat önce</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Yorumunuzu yazın..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1 text-sm resize-none"
                          rows={2}
                        />
                        <Button size="sm" className="self-start">
                          Gönder
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun tarif bulunamadı.</p>
            <p className="text-gray-400 text-sm mt-2">Farklı filtreler deneyin veya yeni bir tarif paylaşın.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default KullaniciTarifleriPage;
