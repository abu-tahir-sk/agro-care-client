'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export default function DashboardFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#E4EBE5] py-4 px-4 sm:px-8 text-xs text-[#68766D] flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#16834A]" />
        <span>
          © {new Date().getFullYear()} AgroCare Enterprise Agritech Console • {t('পশ্চিমবঙ্গ কৃষি নেটওয়ার্ক', 'West Bengal Agri Network')}
        </span>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        <Link href="/compliance" className="hover:text-[#16834A] transition-colors">
          {t('লাইসেন্স কমপ্লায়েন্স', 'Compliance')}
        </Link>
        <span>•</span>
        <Link href="/contact" className="hover:text-[#16834A] transition-colors">
          {t('সহায়তা হেল্পলাইন', 'Support')}
        </Link>
        <span>•</span>
        <Link href="/" className="hover:text-[#16834A] font-bold transition-colors">
          {t('পাবলিক স্টোর', 'Public Store')}
        </Link>
      </div>
    </footer>
  );
}

