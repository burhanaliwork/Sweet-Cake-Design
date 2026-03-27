import { useState } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطأ في تسجيل الدخول");
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_email", data.email);
      setLocation("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧁</div>
          <h1 className="text-2xl font-bold text-[#5c3d1e]">لوحة تحكم</h1>
          <p className="text-[#8c7355] mt-1">مخابز باب الآغا</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 rounded-lg p-3 mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5c3d1e] mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-[#d4b896] rounded-lg px-4 py-3 text-right focus:outline-none focus:border-[#c17f2a] bg-[#faf8f4]"
              placeholder="admin@babalagha.iq"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5c3d1e] mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-[#d4b896] rounded-lg px-4 py-3 text-right focus:outline-none focus:border-[#c17f2a] bg-[#faf8f4]"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c17f2a] text-white font-bold py-3 rounded-lg hover:bg-[#a96d1f] transition-colors disabled:opacity-50"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <p className="text-xs text-center text-[#b09070] mt-6">
          لوحة إدارة المتجر الرسمي
        </p>
      </div>
    </div>
  );
}
