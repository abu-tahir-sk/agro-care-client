'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RefreshCcw, ShieldCheck } from 'lucide-react';

export default function ReturnRefundPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-[#E4EBE5] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <RefreshCcw className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('পণ্য ফেরত ও অর্থ ফেরত নীতি', 'Returns & Refunds')}</span>
        </div>
        <h1 className="text-3xl font-black text-[#17251C]">
          {t('পণ্য ফেরত ও রিফান্ড নীতি (Return & Refund Policy)', 'Return & Refund Policy')}
        </h1>
      </div>

      <div className="space-y-6 text-xs text-[#17251C] leading-relaxed">
        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">১. প্যাকেজিং ক্ষতিগ্রস্ত বা মেয়াদোত্তীর্ণ পণ্য (Damaged or Expired)</h2>
          <p className="text-[#68766D]">
            ডেলিভারি পাওয়ার সময় যদি কোনো বস্তা বা বোতল ফাটা, ক্ষতিগ্রস্ত অথবা মেয়াদোত্তীর্ণ হিসেবে পরিলক্ষিত হয়, তবে ডেলিভারি পার্টনারের উপস্থিতিতে তা তাৎক্ষণিক প্রত্যাখ্যান করতে পারেন অথবা ডেলিভারির ৪৮ ঘণ্টার মধ্যে হেল্পলাইনে ছবিসহ রিপোর্ট করলে আমরা ১০০% বিনামূল্যে বদল অথবা রিফান্ড নিশ্চিত করব।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">২. বীজ ও রাসায়নিক পণ্য ফেরত শর্ত (Non-Returnable Items)</h2>
          <p className="text-[#68766D]">
            একবার সীল খোলা বা ব্যবহারের পর কীটনাশক ও বীজের প্যাকেট ফেরত নেওয়া হয় না, কারণ এতে পণ্যের রাসায়নিক গুণমান ও বীজের অঙ্কুরোদগম ক্ষমতা নষ্ট হওয়ার ঝুঁকি থাকে।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">৩. রিফান্ডের সময়সীমা (Refund Processing)</h2>
          <p className="text-[#68766D]">
            অনুমোদিত রিফান্ডের অর্থ ৫-৭ কার্যদিবসের মধ্যে গ্রাহকের মূল পেমেন্ট উৎস (ব্যাংক অ্যাকাউন্ট / ইউপিআই)-এ জমা হয়ে যাবে।
          </p>
        </section>
      </div>
    </div>
  );
}

