import { useLocation } from "wouter";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [, setLocation] = useLocation();

  function logout() {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_email");
    setLocation("/admin");
  }

  const email = sessionStorage.getItem("admin_email") || "";

  return (
    <div className="min-h-screen bg-[#f5f0e8]" dir="rtl">
      <header className="bg-[#5c3d1e] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl">🧁</span>
          <div>
            <div className="font-bold text-sm">مخابز باب الآغا</div>
            <div className="text-xs text-[#d4b896]">لوحة التحكم</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#d4b896] hidden sm:block">{email}</span>
          <button
            onClick={() => setLocation("/admin/dashboard")}
            className="text-xs bg-[#7a5228] px-3 py-1 rounded-lg hover:bg-[#8a6238] transition-colors"
          >
            الرئيسية
          </button>
          <button
            onClick={logout}
            className="text-xs bg-red-700 px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
          >
            خروج
          </button>
        </div>
      </header>

      {title && (
        <div className="bg-white border-b border-[#e8dcc8] px-4 py-3">
          <h1 className="text-lg font-bold text-[#5c3d1e]">{title}</h1>
        </div>
      )}

      <main className="p-4">{children}</main>
    </div>
  );
}
