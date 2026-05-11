import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
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
        className={`group bg-card rounded-2xl overflow-hidden border shadow-sm transition-all duration-300 flex flex-row-reverse items-stretch ${
          isAvailable
            ? "border-border hover:border-secondary/50 hover:shadow-lg"
            : "border-border/40 opacity-60 grayscale"
        }`}
        dir="rtl"
      >
        {/* Image — square, right side */}
        <div className="relative flex-shrink-0 w-24 h-24 self-center m-3 rounded-xl overflow-hidden bg-muted">
          {product.image ? (
            <>
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isAvailable ? "group-hover:scale-110 cursor-zoom-in" : "cursor-default"
                }`}
                loading="lazy"
                onClick={() => isAvailable && product.image && setLightboxOpen(true)}
              />
              {isAvailable && (
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors"
                >
                  <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">🧁</div>
          )}

          {/* Unavailable overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-white text-[10px] font-bold text-center px-1">غير متوفر</span>
            </div>
          )}

          {/* Note badge */}
          {product.note && (
            <div className="absolute top-1 start-1 bg-green-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-full flex items-center gap-0.5">
              <Wheat className="w-2 h-2" />
              {product.note}
            </div>
          )}
        </div>

        {/* Content — left side */}
        <div className="flex-1 flex flex-col justify-between py-3 ps-3 pe-1 min-w-0">
          {/* Name */}
          <h3 className={`text-sm font-bold leading-snug text-start ${isAvailable ? "text-foreground" : "text-muted-foreground"}`}>
            {product.name}
          </h3>

          {/* Price */}
          {product.price && (
            <span className={`text-sm font-black mt-1 ${isAvailable ? "text-secondary" : "text-muted-foreground"}`}>
              {product.price}
            </span>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Add to cart */}
          <button
            onClick={() => isAvailable && addItem(product, categoryTitle)}
            disabled={!isAvailable}
            className={`mt-2 flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-lg border transition-colors self-start ${
              isAvailable
                ? "border-border text-foreground hover:border-secondary hover:text-secondary"
                : "border-border/40 text-muted-foreground cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            {isAvailable ? "أضف إلى السلة" : "غير متوفر"}
          </button>
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
