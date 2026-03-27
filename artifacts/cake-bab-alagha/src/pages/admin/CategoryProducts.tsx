import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";

interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  note: string;
  image_data: string;
  sort_order: number;
}

interface Category {
  id: string;
  title: string;
  emoji: string;
}

const token = () => sessionStorage.getItem("admin_token") || "";

function ProductForm({
  categoryId,
  product,
  onSave,
  onCancel,
}: {
  categoryId: string;
  product?: Product;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [note, setNote] = useState(product?.note || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("اسم المنتج مطلوب"); return; }
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("note", note);
      formData.append("category_id", categoryId);
      if (imageFile) formData.append("image", imageFile);

      let res;
      if (product) {
        res = await fetch(`/api/admin/products/${product.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token()}` },
          body: formData,
        });
      } else {
        res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { Authorization: `Bearer ${token()}` },
          body: formData,
        });
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "حدث خطأ");
      }
      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" dir="rtl">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#e8dcc8] p-4 flex items-center justify-between">
          <h2 className="font-bold text-[#5c3d1e]">{product ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
          <button onClick={onCancel} className="text-[#8c7355] text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSave} className="p-4 space-y-4">
          {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-[#5c3d1e] mb-1">اسم المنتج *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full border border-[#d4b896] rounded-lg px-3 py-2.5 text-right focus:outline-none focus:border-[#c17f2a] bg-[#faf8f4]"
              placeholder="مثال: كيك الشوكولاتة"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c3d1e] mb-1">الوصف</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              className="w-full border border-[#d4b896] rounded-lg px-3 py-2.5 text-right focus:outline-none focus:border-[#c17f2a] bg-[#faf8f4] resize-none"
              placeholder="وصف مختصر للمنتج"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c3d1e] mb-1">السعر</label>
            <input
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full border border-[#d4b896] rounded-lg px-3 py-2.5 text-right focus:outline-none focus:border-[#c17f2a] bg-[#faf8f4]"
              placeholder="مثال: 5,000 د.ع"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c3d1e] mb-1">ملاحظة / شارة</label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full border border-[#d4b896] rounded-lg px-3 py-2.5 text-right focus:outline-none focus:border-[#c17f2a] bg-[#faf8f4]"
              placeholder="مثال: بدون جلوتن / بدون سكر"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c3d1e] mb-1">صورة المنتج</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[#d4b896] rounded-xl p-4 text-center cursor-pointer hover:border-[#c17f2a] hover:bg-[#faf8f4] transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="h-32 mx-auto rounded-lg object-cover" />
              ) : (
                <div className="text-[#8c7355]">
                  <div className="text-3xl mb-1">📷</div>
                  <div className="text-sm">اضغط لإضافة صورة</div>
                  <div className="text-xs text-[#b09070] mt-1">JPG، PNG — حتى 5MB</div>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#c17f2a] text-white font-bold py-3 rounded-xl disabled:opacity-50 hover:bg-[#a96d1f] transition-colors"
            >
              {saving ? "جاري الحفظ..." : product ? "حفظ التعديلات" : "إضافة المنتج"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-[#f0e8d8] text-[#5c3d1e] font-bold py-3 rounded-xl hover:bg-[#e8dcc8] transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CategoryProducts() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const t = token();
    if (!t) { setLocation("/admin"); return; }
    loadData();
  }, [categoryId]);

  async function loadData() {
    setLoading(true);
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/admin/categories", { headers: { Authorization: `Bearer ${token()}` } }),
        fetch(`/api/admin/products?category_id=${categoryId}`, { headers: { Authorization: `Bearer ${token()}` } }),
      ]);
      const cats: Category[] = await catRes.json();
      const prods: Product[] = await prodRes.json();
      setCategory(cats.find(c => c.id === categoryId) || null);
      setProducts(prods);
    } catch { /* ignore */ }
    setLoading(false);
  }

  async function deleteProduct(id: string) {
    setDeletingId(id);
    await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` },
    });
    setDeletingId(null);
    setConfirmDeleteId(null);
    await loadData();
  }

  return (
    <AdminLayout title={category ? `${category.emoji} ${category.title}` : "المنتجات"}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setLocation("/admin/dashboard")}
            className="text-[#c17f2a] font-bold text-sm"
          >
            → العودة
          </button>
          <div className="flex-1" />
          <button
            onClick={() => { setEditingProduct(undefined); setShowForm(true); }}
            className="bg-[#c17f2a] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#a96d1f] transition-colors"
          >
            + إضافة منتج
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#8c7355]">جاري التحميل...</div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-[#8c7355] mb-4">لا توجد منتجات في هذا القسم بعد</p>
            <button
              onClick={() => { setEditingProduct(undefined); setShowForm(true); }}
              className="bg-[#c17f2a] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#a96d1f] transition-colors"
            >
              + أضف أول منتج
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map(prod => (
              <div key={prod.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f5f0e8] flex-shrink-0">
                  {prod.image_data === "[image]" ? (
                    <img
                      src={`/api/product-image/${prod.id}`}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  ) : prod.image_data?.startsWith("https://") ? (
                    <img
                      src={prod.image_data}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🧁</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#5c3d1e] truncate">{prod.name}</div>
                  {prod.price && <div className="text-sm text-[#c17f2a] font-medium">{prod.price}</div>}
                  {prod.note && (
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full mt-0.5">
                      {prod.note}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setEditingProduct(prod); setShowForm(true); }}
                    className="bg-[#f0e8d8] text-[#5c3d1e] text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-[#e8dcc8] transition-colors"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(prod.id)}
                    className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm
          categoryId={categoryId!}
          product={editingProduct}
          onSave={async () => { setShowForm(false); await loadData(); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-bold text-[#5c3d1e] text-lg mb-2">حذف المنتج</h3>
            <p className="text-[#8c7355] text-sm mb-5">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع</p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteProduct(confirmDeleteId)}
                disabled={!!deletingId}
                className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl disabled:opacity-50 hover:bg-red-500 transition-colors"
              >
                {deletingId ? "جاري الحذف..." : "نعم، حذف"}
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 bg-[#f0e8d8] text-[#5c3d1e] font-bold py-2.5 rounded-xl hover:bg-[#e8dcc8] transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
