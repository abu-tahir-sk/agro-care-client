'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-[#E4EBE5] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('গোপনীয়তা ও ডেটা সুরক্ষা', 'Privacy & Data Protection')}</span>
        </div>
        <h1 className="text-3xl font-black text-[#17251C]">
          {t('AgroCare গোপনীয়তা নীতি (Privacy Policy)', 'AgroCare Privacy Policy')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('সর্বশেষ হালনাগাদ: নভেম্বর ২০২৬', 'Last Updated: November 2026')}
        </p>
      </div>

      <div className="space-y-6 text-xs text-[#17251C] leading-relaxed">
        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">১. তথ্যের সংগ্রহ ও ব্যবহার (Information Collection)</h2>
          <p className="text-[#68766D]">
            আমরা কৃষক, দোকানদার ও সরবরাহকারীদের কাছ থেকে নাম, মোবাইল নম্বর, বিতরণের ঠিকানা, জমির এলাকা এবং ব্যবসায়িক লাইসেন্স নম্বর (ট্রেড লাইসেন্স, সার/কীটনাশক লাইসেন্স ও জিএসটি) সংগ্রহ করি শুধুমাত্র অর্ডার ডেলিভারি, ইনভয়েস তৈরি ও আইনি কমপ্লায়েন্স নিশ্চিত করার জন্য।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">২. তথ্য সুরক্ষা ও গোপনীয়তা (Data Security)</h2>
          <p className="text-[#68766D]">
            আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিপণন বা বিক্রির উদ্দেশ্যে প্রদান করা হয় না। সমস্ত পেমেন্ট লেনদেন সুরক্ষিত গেটওয়ের (যেমন Razorpay) মাধ্যমে এনক্রিপ্ট করে পরিচালিত হয়।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">৩. এআই ক্রপ ডক্টর ছবি বিশ্লেষণ (AI Image Diagnostics)</h2>
          <p className="text-[#68766D]">
            AI Crop Doctor-এ আপলোড করা গাছের পাতার ছবিগুলো শুধুমাত্র উদ্ভিদের রোগ শনাক্তকরণ এবং নির্ভুল চিকিৎসাপত্র প্রদানের জন্য বিশ্লেষণ করা হয়।
          </p>
        </section>
      </div>
    </div>
  );
}

