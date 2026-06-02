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
  image?: string;
  description: string;
  products: Product[];
}

export const catalogData: Category[] = [
  { id: "halawiyat",      title: "حلويات",         emoji: "🍰", image: "/images/categories/halawiyat.png",  description: "تشكيلة واسعة من الحلويات اللذيذة",           products: [] },
  { id: "baqasim-cake",   title: "بقاصم وكيك",     emoji: "🎂",                                             description: "تشكيلة من البقاصم والكيك الطازج",           products: [] },
  { id: "gluten-free",    title: "خالي الجلوتين",  emoji: "🌾", image: "/images/categories/gluten-free.png", description: "منتجات خاصة لأصحاب حساسية الجلوتين",        products: [] },
  { id: "taheen",         title: "طحين",           emoji: "🫙", image: "/images/categories/taheen.png",     description: "أجود أنواع الطحين والدقيق",                 products: [] },
  { id: "products-other", title: "منتجات",         emoji: "🛒",                                             description: "منتجات متنوعة مختارة بعناية",               products: [] },
  { id: "pizza",          title: "بيتزا",          emoji: "🍕", image: "/images/categories/pizza.png",      description: "بيتزا طازجة بعجينة مخبزنا الأصلية",         products: [] },
  { id: "makhbozat",      title: "مخبوزات",        emoji: "🍞", image: "/images/categories/makhbozat.png", description: "خبز ومخبوزات طازجة يومياً",                 products: [] },
  { id: "maajinaat",      title: "معجنات",         emoji: "🥐", image: "/images/categories/maajinaat.png", description: "معجنات على أصولها",                        products: [] },
  { id: "sugar-free",     title: "خالي السكر",     emoji: "💚",                                             description: "منتجات لذيذة خاصة بمرضى السكري",            products: [] },
  { id: "mawaalih",       title: "موالح",          emoji: "🧂", image: "/images/categories/mawaalih.png",  description: "تشكيلة من الموالح والمقبلات",               products: [] },
];
