
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, CheckCircle, Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Şifreler eşleşmiyor",
        description: "Lütfen şifrelerin aynı olduğundan emin olun.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulating registration for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Hesabınız oluşturuldu!",
        description: "Yemek tariflerine hoş geldiniz.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Hesap oluşturulamadı",
        description: "Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">Yeni Hesap Oluştur</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <a href="/login" className="font-medium text-primary hover:text-primary/90">
                Giriş yapın
              </a>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="name">Ad Soyad</Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">E-posta adresi</Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">Şifre</Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="En az 8 karakter"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Şifre Tekrarı</Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Hesap oluşturarak, 
              <a href="#" className="font-medium text-primary hover:text-primary/90"> Kullanım Şartları</a>
              {" "}ve{" "}
              <a href="#" className="font-medium text-primary hover:text-primary/90">Gizlilik Politikası</a>
              'nı kabul etmiş olursunuz.
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
