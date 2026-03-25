import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "#hero" },
    { name: "أقسامنا", href: "#categories" },
    { name: "من نحن", href: "#about" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 group-hover:scale-105 transition-transform drop-shadow-md">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo-clean.png`} 
                alt="شعار باب الآغا" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-black text-xl leading-none tracking-tight transition-colors",
                isScrolled ? "text-primary" : "text-primary drop-shadow-md md:text-white md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              )}>
                باب الآغا
              </span>
              <span className={cn(
                "text-xs font-semibold tracking-wider transition-colors",
                isScrolled ? "text-secondary" : "text-secondary md:text-secondary md:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              )}>
                منذ 1948
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      "text-base font-bold transition-all hover:-translate-y-0.5 inline-block",
                      isScrolled 
                        ? "text-foreground hover:text-secondary" 
                        : "text-primary hover:text-secondary drop-shadow-sm md:text-white md:hover:text-secondary md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="h-6 w-px bg-current opacity-20"></div>
            <Button 
              variant={isScrolled ? "primary" : "secondary"} 
              size="sm" 
              onClick={() => window.open('https://wa.me/9647725853434', '_blank')}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>اطلب الآن</span>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <Button 
              variant="primary" 
              size="sm" 
              className="h-10 px-4 text-sm"
              onClick={() => window.open('https://wa.me/9647725853434', '_blank')}
            >
              طلب
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl transition-colors",
                isScrolled ? "text-foreground bg-black/5" : "text-primary bg-white/80 backdrop-blur-sm"
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-border mt-3 mx-4 rounded-2xl overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-4 py-3 text-lg font-bold text-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-2 pt-4 border-t border-border flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-primary/20 bg-white"
                  onClick={() => window.open('tel:+9647725853434')}
                >
                  <Phone className="w-5 h-5 ms-2 text-primary" />
                  <span dir="ltr">+964 783 000 3337</span>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
