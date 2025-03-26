
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { UsersRound, MessageSquare, Award, Heart } from "lucide-react";

const ToplulukPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Topluluk | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">YemekyApp Topluluğu</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Yemek tutkunlarının buluştuğu, paylaştığı ve birlikte öğrendiği topluluğumuza katılın.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <UsersRound className="text-primary" /> Topluluğumuza Katılın
            </h2>
            <p className="mb-4">
              YemekyApp topluluğu, lezzet tutkunlarını bir araya getiren bir platformdur. 
              Burada kendi tariflerinizi paylaşabilir, başkalarının tariflerini keşfedebilir 
              ve yemek yapma konusunda yeni şeyler öğrenebilirsiniz.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> 
                Tariflerinizi paylaşın ve geri bildirim alın
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> 
                Diğer şeflerin tariflerini keşfedin
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> 
                Yemek yapma becerilerinizi geliştirin
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> 
                Lezzet odaklı bir topluluğun parçası olun
              </li>
            </ul>
            
            <div className="flex gap-4">
              <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                Hemen Katıl
              </button>
              <button className="border border-input bg-background px-6 py-3 rounded-md hover:bg-accent transition-colors">
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Topluluk Etkinlikleri</h3>
              <p className="text-muted-foreground mb-4">
                Canlı yayınlar, tarif yarışmaları ve çevrimiçi atölye çalışmaları ile topluluğumuzda aktif olarak yer alın.
              </p>
              <a href="#" className="text-primary font-medium hover:underline">
                Yaklaşan Etkinlikler →
              </a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-secondary/30 rounded-lg">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Forum</h3>
            <p className="text-muted-foreground mb-4">
              Sorular sorun, tavsiyelerde bulunun ve diğer yemek tutkunlarıyla tartışın.
            </p>
            <a href="#" className="text-primary font-medium hover:underline">
              Foruma Git →
            </a>
          </div>
          
          <div className="text-center p-6 bg-secondary/30 rounded-lg">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ayın Şefi</h3>
            <p className="text-muted-foreground mb-4">
              Her ay en çok beğenilen tariflerin sahiplerini ödüllendiriyoruz.
            </p>
            <a href="#" className="text-primary font-medium hover:underline">
              Şefleri Keşfet →
            </a>
          </div>
          
          <div className="text-center p-6 bg-secondary/30 rounded-lg">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">İlham Köşesi</h3>
            <p className="text-muted-foreground mb-4">
              En popüler tarifleri ve yemek hikayelerini keşfedin.
            </p>
            <a href="#" className="text-primary font-medium hover:underline">
              İlham Al →
            </a>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Topluluğa Katılın</h2>
          <p className="mb-6">
            Hemen üye olun ve YemekyApp topluluğunun bir parçası olun. 
            Lezzet dolu bir yolculuk sizi bekliyor!
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Şimdi Üye Ol
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ToplulukPage;
