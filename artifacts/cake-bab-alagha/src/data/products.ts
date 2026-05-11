export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: string;
  note?: string;
  image: string;
  is_available?: boolean;
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  description: string;
  products: Product[];
}

export const catalogData: Category[] = [
  { id: "halawiyat",      title: "حلويات",         emoji: "🍰", description: "تشكيلة واسعة من الحلويات اللذيذة",           products: [] },
  { id: "baqasim-cake",   title: "بقاصم وكيك",     emoji: "🎂", description: "تشكيلة من البقاصم والكيك الطازج",           products: [] },
  { id: "gluten-free",    title: "خالي الجلوتين",  emoji: "🌾", description: "منتجات خاصة لأصحاب حساسية الجلوتين",        products: [] },
  { id: "taheen",         title: "طحين",           emoji: "🫙", description: "أجود أنواع الطحين والدقيق",                 products: [] },
  { id: "products-other", title: "منتجات",         emoji: "🛒", description: "منتجات متنوعة مختارة بعناية",               products: [] },
  { id: "pizza",          title: "بيتزا",          emoji: "🍕", description: "بيتزا طازجة بعجينة مخبزنا الأصلية",         products: [] },
  { id: "makhbozat",      title: "مخبوزات",        emoji: "🍞", description: "خبز ومخبوزات طازجة يومياً",                 products: [] },
  { id: "maajinaat",      title: "معجنات",         emoji: "🥐", description: "معجنات على أصولها",                        products: [] },
  { id: "sugar-free",     title: "خالي السكر",     emoji: "💚", description: "منتجات لذيذة خاصة بمرضى السكري",            products: [] },
  { id: "mawaalih",       title: "موالح",          emoji: "🧂", description: "تشكيلة من الموالح والمقبلات",               products: [] },
];
