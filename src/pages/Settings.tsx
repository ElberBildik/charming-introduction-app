
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, User, Languages, Info } from "lucide-react";

const Settings = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newRecipeNotifications, setNewRecipeNotifications] = useState(true);
  
  // Language preference
  const [language, setLanguage] = useState("turkish");
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        login({
          ...user,
          name,
          email,
        });
      }
      
      toast({
        title: "Profil güncellendi",
        description: "Profil bilgileriniz başarıyla güncellendi.",
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Şifreler eşleşmiyor",
        description: "Yeni şifre ve şifre tekrarı eşleşmiyor.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Şifre güncellendi",
        description: "Şifreniz başarıyla güncellendi.",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleNotificationUpdate = () => {
    toast({
      title: "Bildirim ayarları güncellendi",
      description: "Bildirim tercihleriniz kaydedildi.",
    });
  };
  
  const handleLanguageUpdate = () => {
    toast({
      title: "Dil ayarları güncellendi",
      description: `Dil tercihiniz ${language === "turkish" ? "Türkçe" : "İngilizce"} olarak güncellendi.`,
    });
  };
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-orange-800 mb-6">Hesap Ayarları</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Güvenlik</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Bildirimler</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>Tercihler</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
                <CardDescription>
                  Profil bilgilerinizi güncelleyebilirsiniz. Bu bilgiler diğer kullanıcılar tarafından görülebilir.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">İsim</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="border-amber-200 focus:border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="border-amber-200 focus:border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Hakkında</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Kendinizi tanıtın..." 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      className="border-amber-200 focus:border-amber-300"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" disabled={isLoading}>
                    {isLoading ? "Güncelleniyor..." : "Profili Güncelle"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Şifre Değiştir</CardTitle>
                <CardDescription>
                  Hesabınızın güvenliği için düzenli olarak şifrenizi değiştirmenizi öneririz.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordUpdate}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mevcut Şifre</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                      className="border-amber-200 focus:border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Yeni Şifre</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className="border-amber-200 focus:border-amber-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Şifre Tekrar</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="border-amber-200 focus:border-amber-300"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" disabled={isLoading}>
                    {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Bildirim Ayarları</CardTitle>
                <CardDescription>
                  Hangi bildirimler almak istediğinizi seçebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Yeni tarifler ve güncellemeler için e-posta bildirimleri alın.
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Anlık Bildirimler</Label>
                    <p className="text-sm text-muted-foreground">
                      Uygulamadan anlık bildirimler alın.
                    </p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="recipe-notifications">Yeni Tarif Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Takip ettiğiniz kullanıcılar yeni tarif eklediğinde bildirim alın.
                    </p>
                  </div>
                  <Switch 
                    id="recipe-notifications" 
                    checked={newRecipeNotifications} 
                    onCheckedChange={setNewRecipeNotifications} 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNotificationUpdate} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Bildirimleri Kaydet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Uygulama Tercihleri</CardTitle>
                <CardDescription>
                  Uygulama tercihlerinizi özelleştirin.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Dil</Label>
                  <select 
                    id="language" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 border border-amber-200 rounded-md focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                  >
                    <option value="turkish">Türkçe</option>
                    <option value="english">İngilizce</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLanguageUpdate} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Tercihleri Kaydet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
