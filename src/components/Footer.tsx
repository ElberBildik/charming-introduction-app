
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <div className="font-bold text-xl tracking-tight mb-4">Essentio</div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Crafting digital experiences that focus on what truly matters.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Products</h3>
            <ul className="space-y-3">
              {["Features", "Integrations", "Pricing", "Updates"].map((item, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              {["Documentation", "Help Center", "Community", "Partners"].map((item, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Essentio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
