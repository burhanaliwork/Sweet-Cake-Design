import { useState, useEffect } from "react";
import { catalogData, Category } from "@/data/products";

let cachedCatalog: Category[] | null = null;
let fetchAttempted = false;

export function useCatalog() {
  const [catalog, setCatalog] = useState<Category[]>(cachedCatalog ?? catalogData);
  const [loading, setLoading] = useState(!cachedCatalog);

  useEffect(() => {
    if (fetchAttempted) return;
    fetchAttempted = true;

    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data: Array<{id: string; title: string; emoji: string; description: string; products: Array<{id: string; name: string; description?: string; price?: string; note?: string; image: string}>}>) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const merged: Category[] = data.map((dbCat) => {
          const staticCat = catalogData.find((c) => c.id === dbCat.id);
          const dbProds = (dbCat.products ?? []).map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            note: p.note,
            image: p.image || "",
          }));
          return {
            id: dbCat.id,
            title: dbCat.title || staticCat?.title || "",
            emoji: dbCat.emoji || staticCat?.emoji || "🍰",
            description: dbCat.description || staticCat?.description || "",
            products: dbProds,
          };
        });
        cachedCatalog = merged;
        setCatalog(merged);
      })
      .catch(() => {
        fetchAttempted = false;
      })
      .finally(() => setLoading(false));
  }, []);

  function refreshCatalog() {
    cachedCatalog = null;
    fetchAttempted = false;
    setLoading(true);
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data: Array<{id: string; title: string; emoji: string; description: string; products: Array<{id: string; name: string; description?: string; price?: string; note?: string; image: string}>}>) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const merged: Category[] = data.map((dbCat) => {
          const staticCat = catalogData.find((c) => c.id === dbCat.id);
          const dbProds = (dbCat.products ?? []).map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            note: p.note,
            image: p.image || "",
          }));
          return {
            id: dbCat.id,
            title: dbCat.title || staticCat?.title || "",
            emoji: dbCat.emoji || staticCat?.emoji || "🍰",
            description: dbCat.description || staticCat?.description || "",
            products: dbProds,
          };
        });
        cachedCatalog = merged;
        setCatalog(merged);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  return { catalog, loading, refreshCatalog };
}
