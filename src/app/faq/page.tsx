'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HelpCircle, ChevronDown, ChevronUp, Sprout } from 'lucide-react';

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qBn: 'AgroCare-এর বীজ ও সারের গুণমান কীভাবে নিশ্চিত করা হয়?',
      qEn: 'How does AgroCare ensure authenticity of seeds and fertilizers?',
      aBn: 'আমরা শুধুমাত্র জাতীয় বীজ নিগম, রাজ্য বীজ কর্পোরেশন এবং আইএফএফসিও (IFFCO), বায়ার (Bayer)-এর মতো নিবন্ধিত মূল প্রস্তুতকারকদের থেকে সরাসরি পণ্য সংগ্রহ করি। প্রতিটি ব্যাচ নম্বর ও মেয়াদ সরকারি ডাটাবেস অনুযায়ী ট্র্যাক করা হয়।',
      aEn: 'We source strictly from certified state seed corporations and registered manufacturers with batch expiry audits.',
    },
    {
      qBn: 'কৃষি দোকানদাররা কীভাবে পাইকারি (Wholesale) দামে পণ্য কিনবেন?',
      qEn: 'How can retailers purchase at wholesale rates?',
      aBn: 'দোকানদার হিসেবে নিবন্ধন করার পর আপনার ট্রেড লাইসেন্স ও সার/কীটনাশক লাইসেন্স আপলোড করুন। অ্যাডমিন ভেরিফিকেশন সম্পন্ন হলে আপনি ন্যূনতম অর্ডারের ভিত্তিতে (MOQ) বিশেষ পাইকারি রেট ও ইনভয়েস সুবিধা পাবেন।',
      aEn: 'Register as Retailer, upload trade & agri licenses, and upon admin approval unlock tiered B2B pricing and GST invoices.',
    },
    {
      qBn: 'AI ক্রপ ডক্টর কতটা নির্ভুল রোগ শনাক্ত করতে পারে?',
      qEn: 'How accurate is the AI Crop Doctor diagnosis?',
      aBn: 'আমাদের এআই মডেলের প্রাথমিক রোগ নির্ণয় নির্ভুলতা ৯৬% এর বেশি। তবে নিরাপদ কৃষির স্বার্থে জটিল বা বিভ্রান্তিকর ক্ষেত্রে আমাদের প্যানেলভুক্ত বিধানচন্দ্র কৃষি বিশ্ববিদ্যালয়ের বিশেষজ্ঞদের চূড়ান্ত মতামত নেওয়ার সুযোগ রয়েছে।',
      aEn: 'AI diagnosis provides >96% accuracy for common regional plant diseases, with instant fallback to verified human agronomists.',
    },
    {
      qBn: 'ডেলিভারি কত দিনে হয় এবং ক্যাশ অন ডেলিভারি (COD) পাওয়া যায় কি?',
      qEn: 'What is the delivery timeline and is COD available?',
      aBn: 'পশ্চিমবঙ্গের প্রায় প্রতিটি গ্রামীণ এলাকায় ২ থেকে ৪ দিনের মধ্যে নিরাপদ হোম বা শপ ডেলিভারি দেওয়া হয়। কৃষকদের জন্য সিওডি (Cash on Delivery) সুবিধা উপলব্ধ রয়েছে।',
      aEn: 'Doorstep dispatch within 2-4 business days across Bengal districts. Cash on Delivery is supported for retail farmers.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto shadow-soft">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-[#17251C]">
          {t('সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)', 'Frequently Asked Questions')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('AgroCare প্ল্যাটফর্ম ব্যবহারের বিভিন্ন প্রশ্নের উত্তর জেনে নিন।', 'Common inquiries regarding delivery, wholesale, verification & crop doctor.')}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#E4EBE5] overflow-hidden shadow-card transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <h3 className="text-sm font-black text-[#17251C]">
                  {language === 'bn' ? faq.qBn : faq.qEn}
                </h3>
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#16834A] shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-xs text-[#68766D] leading-relaxed border-t border-[#E4EBE5] pt-4">
                  {language === 'bn' ? faq.aBn : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

