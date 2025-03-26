
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Mail, MapPin, Phone } from "lucide-react";

const IletisimPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>İletişim | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">İletişim</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Sorularınız, önerileriniz veya işbirliği fırsatları için bizimle iletişime geçebilirsiniz.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-6">İletişim Formu</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-md border border-input"
                  placeholder="İsim Soyisim"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-md border border-input"
                  placeholder="E-posta adresiniz"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 rounded-md border border-input"
                  placeholder="Mesajınızın konusu"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-input"
                  placeholder="Mesajınız"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">İletişim Bilgileri</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Adres</h3>
                  <p className="text-muted-foreground mt-1">
                    Atatürk Bulvarı, No: 123<br />
                    Çankaya, Ankara, Türkiye
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">E-posta</h3>
                  <p className="text-muted-foreground mt-1">
                    info@yemekyapp.com<br />
                    destek@yemekyapp.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-muted-foreground mt-1">
                    +90 (312) 123 4567<br />
                    +90 (555) 123 4567
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Çalışma Saatleri</h3>
                <p className="text-muted-foreground">
                  Pazartesi - Cuma: 09:00 - 18:00<br />
                  Cumartesi: 10:00 - 14:00<br />
                  Pazar: Kapalı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IletisimPage;
