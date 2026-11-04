'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, Phone, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#16834A] flex items-center justify-center text-white mx-auto shadow-soft">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-[#17251C]">
          {t('পাসওয়ার্ড রিসেট করুন', 'Reset Password')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('আপনার নিবন্ধিত মোবাইল নম্বর দিন। আমরা একটি ওটিপি পাঠাবো।', 'Enter your registered mobile number to receive reset OTP.')}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#17251C]">{t('মোবাইল নম্বর', 'Mobile Number')}</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98321 44521"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-xs shadow-soft transition-all flex items-center justify-center gap-2"
            >
              <span>{t('রিসেট কোড পাঠান', 'Send Reset Code')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-[#17251C]">
              {t('রিসেট ওটিপি আপনার নম্বরে পাঠানো হয়েছে!', 'Reset OTP sent to your phone!')}
            </p>
            <Link
              href="/login"
              className="inline-block text-xs text-[#16834A] font-bold hover:underline"
            >
              {t('লগইন পেজে ফিরে যান', 'Back to Login')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

