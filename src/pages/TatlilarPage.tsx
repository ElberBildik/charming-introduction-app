
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Sample dessert recipes
const tatliTarifleri = [
  {
    id: 1,
    title: "Baklava",
    description: "İnce yufka katları, ceviz ve şerbet ile hazırlanan geleneksel Türk tatlısı.",
    imageUrl: "https://images.unsplash.com/photo-1625353077167-451d6a99a999?q=80&w=1000",
    prepTime: "1 saat 30 dk",
    difficulty: "Zor",
    tags: ["Şerbetli", "Fırın"]
  },
  {
    id: 2,
    title: "Sütlaç",
    description: "Pirinç, süt ve şeker ile hazırlanan, fırında kızartılmış geleneksel tatlı.",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0a36077?q=80&w=1000",
    prepTime: "50 dk",
    difficulty: "Orta",
    tags: ["Sütlü", "Fırın"]
  },
  {
    id: 3,
    title: "Künefe",
    description: "Kadayıf, peynir ve şerbet ile hazırlanan sıcak servis edilen tatlı.",
    imageUrl: "https://images.unsplash.com/photo-1576020695023-d6a958a2bae4?q=80&w=1000",
    prepTime: "40 dk",
    difficulty: "Orta",
    tags: ["Şerbetli", "Sıcak Servis"]
  },
  {
    id: 4,
    title: "Aşure",
    description: "Birçok malzeme ile hazırlanan, bereket simgesi geleneksel tatlı.",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1000",
    prepTime: "1 saat 20 dk",
    difficulty: "Orta",
    tags: ["Kuruyemişli", "Tahıllı"]
  },
  {
    id: 5,
    title: "Kazandibi",
    description: "Hafif yanık tadıyla öne çıkan nefis sütlü tatlı.",
    imageUrl: "https://images.unsplash.com/photo-1515467837237-8b4726b22491?q=80&w=1000",
    prepTime: "45 dk",
    difficulty: "Orta",
    tags: ["Sütlü", "Tavada"]
  },
  {
    id: 6,
    title: "Profiterol",
    description: "Çikolata sosu ile servis edilen, içi kremalı hamur topları.",
    imageUrl: "https://images.unsplash.com/photo-1634118520179-0c78b72df69a?q=80&w=1000",
    prepTime: "1 saat",
    difficulty: "Zor",
    tags: ["Çikolatalı", "Fırın"]
  },
  {
    id: 7,
    title: "Güllaç",
    description: "İnce yufkalar, süt, gül suyu ve nar ile hazırlanan hafif ramazan tatlısı.",
    imageUrl: "https://images.unsplash.com/photo-1578863545156-f5c12593007a?q=80&w=1000",
    prepTime: "30 dk",
    difficulty: "Kolay",
    tags: ["Sütlü", "Ramazan"]
  },
  {
    id: 8,
    title: "Tulumba Tatlısı",
    description: "Kızartılmış hamur tatlısı üzerine şerbet dökülerek hazırlanan tatlı.",
    imageUrl: "https://images.unsplash.com/photo-1631206723825-a5b2d9cacc8f?q=80&w=1000",
    prepTime: "45 dk",
    difficulty: "Orta",
    tags: ["Şerbetli", "Kızartma"]
  },
  {
    id: 9,
    title: "Revani",
    description: "İrmik, yumurta ve şerbet ile hazırlanan yumuşak dokulu tatlı.",
    imageUrl: "https://images.unsplash.com/photo-1515467387179-9a0549e8c970?q=80&w=1000",
    prepTime: "50 dk",
    difficulty: "Orta",
    tags: ["Şerbetli", "Fırın"]
  }
];

const TatlilarPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Tatlılar | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-orange-800">Tatlı Tarifleri</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Mutluluğun tarifi! Geleneksel ve modern tatlı tarifleri ile tatlı krizlerinize son verin.
        </p>
        
        <div className="mb-8 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-orange-50 hover:bg-orange-100 cursor-pointer">Tümü</Badge>
          <Badge variant="outline" className="bg-orange-50 hover:bg-orange-100 cursor-pointer">Şerbetli</Badge>
          <Badge variant="outline" className="bg-orange-50 hover:bg-orange-100 cursor-pointer">Sütlü</Badge>
          <Badge variant="outline" className="bg-orange-50 hover:bg-orange-100 cursor-pointer">Çikolatalı</Badge>
          <Badge variant="outline" className="bg-orange-50 hover:bg-orange-100 cursor-pointer">Fırın</Badge>
          <Badge variant="outline" className="bg-orange-50 hover:bg-orange-100 cursor-pointer">Pratik</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tatliTarifleri.map((tatli) => (
            <Card key={tatli.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tatli.imageUrl} 
                  alt={tatli.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-2 py-1 bg-amber-100 rounded-full text-xs font-medium text-amber-800">
                    {tatli.prepTime}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-orange-800">{tatli.title}</CardTitle>
                <CardDescription>{tatli.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
                    {tatli.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tatli.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/tarifler/${tatli.id}`} className="w-full">
                  <Button variant="default" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    Tarifi Görüntüle
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TatlilarPage;
