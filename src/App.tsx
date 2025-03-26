
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Tarifler from "./pages/Tarifler";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import TarifEkle from "./pages/TarifEkle";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import KahvaltiPage from "./pages/KahvaltiPage";
import AnaYemeklerPage from "./pages/AnaYemeklerPage";
import TatlilarPage from "./pages/TatlilarPage";
import CorbalarPage from "./pages/CorbalarPage";
import SalatalarPage from "./pages/SalatalarPage";
import BizKimizPage from "./pages/BizKimizPage";
import BlogPage from "./pages/BlogPage";
import KariyerPage from "./pages/KariyerPage";
import IletisimPage from "./pages/IletisimPage";
import SSSPage from "./pages/SSSPage";
import YardimMerkeziPage from "./pages/YardimMerkeziPage";
import ToplulukPage from "./pages/ToplulukPage";

const App = () => (
  <UserProvider>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-foreground relative">
        {/* Z-index values ensure proper stacking */}
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/tarifler" element={<Tarifler />} />
            <Route path="/kahvalti" element={<KahvaltiPage />} />
            <Route path="/ana-yemekler" element={<AnaYemeklerPage />} />
            <Route path="/tatlilar" element={<TatlilarPage />} />
            <Route path="/corbalar" element={<CorbalarPage />} />
            <Route path="/salatalar" element={<SalatalarPage />} />
            <Route path="/biz-kimiz" element={<BizKimizPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/kariyer" element={<KariyerPage />} />
            <Route path="/iletisim" element={<IletisimPage />} />
            <Route path="/sss" element={<SSSPage />} />
            <Route path="/yardim-merkezi" element={<YardimMerkeziPage />} />
            <Route path="/topluluk" element={<ToplulukPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/tarif-ekle" element={<TarifEkle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </UserProvider>
);

export default App;
