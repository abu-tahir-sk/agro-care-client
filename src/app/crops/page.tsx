'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { mockCropGuides } from '../../data/agricultureData';
import { Sprout, Calendar, Droplets, BookOpen, Search, ArrowRight, ShieldAlert, Award } from 'lucide-react';

export default function CropLibraryPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('All');

  const filteredCrops = mockCropGuides.filter((crop) => {
    const matchesSearch =
      crop.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.nameBn.includes(searchTerm);
    const matchesSeason =
      selectedSeason === 'All' || crop.season.includes(selectedSeason);
    return matchesSearch && matchesSeason;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('কৃষি জ্ঞানভাণ্ডার • ক্রপ লাইব্রেরি', 'Crop Library & Agronomy Hub')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('পশ্চিমবঙ্গের প্রধান প্রধান ফসল নির্দেশিকা', 'Comprehensive Crop Cultivation Guides')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'মাটি নির্বাচন, বীজ শোধন, সার প্রয়োগের বৈজ্ঞানিক সময়সূচী, সেচ ব্যবস্থাপনা ও ফলন বৃদ্ধি সংক্রান্ত তথ্য।',
            'Authentic agronomic guidelines tailored to Bengal agro-climatic zones, soil conditions, and optimal harvest yields.'
          )}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E4EBE5] shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={t('ফসল খুঁজুন (ধান, আলু, গম...)', 'Search crops (Paddy, Potato...)')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'খরিফ', 'রবি'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSeason(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSeason === s
                  ? 'bg-[#16834A] text-white shadow-soft'
                  : 'bg-slate-50 text-[#68766D] hover:bg-slate-100'
              }`}
            >
              {s === 'All' ? t('সকল মৌসুম', 'All Seasons') : s}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-3xl border border-[#E4EBE5] overflow-hidden shadow-card flex flex-col justify-between hover:shadow-elevated transition-shadow"
          >
            <div>
              <div className="relative h-60 w-full bg-slate-900">
                <img src={crop.image} alt={crop.nameEn} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="bg-[#16834A] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block">
                    {crop.season}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">{crop.nameBn}</h3>
                  <p className="text-xs text-white/80">{crop.nameEn}</p>
                </div>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E4EBE5]">
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('উপযুক্ত মাটি:', 'Suitable Soil:')}</span>
                    <strong className="text-[#17251C]">{crop.suitableSoil}</strong>
                  </div>
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('বীজ বপন / রোপণ:', 'Sowing / Planting:')}</span>
                    <strong className="text-[#17251C]">{crop.sowingPeriod}</strong>
                  </div>
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('ফসল তোলার সময়:', 'Harvest Time:')}</span>
                    <strong className="text-[#17251C]">{crop.harvestPeriod}</strong>
                  </div>
                  <div>
                    <span className="text-[#68766D] block font-medium">{t('আনুমানিক ফলন:', 'Expected Yield:')}</span>
                    <strong className="text-[#16834A]">{crop.avgYield}</strong>
                  </div>
                </div>

                {/* Fertilizer calendar */}
                <div className="space-y-1.5 bg-[#E9F6EE] p-3.5 rounded-2xl border border-[#16834A]/20">
                  <div className="flex items-center gap-1.5 text-[#106B3B] font-black text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>{t('সার প্রয়োগের নির্দেশিকা (Fertilizer Schedule):', 'Fertilizer Guidelines:')}</span>
                  </div>
                  <p className="text-xs text-[#17251C] leading-relaxed">{crop.recommendedFertilizer}</p>
                </div>

                {/* Major Diseases */}
                <div className="space-y-1.5">
                  <span className="text-[#68766D] font-bold block">{t('প্রধান ক্ষতিকর রোগ ও পোকা:', 'Common Diseases & Pests:')}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {crop.commonDiseases.map((d, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-100 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#E4EBE5] mt-4 flex items-center justify-between">
              <Link
                href="/calculator"
                className="text-xs font-bold text-[#16834A] hover:underline flex items-center gap-1"
              >
                <span>{t('সার ক্যালকুলেটরে হিসেব করুন', 'Calculate Fertilizer')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/shop"
                className="px-4 py-2 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-bold transition-all shadow-soft"
              >
                {t('প্রয়োজনীয় পণ্য কিনুন', 'Buy Inputs')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
