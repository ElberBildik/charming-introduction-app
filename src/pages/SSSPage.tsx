
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SSSPage = () => {
  const faqs = [
    {
      question: "YemekyApp'i nasıl kullanabilirim?",
      answer: "YemekyApp'i kullanmak için öncelikle hesap oluşturmanız gerekiyor. Daha sonra tarifler arasında gezinebilir, kendi tariflerinizi ekleyebilir ve diğer kullanıcıların tariflerini değerlendirebilirsiniz."
    },
    {
      question: "Kendi tarifimi nasıl ekleyebilirim?",
      answer: "Kendi tarifinizi eklemek için önce giriş yapmalısınız. Ardından 'Tarif Ekle' butonuna tıklayarak tarif formunu doldurabilir ve tarifinizi paylaşabilirsiniz."
    },
    {
      question: "Tarifleri kaydetmek için ne yapmalıyım?",
      answer: "Beğendiğiniz tarifleri kaydetmek için tarif sayfasındaki 'Favorilere Ekle' butonuna tıklayabilirsiniz. Kaydedilen tariflerinizi 'Favorilerim' sayfasında görebilirsiniz."
    },
    {
      question: "YemekyApp'te hesap oluşturmak ücretsiz mi?",
      answer: "Evet, YemekyApp'te hesap oluşturmak tamamen ücretsizdir. Temel özelliklerin tamamına ücretsiz olarak erişebilirsiniz."
    },
    {
      question: "Şifremi unuttum, ne yapmalıyım?",
      answer: "Şifrenizi unuttuysanız, giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayarak şifre sıfırlama adımlarını takip edebilirsiniz."
    },
    {
      question: "Bir tarifi nasıl değerlendirebilirim?",
      answer: "Tarifleri değerlendirmek için ilgili tarif sayfasında yıldız derecelendirme sistemini kullanabilir ve yorumunuzu ekleyebilirsiniz."
    },
    {
      question: "YemekyApp'i mobil cihazımda kullanabilir miyim?",
      answer: "Evet, YemekyApp web sitesi tüm cihazlarda sorunsuz çalışacak şekilde tasarlanmıştır. Ayrıca yakında iOS ve Android uygulamalarımız da yayında olacak."
    },
    {
      question: "Özel beslenme gereksinimlerine uygun tarifler bulabilir miyim?",
      answer: "Evet, YemekyApp'te glutensiz, vejetaryen, vegan gibi çeşitli beslenme gereksinimlerine uygun tarifleri filtreleyerek bulabilirsiniz."
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Sıkça Sorulan Sorular | YemekyApp</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Sıkça Sorulan Sorular</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          YemekyApp hakkında sık sorulan soruların cevaplarını burada bulabilirsiniz.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-secondary/30 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Başka sorunuz mu var?</h2>
            <p className="mb-4">
              Aradığınız cevabı bulamadıysanız, bizimle iletişime geçebilirsiniz.
            </p>
            <a 
              href="/iletisim" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SSSPage;
