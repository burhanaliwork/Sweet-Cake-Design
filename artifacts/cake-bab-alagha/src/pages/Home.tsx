import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { catalogData } from "@/data/products";
import { useCatalog } from "@/hooks/useCatalog";
import { ChevronLeft, Search, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface SearchResult {
  productId: string;
  name: string;
  price?: string;
  note?: string;
  image: string;
  categoryId: string;
  categoryTitle: string;
  is_available?: boolean;
}

export default function Home() {
  const { catalog } = useCatalog();
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddToCart = (r: SearchResult, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      { id: r.productId, name: r.name, price: r.price, note: r.note, image: r.image, is_available: r.is_available },
      r.categoryTitle
    );
    setAddedIds(prev => new Set(prev).add(r.productId));
    setTimeout(() => setAddedIds(prev => { const s = new Set(prev); s.delete(r.productId); return s; }), 1500);
  };

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

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const hits: SearchResult[] = [];
    for (const cat of catalog) {
      for (const p of cat.products) {
        if (p.name.startsWith(trimmed)) {
          hits.push({
            productId: p.id,
            name: p.name,
            price: p.price,
            note: p.note,
            image: p.image,
            categoryId: cat.id,
            categoryTitle: cat.title,
            is_available: p.is_available,
          });
        }
      }
    }
    setResults(hits);
  }, [query, catalog]);

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

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
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">أقسام المتجر</h2>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-5">اختر القسم الذي تريده</h3>
              <p className="text-muted-foreground text-lg">
                اضغط على أي قسم لتصفح منتجاته
              </p>
            </div>

            {/* LIVE SEARCH BAR */}
            <div className="max-w-xl mx-auto mb-12 relative">
              <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-sm hover:border-secondary/50 focus-within:border-secondary/70 focus-within:shadow-md focus-within:shadow-secondary/10 transition-all duration-200">
                <Search className="absolute right-4 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  dir="rtl"
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base py-3.5 pr-12 pl-12 rounded-2xl outline-none font-medium"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute left-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* SEARCH RESULTS DROPDOWN */}
              <AnimatePresence>
                {query.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full mt-2 w-full bg-card border border-border rounded-2xl shadow-xl shadow-black/20 overflow-hidden z-50 max-h-80 overflow-y-auto"
                  >
                    {results.length === 0 ? (
                      <div className="py-6 text-center text-muted-foreground text-sm font-medium" dir="rtl">
                        لا توجد نتائج لـ «{query.trim()}»
                      </div>
                    ) : (
                      <ul>
                        {results.map((r) => (
                          <li key={r.productId}>
                            <Link
                              href={`/category/${r.categoryId}`}
                              onClick={() => setQuery("")}
                            >
                              <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 transition-colors cursor-pointer border-b border-border/50 last:border-0" dir="rtl">
                                <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                                  <img
                                    src={`/api/product-image/${r.productId}`}
                                    alt={r.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-foreground text-sm leading-tight truncate">{r.name}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{r.categoryTitle}</p>
                                </div>
                                {r.price && (
                                  <span className="text-xs font-bold text-secondary whitespace-nowrap flex-shrink-0">{r.price}</span>
                                )}
                                <button
                                  onClick={(e) => handleAddToCart(r, e)}
                                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    addedIds.has(r.productId)
                                      ? "bg-green-500 text-white scale-110"
                                      : "bg-secondary/15 hover:bg-secondary text-secondary hover:text-white"
                                  }`}
                                  title="أضف إلى السلة"
                                >
                                  {addedIds.has(r.productId) ? (
                                    <span className="text-sm font-bold leading-none">✓</span>
                                  ) : (
                                    <ShoppingCart className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
                    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden text-center cursor-pointer hover:border-secondary/60 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 active:scale-95 h-full flex flex-col items-center justify-center min-h-[160px]">
                      {category.image ? (
                        <div className="w-full h-28 overflow-hidden flex-shrink-0">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-28 flex items-center justify-center">
                          <span className="text-4xl md:text-5xl">{category.emoji}</span>
                        </div>
                      )}
                      <div className="px-3 py-3 flex flex-col items-center gap-1">
                        <h3 className="font-black text-foreground text-base md:text-lg leading-tight group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-secondary transition-colors font-medium">
                          <ChevronLeft className="w-3 h-3" />
                        </div>
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
