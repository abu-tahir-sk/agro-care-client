'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { mockCropGuides } from '../../data/agricultureData';
import { BookOpen, Calendar, Droplets, Sprout, ShieldAlert, Award } from 'lucide-react';

export default function CropGuidePage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('কৃষি জ্ঞান ও ফসল চাষ নির্দেশিকা', 'Crop Cultivation Knowledge Hub')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('ফসল চাষ পদ্ধতি ও বিশেষজ্ঞ সার-সেচ গাইডলাইন', 'Scientific Agronomy & Fertilizer Calendar')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'পশ্চিমবঙ্গের মাটি ও আবহাওয়া উপযোগী প্রধান প্রধান ফসলের আধুনিক চাষ প্রণালী। জমি তৈরি, বীজ শোধন, সার প্রয়োগ এবং রোগবালাই দমনের নির্ভুল তথ্য।',
            'Practical agronomy recommendations tailored to West Bengal agro-climatic zones, soil types, and seasonal crop cycles.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockCropGuides.map((crop) => (
          <div key={crop.id} className="bg-white rounded-3xl border border-[#E4EBE5] overflow-hidden shadow-card flex flex-col justify-between">
            <div>
              {/* Image & Title */}
              <div className="relative h-56 w-full bg-slate-900">
                <img src={crop.image} alt={crop.nameEn} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-[#16834A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1 inline-block">
                    {crop.season}
                  </span>
                  <h3 className="text-xl font-black">{crop.nameBn}</h3>
                </div>
              </div>

              {/* Data Rows */}
              <div className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E4EBE5]">
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('উপযুক্ত মাটি:', 'Suitable Soil:')}</span>
                    <span className="font-bold text-[#17251C]">{crop.suitableSoil}</span>
                  </div>
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('গড় ফলন:', 'Average Yield:')}</span>
                    <span className="font-bold text-[#16834A]">{crop.avgYield}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E4EBE5]">
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('বপন সময়:', 'Sowing Period:')}</span>
                    <span className="font-bold text-[#17251C]">{crop.sowingPeriod}</span>
                  </div>
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('ফসল তোলার সময়:', 'Harvest Period:')}</span>
                    <span className="font-bold text-[#17251C]">{crop.harvestPeriod}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#68766D] font-medium flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-[#16834A]" /> {t('সেচ ব্যবস্থা:', 'Irrigation Needs:')}
                  </span>
                  <p className="font-semibold text-[#17251C] bg-[#F8FAF8] p-2 rounded-xl border border-[#E4EBE5]">
                    {crop.waterRequirement}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[#68766D] font-medium flex items-center gap-1">
                    <Sprout className="w-3.5 h-3.5 text-[#16834A]" /> {t('প্রস্তাবিত সার সুপারিশ:', 'Recommended Fertilizer:')}
                  </span>
                  <p className="font-semibold text-[#106B3B] bg-[#E9F6EE] p-2 rounded-xl border border-[#16834A]/20">
                    {crop.recommendedFertilizer}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[#68766D] font-medium flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#DC4242]" /> {t('প্রধান রোগ ও বালাই:', 'Common Diseases:')}
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {crop.commonDiseases.map((d, i) => (
                      <span key={i} className="bg-rose-50 text-rose-700 text-[11px] font-bold px-2 py-0.5 rounded border border-rose-200">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href="/shop"
                className="w-full py-2.5 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-bold text-xs text-center block transition-colors"
              >
                {t('এই ফসলের প্রয়োজনীয় সার ও বীজ কিনুন', 'Buy Inputs for this Crop')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

