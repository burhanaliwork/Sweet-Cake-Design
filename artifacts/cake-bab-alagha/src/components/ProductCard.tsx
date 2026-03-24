import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-secondary/50 shadow-sm hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-xl font-bold text-foreground leading-tight">{product.name}</h3>
          {product.price && (
            <span className="inline-block bg-secondary/10 text-primary px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
              {product.price}
            </span>
          )}
        </div>
        
        {product.description && (
          <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
            {product.description}
          </p>
        )}
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <Button 
            variant="outline" 
            className="w-full justify-center group/btn"
            onClick={() => {
              const msg = encodeURIComponent(`مرحباً، أود الاستفسار عن: ${product.name}`);
              window.open(`https://wa.me/9647830003337?text=${msg}`, '_blank');
            }}
          >
            <ShoppingCart className="w-4 h-4 text-primary group-hover/btn:text-secondary transition-colors" />
            <span>طلب المنتج</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
