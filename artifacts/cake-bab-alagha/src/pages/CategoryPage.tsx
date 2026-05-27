import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { useCatalog } from "@/hooks/useCatalog";

function ProductSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border flex flex-row-reverse items-center gap-3 p-3 animate-pulse">
      <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-8 bg-muted rounded-lg w-2/5 mt-2" />
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { catalog, loading } = useCatalog();
  const category = catalog.find((c) => c.id === id);

  if (!category && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-2xl font-bold text-foreground mb-4">القسم غير موجود</p>
        <Link href="/">
          <Button>العودة للرئيسية</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Breadcrumb + Header */}
        <div className="bg-card border-b border-border mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors font-medium">الرئيسية</Link>
              <ArrowRight className="w-4 h-4 rotate-180" />
              <Link href="/#categories" className="hover:text-primary transition-colors font-medium">أقسامنا</Link>
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="text-primary font-bold">{category?.title ?? "..."}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{category?.emoji ?? "🍰"}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-primary">{category?.title ?? ""}</h1>
                <p className="text-muted-foreground mt-1">{category?.description ?? ""}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            /* Skeleton cards while loading */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : category && category.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {category.products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} categoryTitle={category.title} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="text-7xl mb-6">{category?.emoji ?? "🍰"}</div>
              <h2 className="text-2xl font-black text-foreground mb-3">قريباً...</h2>
            </motion.div>
          )}
        </div>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
