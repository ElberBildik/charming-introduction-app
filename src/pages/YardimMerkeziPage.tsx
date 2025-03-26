
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, HelpCircle, Video, MessageSquare } from "lucide-react";

const YardimMerkeziPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Yardım Merkezi | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Yardım Merkezi</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          YemekyApp'i kullanırken ihtiyaç duyabileceğiniz tüm yardım ve destek kaynakları burada.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <BookOpen className="h-8 w-8 text-primary mb-3" />
              <CardTitle>Kullanım Kılavuzu</CardTitle>
              <CardDescription>Detaylı kullanım talimatları</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                YemekyApp'i nasıl kullanacağınıza dair ayrıntılı bilgiler.
              </p>
              <a href="#" className="text-primary font-medium hover:underline text-sm">Kılavuzu Görüntüle →</a>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <HelpCircle className="h-8 w-8 text-primary mb-3" />
              <CardTitle>Sıkça Sorulan Sorular</CardTitle>
              <CardDescription>En çok sorulan sorular</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Kullanıcıların en çok sorduğu soruların yanıtları.
              </p>
              <a href="/sss" className="text-primary font-medium hover:underline text-sm">SSS'leri Görüntüle →</a>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <Video className="h-8 w-8 text-primary mb-3" />
              <CardTitle>Video Rehberler</CardTitle>
              <CardDescription>Adım adım görsel anlatımlar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                YemekyApp'i kullanmak için video eğitimler.
              </p>
              <a href="#" className="text-primary font-medium hover:underline text-sm">Videoları İzle →</a>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <MessageSquare className="h-8 w-8 text-primary mb-3" />
              <CardTitle>Destek Ekibi</CardTitle>
              <CardDescription>Canlı destek ve iletişim</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Sorularınız için destek ekibimize ulaşın.
              </p>
              <a href="/iletisim" className="text-primary font-medium hover:underline text-sm">İletişime Geç →</a>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Popüler Destek Konuları</h2>
          <div className="space-y-4">
            <a href="#" className="block p-4 border border-input rounded-md hover:bg-secondary/20 transition-colors">
              <h3 className="font-medium mb-1">Hesap oluşturma ve giriş yapma</h3>
              <p className="text-sm text-muted-foreground">Hesap oluşturma, giriş yapma ve şifre sıfırlama ile ilgili bilgiler.</p>
            </a>
            
            <a href="#" className="block p-4 border border-input rounded-md hover:bg-secondary/20 transition-colors">
              <h3 className="font-medium mb-1">Tarif ekleme ve düzenleme</h3>
              <p className="text-sm text-muted-foreground">Kendi tariflerinizi nasıl ekleyeceğiniz ve düzenleyeceğiniz hakkında bilgiler.</p>
            </a>
            
            <a href="#" className="block p-4 border border-input rounded-md hover:bg-secondary/20 transition-colors">
              <h3 className="font-medium mb-1">Favorilere ekleme ve koleksiyon oluşturma</h3>
              <p className="text-sm text-muted-foreground">Tarifleri nasıl kaydedeceğiniz ve koleksiyonlar oluşturacağınız hakkında bilgiler.</p>
            </a>
            
            <a href="#" className="block p-4 border border-input rounded-md hover:bg-secondary/20 transition-colors">
              <h3 className="font-medium mb-1">Tarif arama ve filtreleme</h3>
              <p className="text-sm text-muted-foreground">Tarifleri nasıl arayacağınız ve filtreleyeceğiniz hakkında bilgiler.</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YardimMerkeziPage;
