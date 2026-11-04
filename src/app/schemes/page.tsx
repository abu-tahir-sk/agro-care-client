'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockSchemes } from '../../data/agricultureData';
import { Award, CheckCircle2, ArrowRight, ExternalLink, HelpCircle, FileText } from 'lucide-react';

export default function SchemesPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('সরকারি কৃষি কল্যাণ ও আর্থিক সুরক্ষা', 'Govt Agriculture Schemes')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('পশ্চিমবঙ্গের কৃষকদের জন্য সরকারি প্রকল্পসমূহ', 'State & Central Government Agricultural Schemes')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'কৃষক বন্ধু, পিএম-কিষাণ, বাংলা শস্য বীমা ও মৃত্তিকা স্বাস্থ্য কার্ডের বিস্তারিত তথ্য, সুবিধা, প্রয়োজনীয় নথি এবং সরাসরি আবেদনের পোর্টাল লিংক।',
            'Authentic eligibility criteria, financial assistance breakdowns, and step-by-step application instructions for farmers.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-[#68766D] tracking-wider block">
                  {scheme.department}
                </span>
                <h3 className="text-lg font-black text-[#17251C] mt-0.5">
                  {language === 'bn' ? scheme.nameBn : scheme.nameEn}
                </h3>
              </div>

              {/* Financial Benefit */}
              <div className="p-4 bg-[#E9F6EE] rounded-2xl border border-[#16834A]/20">
                <span className="text-[10px] font-extrabold uppercase text-[#106B3B] block">
                  {t('আর্থিক সহায়তা ও অনুদান:', 'Financial Assistance:')}
                </span>
                <p className="text-xs font-bold text-[#16834A] mt-0.5">
                  {scheme.financialBenefit}
                </p>
              </div>

              {/* Eligibility */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#17251C] block">{t('যোগ্যতার মাপকাঠি:', 'Eligibility:')}</span>
                <p className="text-[#68766D] leading-relaxed">{scheme.eligibilityBn}</p>
              </div>

              {/* Application Process */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#17251C] block">{t('আবেদন পদ্ধতি ও স্থান:', 'How to Apply:')}</span>
                <p className="text-[#68766D] leading-relaxed">{scheme.applicationProcessBn}</p>
              </div>
            </div>

            <a
              href={scheme.portalUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-soft"
            >
              <span>{t('সরকারি ওয়েবসাইটে আবেদন করুন', 'Visit Official Portal')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

