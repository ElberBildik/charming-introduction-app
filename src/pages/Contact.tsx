
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast({
        title: "Mesajınız gönderildi",
        description: "En kısa sürede size dönüş yapacağız.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Bizimle İletişime Geçin</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Sorularınız, önerileriniz veya tarifleriniz için bize ulaşın
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader className="space-y-1 flex flex-row items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>E-posta</CardTitle>
                  <CardDescription>Size 24 saat içinde dönüş yapacağız</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@tarifadresi.com" className="text-primary hover:underline">
                  info@tarifadresi.com
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1 flex flex-row items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Telefon</CardTitle>
                  <CardDescription>Pazartesi-Cuma, 09:00-18:00</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <a href="tel:+902123456789" className="text-primary hover:underline">
                  +90 (212) 345 67 89
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1 flex flex-row items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Adres</CardTitle>
                  <CardDescription>Ofisimize bekleriz</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  Lezzet Sokak, No: 42<br />
                  Mutfak Mahallesi<br />
                  İstanbul, Türkiye
                </address>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-muted rounded-lg overflow-hidden h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48173.94304527445!2d28.932568924550627!3d41.01139499771398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zxLBzdGFuYnVsLCBUw7xya2l5ZQ!5e0!3m2!1str!2str!4v1648456891702!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Harita"
              ></iframe>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>İletişim Formu</CardTitle>
                  <CardDescription>
                    Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          İsim Soyisim
                        </label>
                        <Input
                          id="name"
                          placeholder="İsminizi giriniz"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-posta Adresi
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="E-posta adresinizi giriniz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Konu
                      </label>
                      <Input
                        id="subject"
                        placeholder="Mesajınızın konusu"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mesaj
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Mesajınızı yazın..."
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
