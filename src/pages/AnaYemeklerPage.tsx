
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample main dishes
const anaYemekTarifleri = [
  {
    id: 1,
    title: "Karnıyarık",
    description: "Patlıcan, kıyma ve baharatlar ile hazırlanan klasik Türk yemeği.",
    imageUrl: "https://images.unsplash.com/photo-1625944525533-473f1b0af342?q=80&w=1000",
    prepTime: "45 dk",
    difficulty: "Orta"
  },
  {
    id: 2,
    title: "İmam Bayıldı",
    description: "Zeytinyağlı, sebze dolu bir patlıcan yemeği.",
    imageUrl: "https://images.unsplash.com/photo-1625943913215-7a4709a6efaa?q=80&w=1000",
    prepTime: "50 dk",
    difficulty: "Orta"
  },
  {
    id: 3,
    title: "Etli Güveç",
    description: "Çeşitli sebzeler ve et ile hazırlanan güveçte pişen lezzetli yemek.",
    imageUrl: "https://images.unsplash.com/photo-1626509653291-18d9dc182e64?q=80&w=1000",
    prepTime: "1 saat 20 dk",
    difficulty: "Orta"
  },
  {
    id: 4,
    title: "Mantı",
    description: "El açması hamur içine kıyma konularak hazırlanan, yoğurtlu geleneksel Türk yemeği.",
    imageUrl: "https://images.unsplash.com/photo-1626711934535-9749ea933ff8?q=80&w=1000",
    prepTime: "1 saat 30 dk",
    difficulty: "Zor"
  },
  {
    id: 5,
    title: "Kuru Fasulye",
    description: "Kuru fasulye ve çeşitli baharatlarla hazırlanan besleyici Türk yemeği.",
    imageUrl: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=1000",
    prepTime: "1 saat",
    difficulty: "Kolay"
  },
  {
    id: 6,
    title: "İçli Köfte",
    description: "Dışı bulgur içi kıyma ile hazırlanan geleneksel lezzet.",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1000",
    prepTime: "1 saat 45 dk",
    difficulty: "Zor"
  }
];

const AnaYemeklerPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Ana Yemekler | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-orange-800">Ana Yemek Tarifleri</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sevdiklerinizi mutlu edecek birbirinden lezzetli ana yemek tarifleri.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anaYemekTarifleri.map((yemek) => (
            <Card key={yemek.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={yemek.imageUrl} 
                  alt={yemek.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-2 py-1 bg-amber-100 rounded-full text-xs font-medium text-amber-800">
                    {yemek.prepTime}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-orange-800">{yemek.title}</CardTitle>
                <CardDescription>{yemek.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
                  {yemek.difficulty}
                </span>
              </CardContent>
              <CardFooter>
                <Link to={`/tarifler/${yemek.id}`} className="w-full">
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

export default AnaYemeklerPage;
