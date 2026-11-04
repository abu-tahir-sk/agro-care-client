'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sprout,
  Store,
  Building2,
  Stethoscope,
  Truck,
  ShieldCheck,
  LayoutDashboard,
  User,
  ShoppingBag,
  FileText,
  Calendar,
  CloudSun,
  Activity,
  Users,
  Package,
  Clock,
  ArrowLeft,
  LogOut,
  ChevronRight,
  X,
  CreditCard,
  FileSpreadsheet,
  AlertTriangle,
  Award,
  Settings,
} from 'lucide-react';
import { UserRole } from '../../types';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function DashboardSidebarContent({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const { role, user, loginAs, logout } = useAuth();

  const currentTab = searchParams.get('tab') || 'overview';

  // Determine active dashboard category from URL or current role
  const currentRole: UserRole = pathname.startsWith('/retailer')
    ? 'retailer'
    : pathname.startsWith('/supplier')
    ? 'supplier'
    : pathname.startsWith('/expert')
    ? 'expert'
    : pathname.startsWith('/delivery')
    ? 'delivery'
    : pathname.startsWith('/admin')
    ? 'admin'
    : 'farmer';

  // Role info configuration
  const roleConfig = {
    farmer: {
      titleBn: 'কৃষক ড্যাশবোর্ড',
      titleEn: 'Farmer Console',
      badge: '🧑‍🌾 Farmer',
      color: 'bg-emerald-600',
      icon: Sprout,
    },
    retailer: {
      titleBn: 'দোকানদার B2B পোর্টাল',
      titleEn: 'Retailer B2B Console',
      badge: '🏪 Retailer',
      color: 'bg-amber-600',
      icon: Store,
    },
    supplier: {
      titleBn: 'সরবরাহকারী হাব',
      titleEn: 'Supplier Hub',
      badge: '🏭 Supplier',
      color: 'bg-blue-600',
      icon: Building2,
    },
    expert: {
      titleBn: 'কৃষি বিশেষজ্ঞ প্যানেল',
      titleEn: 'Expert Panel',
      badge: '🔬 Agronomist',
      color: 'bg-teal-600',
      icon: Stethoscope,
    },
    delivery: {
      titleBn: 'ডেলিভারি ফ্লিট',
      titleEn: 'Delivery Fleet',
      badge: '🚚 Delivery',
      color: 'bg-orange-600',
      icon: Truck,
    },
    admin: {
      titleBn: 'সেন্ট্রাল অ্যাডমিন কন্ট্রোল',
      titleEn: 'Enterprise Admin',
      badge: '🛡️ Admin',
      color: 'bg-rose-700',
      icon: ShieldCheck,
    },
    super_admin: {
      titleBn: 'সুপার অ্যাডমিন',
      titleEn: 'Super Admin',
      badge: '👑 Super Admin',
      color: 'bg-purple-700',
      icon: ShieldCheck,
    },
    guest: {
      titleBn: 'গেস্ট ড্যাশবোর্ড',
      titleEn: 'Guest Console',
      badge: 'Guest',
      color: 'bg-slate-600',
      icon: User,
    },
  }[currentRole];

  // Role-specific navigation menus - All stay strictly INSIDE the respective dashboard!
  const navMenus: Record<UserRole, { tab: string; href: string; labelBn: string; labelEn: string; icon: any }[]> = {
    farmer: [
      { tab: 'overview', href: '/farmer?tab=overview', labelBn: 'ওভারভিউ', labelEn: 'Overview', icon: LayoutDashboard },
      { tab: 'crops', href: '/farmer?tab=crops', labelBn: 'আমার ফসল গাইড', labelEn: 'Crop Library', icon: Sprout },
      { tab: 'crop-doctor', href: '/farmer?tab=crop-doctor', labelBn: 'AI ক্রপ ডক্টর', labelEn: 'AI Crop Doctor', icon: Stethoscope },
      { tab: 'calculator', href: '/farmer?tab=calculator', labelBn: 'সার ক্যালকুলেটর', labelEn: 'Fertilizer Calc', icon: Activity },
      { tab: 'soil-health', href: '/farmer?tab=soil-health', labelBn: 'মৃত্তিকা স্বাস্থ্য কার্ড', labelEn: 'Soil Health', icon: FileText },
      { tab: 'weather', href: '/farmer?tab=weather', labelBn: 'আবহাওয়া সতর্কতা', labelEn: 'Weather Alert', icon: CloudSun },
      { tab: 'track-orders', href: '/farmer?tab=track-orders', labelBn: 'অর্ডার ট্র্যাকিং', labelEn: 'Track Orders', icon: Package },
      { tab: 'community', href: '/farmer?tab=community', labelBn: 'কৃষক সম্প্রদায়', labelEn: 'Community Forum', icon: Users },
      { tab: 'schemes', href: '/farmer?tab=schemes', labelBn: 'সরকারি প্রকল্প', labelEn: 'Govt Schemes', icon: Award },
    ],
    retailer: [
      { tab: 'overview', href: '/retailer?tab=overview', labelBn: 'দোকান ড্যাশবোর্ড', labelEn: 'Shop Overview', icon: LayoutDashboard },
      { tab: 'wholesale', href: '/retailer?tab=wholesale', labelBn: 'হোলসেল মার্কেট (B2B)', labelEn: 'Wholesale B2B', icon: Store },
      { tab: 'orders', href: '/retailer?tab=orders', labelBn: 'ক্রয় অর্ডার হিস্ট্রি', labelEn: 'Purchase Orders', icon: Package },
      { tab: 'licenses', href: '/retailer?tab=licenses', labelBn: 'লাইসেন্স ও কমপ্লায়েন্স', labelEn: 'License Docs', icon: ShieldCheck },
    ],
    supplier: [
      { tab: 'overview', href: '/supplier?tab=overview', labelBn: 'সাপ্লায়ার ওভারভিউ', labelEn: 'Supplier Dashboard', icon: LayoutDashboard },
      { tab: 'stock', href: '/supplier?tab=stock', labelBn: 'FEFO স্টক ও ব্যাচ ট্র্যাকিং', labelEn: 'FEFO Stock & Batches', icon: Package },
      { tab: 'orders', href: '/supplier?tab=orders', labelBn: 'ডিসপ্যাচ ও অর্ডার', labelEn: 'Dispatches & Orders', icon: Truck },
      { tab: 'licenses', href: '/supplier?tab=licenses', labelBn: 'অথরাইজেশন লাইসেন্স', labelEn: 'Authorization', icon: ShieldCheck },
    ],
    expert: [
      { tab: 'overview', href: '/expert?tab=overview', labelBn: 'প্যানেল ওভারভিউ', labelEn: 'Expert Panel', icon: LayoutDashboard },
      { tab: 'crop-doctor', href: '/expert?tab=crop-doctor', labelBn: 'রোগ ডায়াগনসিস রিভিউ', labelEn: 'Disease Diagnosis', icon: Stethoscope },
      { tab: 'community', href: '/expert?tab=community', labelBn: 'কৃষক প্রশ্নোত্তর ফোরাম', labelEn: 'Farmer Forum', icon: Users },
    ],
    delivery: [
      { tab: 'active', href: '/delivery?tab=active', labelBn: 'অ্যাসাইন করা ডেলিভারি', labelEn: 'Assigned Deliveries', icon: Truck },
      { tab: 'history', href: '/delivery?tab=history', labelBn: 'সম্পন্ন ডেলিভারি হিস্ট্রি', labelEn: 'Delivery History', icon: Package },
    ],
    admin: [
      { tab: 'overview', href: '/admin?tab=overview', labelBn: 'বিজনেস অ্যানালিটিক্স', labelEn: 'Analytics & KPIs', icon: LayoutDashboard },
      { tab: 'licenses', href: '/admin?tab=licenses', labelBn: 'লাইসেন্স ভেরিফিকেশন', labelEn: 'License Approval', icon: ShieldCheck },
      { tab: 'inventory', href: '/admin?tab=inventory', labelBn: 'FEFO গুদাম ইনভেন্টরি', labelEn: 'FEFO Inventory', icon: Package },
      { tab: 'users', href: '/admin?tab=users', labelBn: 'ইউজার ম্যানেজমেন্ট', labelEn: 'User Management', icon: Users },
    ],
    super_admin: [],
    guest: [],
  };

  const currentMenu = navMenus[currentRole] || navMenus.farmer;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#17251C] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Top Brand Bar */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#16834A] flex items-center justify-center text-white shadow-soft">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block leading-tight">
                  Agro<span className="text-[#16834A]">Care</span>
                </span>
                <span className="text-[9px] font-extrabold text-[#F2A93B] tracking-wider uppercase block">
                  {t('পোর্টাল কনসোল', 'Enterprise Portal')}
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Role Indicator */}
          <div className="p-4 mx-3 my-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg ${roleConfig.color} flex items-center justify-center text-white`}>
                <roleConfig.icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-white block">
                  {t(roleConfig.titleBn, roleConfig.titleEn)}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold block">
                  {user?.name ? user.name.split(' ')[0] : 'ইউজার'}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/80">
              {roleConfig.badge}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-white/40 block pb-1">
              {t('ড্যাশবোর্ড মেনু (Dashboard Menu)', 'Dashboard Menu')}
            </span>

            {currentMenu.map((item) => {
              const isActive = item.tab === currentTab;
              const Icon = item.icon;

              return (
                <Link
                  key={item.tab}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#16834A] text-white shadow-soft font-black ring-1 ring-emerald-400/30'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/50'}`} />
                    <span>{t(item.labelBn, item.labelEn)}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Role Switcher & Back to Main Store */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#111A14]">
          {/* Quick Role Switcher */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
              {t('ভূমিকা পরিবর্তন (Switch Role):', 'Switch Console Role:')}
            </span>
            <div className="grid grid-cols-3 gap-1 text-[10px]">
              {[
                { id: 'farmer', label: 'কৃষক', path: '/farmer?tab=overview' },
                { id: 'retailer', label: 'দোকান', path: '/retailer?tab=overview' },
                { id: 'supplier', label: 'সাপ্লায়ার', path: '/supplier?tab=overview' },
                { id: 'expert', label: 'বিশেষজ্ঞ', path: '/expert?tab=overview' },
                { id: 'delivery', label: 'ডেলিভারি', path: '/delivery?tab=active' },
                { id: 'admin', label: 'অ্যাডমিন', path: '/admin?tab=overview' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    loginAs(r.id as UserRole);
                    router.push(r.path);
                    onClose();
                  }}
                  className={`py-1 px-1.5 rounded-lg font-bold truncate transition-colors ${
                    currentRole === r.id
                      ? 'bg-[#16834A] text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Back to Public Web Store Button */}
          <Link
            href="/"
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>{t('মূল ওয়েবসাইটে ফিরে যান', 'Back to Public Store')}</span>
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="w-full py-2 px-3 text-rose-400 hover:text-rose-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('লগআউট (Logout)', 'Logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  return (
    <Suspense fallback={<aside className="fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#17251C]" />}>
      <DashboardSidebarContent {...props} />
    </Suspense>
  );
}
