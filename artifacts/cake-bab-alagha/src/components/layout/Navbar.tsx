import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, ShoppingCart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleNavClick = (action: string, sectionId?: string) => {
    setIsMobileMenuOpen(false);

    if (action === "home") {
      navigate("/");
    } else if (action === "section" && sectionId) {
      if (location === "/") {
        scrollToSection(sectionId);
      } else {
        // Store section to scroll after navigating home
        sessionStorage.setItem("scrollToSection", sectionId);
        navigate("/");
      }
    } else if (action === "whatsapp") {
      window.open("https://wa.me/9647725853434", "_blank");
    }
  };

  const navLinks = [
    { name: "الرئيسية",   action: "home" },
    { name: "من نحن",     action: "section", sectionId: "about-text" },
    { name: "تواصل معنا", action: "whatsapp" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#5c3d1e] shadow-lg",
        isScrolled ? "py-1" : "py-2"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-32 h-32 group-hover:scale-105 transition-transform drop-shadow-md">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo-mosul.png`} 
                alt="شعار باب الآغا" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg leading-snug tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] max-w-[160px]">
                مركز الموصل لمنتجات مخابز باب الآغا
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.action, link.sectionId)}
                    className="text-base font-bold transition-all hover:-translate-y-0.5 inline-block cursor-pointer text-white hover:text-secondary"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="h-6 w-px bg-current opacity-20"></div>
            {/* Cart icon desktop */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-xl transition-colors text-white hover:bg-white/10"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -start-1 bg-secondary text-primary text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => window.open('https://wa.me/9647725853434', '_blank')}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>اطلب الآن</span>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Cart button mobile */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-xl transition-colors text-white hover:bg-white/10"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -start-1 bg-secondary text-primary text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl transition-colors text-white hover:bg-white/10"
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
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.action, link.sectionId)}
                  className="px-4 py-3 text-lg font-bold text-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-colors text-right w-full"
                >
                  {link.name}
                </button>
              ))}
              <div className="border-t border-border/50 mt-1 pt-2">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); navigate("/admin"); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-lg font-bold text-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-colors text-right"
                >
                  <LogIn className="w-5 h-5 text-secondary" />
                  <span>تسجيل دخول</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
