'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, FileText, AlertTriangle, CheckCircle2, Scale, BookOpen } from 'lucide-react';

export default function CompliancePage() {
  const { language, t } = useLanguage();

  const acts = [
    {
      titleBn: 'সার নিয়ন্ত্রণ আদেশ ১৯৮৫ (Fertilizer Control Order - FCO)',
      titleEn: 'Fertilizer Control Order (FCO) 1985',
      descBn: 'AgroCare প্ল্যাটফর্মে তালিকাভুক্ত সমস্ত রাসায়নিক ও অনুখাদ্য সার ভারত সরকারের নির্ধারিত গুণমান ও স্পেসিফিকেশন মেনে বাজারজাত করা হয়। বিক্রয়ের জন্য বিক্রেতার বৈধ সার ডিলার লাইসেন্স থাকা বাধ্যতামূলক।',
      descEn: 'Ensuring authentic fertilizer grades, government prescribed N-P-K nutrient composition, and licensed merchant distribution.',
    },
    {
      titleBn: 'কীটনাশক আইন ১৯৬৮ (The Insecticides Act 1968)',
      titleEn: 'The Insecticides Act 1968 & Rules 1971',
      descBn: 'কেন্দ্রীয় কীটনাশক বোর্ড (CIB&RC) কর্তৃক নিবন্ধিত ও অনুমোদিত বালাইনাশক ব্যতীত কোনো অননুমোদিত রাসায়নিক বিক্রি করা সম্পূর্ণ নিষিদ্ধ। খুচরা বিক্রেতা ও পাইকারি সরবরাহকারীদের লাইসেন্স যাচাই করা হয়।',
      descEn: 'Strict verification of registration under the Central Insecticides Board (CIB&RC) and state licensing officers.',
    },
    {
      titleBn: 'বীজ আইন ১৯৬৬ (The Seeds Act 1966)',
      titleEn: 'The Seeds Act 1966 & Seed Rules 1968',
      descBn: 'প্রত্যয়িত বা সার্টিফাইড বীজ কেবল অনুমোদিত উৎপাদনকারী ও রাজ্য বীজ নিগম থেকে সরবরাহ করা হয়। অঙ্কুরোদগম হার (Germination Rate) ও জেনেটিক বিশুদ্ধতার মানদণ্ড অক্ষুণ্ণ রাখা হয়।',
      descEn: 'Certified and foundation seed supply complying with national seed certification standards, packaging, and labeling.',
    },
    {
      titleBn: 'FEFO গুদাম ইনভেন্টরি ও ব্যাচ ট্র্যাকিং',
      titleEn: 'FEFO Batch & Expiry Compliance',
      descBn: 'First Expiry, First Out (FEFO) নিয়মে মেয়াদোত্তীর্ণ হওয়ার পূর্বেই অগ্রাধিকার ভিত্তিতে পণ্য প্রেরণ করা হয়। মেয়াদোত্তীর্ণ কোনো পণ্য বিক্রি করা সম্পূর্ণ নিষিদ্ধ।',
      descEn: 'Automatic batch-level tracking preventing any expired, recalled, or prohibited agrochemical dispatch.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('আইনি সম্মতি ও নিয়ন্ত্রণ বিধিমালা', 'Legal & Regulatory Compliance')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('কৃষি উপকরণ ও লাইসেন্স সংক্রান্ত কমপ্লায়েন্স নির্দেশিকা', 'Agricultural Input Regulations & Licensing Policy')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'AgroCare ভারত ও পশ্চিমবঙ্গ সরকারের সমস্ত কৃষি ও বাণিজ্যিক আইন কঠোরভাবে মেনে চলে। ভেজাল প্রতিরোধ ও কৃষকের সুরক্ষা আমাদের সর্বোচ্চ অঙ্গীকার।',
            'Full compliance framework ensuring authentic certified products, license authorization, and legal safety standards.'
          )}
        </p>
      </div>

      <div className="space-y-6">
        {acts.map((act, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#17251C]">
                {language === 'bn' ? act.titleBn : act.titleEn}
              </h3>
            </div>
            <p className="text-xs text-[#68766D] leading-relaxed pl-13">
              {language === 'bn' ? act.descBn : act.descEn}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-amber-50 rounded-3xl border border-amber-200 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>{t('গুরুত্বপূর্ণ আইনি সতর্কতা (Statutory Notice):', 'Statutory Notice:')}</span>
        </div>
        <p className="leading-relaxed">
          {t(
            'AgroCare-এ বিক্রিত যে কোনো রাসায়নিক সার, কীটনাশক বা নিয়ন্ত্রিত বীজ কেনার আগে প্রযোজ্য লাইসেন্স ও নিরাপত্তা গাইডলাইন মেনে চলুন। কীটনাশক ব্যবহারের সময় সঠিক সুরক্ষা সরঞ্জাম (মাস্ক, গ্লাভস) পরিধান করা বাধ্যতামূলক। শিশুদের নাগালের বাইরে শুষ্ক স্থানে সংরক্ষণ করুন।',
            'Use agricultural inputs strictly in accordance with approved label indications and state advisory guidelines.'
          )}
        </p>
      </div>
    </div>
  );
}

