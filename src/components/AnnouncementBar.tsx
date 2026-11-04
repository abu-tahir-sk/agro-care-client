'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#106B3B] text-white text-xs py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#F2A93B] text-[#17251C] px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">
            <Sparkles className="w-3 h-3" />
            {t('বিশেষ অফার', 'SPECIAL OFFER')}
          </span>
          <span className="font-medium text-white/95">
            {t(
              'রবি মৌসুমে সার্টিফাইড বীজ ও ফসফেট সারে বিশেষ ছাড়! ঘরে বসেই অর্ডার করুন।',
              'Special discount on certified seeds & phosphate fertilizers this Rabi season!'
            )}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-white/80">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>{t('১০০% খাঁটি ও সরকার অনুমোদিত কৃষি পণ্য', '100% Genuine Agri-Inputs')}</span>
          </div>
          <span className="text-white/30">|</span>
          <a href="tel:1800123456" className="flex items-center gap-1 hover:text-white transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>{t('কৃষি হেল্পলাইন: ১৮০০-১২৩-৪৫৬', 'Agri Helpline: 1800-123-456')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

