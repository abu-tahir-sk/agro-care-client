'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { mockDiseases } from '../../data/agricultureData';
import { ShieldAlert, AlertTriangle, CheckCircle2, Sparkles, Search, Stethoscope, ArrowRight } from 'lucide-react';

export default function DiseaseLibraryPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');

  const filteredDiseases = mockDiseases.filter((d) => {
    const matchesSearch =
      d.diseaseNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.diseaseNameBn.includes(searchTerm) ||
      d.cropBn.includes(searchTerm);
    const matchesCrop =
      selectedCrop === 'All' || d.cropEn.toLowerCase() === selectedCrop.toLowerCase();
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{t('উদ্ভিদ রোগতত্ত্ব ও বালাই ব্যবস্থাপনা', 'Crop Disease & Pest Knowledge Hub')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('ফসল রক্ষা ও রোগ শনাক্তকরণ এনসাইক্লোপিডিয়া', 'Crop Disease Library & Treatment Guide')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'পশ্চিমবঙ্গের প্রধান প্রধান ফসলের রোগবালাইয়ের চাক্ষুষ লক্ষণ, বিস্তার প্রতিরোধ, জৈব দমন পদ্ধতি ও সরকারি অনুমোদিত রাসায়নিক চিকিৎসাপত্র।',
            'Symptom diagnosis, environmental causes, certified chemical fungicides/insecticides, and organic remedies.'
          )}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E4EBE5] shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={t('রোগ বা ফসলের নাম খুঁজুন (নাবি ধসা, ব্লাস্ট...)', 'Search disease or crop...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Potato', 'Paddy', 'Tomato'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCrop(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCrop === c
                  ? 'bg-[#16834A] text-white shadow-soft'
                  : 'bg-slate-50 text-[#68766D] hover:bg-slate-100'
              }`}
            >
              {c === 'All' ? t('সকল ফসল', 'All Crops') : c}
            </button>
          ))}
        </div>
      </div>

      {/* Diseases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDiseases.map((disease) => (
          <div
            key={disease.id}
            className="bg-white rounded-3xl border border-[#E4EBE5] overflow-hidden shadow-card flex flex-col justify-between hover:shadow-elevated transition-shadow"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-900">
                <img src={disease.image} alt={disease.diseaseNameEn} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">
                    {disease.severity} Severity
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-emerald-300 block">
                    {disease.cropBn}
                  </span>
                  <h3 className="text-lg font-black">{disease.diseaseNameBn}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4 text-xs">
                {/* Symptoms */}
                <div className="space-y-1">
                  <span className="text-[#68766D] font-bold uppercase tracking-wider text-[10px] block">
                    {t('লক্ষণসমূহ (Symptoms):', 'Symptoms:')}
                  </span>
                  <p className="text-[#17251C] leading-relaxed">
                    {disease.symptomsBn}
                  </p>
                </div>

                {/* Chemical Treatment */}
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 space-y-1">
                  <span className="text-rose-800 font-black uppercase text-[10px] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{t('রাসায়নিক প্রতিকার (Chemical Rx):', 'Chemical Treatment:')}</span>
                  </span>
                  <p className="text-rose-950 font-bold leading-relaxed">{disease.chemicalRemedyBn}</p>
                </div>

                {/* Biological Control */}
                <div className="p-3 bg-[#E9F6EE] rounded-2xl border border-[#16834A]/20 space-y-1">
                  <span className="text-[#106B3B] font-black uppercase text-[10px] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('জৈব নিয়ন্ত্রণ ও প্রতিরোধ (Bio Prevention):', 'Biological & Prevention:')}</span>
                  </span>
                  <p className="text-[#17251C] leading-relaxed">{disease.organicRemedyBn}</p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#E4EBE5] mt-4 flex items-center justify-between">
              <Link
                href="/crop-doctor"
                className="text-xs font-bold text-[#16834A] hover:underline flex items-center gap-1"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{t('AI স্ক্যান করুন', 'AI Scan')}</span>
              </Link>
              <Link
                href="/shop"
                className="px-3.5 py-1.5 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-bold shadow-soft"
              >
                {t('ওষুধ কিনুন', 'Buy Medicine')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
