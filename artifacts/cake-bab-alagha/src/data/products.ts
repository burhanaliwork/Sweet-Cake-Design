export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: string;
  image: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

export const catalogData: Category[] = [
  {
    id: "cakes",
    title: "كيك المناسبات",
    description: "أجمل قوالب الكيك لمناسباتكم السعيدة، نصنعها بحب وإتقان لتشارككم أفراحكم",
    products: [
      {
        id: "c1",
        name: "كيك أعياد الميلاد",
        description: "قوالب بأحجام وتصاميم متعددة تناسب جميع الأذواق",
        price: "حسب الحجم",
        // birthday cake
        image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80",
      },
      {
        id: "c2",
        name: "كيك الزفاف",
        description: "تصاميم فاخرة لليلة العمر، طبقات متعددة ونكهات غنية",
        price: "عند الطلب",
        // wedding cake
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
      },
      {
        id: "c3",
        name: "كب كيك بالكاكاو",
        description: "كارتون 24 قطعة من الكب كيك الهش بنكهة الشوكولاتة الغنية",
        price: "6,000 د.ع",
        // cupcakes
        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80",
      },
      {
        id: "c4",
        name: "كيك قالب رقم 4",
        description: "حجم كبير جداً يكفي للمناسبات العائلية الكبيرة",
        price: "35,000 د.ع",
        // large cake
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      },
      {
        id: "c5",
        name: "ترايفل",
        description: "طبقات من الكيك والكريمة والفواكه الطازجة، أحجام مختلفة",
        price: "حسب الحجم",
        // trifle
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
      },
      {
        id: "c6",
        name: "كب كيك بالفراولة",
        description: "كارتون 24 قطعة بنكهة الفراولة اللذيذة",
        price: "6,000 د.ع",
        // strawberry cupcakes
        image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&q=80",
      }
    ]
  },
  {
    id: "pastries",
    title: "المعجنات",
    description: "مخبوزات طازجة يومياً بوصفات باب الآغا الأصلية التي لا تقاوم",
    products: [
      {
        id: "p1",
        name: "كليجة بالجوز",
        description: "الكليجة العراقية الأصيلة المحشوة بالجوز الفاخر",
        price: "9,000 د.ع / كيلو",
        // kleicha
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      },
      {
        id: "p2",
        name: "برازق",
        description: "أقراص البرازق المقرمشة المغطاة بالسمسم المحمص",
        price: "بالكيلو",
        // pastries
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
      },
      {
        id: "p3",
        name: "كليجة بالتمر",
        description: "محشوة بأجود أنواع التمور العراقية",
        price: "بالكيلو",
        // date cookies
        image: "https://images.unsplash.com/photo-1605333391910-c1243dbf157f?w=800&q=80",
      },
      {
        id: "p4",
        name: "بساكت",
        description: "تشكيلة من البسكويت الهش بأنواع مختلفة",
        price: "بالكيلو",
        // biscuits
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      },
      {
        id: "p5",
        name: "كريم ياف",
        description: "عجينة هشة محشوة بالكريمة اللذيذة",
        price: "1,000 د.ع / قطعة",
        // cream puff
        image: "https://images.unsplash.com/photo-1619736856793-27eb77202d08?w=800&q=80",
      }
    ]
  },
  {
    id: "arabic-sweets",
    title: "الحلويات العربية",
    description: "عراقة الطعم الشرقي في كل قطعة، محضرة بالسمن البلدي والمكسرات",
    products: [
      {
        id: "s1",
        name: "بقلاوة مشكلة",
        description: "تشكيلة فاخرة من البقلاوة بالمكسرات والسمن البلدي",
        price: "بالكيلو",
        // baklava
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
      },
      {
        id: "s2",
        name: "بسبوسة بالمكسرات",
        description: "بسبوسة طرية غنية بالقطر ومزينة بالمكسرات المحمصة",
        price: "بالكيلو",
        // basbousa
        image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=800&q=80",
      },
      {
        id: "s3",
        name: "زنود الست",
        description: "رقائق العجين المحشوة بالقشطة الطازجة والمقلية للون الذهبي",
        price: "بالكيلو",
        // general arabic sweets
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
      },
      {
        id: "s4",
        name: "دهينة بالجوز",
        description: "الدهينة النجفية الأصيلة الغنية بالجوز والمبروش",
        price: "بالكيلو",
        // general sweets dark
        image: "https://images.unsplash.com/photo-1632766323605-1a89f9e1e9f0?w=800&q=80",
      },
      {
        id: "s5",
        name: "زلابية",
        description: "حلقات الزلابية المقرمشة والمغمورة بالقطر الحلو",
        price: "بالكيلو",
        // general sweets
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80",
      },
      {
        id: "s6",
        name: "كعب الغزال",
        description: "حلوى تقليدية لذيذة محشوة بالمكسرات",
        price: "بالكيلو",
        // general pastries
        image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=800&q=80",
      }
    ]
  }
];
