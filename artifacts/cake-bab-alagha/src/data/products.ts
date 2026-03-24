export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: string;
  note?: string;
  image: string;
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  description: string;
  products: Product[];
}

export const catalogData: Category[] = [
  {
    id: "halawiyat",
    title: "حلويات",
    emoji: "🍰",
    description: "تشكيلة واسعة من الحلويات اللذيذة",
    products: [
      { id: "h1",  name: "محاشي",          price: "2,500 د.ع", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80" },
      { id: "h2",  name: "كريم بوف",        price: "1,500 د.ع", image: "https://images.unsplash.com/photo-1619736856793-27eb77202d08?w=800&q=80" },
      { id: "h3",  name: "ما كنتوش",        price: "3,500 د.ع", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80" },
      { id: "h4",  name: "خشخش",           price: "2,250 د.ع", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80" },
      { id: "h5",  name: "راس العبد",       price: "1,750 د.ع", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80" },
      { id: "h6",  name: "درايفر صغير",     price: "2,000 د.ع", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80" },
      { id: "h7",  name: "كعب الغزال",      price: "4,000 د.ع", note: "بدون جلوتن", image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=800&q=80" },
      { id: "h8",  name: "كوكيز",           price: "4,000 د.ع", note: "بدون جلوتن", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80" },
      { id: "h9",  name: "سابليه نستله",    price: "3,750 د.ع", note: "بدون جلوتن", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80" },
      { id: "h10", name: "ما فن قدح",       price: "2,500 د.ع", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80" },
      { id: "h11", name: "ديسباسيتو",       price: "2,000 د.ع", image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=800&q=80" },
      { id: "h12", name: "مافن صغير",       price: "2,000 د.ع", image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80" },
      { id: "h13", name: "شوكولاته دبي",    price: "5,500 د.ع", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80" },
      { id: "h14", name: "براونيز",         price: "3,750 د.ع", image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80" },
      { id: "h15", name: "مافن عائلي",      price: "3,500 د.ع", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80" },
      { id: "h16", name: "كيك دوائر قطع",   price: "3,500 د.ع", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80" },
    ],
  },
  {
    id: "baqasim-cake",
    title: "بقاصم وكيك",
    emoji: "🎂",
    description: "تشكيلة من البقاصم والكيك الطازج",
    products: [],
  },
  {
    id: "gluten-free",
    title: "خالي الجلوتين",
    emoji: "🌾",
    description: "منتجات خاصة لأصحاب حساسية الجلوتين",
    products: [],
  },
  {
    id: "taheen",
    title: "طحين",
    emoji: "🫙",
    description: "أجود أنواع الطحين والدقيق",
    products: [],
  },
  {
    id: "products-other",
    title: "منتجات",
    emoji: "🛒",
    description: "منتجات متنوعة مختارة بعناية",
    products: [],
  },
  {
    id: "pizza",
    title: "بيتزا",
    emoji: "🍕",
    description: "بيتزا طازجة بعجينة مخبزنا الأصلية",
    products: [],
  },
  {
    id: "makhbozat",
    title: "مخبوزات",
    emoji: "🍞",
    description: "خبز ومخبوزات طازجة يومياً",
    products: [],
  },
  {
    id: "maajinaat",
    title: "معجنات",
    emoji: "🥐",
    description: "معجنات على أصولها",
    products: [],
  },
  {
    id: "sugar-free",
    title: "خالي السكر",
    emoji: "💚",
    description: "منتجات لذيذة خاصة بمرضى السكري",
    products: [],
  },
  {
    id: "mawaalih",
    title: "موالح",
    emoji: "🧂",
    description: "تشكيلة من الموالح والمقبلات",
    products: [],
  },
];
