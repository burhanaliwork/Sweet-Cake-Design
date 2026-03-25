import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ProductCard } from "@/components/ProductCard";
import { catalogData } from "@/data/products";
import { Button } from "@/components/ui/Button";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const category = catalogData.find((c) => c.id === id);

  if (!category) {
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
              <span className="text-primary font-bold">{category.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{category.emoji}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-primary">{category.title}</h1>
                <p className="text-muted-foreground mt-1">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {category.products.length > 0 ? (
            <>
              <p className="text-muted-foreground font-medium mb-8">
                {category.products.length} منتج
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {category.products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="text-7xl mb-6">{category.emoji}</div>
              <h2 className="text-2xl font-black text-foreground mb-3">قريباً...</h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                سيتم إضافة منتجات قسم {category.title} قريباً. تابعونا على مواقع التواصل الاجتماعي لمعرفة آخر الإضافات.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => window.open("https://wa.me/9647725853434", "_blank")}>
                  <ShoppingBag className="w-4 h-4" />
                  استفسر عبر الواتساب
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    العودة للرئيسية
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
