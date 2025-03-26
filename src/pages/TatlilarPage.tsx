
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";

const TatlilarPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Tatlılar | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Tatlı Tarifleri</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Damağınızda iz bırakacak nefis tatlı tarifleri.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buraya tatlı tarifleri gelecek */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Bu sayfanın içeriği yakında eklenecek</h3>
              <p className="text-muted-foreground">
                Çok yakında burada muhteşem tatlı tarifleri bulabileceksiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TatlilarPage;
