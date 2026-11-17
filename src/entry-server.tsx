import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import {
  Product,
  PRODUCTS,
  SEO_FAQS,
  CUSTOMER_REVIEWS
} from './lib/store-logic';

export function renderAppHtml(products: Product[] = PRODUCTS): string {
  return renderToString(<App initialProducts={products} />);
}

export function buildStoreJsonLd(
  products: Product[] = PRODUCTS,
  appUrl = ''
): string {
  const baseUrl = appUrl.replace(/\/$/, '');

  const productEntities = products.map((p, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'Product',
      '@id': `${baseUrl}/#${p.slug || `product-${p.id}`}`,
      sku: p.sku || `YH-SP-0${p.id}`,
      name: p.name,
      description: p.description,
      image: [`${baseUrl}${p.image}`],
      brand: {
        '@type': 'Brand',
        name: 'Hải Sản Yến Hải'
      },
      category:
        p.category === 'fresh'
          ? 'Hải Sản Tươi Sống'
          : p.category === 'frozen'
          ? 'Hải Sản Đông Lạnh'
          : 'Hải Sản Khô',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(p.rating),
        bestRating: '5',
        worstRating: '1',
        reviewCount: String(p.reviewsCount)
      },
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/#${p.slug || `product-${p.id}`}`,
        price: String(p.price),
        priceCurrency: 'VND',
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Hải Sản Yến Hải'
        }
      }
    }
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Store',
        '@id': `${baseUrl}/#store`,
        name: 'Hải Sản Yến Hải — Vựa Hải Sản Tươi Sống, Đông Lạnh & Đồ Khô',
        alternateName: 'Yến Hải Seafood',
        description:
          'Hải Sản Yến Hải chuyên cung cấp sỉ & lẻ Mực Ống Biển Tươi, Cá Thu Phấn Cắt Khoanh Giữa, Bạch Tuộc Tươi, Bề Bề (Tôm Tít) Bóc Nõn Full Trứng và Cá Khô Rút Xương Phơi Nắng Tự Nhiên. Cam kết bao ăn 1 đổi 1, giao hỏa tốc 1-2h.',
        url: baseUrl || 'https://haisanyenhai.vn',
        telephone: '+84988666888',
        priceRange: '165.000₫ - 860.000₫',
        openingHours: 'Mo-Su 06:00-22:00',
        image: products.map((p) => `${baseUrl}${p.image}`),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Cảng Hải Sản',
          addressLocality: 'TP. Hồ Chí Minh',
          addressRegion: 'TP.HCM',
          postalCode: '700000',
          addressCountry: 'VN'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          reviewCount: '1062'
        },
        review: CUSTOMER_REVIEWS.map((r) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: r.author
          },
          datePublished: r.datePublished,
          reviewBody: r.comment,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: String(r.rating),
            bestRating: '5'
          }
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Bảng Giá Hải Sản Yến Hải Hôm Nay',
          itemListElement: productEntities
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ Hải Sản Yến Hải',
            item: `${baseUrl}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Hải Sản Tươi Sống, Đông Lạnh & Đồ Khô',
            item: `${baseUrl}/#catalog`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Combo Hải Sản Gia Đình & Quà Biếu',
            item: `${baseUrl}/#comboSection`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: SEO_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  return JSON.stringify(schema, null, 2);
}
