'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/agricultureData';
import {
  Store,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  Package,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  ShoppingCart,
  Percent,
} from 'lucide-react';

function RetailerDashboardContent() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const currentTab = searchParams.get('tab') || 'overview';

  const [quantities, setQuantities] = useState<Record<string, number>>({
    'prod-01': 10,
    'prod-02': 15,
    'prod-03': 20,
    'prod-04': 10,
    'prod-05': 4,
    'prod-06': 2,
  });

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));
  };

  const wholesaleOrders = [
    { id: 'AC-WH-8801', date: '৩০ অক্টোবর ২০২৬', supplier: 'IFFCO বেঙ্গল ডিস্ট্রিবিউটর', items: 'ডিএপি সার (৫০ ব্যাগ)', total: 61000, status: 'প্যাকিং সম্পন্ন (Packed)' },
    { id: 'AC-WH-8742', date: '১৮ অক্টোবর ২০২৬', supplier: 'National Seeds Corp', items: 'স্বর্ণা-সাব১ ধানের বীজ (২০ প্যাকেট)', total: 10200, status: 'ডেলিভারি সম্পন্ন (Delivered)' },
  ];

  const licenses = [
    { type: 'Fertilizer Retail License', number: 'WB/AGR/FL-88901', authority: 'Dept of Agriculture, West Bengal', expiry: '৩১ ডিসেম্বর ২০২৭', status: 'যাচাইকৃত (Verified)' },
    { type: 'Insecticide Sale License', number: 'WB/PEST/RT-44120', authority: 'Licensing Officer, Hooghly', expiry: '১৫ আগস্ট ২০২৮', status: 'যাচাইকৃত (Verified)' },
    { type: 'GSTIN Registration', number: user?.gstNumber || '19AAECD1234F1Z5', authority: 'GST Council India', expiry: 'আজীবন (Active)', status: 'ভেরিফাইড (Active)' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#17251C] text-white p-8 sm:p-10 rounded-3xl shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2A93B] text-[#17251C] text-xs font-black uppercase">
            <Store className="w-3.5 h-3.5" />
            <span>{t('কৃষি দোকানদার পাইকারি পোর্টাল (B2B)', 'Retailer B2B Portal')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {user?.shopName || 'দত্ত কৃষি ভাণ্ডার (Dutta Krishi Bhandar)'}
          </h1>
          <p className="text-xs text-white/70">
            {t('স্বত্বাধিকারী: ', 'Owner: ')} {user?.name || 'অমল দত্ত'} • {user?.location || 'আরামবাগ, হুগলী'} • GSTIN: {user?.gstNumber || '19AAECD1234F1Z5'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/retailer?tab=wholesale"
            className="px-5 py-2.5 rounded-xl bg-[#F2A93B] hover:bg-[#e09322] text-[#17251C] font-black text-xs transition-colors flex items-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('হোলসেল বাজার', 'Wholesale Catalog')}</span>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB: OVERVIEW
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('চলতি মাসে মোট ক্রয়', 'Monthly Purchases')}</span>
                <TrendingUp className="w-4 h-4 text-[#16834A]" />
              </div>
              <p className="text-2xl font-black text-[#16834A]">₹৭১,২০০</p>
              <p className="text-[11px] text-[#106B3B] font-semibold">{t('সাশ্রয়: ₹৮,৫০০ (Wholesale Discount)', 'Saved ₹8,500')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('সক্রিয় বাল্ক অর্ডার', 'Active Bulk Orders')}</span>
                <Package className="w-4 h-4 text-[#F2A93B]" />
              </div>
              <p className="text-2xl font-black text-[#17251C]">১ টি</p>
              <p className="text-[11px] text-[#68766D] font-medium">{t('ট্রাকে লোডিং সম্পন্ন', 'Truck dispatched')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('লাইসেন্স কমপ্লায়েন্স', 'Compliance Status')}</span>
                <ShieldCheck className="w-4 h-4 text-[#16834A]" />
              </div>
              <p className="text-2xl font-black text-[#16834A]">১০০%</p>
              <p className="text-[11px] text-[#16834A] font-semibold">{t('সকল ৩টি লাইসেন্স অনুমোদিত', 'All 3 licenses verified')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('ইনপুট ট্যাক্স ক্রেডিট (ITC)', 'GST ITC Claimable')}</span>
                <FileSpreadsheet className="w-4 h-4 text-[#106B3B]" />
              </div>
              <p className="text-2xl font-black text-[#17251C]">₹৩,৪২০</p>
              <p className="text-[11px] text-[#68766D]">{t('জিএসটিআর-২বি রিফ্লেক্টেড', 'GSTR-2B Ready')}</p>
            </div>
          </div>

          {/* Orders & Licenses split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
                <h2 className="font-extrabold text-base text-[#17251C] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#16834A]" />
                  {t('সাম্প্রতিক পাইকারি ক্রয় (Wholesale Orders)', 'Recent B2B Orders')}
                </h2>
                <Link href="/retailer?tab=orders" className="text-xs font-bold text-[#16834A] hover:underline">
                  {t('সব দেখুন', 'View All')} →
                </Link>
              </div>

              <div className="space-y-4">
                {wholesaleOrders.map((o) => (
                  <div key={o.id} className="p-5 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-[#16834A]">{o.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                        {o.status}
                      </span>
                    </div>
                    <p className="font-bold text-[#17251C]">{o.items}</p>
                    <p className="text-[#68766D]">সরবরাহকারী: {o.supplier} • তারিখ: {o.date}</p>
                    <div className="pt-2 border-t border-[#E4EBE5] flex justify-between items-center">
                      <span className="text-[11px] text-[#68766D]">জিএসটি ইনভয়েস প্রস্তুত</span>
                      <strong className="text-sm font-black text-[#17251C]">₹{o.total.toLocaleString()}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
                <h3 className="font-extrabold text-sm text-[#17251C] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16834A]" />
                  {t('সরকারি ব্যবসা লাইসেন্স', 'Verified Licenses')}
                </h3>
                <Link href="/retailer?tab=licenses" className="text-xs font-bold text-[#16834A] hover:underline">
                  {t('আপলোড করুন', 'Manage')}
                </Link>
              </div>

              <div className="space-y-3">
                {licenses.map((lic, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-[#17251C]">{lic.type}</strong>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {lic.status}
                      </span>
                    </div>
                    <p className="font-mono text-[#68766D]">{lic.number}</p>
                    <p className="text-[10px] text-[#68766D]">মেয়াদ: {lic.expiry}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB: WHOLESALE MARKETPLACE
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'wholesale' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#E4EBE5]">
            <div>
              <h2 className="text-xl font-black text-[#17251C]">
                {t('হোলসেল বাল্ক ক্যাটালগ (Wholesale B2B Catalog)', 'Wholesale B2B Catalog')}
              </h2>
              <p className="text-xs text-[#68766D]">সরাসরি ডিস্ট্রিবিউটর রেটে বাল্ক ক্রয় ও টায়ার ভিত্তিক ছাড়</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
              MOQ ও ভলিউম ডিসকাউন্ট প্রযোজ্য
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((p) => {
              const qty = quantities[p.id] || p.moq;
              const subtotal = p.retailerPrice * qty;
              return (
                <div key={p.id} className="p-5 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-4 flex flex-col justify-between text-xs">
                  <div className="space-y-3">
                    <img src={p.thumbnail} alt={p.nameEn} className="w-full h-36 object-cover rounded-xl" />
                    <div>
                      <span className="text-[10px] font-bold text-[#68766D] uppercase">{p.brand}</span>
                      <h3 className="font-bold text-sm text-[#17251C]">{p.nameBn}</h3>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E4EBE5] space-y-1">
                      <div className="flex justify-between text-[#68766D]">
                        <span>খুচরা MRP: ₹{p.mrp}</span>
                        <span className="text-emerald-700 font-bold">পাইকারি: ₹{p.retailerPrice}</span>
                      </div>
                      <div className="flex justify-between font-bold text-[#17251C]">
                        <span>ন্যূনতম অর্ডার (MOQ): {p.moq} ইউনিট</span>
                        <span className="text-amber-800">সাশ্রয়: ₹{p.mrp - p.retailerPrice}/ইউনিট</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#E4EBE5]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#68766D]">পরিমাণ:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQtyChange(p.id, qty - 1)}
                          className="w-7 h-7 rounded-lg border bg-white font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold">{qty}</span>
                        <button
                          onClick={() => handleQtyChange(p.id, qty + 1)}
                          className="w-7 h-7 rounded-lg border bg-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(p, qty, true);
                        alert(t(`${qty} টি ${p.nameBn} হোলসেল কার্টে যোগ হয়েছে!`, `Added ${qty} units to B2B cart`));
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-soft"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{t('বাল্ক কার্টে যোগ করুন', 'Add to B2B Cart')} (₹{subtotal.toLocaleString()})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB: ORDERS
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6 text-xs">
          <h2 className="text-xl font-black text-[#17251C]">পাইকারি ক্রয় অর্ডার হিস্ট্রি (B2B Purchase Orders)</h2>
          <div className="divide-y divide-[#E4EBE5]">
            {wholesaleOrders.map((o) => (
              <div key={o.id} className="py-4 flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-[#16834A]">{o.id}</span>
                  <p className="font-bold text-[#17251C] text-sm mt-0.5">{o.items}</p>
                  <p className="text-[#68766D]">{o.supplier} • {o.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <strong className="text-base font-black text-[#17251C]">₹{o.total.toLocaleString()}</strong>
                  <span className="block px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full font-bold text-[10px]">
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB: LICENSES
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'licenses' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6 text-xs">
          <div className="flex justify-between items-center pb-4 border-b border-[#E4EBE5]">
            <div>
              <h2 className="text-xl font-black text-[#17251C]">লাইসেন্স ও কমপ্লায়েন্স ডকুমেন্ট</h2>
              <p className="text-[#68766D]">বীজ, সার ও বালাইনাশক বিক্রয়ের জন্য প্রয়োজনীয় সনদপত্র</p>
            </div>
            <button
              onClick={() => alert('নতুন লাইসেন্স আপলোড মডাল খুলছে...')}
              className="px-4 py-2 bg-[#16834A] text-white font-bold rounded-xl"
            >
              + নতুন লাইসেন্স আপলোড
            </button>
          </div>

          <div className="space-y-4">
            {licenses.map((lic, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] flex justify-between items-center">
                <div>
                  <h4 className="font-black text-sm text-[#17251C]">{lic.type}</h4>
                  <p className="font-mono text-xs text-[#68766D]">লাইসেন্স নং: {lic.number}</p>
                  <p className="text-[11px] text-[#68766D]">কর্তৃপক্ষ: {lic.authority} • মেয়াদ: {lic.expiry}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs">
                  {lic.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RetailerDashboard() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs">দোকানদার ড্যাশবোর্ড লোড হচ্ছে...</div>}>
      <RetailerDashboardContent />
    </Suspense>
  );
}
