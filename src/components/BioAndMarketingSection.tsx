import React, { useState } from 'react';
import {
  BIO_SAMPLES,
  SALES_POST_TEMPLATES
} from '../lib/store-logic';

interface BioAndMarketingSectionProps {
  onShowToast?: (msg: string) => void;
}

export const BioAndMarketingSection: React.FC<BioAndMarketingSectionProps> = ({
  onShowToast
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bio' | 'posts'>('bio');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text.trim());
    setCopiedId(id);
    if (onShowToast) {
      onShowToast('Đã sao chép nội dung vào khay nhớ tạm!');
    }
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  return (
    <section
      id="bioSection"
      className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full"
    >
      <div className="bg-white rounded-lg border-2 border-ocean-blue/30 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-light-outline-variant">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-label-sm font-semibold mb-1">
              <span className="material-symbols-outlined text-[16px] text-ocean-blue">
                content_copy
              </span>
              Tối ưu cho trang Facebook Hải Sản Yến Hải (Dưới 255 ký tự)
            </div>
            <h2 className="font-headline text-headline-md text-light-primary font-bold">
              Mẫu Tiểu Sử (Bio) Facebook &amp; Bài Đăng Chốt Sale 3 Mảng Sản Phẩm
            </h2>
            <p className="font-body text-body-sm text-light-on-surface/70">
              Bấm &quot;Sao chép&quot; để dán trực tiếp vào ô Giới thiệu / Bio Facebook hoặc đăng bài bán hàng ngay.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-light-surface-container rounded-DEFAULT border border-light-outline-variant">
            <button
              type="button"
              onClick={() => setActiveTab('bio')}
              className={`px-3 py-1.5 rounded text-label-sm font-label transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'bio'
                  ? 'bg-light-primary text-white shadow-xs'
                  : 'text-light-on-surface hover:text-light-primary'
              }`}
            >
              3 Mẫu Bio (&lt; 255 ký tự)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('posts')}
              className={`px-3 py-1.5 rounded text-label-sm font-label transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'posts'
                  ? 'bg-light-primary text-white shadow-xs'
                  : 'text-light-on-surface hover:text-light-primary'
              }`}
            >
              Mẫu Bài Đăng Bán Hàng
            </button>
          </div>
        </div>

        {activeTab === 'bio' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BIO_SAMPLES.map((sample, idx) => {
              const isCopied = copiedId === sample.id;
              return (
                <div
                  key={sample.id}
                  className="p-4 rounded-md border border-light-outline-variant bg-light-surface-container flex flex-col justify-between hover:border-light-primary transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-label text-label-sm font-bold ${sample.titleColorClass}`}
                      >
                        {sample.title}
                      </span>
                      <span className="text-xs text-light-on-surface/50 tabular-nums">
                        {sample.charCount} / {sample.maxChars} kt
                      </span>
                    </div>
                    <p
                      id={sample.id}
                      className="font-body text-body-sm text-light-on-surface bg-white p-3 rounded border border-light-outline-variant/60 leading-relaxed select-all"
                    >
                      {sample.content}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(sample.id, sample.content)}
                    className="mt-3 w-full py-2 px-3 rounded bg-white hover:bg-light-primary-container text-light-primary border border-light-outline font-label text-label-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] text-fresh-green">
                          check
                        </span>
                        <span className="text-fresh-green font-bold">
                          Đã sao chép!
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">
                          content_copy
                        </span>
                        <span>Sao chép Mẫu {idx + 1}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SALES_POST_TEMPLATES.map((post) => {
              const isCopied = copiedId === post.id;
              return (
                <div
                  key={post.id}
                  className="p-4 rounded-md border border-light-outline-variant bg-light-surface-container flex flex-col justify-between hover:border-light-primary transition-colors"
                >
                  <div>
                    <span className="font-label text-label-sm font-bold text-light-primary block mb-2">
                      {post.title}
                    </span>
                    <pre className="font-body text-body-sm text-light-on-surface bg-white p-3 rounded border border-light-outline-variant/60 leading-relaxed whitespace-pre-wrap select-all">
                      {post.content}
                    </pre>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(post.id, post.content)}
                    className="mt-3 w-full py-2 px-3 rounded bg-white hover:bg-light-primary-container text-light-primary border border-light-outline font-label text-label-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] text-fresh-green">
                          check
                        </span>
                        <span className="text-fresh-green font-bold">
                          Đã sao chép bài đăng!
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">
                          content_copy
                        </span>
                        <span>Sao chép Bài Đăng</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
