import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8 bg-pattern relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-foreground/95 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 drop-shadow-md">
                <img 
                  src={`${import.meta.env.BASE_URL}images/logo-clean.png`} 
                  alt="شعار باب الآغا" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-black text-white">باب الآغا</h3>
            </div>
            <p className="text-white/70 leading-relaxed max-w-xs">
              للماضي حكاية وطعم ... خبز وحلويات باب الآغا ... حار ومكسب ورخيص. نقدم أصالة الطعم العراقي منذ 1948.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-secondary mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>بغداد، طريق الحلة<br/>منطقة العويريج الصناعية</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span dir="ltr">07725853434</span>
              </li>
            </ul>
          </div>

          {/* Social & Delivery */}
          <div>
            <h4 className="text-lg font-bold text-secondary mb-6">تابعنا</h4>
            <div className="flex items-center gap-3 mb-8">
              <a href="https://instagram.com/babalagha.iq" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/babalagha.iq" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h5 className="font-bold text-white mb-2">خدمة التوصيل</h5>
              <p className="text-sm text-white/70">توصيل لجميع أنحاء العراق</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} مخابز باب الآغا. جميع الحقوق محفوظة.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1">
            صُنع بحب في العراق
          </p>
        </div>
      </div>
    </footer>
  );
}
