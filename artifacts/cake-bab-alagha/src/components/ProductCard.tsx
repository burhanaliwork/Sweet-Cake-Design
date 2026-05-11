import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Wheat, X, ZoomIn } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index: number;
  categoryTitle: string;
}

export function ProductCard({ product, index, categoryTitle }: ProductCardProps) {
  const { addItem } = useCart();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isAvailable = product.is_available !== false;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={`group bg-card rounded-2xl overflow-hidden border shadow-sm transition-all duration-300 flex flex-col h-full ${
          isAvailable
            ? "border-border hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/10"
            : "border-border/40 opacity-60 grayscale"
        }`}
      >
        {/* Image — half height, clickable */}
        <div className="relative overflow-hidden bg-muted" style={{ height: "9rem" }}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isAvailable ? "group-hover:scale-110 cursor-zoom-in" : "cursor-default"
              }`}
              loading="lazy"
              onClick={() => isAvailable && product.image && setLightboxOpen(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🧁</div>
          )}

          {/* Zoom hint */}
          {isAvailable && product.image && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-2 end-2 bg-black/40 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="عرض الصورة"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Note badge */}
          {product.note && (
            <div className="absolute top-2 start-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Wheat className="w-3 h-3" />
              {product.note}
            </div>
          )}

          {/* Unavailable badge */}
          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/60 text-white text-sm font-bold px-3 py-1 rounded-full">
                غير متوفر
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-center gap-2 mb-3">
            <h3 className={`text-lg font-bold leading-tight ${isAvailable ? "text-foreground" : "text-muted-foreground"}`}>
              {product.name}
            </h3>
            {product.price && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-black whitespace-nowrap shadow-sm ${
                isAvailable ? "bg-secondary text-primary" : "bg-muted text-muted-foreground"
              }`}>
                {product.price}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="mt-auto pt-3 border-t border-border/50">
            <Button
              variant="outline"
              className="w-full justify-center group/btn"
              onClick={() => isAvailable && addItem(product, categoryTitle)}
              disabled={!isAvailable}
            >
              <ShoppingCart className="w-4 h-4 text-primary group-hover/btn:text-secondary transition-colors" />
              <span>{isAvailable ? "أضف إلى السلة" : "غير متوفر حالياً"}</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && product.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 end-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 text-white/80 text-sm font-medium">
              {product.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
