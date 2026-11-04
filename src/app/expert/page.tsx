'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Stethoscope,
  MessageSquare,
  CheckCircle2,
  Clock,
  User,
  FileText,
  Calendar,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Send,
} from 'lucide-react';

function ExpertDashboardContent() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';

  const consultations = [
    { id: 'CNS-01', farmer: 'বিপ্লব মণ্ডল (Biplab Mondal)', crop: 'আলু (Potato)', issue: 'পাতায় নাবি ধসা (Late Blight) দাগের লক্ষণ ও প্রাথমিক স্প্রে প্রস্তাবনা', status: 'Pending Review', priority: 'High', date: '০২ নভেম্বর ২০২৬' },
    { id: 'CNS-02', farmer: 'অরুণ পাল (Arun Paul)', crop: 'টমেটো (Tomato)', issue: 'গাছ হলুদ হয়ে পাতা কুঁকড়ে যাচ্ছে — লিপ কার্ল ভাইরাস নাকি মাইটস?', status: 'Answered', priority: 'Medium', date: '৩০ অক্টোবর ২০২৬' },
    { id: 'CNS-03', farmer: 'সাধন বিশ্বাস', crop: 'সরিষা (Mustard)', issue: 'জাবপোকা (Aphids) আক্রমণ ও ফলন বাঁচাতে করণীয়', status: 'Pending Review', priority: 'High', date: '০১ নভেম্বর ২০২৬' },
  ];

  const communityQueries = [
    {
      id: 'Q-101',
      author: 'সাধন মণ্ডল',
      village: 'কাটোয়া, বর্ধমান',
      crop: 'ধান (Paddy)',
      question: 'শীষ আসার মুখে ব্লাস্ট রোগ প্রতিরোধের সঠিক ছত্রাকনাশক স্প্রে ডোজ কী?',
      replies: 4,
      time: '৩ ঘন্টা আগে',
    },
    {
      id: 'Q-102',
      author: 'রতন দাস',
      village: 'মেমারী, বর্ধমান',
      crop: 'আলু (Potato)',
      question: 'কুয়াশা ও মেঘলা আবহাওয়ায় আর্লি ব্লাইট ঠেকানোর প্রতিরোধমূলক স্প্রে কোনটা ভালো?',
      replies: 2,
      time: '৫ ঘন্টা আগে',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-[#17251C] text-white p-8 sm:p-10 rounded-3xl shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A] text-white text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{t('কৃষি বিশেষজ্ঞ প্যানেল', 'Agronomy Expert Panel')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {user?.name || 'ড. শুভাশিস রায় (Dr. S. Roy)'}
          </h1>
          <p className="text-xs text-white/70">
            {t('উদ্ভিদ রোগতত্ত্ব বিভাগ (Plant Pathology), বিধানচন্দ্র কৃষি বিশ্ববিদ্যালয় (BCKV)', 'Dept of Plant Pathology, BCKV')}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('অপেক্ষমান প্রশ্ন', 'Pending Questions')}</span>
          <p className="text-2xl font-black text-rose-600">২ টি</p>
          <p className="text-[11px] text-[#68766D]">{t('উচ্চ অগ্রাধিকার (High Priority)', 'Needs immediate advice')}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('সম্পন্ন পরামর্শ', 'Completed Consultations')}</span>
          <p className="text-2xl font-black text-[#16834A]">১৮৪ টি</p>
          <p className="text-[11px] text-[#16834A] font-semibold">{t('কৃষক সন্তুষ্টি হার ৯৮%', '98% Positive Feedback')}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('যাচাইকৃত AI স্ক্যান', 'AI Scans Reviewed')}</span>
          <p className="text-2xl font-black text-[#17251C]">৪২ টি</p>
          <p className="text-[11px] text-[#68766D]">{t('কম্পিউটার ভিশন যাচাই', 'Verified plant models')}</p>
        </div>
      </div>

      {/* Tab: Overview */}
      {(tab === 'overview' || tab === 'crop-doctor') && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
            <h2 className="font-extrabold text-base text-[#17251C] flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#16834A]" />
              {t('কৃষকদের পরামর্শ অনুরোধ ও রোগ পর্যালোচনা', 'Farmer Inquiries & Prescriptions')}
            </h2>
            <span className="text-xs bg-[#E9F6EE] text-[#16834A] font-bold px-3 py-1 rounded-full">
              {consultations.length} Active
            </span>
          </div>

          <div className="divide-y divide-[#E4EBE5]">
            {consultations.map((c) => (
              <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#17251C]">{c.farmer}</span>
                    <span className="text-[10px] bg-[#E9F6EE] text-[#16834A] font-bold px-2 py-0.5 rounded">
                      {c.crop}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                      {c.priority}
                    </span>
                  </div>
                  <p className="text-xs text-[#68766D]">{c.issue}</p>
                  <span className="text-[10px] text-[#68766D]">{c.date}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert(t(`${c.farmer}-এর প্রশ্নের উত্তর প্রদান ফর্ম খুলছে...`, `Opening response modal for ${c.farmer}...`))}
                    className="px-4 py-2 rounded-xl bg-[#16834A] text-white text-xs font-bold hover:bg-[#106B3B] transition-colors"
                  >
                    {t('পরামর্শ ও প্রেসক্রিপশন লিখুন', 'Prescribe Advice')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Community Forum */}
      {(tab === 'community' || tab === 'overview') && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
            <h2 className="font-extrabold text-base text-[#17251C] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#16834A]" />
              {t('সম্প্রদায় ফোরামে বিশেষজ্ঞদের সরাসরি উত্তর প্রদান', 'Farmer Community Q&A')}
            </h2>
            <span className="text-xs text-[#68766D]">{t('কৃষকদের মাঠ পর্যায়ের প্রশ্নাবলী', 'Recent queries')}</span>
          </div>

          <div className="space-y-4">
            {communityQueries.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E4EBE5] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#17251C]">{q.author}</span>
                    <span className="text-[10px] text-[#68766D]">({q.village})</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {q.crop}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#68766D]">{q.time}</span>
                </div>
                <p className="text-xs font-medium text-[#17251C]">{q.question}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#68766D]">{q.replies} টি মন্তব্য বিদ্যমান</span>
                  <button
                    onClick={() => alert(t(`বিশেষজ্ঞ উত্তর দেওয়ার উইন্ডো খুলছে...`, `Opening expert response window...`))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16834A] text-white text-[11px] font-bold hover:bg-[#106B3B]"
                  >
                    <Send className="w-3 h-3" />
                    <span>{t('বিশেষজ্ঞ মতামত দিন', 'Post Expert Answer')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExpertDashboard() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-[#68766D]">Loading Expert Console...</div>}>
      <ExpertDashboardContent />
    </Suspense>
  );
}
