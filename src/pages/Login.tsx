
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulating login for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Başarıyla giriş yapıldı!",
        description: "Yemek tariflerine hoş geldiniz.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Giriş yapılamadı",
        description: "Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-orange-800">Hesabınıza giriş yapın</h2>
            <p className="mt-2 text-sm text-orange-700/80">
              Veya{" "}
              <Link to="/register" className="font-medium text-primary hover:text-primary/90">
                yeni hesap oluşturun
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="email" className="text-orange-800">E-posta adresi</Label>
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
                    className="pl-10 border-amber-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password" className="text-orange-800">Şifre</Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-amber-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-amber-300 text-primary focus:ring-amber-200"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-orange-700/80">
                  Beni hatırla
                </Label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary hover:text-primary/90">
                  Şifrenizi mi unuttunuz?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
