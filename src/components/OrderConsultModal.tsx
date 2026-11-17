import React, { useState } from 'react';
import { validateVietnamesePhone } from '../lib/store-logic';

interface OrderConsultModalProps {
  isOpen: boolean;
  topic: string;
  onClose: () => void;
  onCallbackSuccess?: (phone: string, topic: string) => void;
}

export const OrderConsultModal: React.FC<OrderConsultModalProps> = ({
  isOpen,
  topic,
  onClose,
  onCallbackSuccess
}) => {
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateVietnamesePhone(phone)) {
      setError('Vui lòng nhập số điện thoại hợp lệ (10 số) để Yến Hải gọi lại!');
      return;
    }
    setError('');
    setSubmitted(true);
    if (onCallbackSuccess) {
      onCallbackSuccess(phone, topic);
    }
    setTimeout(() => {
      setSubmitted(false);
      setPhone('');
      setCustomerName('');
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalProductName"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="rounded-lg bg-white border border-light-outline-variant shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between pb-4 border-b border-light-outline-variant">
            <div>
              <h3
                id="modalProductName"
                className="font-headline text-title-lg font-bold text-light-primary"
              >
                Tư Vấn &amp; Đặt Hàng: {topic}
              </h3>
              <p className="font-body text-body-sm text-light-on-surface/60">
                Giao hàng hỏa tốc 1-2h - Cam kết bao tươi ngon 1 đổi 1
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng hộp thoại tư vấn"
              className="w-8 h-8 rounded-full hover:bg-light-outline-variant flex items-center justify-center text-light-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="py-5 space-y-4">
            {/* Option 1: Hotline Direct Call */}
            <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-fresh-green text-white flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[22px]">call</span>
                </div>
                <div>
                  <p className="font-label text-label-md font-bold text-emerald-950">
                    Gọi Trực Tiếp Hotline 24/7
                  </p>
                  <p className="font-headline text-title-md font-bold text-emerald-700 tabular-nums">
                    0988.666.888
                  </p>
                </div>
              </div>
              <a
                href="tel:0988666888"
                className="px-4 py-2 bg-fresh-green hover:bg-fresh-green/90 text-white font-label text-label-sm font-bold rounded shadow-sm whitespace-nowrap shrink-0"
              >
                Gọi Ngay
              </a>
            </div>

            {/* Option 2: Zalo Order with Video Tank Inspection */}
            <div className="p-4 rounded-md bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-blue text-white flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                </div>
                <div>
                  <p className="font-label text-label-md font-bold text-sky-950">
                    Chat Zalo Báo Giá &amp; Xem Hồ
                  </p>
                  <p className="font-body text-body-sm text-sky-700">
                    Xem video quay trực tiếp hải sản đang bơi tại hồ
                  </p>
                </div>
              </div>
              <a
                href="https://zalo.me/0988666888"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-ocean-blue hover:bg-ocean-blue/90 text-white font-label text-label-sm font-bold rounded shadow-sm whitespace-nowrap shrink-0"
              >
                Mở Zalo
              </a>
            </div>

            {/* Option 3: Quick Form for Direct Delivery / Callback Request */}
            <form
              onSubmit={handleSubmit}
              className="p-4 rounded-md bg-light-surface-container border border-light-outline-variant space-y-3"
            >
              <label
                htmlFor="quickPhoneInput"
                className="block font-label text-label-sm font-bold text-light-primary"
              >
                Hoặc để lại số điện thoại để Yến Hải gọi lại ngay (trong 30 giây):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Tên của bạn (Không bắt buộc)"
                  aria-label="Tên của bạn"
                  className="px-3 py-2 text-body-sm rounded border border-light-outline bg-white focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
                <input
                  type="tel"
                  id="quickPhoneInput"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập số điện thoại của bạn..."
                  aria-label="Số điện thoại nhận tư vấn"
                  className="px-3 py-2 text-body-sm rounded border border-light-outline bg-white focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-accent hover:bg-accent-hover text-white font-label text-label-sm font-bold rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  support_agent
                </span>
                <span>Gửi Yêu Cầu Gọi Lại Ngay</span>
              </button>

              {error && (
                <p
                  role="alert"
                  className="text-xs text-red-600 font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">error</span>
                  <span>{error}</span>
                </p>
              )}

              {submitted && (
                <p
                  id="callbackSuccess"
                  role="status"
                  className="text-xs text-fresh-green font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>
                    Đã gửi! Nhân viên Yến Hải sẽ gọi lại cho bạn ngay lập tức.
                  </span>
                </p>
              )}
            </form>
          </div>

          <div className="pt-3 border-t border-light-outline-variant flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-light-outline text-light-on-surface font-label text-label-sm hover:bg-light-surface-container cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
