'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import {
  TrendingUp,
  DollarSign,
  Users,
  Store,
  Building2,
  Package,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Truck,
  Stethoscope,
} from 'lucide-react';

function AdminDashboardContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab') as 'overview' | 'licenses' | 'inventory' | 'users' | null;

  const [activeTab, setActiveTab] = useState<'overview' | 'licenses' | 'inventory' | 'users'>('overview');

  useEffect(() => {
    if (urlTab && ['overview', 'licenses', 'inventory', 'users'].includes(urlTab)) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const pendingLicenses = [
    { id: 'LIC-01', applicant: 'দত্ত কৃষি ভাণ্ডার', owner: 'অমল দত্ত', type: 'Pesticide License Renewal', district: 'হুগলী', date: '০১ নভেম্বর ২০২৬', status: 'Pending Review' },
    { id: 'LIC-02', applicant: 'মা তারা এগ্রো সেন্টার', owner: 'সুমন মণ্ডল', type: 'Seed Dealer License', district: 'পূর্ব বর্ধমান', date: '৩১ অক্টোবর ২০২৬', status: 'Pending Review' },
    { id: 'LIC-03', applicant: 'বরেন্দ্র ফার্টিলাইজার হাব', owner: 'অরুণ ঘোষ', type: 'Fertilizer Wholesale License', district: 'মালদা', date: '৩০ অক্টোবর ২০২৬', status: 'Pending Review' },
  ];

  const expiringBatches = [
    { batch: 'IFF-2026-B89', product: 'ইফকো ডিএপি সার ১৮:৪৬:০', warehouse: 'Kolkata Central Hub', stock: '৪৫০ ব্যাগ', expiry: '১৫ ডিসেম্বর ২০২৬', action: 'FEFO Dispatch Priority' },
    { batch: 'BYR-CF-901', product: 'বায়ার কনফিডোর ২৫০ মিলি', warehouse: 'Burdwan Depot', stock: '১২০ বোতল', expiry: '২০ জানুয়ারি ২০২৭', action: 'Normal' },
  ];

  const systemUsers = [
    { id: 'USR-101', name: 'বিপ্লব মণ্ডল', role: 'Farmer', email: 'biplab@agrocare.in', district: 'পূর্ব বর্ধমান', status: 'Active' },
    { id: 'USR-102', name: 'অরুণ পাল (ঘোষ ট্রেডার্স)', role: 'Retailer', email: 'arun@agrocare.in', district: 'নদীয়া', status: 'Active (Verified)' },
    { id: 'USR-103', name: 'বেঙ্গল এগ্রো সাপ্লাইস', role: 'Supplier', email: 'bengal.agro@agrocare.in', district: 'কলকাতা', status: 'Active' },
    { id: 'USR-104', name: 'ড. শুভাশিস রায়', role: 'Expert', email: 'dr.roy@bckv.ac.in', district: 'নদীয়া', status: 'Active' },
    { id: 'USR-105', name: 'সুজয় দাস', role: 'Delivery', email: 'sujoy.delivery@agrocare.in', district: 'পূর্ব বর্ধমান', status: 'Active' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="bg-[#17251C] text-white p-8 rounded-3xl shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A] text-white text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('সেন্ট্রাল অ্যাডমিন কন্ট্রোল প্যানেল', 'AgroCare Admin Control')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t('অ্যাডমিন ড্যাশবোর্ড — ব্যবসায়িক নিরীক্ষা ও কমপ্লায়েন্স', 'Enterprise Business Analytics & Compliance')}
          </h1>
          <p className="text-xs text-white/70">
            {t('রেভিনিউ, নিট প্রফিট, লাইসেন্স ভেরিফিকেশন ও গুদাম ইনভেন্টরি নিরীক্ষণ কেন্দ্র।', 'Monitor revenue, net profit, regulatory compliance, and FEFO inventory batches.')}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'overview' ? 'bg-[#16834A] text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            {t('ওভারভিউ', 'Overview')}
          </button>
          <button
            onClick={() => setActiveTab('licenses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'licenses' ? 'bg-[#16834A] text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            {t('লাইসেন্স যাচাই (৩)', 'Licenses (3)')}
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'inventory' ? 'bg-[#16834A] text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            {t('FEFO ব্যাচ স্টক', 'FEFO Batches')}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'users' ? 'bg-[#16834A] text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            {t('ইউজার ম্যানেজমেন্ট', 'Users')}
          </button>
        </div>
      </div>

      {/* KPI Cards: Revenue and Profit SEPARATED as strictly mandated in Section 9.1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('মোট রেভিনিউ (Gross Revenue)', 'Gross Revenue')}</span>
          <p className="text-2xl sm:text-3xl font-black text-[#17251C]">₹৪২,৬০,০০০</p>
          <p className="text-[11px] text-[#16834A] font-bold">+১৮.৫% {t('চলতি মাসে বৃদ্ধি', 'growth this month')}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('নিট লাভ (Net Profit)', 'Net Profit')}</span>
          <p className="text-2xl sm:text-3xl font-black text-[#16834A]">₹৪,২০,০০০</p>
          <p className="text-[11px] text-[#68766D] font-medium">{t('অপারেটিং খরচ বাদে নিট মার্জিন ৯.৮%', '9.8% Net Margin')}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('নিবন্ধিত কৃষক ও দোকানদার', 'Farmers & Retailers')}</span>
          <p className="text-2xl sm:text-3xl font-black text-[#17251C]">৫২,৬২০</p>
          <p className="text-[11px] text-[#F2A93B] font-bold">{t('২,৪২০ টি ভেরিফাইড দোকান', '2,420 Retailers')}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('পেন্ডিং লাইসেন্স আবেদন', 'Pending Approvals')}</span>
          <p className="text-2xl sm:text-3xl font-black text-rose-600">৩ টি</p>
          <p className="text-[11px] text-rose-700 font-semibold">{t('যাচাইকরণ প্রয়োজন', 'Requires Admin Review')}</p>
        </div>
      </div>

      {/* Dynamic Tab Views */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Revenue Breakdown */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
            <h2 className="font-extrabold text-base text-[#17251C] pb-3 border-b border-[#E4EBE5]">
              {t('অর্থনৈতিক নিরীক্ষা ও সেলস ডিস্ট্রিবিউশন (Revenue Breakdown)', 'Financial & Sales Breakdown')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-[#E4EBE5] space-y-1">
                <span className="text-[#68766D] block">{t('কৃষক রিটেল সেলস:', 'Farmer Retail Sales:')}</span>
                <span className="text-xl font-black text-[#17251C]">₹১৮,২০,০০০</span>
                <span className="text-[10px] text-[#16834A] block">৪২.৭% {t('মোট বিক্রয়ের', 'of total volume')}</span>
              </div>

              <div className="p-4 bg-[#E9F6EE] rounded-2xl border border-[#16834A]/20 space-y-1">
                <span className="text-[#106B3B] block font-bold">{t('দোকানদার হোলসেল সেলস:', 'Retailer Wholesale:')}</span>
                <span className="text-xl font-black text-[#16834A]">₹২৪,৪০,০০০</span>
                <span className="text-[10px] text-[#106B3B] block">৫৭.৩% {t('বাল্ক ভলিউম', 'bulk volume')}</span>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <span className="text-amber-900 block font-bold">{t('সাপ্লায়ার পেয়্যাবলস:', 'Supplier Payables:')}</span>
                <span className="text-xl font-black text-amber-900">₹৩৫,৭৫,০০০</span>
                <span className="text-[10px] text-amber-800 block">{t('পণ্য ক্রয়ের খরচ', 'Cost of Goods')}</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#68766D] leading-relaxed">
              <p>
                {t(
                  'নোট: AgroCare কেন্দ্রীয় অ্যাকাউন্টিং নিয়মাবলী অনুযায়ী রেভিনিউ এবং প্রফিট আলাদাভাবে পরিগণিত হয়। পণ্যের ক্রয়মূল্য (COGS), পরিবহন খরচ ও অপারেশনাল ব্যয়ের পর নেট প্রফিট নির্ধারিত হয়।',
                  'Policy Note: Revenue and Net Profit are strictly segregated in accordance with AgroCare financial accounting standards.'
                )}
              </p>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card space-y-4">
            <h3 className="font-extrabold text-sm text-[#17251C] flex items-center gap-2 pb-3 border-b border-[#E4EBE5]">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              {t('গুদাম স্টক অ্যালার্ট (Low Stock Alerts)', 'Low Stock Alerts')}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <span className="font-bold text-rose-800 block">স্বর্ণা-সাব১ বীজ (১০ কেজি)</span>
                <p className="text-[11px] text-rose-700">অবশিষ্ট স্টক: মাত্র ১৮ প্যাকেট (বোরো মৌসুমের চাহিদা উচ্চ)</p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-800 block">টার্বো ব্যাটারি স্প্রেয়ার ১৬ লিটার</span>
                <p className="text-[11px] text-amber-700">অবশিষ্ট স্টক: ৬ টি ইউনিট</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Licenses Review Tab */}
      {activeTab === 'licenses' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
            <h2 className="font-extrabold text-base text-[#17251C] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16834A]" />
              {t('দোকানদারদের লাইসেন্স অনুমোদন প্যানেল', 'Retailer License Approvals')}
            </h2>
            <span className="text-xs text-[#68766D]">{pendingLicenses.length} {t('টি আবেদন পর্যালোচনার অপেক্ষায়', 'pending requests')}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF8] text-[#68766D] uppercase text-[10px] font-bold border-b border-[#E4EBE5]">
                <tr>
                  <th className="py-3 px-4">{t('আইডি', 'ID')}</th>
                  <th className="py-3 px-4">{t('দোকানের নাম ও মালিক', 'Business Name')}</th>
                  <th className="py-3 px-4">{t('লাইসেন্সের বিষয়', 'License Subject')}</th>
                  <th className="py-3 px-4">{t('জেলা', 'District')}</th>
                  <th className="py-3 px-4 text-right">{t('অ্যাকশন', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EBE5]">
                {pendingLicenses.map((lic) => (
                  <tr key={lic.id} className="hover:bg-[#F8FAF8]">
                    <td className="py-3 px-4 font-mono font-bold text-[#17251C]">{lic.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#17251C] block">{lic.applicant}</span>
                      <span className="text-[11px] text-[#68766D]">{lic.owner}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#16834A]">{lic.type}</td>
                    <td className="py-3 px-4 text-[#68766D]">{lic.district}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => alert(t(`${lic.applicant}-এর লাইসেন্স অনুমোদিত হলো!`, `Approved license for ${lic.applicant}!`))}
                        className="px-3 py-1 rounded-lg bg-[#16834A] text-white font-bold text-[11px] hover:bg-[#106B3B]"
                      >
                        {t('অনুমোদন (Approve)', 'Approve')}
                      </button>
                      <button
                        onClick={() => alert(t(`${lic.applicant}-এর আবেদন বাতিল করা হয়েছে।`, `Rejected application.`))}
                        className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 font-bold text-[11px] hover:bg-rose-100"
                      >
                        {t('বাতিল', 'Reject')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FEFO Batch Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
            <div>
              <h2 className="font-extrabold text-base text-[#17251C]">
                {t('FEFO ব্যাচ ও এক্সপায়রি ব্যবস্থাপনা (First Expiry, First Out)', 'FEFO Batch & Expiry Management')}
              </h2>
              <p className="text-xs text-[#68766D]">
                {t('যে ব্যাচের মেয়াদ আগে শেষ হবে, সেটি আগে ডিসপ্যাচ করার বাধ্যতামূলক নীতি।', 'Strict First-Expiry, First-Out dispatch prioritization.')}
              </p>
            </div>
            <span className="text-xs bg-[#E9F6EE] text-[#16834A] font-bold px-3 py-1 rounded-full">
              FEFO ACTIVE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF8] text-[#68766D] uppercase text-[10px] font-bold border-b border-[#E4EBE5]">
                <tr>
                  <th className="py-3 px-4">{t('ব্যাচ নম্বর', 'Batch No')}</th>
                  <th className="py-3 px-4">{t('পণ্যের নাম', 'Product')}</th>
                  <th className="py-3 px-4">{t('ওয়্যারহাউস', 'Warehouse')}</th>
                  <th className="py-3 px-4">{t('মজুদ স্টক', 'Stock')}</th>
                  <th className="py-3 px-4">{t('মেয়াদোত্তীর্ণের তারিখ', 'Expiry Date')}</th>
                  <th className="py-3 px-4 text-right">{t('ডিসপ্যাচ অগ্রাধিকার', 'Priority')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EBE5]">
                {expiringBatches.map((b, i) => (
                  <tr key={i} className="hover:bg-[#F8FAF8]">
                    <td className="py-3 px-4 font-mono font-bold text-[#17251C]">{b.batch}</td>
                    <td className="py-3 px-4 font-bold text-[#17251C]">{b.product}</td>
                    <td className="py-3 px-4 text-[#68766D]">{b.warehouse}</td>
                    <td className="py-3 px-4 font-semibold text-[#16834A]">{b.stock}</td>
                    <td className="py-3 px-4 font-bold text-amber-700">{b.expiry}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="bg-[#E9F6EE] text-[#106B3B] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {b.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Management Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
            <div>
              <h2 className="font-extrabold text-base text-[#17251C]">
                {t('সেন্ট্রাল ইউজার ডিরেক্টরি ও রোল অ্যাসাইনমেন্ট', 'User Directory & Roles')}
              </h2>
              <p className="text-xs text-[#68766D]">
                {t('কৃষক, খুচরা বিক্রেতা, সরবরাহকারী, বিশেষজ্ঞ ও ডেলিভারি কর্মীদের তালিকা।', 'List of all platform stakeholders and their operational status.')}
              </p>
            </div>
            <span className="text-xs bg-[#E9F6EE] text-[#16834A] font-bold px-3 py-1 rounded-full">
              {systemUsers.length} Users
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF8] text-[#68766D] uppercase text-[10px] font-bold border-b border-[#E4EBE5]">
                <tr>
                  <th className="py-3 px-4">{t('ইউজার আইডি', 'User ID')}</th>
                  <th className="py-3 px-4">{t('নাম ও ইমেইল', 'Name & Email')}</th>
                  <th className="py-3 px-4">{t('রোল', 'Role')}</th>
                  <th className="py-3 px-4">{t('জেলা', 'District')}</th>
                  <th className="py-3 px-4">{t('স্ট্যাটাস', 'Status')}</th>
                  <th className="py-3 px-4 text-right">{t('অ্যাকশন', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EBE5]">
                {systemUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F8FAF8]">
                    <td className="py-3 px-4 font-mono font-bold text-[#17251C]">{u.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#17251C] block">{u.name}</span>
                      <span className="text-[11px] text-[#68766D]">{u.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#68766D]">{u.district}</td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-[#16834A] font-bold">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => alert(`Viewing user profile: ${u.name}`)}
                        className="px-3 py-1 rounded-lg border border-[#E4EBE5] text-[11px] font-bold hover:bg-slate-50 text-[#17251C]"
                      >
                        {t('প্রোফাইল', 'View')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-[#68766D]">Loading Admin Console...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
