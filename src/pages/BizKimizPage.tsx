
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";

const BizKimizPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Biz Kimiz | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Biz Kimiz</h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            YemekyApp, yemek tutkunları tarafından, yemek tutkunları için kurulmuş bir platformdur. 
            Amacımız, yemek yapmayı seven herkese ilham vermek ve mutfakta geçirdikleri zamanı daha keyifli hale getirmektir.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Misyonumuz</h2>
          <p className="mb-6">
            Türk ve dünya mutfağından lezzetli tarifleri herkes için erişilebilir kılmak, mutfak kültürünü yaşatmak ve yeni nesillere aktarmak.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Değerlerimiz</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Kalite ve lezzetten ödün vermemek</li>
            <li>Mutfağı herkes için erişilebilir kılmak</li>
            <li>Geleneksel lezzetleri yaşatmak</li>
            <li>Yenilikçi yaklaşımları desteklemek</li>
            <li>Sürdürülebilir gıda pratiklerini teşvik etmek</li>
          </ul>
          
          <p className="mt-8">
            Bu sayfanın içeriği yakında daha detaylı olarak eklenecektir.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BizKimizPage;
