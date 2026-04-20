import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-12 pb-8 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-foreground/95 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-24 h-24 drop-shadow-md">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo-mosul.png`} 
                alt="شعار باب الآغا" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-lg font-bold text-secondary">تابعنا</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/babalagha_mosul"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-foreground transition-all"
                title="انستغرام"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579179376700"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-foreground transition-all"
                title="فيسبوك"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <h5 className="font-bold text-white mb-1">خدمة التوصيل</h5>
            <p className="text-sm text-white/70">توصيل لجميع أنحاء الموصل</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} مخابز باب الآغا. جميع الحقوق محفوظة.
          </p>
          <p className="text-white/50 text-sm">صُنع بحب في العراق</p>
        </div>
      </div>
    </footer>
  );
}
