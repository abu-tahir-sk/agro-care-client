'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { useCart } from '../../../context/CartContext';
import { mockProducts } from '../../../data/agricultureData';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const product = mockProducts.find((p) => p.slug === slug) || mockProducts[0];
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'usage' | 'safety' | 'wholesale'>('desc');

  const discountPercent = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#68766D] flex items-center gap-2">
        <Link href="/" className="hover:text-[#16834A]">{t('হোম', 'Home')}</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#16834A]">{t('কৃষি বাজার', 'Shop')}</Link>
        <span>/</span>
        <span className="text-[#17251C] font-semibold">{language === 'bn' ? product.nameBn : product.nameEn}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="h-96 rounded-3xl overflow-hidden bg-[#F8FAF8] border border-[#E4EBE5] relative shadow-card">
            <img
              src={product.thumbnail}
              alt={product.nameEn}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-[#F2A93B] text-[#17251C] text-xs font-black px-3 py-1 rounded-md shadow-xs">
                {discountPercent}% {t('ছাড়', 'OFF')}
              </span>
            )}
            {product.licenseRequired && (
              <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F2A93B]" />
                {t('নিয়ন্ত্রিত কৃষি পণ্য', 'Regulated Product')}
              </span>
            )}
          </div>
        </div>

        {/* Right Product Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16834A] uppercase tracking-wider bg-[#E9F6EE] px-3 py-1 rounded-full inline-block">
              {language === 'bn' ? product.categoryBn : product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#17251C] leading-snug">
              {language === 'bn' ? product.nameBn : product.nameEn}
            </h1>
            <div className="flex items-center gap-4 text-xs text-[#68766D]">
              <span className="font-semibold text-[#17251C]">{t('প্রস্তুতকারক: ', 'Manufacturer: ')}{product.manufacturer}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-[#F2A93B]">
                <Star className="w-4 h-4 fill-[#F2A93B]" />
                <span className="font-bold text-[#17251C]">{product.rating}</span>
                <span>({product.reviewCount} {t('রিভিউ', 'reviews')})</span>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#F8FAF8] p-5 rounded-2xl border border-[#E4EBE5] space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#16834A]">₹{product.sellingPrice}</span>
              <span className="text-sm text-[#68766D] line-through">MRP ₹{product.mrp}</span>
              <span className="text-xs font-bold text-[#16834A]">
                {t('(কৃষক খুচরা মূল্য • প্রতি প্যাকেট/ব্যাগ)', '(Farmer Retail Price per unit)')}
              </span>
            </div>

            {/* Wholesale Tier Notice for Retailers */}
            <div className="pt-2 border-t border-[#E4EBE5] flex items-center justify-between text-xs">
              <div className="text-[#106B3B] font-bold flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#16834A]" />
                <span>{t('দোকানদারদের হোলসেল দর: ', 'Retailer Wholesale Rate: ')} <strong>₹{product.retailerPrice}</strong></span>
              </div>
              <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-[#16834A]/30 text-[#17251C]">
                MOQ: {product.moq} pcs
              </span>
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#E4EBE5]">
              <span className="text-[#68766D] block">{t('সক্রিয় উপাদান:', 'Active Ingredients:')}</span>
              <span className="font-bold text-[#17251C]">{product.activeIngredients}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E4EBE5]">
              <span className="text-[#68766D] block">{t('উপযুক্ত ফসল:', 'Suitable Crops:')}</span>
              <span className="font-bold text-[#17251C]">{product.suitableCrops.join(', ')}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <div className="flex items-center border border-[#E4EBE5] rounded-xl bg-[#F8FAF8] self-stretch sm:self-auto">
              <button
                onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-white text-[#17251C] rounded-l-xl transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-sm text-[#17251C]">
                {selectedQty}
              </span>
              <button
                onClick={() => setSelectedQty((q) => q + 1)}
                className="p-3 hover:bg-white text-[#17251C] rounded-r-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, selectedQty, false);
                alert(t(`${selectedQty} টি পণ্য ব্যাগে যোগ করা হয়েছে!`, `Added ${selectedQty} units to Cart!`));
              }}
              className="flex-1 w-full py-3.5 px-6 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-extrabold text-xs shadow-soft transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t('কার্টে যোগ করুন (Add to Cart)', 'Add to Cart')}</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E4EBE5] text-[11px] text-[#68766D]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16834A]" />
              <span>{t('১০০% খাঁটি পণ্য', '100% Genuine')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#16834A]" />
              <span>{t('দ্রুত মাঠ ডেলিভারি', 'Fast Delivery')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#16834A]" />
              <span>{t('সহজ রিটার্ন পলিসি', 'Easy Returns')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Usage Instructions, Safety Precautions, Wholesale Tiers */}
      <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center gap-4 border-b border-[#E4EBE5] overflow-x-auto text-xs font-bold pb-2">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'desc' ? 'border-[#16834A] text-[#16834A]' : 'border-transparent text-[#68766D] hover:text-[#17251C]'
            }`}
          >
            {t('পণ্যের বিবরণ', 'Product Description')}
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'usage' ? 'border-[#16834A] text-[#16834A]' : 'border-transparent text-[#68766D] hover:text-[#17251C]'
            }`}
          >
            {t('প্রয়োগ পদ্ধতি ও ডোজ', 'Usage & Application')}
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'safety' ? 'border-[#16834A] text-[#16834A]' : 'border-transparent text-[#68766D] hover:text-[#17251C]'
            }`}
          >
            {t('নিরাপত্তা সতর্কতা ও লেবেল', 'Safety Instructions')}
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'wholesale' ? 'border-[#16834A] text-[#16834A]' : 'border-transparent text-[#68766D] hover:text-[#17251C]'
            }`}
          >
            {t('হোলসেল প্রাইসিং টায়ার (B2B)', 'Wholesale Pricing Tiers')}
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-xs leading-relaxed text-[#17251C]">
          {activeTab === 'desc' && (
            <p className="text-sm text-[#68766D]">
              {language === 'bn' ? product.descriptionBn : product.descriptionEn}
            </p>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-3 bg-[#E9F6EE] p-5 rounded-2xl border border-[#16834A]/20">
              <h4 className="font-bold text-sm text-[#106B3B]">{t('ব্যবহারবিধি ও কৃষি বিজ্ঞানীদের পরামর্শ:', 'Application Guidelines:')}</h4>
              <p className="text-[#17251C]">{product.usageInstructionsBn}</p>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-3 bg-amber-50 p-5 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-sm text-amber-900">{t('সংরক্ষণ ও নিরাপত্তা সতর্কতা:', 'Safety & Storage Precautions:')}</h4>
              <p className="text-amber-950">{product.safetyInstructionsBn}</p>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="space-y-4">
              <p className="text-xs text-[#68766D]">
                {t('দোকানদারদের জন্য নির্ধারিত ভলিউম ভিত্তিক হোলসেল রেট:', 'Volume-based wholesale pricing structure for verified retailers:')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.tierPricing.map((tier, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-center space-y-1">
                    <span className="text-[10px] font-bold text-[#68766D] uppercase block">
                      {tier.minQty}+ {t('প্যাকেট / ব্যাগ', 'Units')}
                    </span>
                    <span className="text-lg font-black text-[#16834A]">₹{tier.pricePerUnit}</span>
                    <span className="block text-[10px] text-[#16834A]">{t('প্রতি পিসের দাম', 'per unit')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

