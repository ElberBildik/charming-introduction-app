
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarIcon, Clock, User } from "lucide-react";

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Mevsiminde Sebze Yemenin Önemi",
    excerpt: "Mevsiminde tüketilen sebzelerin sağlık açısından faydaları ve çevreye etkisi hakkında bilmeniz gerekenler.",
    imageUrl: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=1000",
    date: "15 Mayıs 2023",
    author: "Ayşe Yılmaz",
    readTime: "6 dk okuma"
  },
  {
    id: 2,
    title: "Evde Ekmek Yapmanın İncelikleri",
    excerpt: "Ev yapımı ekmeğin püf noktaları, malzemeler ve en iyi pişirme teknikleri hakkında bilmeniz gereken her şey.",
    imageUrl: "https://images.unsplash.com/photo-1549413468-f219cb569c1e?q=80&w=1000",
    date: "3 Haziran 2023",
    author: "Mehmet Demir",
    readTime: "8 dk okuma"
  },
  {
    id: 3,
    title: "Türk Mutfağının Dünya Mutfakları Arasındaki Yeri",
    excerpt: "Geleneksel Türk mutfağının dünya çapındaki etkisi ve diğer mutfaklarla olan etkileşimleri.",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000",
    date: "24 Temmuz 2023",
    author: "Zeynep Kaya",
    readTime: "10 dk okuma"
  },
  {
    id: 4,
    title: "Baharatların Gizli Dünyası",
    excerpt: "Farklı baharatların tarihi, kullanım alanları ve yemeklere kattığı benzersiz tatlar hakkında bir inceleme.",
    imageUrl: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1000",
    date: "12 Ağustos 2023",
    author: "Ali Yıldız",
    readTime: "7 dk okuma"
  },
  {
    id: 5,
    title: "Sağlıklı Beslenme ve Mutfak Alışkanlıkları",
    excerpt: "Doğru beslenme alışkanlıkları edinmenin ve mutfakta sağlıklı seçimler yapmanın yolları.",
    imageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000",
    date: "5 Eylül 2023",
    author: "Selin Şahin",
    readTime: "9 dk okuma"
  },
  {
    id: 6,
    title: "Sürdürülebilir Mutfak: Sıfır Atık İçin Öneriler",
    excerpt: "Mutfakta atıkları azaltmanın ve daha sürdürülebilir pişirme yöntemlerinin pratik yolları.",
    imageUrl: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?q=80&w=1000",
    date: "19 Ekim 2023",
    author: "Can Öztürk",
    readTime: "5 dk okuma"
  }
];

const BlogPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Blog | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-orange-800">Blog</h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
          Mutfak hikayeleri, püf noktaları, sağlıklı beslenme tavsiyeleri ve lezzet keşifleri ile dolu yazılarımız.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="h-52 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="flex-grow pt-6 px-5">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-800">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="px-5 pb-5">
                <Link to={`/blog/${post.id}`} className="w-full">
                  <Button variant="outline" className="w-full hover:bg-orange-100 border-orange-200 hover:border-orange-300 transition-colors">
                    Devamını Oku
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8">
            Daha Fazla Göster
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
