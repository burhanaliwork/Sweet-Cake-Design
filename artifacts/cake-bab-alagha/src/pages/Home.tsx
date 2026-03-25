import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/Button";
import { catalogData } from "@/data/products";
import { Star, Clock, Truck, ShieldCheck, Heart, ChevronLeft } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // After navigating from another page, scroll to stored section
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
        {/* landing page hero bakery interior */}
        <section 
          id="hero"
          className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-20"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80" 
              alt="مخابز باب الآغا" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-bold text-sm mb-6 backdrop-blur-sm">
                  مخبوزات وحلويات عراقية أصلية
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-lg">
                  حكاية طعم <br/>
                  <span className="text-secondary">تتوارثها الأجيال</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-medium max-w-lg drop-shadow">
                  للماضي حكاية وطعم ... خبز وحلويات باب الآغا ... حار ومكسب ورخيص. نقدم لكم أجود المنتجات منذ عام 1948 في قلب بغداد.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => scrollToSection('categories')}>
                    تصفح المنتجات
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white" onClick={() => scrollToSection('about-text')}>
                    تعرف على قصتنا
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative scroll indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-xs font-bold tracking-widest uppercase">اكتشف المزيد</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </section>

        {/* STATS / FEATURES SECTION */}
        <section className="py-12 bg-primary text-primary-foreground relative z-20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-x-reverse divide-white/10">
              {[
                { icon: Clock, title: "منذ 1948", desc: "خبرة وأصالة" },
                { icon: Heart, title: "825K+ متابع", desc: "ثقة عملائنا" },
                { icon: Truck, title: "توصيل سريع", desc: "لكافة أنحاء العراق" },
                { icon: ShieldCheck, title: "جودة عالية", desc: "مكونات طبيعية 100%" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center px-4"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-secondary">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{stat.title}</h3>
                  <p className="text-primary-foreground/70 text-sm font-medium">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
                      {/* Count badge */}
                      {category.products.length > 0 && (
                        <span className="absolute top-3 start-3 bg-secondary text-primary text-xs font-black px-2 py-0.5 rounded-full">
                          {category.products.length}
                        </span>
                      )}

                      <span className="text-4xl md:text-5xl">{category.emoji}</span>
                      <h3 className="font-black text-foreground text-base md:text-lg leading-tight group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-secondary transition-colors font-medium">
                        {category.products.length > 0
                          ? <><Star className="w-3 h-3 fill-current" />{category.products.length} منتج</>
                          : <span>قريباً</span>
                        }
                        <ChevronLeft className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        {/* baker making dough */}
        <section id="about" className="py-24 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-30 mix-blend-multiply" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Text first so mobile scroll lands on text */}
              <motion.div 
                id="about-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6 order-first lg:order-last"
              >
                <h2 className="text-secondary font-bold tracking-wider text-sm">تاريخ عريق</h2>
                <h3 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                  حكاية أصيلة <br/>منذ عام 1948
                </h3>
                
                <div className="space-y-4 text-lg text-foreground/80 leading-relaxed font-medium">
                  <p>
                    تأسست مخابز باب الآغا عام 1948 في قلب بغداد العريقة. بدأت رحلتنا بحكاية بسيطة من خبز يُحمل في السلال عبر شوارع بغداد الأصيلة، ليصل دافئاً وطازجاً إلى كل بيت.
                  </p>
                  <p>
                    على مدى أكثر من 75 عاماً، كبرنا معكم وأصبحنا رمزاً للحلاوة والأصالة العراقية. نحن لا نصنع الخبز والحلويات فحسب، بل نصنع ذكريات تشاركونها مع من تحبون.
                  </p>
                  <p>
                    اليوم، ومن قلب منطقة العويريج الصناعية، نفخر بتقديم أجود أنواع الكيك، المعجنات، والحلويات العربية المصنوعة بوصفات تقليدية متوارثة، ونوصل طعمنا الأصيل إلى جميع أنحاء العراق.
                  </p>
                </div>

                <div className="pt-8">
                  <Button size="lg" onClick={() => window.open('https://wa.me/9647725853434')}>
                    تواصل معنا الآن
                  </Button>
                </div>
              </motion.div>

              {/* Image — second in DOM so mobile shows text first */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-last lg:order-first"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl max-h-72 lg:max-h-96">
                  <div className="absolute inset-0 border-4 border-white/20 rounded-3xl z-10 m-4 pointer-events-none" />
                  <img 
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80" 
                    alt="داخل مخابز باب الآغا" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 start-4 end-4 glass-panel rounded-xl p-4 text-center z-20">
                    <p className="text-lg font-black text-primary">حار ومكسب ورخيص</p>
                    <p className="text-foreground/80 font-semibold text-sm">شعارنا الذي كبرت عليه أجيال</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
