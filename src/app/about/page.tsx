'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, ShieldCheck, Store, Users, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Sprout className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('আমাদের লক্ষ্য ও রূপরেখা', 'Our Mission & Vision')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17251C] tracking-tight leading-tight">
          {t('বাংলার কৃষিকে আধুনিক ও লাভজনক করার ডিজিটাল অঙ্গীকার', 'Digitizing Bengal Agriculture with Trust & Science')}
        </h1>
        <p className="text-sm sm:text-base text-[#68766D] leading-relaxed">
          {t(
            'AgroCare হলো কৃষক, কৃষি উপকরণ ব্যবসায়ী ও বিশেষজ্ঞদের এক সুতোয় গাঁথা সম্পূর্ণ ই-কমার্স ও এগ্রিটেক প্ল্যাটফর্ম। ভেজালমুক্ত আসল পণ্য ও আধুনিক কৃষি প্রযুক্তি প্রত্যেকের দোরগোড়ায় পৌঁছে দেওয়াই আমাদের লক্ষ্য।',
            'A unified hybrid B2B2C ecosystem bridging verified manufacturers, district retail hubs, agronomists, and farming families across India.'
          )}
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-8 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#17251C]">
            {t('১০০% আসল ও প্রত্যয়িত পণ্য', '100% Certified Inputs')}
          </h3>
          <p className="text-xs text-[#68766D] leading-relaxed">
            {t(
              'সরাসরি প্রস্তুতকারক ও সরকারি লাইসেন্সধারী ডিস্ট্রিবিউটরদের থেকে সংগৃহীত। প্রতিটি ব্যাচের মেয়াদ ও গুণগত মান নিশ্চিত করা হয়।',
              'Sourced directly from verified brands and licensed distributors under strict FEFO batch controls.'
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-8 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#17251C]">
            {t('দোকানদারদের হোলসেল হাব (B2B)', 'Agri-Retail Wholesale')}
          </h3>
          <p className="text-xs text-[#68766D] leading-relaxed">
            {t(
              'কৃষি দোকানদারদের জন্য বাল্ক ক্রয়ে টায়ার প্রাইসিং, দ্রুত ইনভয়েসিং এবং সরাসরি গুদাম থেকে নির্ভরযোগ্য সরবরাহ ব্যবস্থা।',
              'Tiered wholesale pricing, bulk dispatch, and transparent commercial invoicing for licensed dealers.'
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-8 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#17251C]">
            {t('বিজ্ঞানসম্মত কৃষি সেবা ও ডক্টর', 'AI Agronomy & Advisory')}
          </h3>
          <p className="text-xs text-[#68766D] leading-relaxed">
            {t(
              'স্মার্ট এআই ক্রপ ডক্টর এবং বিধানচন্দ্র কৃষি বিশ্ববিদ্যালয়ের বিশেষজ্ঞদের সরাসরি চিকিৎসাপত্র ও আবহাওয়ার পূর্বাভাস।',
              'Computer-vision pest diagnosis, verified agronomist panels, and district meteorological warning systems.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

