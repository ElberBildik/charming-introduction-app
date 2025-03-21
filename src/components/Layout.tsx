
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=2070')] bg-cover bg-fixed opacity-5 pointer-events-none z-0"></div>
      <Navigation />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
