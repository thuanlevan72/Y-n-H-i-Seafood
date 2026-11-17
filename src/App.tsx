/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  PRODUCTS,
  INITIAL_CART,
  COMBO_PACKAGES,
  HERO_BG_IMAGE,
  Product,
  ProductCategory,
  SortOption,
  CartItem,
  filterAndSortProducts,
  addCartItem,
  updateCartItemQty,
  calculateCartTotals,
  formatVND
} from './lib/store-logic';
import { ResilientImage } from './components/ResilientImage';
import { CartDrawer } from './components/CartDrawer';
import { OrderConsultModal } from './components/OrderConsultModal';
import { ProductQuickModal } from './components/ProductQuickModal';
import { BioAndMarketingSection } from './components/BioAndMarketingSection';
import { MobileBioStoreView } from './components/MobileBioStoreView';

export interface AppProps {
  initialProducts?: Product[];
}

export default function App({ initialProducts = PRODUCTS }: AppProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [viewMode, setViewMode] = useState<'storefront' | 'mobile-bio'>('storefront');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [consultModalTopic, setConsultModalTopic] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        category: selectedCategory,
        searchQuery,
        sortBy
      }),
    [products, selectedCategory, searchQuery, sortBy]
  );

  const totals = useMemo(() => calculateCartTotals(cart), [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleAddProductToCart = (product: Product) => {
    setCart((prev) =>
      addCartItem(prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        img: product.image,
        unit: product.unit,
        prepNote: product.prepOptions[0]
      })
    );
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleDirectBuyProduct = (product: Product) => {
    setCart((prev) =>
      addCartItem(prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        img: product.image,
        unit: product.unit,
        prepNote: product.prepOptions[0]
      })
    );
    setIsCartOpen(true);
  };

  const handleAddCustomItem = (item: {
    productId: number;
    name: string;
    price: number;
    img: string;
    unit: string;
    prepNote: string;
    qty: number;
  }) => {
    setCart((prev) => addCartItem(prev, item));
    showToast(`Đã thêm ${item.qty}x "${item.name}" (${item.prepNote}) vào giỏ!`);
  };

  const handleBuyCustomItem = (item: {
    productId: number;
    name: string;
    price: number;
    img: string;
    unit: string;
    prepNote: string;
    qty: number;
  }) => {
    setCart((prev) => addCartItem(prev, item));
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id: number, delta: number) => {
    setCart((prev) => updateCartItemQty(prev, id, delta));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Top 3 items for Hero Quick Price Snapshot
  const heroSpotlightProducts = useMemo(() => {
    const picked = [
      products.find((p) => p.id === 4) || products[0],
      products.find((p) => p.id === 1) || products[1],
      products.find((p) => p.id === 2) || products[2]
    ].filter(Boolean) as Product[];
    return picked.slice(0, 3);
  }, [products]);

  if (viewMode === 'mobile-bio') {
    return (
      <div className="min-h-screen bg-slate-900 py-0 sm:py-6">
        <MobileBioStoreView
          products={filteredProducts}
          cart={cart}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onSelectCategory={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onAddToCart={handleAddProductToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenProductDetail={(p) => setQuickViewProduct(p)}
          onSwitchToDesktopView={() => setViewMode('storefront')}
        />
        <CartDrawer
          isOpen={isCartOpen}
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={handleUpdateCartQty}
          onClearCart={() => setCart([])}
          onShowToast={showToast}
        />
        <ProductQuickModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddCustomItem}
          onBuyNow={handleBuyCustomItem}
        />
      </div>
    );
  }

  return (
    <div className="bg-light-surface-container font-body text-light-on-surface antialiased min-h-screen flex flex-col">
      {/* Top Announcement Bar */}
      <div className="bg-light-primary text-white text-body-sm py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-label text-label-sm text-emerald-400 bg-white/10 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Hải sản tươi về trong ngày
            </span>
            <span className="hidden md:inline text-white/80">
              🚀 Giao hàng hỏa tốc 1h-2h tại TP.HCM &amp; đóng thùng giữ lạnh toàn quốc
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 text-white/90 text-label-sm font-label">
            <span className="hidden sm:flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-accent">
                verified
              </span>{' '}
              Bao ăn 1 đổi 1
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-amber-400">
                workspace_premium
              </span>{' '}
              Hàng tuyển chọn loại 1
            </span>
            <button
              type="button"
              onClick={() => setViewMode('mobile-bio')}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/15 hover:bg-white/25 text-sky-200 transition-colors cursor-pointer"
              title="Chuyển sang giao diện Bio & Cửa hàng Di động"
            >
              <span className="material-symbols-outlined text-[15px]">
                smartphone
              </span>
              <span>Xem bản Bio Mobile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Store Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-light-outline-variant shadow-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 lg:gap-6">
          {/* Brand Logo / Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-light-primary to-[#184878] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[26px]">
                sailing
              </span>
            </div>
            <div>
              <a
                href="#top"
                className="font-headline text-headline-md text-light-primary font-extrabold tracking-tight leading-none flex items-center gap-1.5"
              >
                <span>YẾN HẢI</span>
                <span className="text-accent text-body-sm font-semibold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">
                  SEAFOOD
                </span>
              </a>
              <p className="font-body text-body-sm text-light-on-surface/60 mt-0.5">
                Vựa Hải Sản Tươi Sống • Đông Lạnh • Đồ Khô
              </p>
            </div>
          </div>

          {/* Live Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                id="searchInput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bề bề nõn trứng, mực ống, cá thu khoanh, bạch tuộc..."
                aria-label="Tìm kiếm hải sản"
                className="w-full pl-10 pr-24 py-2.5 rounded-DEFAULT border border-light-outline-variant bg-light-surface-container-high focus:bg-white focus:outline-none focus:ring-2 focus:ring-light-primary text-body-md transition-all"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-light-on-surface/40 text-[20px]">
                search
              </span>
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-slate-200 text-light-primary rounded font-label text-label-sm hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Xóa lọc
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection('catalog')}
                  className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-light-primary text-white rounded font-label text-label-sm hover:bg-light-primary/90 transition-colors cursor-pointer"
                >
                  Tìm kiếm
                </button>
              )}
            </div>
          </div>

          {/* Header Action Triggers: Phone hotline, Zalo & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Hotline Call Direct */}
            <a
              href="tel:0988666888"
              className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-DEFAULT bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors"
              title="Gọi Hotline tư vấn nhanh"
            >
              <div className="w-8 h-8 rounded-full bg-fresh-green text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
              </div>
              <div className="text-left">
                <span className="block text-[11px] font-label text-emerald-700 uppercase font-semibold leading-tight">
                  Hotline 24/7
                </span>
                <span className="font-headline text-title-sm font-bold text-emerald-950 tabular-nums leading-tight">
                  0988.666.888
                </span>
              </div>
            </a>

            {/* Direct Zalo Chat Action */}
            <a
              href="https://zalo.me/0988666888"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-DEFAULT bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-label text-label-md transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-ocean-blue text-[20px]">
                chat
              </span>
              <span>Chat Zalo</span>
            </a>

            {/* Cart Button With Badge Trigger */}
            <button
              id="cartOpenBtn"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-DEFAULT bg-accent hover:bg-accent-hover text-white font-label text-label-md shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_cart
              </span>
              <span className="hidden sm:inline">Giỏ hàng</span>
              <span
                id="cartCountBadge"
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white text-accent font-bold text-label-sm tabular-nums"
              >
                {totals.totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Category Quick Bar */}
        <nav
          aria-label="Danh mục hải sản chính"
          className="border-t border-light-outline-variant bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center gap-3 sm:gap-6 overflow-x-auto py-2 text-label-md font-label no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`cat-tab px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-light-primary text-white'
                  : 'hover:bg-light-surface-container text-light-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                grid_view
              </span>
              <span>Tất cả sản phẩm ({products.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('fresh')}
              className={`cat-tab px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'fresh'
                  ? 'bg-light-primary text-white'
                  : 'hover:bg-light-surface-container text-light-on-surface'
              }`}
            >
              <span className="text-base">🦐</span>
              <span>Hải Sản Tươi Trong Ngày</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('frozen')}
              className={`cat-tab px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'frozen'
                  ? 'bg-light-primary text-white'
                  : 'hover:bg-light-surface-container text-light-on-surface'
              }`}
            >
              <span className="text-base">❄️</span>
              <span>Bề Bề Nõn &amp; Cấp Đông VIP</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('dried')}
              className={`cat-tab px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'dried'
                  ? 'bg-light-primary text-white'
                  : 'hover:bg-light-surface-container text-light-on-surface'
              }`}
            >
              <span className="text-base">🦑</span>
              <span>Hải Sản Khô (Quà biếu)</span>
            </button>
            <a
              href="#bioSection"
              className="cat-tab px-3 py-1.5 rounded-full hover:bg-light-surface-container flex items-center gap-1.5 whitespace-nowrap ml-auto text-ocean-blue font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">
                badge
              </span>
              <span>Mẫu Bio Facebook &amp; Bài Đăng</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section: Seafood Quality Guarantee & Bio Banner */}
      <section className="relative bg-gradient-to-r from-light-primary via-[#0E355C] to-light-primary text-white py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <ResilientImage
            src={HERO_BG_IMAGE}
            alt="Vựa hải sản Yến Hải"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-label text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-accent">
                storefront
              </span>
              <span>Vựa sỉ &amp; lẻ hải sản uy tín toàn quốc</span>
            </div>
            <h1 className="font-headline text-display-lg-mobile sm:text-display-lg text-balance font-extrabold leading-tight tracking-tight text-white">
              Thế Giới Hải Sản Thu Nhỏ: <br />
              <span className="text-accent underline decoration-white/30">
                Tươi Sống
              </span>{' '}
              • <span className="text-sky-300">Đông Lạnh</span> •{' '}
              <span className="text-amber-300">Đồ Khô</span>
            </h1>
            <p className="font-body text-body-lg text-white/90 max-w-2xl text-pretty leading-relaxed">
              Hải Sản Yến Hải chuyên Mực Ống Biển Tươi, Cá Thu Phấn Cắt Khoanh, Bạch Tuộc Tươi, Bề Bề (Tôm Tít) Bóc Nõn Full Trứng và Cá Khô Rút Xương Phơi Nắng Tự Nhiên. Cam kết bao tươi ngon 1 đổi 1 tận nơi!
            </p>

            {/* Guarantee Triad Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-md border border-white/15">
                <span className="font-label text-label-sm text-emerald-400 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>{' '}
                  Bao ăn bao tươi
                </span>
                <p className="font-body text-body-sm text-white/80 mt-1">
                  1 đổi 1 tận nơi nếu không tươi ngon
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-md border border-white/15">
                <span className="font-label text-label-sm text-sky-300 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    ac_unit
                  </span>{' '}
                  Bề bề nõn full trứng
                </span>
                <p className="font-body text-body-sm text-white/80 mt-1">
                  Hấp bóc thủ công, đóng khay VIP giữ ngọt
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-md border border-white/15">
                <span className="font-label text-label-sm text-amber-300 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    card_giftcard
                  </span>{' '}
                  Đồ khô phơi nắng
                </span>
                <p className="font-body text-body-sm text-white/80 mt-1">
                  Cá khô rút xương hút chân không sạch sẽ
                </p>
              </div>
            </div>

            {/* Multi-Channel CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => scrollToSection('catalog')}
                className="px-6 py-3 rounded-DEFAULT bg-accent hover:bg-accent-hover text-white font-label text-label-lg shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  shopping_bag
                </span>
                <span>Đặt Mua Online Ngay</span>
              </button>
              <a
                href="tel:0988666888"
                className="px-5 py-3 rounded-DEFAULT bg-white text-light-primary hover:bg-light-surface-container font-label text-label-lg shadow flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-fresh-green text-[20px]">
                  call
                </span>
                <span>Gọi Hotline: 0988.666.888</span>
              </a>
              <button
                type="button"
                onClick={() => setConsultModalTopic('Tư vấn nhanh')}
                className="px-5 py-3 rounded-DEFAULT bg-white/10 hover:bg-white/20 border border-white/30 text-white font-label text-label-lg backdrop-blur-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chat
                </span>
                <span>Chat Zalo / Messenger</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Card: Quick Order Snapshot */}
          <div className="lg:col-span-5">
            <div className="bg-white text-light-on-surface p-6 rounded-lg shadow-2xl border border-white/30 relative">
              <div className="flex items-center justify-between pb-4 border-b border-light-outline-variant">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-fresh-green animate-ping"></span>
                  <span className="font-headline text-title-md font-bold text-light-primary">
                    Bảng Giá Hải Sản Hôm Nay
                  </span>
                </div>
                <span className="text-body-sm text-light-on-surface/50 font-body">
                  Cập nhật 06:30
                </span>
              </div>

              <div className="divide-y divide-light-outline-variant my-4">
                {heroSpotlightProducts.map((item) => (
                  <div
                    key={item.id}
                    className="py-2.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-11 rounded object-cover border border-light-outline-variant shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-label text-label-md text-light-primary font-bold block truncate">
                          {item.name}
                        </span>
                        <span className="block text-body-sm text-light-on-surface/60 truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-headline text-title-md font-bold text-accent tabular-nums">
                        {formatVND(item.price)}
                      </span>
                      <span className="block text-body-sm text-light-on-surface/50">
                        {item.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-light-primary-container p-3.5 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-light-primary">
                    local_shipping
                  </span>
                  <span className="font-label text-label-sm text-light-primary font-semibold">
                    Miễn phí giao đơn từ 1.000.000₫
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('catalog')}
                  className="text-accent font-label text-label-sm font-bold hover:underline cursor-pointer"
                >
                  Xem tất cả →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Bio Copy/Paste Reference Panel */}
      <BioAndMarketingSection onShowToast={showToast} />

      {/* Product Catalog Grid Section */}
      <main
        id="catalog"
        className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1"
      >
        {/* Mobile Search Input (visible on small screens) */}
        <div className="md:hidden mb-5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bề bề, mực ống, cá thu, bạch tuộc..."
              aria-label="Tìm kiếm hải sản trên di động"
              className="w-full pl-9 pr-4 py-2.5 rounded-DEFAULT border border-light-outline-variant bg-white text-body-md"
            />
            <span className="material-symbols-outlined absolute left-3 top-3 text-light-on-surface/40 text-[18px]">
              search
            </span>
          </div>
        </div>

        {/* Section Title, JSON Manager Trigger & Sort Select */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-headline text-headline-lg-mobile sm:text-headline-lg text-light-primary font-bold">
              Danh Mục Hải Sản Thực Tế Tại Vựa ({products.length} Món)
            </h2>
            <p className="font-body text-body-md text-light-on-surface/70">
              Hình ảnh chụp thực tế tại vựa Hải Sản Yến Hải – Chọn món đặt online hoặc gọi điện / Zalo ship ngay.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sortSelect"
              className="text-body-sm text-light-on-surface/60 font-body"
            >
              Sắp xếp:
            </label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="py-1.5 px-3 rounded-DEFAULT border border-light-outline-variant bg-white text-body-sm font-label focus:ring-1 focus:ring-light-primary"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="rating-desc">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* The 3 Pillar Keyword Badges (From Prompt Guidance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            type="button"
            onClick={() =>
              setSelectedCategory(selectedCategory === 'fresh' ? 'all' : 'fresh')
            }
            className={`p-4 rounded-md text-left transition-all flex items-start gap-3 cursor-pointer border ${
              selectedCategory === 'fresh'
                ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-500/30'
                : 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <span className="text-2xl">🦐</span>
            <div>
              <h4 className="font-label text-label-md font-bold text-emerald-950">
                Nhóm Hải Sản Tươi Trong Ngày
              </h4>
              <p className="font-body text-body-sm text-emerald-800 mt-0.5">
                Gồm: <strong>Mực ống biển tươi</strong>,{' '}
                <strong>Cá thu phấn cắt khoanh giữa</strong>,{' '}
                <strong>Bạch tuộc tươi</strong>, <strong>Bề bề nõn mới hấp</strong>.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              setSelectedCategory(
                selectedCategory === 'frozen' ? 'all' : 'frozen'
              )
            }
            className={`p-4 rounded-md text-left transition-all flex items-start gap-3 cursor-pointer border ${
              selectedCategory === 'frozen'
                ? 'bg-sky-100 border-sky-500 ring-2 ring-sky-500/30'
                : 'bg-sky-50/70 border-sky-200 hover:bg-sky-50'
            }`}
          >
            <span className="text-2xl">❄️</span>
            <div>
              <h4 className="font-label text-label-md font-bold text-sky-950">
                Nhóm Bề Bề Nõn &amp; Cấp Đông Sâu
              </h4>
              <p className="font-body text-body-sm text-sky-800 mt-0.5">
                Gồm: <strong>Bề bề bóc nõn Full Trứng</strong>,{' '}
                <strong>Bề bề nõn đóng khay VIP 500g</strong> giữ trọn 99% độ ngọt tự nhiên.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              setSelectedCategory(selectedCategory === 'dried' ? 'all' : 'dried')
            }
            className={`p-4 rounded-md text-left transition-all flex items-start gap-3 cursor-pointer border ${
              selectedCategory === 'dried'
                ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-500/30'
                : 'bg-amber-50/70 border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span className="text-2xl">🦑</span>
            <div>
              <h4 className="font-label text-label-md font-bold text-amber-950">
                Nhóm Hải Sản Khô Phơi Nắng
              </h4>
              <p className="font-body text-body-sm text-amber-800 mt-0.5">
                Gồm: <strong>Cá khô rút xương phơi nắng tự nhiên</strong>,{' '}
                <strong>hút chân không lịch sự</strong>, không chất bảo quản làm quà biếu.
              </p>
            </div>
          </button>
        </div>

        {/* Empty filter state */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg border border-light-outline-variant p-12 text-center my-6">
            <span className="material-symbols-outlined text-[48px] text-light-outline">
              search_off
            </span>
            <h3 className="font-headline text-title-lg font-bold text-light-primary mt-2">
              Không tìm thấy mặt hàng phù hợp với &quot;{searchQuery}&quot;
            </h3>
            <p className="font-body text-body-md text-light-on-surface/60 mt-1">
              Thử tìm với từ khóa khác hoặc xem toàn bộ danh mục hải sản Yến Hải.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-DEFAULT bg-light-primary text-white font-label text-label-md cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div
            id="productGrid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => {
              const leftBadgeBg =
                product.category === 'fresh'
                  ? 'bg-fresh-green'
                  : product.category === 'frozen'
                  ? 'bg-sky-600'
                  : 'bg-amber-600';

              const rightBadgeClasses =
                product.badgeRightStyle === 'coral'
                  ? 'bg-white/95 text-accent'
                  : product.badgeRightStyle === 'emerald'
                  ? 'bg-emerald-50 text-emerald-800'
                  : product.badgeRightStyle === 'sky'
                  ? 'bg-sky-50 text-sky-800'
                  : 'bg-amber-50 text-amber-900';

              return (
                <article
                  key={product.id}
                  data-category={product.category}
                  itemScope
                  itemType="https://schema.org/Product"
                  className="product-card bg-white rounded-md border border-light-outline-variant overflow-hidden hover:shadow-lg transition-all duration-150 flex flex-col group"
                >
                  <div className="relative w-full h-56 overflow-hidden bg-light-surface-container">
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      itemProp="image"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setQuickViewProduct(product)}
                    />
                    <span
                      className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full ${leftBadgeBg} text-white font-label text-label-sm shadow-xs flex items-center gap-1`}
                    >
                      {product.badgeLeftIcon ? (
                        <span className="material-symbols-outlined text-[14px]">
                          {product.badgeLeftIcon}
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      )}
                      <span>{product.badgeLeft}</span>
                    </span>
                    <span
                      className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded ${rightBadgeClasses} font-label text-label-sm font-bold shadow-xs`}
                    >
                      {product.badgeRight}
                    </span>

                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-light-primary/85 hover:bg-light-primary text-white font-label text-[11px] flex items-center gap-1 backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        tune
                      </span>
                      <span>Chọn quy cách / Sơ chế</span>
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm text-light-on-surface/60 mb-1">
                        <span>{product.subtitle}</span>
                        <span className="text-gold-star font-semibold flex items-center gap-0.5 text-xs tabular-nums">
                          <span
                            className="material-symbols-outlined text-[14px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>{' '}
                          {product.rating.toFixed(1)} ({product.reviewsCount})
                        </span>
                      </div>
                      <h3
                        itemProp="name"
                        className="font-title text-title-md text-light-primary font-bold group-hover:text-accent transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setQuickViewProduct(product)}
                          className="text-left hover:text-accent cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>
                      <p
                        itemProp="description"
                        className="font-body text-body-sm text-light-on-surface/70 mt-1 line-clamp-2"
                      >
                        {product.description}
                      </p>
                    </div>

                    <div
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                      className="mt-4 pt-3 border-t border-light-outline-variant"
                    >
                      <meta itemProp="priceCurrency" content="VND" />
                      <meta itemProp="price" content={String(product.price)} />
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-accent font-headline text-headline-md font-bold tabular-nums">
                            {formatVND(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-light-on-surface/40 line-through ml-1.5 tabular-nums">
                              {formatVND(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-body-sm text-light-on-surface/50">
                          {product.unit}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddProductToCart(product)}
                          className="w-full py-2 px-2 rounded-DEFAULT bg-light-primary-container text-light-primary font-label text-label-md hover:bg-light-primary hover:text-white transition-colors duration-150 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            add_shopping_cart
                          </span>
                          <span>Thêm giỏ</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDirectBuyProduct(product)}
                          className="w-full py-2 px-2 rounded-DEFAULT bg-accent hover:bg-accent-hover text-white font-label text-label-md transition-colors duration-150 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Mua ngay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Custom Consultation & Wholesale Quote Card (8th Grid Slot) */}
            <article className="bg-gradient-to-br from-light-primary via-[#0E355C] to-light-primary text-white rounded-md p-6 flex flex-col justify-between shadow-md">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-white font-label text-label-sm inline-block mb-3">
                  Bán buôn &amp; Bán lẻ
                </span>
                <h3 className="font-headline text-title-lg font-bold text-white mb-2">
                  Cần Hải Sản Gì, Yến Hải Cũng Có!
                </h3>
                <p className="font-body text-body-sm text-white/80 leading-relaxed">
                  Nhận cung cấp sỉ &amp; lẻ Bề bề nõn trứng, Mực ống, Cá thu khoanh, Bạch tuộc, Cá khô cho nhà hàng, quán ăn, gia đình và quà biếu công ty với giá tận gốc.
                </p>

                <ul className="mt-4 space-y-2 text-body-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                      check_circle
                    </span>
                    <span>Quay video trực tiếp khay hàng gửi qua Zalo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                      check_circle
                    </span>
                    <span>Hỗ trợ làm sạch, đóng khay, hút chân không</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                      check_circle
                    </span>
                    <span>Bao ăn 1 đổi 1 nếu không đúng chất lượng</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 space-y-2">
                <a
                  href="tel:0988666888"
                  className="w-full py-2.5 px-3 rounded-DEFAULT bg-fresh-green hover:bg-fresh-green/90 text-white font-label text-label-md flex items-center justify-center gap-2 shadow"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    call
                  </span>
                  <span>Gọi Hotline: 0988.666.888</span>
                </a>
                <button
                  type="button"
                  onClick={() => setConsultModalTopic('Báo giá sỉ Yến Hải')}
                  className="w-full py-2 px-3 rounded-DEFAULT bg-white/10 hover:bg-white/20 border border-white/30 text-white font-label text-label-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  <span>Nhắn tin Zalo / Messenger</span>
                </button>
              </div>
            </article>
          </div>
        )}

        {/* High-Conversion Combo Deals Strip */}
        <section className="mt-12 pt-8 border-t border-light-outline-variant">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-label font-bold text-accent uppercase tracking-wider">
                Ưu đãi đặt theo mâm tiệc &amp; hộp quà
              </span>
              <h2 className="font-headline text-headline-md text-light-primary font-bold mt-0.5">
                Combo Hải Sản Bán Chạy Nhất Tuần (Freeship + Tặng Sốt)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMBO_PACKAGES.map((combo) => (
              <div
                key={combo.id}
                className="bg-white rounded-lg border border-light-outline-variant p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5"
              >
                <div className="relative w-full sm:w-44 h-44 rounded-md overflow-hidden bg-light-surface-container shrink-0">
                  <ResilientImage
                    src={combo.image}
                    alt={combo.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded bg-accent text-white font-label text-label-sm font-bold shadow-xs">
                    {combo.saveBadge}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-label text-ocean-blue font-semibold">
                      {combo.tag}
                    </span>
                    <h3 className="font-headline text-title-lg font-bold text-light-primary mt-0.5">
                      {combo.title}
                    </h3>
                    <p className="text-body-sm text-light-on-surface/70 mt-1">
                      {combo.subtitle}
                    </p>
                    <ul className="mt-2.5 space-y-1 text-body-sm text-light-on-surface">
                      {combo.itemsIncluded.map((line) => (
                        <li key={line} className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-fresh-green text-[16px]">
                            check_circle
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-light-outline-variant flex items-center justify-between gap-3">
                    <div>
                      <span className="font-headline text-headline-md font-extrabold text-accent tabular-nums">
                        {formatVND(combo.price)}
                      </span>
                      <span className="text-body-sm text-light-on-surface/40 line-through ml-2 tabular-nums">
                        {formatVND(combo.originalPrice)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCart((prev) =>
                          addCartItem(prev, {
                            productId: 99,
                            name: combo.title,
                            price: combo.price,
                            img: combo.image,
                            unit: '/ combo',
                            prepNote: 'Tặng kèm sốt ớt xanh + Freeship'
                          })
                        );
                        setIsCartOpen(true);
                      }}
                      className="px-4 py-2 rounded-DEFAULT bg-accent hover:bg-accent-hover text-white font-label text-label-md font-bold shadow-xs cursor-pointer whitespace-nowrap"
                    >
                      Đặt Combo Ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Multi-Channel Sticky Order Bar (Floating Dock) */}
      <aside
        aria-label="Thanh công cụ đặt hàng nhanh"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-2xl bg-light-primary text-white p-2.5 sm:p-3 rounded-xl shadow-2xl border border-white/20 backdrop-blur-md flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 pl-2">
          <div className="w-9 h-9 rounded-full bg-fresh-green text-white flex items-center justify-center shadow shrink-0">
            <span className="material-symbols-outlined text-[20px]">
              headset_mic
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-xs font-label text-white/70">
              Đặt hàng hỏa tốc trong ngày
            </span>
            <span className="font-headline text-label-lg font-bold text-white">
              Yến Hải sẵn sàng phục vụ
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:0988666888"
            className="px-3.5 py-2 rounded-DEFAULT bg-fresh-green hover:bg-fresh-green/90 text-white font-label text-label-sm font-semibold flex items-center gap-1.5 shadow whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span className="hidden md:inline tabular-nums">0988.666.888</span>
            <span className="md:hidden">Gọi</span>
          </a>

          <a
            href="https://zalo.me/0988666888"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-DEFAULT bg-ocean-blue hover:bg-ocean-blue/90 text-white font-label text-label-sm font-semibold flex items-center gap-1.5 shadow whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Zalo</span>
          </a>

          <button
            type="button"
            onClick={() => setConsultModalTopic('Tư vấn nhanh')}
            className="px-3.5 py-2 rounded-DEFAULT bg-accent hover:bg-accent-hover text-white font-label text-label-sm font-semibold flex items-center gap-1.5 shadow cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">
              shopping_cart_checkout
            </span>
            <span>Đặt nhanh</span>
          </button>
        </div>
      </aside>

      {/* Slide-Over Shopping Cart Drawer (Right) */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={() => setCart([])}
        onShowToast={showToast}
      />

      {/* Direct Consultation & Order Modal */}
      <OrderConsultModal
        isOpen={consultModalTopic !== null}
        topic={consultModalTopic || 'Tư vấn nhanh'}
        onClose={() => setConsultModalTopic(null)}
        onCallbackSuccess={(phone) =>
          showToast(`Đã ghi nhận SĐT ${phone}! Yến Hải sẽ gọi lại ngay.`)
        }
      />

      {/* Product Quick View & Prep Customization Modal */}
      <ProductQuickModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddCustomItem}
        onBuyNow={handleBuyCustomItem}
      />

      {/* Checkout Success Toast / Notification */}
      <div
        id="toastNotification"
        role="status"
        aria-live="polite"
        className={`fixed top-5 right-5 z-50 bg-light-primary text-white px-5 py-3 rounded-lg shadow-xl border border-white/20 flex items-center gap-3 transition-all duration-300 ${
          toastMessage
            ? 'translate-y-0 opacity-100'
            : 'translate-y-[-100px] opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-fresh-green text-[24px]">
          check_circle
        </span>
        <div>
          <p id="toastMessage" className="font-label text-label-md font-bold">
            {toastMessage || 'Đã thêm vào giỏ hàng thành công!'}
          </p>
          <p className="font-body text-body-sm text-white/80">
            Bạn có thể mở giỏ hàng để đặt ngay.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light-primary text-white mt-16 pt-12 pb-24 lg:pb-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-accent text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined">sailing</span>
              </div>
              <span className="font-headline text-title-lg font-bold">
                HẢI SẢN YẾN HẢI
              </span>
            </div>
            <p className="font-body text-body-sm text-white/70 leading-relaxed">
              Thế giới hải sản thu nhỏ. Chuyên bán buôn, bán lẻ đa dạng hải sản: Mực ống, Cá thu phấn, Bạch tuộc tươi, Bề bề bóc nõn full trứng và Cá khô một nắng rút xương làm quà biếu.
            </p>
            <p className="font-label text-label-sm text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>{' '}
              Bao ăn, bao tươi 1 đổi 1 tận nơi
            </p>
          </div>

          {/* Pillar Categories */}
          <div className="space-y-3">
            <h4 className="font-headline text-label-lg font-bold text-white uppercase tracking-wider">
              3 Nhóm Sản Phẩm Chính
            </h4>
            <ul className="space-y-2 text-body-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('fresh');
                    scrollToSection('catalog');
                  }}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  🦐 Hải sản tươi trong ngày (Mực ống, Cá thu, Bạch tuộc)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('frozen');
                    scrollToSection('catalog');
                  }}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  ❄️ Hải sản cấp đông VIP (Bề bề nõn full trứng, Khay 500g)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('dried');
                    scrollToSection('catalog');
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  🦑 Hải sản khô phơi tự nhiên (Cá khô rút xương 1 nắng)
                </button>
              </li>
              <li>
                <a
                  href="tel:0988666888"
                  className="text-accent hover:underline font-semibold"
                >
                  📦 Báo giá sỉ cho nhà hàng &amp; đại lý
                </a>
              </li>
            </ul>
          </div>

          {/* Multi-Channel Contact */}
          <div className="space-y-3">
            <h4 className="font-headline text-label-lg font-bold text-white uppercase tracking-wider">
              Kênh Mua Hàng &amp; Đặt Hàng
            </h4>
            <ul className="space-y-2 text-body-sm text-white/80">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-fresh-green text-[18px]">
                  call
                </span>
                <span>
                  Hotline: <strong className="text-white tabular-nums">0988.666.888</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ocean-blue text-[18px]">
                  chat
                </span>
                <span>
                  Zalo đặt hàng:{' '}
                  <strong className="text-white tabular-nums">0988.666.888</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-[18px]">
                  location_on
                </span>
                <span>Vựa chính: Cảng Hải Sản, TP.HCM &amp; Giao toàn quốc</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white/60 text-[18px]">
                  schedule
                </span>
                <span>Giờ mở cửa: 06:00 - 22:00 hàng ngày</span>
              </li>
            </ul>
          </div>

          {/* Payment & Assurance */}
          <div className="space-y-3">
            <h4 className="font-headline text-label-lg font-bold text-white uppercase tracking-wider">
              Hình Thức Thanh Toán
            </h4>
            <p className="font-body text-body-sm text-white/70">
              Hỗ trợ nhận hàng kiểm tra mới thanh toán (COD), chuyển khoản ngân hàng, hoặc quét mã VietQR tiện lợi.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-semibold text-white">
                COD Tận Nơi
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-semibold text-white">
                Chuyển Khoản
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-semibold text-white">
                VietQR
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-body-sm text-white/50">
          <p>© 2026 Hải Sản Yến Hải. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-4">
            <span>Chất lượng loại 1</span>
            <span>•</span>
            <span>Bao ăn 1 đổi 1</span>
            <span>•</span>
            <span>Giá cả bình dân</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
