'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Calculator, Sprout, Award, CheckCircle2, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';

export default function FertilizerCalculatorPage() {
  const { language, t } = useLanguage();

  const [crop, setCrop] = useState('potato');
  const [unit, setUnit] = useState<'bigha' | 'acre'>('bigha');
  const [area, setArea] = useState<number>(3);
  const [soilFertility, setSoilFertility] = useState<'normal' | 'low' | 'high'>('normal');

  // Baseline recommended doses per Bigha (approx 0.33 acre in Bengal)
  // [Urea, DAP, MOP, Organic Compost] in kg
  const cropDoses: Record<string, { urea: number; dap: number; mop: number; compost: number; nameBn: string; nameEn: string }> = {
    potato: { urea: 35, dap: 50, mop: 30, compost: 500, nameBn: 'আলু (Potato)', nameEn: 'Potato' },
    paddy: { urea: 25, dap: 20, mop: 15, compost: 300, nameBn: 'আমন/বোরো ধান (Paddy)', nameEn: 'Paddy / Rice' },
    tomato: { urea: 20, dap: 25, mop: 20, compost: 400, nameBn: 'টমেটো (Tomato)', nameEn: 'Tomato' },
    mustard: { urea: 15, dap: 20, mop: 10, compost: 250, nameBn: 'সরিষা (Mustard)', nameEn: 'Mustard' },
    wheat: { urea: 30, dap: 25, mop: 15, compost: 300, nameBn: 'গম (Wheat)', nameEn: 'Wheat' },
    maize: { urea: 40, dap: 30, mop: 25, compost: 400, nameBn: 'ভুট্টা (Maize)', nameEn: 'Maize' },
  };

  const multiplier = unit === 'acre' ? 3 : 1;
  const fertilityFactor = soilFertility === 'low' ? 1.2 : soilFertility === 'high' ? 0.85 : 1.0;

  const currentDose = cropDoses[crop] || cropDoses.potato;
  const totalUrea = Math.round(currentDose.urea * area * multiplier * fertilityFactor);
  const totalDap = Math.round(currentDose.dap * area * multiplier * fertilityFactor);
  const totalMop = Math.round(currentDose.mop * area * multiplier * fertilityFactor);
  const totalCompost = Math.round(currentDose.compost * area * multiplier * fertilityFactor);

  // Approximate cost estimation in INR
  const estimatedCost = Math.round(totalUrea * 6 + totalDap * 27 + totalMop * 34);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('বৈজ্ঞানিক কৃষি সার ক্যালকুলেটর', 'Smart Fertilizer Calculator')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('জমির পরিমাপ অনুযায়ী নির্ভুল সার প্রয়োগ নির্দেশিকা', 'Precision Fertilizer Dosage & Cost Estimator')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'বিধানচন্দ্র কৃষি বিশ্ববিদ্যালয় (BCKV) ও রাজ্য কৃষি দপ্তরের প্রামাণ্য ফর্মুলা অনুযায়ী ইউরিয়া, ডিএপি ও পটাশ সারের সঠিক মাত্রা গণনা করুন। অপচয় রোধ করুন ও খরচ বাঁচান।',
            'Compute exact chemical and organic fertilizer requirements per Bigha or Acre to avoid soil degradation and maximize harvest margins.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6">
          <h2 className="text-lg font-black text-[#17251C] border-b border-[#E4EBE5] pb-3">
            {t('জমির প্যারামিটার নির্বাচন করুন', 'Input Parameters')}
          </h2>

          <div className="space-y-4 text-xs">
            {/* Crop Select */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#17251C]">{t('ফসল নির্বাচন (Select Crop):', 'Crop:')}</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs font-bold bg-white"
              >
                {Object.entries(cropDoses).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.nameBn}
                  </option>
                ))}
              </select>
            </div>

            {/* Land Area & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#17251C]">{t('জমির পরিমাণ:', 'Land Area:')}</label>
                <input
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={area}
                  onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-[#17251C]">{t('একক (Unit):', 'Unit:')}</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'bigha' | 'acre')}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs font-bold bg-white"
                >
                  <option value="bigha">{t('বিঘা (Bigha)', 'Bigha')}</option>
                  <option value="acre">{t('একর (Acre)', 'Acre')}</option>
                </select>
              </div>
            </div>

            {/* Soil Health Condition */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#17251C]">{t('মাটির উর্বরতা অবস্থা (Soil Fertility):', 'Soil Fertility Level:')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', labelBn: 'কম উর্বর', labelEn: 'Low' },
                  { id: 'normal', labelBn: 'স্বাভাবিক', labelEn: 'Normal' },
                  { id: 'high', labelBn: 'উচ্চ উর্বর', labelEn: 'High' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSoilFertility(f.id as any)}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${soilFertility === f.id
                        ? 'border-[#16834A] bg-[#E9F6EE] text-[#16834A]'
                        : 'border-[#E4EBE5] text-[#68766D]'
                      }`}
                  >
                    {t(f.labelBn, f.labelEn)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" />
              {t('প্রয়োগের সময়সূচী পরামর্শ:', 'Application Schedule Tip:')}
            </span>
            <p className="leading-relaxed">
              {t(
                'ডিএপি ও পটাশ সার জমি তৈরির শেষ চাষে প্রয়োগ করুন। ইউরিয়া সার ২ থেকে ৩ কিস্তিতে চাপান সার হিসেবে দিন।',
                'Apply full DAP & MOP as basal dose during field preparation. Split Urea into 2-3 top dressing splits.'
              )}
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 bg-[#17251C] text-white rounded-3xl p-6 sm:p-8 shadow-elevated flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#F2A93B] font-bold">
                  {t('প্রস্তাবিত মোট সার বরাদ্দ', 'Recommended Fertilizer Dosage')}
                </span>
                <h3 className="text-xl font-black">{currentDose.nameBn}</h3>
              </div>
              <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full">
                {area} {unit === 'bigha' ? 'বিঘা' : 'একর'}
              </span>
            </div>

            {/* Dosages Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] text-white/70 font-medium">ইউরিয়া (Urea 46% N)</span>
                <p className="text-2xl font-black text-emerald-400">{totalUrea} <span className="text-sm font-normal">কেজি</span></p>
                <span className="text-[10px] text-white/50 block">২ কিস্তিতে প্রয়োগ করুন</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] text-white/70 font-medium">ডিএপি (DAP 18:46:0)</span>
                <p className="text-2xl font-black text-amber-400">{totalDap} <span className="text-sm font-normal">কেজি</span></p>
                <span className="text-[10px] text-white/50 block">জমি তৈরির সময় সম্পূর্ণ</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] text-white/70 font-medium">পটাশ (MOP 60% K)</span>
                <p className="text-2xl font-black text-rose-400">{totalMop} <span className="text-sm font-normal">কেজি</span></p>
                <span className="text-[10px] text-white/50 block">শিকড় ও দানা মজবুত করে</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] text-white/70 font-medium">জৈব কম্পোস্ট বা গোবর সার</span>
                <p className="text-2xl font-black text-lime-400">{totalCompost} <span className="text-sm font-normal">কেজি</span></p>
                <span className="text-[10px] text-white/50 block">মাটির স্বাস্থ্য ঠিক রাখে</span>
              </div>
            </div>

            {/* Total Estimated Cost */}
            <div className="p-4 bg-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-white/70 block">{t('আনুমানিক রাসায়নিক সার ব্যয়:', 'Estimated Fertilizer Cost:')}</span>
                <strong className="text-2xl font-black text-[#F2A93B]">₹{estimatedCost}</strong>
              </div>
              <span className="text-[10px] text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                সরকারি ভর্তুকি রেট আনুমানিক
              </span>
            </div>
          </div>

          <Link
            href="/shop"
            className="w-full py-3.5 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-xs shadow-soft transition-all text-center flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('AgroCare থেকে আসল সার অর্ডার করুন', 'Order Verified Fertilizers Now')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

