
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui-custom/Button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="mb-6 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-orange-800 mb-4">Sayfa Bulunamadı</h1>
          <p className="text-lg text-orange-700/80 mb-8 max-w-md mx-auto">
            Aradığınız sayfayı bulamadık. Belki lezzetli tariflerimize bakmak istersiniz?
          </p>
          <Link to="/">
            <Button size="lg" iconLeft={<Home className="mr-2 h-5 w-5" />}>
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
