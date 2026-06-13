import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { Search, X, ShoppingCart } from "lucide-react";
import { useCatalog } from "@/hooks/useCatalog";
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

interface ProductSearchBarProps {
  placeholder?: string;
  className?: string;
}

export function ProductSearchBar({ placeholder = "ابحث عن منتج...", className = "" }: ProductSearchBarProps) {
  const { catalog } = useCatalog();
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const hits: SearchResult[] = [];
    for (const cat of catalog) {
      for (const p of cat.products) {
        if (p.name.includes(trimmed)) {
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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-sm hover:border-secondary/50 focus-within:border-secondary/70 focus-within:shadow-md focus-within:shadow-secondary/10 transition-all duration-200">
        <Search className="absolute right-4 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
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
                    <Link href={`/category/${r.categoryId}`} onClick={() => setQuery("")}>
                      <div
                        className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 transition-colors cursor-pointer border-b border-border/50 last:border-0"
                        dir="rtl"
                      >
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                          <img
                            src={`/api/product-image/${r.productId}`}
                            alt={r.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
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
  );
}
