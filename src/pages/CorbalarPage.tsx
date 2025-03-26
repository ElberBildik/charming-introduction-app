
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample soup recipes
const corbaTarifleri = [
  {
    id: 1,
    title: "Mercimek Çorbası",
    description: "Kırmızı mercimek, havuç ve soğan ile hazırlanan geleneksel Türk çorbası.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000",
    prepTime: "35 dk",
    difficulty: "Kolay"
  },
  {
    id: 2,
    title: "Ezogelin Çorbası",
    description: "Mercimek, bulgur ve baharatlarla zenginleştirilmiş doyurucu çorba.",
    imageUrl: "https://images.unsplash.com/photo-1588566565783-927145eeeb8d?q=80&w=1000",
    prepTime: "40 dk",
    difficulty: "Orta"
  },
  {
    id: 3,
    title: "Domates Çorbası",
    description: "Taze domatesler ve aromatik baharatlarla hazırlanan lezzetli çorba.",
    imageUrl: "https://images.unsplash.com/photo-1575237552123-11fe9493d84b?q=80&w=1000",
    prepTime: "25 dk",
    difficulty: "Kolay"
  },
  {
    id: 4,
    title: "Tavuk Çorbası",
    description: "Tavuk suyu, sebzeler ve şehriye ile hazırlanan besleyici çorba.",
    imageUrl: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=1000",
    prepTime: "45 dk",
    difficulty: "Orta"
  },
  {
    id: 5,
    title: "Yayla Çorbası",
    description: "Yoğurt, pirinç ve nane ile hazırlanan geleneksel Türk çorbası.",
    imageUrl: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=1000",
    prepTime: "30 dk",
    difficulty: "Kolay"
  },
  {
    id: 6,
    title: "İşkembe Çorbası",
    description: "Geleneksel Türk mutfağından, sarımsaklı ve sirkeli lezzet.",
    imageUrl: "https://images.unsplash.com/photo-1608500218890-c4f9e9c45dcb?q=80&w=1000",
    prepTime: "50 dk",
    difficulty: "Zor"
  }
];

const CorbalarPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Çorbalar | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-orange-800">Çorba Tarifleri</h1>
        <p className="text-lg text-muted-foreground mb-8">
          İçinizi ısıtacak, şifa verici geleneksel ve modern çorba tarifleri.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corbaTarifleri.map((corba) => (
            <Card key={corba.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={corba.imageUrl} 
                  alt={corba.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-2 py-1 bg-amber-100 rounded-full text-xs font-medium text-amber-800">
                    {corba.prepTime}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-orange-800">{corba.title}</CardTitle>
                <CardDescription>{corba.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
                  {corba.difficulty}
                </span>
              </CardContent>
              <CardFooter>
                <Link to={`/tarifler/${corba.id}`} className="w-full">
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

export default CorbalarPage;
