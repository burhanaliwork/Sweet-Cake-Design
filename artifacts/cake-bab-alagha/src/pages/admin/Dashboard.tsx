import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { catalogData as staticCategories } from "@/data/products";

interface DbCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  sort_order: number;
}

const token = () => sessionStorage.getItem("admin_token") || "";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [dbCategories, setDbCategories] = useState<DbCategory[]>([]);
  const [seedDone, setSeedDone] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const t = token();
    if (!t) { setLocation("/admin"); return; }
    fetch("/api/admin/auth-check", { headers: { Authorization: `Bearer ${t}` } })
      .then(r => { if (!r.ok) { setLocation("/admin"); } })
      .catch(() => setLocation("/admin"));
  }, []);

  async function loadCategories() {
    try {
      const res = await fetch("/api/admin/categories", { headers: { Authorization: `Bearer ${token()}` } });
      const data = await res.json();
      setDbCategories(data);
    } catch { /* ignore */ }
  }

  async function loadProductCounts() {
    try {
      const res = await fetch("/api/admin/products", { headers: { Authorization: `Bearer ${token()}` } });
      const prods = await res.json();
      const counts: Record<string, number> = {};
      for (const p of prods) {
        counts[p.category_id] = (counts[p.category_id] || 0) + 1;
      }
      setProductCounts(counts);
    } catch { /* ignore */ }
  }

  useEffect(() => {
    Promise.all([loadCategories(), loadProductCounts()]).then(() => setLoading(false));
  }, []);

  async function seedCategories() {
    setSeeding(true);
    const cats = staticCategories.map((c, i) => ({
      id: c.id,
      title: c.title,
      emoji: c.emoji,
      description: c.description || "",
      sort_order: i,
    }));
    await fetch("/api/admin/seed-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ categories: cats }),
    });
    await loadCategories();
    setSeedDone(true);
    setSeeding(false);
  }

  return (
    <AdminLayout title="لوحة التحكم الرئيسية">
      <div className="max-w-2xl mx-auto space-y-4">

        {dbCategories.length === 0 && !loading && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-amber-800 font-medium mb-3">
              لم يتم استيراد الأقسام بعد. انقر لاستيراد الأقسام من الموقع
            </p>
            <button
              onClick={seedCategories}
              disabled={seeding}
              className="bg-[#c17f2a] text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 hover:bg-[#a96d1f] transition-colors"
            >
              {seeding ? "جاري الاستيراد..." : "استيراد الأقسام"}
            </button>
          </div>
        )}

        {seedDone && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-green-800 text-sm font-medium">
            ✅ تم استيراد الأقسام بنجاح
          </div>
        )}

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-bold text-[#5c3d1e] mb-4 text-base">إدارة المنتجات حسب القسم</h2>
          {loading ? (
            <div className="text-center py-8 text-[#8c7355]">جاري التحميل...</div>
          ) : dbCategories.length === 0 ? (
            <div className="text-center py-8 text-[#8c7355]">لا توجد أقسام. قم بالاستيراد أولاً</div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {dbCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setLocation(`/admin/category/${cat.id}`)}
                  className="flex items-center justify-between bg-[#faf8f4] hover:bg-[#f0e8d8] border border-[#e8dcc8] rounded-xl p-4 transition-colors text-right"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <div className="font-bold text-[#5c3d1e]">{cat.title}</div>
                      <div className="text-xs text-[#8c7355]">{productCounts[cat.id] || 0} منتج</div>
                    </div>
                  </div>
                  <span className="text-[#c17f2a] font-bold text-lg">←</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-bold text-[#5c3d1e] mb-3 text-base">الرابط المباشر للمتجر</h2>
          <button
            onClick={() => setLocation("/")}
            className="block w-full text-center bg-[#5c3d1e] text-white py-3 rounded-xl font-bold hover:bg-[#7a5228] transition-colors"
          >
            🛍️ عرض المتجر
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
