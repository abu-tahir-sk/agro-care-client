'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/agricultureData';
import {
  Store,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Plus,
  ShoppingCart,
  Percent,
  CheckCircle2,
  AlertCircle,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

export default function WholesalePage() {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top B2B Header */}
      <div className="bg-gradient-to-r from-[#17251C] to-[#16834A] text-white p-8 sm:p-12 rounded-3xl shadow-elevated flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2A93B] text-[#17251C] text-xs font-black uppercase">
            <Store className="w-3.5 h-3.5" />
            {t('কৃষি দোকানদারদের জন্য B2B পোর্টাল', 'Agri-Retailers B2B Portal')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">
            {t('হোলসেল মার্কেটপ্লেস — সরাসরি ডিস্ট্রিবিউটর রেটে বাল্ক ক্রয়', 'Wholesale Agri Hub — Direct Factory Bulk Pricing')}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {t(
              'আপনার সার ও বীজের দোকানের জন্য সাশ্রয়ী হোলসেল রেটে পণ্য অর্ডার করুন। ভলিউম ভিত্তিক ছাড়, জিএসটি ইনভয়েস এবং দ্রুততম ট্রাকে মাল পৌঁছানোর গ্যারান্টি।',
              'Purchase inventory directly from verified manufacturers at distributor rates. Enjoy quantity-tiered discounts, GST tax invoices, and bulk transport logistics.'
            )}
          </p>
        </div>

        {/* Retailer Verification Notice Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-xs space-y-3 shrink-0 lg:w-80">
          <div className="flex items-center gap-2 text-[#F2A93B] font-bold">
            <ShieldCheck className="w-5 h-5" />
            <span>{t('ভেরিফাইড দোকানদার একাউন্ট', 'Verified Retailer Status')}</span>
          </div>
          <p className="text-white/80 leading-relaxed">
            {t(
              'নিয়ন্ত্রিত সার ও কীটনাশক পাইকারি কিনতে আপনার ফার্টিলাইজার/পেস্টিসাইড লাইসেন্স ও জিএসটি নম্বর জমা দিন।',
              'Submit your Fertilizer/Pesticide Trade License & GSTIN to unlock special super-bulk tiers.'
            )}
          </p>
          <Link
            href="/retailer"
            className="block text-center py-2 px-4 rounded-xl bg-[#F2A93B] hover:bg-[#e09322] text-[#17251C] font-bold text-xs transition-colors"
          >
            {t('লাইসেন্স ও জিএসটি আপলোড', 'Upload License & GST')}
          </Link>
        </div>
      </div>

      {/* Feature Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center shrink-0">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#17251C]">{t('ভলিউম ভিত্তিক ছাড়', 'Tiered Bulk Discounts')}</h4>
            <p className="text-xs text-[#68766D]">{t('১০ থেকে ৫০+ পেটিতে অতিরিক্ত শতকরা ছাড়', 'Extra savings on 10 to 50+ units')}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#fef3c7] text-[#F2A93B] flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#17251C]">{t('জিএসটি ইনভয়েস ও বিলিং', 'Official GST Invoicing')}</h4>
            <p className="text-xs text-[#68766D]">{t('আইটিসি (ITC) ইনপুট ট্যাক্স ক্রেডিট সুবিধা', 'Input Tax Credit eligible billing')}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E9F6EE] text-[#106B3B] flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#17251C]">{t('ডোরস্টেপ গোডাউন ডেলিভারি', 'Freight Go-down Delivery')}</h4>
            <p className="text-xs text-[#68766D]">{t('পশ্চিমবঙ্গের সকল ব্লকে সুরক্ষিত পরিবহন', 'Fast transport to all WB blocks')}</p>
          </div>
        </div>
      </div>

      {/* Wholesale Product Table */}
      <div className="bg-white rounded-3xl border border-[#E4EBE5] shadow-card overflow-hidden">
        <div className="p-6 border-b border-[#E4EBE5] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-extrabold text-lg text-[#17251C]">
              {t('পাইকারি কৃষি পণ্য তালিকা (Wholesale Catalog)', 'Wholesale Product Catalog')}
            </h2>
            <p className="text-xs text-[#68766D]">
              {t('সর্বনিম্ন অর্ডার পরিমাণ (MOQ) মেনে অর্ডার কার্টে যোগ করুন।', 'Add products adhering to Minimum Order Quantity (MOQ).')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(t('CSV অর্ডার টেমপ্লেট ডাউনলোড শুরু হয়েছে।', 'CSV bulk template downloading...'))}
              className="px-4 py-2 rounded-xl border border-[#E4EBE5] hover:border-[#16834A] text-xs font-bold text-[#17251C] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#16834A]" />
              <span>{t('CSV অর্ডার টেমপ্লেট', 'CSV Template')}</span>
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF8] text-[#68766D] uppercase text-[11px] font-bold border-b border-[#E4EBE5]">
              <tr>
                <th className="py-3.5 px-6">{t('পণ্য ও ব্র্যান্ড', 'Product & Brand')}</th>
                <th className="py-3.5 px-4">{t('বিভাগ', 'Category')}</th>
                <th className="py-3.5 px-4">{t('খুচরা মূল্য (MRP)', 'Retail MRP')}</th>
                <th className="py-3.5 px-4 text-[#16834A]">{t('হোলসেল দর (Wholesale)', 'Wholesale Rate')}</th>
                <th className="py-3.5 px-4">{t('MOQ', 'MOQ')}</th>
                <th className="py-3.5 px-4 text-center">{t('অর্ডার পরিমাণ', 'Order Qty')}</th>
                <th className="py-3.5 px-6 text-right">{t('একশন', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4EBE5]">
              {mockProducts.map((p) => {
                const qty = quantities[p.id] || p.moq;
                return (
                  <tr key={p.id} className="hover:bg-[#F8FAF8] transition-colors">
                    {/* Product & Brand */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img src={p.thumbnail} alt={p.nameEn} className="w-12 h-12 rounded-xl object-cover border border-[#E4EBE5]" />
                      <div>
                        <Link href={`/product/${p.slug}`} className="font-bold text-[#17251C] hover:text-[#16834A]">
                          {language === 'bn' ? p.nameBn : p.nameEn}
                        </Link>
                        <span className="block text-[11px] text-[#68766D]">{p.brand}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 font-medium text-[#17251C]">
                      {language === 'bn' ? p.categoryBn : p.category}
                    </td>

                    {/* MRP */}
                    <td className="py-4 px-4 text-[#68766D]">
                      ₹{p.mrp}
                    </td>

                    {/* Wholesale Price */}
                    <td className="py-4 px-4 font-black text-[#16834A] text-sm">
                      ₹{p.retailerPrice}
                      <span className="block text-[10px] text-[#68766D] font-normal">
                        ({Math.round(((p.mrp - p.retailerPrice) / p.mrp) * 100)}% মার্জিন)
                      </span>
                    </td>

                    {/* MOQ */}
                    <td className="py-4 px-4 font-bold text-[#17251C]">
                      {p.moq} pcs
                    </td>

                    {/* Quantity Input */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="number"
                        min={p.moq}
                        value={qty}
                        onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value) || p.moq)}
                        className="w-20 p-2 text-center rounded-xl border border-[#E4EBE5] bg-white text-xs font-bold text-[#17251C] focus:outline-none focus:border-[#16834A]"
                      />
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => {
                          addToCart(p, qty, true);
                          alert(t(`${qty} টি ${p.nameBn} হোলসেল ব্যাগে যুক্ত হয়েছে।`, `Added ${qty} units to Wholesale Cart.`));
                        }}
                        className="px-4 py-2 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-bold text-xs transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{t('বাল্ক কার্ট', 'Add Bulk')}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

