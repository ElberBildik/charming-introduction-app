
import React from "react";
import { Link } from "react-router-dom";
import { ChefHat, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <div className="font-bold text-xl tracking-tight mb-4">YemekyApp</div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Mutfakta keşfetmenin ve yaratmanın keyfini çıkarın. Binlerce tarif, püf noktaları ve daha fazlası.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Tarifler</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/kahvalti" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kahvaltı
                </Link>
              </li>
              <li>
                <Link to="/ana-yemekler" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ana Yemekler
                </Link>
              </li>
              <li>
                <Link to="/tatlilar" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tatlılar
                </Link>
              </li>
              <li>
                <Link to="/corbalar" className="text-muted-foreground hover:text-foreground transition-colors">
                  Çorbalar
                </Link>
              </li>
              <li>
                <Link to="/salatalar" className="text-muted-foreground hover:text-foreground transition-colors">
                  Salatalar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Hakkımızda</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/biz-kimiz" className="text-muted-foreground hover:text-foreground transition-colors">
                  Biz Kimiz
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/kariyer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-muted-foreground hover:text-foreground transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Yardım</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sss" className="text-muted-foreground hover:text-foreground transition-colors">
                  SSS
                </Link>
              </li>
              <li>
                <Link to="/yardim-merkezi" className="text-muted-foreground hover:text-foreground transition-colors">
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link to="/topluluk" className="text-muted-foreground hover:text-foreground transition-colors">
                  Topluluk
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-muted-foreground hover:text-foreground transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} YemekyApp. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/gizlilik"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Gizlilik
            </Link>
            <Link
              to="/kullanim-sartlari"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Kullanım Şartları
            </Link>
            <Link
              to="/cerezler"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Çerezler
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
