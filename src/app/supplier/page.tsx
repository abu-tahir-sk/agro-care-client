'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Package,
  PlusCircle,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

function SupplierDashboardContent() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const currentTab = searchParams.get('tab') || 'overview';

  const mySupplies = [
    { id: 'PO-2026-441', retailer: 'দত্ত কৃষি ভাণ্ডার', product: 'ইফকো ডিএপি সার ১৮:৪৬:০ (৫০ ব্যাগ)', total: 61000, date: '৩০ অক্টোবর ২০২৬', status: 'ডিসপ্যাচ প্রস্তুত (Ready to Dispatch)' },
    { id: 'PO-2026-402', retailer: 'মা তারা এগ্রো সেন্টার', product: 'স্বর্ণা-সাব১ বীজ (২০ প্যাকেট)', total: 10200, date: '২৫ অক্টোবর ২০২৬', status: 'সম্পন্ন (Completed)' },
  ];

  const batches = [
    { batch: 'IFF-2026-B89', product: 'ইফকো ডিএপি সার ১৮:৪৬:০', stock: '৪৫০ ব্যাগ', expiry: '১৫ ডিসেম্বর ২০২৬', priority: 'FEFO উচ্চ অগ্রাধিকার' },
    { batch: 'IFF-2026-B94', product: 'ইফকো ইউরিয়া ৪৫ কেজি', stock: '৮০০ ব্যাগ', expiry: '২০ মার্চ ২০২৭', priority: 'স্বাভাবিক' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#17251C] text-white p-8 sm:p-10 rounded-3xl shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A] text-white text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('সাপ্লায়ার ও প্রস্তুতকারক পোর্টাল', 'Supplier / Distributor Portal')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {user?.name || 'IFFCO বেঙ্গল ডিস্ট্রিবিউটর'}
          </h1>
          <p className="text-xs text-white/70">
            {t('সেন্ট্রাল ডিস্ট্রিবিউটর হাব, কলকাতা • লাইসেন্স ভেরিফাইড', 'Central Distributor Hub, Kolkata • Verified Supplier')}
          </p>
        </div>

        <button
          onClick={() => alert(t('নতুন পণ্য জমা দেওয়ার ফর্ম প্রস্তুত...', 'Product submission opening...'))}
          className="px-5 py-2.5 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('নতুন পণ্য জমা দিন (Submit Product)', 'Submit Product')}</span>
        </button>
      </div>

      {currentTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <span className="text-[#68766D] text-xs font-bold uppercase">{t('মোট সরবরাহ মূল্য', 'Total Supplies Value')}</span>
              <p className="text-2xl font-black text-[#16834A]">₹১৮,৫০,০০০</p>
              <p className="text-[11px] text-[#16834A] font-semibold">{t('চলতি ত্রৈমাসিকে', 'this quarter')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <span className="text-[#68766D] text-xs font-bold uppercase">{t('পেন্ডিং পারচেজ অর্ডার', 'Pending POs')}</span>
              <p className="text-2xl font-black text-[#F2A93B]">১ টি</p>
              <p className="text-[11px] text-[#68766D]">{t('গোডাউনে ডিসপ্যাচ তৈরি', 'Ready for dispatch')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <span className="text-[#68766D] text-xs font-bold uppercase">{t('অনুমোদিত ক্যাটালগ পণ্য', 'Approved Products')}</span>
              <p className="text-2xl font-black text-[#17251C]">১২ টি</p>
              <p className="text-[11px] text-emerald-700 font-bold">{t('সকল আইটেম সক্রিয়', 'All active')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <span className="text-[#68766D] text-xs font-bold uppercase">{t('FEFO ব্যাচ এক্সপায়ারি অ্যালার্ট', 'FEFO Alert')}</span>
              <p className="text-2xl font-black text-rose-600">১ টি ব্যাচ</p>
              <p className="text-[11px] text-rose-700">{t('মেয়াদ ৪২ দিন বাকি', 'Expires in 42 days')}</p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-5">
            <h2 className="text-base font-black text-[#17251C] pb-2 border-b border-[#E4EBE5]">
              {t('সাম্প্রতিক সরবরাহ ও ডিসপ্যাচ তালিকা', 'Recent Purchase Orders')}
            </h2>
            <div className="divide-y divide-[#E4EBE5]">
              {mySupplies.map((s) => (
                <div key={s.id} className="py-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#16834A]">{s.id}</span>
                    <p className="font-bold text-[#17251C] text-sm mt-0.5">{s.product}</p>
                    <p className="text-[#68766D]">ক্রেতা দোকানদার: {s.retailer} • {s.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <strong className="text-base font-black text-[#17251C]">₹{s.total.toLocaleString()}</strong>
                    <span className="block px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full font-bold text-[10px]">
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentTab === 'stock' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6 text-xs">
          <h2 className="text-xl font-black text-[#17251C]">FEFO গুদাম স্টক ও ব্যাচ নিরীক্ষণ</h2>
          <div className="space-y-3">
            {batches.map((b, i) => (
              <div key={i} className="p-4 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-[#16834A]">{b.batch}</span>
                  <h4 className="font-bold text-sm text-[#17251C]">{b.product}</h4>
                  <p className="text-[#68766D]">স্টক: {b.stock} • মেয়াদ: {b.expiry}</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-full">
                  {b.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'orders' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-4 text-xs">
          <h2 className="text-xl font-black text-[#17251C]">ডিসপ্যাচ ও পারচেজ অর্ডার হিস্ট্রি</h2>
          <div className="divide-y divide-[#E4EBE5]">
            {mySupplies.map((s) => (
              <div key={s.id} className="py-4 flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-[#16834A]">{s.id}</span>
                  <p className="font-bold text-[#17251C]">{s.product}</p>
                  <p className="text-[#68766D]">{s.retailer}</p>
                </div>
                <span className="font-black text-sm text-[#17251C]">₹{s.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'licenses' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-4 text-xs">
          <h2 className="text-xl font-black text-[#17251C]">সরবরাহকারী অথরাইজেশন ও অনুমোদন</h2>
          <div className="p-4 rounded-2xl border border-[#E4EBE5] bg-emerald-50 text-emerald-900 space-y-1">
            <span className="font-bold block">IFFCO সেন্ট্রাল ডিস্ট্রিবিউশন লাইসেন্স: WB/MFG/DIST-2026-09</span>
            <p>স্ট্যাটাস: সক্রিয় ও যাচাইকৃত (Valid till Dec 2030)</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SupplierDashboard() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs">সাপ্লায়ার ড্যাশবোর্ড লোড হচ্ছে...</div>}>
      <SupplierDashboardContent />
    </Suspense>
  );
}
