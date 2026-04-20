import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { catalogData } from "@/data/products";
import { ChevronLeft } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const section = sessionStorage.getItem("scrollToSection");
    if (section) {
      sessionStorage.removeItem("scrollToSection");
      setTimeout(() => scrollToSection(section), 200);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section id="hero" className="w-full bg-[#111c14] pt-36 md:pt-36">
          <img
            src="/images/hero-products.jpg"
            alt="مخابز باب الآغا"
            className="w-full h-auto block"
          />
        </section>

        {/* CATEGORIES GRID SECTION */}
        <section id="categories" className="py-24 bg-background relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">أقسام المتجر</h2>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-5">اختر القسم الذي تريده</h3>
              <p className="text-muted-foreground text-lg">
                اضغط على أي قسم لتصفح منتجاته
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {catalogData.map((category, i) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/category/${category.id}`}>
                    <div className="group relative bg-card border border-border rounded-2xl p-5 text-center cursor-pointer hover:border-secondary/60 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 active:scale-95 h-full flex flex-col items-center justify-center gap-3 min-h-[140px]">
                      <span className="text-4xl md:text-5xl">{category.emoji}</span>
                      <h3 className="font-black text-foreground text-base md:text-lg leading-tight group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-secondary transition-colors font-medium">
                        <ChevronLeft className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
