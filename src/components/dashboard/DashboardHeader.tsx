'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Globe,
  Bell,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

function DashboardHeaderContent({ onToggleSidebar }: DashboardHeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language, toggleLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const currentTab = searchParams.get('tab') || 'overview';

  const tabTitles: Record<string, { bn: string; en: string }> = {
    overview: { bn: 'ওভারভিউ কনসোল', en: 'Overview Console' },
    crops: { bn: 'ফসল চাষ গাইডলাইন', en: 'Crop Library' },
    'crop-doctor': { bn: 'AI ক্রপ ডক্টর (রোগ নির্ণয়)', en: 'AI Crop Doctor' },
    calculator: { bn: 'সার প্রয়োগ ক্যালকুলেটর', en: 'Fertilizer Calculator' },
    'soil-health': { bn: 'মৃত্তিকা স্বাস্থ্য কার্ড', en: 'Soil Health Card' },
    weather: { bn: 'কৃষি আবহাওয়া বুলেটিন', en: 'Weather Advisory' },
    'track-orders': { bn: 'অর্ডার অবস্থান ট্র্যাকিং', en: 'Order Tracking' },
    community: { bn: 'কৃষক সম্প্রদায় ফোরাম', en: 'Farmer Community' },
    schemes: { bn: 'সরকারি কৃষি প্রকল্প', en: 'Govt Schemes' },
    wholesale: { bn: 'হোলসেল B2B মার্কেট', en: 'Wholesale B2B' },
    orders: { bn: 'অর্ডার হিস্ট্রি', en: 'Order History' },
    licenses: { bn: 'লাইসেন্স ও কমপ্লায়েন্স', en: 'License Compliance' },
    stock: { bn: 'FEFO গুদাম স্টক', en: 'FEFO Warehouse Stock' },
    active: { bn: 'চলমান ডেলিভারি', en: 'Active Deliveries' },
    history: { bn: 'ডেলিভারি হিস্ট্রি', en: 'Delivery History' },
    inventory: { bn: 'ইনভেন্টরি ট্র্যাকিং', en: 'Inventory Tracking' },
    users: { bn: 'ইউজার ম্যানেজমেন্ট', en: 'User Management' },
  };

  const roleName = pathname.startsWith('/retailer')
    ? t('দোকানদার ড্যাশবোর্ড', 'Retailer Portal')
    : pathname.startsWith('/supplier')
    ? t('সরবরাহকারী হাব', 'Supplier Portal')
    : pathname.startsWith('/expert')
    ? t('কৃষি বিশেষজ্ঞ প্যানেল', 'Agronomist Panel')
    : pathname.startsWith('/delivery')
    ? t('ডেলিভারি ফ্লিট', 'Delivery Portal')
    : pathname.startsWith('/admin')
    ? t('অ্যাডমিন কন্ট্রোল সেন্টার', 'Admin Console')
    : t('কৃষক ড্যাশবোর্ড', 'Farmer Console');

  const subTitle = tabTitles[currentTab] ? t(tabTitles[currentTab].bn, tabTitles[currentTab].en) : '';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E4EBE5] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-[#17251C] hover:bg-slate-100 transition-colors"
          aria-label="Toggle Dashboard Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-sm sm:text-base font-black text-[#17251C] tracking-tight">
            {roleName}
          </h1>
          {subTitle && (
            <>
              <span className="text-[#68766D] text-xs hidden sm:inline">•</span>
              <span className="text-xs font-bold text-[#16834A] hidden sm:inline">
                {subTitle}
              </span>
            </>
          )}
          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold text-[#16834A] bg-[#E9F6EE] px-2.5 py-0.5 rounded-full ml-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('লাইসেন্স সার্টিফাইড', 'Verified')}</span>
          </span>
        </div>
      </div>

      {/* Right: Actions, Language, Notifications, User Chip */}
      <div className="flex items-center gap-3">
        {/* District indicator */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#68766D] bg-[#F8FAF8] px-3 py-1.5 rounded-full border border-[#E4EBE5]">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span>{user?.location || 'পূর্ব বর্ধমান (Purba Bardhaman)'}</span>
        </div>

        {/* Public Store Link */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9F6EE] hover:bg-[#D9EFDF] text-[#16834A] text-xs font-bold transition-colors border border-[#16834A]/20"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t('পাবলিক শপ', 'Public Shop')}</span>
          <ExternalLink className="w-3 h-3 text-[#16834A]/60" />
        </Link>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#E4EBE5] hover:border-[#16834A] text-xs font-bold text-[#17251C] transition-colors"
          title="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-full border border-[#E4EBE5] hover:bg-slate-50 text-[#17251C] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-elevated border border-[#E4EBE5] p-4 z-50 animate-in fade-in zoom-in-95 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4EBE5]">
                <span className="text-xs font-black text-[#17251C]">
                  {t('নোটিফিকেশন অ্যালার্ট', 'Notifications')}
                </span>
                <span className="text-[10px] text-[#16834A] font-bold">
                  {t('২ টি নতুন', '2 New')}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#E9F6EE] space-y-1">
                  <p className="font-bold text-[#17251C] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A]" />
                    {t('অর্ডার AC-ORD-9812 পথে রয়েছে', 'Order Dispatched')}
                  </p>
                  <span className="text-[10px] text-[#68766D] block">আজ সকাল ০৯:১৫</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 space-y-1">
                  <p className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                    {t('আবহাওয়া সতর্কতা: আগামী ৪৮ ঘণ্টায় কুয়াশা', 'Fog Weather Alert')}
                  </p>
                  <span className="text-[10px] text-amber-800/70 block">নাবি ধসা সতর্কতা বজায় রাখুন</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E4EBE5]">
          <div className="w-8 h-8 rounded-full bg-[#16834A] text-white flex items-center justify-center font-bold text-xs shadow-soft">
            {user?.name ? user.name.slice(0, 1) : 'U'}
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-bold text-[#17251C] block leading-tight">
              {user?.name || 'বিপ্লব মণ্ডল'}
            </span>
            <span className="text-[10px] text-[#68766D] font-mono block">
              {user?.phone || '+91 98321 44521'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <Suspense fallback={<header className="h-16 bg-white border-b border-[#E4EBE5]" />}>
      <DashboardHeaderContent {...props} />
    </Suspense>
  );
}
