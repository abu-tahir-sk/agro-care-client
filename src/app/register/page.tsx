'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sprout,
  Store,
  Building2,
  Stethoscope,
  Phone,
  Lock,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
  KeyRound,
} from 'lucide-react';
import { UserRole } from '../../types';

export default function RegisterPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { loginAs } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Common fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    district: 'পূর্ব বর্ধমান (Purba Bardhaman)',
    blockVillage: '',
    pin: '',
    // Farmer fields
    landArea: '২.৫ একর',
    soilType: 'দোঁআশ মাটি (Loamy Soil)',
    cropsGrown: 'আমন ধান, আলু, সরিষা',
    // Retailer fields
    shopName: '',
    gstin: '',
    tradeLicense: '',
    fertilizerLicense: '',
    // Supplier fields
    companyName: '',
    warehouseLocation: '',
    panNumber: '',
    // Expert fields
    qualification: 'M.Sc in Agronomy / Plant Pathology',
    institution: 'বিধানচন্দ্র কৃষি বিশ্ববিদ্যালয় (BCKV)',
    experienceYears: '৫ বছর',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    loginAs(selectedRole);
  };

  const fillDemoOtp = () => {
    setOtp(['9', '8', '2', '4', '1', '6']);
  };

  const getRoleDashboard = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        return '/farmer';
      case 'retailer':
        return '/retailer';
      case 'supplier':
        return '/supplier';
      case 'expert':
        return '/expert';
      default:
        return '/shop';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#16834A] flex items-center justify-center text-white mx-auto shadow-soft">
          <Sprout className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17251C]">
          Agro<span className="text-[#16834A]">Care</span> {t('নিবন্ধন ও একাউন্ট তৈরি', 'Registration')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t(
            'কৃষক, সার-কীটনাশক ব্যবসায়ী, সরবরাহকারী বা কৃষি বিশেষজ্ঞ হিসেবে যোগ দিন।',
            'Join the trusted agriculture platform as Farmer, Retailer, Supplier or Agronomist.'
          )}
        </p>
      </div>

      {step === 'form' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-10 shadow-card space-y-8">
          {/* Role Selection Tabs */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-[#17251C] tracking-wider block">
              {t('১. আপনার ভূমিকা নির্বাচন করুন (Select Account Type):', '1. Select Your Role:')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'farmer', nameBn: 'কৃষক', nameEn: 'Farmer', icon: Sprout },
                { id: 'retailer', nameBn: 'খুচরা দোকানদার', nameEn: 'Retailer', icon: Store },
                { id: 'supplier', nameBn: 'সরবরাহকারী', nameEn: 'Supplier', icon: Building2 },
                { id: 'expert', nameBn: 'কৃষি বিশেষজ্ঞ', nameEn: 'Expert', icon: Stethoscope },
              ].map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id as UserRole)}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${isSelected
                        ? 'border-[#16834A] bg-[#E9F6EE] text-[#16834A] ring-2 ring-[#16834A] shadow-soft font-black'
                        : 'border-[#E4EBE5] bg-white text-[#68766D] hover:border-slate-300'
                      }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{t(r.nameBn, r.nameEn)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="border-t border-[#E4EBE5] pt-6">
              <label className="text-xs font-black uppercase text-[#17251C] tracking-wider block mb-4">
                {t('২. ব্যক্তিগত ও যোগাযোগের তথ্য (Profile Details):', '2. Profile Information:')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('পূর্ণ নাম *', 'Full Name *')}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t('উদা: বিপ্লব মণ্ডল', 'e.g. Biplab Mondal')}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('মোবাইল নম্বর * (OTP যাচাই হবে)', 'Mobile Number *')}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={t('১০ ডিজিটের মোবাইল নম্বর', '10-digit mobile number')}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('পাসওয়ার্ড তৈরি করুন *', 'Create Password *')}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                </div>

                {/* District */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('জেলা (District) *', 'District *')}</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs bg-white"
                  >
                    <option value="পূর্ব বর্ধমান (Purba Bardhaman)">পূর্ব বর্ধমান (Purba Bardhaman)</option>
                    <option value="পশ্চিম বর্ধমান (Paschim Bardhaman)">পশ্চিম বর্ধমান (Paschim Bardhaman)</option>
                    <option value="হুগলী (Hooghly)">হুগলী (Hooghly)</option>
                    <option value="নদীয়া (Nadia)">নদীয়া (Nadia)</option>
                    <option value="বাঁকুড়া (Bankura)">বাঁকুড়া (Bankura)</option>
                    <option value="মালদা (Malda)">মালদা (Malda)</option>
                    <option value="জলপাইগুড়ি (Jalpaiguri)">জলপাইগুড়ি (Jalpaiguri)</option>
                    <option value="মুর্শিদাবাদ (Murshidabad)">মুর্শিদাবাদ (Murshidabad)</option>
                    <option value="উত্তর ২৪ পরগনা (North 24 Parganas)">উত্তর ২৪ পরগনা (North 24 Parganas)</option>
                    <option value="দক্ষিণ ২৪ পরগনা (South 24 Parganas)">দক্ষিণ ২৪ পরগনা (South 24 Parganas)</option>
                  </select>
                </div>

                {/* Village / Block */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('গ্রাম / ব্লক / ঠিকানা', 'Village / Block / Area')}</label>
                  <input
                    type="text"
                    name="blockVillage"
                    placeholder={t('উদা: মঙ্গলকোট, ব্লক: ভাতার', 'e.g. Mangalkote, Block: Bhatar')}
                    value={formData.blockVillage}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                  />
                </div>

                {/* PIN Code */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('পিন কোড (PIN Code)', 'PIN Code')}</label>
                  <input
                    type="text"
                    name="pin"
                    placeholder="713125"
                    value={formData.pin}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Role Specific Section */}
            <div className="border-t border-[#E4EBE5] pt-6 space-y-4">
              <label className="text-xs font-black uppercase text-[#17251C] tracking-wider block">
                {selectedRole === 'farmer' && t('৩. কৃষক ও জমির তথ্য (Farm Details):', '3. Farm Details:')}
                {selectedRole === 'retailer' && t('৩. দোকানের ব্যবসায়িক ও লাইসেন্স তথ্য (Shop Details):', '3. Shop & License Details:')}
                {selectedRole === 'supplier' && t('৩. সরবরাহকারী প্রতিষ্ঠান ও গুদাম তথ্য (Supplier Details):', '3. Supplier Details:')}
                {selectedRole === 'expert' && t('৩. শিক্ষাগত যোগ্যতা ও বিশেষজ্ঞ প্যানেল তথ্য (Expert Details):', '3. Expert Qualification:')}
              </label>

              {/* Farmer Fields */}
              {selectedRole === 'farmer' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('জমির পরিমাণ (Land Area)', 'Farm Area')}</label>
                    <input
                      type="text"
                      name="landArea"
                      value={formData.landArea}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('মাটির ধরন (Soil Type)', 'Soil Type')}</label>
                    <input
                      type="text"
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('প্রধান প্রধান ফসল (Main Crops)', 'Main Crops')}</label>
                    <input
                      type="text"
                      name="cropsGrown"
                      value={formData.cropsGrown}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Retailer Fields */}
              {selectedRole === 'retailer' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('দোকানের নাম (Shop Name) *', 'Shop Name *')}</label>
                    <input
                      type="text"
                      name="shopName"
                      required
                      placeholder={t('উদা: দত্ত কৃষি ভাণ্ডার', 'e.g. Dutta Krishi Bhandar')}
                      value={formData.shopName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('জিএসটি নম্বর (GSTIN - ঐচ্ছিক)', 'GSTIN (Optional)')}</label>
                    <input
                      type="text"
                      name="gstin"
                      placeholder="19AAECD1234F1Z5"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs uppercase"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('ট্রেড লাইসেন্স নম্বর (Trade License)', 'Trade License')}</label>
                    <input
                      type="text"
                      name="tradeLicense"
                      placeholder="WB/TL/2026/89012"
                      value={formData.tradeLicense}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('সার/কীটনাশক লাইসেন্স নম্বর', 'Fertilizer/Pesticide License')}</label>
                    <input
                      type="text"
                      name="fertilizerLicense"
                      placeholder="WB/AGR/FL-88901"
                      value={formData.fertilizerLicense}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Supplier Fields */}
              {selectedRole === 'supplier' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('কোম্পানির নাম (Company Name) *', 'Company Name *')}</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder={t('উদা: IFFCO বেঙ্গল ডিস্ট্রিবিউটর', 'e.g. IFFCO Bengal Distributor')}
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('সেন্ট্রাল ওয়্যারহাউস অবস্থান', 'Central Warehouse Location')}</label>
                    <input
                      type="text"
                      name="warehouseLocation"
                      placeholder={t('উদা: সাঁকরাইল ইন্ডাস্ট্রিয়াল পার্ক, হাওড়া', 'e.g. Sankrail Industrial Park, Howrah')}
                      value={formData.warehouseLocation}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Expert Fields */}
              {selectedRole === 'expert' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('শিক্ষাগত ডিগ্রি ও পদবী *', 'Qualification *')}</label>
                    <input
                      type="text"
                      name="qualification"
                      required
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('বিশ্ববিদ্যালয় / গবেষণা প্রতিষ্ঠান', 'Institution / University')}</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-sm shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <span>{t('ওটিপি পাঠান ও এগিয়ে যান', 'Send OTP & Proceed')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-[#68766D] border-t border-[#E4EBE5] pt-4">
            {t('ইতিমধ্যে একটি একাউন্ট রয়েছে?', 'Already have an account?')}{' '}
            <Link href="/login" className="text-[#16834A] font-bold hover:underline">
              {t('লগইন করুন', 'Login here')}
            </Link>
          </p>
        </div>
      )}

      {step === 'otp' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-8 sm:p-12 shadow-card max-w-md mx-auto space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto shadow-soft">
            <KeyRound className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-[#17251C]">
              {t('মোবাইল ওটিপি যাচাই (OTP Verification)', 'Verify Mobile OTP')}
            </h2>
            <p className="text-xs text-[#68766D]">
              {t('আমরা আপনার নম্বরে ৬-সংখ্যার যাচাইকরণ কোড পাঠিয়েছি:', 'We sent a 6-digit code to:')}{' '}
              <span className="font-bold text-[#17251C]">{formData.phone || '+91 98321 44521'}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-black rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] focus:ring-2 focus:ring-[#16834A]/20"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={fillDemoOtp}
              className="text-xs text-[#16834A] font-bold hover:underline inline-block"
            >
              {t('⚡ অটো-ফিল ডেমো কোড (Auto-fill Demo OTP)', '⚡ Auto-fill Demo OTP')}
            </button>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-sm shadow-soft transition-all"
            >
              {t('ওটিপি নিশ্চিত করুন (Verify & Complete)', 'Verify & Complete')}
            </button>
          </form>
        </div>
      )}

      {step === 'success' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-8 sm:p-12 shadow-card max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto shadow-soft animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#17251C]">
              {t('অভিনন্দন! নিবন্ধন সফল হয়েছে', 'Registration Successful!')}
            </h2>
            <p className="text-xs text-[#68766D] leading-relaxed">
              {t(
                'AgroCare প্ল্যাটফর্মে আপনার অ্যাকাউন্ট সক্রিয় করা হয়েছে। আপনি এখন আপনার রোল অনুযায়ী ড্যাশবোর্ড ব্যবহার করতে পারেন।',
                'Your AgroCare account is active and verified. Proceeding to your personalized dashboard.'
              )}
            </p>
          </div>

          <button
            onClick={() => router.push(getRoleDashboard(selectedRole))}
            className="w-full py-3.5 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-sm shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <span>{t('ড্যাশবোর্ডে প্রবেশ করুন', 'Go to Dashboard')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

