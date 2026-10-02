// Məhsul kataloqu. Qiymətlər və endirimlər PDF qiymət cədvəllərinə əsaslanır.
// `price` — bazar qiyməti, `discount` — faizlə endirim. Son qiymət avtomatik hesablanır.

export type BrandSlug = "nouvelle" | "redist" | "redone" | "razorline" | "naspura" | "arteko";
export type CategorySlug = "sac-boyasi" | "sac-baximi" | "styling" | "berber" | "aletler";
export type Badge = "yeni" | "hit" | "nagd" | "hediyye" | "dest";

export type Variant = {
  id: string;
  label: string;
  code?: string;
  image?: string;
  swatch?: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: BrandSlug;
  category: CategorySlug;
  code?: string;
  volume?: string;
  price: number;
  discount?: number;
  image: string;
  gallery?: string[];
  cover?: boolean; // şəkil fonlu posterdirsə, kəsilmiş (cutout) deyil
  photo?: boolean; // boz fonlu real foto (kartın fonuna "multiply" ilə qarışır)
  tint: string; // kartın fon rəngi
  short: string;
  description: string;
  features: string[];
  usage?: string;
  specs?: { label: string; value: string }[];
  variantLabel?: string;
  variants?: Variant[];
  badges?: Badge[];
  note?: string;
};

export type Brand = {
  slug: BrandSlug;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  color: string;
  dark?: boolean;
  cover: string;
  logoText: string;
};

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  image: string;
  tint: string;
};

export const BRANDS: Brand[] = [
  {
    slug: "nouvelle",
    name: "Nouvelle",
    origin: "İtaliya",
    tagline: "new generation",
    description:
      "Made in Italy — İtaliyanın peşəkar saç boyası və baxım brendi. Aşağı ammonyaklı, C vitaminli və 121 rəng seçimi olan Hair Color boyaları, Kera Sublime keratin xətti, Curl Me Up buruq baxımı, Color Effective Blonde açıcı pudrası ilə salon nəticəsini evə gətirir.",
    color: "#D98C9A",
    cover: "/img/promo/nouvelle-hero.webp",
    logoText: "Nouvelle",
  },
  {
    slug: "redist",
    name: "Redist",
    origin: "Türkiyə",
    tagline: "professional hair care",
    description:
      "Biotin, keratin, arqan və sarımsaq tərkibli peşəkar saç baxım seriyaları. Tökülməyə qarşı, həcm verən və sarı tonları neytrallaşdıran formulalar — gündəlik istifadə üçün salon keyfiyyəti.",
    color: "#E27D60",
    cover: "/img/promo/redist-biotin-routine.webp",
    logoText: "Redist",
  },
  {
    slug: "redone",
    name: "RedOne",
    origin: "ABŞ lisenziyası",
    tagline: "men's care professional style",
    description:
      "Bərbərlərin ən çox seçdiyi wax brendi. Full Force Aqua wax-lar, Spider və Matte seriyası, after shave kremləri, təraş gelləri və barber odekolonları — güclü fiksasiya, asan yuyulma.",
    color: "#C8102E",
    dark: true,
    cover: "/img/poster/redone-01.webp",
    logoText: "RedOne",
  },
  {
    slug: "razorline",
    name: "Razorline",
    origin: "Japan Steel",
    tagline: "professional hair scissors",
    description:
      "Yaponiya poladından hazırlanmış peşəkar saç qayçıları. Paslanmaz polad, ergonomik dizayn, uzunmüddətli itilik. Kəsmə, seyrəltmə və solaxaylar üçün modellər.",
    color: "#B8935A",
    dark: true,
    cover: "/img/poster/razor-05.webp",
    logoText: "Razorline",
  },
  {
    slug: "naspura",
    name: "Naspura",
    origin: "Peşəkar xətt",
    tagline: "oxidant cream",
    description:
      "Protein və arqan yağı ilə zənginləşdirilmiş oksidant kremləri. Salonlar üçün sərfəli 5 litrlik qablaşdırma.",
    color: "#E58FB1",
    cover: "/img/p/naspura-20.webp",
    logoText: "Naspura",
  },
  {
    slug: "arteko",
    name: "Artéko",
    origin: "Peşəkar alətlər",
    tagline: "brushes & styling tools",
    description:
      "Keramik termo fırçalar, masaj daraqları və peşəkar saç ütüləri. Fen və ukladka üçün etibarlı alətlər.",
    color: "#A99A86",
    cover: "/img/p/brush-45.webp",
    logoText: "Artéko",
  },
];

export const CATEGORIES: Category[] = [
  {
    slug: "sac-boyasi",
    name: "Saç boyası və oksidant",
    short: "Boyalar, oksidantlar, açıcı pudra",
    image: "/img/promo/nouvelle-color-tulips.webp",
    tint: "#EAE3F7",
  },
  {
    slug: "sac-baximi",
    name: "Saç baxımı",
    short: "Keratin, buruq baxımı, maskalar",
    image: "/img/promo/nouvelle-kera-model.webp",
    tint: "#F6DCE0",
  },
  {
    slug: "styling",
    name: "Wax və stilinq",
    short: "Aqua, matte, spider wax, spreylər",
    image: "/img/poster/redone-17.webp",
    tint: "#F3D9D3",
  },
  {
    slug: "berber",
    name: "Bərbər və təraş",
    short: "Odekolon, after shave, təraş geli",
    image: "/img/poster/redone-21.webp",
    tint: "#E6DED6",
  },
  {
    slug: "aletler",
    name: "Peşəkar alətlər",
    short: "Qayçılar, ülgüc, ütü, fırçalar",
    image: "/img/poster/razor-02.webp",
    tint: "#E4E1DD",
  },
];

/** Yüksək keyfiyyətli kəsim varsa onu, yoxdursa PDF-dən çıxarılan şəkli qaytarır. */
const HQ = new Set([
  "ak139", "ak23l", "cak015", "cak015s", "cak015tx", "cak021", "cak021te", "cak043", "cck006",
  "curl-mask", "curl-shampoo", "curl-spray", "kera-cream", "kera-mask", "kera-oil", "kera-shampoo",
  "spider-blue", "spider-red", "wax-argan", "wax-blue", "wax-cobra", "wax-fiber", "wax-green",
  "wax-keratin", "wax-olive", "wax-orange", "wax-quiksilver", "wax-red", "wax-violetta",
]);
export const img = (name: string) => (HQ.has(name) ? `/img/hq/${name}.webp` : `/img/p/${name}.webp`);

const KERA_FREE = ["Formaldehid", "Paraben", "Mineral yağ", "Parafin"];

const waxBase = {
  brand: "redone" as const,
  category: "styling" as const,
  volume: "150 ml",
  price: 6,
  discount: 20,
  usage:
    "Az miqdarda wax-ı barmaqların arasında isidin, quru və ya azca nəm saça tətbiq edin və istədiyiniz formanı verin. Su ilə asanlıqla yuyulur.",
};

const WAX = (
  slug: string,
  name: string,
  code: string,
  tint: string,
  short: string,
  extra: Partial<Product> = {},
): Product => ({
  ...waxBase,
  slug,
  name,
  code,
  image: img(slug.replace("redone-", "")),
  tint,
  short,
  description: `${name} — RedOne Full Force seriyasından maksimum nəzarət təmin edən wax. Saça gün boyu davamlı forma verir, ağırlaşdırmır və iz qoymur. Bərbərlər üçün ideal, gündəlik istifadə üçün rahat.`,
  features: ["Güclü fiksasiya", "Uzunmüddətli forma", "Asan tətbiq və yuyulma", "Maximum control formula"],
  specs: [
    { label: "Kod", value: code },
    { label: "Həcm", value: "150 ml" },
    { label: "Fiksasiya", value: "Maksimum" },
  ],
  ...extra,
});

export const PRODUCTS: Product[] = [
  /* ───────────────────────── NOUVELLE ───────────────────────── */
  {
    slug: "nouvelle-kera-sublime-hero-cream",
    name: "Kera Sublime Smoothing Hero Cream",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "1000 ml",
    price: 180,
    discount: 15,
    image: img("kera-cream"),
    gallery: ["/img/promo/nouvelle-kera-poster.webp", "/img/promo/kera-cream-card.webp", "/img/promo/nouvelle-kera-texture.webp"],
    tint: "#F6DCE0",
    short: "Keratin əsaslı yarımpermanent düzləşdirici krem",
    description:
      "İpək kimi saçların sirri. Keratin əsaslı yarımpermanent düzləşdirici krem saçlarınızı hamar, parlaq və asan idarə olunan edir. Saçdakı qabarmışlığı və elektriklənməni azaldır, nəticə bir neçə yuyulmadan sonra da qorunur. Peşəkar salon proseduru üçün nəzərdə tutulub.",
    features: [
      "Saçdakı qabarmışlığı və elektriklənməni azaldır",
      "Saçı daha hamar və intizamlı edir",
      "İpək kimi yumşaq və parlaq görünüş yaradır",
      "Yarımpermanent düzləşdirmə effekti — saçlara 50%-ə qədər düzləşmə",
      "Müxtəlif saç tipləri üçün uyğundur",
    ],
    usage:
      "Saçı dərin təmizləyici şampunla yuyun və 80% qurudun. Kremi tellərə bərabər paylayın, 20–30 dəqiqə saxlayın, fenlə qurudub ütü ilə 8–10 dəfə keçin. Peşəkar istifadə üçündür.",
    specs: [
      { label: "Həcm", value: "1000 ml (Professional size)" },
      { label: "Aktiv komponentlər", value: "Hidroliz olunmuş keratin, Amino Sublime Complex, üzüm çəyirdəyi yağı, qlikolik turşu" },
      { label: "Tərkibində yoxdur", value: KERA_FREE.join(", ") },
    ],
    badges: ["hit"],
  },
  {
    slug: "nouvelle-kera-sublime-shampoo",
    name: "Kera Sublime Straightening Care Shampoo",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "300 ml",
    price: 15,
    image: img("kera-shampoo"),
    gallery: ["/img/promo/kera-shampoo-card.webp", "/img/promo/kera-shampoo-real.webp"],
    tint: "#F6DCE0",
    short: "Keratinli saçlar üçün şampun",
    description:
      "Keratin prosedurundan sonra nəticəni qorumaq üçün xüsusi şampun. Saçı dərin nəmləndirir və qidalandırır, keratinlə saç liflərini bərpa edib gücləndirir.",
    features: [
      "Saçı dərin nəmləndirir və qidalandırır",
      "Keratin ilə saç liflərini bərpa edir",
      "Saçı yumşaldır, hamar görünüş qazandırır",
      "Bütün saç tipləri üçün uyğundur",
    ],
    usage: "Nəm saça tətbiq edin, köpükləndirin və yaxalayın. Ən yaxşı nəticə üçün Kera Sublime maskası ilə birlikdə istifadə edin.",
    specs: [{ label: "Həcm", value: "300 ml" }],
  },
  {
    slug: "nouvelle-kera-sublime-mask",
    name: "Kera Sublime Straightening Care Mask",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "300 ml",
    price: 16,
    image: img("kera-mask"),
    gallery: ["/img/promo/kera-mask-card.webp", "/img/promo/kera-mask-real.webp"],
    tint: "#F6DCE0",
    short: "Keratinli saçlar üçün baxım maskası",
    description:
      "Saça dərin qulluq edən və qidalandıran keratinli maska. Saçı yumşaldır, hamarlaşdırır və parıltı bəxş edir.",
    features: [
      "Saça dərin qulluq edir və qidalandırır",
      "Keratin ilə saçı bərpa edir və gücləndirir",
      "Saçı yumşaldır, hamarlaşdırır və parıltı verir",
      "Bütün saç tipləri üçün uyğundur",
    ],
    usage: "Şampundan sonra nəm saça tətbiq edin, 3–5 dəqiqə saxlayıb yaxalayın.",
    specs: [{ label: "Həcm", value: "300 ml" }],
  },
  {
    slug: "nouvelle-kera-sublime-oil",
    name: "Kera Sublime Perfection Care Oil",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "100 ml",
    price: 23,
    discount: 10,
    image: img("kera-oil"),
    gallery: ["/img/promo/kera-oil-card.webp", "/img/promo/kera-oil-real.webp"],
    tint: "#F6DCE0",
    short: "Keratinli saçlar üçün baxım yağı",
    description:
      "Saçlara parlaqlıq və canlılıq verən yüngül baxım yağı. Elektriklənməni və qabarmanı azaldır, saçı ağırlaşdırmır.",
    features: [
      "Saçlara parlaqlıq və canlılıq verir",
      "Saçı nəmləndirir və yumşaldır",
      "Elektriklənməni və qabarmanı azaldır",
      "Bütün saç tipləri üçün uyğundur",
    ],
    usage: "Bir neçə damcını ovucunuzda paylayın və saçın uclarına tətbiq edin. Yaxalamayın.",
    specs: [{ label: "Həcm", value: "100 ml" }],
  },
  {
    slug: "nouvelle-kera-sublime-set",
    name: "Kera Sublime Baxım Dəsti",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "Şampun + Maska + Yağ",
    price: 54,
    discount: 15,
    image: "/img/promo/nouvelle-kera-repair.webp",
    gallery: [img("kera-shampoo"), img("kera-mask"), img("kera-oil")],
    cover: true,
    tint: "#F6DCE0",
    short: "Şampun 300 ml + Maska 300 ml + Yağ 100 ml",
    description:
      "Kera Sublime xəttinin üç əsas məhsulu bir dəstdə: keratin şampunu, baxım maskası və perfection yağı. Keratin prosedurunun nəticəsini uzadır, saçı daxildən bərpa edir.",
    features: ["Daxili boşluqları bərpa edir", "Lifləri hizalayır", "Saçı gücləndirir", "Dəst halında 15% sərfəli"],
    specs: [{ label: "Tərkib", value: "Şampun 300 ml, Maska 300 ml, Yağ 100 ml" }],
    badges: ["dest"],
  },
  {
    slug: "nouvelle-curl-me-up-shampoo",
    name: "Curl Me Up Curl Evolve Shampoo",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "250 ml",
    price: 14,
    image: img("curl-shampoo"),
    gallery: ["/img/promo/curl-shampoo-card.webp", "/img/promo/curl-info.webp"],
    tint: "#F1E4E1",
    short: "Buruq saçlar üçün şampun",
    description:
      "Buruq və dalğalı saçlar üçün nəmləndirici və qidalandırıcı şampun. Buruqları elektriklənmədən qoruyur, onları daha formalı və elastik edir.",
    features: ["Saçları dərin nəmləndirir", "Buruqları dəranır və formalaşdırır", "Meyvə və çiçək tərkibli vegan formula", "Asan daranmanı təmin edir"],
    usage: "Nəm saça tətbiq edin, yüngülcə masaj edib yaxalayın. Curl Me Up maskası ilə tamamlayın.",
    specs: [{ label: "Həcm", value: "250 ml" }],
    badges: ["hit"],
  },
  {
    slug: "nouvelle-curl-me-up-mask",
    name: "Curl Me Up Curl Evolve Mask",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "300 ml",
    price: 16,
    image: img("curl-mask"),
    gallery: ["/img/promo/curl-mask-card.webp", "/img/promo/curl-info.webp"],
    tint: "#F1E4E1",
    short: "Buruq saçlar üçün maska",
    description:
      "Buruqları qidalandıran və nəmləndirən intensiv maska. Saçın quruluğunun qarşısını alır, buruqlara yumşaqlıq və parlaqlıq verir.",
    features: ["Buruqları qidalandırır", "Quruluğun qarşısını alır", "Elektriklənməni azaldır", "Vegan formula"],
    usage: "Şampundan sonra tellərə paylayın, 5 dəqiqə saxlayın və yaxalayın.",
    specs: [{ label: "Həcm", value: "300 ml" }],
  },
  {
    slug: "nouvelle-curl-me-up-spray",
    name: "Curl Me Up Curl Emphasizer Spray",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "150 ml",
    price: 18,
    discount: 10,
    image: img("curl-spray"),
    gallery: ["/img/promo/curl-spray-card.webp", "/img/promo/nouvelle-curl-bestsellers.webp"],
    tint: "#F1E4E1",
    short: "Buruqları canlandıran sprey",
    description:
      "Buruqları canlandıran, nəmləndirən və formasını qoruyan yaxalanmayan sprey. Gün boyu elastik və təbii görünüşlü buruqlar.",
    features: ["Buruqları canlandırır", "Elastiklik və yumşaqlıq verir", "Yaxalanmır", "Bütün buruq tipləri üçün"],
    usage: "Nəm və ya quru saça 20–30 sm məsafədən səpin, barmaqlarla buruqları formalaşdırın.",
    specs: [{ label: "Həcm", value: "150 ml" }],
  },
  {
    slug: "nouvelle-curl-me-up-set",
    name: "Curl Me Up Total Curl Care Dəsti",
    brand: "nouvelle",
    category: "sac-baximi",
    volume: "Şampun + Maska + Sprey",
    price: 48,
    discount: 15,
    image: "/img/promo/curl-info.webp",
    gallery: [img("curl-shampoo"), img("curl-mask"), img("curl-spray")],
    cover: true,
    tint: "#F1E4E1",
    short: "Buruq saçlar üçün 3 məhsuldan ibarət xətt",
    description:
      "3 məhsuldan ibarət Curl Me Up xətti buruq saçların müalicəsi və gündəlik baxımı üçün xüsusi olaraq hazırlanmışdır: nəmləndirir, buruqları dəranır, saçları zərərli təsirlərdən qoruyur.",
    features: ["Nəmləndirir", "Buruqları dəranır", "Təbii formula", "Qoruyur və asan daranmanı təmin edir"],
    specs: [{ label: "Tərkib", value: "Şampun 250 ml, Maska 300 ml, Sprey 150 ml" }],
    badges: ["dest"],
  },
  {
    slug: "nouvelle-color-effective-blonde",
    name: "Color Effective Blonde açıcı pudra",
    brand: "nouvelle",
    category: "sac-boyasi",
    volume: "500 q",
    price: 25,
    image: "/img/p/blonde-powder.webp",
    gallery: ["/img/promo/nouvelle-blonde-info.webp", "/img/promo/nouvelle-blonde.webp", "/img/promo/nouvelle-blonde-stone.webp"],
    tint: "#EAE3F7",
    short: "Root-ready mavi açıcı pudra — 9 tona qədər",
    description:
      "Baxımlı açma gücü. Qulluqla zənginləşdirilmiş peşəkar toz açıcı saçı zədələmədən 9 tona qədər açır. Xüsusi tərkibi ilə saç dibinə tətbiq üçün uyğundur, mavi tonlama texnologiyası sarı tonları neytrallaşdırır.",
    features: ["Saçı zədələmədən 9 tona qədər açma", "Saç dibinə tətbiq üçün uyğun", "Saçın qurumasının qarşısını alır", "Mavi tonlama texnologiyası"],
    usage: "İstifadə rasionu (paket üzrə): 1 hissə açıcı pudra : 8 hissə oksidant. Qarışığı hazırlayıb dərhal tətbiq edin.",
    specs: [
      { label: "Çəki", value: "500 q" },
      { label: "Açma gücü", value: "9 tona qədər" },
      { label: "Rəng", value: "Mavi (anti-sarı)" },
    ],
    badges: ["yeni"],
  },
  {
    slug: "nouvelle-hair-color",
    name: "Nouvelle Hair Color saç boyası",
    brand: "nouvelle",
    category: "sac-boyasi",
    volume: "100 ml",
    price: 5.5,
    image: "/img/p/nouvelle-color.webp",
    gallery: ["/img/promo/nouvelle-color-new.webp", "/img/promo/nouvelle-color-tulips.webp", "/img/promo/nouvelle-hero.webp"],
    tint: "#E3ECF7",
    short: "Made in Italy — 121 rəng, aşağı ammonyak",
    description:
      "İtaliyada istehsal olunan peşəkar krem-boya. Aşağı ammonyak tərkibi, bitki ekstraktları və qoruyucu maddələr saçı boyama zamanı qoruyur, tərkibindəki C vitamini isə rəngin parlaqlığını uzun müddət saxlayır. 121 rəng seçimi ilə istənilən tonu əldə etmək mümkündür, ağ saçları tam örtür.",
    features: [
      "Aşağı ammonyak tərkibi",
      "Bitki ekstraktları və qoruyucu maddələr",
      "Tərkibində C vitamini var",
      "121 rəng seçimi",
      "Uzunmüddətli və parlaq nəticə",
      "Nouvelle oksidantı ilə 1:1 qarışdırılır",
    ],
    usage: "1 hissə boya : 1 hissə Nouvelle oksidant. Quru saça tətbiq edin, 30–35 dəqiqə saxlayın.",
    specs: [
      { label: "Həcm", value: "100 ml" },
      { label: "Qarışdırma", value: "1:1" },
      { label: "Rəng palitrası", value: "121 ton" },
      { label: "İstehsal", value: "İtaliya" },
    ],
    variantLabel: "Ton",
    variants: [
      { id: "1-0", label: "1.0 Qara", swatch: "#141012" },
      { id: "3-0", label: "3.0 Tünd şabalıdı", swatch: "#2E1E18" },
      { id: "4-0", label: "4.0 Şabalıdı", swatch: "#4A2F23" },
      { id: "5-0", label: "5.0 Açıq şabalıdı", swatch: "#6A4532" },
      { id: "6-0", label: "6.0 Tünd sarışın", swatch: "#8A6246" },
      { id: "7-0", label: "7.0 Sarışın", swatch: "#A9805C" },
      { id: "8-0", label: "8.0 Açıq sarışın", swatch: "#C7A27A" },
      { id: "9-0", label: "9.0 Çox açıq sarışın", swatch: "#DCC09A" },
      { id: "10-0", label: "10.0 Platin sarışın", swatch: "#EBDCC0" },
      { id: "6-66", label: "6.66 İntensiv qırmızı", swatch: "#8E1E2B" },
      { id: "7-44", label: "7.44 Mis", swatch: "#B2582A" },
      { id: "5-5", label: "5.5 Mahun", swatch: "#6B2A2A" },
    ],
    badges: ["hit"],
    note: "12 ədəd boya alana 1 oksidant hədiyyə",
  },
  {
    slug: "nouvelle-oxidant",
    name: "Nouvelle Color Effective Developer",
    brand: "nouvelle",
    category: "sac-boyasi",
    volume: "100 ml",
    price: 0.5,
    image: "/img/p/nouvelle-oxidant.webp",
    tint: "#E3ECF7",
    short: "Krem oksidant — boya ilə 1:1",
    description: "Nouvelle Hair Color boyaları üçün stabilləşdirilmiş krem oksidant. Bərabər rəng açılması və saçın qorunması.",
    features: ["Krem tekstura — axmır", "Bərabər rəng nəticəsi", "Boya ilə 1:1 qarışdırılır"],
    specs: [{ label: "Həcm", value: "100 ml" }],
    variantLabel: "Faiz",
    variants: [
      { id: "3", label: "3% · 10 vol" },
      { id: "6", label: "6% · 20 vol" },
      { id: "9", label: "9% · 30 vol" },
      { id: "12", label: "12% · 40 vol" },
    ],
  },

  /* ───────────────────────── NASPURA ───────────────────────── */
  {
    slug: "naspura-oxidant-cream-5000",
    name: "Naspura Oxidant Cream",
    brand: "naspura",
    category: "sac-boyasi",
    volume: "5000 ml",
    price: 18,
    image: "/img/p/naspura-20.webp",
    tint: "#F9E1EA",
    short: "Protein və arqan yağı ilə oksidant krem, 5 L",
    description:
      "Protein və arqan yağı ilə zənginləşdirilmiş oksidant krem. Salonlar üçün sərfəli 5 litrlik kanistr. Boyalama və açma prosedurlarında saçı qoruyur.",
    features: ["Protein və arqan yağı", "Salonlar üçün 5 L həcm", "Stabil krem tekstura"],
    specs: [{ label: "Həcm", value: "5000 ml" }],
    variantLabel: "Faiz",
    variants: [
      { id: "10", label: "10 vol · 3%", image: "/img/p/naspura-10.webp" },
      { id: "20", label: "20 vol · 6%", image: "/img/p/naspura-20.webp" },
      { id: "30", label: "30 vol · 9%", image: "/img/p/naspura-30.webp" },
      { id: "40", label: "40 vol · 12%", image: "/img/p/naspura-40.webp" },
    ],
  },

  /* ───────────────────────── REDIST ───────────────────────── */
  {
    slug: "redist-biotin-set",
    name: "Redist Biotin Saç Baxım Dəsti",
    brand: "redist",
    category: "sac-baximi",
    volume: "Şampun + Maska + Kondisioner",
    price: 45,
    discount: 15,
    image: "/img/promo/redist-biotin-routine.webp",
    gallery: ["/img/promo/redist-biotin-set.webp"],
    cover: true,
    tint: "#F7DDE0",
    short: "3 addımlı biotin rutini — sulfatsız, duzsuz",
    description:
      "Sağlam, güclü və parlaq saçlar üçün 3 addımlı biotin rutini. Həcmsiz və elektriklənən saçlar üçün sulfatsız və duzsuz formula: təmizləyir, bərpa edir, nəmləndirir və parıldadır.",
    features: ["1. Biotinli həcm verən şampun", "2. Biotinli həcm verən saç maskası", "3. Biotinli saç kondisioneri", "Sulfatsız və duzsuz"],
    specs: [{ label: "Tərkib", value: "Şampun, maska, sprey kondisioner" }],
    badges: ["dest", "hit"],
  },
  {
    slug: "redist-charming-silver-shampoo",
    name: "Redist Charming Silver Shampoo",
    brand: "redist",
    category: "sac-baximi",
    volume: "1000 ml",
    price: 19,
    discount: 10,
    image: "/img/promo/redist-silver.webp",
    cover: true,
    tint: "#FBE6D4",
    short: "Blond və ağ saçlar üçün anti-sarı şampun",
    description:
      "Blond, ağ və rənglənmiş saçlarda sarı tonları neytrallaşdıran bənövşəyi şampun. İstifadəçilərin 95%-i blond saçların daha parlaq göründüyünü qeyd edib.",
    features: ["95% — blond saçlar daha parlaq", "91% — sarımtıl tonlarda azalma", "87% — saçlar daha hamar və parlaq", "Peşəkar 1 L həcm"],
    usage: "Nəm saça tətbiq edin, 2–5 dəqiqə saxlayıb yaxalayın. Həftədə 1–2 dəfə.",
    specs: [{ label: "Həcm", value: "1000 ml" }],
  },
  {
    slug: "redist-garlic-hair-mask",
    name: "Redist Garlic Hair Care Mask",
    brand: "redist",
    category: "sac-baximi",
    volume: "500 ml",
    price: 15,
    image: "/img/promo/redist-garlic.webp",
    cover: true,
    tint: "#F5ECE3",
    short: "Saç tökülməsinə qarşı sarımsaqlı maska",
    description: "Saç tökülməsi ilə vidalaşmağın vaxtıdır! Redist sarımsaqlı maska saç köklərini gücləndirir və saça parlaqlığı geri qaytarır.",
    features: ["Saç tökülməsini azaldır", "Saç köklərini gücləndirir", "Parlaqlığı geri qaytarır", "Qoxusuz formula"],
    specs: [{ label: "Həcm", value: "500 ml" }],
  },
  {
    slug: "redist-keratin-complex-duo",
    name: "Redist Keratin Complex Dueti",
    brand: "redist",
    category: "sac-baximi",
    volume: "Şampun + Maska",
    price: 32,
    discount: 15,
    image: "/img/promo/redist-keratin-duo.webp",
    cover: true,
    tint: "#EEF4C9",
    short: "Xəyal komandası dueti — keratin şampun və maska",
    description: "Saçınız üçün mükəmməl harmoniya! Keratin kompleksli şampun və maska saçı dərindən qidalandırır, bərpa edir və parlaq, canlı görünüş verir.",
    features: ["Saçı qidalandırır və bərpa edir", "Parlaq və canlı görünüş", "Keratin kompleksi ilə dərin qulluq"],
    specs: [{ label: "Tərkib", value: "Şampun + saç maskası" }],
    badges: ["dest"],
  },
  {
    slug: "redist-12in1-expert-mask",
    name: "Redist 12 in 1 Expert Mask",
    brand: "redist",
    category: "sac-baximi",
    volume: "500 ml",
    price: 16,
    image: "/img/promo/redist-mask-before-after.webp",
    cover: true,
    tint: "#FBE3CF",
    short: "Haçalanmış uclar üçün 12 təsirli maska",
    description: "Haçalanmış saçlardan əziyyət çəkirsiniz? Bu məhsul hər şeyi dəyişəcək! 12 təsirli formula saçı daha parlaq, daha möhkəm edir və dərindən qidalandırır.",
    features: ["Daha parlaq saçlar", "Daha möhkəm saçlar", "Dərin qidalanma", "Peşəkar qayğı"],
    specs: [{ label: "Həcm", value: "500 ml" }],
    badges: ["hit"],
  },
  {
    slug: "redist-expert-hair-care-shampoo",
    name: "Redist Expert Hair Care Shampoo",
    brand: "redist",
    category: "sac-baximi",
    volume: "1000 ml",
    price: 17,
    image: "/img/promo/redist-expert.webp",
    cover: true,
    tint: "#EADBC8",
    short: "Daha güclü, daha sağlam, daha parlaq",
    description: "Saçlarınıza peşəkar qulluq. Gündəlik istifadə üçün qidalandırıcı şampun saçı yumşaq təmizləyir və güc verir.",
    features: ["Yumşaq təmizləmə", "Saçı gücləndirir", "Parlaqlıq verir"],
    specs: [{ label: "Həcm", value: "1000 ml" }],
  },
  {
    slug: "redist-argan-duo",
    name: "Redist Argan Şampun + Kondisioner",
    brand: "redist",
    category: "sac-baximi",
    volume: "1000 ml + 400 ml",
    price: 30,
    discount: 10,
    image: "/img/promo/redist-argan.webp",
    cover: true,
    tint: "#F6E1CF",
    short: "Arqan yağlı nəmləndirici duet",
    description: "Arqan yağı ilə zənginləşdirilmiş şampun və sprey kondisioner. Quru və yorğun saçlara yumşaqlıq və ipək kimi parıltı.",
    features: ["Arqan yağı ilə nəmləndirmə", "Asan daranma", "İpək kimi parıltı"],
    specs: [{ label: "Tərkib", value: "Şampun 1000 ml + Kondisioner 400 ml" }],
    badges: ["dest"],
  },
  {
    slug: "redist-full-force-hair-spray",
    name: "Redist Full Force Hair Spray",
    brand: "redist",
    category: "styling",
    volume: "400 ml",
    price: 9,
    image: "/img/promo/redist-hairspray.webp",
    cover: true,
    tint: "#F3E2C9",
    short: "Heç bir sirr yox, sadəcə mükəmməl saçlar",
    description: "Güclü və uzunmüddətli fiksasiya verən saç spreyi. Forma və həcmi bütün gün qoruyur, saça təbii və elastik görünüş verir.",
    features: ["Uzunmüddətli fiksasiya", "Təbii və elastik görünüş", "Forma və həcmi bütün gün qoruyur"],
    specs: [{ label: "Həcm", value: "400 ml" }],
  },
  {
    slug: "redist-make-up-fixing-spray",
    name: "Redist Make Up Fixing Spray",
    brand: "redist",
    category: "styling",
    volume: "300 ml",
    price: 12,
    discount: 10,
    image: "/img/promo/redist-makeup-fix.webp",
    cover: true,
    tint: "#F7DCE7",
    short: "Peşəkar makiyaj fiksatoru",
    description: "Makiyajı gün boyu təzə saxlayan peşəkar fiksator. Yüngül duman, yapışqanlıq hissi vermir.",
    features: ["Makiyajı saatlarla qoruyur", "Yüngül incə dumanlı sprey", "Bütün dəri tipləri üçün"],
    specs: [{ label: "Həcm", value: "300 ml" }],
    badges: ["yeni"],
  },

  /* ───────────────────────── REDONE — WAX ───────────────────────── */
  WAX("redone-wax-red", "RedOne Red Aqua Hair Wax", "00743", "#F7D6D6", "Full Force — bold style everyday", { badges: ["hit"] }),
  WAX("redone-wax-blue", "RedOne Blue Aqua Hair Wax", "00742", "#D9E0F5", "Full Force — strong style everyday", { badges: ["hit"] }),
  WAX("redone-wax-quiksilver", "RedOne Quiksilver Aqua Hair Wax", "00726", "#E2E2E4", "Full Force — strong style everyday"),
  WAX("redone-wax-black", "RedOne Black Aqua Hair Gel Wax", "01624", "#DCDCDE", "Full Force — gel wax"),
  WAX("redone-wax-orange", "RedOne Orange Aqua Hair Gel Wax", "02419", "#FAE0CF", "Full Force — fresh style everyday"),
  WAX("redone-wax-violetta", "RedOne Violetta Aqua Hair Gel Wax", "01625", "#E6DDF4", "Full Force — creative style everyday"),
  WAX("redone-wax-white", "RedOne Bright White Aqua Hair Wax", "01614", "#EEEEEE", "Full Force — clean style everyday"),
  WAX("redone-wax-cobra", "RedOne Cobra Aqua Hair Wax", "02328", "#F5D3D3", "Full Force — maximum control"),
  WAX("redone-wax-olive", "RedOne Olive Aqua Hair Wax", "02327", "#D6E8DA", "Full Force — natural look, strong style"),
  WAX("redone-wax-green", "RedOne Green Matte Hair Wax", "00725", "#E1EFCF", "Matte — mat görünüş, güclü fiksasiya", { price: 6.5 }),
  WAX("redone-wax-argan", "RedOne Argan Matte Hair Wax", "01855", "#F4DFCD", "Matte — natural look, strong style"),
  WAX("redone-wax-keratin", "RedOne Keratin Matte Hair Wax", "01854", "#F1ECD9", "Matte — natural look, strong style"),
  WAX("redone-wax-fiber", "RedOne Creative Fiber Wax", "01663", "#D2F1EE", "Strong & matte — yaradıcı tərzlər üçün", {
    price: 9,
    features: ["Güclü fiksasiya", "Yaradıcı tərzlər üçün", "Mat effekt və təbii görünüş", "Lifli tekstura"],
    badges: ["yeni"],
  }),
  {
    slug: "redone-spider-hair-wax",
    name: "RedOne Spider Hair Wax",
    brand: "redone",
    category: "styling",
    volume: "100 ml",
    price: 8.5,
    discount: 20,
    image: img("spider-red"),
    gallery: ["/img/poster/redone-24.webp", "/img/poster/redone-23.webp", "/img/poster/redone-26.webp", "/img/promo/redone-spider-night.webp"],
    tint: "#F3D2D5",
    short: "Hörümçək toru teksturası — maximum control",
    description: "Spider wax-ın lifli, hörümçək toru kimi uzanan teksturası saça güclü və elastik fiksasiya verir. Gün boyu nəzarət, parlaq və ya canlı görünüş.",
    features: ["Güclü fiksasiya", "Uzunmüddətli nəzarət", "Parlaq görünüş", "Lifli spider tekstura"],
    variantLabel: "Seriya",
    variants: [
      { id: "passionate", label: "Passionate (qırmızı)", image: img("spider-red"), swatch: "#C8102E" },
      { id: "show-off", label: "Show-Off (mavi)", image: img("spider-blue"), swatch: "#1E8FD0" },
    ],
    specs: [{ label: "Fiksasiya", value: "Maksimum" }],
    badges: ["hit"],
  },
  {
    slug: "redone-matte-hair-wax",
    name: "RedOne Matte Hair Wax",
    brand: "redone",
    category: "styling",
    volume: "100 ml",
    price: 8.5,
    discount: 20,
    image: "/img/poster/redone-27.webp",
    gallery: ["/img/poster/redone-28.webp", "/img/promo/redone-spider-night.webp"],
    cover: true,
    tint: "#E7E7E7",
    short: "Matte look — your style, our control",
    description: "Mat görünüşlü, güclü saxlayıcı wax. Parıltısız, təbii tekstura və gün boyu davamlı forma.",
    features: ["Güclü fiksasiya", "Uzunmüddətli nəzarət", "Mat görünüş"],
    variantLabel: "Rəng",
    variants: [
      { id: "white", label: "White", image: "/img/poster/redone-27.webp", swatch: "#F2F2F2" },
      { id: "black", label: "Black", image: "/img/poster/redone-28.webp", swatch: "#151515" },
    ],
  },

  /* ───────────────────────── REDONE — BƏRBƏR ───────────────────────── */
  {
    slug: "redone-after-shave-cream-cologne",
    name: "RedOne After Shave Cream Cologne",
    brand: "redone",
    category: "berber",
    volume: "400 ml",
    price: 9,
    discount: 20,
    image: "/img/p/as-gold.webp",
    tint: "#EFE6D2",
    short: "Təraşdan sonra krem-odekolon",
    description: "Təraşdan sonra dərini sakitləşdirən, nəmləndirən və uzun müddət təravətli ətir bəxş edən krem-odekolon. Bərbərxanalar üçün dozatorlu 400 ml.",
    features: ["Dərini sakitləşdirir", "Qıcıqlanmanı azaldır", "Uzunmüddətli ətir", "Dozatorlu qablaşdırma"],
    specs: [{ label: "Həcm", value: "400 ml" }],
    variantLabel: "Ətir",
    variants: [
      { id: "gold", label: "Gold", code: "01697", image: "/img/p/as-gold.webp", swatch: "#C9A54C" },
      { id: "silver", label: "Silver", code: "01696", image: "/img/p/as-silver.webp", swatch: "#A9ADB3" },
      { id: "revitalizing", label: "Revitalizing", code: "01698", image: "/img/p/as-revitalizing.webp", swatch: "#F26A1B" },
      { id: "sport", label: "Sport", code: "00760", image: "/img/p/as-sport.webp", swatch: "#1D3FBF" },
      { id: "extreme", label: "Extreme", code: "00761", image: "/img/p/as-extreme.webp", swatch: "#D3161F" },
      { id: "fresh", label: "Fresh", code: "00759", image: "/img/p/as-fresh.webp", swatch: "#18A33A" },
    ],
    badges: ["hit"],
  },
  {
    slug: "redone-shaving-gel",
    name: "RedOne Shaving Gel",
    brand: "redone",
    category: "berber",
    volume: "1000 ml",
    price: 9,
    discount: 20,
    image: "/img/p/gel-gold.webp",
    tint: "#E9E4D8",
    short: "Şəffaf təraş geli — dəqiq kontur",
    description: "Şəffaf formulası sayəsində kontur və saqqal xəttini dəqiq görməyə imkan verən təraş geli. Dərini nəmləndirir, ülgücün rahat sürüşməsini təmin edir.",
    features: ["Şəffaf — dəqiq kontur", "Nəmləndirici effekt", "Rahat sürüşmə", "1 L peşəkar həcm"],
    specs: [{ label: "Həcm", value: "1000 ml" }],
    variantLabel: "Növ",
    variants: [
      { id: "gold", label: "Gold", code: "02362", image: "/img/p/gel-gold.webp", swatch: "#C9A54C" },
      { id: "silver", label: "Silver", code: "02363", image: "/img/p/gel-silver.webp", swatch: "#A9ADB3" },
      { id: "fruits", label: "Forest Fruits", code: "01687", image: "/img/p/gel-fruits.webp", swatch: "#8B1D3F" },
    ],
  },
  {
    slug: "redone-natural-cologne-150",
    name: "RedOne Natural Cologne Sprey",
    brand: "redone",
    category: "berber",
    volume: "150 ml",
    price: 5,
    discount: 20,
    image: "/img/p/c150-lemon.webp",
    tint: "#EDF0D2",
    short: "Barber odekolon — 8 ətir",
    description: "Təraşdan sonra dərini təravətləndirən və dezinfeksiya edən klassik barber odekolonu. Yığcam 150 ml sprey.",
    features: ["Təravətləndirir", "Dezinfeksiya effekti", "Kompakt sprey", "8 müxtəlif ətir"],
    specs: [{ label: "Həcm", value: "150 ml" }],
    variantLabel: "Ətir",
    variants: [
      { id: "lemon", label: "Lemon", code: "00729", image: "/img/p/c150-lemon.webp", swatch: "#E3DC2A" },
      { id: "thunderbold", label: "Thunderbold", code: "00131", image: "/img/p/c150-thunderbold.webp", swatch: "#9C7BC9" },
      { id: "old-marine", label: "Old Marine", code: "00130", image: "/img/p/c150-oldmarine.webp", swatch: "#36A8C9" },
      { id: "amber", label: "Amber", code: "02448", image: "/img/p/c150-amber.webp", swatch: "#6B3A1E" },
      { id: "silver", label: "Silver", code: "02447", image: "/img/p/c150-silver.webp", swatch: "#C9CCD1" },
      { id: "gold", label: "Gold", code: "02446", image: "/img/p/c150-gold.webp", swatch: "#D8C27A" },
      { id: "volcanic", label: "Volcanic", code: "02444", image: "/img/p/c150-volcanic.webp", swatch: "#E3780F" },
      { id: "undulation", label: "Undulation", code: "02445", image: "/img/p/c150-undulation.webp", swatch: "#4D8FDB" },
    ],
  },
  {
    slug: "redone-barber-cologne-400",
    name: "RedOne Barber Cologne",
    brand: "redone",
    category: "berber",
    volume: "400 ml",
    price: 7,
    discount: 20,
    image: "/img/p/c400-volcanic.webp",
    tint: "#F5E3CF",
    short: "Böyük həcmli barber odekolon — 6 ətir",
    description: "Bərbərxanalar üçün böyük həcmli odekolon. Təraşdan sonra təravət və uzunmüddətli xoş ətir.",
    features: ["Böyük 400 ml həcm", "Sprey başlıq", "Uzunmüddətli ətir"],
    specs: [{ label: "Həcm", value: "400 ml" }],
    variantLabel: "Ətir",
    variants: [
      { id: "volcanic", label: "Volcanic", code: "02567", image: "/img/p/c400-volcanic.webp", swatch: "#E3780F" },
      { id: "undulation", label: "Undulation Purple", code: "02566", image: "/img/p/c400-undulation.webp", swatch: "#2C55C9" },
      { id: "citrus", label: "Citrus", code: "01612", image: "/img/p/c400-citrus.webp", swatch: "#F2C14E" },
      { id: "lemon", label: "Lemon", code: "01610", image: "/img/p/c400-lemon.webp", swatch: "#E3DC2A" },
      { id: "caribbean", label: "Caribbean", code: "01611", image: "/img/p/c400-caribbean.webp", swatch: "#36B3D9" },
      { id: "tabacco", label: "Tabacco", code: "01613", image: "/img/p/c400-tabacco.webp", swatch: "#C98A1B" },
    ],
  },
  {
    slug: "redone-cologne-body-splash",
    name: "RedOne Cologne Body Splash",
    brand: "redone",
    category: "berber",
    volume: "400 ml",
    price: 7,
    discount: 20,
    image: "/img/p/bs-gold.webp",
    tint: "#F3EAD0",
    short: "Bədən üçün odekolon sprey",
    description: "Bədən və saç üçün yüngül, təravətli body splash. Gün boyu xoş ətir.",
    features: ["Yüngül ətir", "Bədən və saç üçün", "400 ml sprey"],
    specs: [{ label: "Həcm", value: "400 ml" }],
    variantLabel: "Ətir",
    variants: [
      { id: "gold", label: "Gold", code: "02409", image: "/img/p/bs-gold.webp", swatch: "#E5C24A" },
      { id: "silver", label: "Silver", code: "02410", image: "/img/p/bs-silver.webp", swatch: "#9A97B5" },
      { id: "amber", label: "Amber", code: "02411", image: "/img/p/bs-amber.webp", swatch: "#C6662A" },
    ],
  },
  {
    slug: "redone-neck-strip",
    name: "RedOne Boyun Bandı (Neck Strip)",
    brand: "redone",
    category: "berber",
    code: "01632",
    price: 8,
    discount: 20,
    image: "/img/p/neck-strip.webp",
    tint: "#ECECEC",
    short: "Bərbər boyun kağızı — rulon",
    description: "Saç kəsimi zamanı müştərinin boynunu qoruyan elastik birdəfəlik boyun bandı. Gigiyenik və rahat.",
    features: ["Birdəfəlik, gigiyenik", "Elastik və yumşaq", "Rulon qablaşdırma"],
    specs: [{ label: "Kod", value: "01632" }],
  },

  /* ───────────────────────── RAZORLINE ───────────────────────── */
  ...(
    [
      ["cak015tx", "CAK015TX", "Salon seyrəltmə qayçısı", 200, '6.0"', "Seyrəltmə", "/img/poster/razor-06.webp", "Dəqiq seyrəltmə üçün dişli bıçaq — təbii və yumşaq keçidlər."],
      ["cak026", "CAK026", "Peşəkar kəsim qayçısı", 200, '6.0"', "Kəsim", "/img/poster/razor-07.webp", "Peşəkar kəsim sizin əlinizdə. Yüksək keyfiyyətli Yapon poladı, dəqiq və rahat kəsim."],
      ["ak139", "AK-139", "Hairdressing scissors — qara", 200, '6.0"', "Kəsim", "/img/poster/razor-11.webp", "Saç ustaları üçün. Qara örtüklü, dəqiq kəsim və uzunmüddətli kəskinlik."],
      ["cak021te", "CAK021TE", "Seyrəltmə qayçısı", 200, '6.0"', "Seyrəltmə", "/img/poster/razor-14.webp", "Saçın təbii gözəlliyini qoruyun. Dəqiq seyrəltmə, peşəkar nəticə."],
      ["cak015", "CAK015", "Japan Steel kəsim qayçısı", 200, '5.5"', "Kəsim", "/img/poster/razor-15.webp", "Klassik peşəkar forma, Yapon poladı və balanslı çəki."],
      ["cak021", "CAK021", "Saç kəsim qayçısı", 200, '6.0"', "Kəsim", "/img/poster/razor-17.webp", "Hair artists' choice. Dəqiq kəsim — daha gözəl nəticə."],
      ["cck006", "CCK006", "Gold Edition qayçı", 200, '6.0"', "Kəsim", "/img/poster/razor-05.webp", "Qızılı örtüklü premium model. Zərif dizayn və Yapon poladının kəskinliyi."],
      ["cak043", "CAK043", "Klassik kəsim qayçısı", 150, '5.5"', "Kəsim", "/img/poster/razor-08.webp", "Dəqiqlik, peşəkarlıq, gözəllik. Hər kəsimdə fərq yaradır."],
      ["ak23l", "AK23L", "Solaxaylar üçün qayçı", 150, '6.0"', "Solaxay", "/img/poster/razor-09.webp", "Solaxay ustalar üçün xüsusi hazırlanmış peşəkar qayçı."],
      ["cak015s", "CAK015S", "Fırlanan barmaqlı salon qayçısı", 150, '6.0"', "Kəsim", "/img/poster/razor-16.webp", "İdeal kəsim üçün əla kəskinlik, əldə rahat tutuş, paslanmaz polad."],
    ] as const
  ).map(
    ([id, code, sub, price, size, type, poster, desc]): Product => ({
      slug: `razorline-${id}`,
      name: `Razorline ${code}`,
      brand: "razorline",
      category: "aletler",
      code,
      price,
      discount: 40,
      image: img(id),
      photo: id === "cak026",
      gallery: id === "cak026" ? [poster, "/img/poster/razor-19.webp"] : [poster, `/img/p/${id}.webp`, "/img/poster/razor-19.webp"],
      tint: "#E4E2DF",
      short: sub,
      description: `${desc} Razorline qayçıları paslanmaz Yapon poladından hazırlanır və uzun illər itiliyini qoruyur.`,
      features: ["Yüksək keyfiyyətli Yapon poladı", "Dəqiq və kəskin kəsim", "Ergonomik dizayn — rahat istifadə", "Uzunmüddətli kəskinlik"],
      specs: [
        { label: "Model", value: code },
        { label: "Ölçü", value: size },
        { label: "Növ", value: type },
        { label: "Material", value: "Japan Steel, paslanmaz polad" },
      ],
      badges: id === "cck006" || id === "ak139" ? ["nagd", "hit"] : ["nagd"],
      note: "Endirim yalnız nağd satışda keçərlidir",
    }),
  ),
  {
    slug: "razorline-ulguc",
    name: "Razorline Ülgüc",
    brand: "razorline",
    category: "aletler",
    price: 15,
    discount: 40,
    image: "/img/p/razor.webp",
    photo: true,
    tint: "#E4E2DF",
    short: "Peşəkar saç ülgücü — qutuda",
    description: "Saç teksturası və konturlama üçün peşəkar ülgüc. Dəyişdirilə bilən bıçaq, rahat tutuş, hədiyyəlik qutuda.",
    features: ["Dəyişdirilə bilən bıçaq", "Paslanmaz polad", "Hədiyyəlik qutu"],
    badges: ["nagd"],
    note: "Endirim yalnız nağd satışda keçərlidir",
  },

  /* ───────────────────────── ARTEKO ───────────────────────── */
  {
    slug: "arteko-sac-utusu",
    name: "Artéko Peşəkar Saç Ütüsü",
    brand: "arteko",
    category: "aletler",
    price: 150,
    discount: 33,
    image: "/img/p/iron.webp",
    photo: true,
    tint: "#E4E2DF",
    short: "Keramik lövhəli düzləşdirici ütü",
    description: "Keramik-turmalin lövhələri ilə saçı yandırmadan bərabər düzləşdirir. Keratin prosedurları üçün ideal, sürətli qızma və tənzimlənən temperatur.",
    features: ["Keramik-turmalin lövhələr", "Tənzimlənən temperatur (230°C-yə qədər)", "Sürətli qızma", "Fırlanan kabel"],
    specs: [
      { label: "Temperatur", value: "130–230°C" },
      { label: "Lövhə", value: "Keramik-turmalin" },
    ],
    badges: ["nagd"],
    note: "Endirim yalnız nağd satışda keçərlidir",
  },
  ...(
    [
      ["oval", "Oval masaj fırçası", 10, "Oval", "Masaj fırçası"],
      ["square", "Kvadrat (paddle) fırça", 8, "Kvadrat", "Paddle fırça"],
      ["25", "Termo fırça 0481JC — 25 mm", 8, "0481JC", "25 mm"],
      ["35", "Termo fırça 0482JC — 35 mm", 10, "0482JC", "35 mm"],
      ["45", "Termo fırça 0483JC — 45 mm", 12, "0483JC", "45 mm"],
      ["55", "Termo fırça 0484JC — 55 mm", 14, "0484JC", "55 mm"],
    ] as const
  ).map(
    ([id, name, price, code, size]): Product => ({
      slug: `arteko-brush-${id}`,
      name: `Artéko ${name}`,
      brand: "arteko",
      category: "aletler",
      code,
      price,
      image: `/img/p/brush-${id}.webp`,
      photo: true,
      gallery: ["/img/p/brush-stand.webp"],
      tint: "#ECE7E0",
      short: id.length === 2 ? `Keramik termo fırça, ${size}` : `${size}, ekoloji gövdə`,
      description:
        id.length === 2
          ? `Keramik gövdəli termo fırça (${size}). Fenlə ukladka zamanı istiliyi bərabər paylayır, saça həcm və parlaqlıq verir.`
          : `Ekoloji materialdan gövdə ilə ${size.toLowerCase()}. Saçı yumşaq daranır, baş dərisinə masaj effekti verir.`,
      features:
        id.length === 2
          ? ["Keramik-ion gövdə", "İstiliyi bərabər paylayır", "Həcm və parlaqlıq", "Ekoloji tutacaq"]
          : ["Yumşaq daranma", "Baş dərisinə masaj", "Ekoloji tutacaq"],
      specs: [
        { label: "Kod", value: code },
        { label: "Ölçü", value: size },
      ],
      badges: ["hediyye"],
      note: "8 ədəd daraq alana daraq stendi hədiyyə",
    }),
  ),
];

/* ─────────────── Köməkçi funksiyalar ─────────────── */

export const finalPrice = (p: Pick<Product, "price" | "discount">) =>
  Math.round(p.price * (1 - (p.discount ?? 0) / 100) * 100) / 100;

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getBrand = (slug: string) => BRANDS.find((b) => b.slug === slug);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export const productsByBrand = (slug: BrandSlug) => PRODUCTS.filter((p) => p.brand === slug);
export const discounted = () =>
  PRODUCTS.filter((p) => p.discount).sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

/** Endirimli məhsulları brendlər arasında növbələşdirərək qaytarır (vitrin üçün). */
export function discountedMix() {
  const groups = new Map<BrandSlug, Product[]>();
  for (const p of PRODUCTS.filter((x) => x.discount)) groups.set(p.brand, [...(groups.get(p.brand) ?? []), p]);
  const lists = [...groups.values()];
  const out: Product[] = [];
  for (let i = 0; out.length < PRODUCTS.length && lists.some((l) => l[i]); i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
}

/** Variantlar daxil olmaqla ümumi çeşid sayı */
export const SKU_COUNT = PRODUCTS.reduce((n, p) => n + (p.variants?.length ?? 1), 0);
export const bestsellers = () => PRODUCTS.filter((p) => p.badges?.includes("hit"));

export const BADGE_LABEL: Record<Badge, string> = {
  yeni: "Yeni",
  hit: "Hit",
  nagd: "Nağd endirim",
  hediyye: "Hədiyyəli",
  dest: "Dəst",
};

export function related(p: Product, n = 8) {
  const same = PRODUCTS.filter((x) => x.slug !== p.slug && x.category === p.category);
  const brand = PRODUCTS.filter((x) => x.slug !== p.slug && x.brand === p.brand && x.category !== p.category);
  return [...same, ...brand].slice(0, n);
}
