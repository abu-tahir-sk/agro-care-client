'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';

function XLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#17251C] text-white/80 pt-16 pb-10 border-t border-white/10 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#16834A] flex items-center justify-center text-white shadow-soft">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Agro<span className="text-[#16834A]">Care</span>
                </span>
                <span className="block text-[10px] font-bold text-white/60 tracking-wider uppercase">
                  {t('আধুনিক ডিজিটাল কৃষি ইকোসিস্টেম', 'Modern Agritech Platform')}
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              {t(
                'AgroCare হলো পশ্চিমবঙ্গের আধুনিক হাইব্রিড B2B2C কৃষি প্ল্যাটফর্ম। কৃষক ও কৃষি ব্যবসায়ীদের জন্য সঠিক মূল্যে খাঁটি কৃষি ইনপুট, AI ক্রপ ডক্টর এবং আধুনিক কৃষি পরামর্শের সমন্বিত সমাধান।',
                'AgroCare is an advanced hybrid B2B2C agriculture e-commerce and agritech platform serving farmers, retailers, and distributors with genuine agri-inputs and AI crop diagnostics.'
              )}
            </p>

            {/* License & Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#F2A93B]">
              <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" /> {t('সার্টিফাইড সার ও বীজ', 'Certified Seeds & Fertilizer')}
              </span>
              <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                <Award className="w-3.5 h-3.5 text-[#F2A93B]" /> {t('লাইসেন্সপ্রাপ্ত কৃষি ডিলার', 'Govt Licensed Dealer')}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              {t('প্রয়োজনীয় লিংক', 'Quick Navigation')}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link href="/shop" className="hover:text-white transition-colors">{t('সকল কৃষি পণ্য', 'All Products')}</Link></li>
              <li><Link href="/wholesale" className="hover:text-white transition-colors">{t('হোলসেল মার্কেটপ্লেস (B2B)', 'Wholesale Marketplace')}</Link></li>
              <li><Link href="/crop-doctor" className="hover:text-white transition-colors font-semibold text-[#F2A93B]">{t('AI ক্রপ ডক্টর (রোগ নির্ণয়)', 'AI Crop Doctor')}</Link></li>
              <li><Link href="/crops" className="hover:text-white transition-colors">{t('ক্রপ লাইব্রেরি', 'Crop Library')}</Link></li>
              <li><Link href="/disease-library" className="hover:text-white transition-colors">{t('রোগবালাই এনসাইক্লোপিডিয়া', 'Disease Library')}</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">{t('সার ক্যালকুলেটর', 'Fertilizer Calculator')}</Link></li>
              <li><Link href="/soil-health" className="hover:text-white transition-colors">{t('মৃত্তিকা স্বাস্থ্য কার্ড', 'Soil Health Card')}</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">{t('অর্ডার ট্র্যাক করুন', 'Track Order')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Role Portals & Community */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              {t('পোর্টাল ও সার্ভিস', 'Portals & Services')}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link href="/farmer" className="hover:text-white transition-colors">{t('কৃষক ড্যাশবোর্ড', 'Farmer Dashboard')}</Link></li>
              <li><Link href="/retailer" className="hover:text-white transition-colors">{t('দোকানদার ড্যাশবোর্ড', 'Retailer Dashboard')}</Link></li>
              <li><Link href="/supplier" className="hover:text-white transition-colors">{t('সাপ্লায়ার ড্যাশবোর্ড', 'Supplier Dashboard')}</Link></li>
              <li><Link href="/delivery" className="hover:text-white transition-colors">{t('ডেলিভারি স্টাফ পোর্টাল', 'Delivery Staff Portal')}</Link></li>
              <li><Link href="/expert" className="hover:text-white transition-colors">{t('কৃষি বিশেষজ্ঞ প্যানেল', 'Expert Consultation')}</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors text-emerald-400 font-bold">{t('কৃষক সম্প্রদায় ও ফোরাম', 'Farmer Community')}</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">{t('সেন্ট্রাল অ্যাডমিন', 'Admin Control Panel')}</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">{t('নতুন অ্যাকাউন্ট নিবন্ধন', 'Register Account')}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              {t('যোগাযোগ ও সহায়তা', 'Help & Contact')}
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#16834A] shrink-0 mt-0.5" />
                <span>{t('সল্টলেক সেক্টর ৫, কলকাতা, পশ্চিমবঙ্গ - ৭০০০৯১', 'Salt Lake Sector V, Kolkata, WB - 700091')}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#16834A] shrink-0" />
                <span>{t('টোল-ফ্রি হেল্পলাইন: ১৮০০-১২৩-৪৫৬', 'Toll Free: 1800-123-456')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#16834A] shrink-0" />
                <span>support@agrocare.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#16834A] shrink-0" />
                <span>{t('সোম - শনি: সকাল ৮টা - রাত ৮টা', 'Mon - Sat: 8 AM - 8 PM')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Social, Legal & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} AgroCare Technologies Pvt Ltd. {t('সর্বস্বত্ব সংরক্ষিত।', 'All rights reserved.')}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">{t('গোপনীয়তা নীতি', 'Privacy Policy')}</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">{t('শর্তাবলী', 'Terms & Conditions')}</Link>
            <span>•</span>
            <Link href="/compliance" className="hover:text-white transition-colors">{t('লাইসেন্স ও কমপ্লায়েন্স', 'License & Compliance')}</Link>
            <span>•</span>
            <Link href="/product-safety" className="hover:text-white transition-colors">{t('পণ্য নিরাপত্তা গাইডলাইন', 'Product Safety')}</Link>
          </div>

          <div className="flex items-center gap-2.5">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#16834A] flex items-center justify-center transition-colors">
              <XLogo className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </div>

        {/* Mandatory Regulatory Compliance Notice */}
        <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-white/40 leading-relaxed text-center">
          {t(
            'সতর্কবার্তা: সার, কীটনাশক ও বীজ শুধুমাত্র প্রযোজ্য সরকারি আইন, কীটনাশক আইন ১৯৬৮ এবং বীজ আইন ১৯৬৬ মেনে লাইসেন্সপ্রাপ্ত ডিলার ও কৃষকদের নিকট সরবরাহ করা হয়। অনুমোদিত লেবেল নির্দেশিকা মেনে কীটনাশক ব্যবহার করুন।',
            'Notice: Fertilizers, Insecticides, and Seeds are distributed in strict adherence to the Insecticide Act 1968 and Seeds Act 1966 through verified licensed distributors. Always read the manufacturer label instructions carefully.'
          )}
        </div>
      </div>
    </footer>
  );
}

