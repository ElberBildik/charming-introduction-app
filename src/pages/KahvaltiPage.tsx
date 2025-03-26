
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample breakfast recipes
const kahvaltiTarifleri = [
  {
    id: 1,
    title: "Menemen",
    description: "Domates, biber ve yumurta ile hazırlanan klasik Türk kahvaltısı.",
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1000",
    prepTime: "15 dk",
    difficulty: "Kolay"
  },
  {
    id: 2,
    title: "Simit",
    description: "Susamlı, halka şeklinde geleneksel Türk ekmeği.",
    imageUrl: "https://images.unsplash.com/photo-1583396618422-64631efbb732?q=80&w=1000",
    prepTime: "1 saat 30 dk",
    difficulty: "Orta"
  },
  {
    id: 3,
    title: "Poğaça",
    description: "Yumuşacık hamurlu, peynirli veya patatesli mini börekler.",
    imageUrl: "https://images.unsplash.com/photo-1581400894042-ccc8cd66afae?q=80&w=1000",
    prepTime: "45 dk",
    difficulty: "Orta"
  },
  {
    id: 4,
    title: "Kaymak Bal",
    description: "Manda sütünden yapılan kaymak ve organik bal ile hazırlanan lezzet.",
    imageUrl: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=1000",
    prepTime: "5 dk",
    difficulty: "Kolay"
  },
  {
    id: 5,
    title: "Sucuklu Yumurta",
    description: "Kızarmış sucuk dilimleri ve göz yumurta ile hazırlanan protein dolu kahvaltı.",
    imageUrl: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=1000",
    prepTime: "10 dk",
    difficulty: "Kolay"
  },
  {
    id: 6,
    title: "Açma",
    description: "Yumuşak, tatlımsı hamurdan yapılan geleneksel Türk kahvaltı çöreği.",
    imageUrl: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000",
    prepTime: "1 saat",
    difficulty: "Orta"
  }
];

const KahvaltiPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kahvaltı Tarifleri | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-orange-800">Kahvaltı Tarifleri</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Güne güzel bir başlangıç yapmak için en lezzetli kahvaltı tarifleri burada.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kahvaltiTarifleri.map((tarif) => (
            <Card key={tarif.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tarif.imageUrl} 
                  alt={tarif.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-2 py-1 bg-amber-100 rounded-full text-xs font-medium text-amber-800">
                    {tarif.prepTime}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-orange-800">{tarif.title}</CardTitle>
                <CardDescription>{tarif.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
                  {tarif.difficulty}
                </span>
              </CardContent>
              <CardFooter>
                <Link to={`/tarifler/${tarif.id}`} className="w-full">
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

export default KahvaltiPage;
