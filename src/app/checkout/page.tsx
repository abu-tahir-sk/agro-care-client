'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, CheckCircle2, ArrowRight, Truck, CreditCard, Banknote } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { cart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'বিপ্লব মণ্ডল',
    phone: user?.phone || '+91 98321 44521',
    address: 'গ্রাম: মঙ্গলকোট, ব্লক: ভাতার',
    district: 'পূর্ব বর্ধমান (Purba Bardhaman)',
    pin: '713125',
  });

  const deliveryFee = totalAmount > 2000 ? 0 : 150;
  const finalTotal = totalAmount + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto shadow-soft animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#17251C]">
            {t('আপনার অর্ডার সফলভাবে গৃহীত হয়েছে!', 'Order Placed Successfully!')}
          </h1>
          <p className="text-xs text-[#68766D] font-mono">
            {t('অর্ডার আইডি:', 'Order ID:')} <strong>AC-ORD-2026-9812</strong>
          </p>
          <p className="text-xs text-[#68766D] max-w-md mx-auto leading-relaxed">
            {t(
              'আপনার নিবন্ধিত মোবাইল নম্বরে এসএমএস এবং হোয়াটসঅ্যাপের মাধ্যমে বিস্তারিত ট্র্যাকিং পাঠানো হয়েছে। ২-৩ কার্যদিবসের মধ্যে পণ্য সরবরাহ করা হবে।',
              'Order confirmation details and live tracking updates have been dispatched via SMS and WhatsApp. Delivery expected within 2-3 business days.'
            )}
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/farmer"
            className="px-6 py-3 rounded-2xl bg-[#16834A] text-white text-xs font-bold hover:bg-[#106B3B] transition-colors"
          >
            {t('ড্যাশবোর্ডে অর্ডার দেখুন', 'View Order in Dashboard')}
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-[#F8FAF8] border border-[#E4EBE5] text-[#17251C] text-xs font-bold hover:bg-white transition-colors"
          >
            {t('হোমপেজে ফিরে যান', 'Back to Home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="max-w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#17251C]">
          {t('নিরাপদ চেকআউট (Secure Checkout)', 'Secure Checkout')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('ডেলিভারি ঠিকানা ও পেমেন্ট পদ্ধতি নিশ্চিত করুন।', 'Confirm delivery location and choose secure payment method.')}
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Delivery Address Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-4">
            <h2 className="font-extrabold text-base text-[#17251C] flex items-center gap-2 pb-3 border-b border-[#E4EBE5]">
              <Truck className="w-4 h-4 text-[#16834A]" />
              {t('১. ডেলিভারি ঠিকানা (Shipping Address)', '1. Shipping Address')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#17251C]">{t('গ্রাহকের নাম:', 'Full Name:')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C] focus:outline-none focus:border-[#16834A]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17251C]">{t('মোবাইল নম্বর:', 'Mobile Phone:')}</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C] focus:outline-none focus:border-[#16834A]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-[#17251C]">{t('গ্রাম / বাড়ি / রাস্তা / ব্লক:', 'Village / Street / Block:')}</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C] focus:outline-none focus:border-[#16834A]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17251C]">{t('জেলা (District):', 'District:')}</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C] focus:outline-none focus:border-[#16834A]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17251C]">{t('পিন কোড (PIN Code):', 'PIN Code:')}</label>
                <input
                  type="text"
                  required
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C] focus:outline-none focus:border-[#16834A]"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-4">
            <h2 className="font-extrabold text-base text-[#17251C] flex items-center gap-2 pb-3 border-b border-[#E4EBE5]">
              <CreditCard className="w-4 h-4 text-[#16834A]" />
              {t('২. পেমেন্ট পদ্ধতি নির্বাচন করুন', '2. Payment Method')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${paymentMethod === 'upi'
                    ? 'border-[#16834A] bg-[#E9F6EE] text-[#106B3B] font-bold shadow-xs'
                    : 'border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C]'
                  }`}
              >
                <span className="font-bold text-sm">UPI (PhonePe / GPay)</span>
                <span className="text-[10px] text-[#68766D]">{t('তাত্ক্ষণিক ক্যাশব্যাক ও ছাড়', 'Instant settlement')}</span>
              </label>

              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${paymentMethod === 'card'
                    ? 'border-[#16834A] bg-[#E9F6EE] text-[#106B3B] font-bold shadow-xs'
                    : 'border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C]'
                  }`}
              >
                <span className="font-bold text-sm">{t('কার্ড / নেট ব্যাংকিং', 'Card / NetBanking')}</span>
                <span className="text-[10px] text-[#68766D]">{t('ডেবিট বা ক্রেডিট কার্ড', 'All banks supported')}</span>
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${paymentMethod === 'cod'
                    ? 'border-[#16834A] bg-[#E9F6EE] text-[#106B3B] font-bold shadow-xs'
                    : 'border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C]'
                  }`}
              >
                <span className="font-bold text-sm">{t('ক্যাশ অন ডেলিভারি (COD)', 'Cash on Delivery')}</span>
                <span className="text-[10px] text-[#68766D]">{t('পণ্য হাতে পেয়ে টাকা দিন', 'Pay on delivery')}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card space-y-5">
          <h3 className="font-extrabold text-base text-[#17251C] pb-3 border-b border-[#E4EBE5]">
            {t('অর্ডার প্রিভিউ', 'Order Review')}
          </h3>

          <div className="space-y-3 text-xs max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center text-xs">
                <span className="text-[#17251C] font-semibold line-clamp-1">
                  {language === 'bn' ? item.product.nameBn : item.product.nameEn} (×{item.quantity})
                </span>
                <span className="font-mono text-[#68766D]">
                  ₹{(item.isWholesale ? item.product.retailerPrice : item.product.sellingPrice) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-3 border-t border-[#E4EBE5] text-xs">
            <div className="flex justify-between text-[#68766D]">
              <span>{t('পণ্যের মূল্য:', 'Subtotal:')}</span>
              <span className="font-bold text-[#17251C]">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-[#68766D]">
              <span>{t('ডেলিভারি ফি:', 'Shipping:')}</span>
              <span className="font-bold text-[#16834A]">
                {deliveryFee === 0 ? t('বিনামূল্যে', 'FREE') : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-[#E4EBE5] flex justify-between text-sm font-black text-[#17251C]">
              <span>{t('সর্বমোট প্রদেয়:', 'Total:')}</span>
              <span className="text-xl text-[#16834A]">₹{finalTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-extrabold text-xs text-center shadow-soft transition-all"
          >
            {t('অর্ডার নিশ্চিত করুন (Place Order)', 'Confirm & Place Order')}
          </button>
        </div>
      </form>
    </div>
  );
}

