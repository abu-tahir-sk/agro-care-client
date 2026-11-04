'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Sprout, Lock, Phone, User, Store, Building2, Stethoscope, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export default function LoginPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { loginAs } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
    router.push(
      selectedRole === 'farmer'
        ? '/farmer'
        : selectedRole === 'retailer'
          ? '/retailer'
          : selectedRole === 'supplier'
            ? '/supplier'
            : selectedRole === 'expert'
              ? '/expert'
              : selectedRole === 'delivery'
                ? '/delivery'
                : selectedRole === 'admin'
                  ? '/admin'
                  : '/shop'
    );
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    loginAs(role);
    router.push(
      role === 'farmer'
        ? '/farmer'
        : role === 'retailer'
          ? '/retailer'
          : role === 'supplier'
            ? '/supplier'
            : role === 'expert'
              ? '/expert'
              : role === 'delivery'
                ? '/delivery'
                : '/admin'
    );
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#16834A] flex items-center justify-center text-white mx-auto shadow-soft">
          <Sprout className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-[#17251C]">
          Agro<span className="text-[#16834A]">Care</span> {t('লগইন', 'Login')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('আপনার একাউন্ট টাইপ নির্বাচন করে লগইন করুন', 'Select your account type to proceed')}
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
        {/* Role Selector Tabs */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#17251C]">{t('একাউন্ট ভূমিকা:', 'Account Role:')}</label>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {[
              { id: 'farmer', bn: 'কৃষক', en: 'Farmer' },
              { id: 'retailer', bn: 'দোকানদার', en: 'Retailer' },
              { id: 'supplier', bn: 'সরবরাহকারী', en: 'Supplier' },
              { id: 'expert', bn: 'বিশেষজ্ঞ', en: 'Expert' },
              { id: 'delivery', bn: 'ডেলিভারি', en: 'Delivery' },
              { id: 'admin', bn: 'অ্যাডমিন', en: 'Admin' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id as UserRole)}
                className={`py-2 px-1 rounded-xl text-center font-bold transition-all ${
                  selectedRole === r.id
                    ? 'bg-[#16834A] text-white shadow-xs'
                    : 'bg-[#F8FAF8] text-[#17251C] border border-[#E4EBE5]'
                }`}
              >
                {t(r.bn, r.en)}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#17251C]">{t('মোবাইল নম্বর বা ইমেইল:', 'Mobile / Email:')}</label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+91 98321 00000"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C] focus:outline-none focus:border-[#16834A]"
              />
              <Phone className="w-4 h-4 text-[#68766D] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#17251C]">{t('পাসওয়ার্ড:', 'Password:')}</label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-[#16834A] hover:underline font-bold"
              >
                {t('পাসওয়ার্ড ভুলে গেছেন?', 'Forgot?')}
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-[#17251C] focus:outline-none focus:border-[#16834A]"
              />
              <Lock className="w-4 h-4 text-[#68766D] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-xs shadow-soft transition-all"
          >
            {t('লগইন করুন', 'Login')}
          </button>
        </form>

        <div className="text-center text-xs text-[#68766D]">
          {t('নতুন অ্যাকাউন্ট তৈরি করতে চান?', 'Need an account?')}{' '}
          <Link href="/register" className="text-[#16834A] font-bold hover:underline">
            {t('এখানে নিবন্ধন করুন', 'Register here')}
          </Link>
        </div>

        {/* Quick Demo Access Notice */}
        <div className="pt-4 border-t border-[#E4EBE5] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#68766D] block text-center">
            {t('দ্রুত ডেমো লগইন (1-Click Demo Login):', 'Quick 1-Click Demo Access:')}
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('farmer')}
              className="p-2 bg-[#E9F6EE] hover:bg-[#D9EFDF] text-[#16834A] font-bold rounded-xl text-center transition-colors"
            >
              🧑‍🌾 {t('কৃষক ড্যাশবোর্ড', 'Farmer Login')}
            </button>
            <button
              onClick={() => handleQuickDemoLogin('retailer')}
              className="p-2 bg-[#fef3c7] hover:bg-[#fde68a] text-amber-900 font-bold rounded-xl text-center transition-colors"
            >
              🏪 {t('দোকানদার ড্যাশবোর্ড', 'Retailer Login')}
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-[#17251C] font-bold rounded-xl text-center transition-colors col-span-2"
            >
              🛡️ {t('অ্যাডমিন কন্ট্রোল প্যানেল', 'Central Admin Login')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

