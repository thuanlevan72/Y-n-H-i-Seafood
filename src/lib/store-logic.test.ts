import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCTS,
  INITIAL_CART,
  BIO_SAMPLES,
  filterAndSortProducts,
  addCartItem,
  updateCartItemQty,
  calculateCartTotals,
  validateVietnamesePhone,
  validateCheckoutForm,
  buildZaloOrderMessage,
  parseAndValidateProductsJson
} from './store-logic';

test('catalog loads all 7 uploaded seafood products from JSON with local /assets/aistudio/ images', () => {
  assert.equal(PRODUCTS.length, 7);
  const fresh = PRODUCTS.filter((p) => p.category === 'fresh');
  const frozen = PRODUCTS.filter((p) => p.category === 'frozen');
  const dried = PRODUCTS.filter((p) => p.category === 'dried');
  assert.equal(fresh.length, 4);
  assert.equal(frozen.length, 2);
  assert.equal(dried.length, 1);

  for (const product of PRODUCTS) {
    assert.ok(product.image.startsWith('/assets/aistudio/'));
  }
});

test('parseAndValidateProductsJson validates and normalizes JSON catalog input', () => {
  const validJson = JSON.stringify([
    {
      id: 10,
      name: 'Mực Ống Câu Tươi',
      category: 'fresh',
      price: 320000,
      unit: '/ kg',
      image: '/assets/aistudio/1794885567341_2584028512014311615_2584028512014311615_5156174eb2025c8d42ebf3d33900b3cf_ebfdf389.jpg'
    }
  ]);
  const res = parseAndValidateProductsJson(validJson);
  assert.equal(res.valid, true);
  assert.equal(res.products?.length, 1);
  assert.equal(res.products?.[0].name, 'Mực Ống Câu Tươi');

  const invalidRes = parseAndValidateProductsJson('{"not": "an array"}');
  assert.equal(invalidRes.valid, false);
  assert.ok(invalidRes.error);
});

test('Facebook Bio samples are all under 255 characters', () => {
  assert.equal(BIO_SAMPLES.length, 3);
  for (const sample of BIO_SAMPLES) {
    assert.ok(
      sample.content.length <= 255,
      `Sample ${sample.id} exceeded 255 chars: ${sample.content.length}`
    );
  }
});

test('filterAndSortProducts filters by category, search query, and sorts by price', () => {
  const freshOnly = filterAndSortProducts(PRODUCTS, {
    category: 'fresh',
    searchQuery: '',
    sortBy: 'featured'
  });
  assert.equal(freshOnly.length, 4);

  const searchBeBe = filterAndSortProducts(PRODUCTS, {
    category: 'all',
    searchQuery: 'bề bề',
    sortBy: 'featured'
  });
  assert.equal(searchBeBe.length, 3);

  const sortedAsc = filterAndSortProducts(PRODUCTS, {
    category: 'all',
    searchQuery: '',
    sortBy: 'price-asc'
  });
  assert.equal(sortedAsc[0].price, 165000);
  assert.equal(sortedAsc[sortedAsc.length - 1].price, 350000);
});

test('cart calculations handle initial cart, quantity updates, free shipping threshold, and vouchers', () => {
  const initialTotals = calculateCartTotals(INITIAL_CART);
  assert.equal(initialTotals.totalItems, 3);
  assert.equal(initialTotals.subtotal, 950000);
  assert.equal(initialTotals.isFreeShipping, false);
  assert.equal(initialTotals.shippingFee, 35000);

  const updated = updateCartItemQty(INITIAL_CART, 1, 1);
  const afterIncrement = calculateCartTotals(updated);
  assert.equal(afterIncrement.totalItems, 4);
  assert.equal(afterIncrement.subtotal, 1300000);
  assert.equal(afterIncrement.isFreeShipping, true);

  const added = addCartItem(INITIAL_CART, {
    productId: 5,
    name: 'Cá Khô Rút Xương Phơi Nắng Tự Nhiên',
    price: 240000,
    img: PRODUCTS[4].image
  });
  assert.equal(added.length, 4);
});

test('phone and checkout validation enforce required fields', () => {
  assert.equal(validateVietnamesePhone('0988.666.888'), true);
  assert.equal(validateVietnamesePhone('0912345678'), true);
  assert.equal(validateVietnamesePhone('123'), false);

  const invalidResult = validateCheckoutForm({
    fullName: '',
    phone: '123',
    address: '',
    deliverySlot: '1h-2h',
    paymentMethod: 'cod'
  });
  assert.equal(invalidResult.valid, false);

  const validResult = validateCheckoutForm({
    fullName: 'Nguyễn Văn Hải',
    phone: '0988666888',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    deliverySlot: '1h-2h',
    paymentMethod: 'cod'
  });
  assert.equal(validResult.valid, true);
});

test('buildZaloOrderMessage produces formatted summary', () => {
  const msg = buildZaloOrderMessage(INITIAL_CART, {
    fullName: 'Anh Minh',
    phone: '0909123456',
    address: 'Quận 7, TP.HCM'
  });
  assert.ok(msg.includes('Bề Bề'));
  assert.ok(msg.includes('0909123456'));
});

test('SSR renderAppHtml and buildStoreJsonLd generate complete semantic HTML and Schema.org structured data without client JS', async () => {
  const { renderAppHtml, buildStoreJsonLd } = await import('../entry-server');
  const html = renderAppHtml(PRODUCTS);
  for (const product of PRODUCTS) {
    assert.ok(
      html.includes(product.name),
      `SSR HTML should include product name: ${product.name}`
    );
  }
  assert.ok(html.includes('https://schema.org/Product'));

  const jsonLd = buildStoreJsonLd(PRODUCTS);
  const parsedSchema = JSON.parse(jsonLd);
  assert.equal(parsedSchema['@type'], 'Store');
  assert.equal(parsedSchema.hasOfferCatalog.itemListElement.length, 7);
});

