'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { language, t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalAmount } = useCart();

  const deliveryFee = totalAmount > 2000 ? 0 : 150;
  const finalTotal = totalAmount + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-[#17251C]">
          {t('আপনার শপিং কার্ট খালি', 'Your Shopping Cart is Empty')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('কৃষি বাজার বা হোলসেল মার্কেটপ্লেস থেকে পণ্য যোগ করুন।', 'Explore products from retail or wholesale catalog.')}
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-bold shadow-soft transition-all"
        >
          <span>{t('কৃষি বাজার দেখুন', 'Shop Now')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#E4EBE5]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17251C]">
            {t('শপিং ব্যাগ (Shopping Cart)', 'Shopping Cart')}
          </h1>
          <span className="text-xs text-[#68766D]">
            {totalItems} {t('টি আইটেম নির্বাচিত রয়েছে', 'items selected')}
          </span>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-[#DC4242] hover:underline"
        >
          {t('সব মুছুন (Clear All)', 'Clear Cart')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E4EBE5] shadow-card overflow-hidden divide-y divide-[#E4EBE5]">
          {cart.map((item) => {
            const price = item.isWholesale ? item.product.retailerPrice : item.product.sellingPrice;
            return (
              <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.nameEn}
                    className="w-16 h-16 rounded-xl object-cover border border-[#E4EBE5]"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#16834A] uppercase bg-[#E9F6EE] px-2 py-0.5 rounded">
                      {item.isWholesale ? t('হোলসেল অর্ডার', 'Wholesale B2B') : t('খুচরা অর্ডার', 'Retail')}
                    </span>
                    <h3 className="font-bold text-sm text-[#17251C] line-clamp-1">
                      {language === 'bn' ? item.product.nameBn : item.product.nameEn}
                    </h3>
                    <p className="text-xs text-[#68766D] font-mono">
                      ₹{price} × {item.quantity} = <strong className="text-[#17251C]">₹{price * item.quantity}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E4EBE5] rounded-xl bg-[#F8FAF8]">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-white text-[#17251C] rounded-l-xl transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs text-[#17251C]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-white text-[#17251C] rounded-r-xl transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-[#68766D] hover:text-[#DC4242] transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card space-y-5">
          <h2 className="font-extrabold text-base text-[#17251C] pb-3 border-b border-[#E4EBE5]">
            {t('অর্ডার সারসংক্ষেপ', 'Order Summary')}
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-[#68766D]">
              <span>{t('পণ্যের সর্বমোট মূল্য:', 'Subtotal:')}</span>
              <span className="font-bold text-[#17251C]">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-[#68766D]">
              <span>{t('ডেলিভারি চার্জ:', 'Delivery Charge:')}</span>
              <span className="font-bold text-[#16834A]">
                {deliveryFee === 0 ? t('বিনামূল্যে (Free)', 'FREE') : `₹${deliveryFee}`}
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-[10px] text-[#68766D] bg-[#F8FAF8] p-2 rounded-lg">
                💡 {t('₹২,০০০ এর বেশি অর্ডারে ফ্রি ডেলিভারি!', 'Free delivery on orders above ₹2,000!')}
              </p>
            )}
            <div className="pt-3 border-t border-[#E4EBE5] flex justify-between text-sm font-black text-[#17251C]">
              <span>{t('মোট প্রদেয় টাকা:', 'Total Payable:')}</span>
              <span className="text-xl text-[#16834A]">₹{finalTotal}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-extrabold text-xs text-center block shadow-soft transition-all"
          >
            {t('চেকআউট করুন (Proceed to Checkout)', 'Proceed to Checkout')}
          </Link>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#68766D]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
            <span>{t('নিরাপদ ও সরকার অনুমোদিত লেনদেন', 'Secure & Compliant Payment')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

