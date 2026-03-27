import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

const DELIVERY_OPTIONS = [
  { id: "left",  label: "الجانب الأيسر",  price: 2500, display: "2,500 د.ع" },
  { id: "right", label: "الجانب الأيمن",  price: 3000, display: "3,000 د.ع" },
];

function parsePrice(price?: string): number {
  if (!price) return 0;
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, isOpen, closeCart } = useCart();
  const [delivery, setDelivery] = useState<string>("left");

  const selectedDelivery = DELIVERY_OPTIONS.find(o => o.id === delivery)!;
  const subtotal = items.reduce((sum, i) => sum + parsePrice(i.product.price) * i.quantity, 0);
  const total = subtotal + selectedDelivery.price;

  const handleCheckout = () => {
    if (items.length === 0) return;

    let msg = "مرحباً 👋 أود الطلب التالي:\n\n";
    items.forEach((item, idx) => {
      const lineTotal = parsePrice(item.product.price) * item.quantity;
      msg += `${idx + 1}. ${item.product.name}`;
      if (item.product.price) msg += ` × ${item.quantity} = ${lineTotal.toLocaleString("ar-IQ")} د.ع`;
      msg += "\n";
    });
    msg += `\n📦 التوصيل: ${selectedDelivery.label} - ${selectedDelivery.display}`;
    msg += `\n💰 المجموع الكلي: ${total.toLocaleString("ar-IQ")} د.ع`;

    window.open(`https://wa.me/9647725853434?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-background z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-black">سلة المشتريات</h2>
              </div>
              <button onClick={closeCart} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground font-bold text-lg">السلة فارغة</p>
                  <p className="text-muted-foreground text-sm">أضف منتجات من المتجر</p>
                  <Button variant="primary" onClick={closeCart}>تصفح المنتجات</Button>
                </div>
              ) : (
                <>
                  {items.map(item => (
                    <div key={item.product.id} className="bg-card border border-border rounded-xl p-3 flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-sm text-foreground leading-tight mb-1 truncate">{item.product.name}</p>
                        {item.product.price && (
                          <p className="text-secondary font-black text-sm">{item.product.price}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-black text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors shrink-0 self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Delivery */}
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="w-4 h-4 text-secondary" />
                      <p className="font-bold text-sm">التوصيل - الموصل</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {DELIVERY_OPTIONS.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setDelivery(opt.id)}
                          className={`rounded-xl p-3 text-center border-2 transition-all ${
                            delivery === opt.id
                              ? "border-secondary bg-secondary/10 text-primary"
                              : "border-border bg-muted/30 text-muted-foreground"
                          }`}
                        >
                          <p className="font-black text-sm">{opt.label}</p>
                          <p className="font-bold text-xs mt-0.5">{opt.display}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear cart */}
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors font-bold w-full text-center py-1"
                  >
                    إفراغ السلة
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-3 bg-card">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>المجموع الفرعي</span>
                    <span className="font-bold">{subtotal.toLocaleString("ar-IQ")} د.ع</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>التوصيل ({selectedDelivery.label})</span>
                    <span className="font-bold">{selectedDelivery.display}</span>
                  </div>
                  <div className="flex justify-between text-foreground font-black text-base border-t border-border pt-1.5 mt-1.5">
                    <span>المجموع الكلي</span>
                    <span className="text-secondary">{total.toLocaleString("ar-IQ")} د.ع</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="w-full justify-center text-base py-3"
                  onClick={handleCheckout}
                >
                  <ShoppingBag className="w-5 h-5" />
                  إتمام الشراء عبر الواتساب
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
