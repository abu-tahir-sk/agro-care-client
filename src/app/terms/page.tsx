'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Scale, FileText } from 'lucide-react';

export default function TermsPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-[#E4EBE5] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('ব্যবহারের শর্তাবলী', 'Terms of Service')}</span>
        </div>
        <h1 className="text-3xl font-black text-[#17251C]">
          {t('ব্যবহারের শর্তাবলী (Terms & Conditions)', 'AgroCare Terms & Conditions')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('সর্বশেষ হালনাগাদ: নভেম্বর ২০২৬', 'Last Updated: November 2026')}
        </p>
      </div>

      <div className="space-y-6 text-xs text-[#17251C] leading-relaxed">
        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">১. প্ল্যাটফর্ম ব্যবহার ও অ্যাকাউন্ট তৈরি</h2>
          <p className="text-[#68766D]">
            AgroCare প্ল্যাটফর্মে কৃষক বা দোকানদার হিসেবে নিবন্ধনের ক্ষেত্রে অবশ্যই সঠিক তথ্য প্রদান করতে হবে। খুচরা দোকানদারদের পাইকারি (Wholesale) মূল্য ও বাল্ক ক্রয়ের অধিকার কেবল অনুমোদিত লাইসেন্স যাচাই সাপেক্ষে দেওয়া হবে।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">২. কৃষি পণ্য ও কীটনাশক ব্যবহারের সতর্কতা</h2>
          <p className="text-[#68766D]">
            কীটনাশক আইন ১৯৬৮ ও বীজ আইন ১৯৬৬ অনুযায়ী সমস্ত রাসায়নিক পণ্য কেবল প্রস্তুতকারকের মোড়ক নির্দেশিকা অনুযায়ী ব্যবহার করতে হবে। অননুমোদিত ডোজ বা অবহেলার কারণে কোনো ক্ষতি হলে AgroCare কর্তৃপক্ষ দায়ী থাকবে না।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">৩. মূল্য ও পেমেন্ট নীতি</h2>
          <p className="text-[#68766D]">
            সমস্ত পণ্যের মূল্য ভারতীয় রুপিতে (INR) উল্লেখিত এবং প্রযোজ্য সরকারি জিএসটি অন্তর্ভুক্ত বা প্রযোজ্য ক্ষেত্র অনুযায়ী স্পষ্ট নির্দেশিত।
          </p>
        </section>
      </div>
    </div>
  );
}

