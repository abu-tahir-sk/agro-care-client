'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Truck, Clock, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-[#E4EBE5] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('শিপিং ও ডেলিভারি নীতি', 'Shipping Policy')}</span>
        </div>
        <h1 className="text-3xl font-black text-[#17251C]">
          {t('শিপিং ও ডেলিভারি পলিসি (Shipping & Delivery)', 'AgroCare Shipping Policy')}
        </h1>
      </div>

      <div className="space-y-6 text-xs text-[#17251C] leading-relaxed">
        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">১. ডেলিভারি এলাকা ও পরিধি</h2>
          <p className="text-[#68766D]">
            AgroCare বর্তমানে পশ্চিমবঙ্গের সমস্ত জেলা — পূর্ব ও পশ্চিম বর্ধমান, হুগলী, নদীয়া, বাঁকুড়া, মেদিনীপুর, মালদা, জলপাইগুড়ি সহ গ্রামীণ ব্লক স্তরে সরাসরি হোম ও ফার্ম ডেলিভারি প্রদান করে।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">২. ডেলিভারির সময়সীমা</h2>
          <p className="text-[#68766D]">
            সাধারণত অর্ডার নিশ্চিত হওয়ার ৪৮ থেকে ৯৬ ঘণ্টার মধ্যে পণ্য গ্রাহকের ঠিকানায় পৌঁছায়। ভারী সার বা বাল্ক হোলসেল অর্ডারের ক্ষেত্রে নিকটবর্তী ওয়্যারহাউস হাব থেকে বিশেষ ট্রাকে পরিবহন করা হয়।
          </p>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-[#E4EBE5] space-y-2 shadow-card">
          <h2 className="text-sm font-black text-[#17251C]">৩. ওটিপি ভিত্তিক সুরক্ষিত ডেলিভারি</h2>
          <p className="text-[#68766D]">
            নিরাপত্তা নিশ্চিত করতে ডেলিভারি স্টাফকে আপনার মোবাইলে প্রেরিত গোপনীয় ওটিপি (OTP) যাচাই করার পরই পার্সেল হস্তান্তর করা হবে।
          </p>
        </section>
      </div>
    </div>
  );
}

