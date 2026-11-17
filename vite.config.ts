import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { renderAppHtml, buildStoreJsonLd } from './src/entry-server';
import { PRODUCTS } from './src/lib/store-logic';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Pre-renders full SSR/SSG HTML & Schema.org JSON-LD into index.html during build
      {
        name: 'ssg-prerender-html',
        transformIndexHtml(html: string): string {
          try {
            const appHtml = renderAppHtml(PRODUCTS);
            const jsonLd = buildStoreJsonLd(PRODUCTS, process.env.APP_URL || '');
            return html
              .replace(
                /<script id="schema-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/,
                `<script id="schema-jsonld" type="application/ld+json">${jsonLd}</script>`
              )
              .replace(
                /<div id="root">[\s\S]*?<\/div>\s*<!--ssr-end-->/,
                `<div id="root">${appHtml}</div><!--ssr-end-->`
              );
          } catch {
            return html;
          }
        }
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {}
    }
  };
});
