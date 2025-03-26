
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample salad recipes
const salataTarifleri = [
  {
    id: 1,
    title: "Çoban Salatası",
    description: "Domates, salatalık, biber ve soğan ile hazırlanan klasik Türk salatası.",
    imageUrl: "https://images.unsplash.com/photo-1511357840105-51e9f4c35321?q=80&w=1000",
    prepTime: "15 dk",
    difficulty: "Kolay"
  },
  {
    id: 2,
    title: "Sezar Salatası",
    description: "Marul, tavuk, kruton ve özel sosla hazırlanan dünyaca ünlü salata.",
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1000",
    prepTime: "20 dk",
    difficulty: "Orta"
  },
  {
    id: 3,
    title: "Akdeniz Salatası",
    description: "Domates, salatalık, zeytin, peynir ve zeytinyağı ile Akdeniz lezzeti.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000",
    prepTime: "15 dk",
    difficulty: "Kolay"
  },
  {
    id: 4,
    title: "Kinoa Salatası",
    description: "Kinoa, avokado, mısır ve limonlu sos ile sağlıklı bir alternatif.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000",
    prepTime: "25 dk",
    difficulty: "Orta"
  },
  {
    id: 5,
    title: "Mercimek Salatası",
    description: "Haşlanmış mercimek, soğan, maydanoz ve limon suyu ile hazırlanan besleyici salata.",
    imageUrl: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?q=80&w=1000",
    prepTime: "30 dk",
    difficulty: "Kolay"
  },
  {
    id: 6,
    title: "Tavuklu Nohut Salatası",
    description: "Tavuk, nohut, marul ve hardallı sos ile protein dolu bir öğün.",
    imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1000",
    prepTime: "25 dk",
    difficulty: "Orta"
  }
];

const SalatalarPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Salatalar | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-orange-800">Salata Tarifleri</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sağlıklı ve lezzetli salata tarifleri ile sofralarınızı renklendirin.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salataTarifleri.map((salata) => (
            <Card key={salata.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={salata.imageUrl} 
                  alt={salata.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-2 py-1 bg-amber-100 rounded-full text-xs font-medium text-amber-800">
                    {salata.prepTime}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-orange-800">{salata.title}</CardTitle>
                <CardDescription>{salata.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
                  {salata.difficulty}
                </span>
              </CardContent>
              <CardFooter>
                <Link to={`/tarifler/${salata.id}`} className="w-full">
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

export default SalatalarPage;
