
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";

const KariyerPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kariyer | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Kariyer Fırsatları</h1>
        <p className="text-lg text-muted-foreground mb-8">
          YemekyApp ailesine katılın ve tutkulu ekibimizle birlikte çalışın.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Neden YemekyApp?</h2>
          <p className="mb-6">
            YemekyApp'ta yenilikçi, dinamik ve tutku dolu bir ekibin parçası olabilir, 
            gıda ve teknoloji alanında fark yaratacak projelerde yer alabilirsiniz.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Açık Pozisyonlar</h2>
          <p className="mb-6">
            Şu anda mevcut bir açık pozisyon bulunmamaktadır. 
            Lütfen daha sonra tekrar kontrol edin veya özgeçmişinizi göndermek için bizimle iletişime geçin.
          </p>
          
          <div className="bg-secondary/30 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-3">İletişimde Kalın</h3>
            <p className="mb-4">
              Gelecekteki fırsatlardan haberdar olmak için e-posta listemize kaydolun.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="flex-grow px-4 py-2 rounded-md border border-input"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Kaydol
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KariyerPage;
