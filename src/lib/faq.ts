export type FaqGroup = "order" | "delivery" | "products" | "discounts";
export type Faq = { q: string; a: string; group: FaqGroup };

export const FAQ: Faq[] = [
  {
    group: "order",
    q: "Sifarişi necə verə bilərəm?",
    a: "Bəyəndiyiniz məhsulları səbətə əlavə edin və «WhatsApp ilə sifariş et» düyməsinə basın — siyahı hazır mesaj şəklində bizə göndəriləcək. İstəsəniz 055 426 24 39 nömrəsinə zəng edərək də sifariş verə bilərsiniz.",
  },
  {
    group: "products",
    q: "Məhsullar orijinaldırmı?",
    a: "Bəli. Nouvelle, Redist, RedOne və Razorline məhsulları rəsmi tədarükçülərdən gəlir, hər birinin seriya nömrəsi və istehsal tarixi var. Saxta və ya müddəti keçmiş məhsul satmırıq.",
  },
  {
    group: "delivery",
    q: "Çatdırılma necə həyata keçirilir və nə qədər çəkir?",
    a: "Bakı daxilində sifarişlər adətən həmin gün və ya növbəti gün çatdırılır. 50 ₼-dan yuxarı sifarişlərdə Bakı üzrə çatdırılma pulsuzdur, digər hallarda 3 ₼. Regionlara poçt və ya kargo ilə 2–4 iş günü ərzində göndəririk.",
  },
  {
    group: "delivery",
    q: "Hansı ödəniş üsulları var?",
    a: "Nağd (qapıda), bank kartı ilə və köçürmə ilə ödəniş qəbul edirik. Diqqət: qayçılar, ülgüc və ütü üzrə endirimlər yalnız nağd ödənişdə keçərlidir.",
  },
  {
    group: "discounts",
    q: "Endirimlər nə vaxta qədər keçərlidir?",
    a: "Cari kampaniyalar ay sonuna qədər davam edir və ya stok bitənədək keçərlidir. Razorline qayçılarında 40%, RedOne məhsullarında 20%, Artéko ütüsündə 33% endirim var. Yeni kampaniyaları Instagram səhifəmizdə elan edirik.",
  },
  {
    group: "discounts",
    q: "Salonlar və bərbərxanalar üçün xüsusi qiymət varmı?",
    a: "Bəli. Topdan sifarişlərdə (məsələn, 12 ədəd boya, qutu ilə wax və ya odekolon) əlavə endirim tətbiq edirik. 8 ədəd daraq alana daraq stendi hədiyyədir. Ətraflı məlumat üçün bizə yazın.",
  },
  {
    group: "products",
    q: "Nouvelle saç boyası ilə hansı oksidantı istifadə etməliyəm?",
    a: "Nouvelle Hair Color 1:1 nisbətində qarışdırılır. Ton-ton boyama üçün 3% (10 vol), ağ saçların örtülməsi və 1 ton açma üçün 6% (20 vol), 2–3 ton açma üçün 9–12% (30–40 vol) oksidant seçin.",
  },
  {
    group: "products",
    q: "Kera Sublime düzləşdirməsinin nəticəsi nə qədər qalır?",
    a: "Kera Sublime yarımpermanent düzləşdirici kremdir. Nəticə saç tipindən və tətbiq texnikasından asılı olaraq bir neçə həftə, onlarla yuyulmadan sonra da qorunur. Nəticəni uzatmaq üçün Kera Sublime şampun, maska və yağından istifadə edin.",
  },
  {
    group: "products",
    q: "Solaxaylar üçün qayçınız varmı?",
    a: "Bəli — Razorline AK23L modeli solaxay ustalar üçün xüsusi hazırlanıb. Bütün Razorline qayçıları paslanmaz Yapon poladındandır.",
  },
  {
    group: "order",
    q: "Məhsulu qaytarmaq və ya dəyişmək mümkündürmü?",
    a: "Açılmamış və qablaşdırması zədələnməmiş məhsulları 14 gün ərzində dəyişə və ya qaytara bilərsiniz. Gigiyenik səbəblərdən açılmış kosmetik məhsullar geri qəbul edilmir; zavod qüsuru olduqda isə dərhal dəyişirik.",
  },
  {
    group: "products",
    q: "Hansı wax mənim saçım üçün uyğundur?",
    a: "Parlaq, «yaş» görünüş üçün Aqua wax-lar (Red, Blue, Cobra, Olive və s.), təbii mat görünüş üçün Matte seriyası (Green, Argan, Keratin, Matte White/Black), tekstura və yaradıcı tərzlər üçün Creative Fiber və ya Spider wax seçin.",
  },
  {
    group: "delivery",
    q: "Məhsulları mağazadan özüm götürə bilərəmmi?",
    a: "Əlbəttə. Sifarişi əvvəlcədən WhatsApp və ya telefonla təsdiqləyin, hazırlayıb sizi gözləyək.",
  },
];
