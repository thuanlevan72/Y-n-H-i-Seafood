import defaultProductsData from '../data/products.json';

export type ProductCategory = 'all' | 'fresh' | 'frozen' | 'dried';
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface Product {
  id: number;
  slug?: string;
  sku?: string;
  name: string;
  mobileName: string;
  seoTitle?: string;
  seoAlt?: string;
  category: Exclude<ProductCategory, 'all'>;
  price: number;
  originalPrice?: number;
  unit: string;
  mobileUnit: string;
  image: string;
  badgeLeft: string;
  badgeLeftIcon?: string;
  badgeRight: string;
  badgeRightStyle: 'coral' | 'emerald' | 'sky' | 'amber';
  mobileBadge: string;
  mobileKicker: string;
  mobileKickerColor: string;
  subtitle: string;
  rating: number;
  reviewsCount: number;
  description: string;
  mobileDescription: string;
  prepOptions: string[];
  sizeOptions: { label: string; priceMultiplier: number }[];
  featuredOrder: number;
  stockStatus: string;
}

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface CustomerReviewItem {
  id: string;
  author: string;
  location: string;
  productBought: string;
  rating: number;
  datePublished: string;
  comment: string;
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  qty: number;
  img: string;
  unit: string;
  prepNote?: string;
}

export interface ComboPackage {
  id: string;
  title: string;
  subtitle: string;
  itemsIncluded: string[];
  price: number;
  originalPrice: number;
  saveBadge: string;
  tag: string;
  image: string;
}

export interface BioSample {
  id: string;
  title: string;
  titleColorClass: string;
  charCount: number;
  maxChars: number;
  content: string;
  recommended?: boolean;
}

export interface SalesPostTemplate {
  id: string;
  category: Exclude<ProductCategory, 'all'>;
  title: string;
  hook: string;
  content: string;
}

export interface CheckoutFormInput {
  fullName: string;
  phone: string;
  address: string;
  deliverySlot: string;
  paymentMethod: 'cod' | 'vietqr' | 'zalo';
  note?: string;
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: {
    fullName?: string;
    phone?: string;
    address?: string;
  };
}

export const HERO_BG_IMAGE =
  '/assets/aistudio/1794885567341_2584028512014311615_2584028512014311615_5156174eb2025c8d42ebf3d33900b3cf_ebfdf389.jpg';

export const PRODUCTS: Product[] = defaultProductsData as Product[];

export const INITIAL_CART: CartItem[] = [
  {
    id: 1,
    productId: 4,
    name: PRODUCTS[3].name,
    price: PRODUCTS[3].price,
    qty: 1,
    img: PRODUCTS[3].image,
    unit: PRODUCTS[3].unit,
    prepNote: PRODUCTS[3].prepOptions[0]
  },
  {
    id: 2,
    productId: 1,
    name: PRODUCTS[0].name,
    price: PRODUCTS[0].price,
    qty: 1,
    img: PRODUCTS[0].image,
    unit: PRODUCTS[0].unit,
    prepNote: PRODUCTS[0].prepOptions[0]
  },
  {
    id: 3,
    productId: 2,
    name: PRODUCTS[1].name,
    price: PRODUCTS[1].price,
    qty: 1,
    img: PRODUCTS[1].image,
    unit: PRODUCTS[1].unit,
    prepNote: PRODUCTS[1].prepOptions[0]
  }
];

export const COMBO_PACKAGES: ComboPackage[] = [
  {
    id: 'combo-bebe-muc-ca',
    title: 'Combo Gia Đình Hải Sản Tươi Ngọt (4-6 Người)',
    subtitle: 'Tặng miễn phí sơ chế + 2 chai sốt chấm hải sản + Freeship 1h',
    itemsIncluded: [
      '1kg Bề Bề (Tôm Tít) Bóc Nõn Full Trứng (2 khay)',
      '1kg Mực Ống Biển Tươi Cấp Đông (Size Lớn)',
      '1kg Cá Thu Phấn Tươi Cắt Khoanh (Khoanh giữa)'
    ],
    price: 860000,
    originalPrice: 950000,
    saveBadge: 'Tiết kiệm 90.000₫',
    tag: 'Bán chạy nhất tuần',
    image: PRODUCTS[3].image
  },
  {
    id: 'combo-gift-dock',
    title: 'Combo Lẩu Nướng & Quà Biếu Hải Sản Đặc Sản',
    subtitle: 'Đóng thùng xốp giữ nhiệt lịch sự đi biếu hoặc tiệc cuối tuần',
    itemsIncluded: [
      '1kg Bạch Tuộc Biển Tươi Sống Đóng Khay',
      '1kg Bề Bề (Tôm Tít) Nõn Thịt Size Đại Mới Hấp',
      '1kg Cá Khô Rút Xương Phơi Nắng Tự Nhiên'
    ],
    price: 690000,
    originalPrice: 760000,
    saveBadge: 'Tiết kiệm 70.000₫',
    tag: 'Combo Tiệc & Biếu',
    image: PRODUCTS[0].image
  }
];

export const BIO_SAMPLES: BioSample[] = [
  {
    id: 'bioText1',
    title: 'Mẫu 1: Trực diện, Chuyên nghiệp (Khuyên dùng)',
    titleColorClass: 'text-accent',
    charCount: 206,
    maxChars: 255,
    recommended: true,
    content:
      'Hải Sản Yến Hải chuyên cung cấp sỉ & lẻ đa dạng mặt hàng: Hải sản tươi sống về trong ngày, hải sản khô tuyển chọn và hàng đông lạnh chất lượng cao. Cam kết uy tín, bao tươi ngon. Liên hệ ngay!'
  },
  {
    id: 'bioText2',
    title: 'Mẫu 2: Nhấn mạnh quy mô đầy đủ',
    titleColorClass: 'text-ocean-blue',
    charCount: 217,
    maxChars: 255,
    content:
      'Cần hải sản gì, Yến Hải cũng có! Chúng tôi chuyên phân phối trọn gói hải sản: Tươi sống bơi tại hồ - Hàng khô hút chân không làm quà biếu - Hàng đông lạnh chuẩn xuất khẩu tiện lợi. Giao hàng tận nơi!'
  },
  {
    id: 'bioText3',
    title: 'Mẫu 3: Ngắn gọn, dễ nhớ',
    titleColorClass: 'text-fresh-green',
    charCount: 213,
    maxChars: 255,
    content:
      'Hải Sản Yến Hải - Thế giới hải sản thu nhỏ. Chuyên bán buôn, bán lẻ các loại hải sản: Tươi sống 100%, đồ khô một nắng đậm đà và hải sản cấp đông giữ trọn dinh dưỡng. Chất lượng loại 1, giá cả bình dân.'
  }
];

export const STORE_PHONE = '0356136859';
export const STORE_PHONE_DISPLAY = '0356.136.859';
export const STORE_ZALO_URL = 'https://zalo.me/0356136859';
export const STORE_FACEBOOK_URL =
  'https://web.facebook.com/hai.yen.tran.314077';

export const SALES_POST_TEMPLATES: SalesPostTemplate[] = [
  {
    id: 'post-fresh',
    category: 'fresh',
    title: 'Bài đăng Chốt Sale Mực Ống - Cá Thu - Bạch Tuộc Tươi',
    hook: '🦑 GHE VỀ SÁNG SỚM: MỰC ỐNG NHÁY - CÁ THU PHẤN KHOANH GIỮA - BẠCH TUỘC TƯƠI RÓI!',
    content: `🦑 GHE VỀ SÁNG SỚM: MỰC ỐNG NHÁY - CÁ THU PHẤN KHOANH GIỮA - BẠCH TUỘC TƯƠI RÓI!
✅ Mực ống biển thân dày giòn ngọt: 320.000₫/kg
✅ Cá thu phấn cắt khoanh giữa đặc thịt hồng tươi: 280.000₫/kg
✅ Bạch tuộc biển tươi giòn sần sật không ngâm nước: 230.000₫/kg
🚀 Hỗ trợ làm sạch miễn phí - Giao hỏa tốc 1h-2h tận bếp!
📞 Chốt đơn Hotline/Zalo Yến Hải: 0356.136.859`
  },
  {
    id: 'post-frozen',
    category: 'frozen',
    title: 'Bài đăng Chốt Sale Bề Bề (Tôm Tít) Nõn Trứng & Thịt VIP',
    hook: '🦐 BỀ BỀ (TÔM TÍT) BÓC NÕN FULL TRỨNG & NÕN ĐẠI – CHỈ VIỆC CHẾ BIẾN NGAY!',
    content: `🦐 BỀ BỀ (TÔM TÍT) BÓC NÕN FULL TRỨNG & NÕN ĐẠI – CHỈ VIỆC CHẾ BIẾN NGAY!
✨ Bề bề bóc nõn Full Trứng béo bùi: 350.000₫/kg (2 khay 500g)
✨ Bề bề nõn thịt Size Đại mới hấp trong ngày: 290.000₫/kg
✨ Bề bề nõn đóng khay VIP 500g chuẩn xuất khẩu: 165.000₫/khay
📞 Đặt hàng ngay tại Hải Sản Yến Hải: 0356.136.859 (Freeship đơn từ 1 triệu)`
  },
  {
    id: 'post-dried',
    category: 'dried',
    title: 'Bài đăng Chốt Sale Cá Khô Rút Xương Phơi Nắng Tự Nhiên',
    hook: '☀️ CÁ KHÔ RÚT XƯƠNG PHƠI NẮNG TỰ NHIÊN – DẺO THƠM, KHÔNG CHẤT BẢO QUẢN!',
    content: `☀️ CÁ KHÔ RÚT XƯƠNG PHƠI NẮNG TỰ NHIÊN – DẺO THƠM, KHÔNG CHẤT BẢO QUẢN!
🐟 Cá tươi xẻ rút xương phơi đúng nắng giòn rụm, vị mặn ngọt vừa ăn: 240.000₫/kg (2 túi 500g)
🎁 Hút chân không lịch sự, làm quà biếu hoặc trữ tủ lạnh chiên/nướng cực hao cơm!
📞 Liên hệ Hải Sản Yến Hải: 0356.136.859 để nhận hàng ngay!`
  }
];

export const SEO_FAQS: SeoFaqItem[] = [
  {
    question: 'Hải Sản Yến Hải giao hàng trong bao lâu và bảo quản như thế nào?',
    answer:
      'Tại nội thành TP.HCM, Hải Sản Yến Hải giao hỏa tốc từ 1h – 2h ngay sau khi chốt đơn. Tất cả mặt hàng tươi sống (Mực ống, Cá thu phấn, Bạch tuộc) và cấp đông (Bề bề bóc nõn full trứng, Khay VIP 500g) đều được đóng khay hút chân không, ủ đá gel giữ lạnh chuẩn nhiệt độ; đơn tỉnh đóng thùng xốp chuyên dụng giữ tươi 100%.'
  },
  {
    question: 'Chính sách "Bao ăn 1 đổi 1" tại Hải Sản Yến Hải áp dụng ra sao?',
    answer:
      'Cam kết chất lượng loại 1: Nếu hải sản khi nhận bị ươn, bở thịt, không đúng quy cách hoặc bề bề full trứng không có trứng như mô tả, quý khách chỉ cần chụp ảnh/quay video gửi qua Zalo 0356.136.859, Yến Hải sẽ đổi mới 100% tận nơi hoặc hoàn tiền ngay lập tức.'
  },
  {
    question: 'Bề bề (tôm tít) bóc nõn full trứng và cá thu phấn cắt khoanh bảo quản được bao lâu?',
    answer:
      'Bề bề bóc nõn full trứng và cá thu phấn cắt khoanh đã được hấp sơ/cắt lát và cấp đông sâu hút chân không nên bảo quản ở ngăn đá tủ lạnh gia đình (-18°C) được từ 2 đến 3 tháng mà vẫn giữ nguyên 99% vị ngọt tự nhiên. Khi chế biến chỉ cần rã đông tự nhiên 10-15 phút.'
  },
  {
    question: 'Vựa có hỗ trợ làm sạch, sơ chế sẵn và xuất sỉ cho nhà hàng không?',
    answer:
      'Có! Yến Hải miễn phí 100% công làm sạch túi mực, cắt khoanh, đóng khay 500g hoặc hấp gừng sả theo yêu cầu. Đồng thời vựa chuyên bỏ sỉ số lượng lớn Mực ống, Bề bề nõn, Cá thu khoanh, Bạch tuộc và Cá khô rút xương cho nhà hàng, quán nhậu, bếp ăn với giá gốc tận tàu.'
  }
];

export const CUSTOMER_REVIEWS: CustomerReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Chị Minh Thư',
    location: 'Quận 7, TP.HCM',
    productBought: 'Bề Bề (Tôm Tít) Bóc Nõn Full Trứng',
    rating: 5,
    datePublished: '2026-11-10',
    comment:
      'Khay bề bề nõn full trứng của Yến Hải đỉnh thật sự! Con nào cũng to đều, dọc sống lưng đầy gạch vàng béo ngậy. Mình mua 2kg về rim me cả nhà khen tấm tắc, giao hàng chỉ 1 tiếng là tới.'
  },
  {
    id: 'rev-2',
    author: 'Anh Hoàng Nam',
    location: 'Bình Thạnh, TP.HCM',
    productBought: 'Mực Ống Biển Tươi Cấp Đông (Size Lớn)',
    rating: 5,
    datePublished: '2026-11-12',
    comment:
      'Mực ống size lớn da còn nhấp nhánh, hấp gừng hành lên giòn sần sật, ngọt lịm chứ không bị teo hay ra nước như hàng chợ. Sẽ ủng hộ vựa dài dài!'
  },
  {
    id: 'rev-3',
    author: 'Cô Ngọc Lan',
    location: 'Quận 3, TP.HCM',
    productBought: 'Cá Thu Phấn Tươi Cắt Khoanh & Cá Khô Rút Xương',
    rating: 5,
    datePublished: '2026-11-14',
    comment:
      'Cá thu phấn khoanh giữa đặc thịt, hồng tươi, chiên sốt cà cho mấy đứa cháu ăn yên tâm vì không có xương dăm. Cá khô rút xương phơi vừa nắng, vị dịu không bị mặn chát.'
  }
];

export const FREE_SHIPPING_THRESHOLD = 1000000;
export const STANDARD_SHIPPING_FEE = 35000;

export function formatVND(amount: number): string {
  return `${Math.round(amount).toLocaleString('vi-VN')}₫`;
}

export function parseAndValidateProductsJson(jsonText: string): {
  valid: boolean;
  products?: Product[];
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return {
        valid: false,
        error: 'JSON phải là một mảng danh sách sản phẩm ([...]) không rỗng.'
      };
    }

    const normalized: Product[] = [];
    for (let i = 0; i < parsed.length; i++) {
      const raw = parsed[i];
      if (!raw || typeof raw !== 'object') {
        return {
          valid: false,
          error: `Phần tử thứ ${i + 1} không phải là đối tượng sản phẩm hợp lệ.`
        };
      }
      if (!raw.name || typeof raw.name !== 'string') {
        return {
          valid: false,
          error: `Sản phẩm thứ ${i + 1} thiếu trường "name" (Tên sản phẩm).`
        };
      }
      const priceNum = Number(raw.price);
      if (!Number.isFinite(priceNum) || priceNum <= 0) {
        return {
          valid: false,
          error: `Sản phẩm "${raw.name}" có giá "price" không hợp lệ.`
        };
      }
      const category =
        raw.category === 'fresh' ||
        raw.category === 'frozen' ||
        raw.category === 'dried'
          ? raw.category
          : 'fresh';

      normalized.push({
        id: Number(raw.id) || i + 1,
        slug: raw.slug || `san-pham-${i + 1}`,
        sku: raw.sku || `YH-SP-0${i + 1}`,
        name: raw.name,
        mobileName: raw.mobileName || raw.name,
        seoTitle:
          raw.seoTitle ||
          `${raw.name} - Giá ${formatVND(priceNum)} ${raw.unit || '/ kg'} | Hải Sản Yến Hải`,
        seoAlt:
          raw.seoAlt ||
          `Hình ảnh thực tế ${raw.name} tươi ngon loại 1 tại Vựa Hải Sản Yến Hải`,
        category,
        price: priceNum,
        originalPrice: raw.originalPrice ? Number(raw.originalPrice) : undefined,
        unit: raw.unit || '/ kg',
        mobileUnit: raw.mobileUnit || raw.unit || '/ kg',
        image:
          raw.image ||
          '/assets/aistudio/1794885567341_2584028512014311615_2584028512014311615_5156174eb2025c8d42ebf3d33900b3cf_ebfdf389.jpg',
        badgeLeft:
          raw.badgeLeft ||
          (category === 'fresh'
            ? 'Tươi sống trong ngày'
            : category === 'frozen'
            ? 'Cấp đông sâu'
            : 'Phơi tự nhiên đủ nắng'),
        badgeLeftIcon:
          raw.badgeLeftIcon ||
          (category === 'frozen'
            ? 'ac_unit'
            : category === 'dried'
            ? 'wb_sunny'
            : undefined),
        badgeRight: raw.badgeRight || 'Bao ăn 1 đổi 1',
        badgeRightStyle:
          raw.badgeRightStyle === 'coral' ||
          raw.badgeRightStyle === 'emerald' ||
          raw.badgeRightStyle === 'sky' ||
          raw.badgeRightStyle === 'amber'
            ? raw.badgeRightStyle
            : 'coral',
        mobileBadge: raw.mobileBadge || 'Loại 1',
        mobileKicker: raw.mobileKicker || 'Bao tươi ngon',
        mobileKickerColor: raw.mobileKickerColor || 'text-accent',
        subtitle: raw.subtitle || 'Tuyển chọn loại 1 tại vựa Yến Hải',
        rating: Number(raw.rating) || 5.0,
        reviewsCount: Number(raw.reviewsCount) || 88,
        description:
          raw.description ||
          'Hải sản tuyển chọn loại 1 tại vựa Hải Sản Yến Hải, cam kết bao tươi ngon 1 đổi 1.',
        mobileDescription:
          raw.mobileDescription ||
          raw.description ||
          'Hải sản loại 1 bao tươi ngon.',
        prepOptions:
          Array.isArray(raw.prepOptions) && raw.prepOptions.length > 0
            ? raw.prepOptions
            : ['Đóng khay bảo quản lạnh tiêu chuẩn', 'Sơ chế làm sạch miễn phí'],
        sizeOptions:
          Array.isArray(raw.sizeOptions) && raw.sizeOptions.length > 0
            ? raw.sizeOptions
            : [
                { label: 'Khay 500g', priceMultiplier: 0.52 },
                { label: 'Phần 1kg tiêu chuẩn', priceMultiplier: 1 }
              ],
        featuredOrder: Number(raw.featuredOrder) || i + 1,
        stockStatus: raw.stockStatus || 'Đang sẵn hàng tại vựa'
      });
    }

    return { valid: true, products: normalized };
  } catch (err) {
    return {
      valid: false,
      error: `Lỗi cú pháp JSON: ${(err as Error).message}`
    };
  }
}

export function filterAndSortProducts(
  products: Product[],
  options: {
    category: ProductCategory;
    searchQuery: string;
    sortBy: SortOption;
  }
): Product[] {
  const query = options.searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory =
      options.category === 'all' || product.category === options.category;
    if (!matchesCategory) return false;

    if (!query) return true;
    const searchable = [
      product.name,
      product.mobileName,
      product.description,
      product.subtitle,
      product.badgeLeft,
      product.badgeRight
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(query);
  });

  const sorted = [...filtered];
  if (options.sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (options.sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (options.sortBy === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
  } else {
    sorted.sort((a, b) => a.featuredOrder - b.featuredOrder);
  }

  return sorted;
}

export function addCartItem(
  cart: CartItem[],
  item: {
    productId: number;
    name: string;
    price: number;
    img: string;
    unit?: string;
    prepNote?: string;
    qty?: number;
  }
): CartItem[] {
  const addQty = item.qty ?? 1;
  const existingIndex = cart.findIndex(
    (c) =>
      c.name === item.name &&
      (c.prepNote || '') === (item.prepNote || '') &&
      c.price === item.price
  );

  if (existingIndex > -1) {
    return cart.map((c, idx) =>
      idx === existingIndex ? { ...c, qty: c.qty + addQty } : c
    );
  }

  return [
    ...cart,
    {
      id: Date.now() + Math.floor(Math.random() * 1000),
      productId: item.productId,
      name: item.name,
      price: item.price,
      qty: addQty,
      img: item.img,
      unit: item.unit || '/ kg',
      prepNote: item.prepNote
    }
  ];
}

export function updateCartItemQty(
  cart: CartItem[],
  itemId: number,
  delta: number
): CartItem[] {
  return cart
    .map((item) =>
      item.id === itemId ? { ...item, qty: item.qty + delta } : item
    )
    .filter((item) => item.qty > 0);
}

export function calculateCartTotals(
  cart: CartItem[],
  voucherCode?: string
): {
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  isFreeShipping: boolean;
  amountToFreeShipping: number;
  freeShippingProgress: number;
  freeSauceBottles: number;
  discountAmount: number;
  grandTotal: number;
} {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee =
    subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const freeSauceBottles = Math.floor(subtotal / 500000);

  let discountAmount = 0;
  const normalizedCode = (voucherCode || '').trim().toUpperCase();
  if (normalizedCode === 'YENHAI50' && subtotal >= 500000) {
    discountAmount = 50000;
  } else if (normalizedCode === 'VIP100' && subtotal >= 2000000) {
    discountAmount = 100000;
  }

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  return {
    totalItems,
    subtotal,
    shippingFee,
    isFreeShipping: subtotal >= FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping,
    freeShippingProgress,
    freeSauceBottles,
    discountAmount,
    grandTotal
  };
}

export function validateVietnamesePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, '');
  return /^(0|\+84)[35789]\d{8}$/.test(cleaned) || /^0\d{8,10}$/.test(cleaned);
}

export function validateCheckoutForm(
  input: CheckoutFormInput
): CheckoutValidationResult {
  const errors: CheckoutValidationResult['errors'] = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Vui lòng nhập họ và tên người nhận';
  }
  if (!input.phone || !validateVietnamesePhone(input.phone)) {
    errors.phone = 'Vui lòng nhập số điện thoại hợp lệ (10 số)';
  }
  if (!input.address || input.address.trim().length < 5) {
    errors.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function buildZaloOrderMessage(
  cart: CartItem[],
  customer?: Partial<CheckoutFormInput>
): string {
  const totals = calculateCartTotals(cart);
  const itemsText = cart
    .map(
      (i) =>
        `- ${i.name} x${i.qty}: ${formatVND(i.price * i.qty)}${
          i.prepNote ? ` (${i.prepNote})` : ''
        }`
    )
    .join('\n');

  const customerLine = customer?.phone
    ? `\nKhách hàng: ${customer.fullName || 'Khách đặt nhanh'} - SĐT: ${customer.phone}${
        customer.address ? ` - Đ/c: ${customer.address}` : ''
      }`
    : '';

  return `Chào Hải Sản Yến Hải, tôi muốn đặt ${totals.totalItems} phần hải sản:\n${itemsText}\nTổng thanh toán: ${formatVND(
    totals.grandTotal
  )}.${customerLine}\nNhờ shop tư vấn và giao hỏa tốc giúp tôi!`;
}
