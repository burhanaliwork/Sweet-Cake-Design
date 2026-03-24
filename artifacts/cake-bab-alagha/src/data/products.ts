export interface Product {
  id: string;
  name: string;
  description?: string;
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
        name: "قالب كيك",
        description: "قوالب بأحجام متعددة تناسب جميع المناسبات",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      },
      {
        id: "c2",
        name: "كب كيك بالكاكاو",
        description: "كارتون 24 قطعة من الكب كيك الهش بنكهة الشوكولاتة الغنية",
        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80",
      },
      {
        id: "c3",
        name: "كب كيك بالبندق",
        description: "كارتون 24 قطعة بنكهة البندق اللذيذة",
        image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&q=80",
      },
      {
        id: "c4",
        name: "كب كيك بالفراولة",
        description: "كارتون 24 قطعة بنكهة الفراولة الرائعة",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
      },
      {
        id: "c5",
        name: "كيك بيتي",
        description: "كيك صحي مصنوع بطحين الجاودار",
        image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80",
      },
      {
        id: "c6",
        name: "ترايفل",
        description: "طبقات من الكيك والكريمة بأحجام مختلفة",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
      },
    ],
  },
  {
    id: "pastries",
    title: "المعجنات",
    description: "مخبوزات طازجة يومياً بوصفات باب الآغا الأصيلة التي لا تقاوم",
    products: [
      {
        id: "p1",
        name: "كليجة بالجوز",
        description: "الكليجة العراقية الأصيلة المحشوة بالجوز الفاخر",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      },
      {
        id: "p2",
        name: "كليجة بالتمر",
        description: "محشوة بأجود أنواع التمور العراقية",
        image: "https://images.unsplash.com/photo-1605333391910-c1243dbf157f?w=800&q=80",
      },
      {
        id: "p3",
        name: "برازق",
        description: "أقراص مقرمشة مغطاة بالسمسم المحمص",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
      },
      {
        id: "p4",
        name: "بساكت",
        description: "تشكيلة من البسكويت الهش بأنواع مختلفة",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      },
      {
        id: "p5",
        name: "كريم ياف",
        description: "عجينة هشة محشوة بالكريمة اللذيذة",
        image: "https://images.unsplash.com/photo-1619736856793-27eb77202d08?w=800&q=80",
      },
    ],
  },
  {
    id: "arabic-sweets",
    title: "الحلويات العربية",
    description: "عراقة الطعم الشرقي في كل قطعة، محضرة بالسمن البلدي والمكسرات",
    products: [
      {
        id: "s1",
        name: "بقلاوة",
        description: "بقلاوة فاخرة بالمكسرات والسمن البلدي",
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
      },
      {
        id: "s2",
        name: "بقلاوة بلورية",
        description: "نوع مميز من البقلاوة بشكل بلوري فريد",
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
      },
      {
        id: "s3",
        name: "زنود الست",
        description: "رقائق العجين المحشوة بالقشطة الطازجة",
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80",
      },
      {
        id: "s4",
        name: "خدود الست",
        description: "حلوى شرقية ناعمة بنكهة غنية",
        image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=800&q=80",
      },
      {
        id: "s5",
        name: "كعب الغزال",
        description: "حلوى تقليدية لذيذة محشوة بالمكسرات",
        image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=800&q=80",
      },
      {
        id: "s6",
        name: "زلابية",
        description: "حلقات الزلابية المقرمشة المغمورة بالقطر الحلو",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      },
      {
        id: "s7",
        name: "بسبوسة",
        description: "بسبوسة طرية غنية بالقطر",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
      },
      {
        id: "s8",
        name: "بسبوسة بالمكسرات",
        description: "بسبوسة مزينة بالمكسرات المحمصة",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
      },
      {
        id: "s9",
        name: "جزرية",
        description: "حلوى الجزر العراقية الأصيلة بالجوز",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
      },
      {
        id: "s10",
        name: "دهينة بالجوز",
        description: "الدهينة الأصيلة الغنية بالجوز والمبروش",
        image: "https://images.unsplash.com/photo-1632766323605-1a89f9e1e9f0?w=800&q=80",
      },
      {
        id: "s11",
        name: "موالح حلوة",
        description: "تشكيلة متنوعة من المواليح والمكسرات",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80",
      },
    ],
  },
];
