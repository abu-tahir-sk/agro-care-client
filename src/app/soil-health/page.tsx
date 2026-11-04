'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, UploadCloud, FileText, CheckCircle2, AlertTriangle, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export default function SoilHealthPage() {
  const { language, t } = useLanguage();

  const [soilParams, setSoilParams] = useState({
    ph: 6.2,
    organicCarbon: 0.58, // in %
    nitrogen: 210, // kg/ha (Low <280)
    phosphorus: 18, // kg/ha (Medium 10-25)
    potassium: 195, // kg/ha (Medium 110-280)
    zinc: 0.65, // ppm (Deficient <0.6)
    boron: 0.45, // ppm (Deficient <0.5)
  });

  const [cardUploaded, setCardUploaded] = useState(false);

  const getStatus = (param: string, val: number) => {
    switch (param) {
      case 'ph':
        return val >= 6.0 && val <= 7.2 ? { label: 'স্বাভাবিক (Ideal)', color: 'text-emerald-700 bg-emerald-50' } : { label: 'অম্লীয় (Acidic)', color: 'text-amber-700 bg-amber-50' };
      case 'nitrogen':
        return val < 280 ? { label: 'স্বল্প (Low Deficit)', color: 'text-rose-700 bg-rose-50' } : { label: 'পরিমিত (Optimal)', color: 'text-emerald-700 bg-emerald-50' };
      case 'organicCarbon':
        return val < 0.75 ? { label: 'কম (Needs Compost)', color: 'text-amber-700 bg-amber-50' } : { label: 'উত্তম (High)', color: 'text-emerald-700 bg-emerald-50' };
      case 'zinc':
        return val < 0.6 ? { label: 'ঘাটতি (Deficient)', color: 'text-rose-700 bg-rose-50' } : { label: 'পর্যাপ্ত (Sufficient)', color: 'text-emerald-700 bg-emerald-50' };
      case 'boron':
        return val < 0.5 ? { label: 'ঘাটতি (Deficient)', color: 'text-rose-700 bg-rose-50' } : { label: 'পর্যাপ্ত (Sufficient)', color: 'text-emerald-700 bg-emerald-50' };
      default:
        return { label: 'স্বাভাবিক (Normal)', color: 'text-emerald-700 bg-emerald-50' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('মৃত্তিকা স্বাস্থ্য কার্ড ও পুষ্টি নিরীক্ষণ', 'Soil Health Card & Soil Nutrients')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('মাটি পরীক্ষা রিপোর্ট ও সুষম সার প্রয়োগ পরিকল্পনা', 'Soil Health Diagnostics & Amendment Plan')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'আপনার জমির মাটির পিএইচ (pH), জৈব কার্বন ও প্রধান পুষ্টি উপাদানের বর্তমান মাত্রা দেখে জমির উর্বরতা রক্ষা করুন এবং ফলন বৃদ্ধি করুন।',
            'Track macro and micro-nutrient profiles from your Govt Soil Health Card to avoid soil poisoning and optimize root development.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6">
          <h2 className="text-lg font-black text-[#17251C]">
            {t('মৃত্তিকা স্বাস্থ্য কার্ড আপলোড করুন', 'Upload Soil Health Card')}
          </h2>

          <div
            onClick={() => setCardUploaded(true)}
            className="border-2 border-dashed border-[#16834A]/40 hover:border-[#16834A] bg-[#E9F6EE]/30 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#17251C]">
                {cardUploaded
                  ? t('✅ ফাইল আপলোড সম্পন্ন: SHC-WB-2026.pdf', '✅ File Uploaded: SHC-WB-2026.pdf')
                  : t('কার্ডের ছবি বা পিডিএফ এখানে ড্রপ করুন', 'Click or drag Soil Health Card (PDF / JPG)')}
              </p>
              <span className="text-[10px] text-[#68766D]">
                {t('সরকারি বা কৃষি বিজ্ঞান কেন্দ্রের নমুনা স্লিপ', 'Govt KVK Soil Test Certificate')}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
            <span className="font-bold text-[#17251C] block">
              {t('নমুনা তথ্য (Sample Record):', 'Sample Soil Record:')}
            </span>
            <p className="text-[#68766D]">
              <strong>প্লট নং:</strong> ১৪৮, মৌজা: মঙ্গলকোট, পূর্ব বর্ধমান • নমুনা তারিখ: ১২ অক্টোবর ২০২৬
            </p>
          </div>
        </div>

        {/* Nutrient Profile Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4EBE5]">
              <h3 className="text-base font-black text-[#17251C]">
                {t('মাটির পুষ্টি উপাদানের মাত্রা (Nutrient Scorecard)', 'Nutrient Scorecard')}
              </h3>
              <span className="text-xs font-bold text-[#16834A] bg-[#E9F6EE] px-2.5 py-1 rounded-full">
                {t('৭ টি প্যারামিটার বিশ্লেষিত', '7 Parameters Analyzed')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* pH */}
              <div className="p-4 rounded-2xl border border-[#E4EBE5] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#68766D]">মাটির পিএইচ (pH)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatus('ph', soilParams.ph).color}`}>
                    {getStatus('ph', soilParams.ph).label}
                  </span>
                </div>
                <p className="text-xl font-black text-[#17251C]">{soilParams.ph}</p>
                <span className="text-[10px] text-[#68766D] block">উপযুক্ত মান: ৬.০ - ৭.২</span>
              </div>

              {/* Organic Carbon */}
              <div className="p-4 rounded-2xl border border-[#E4EBE5] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#68766D]">জৈব কার্বন (Organic Carbon)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatus('organicCarbon', soilParams.organicCarbon).color}`}>
                    {getStatus('organicCarbon', soilParams.organicCarbon).label}
                  </span>
                </div>
                <p className="text-xl font-black text-[#17251C]">{soilParams.organicCarbon} %</p>
                <span className="text-[10px] text-[#68766D] block">ঘাটতি রয়েছে (কম্পোস্ট প্রয়োজন)</span>
              </div>

              {/* Nitrogen */}
              <div className="p-4 rounded-2xl border border-[#E4EBE5] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#68766D]">প্রাপ্য নাইট্রোজেন (Available N)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatus('nitrogen', soilParams.nitrogen).color}`}>
                    {getStatus('nitrogen', soilParams.nitrogen).label}
                  </span>
                </div>
                <p className="text-xl font-black text-rose-600">{soilParams.nitrogen} <span className="text-xs font-normal">কেজি/হেক্টর</span></p>
                <span className="text-[10px] text-[#68766D] block">স্বাভাবিক মান: ২৮০ - ৫৬০</span>
              </div>

              {/* Phosphorus */}
              <div className="p-4 rounded-2xl border border-[#E4EBE5] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#68766D]">ফসফরাস (Available P2O5)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50">
                    পর্যাপ্ত (Good)
                  </span>
                </div>
                <p className="text-xl font-black text-emerald-600">{soilParams.phosphorus} <span className="text-xs font-normal">কেজি/হেক্টর</span></p>
                <span className="text-[10px] text-[#68766D] block">স্বাভাবিক মান: ১০ - ২৫</span>
              </div>

              {/* Zinc */}
              <div className="p-4 rounded-2xl border border-[#E4EBE5] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#68766D]">জিঙ্ক (Zinc Zn)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50">
                    স্বাভাবিক (0.65 ppm)
                  </span>
                </div>
                <p className="text-lg font-black text-[#17251C]">{soilParams.zinc} ppm</p>
              </div>

              {/* Boron */}
              <div className="p-4 rounded-2xl border border-[#E4EBE5] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#68766D]">বোরন (Boron B)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-rose-700 bg-rose-50">
                    ঘাটতি (Deficient)
                  </span>
                </div>
                <p className="text-lg font-black text-rose-600">{soilParams.boron} ppm</p>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="bg-[#E9F6EE] p-5 rounded-2xl border border-[#16834A]/20 space-y-2">
              <span className="text-xs font-black text-[#106B3B] uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16834A]" />
                {t('বিশেষজ্ঞ মৃত্তিকা সংস্কার পরামর্শ (Soil Amendment Advice):', 'Agronomist Recommendations:')}
              </span>
              <ul className="text-xs text-[#17251C] space-y-1.5 list-disc pl-4">
                <li>জমিতে প্রতি বিঘায় অন্তত ৩০০-৪০০ কেজি ভালো পচানো গোবর সার বা কেঁচো সার (Vermicompost) ব্যবহার করুন।</li>
                <li>বোরন ঘাটতি দূর করতে বিঘায় ১.৫ কেজি বোরন ২১% বা বোর্যাক্স শেষ চাষের সময় মাটির সাথে মেশান।</li>
                <li>নাইট্রোজেন ঘাটতি মেটাতে ধানের চারা রোপণের ২৫-৩০ দিন পর ইউরিয়ার সাথে নিম খৈল মিশিয়ে চাপান দিন।</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

