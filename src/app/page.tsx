'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { mockProducts, mockCropGuides, mockDistrictsWeather, mockSchemes } from '../data/agricultureData';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/home/HeroSlider';
import {
  Sprout,
  Stethoscope,
  ShoppingBag,
  Store,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight,
  CloudSun,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Users,
  Layers,
  PhoneCall,
  Search,
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();

  const categories = [
    {
      id: 'Fertilizers',
      nameBn: 'রাসায়নিক ও অনুখাদ্য সার',
      nameEn: 'Fertilizers & Nutrients',
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80',
      count: 48,
    },
    {
      id: 'Seeds',
      nameBn: 'উচ্চফলনশীল ও হাইব্রিড বীজ',
      nameEn: 'Hybrid & High-Yield Seeds',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      count: 36,
    },
    {
      id: 'Pesticides',
      nameBn: 'কীটনাশক ও ছত্রাকনাশক',
      nameEn: 'Crop Protection & Pesticides',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
      count: 52,
    },
    {
      id: 'Organic',
      nameBn: 'জৈব সার ও বায়ো-ইনপুট',
      nameEn: 'Organic Inputs & Bio-Fertilizers',
      image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&auto=format&fit=crop&q=80',
      count: 24,
    },
    {
      id: 'Tools',
      nameBn: 'স্প্রেয়ার ও আধুনিক যন্ত্রপাতি',
      nameEn: 'Sprayers & Farm Machinery',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&auto=format&fit=crop&q=80',
      count: 18,
    },
    {
      id: 'Irrigation',
      nameBn: 'ড্রিপ ও মাইক্রো সেচ সরঞ্জাম',
      nameEn: 'Micro & Drip Irrigation',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop&q=80',
      count: 15,
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SLIDER SECTION (FRAMER MOTION) */}
      <HeroSlider />

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#16834A]">
              {t('পণ্য বিভাগ', 'Product Categories')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251C] mt-1">
              {t('প্রয়োজন অনুযায়ী কৃষি উপকরণ বেছে নিন', 'Explore by Agriculture Category')}
            </h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-[#16834A] hover:underline flex items-center gap-1">
            <span>{t('সকল ক্যাটাগরি', 'View All')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group bg-white rounded-2xl p-3 border border-[#E4EBE5] hover:border-[#16834A] hover:shadow-card transition-all text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 bg-[#F8FAF8]">
                <img
                  src={cat.image}
                  alt={cat.nameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-xs text-[#17251C] group-hover:text-[#16834A] transition-colors leading-tight">
                {language === 'bn' ? cat.nameBn : cat.nameEn}
              </h3>
              <span className="text-[11px] text-[#68766D] mt-1">
                {cat.count} {t('পণ্য', 'items')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. B2B WHOLESALE MARKETPLACE BANNER (For Retailers & Shopkeepers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#17251C] via-[#106B3B] to-[#16834A] text-white p-8 sm:p-12 relative overflow-hidden shadow-elevated">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2A93B] text-[#17251C] text-xs font-black uppercase">
              <Store className="w-3.5 h-3.5" />
              {t('কৃষি দোকানদার ও ব্যবসায়ীদের জন্য', 'For Agriculture Retailers & Traders')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white">
              {t('হোলসেল পাইকারি মার্কেটপ্লেস — সরাসরি ডিস্ট্রিবিউটর রেটে কিনুন', 'B2B Wholesale Hub — Direct Distributor Rates')}
            </h2>

            <p className="text-sm text-white/90 leading-relaxed">
              {t(
                'আপনার কৃষি সার ও বীজের দোকানের জন্য কম মূল্যে বাল্ক অর্ডার করুন। MOQ ভিত্তিক বিশেষ ছাড়, জিএসটি ইনভয়েস এবং দ্রুততম সময়ে গোডাউনে ডেলিভারি।',
                'Source inventory at wholesale bulk rates for your agri-retail outlet. Enjoy tiered quantity discounts, GST billing, and priority freight delivery.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/wholesale"
                className="px-6 py-3 rounded-xl bg-[#F2A93B] hover:bg-[#e09322] text-[#17251C] font-black text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                <span>{t('হোলসেল ক্যাটালগ দেখুন', 'Explore Wholesale Catalog')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/retailer"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs transition-colors"
              >
                {t('দোকানদার হিসেবে নিবন্ধন', 'Register as Retailer')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR PRODUCTS (Dual Pricing Demonstration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#16834A]">
              {t('জনপ্রিয় পণ্য', 'Top Selling Agri-Inputs')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251C] mt-1">
              {t('সর্বাধিক বিক্রিত সার, বীজ ও বালাইনাশক', 'Bestselling Fertilizers & Crop Care')}
            </h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-[#16834A] hover:underline flex items-center gap-1">
            <span>{t('সব পণ্য দেখুন', 'Explore All')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. AI CROP DOCTOR BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#E9F6EE] border-2 border-[#16834A]/30 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A] text-white text-xs font-bold uppercase">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t('কৃত্রিম বুদ্ধিমত্তা চালিত শস্য চিকিৎসা', 'AI-Powered Plant Clinic')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#17251C] leading-tight">
              {t('গাছের পাতা বা ডালের ছবি তুলুন, মুহূর্তেই সঠিক রোগ ও প্রতিকার জানুন', 'Snap a Plant Leaf Photo, Get Instant Diagnosis & Remedies')}
            </h2>

            <p className="text-sm text-[#68766D] leading-relaxed max-w-xl">
              {t(
                'আলুর নাবি ধসা, ধানের বাদামী ঘাসফড়িং বা টমেটোর পাতা কোঁকড়ানো রোগ? আপনার স্মার্টফোনে ছবি আপলোড করলেই AgroCare AI নির্ণয় করবে রোগের নাম, আক্রমণের মাত্রা ও অনুমোদিত প্রতিকার ব্যবস্থা।',
                'Instantly detect Late Blight in Potato, BPH in Paddy, or Leaf Curl in Tomato with our computer vision agronomy scanner. Get official dosage and organic care guidelines.'
              )}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/crop-doctor"
                className="px-7 py-3 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-bold text-xs shadow-soft transition-all flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{t('এখনই রোগ পরীক্ষা করুন', 'Scan Crop Now')}</span>
              </Link>
              <Link
                href="/crop-guide"
                className="text-xs font-bold text-[#16834A] hover:underline"
              >
                {t('ফসল রোগের গাইডলাইন পড়ুন', 'Read Disease Library')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-elevated bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80"
                alt="AI Crop Scan Leaf"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-green-500/20 flex flex-col items-center justify-center text-white p-4 text-center">
                <span className="w-12 h-12 rounded-full bg-[#16834A] flex items-center justify-center mb-2 shadow-md animate-pulse">
                  <Stethoscope className="w-6 h-6" />
                </span>
                <span className="font-extrabold text-xs bg-black/60 px-3 py-1 rounded-md">
                  {t('স্ক্যানিং সম্পন্ন: ৯৬% নির্ভুল', 'Scan Complete: 96% Match')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DISTRICT WEATHER & FARMING ADVISORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#16834A]">
              {t('কৃষি আবহাওয়া বুলেটিন', 'Agro-Meteorology')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251C] mt-1">
              {t('পশ্চিমবঙ্গের বিভিন্ন জেলার আবহাওয়া ও কৃষি পরামর্শ', 'District-Wise Weather & Farming Advisory')}
            </h2>
          </div>
          <Link href="/weather" className="text-xs font-bold text-[#16834A] hover:underline flex items-center gap-1">
            <span>{t('সকল জেলা দেখুন', 'View All Districts')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockDistrictsWeather.slice(0, 3).map((w, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E4EBE5] shadow-card space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4EBE5] pb-3">
                <div>
                  <h3 className="font-bold text-base text-[#17251C]">
                    {language === 'bn' ? w.districtBn : w.district}
                  </h3>
                  <span className="text-[11px] text-[#68766D]">{w.condition}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#16834A]">{w.temp}°C</span>
                  <span className="block text-[10px] text-[#68766D]">{t('আর্দ্রতা:', 'Humidity:')} {w.humidity}%</span>
                </div>
              </div>

              <div className="text-xs text-[#17251C] bg-[#F8FAF8] p-3 rounded-xl border border-[#E4EBE5]/60">
                <span className="font-bold text-[#106B3B] block mb-1">
                  🌾 {t('কৃষি পরামর্শ (Advisory):', 'Field Advisory:')}
                </span>
                <p className="text-[#68766D] leading-relaxed">{w.advisoryBn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GOVERNMENT SCHEMES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8FAF8] border border-[#E4EBE5] rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#16834A]">
                {t('কৃষক কল্যাণ ও সরকারি অনুদান', 'Govt Schemes & Subsidies')}
              </span>
              <h2 className="text-2xl font-black text-[#17251C] mt-1">
                {t('পশ্চিমবঙ্গের কৃষকদের জন্য বিশেষ সরকারি প্রকল্প', 'Key Government Agricultural Schemes')}
              </h2>
            </div>
            <Link
              href="/schemes"
              className="px-4 py-2 rounded-xl bg-white border border-[#E4EBE5] hover:border-[#16834A] text-xs font-bold text-[#16834A] transition-colors"
            >
              {t('সব প্রকল্প ও আবেদনের নিয়মাবলী', 'View All Schemes')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockSchemes.map((s) => (
              <div key={s.id} className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E9F6EE] flex items-center justify-center text-[#16834A]">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#17251C]">{language === 'bn' ? s.nameBn : s.nameEn}</h3>
                  <p className="text-xs text-[#16834A] font-bold">{s.financialBenefit}</p>
                  <p className="text-[11px] text-[#68766D] line-clamp-2">{s.eligibilityBn}</p>
                </div>

                <a
                  href={s.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pt-2 text-xs font-bold text-[#106B3B] hover:underline flex items-center gap-1 border-t border-[#E4EBE5]"
                >
                  <span>{t('অফিসিয়াল পোর্টাল ভিজিট করুন', 'Official Portal')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

