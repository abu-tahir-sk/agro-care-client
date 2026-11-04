'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  Search,
  ShoppingCart,
  User,
  Globe,
  Stethoscope,
  BookOpen,
  CloudSun,
  Award,
  Layers,
  Menu,
  X,
  ChevronDown,
  Building2,
  Store,
  ShieldAlert,
} from 'lucide-react';
import { UserRole } from '../types';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const { role, user, loginAs, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: '/', labelBn: 'হোম', labelEn: 'Home' },
    { href: '/shop', labelBn: 'কৃষি বাজার', labelEn: 'Shop' },
    { href: '/wholesale', labelBn: 'হোলসেল মার্কেট', labelEn: 'Wholesale B2B', badge: 'B2B' },
    { href: '/crop-doctor', labelBn: 'AI ক্রপ ডক্টর', labelEn: 'AI Crop Doctor', icon: Stethoscope, highlight: true },
    { href: '/crop-guide', labelBn: 'ফসল নির্দেশিকা', labelEn: 'Crop Guide', icon: BookOpen },
    { href: '/weather', labelBn: 'আবহাওয়া', labelEn: 'Weather', icon: CloudSun },
    { href: '/schemes', labelBn: 'সরকারি প্রকল্প', labelEn: 'Schemes', icon: Award },
  ];

  const getDashboardLink = () => {
    switch (role) {
      case 'farmer':
        return '/farmer';
      case 'retailer':
        return '/retailer';
      case 'supplier':
        return '/supplier';
      case 'expert':
        return '/expert';
      case 'delivery':
        return '/delivery';
      case 'admin':
      case 'super_admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'farmer':
        return t('কৃষক (Farmer)', 'Farmer');
      case 'retailer':
        return t('দোকানদার (Retailer)', 'Retailer');
      case 'supplier':
        return t('সরবরাহকারী (Supplier)', 'Supplier');
      case 'expert':
        return t('কৃষি বিশেষজ্ঞ (Expert)', 'Agri Expert');
      case 'delivery':
        return t('ডেলিভারি (Delivery)', 'Delivery Staff');
      case 'admin':
        return t('অ্যাডমিন (Admin)', 'Admin');
      default:
        return t('লগইন করুন', 'Login');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E4EBE5] shadow-xs">
      {/* Middle Bar: Logo, Search, Lang, Role, Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-[#16834A] flex items-center justify-center text-white shadow-soft">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-[#17251C]">
              Agro<span className="text-[#16834A]">Care</span>
            </span>
            <span className="block text-[10px] font-bold text-[#68766D] tracking-wider uppercase">
              {t('ডিজিটাল কৃষি ইকোসিস্টেম', 'Smart Agritech Platform')}
            </span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              'সার, কীটনাশক, বীজ, রোগ বা ফসল খুঁজুন...',
              'Search fertilizers, seeds, pesticides, crops...'
            )}
            className="w-full pl-11 pr-24 py-2.5 rounded-full border border-[#E4EBE5] bg-[#F8FAF8] text-sm text-[#17251C] focus:outline-none focus:border-[#16834A] focus:bg-white transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-[#68766D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-semibold transition-colors"
          >
            {t('অনুসন্ধান', 'Search')}
          </button>
        </form>

        {/* Actions: Lang, Switch Role Demo, Cart, Account */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E4EBE5] hover:border-[#16834A] bg-[#F8FAF8] text-xs font-bold text-[#17251C] transition-colors"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#16834A]" />
            <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Quick Demo Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9F6EE] border border-[#16834A]/20 text-[#16834A] text-xs font-bold transition-all hover:bg-[#D9EFDF]"
            >
              <span>{t('ভূমিকা:', 'Role:')}</span>
              <span className="font-extrabold underline">{getRoleLabel(role)}</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-[#E4EBE5] py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#68766D] uppercase border-b border-[#E4EBE5]">
                  {t('সুইচ ড্যাশবোর্ড রোল (Switch Role)', 'Switch User Role')}
                </div>
                {(['farmer', 'retailer', 'supplier', 'expert', 'delivery', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      loginAs(r);
                      setRoleDropdownOpen(false);
                      router.push(
                        r === 'farmer'
                          ? '/farmer'
                          : r === 'retailer'
                          ? '/retailer'
                          : r === 'supplier'
                          ? '/supplier'
                          : r === 'expert'
                          ? '/expert'
                          : r === 'delivery'
                          ? '/delivery'
                          : '/admin'
                      );
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-[#E9F6EE] hover:text-[#16834A] transition-colors ${role === r ? 'font-bold text-[#16834A] bg-[#E9F6EE]/50' : 'text-[#17251C]'
                      }`}
                  >
                    <span>{getRoleLabel(r)}</span>
                    {role === r && <span className="w-2 h-2 rounded-full bg-[#16834A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-full bg-[#F8FAF8] hover:bg-[#E9F6EE] text-[#17251C] hover:text-[#16834A] transition-colors border border-[#E4EBE5]"
            title={t('শপিং ব্যাগ', 'Shopping Cart')}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F2A93B] text-[#17251C] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Account / Dashboard Link */}
          <Link
            href={getDashboardLink()}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-bold transition-all shadow-soft"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline">
              {role === 'guest' ? t('লগইন', 'Login') : t('ড্যাশবোর্ড', 'Dashboard')}
            </span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#17251C]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <nav className="hidden md:block bg-[#F8FAF8] border-t border-[#E4EBE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${active
                      ? 'bg-[#16834A] text-white font-bold shadow-xs'
                      : link.highlight
                        ? 'text-[#16834A] bg-[#E9F6EE] hover:bg-[#D9EFDF] font-bold'
                        : 'text-[#17251C] hover:text-[#16834A] hover:bg-white'
                    }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{language === 'bn' ? link.labelBn : link.labelEn}</span>
                  {link.badge && (
                    <span className="bg-[#F2A93B] text-[#17251C] text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[#68766D] py-2">
            <Link href="/farmer" className="hover:text-[#16834A] transition-colors flex items-center gap-1">
              <Sprout className="w-3 h-3 text-[#16834A]" /> {t('কৃষক পোর্টাল', 'Farmer Portal')}
            </Link>
            <span>•</span>
            <Link href="/retailer" className="hover:text-[#16834A] transition-colors flex items-center gap-1">
              <Store className="w-3 h-3 text-[#F2A93B]" /> {t('দোকানদার কর্নার', 'Retailer Corner')}
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-[#16834A] transition-colors flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#106B3B]" /> {t('অ্যাডমিন কন্ট্রোল', 'Admin Panel')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E4EBE5] px-4 py-4 space-y-3 shadow-lg">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('পণ্য বা ফসল অনুসন্ধান করুন...', 'Search products...')}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E4EBE5] bg-[#F8FAF8] text-xs"
            />
            <Search className="w-4 h-4 text-[#68766D] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-[#17251C] hover:bg-[#E9F6EE] hover:text-[#16834A]"
              >
                <span>{language === 'bn' ? link.labelBn : link.labelEn}</span>
                {link.badge && (
                  <span className="bg-[#F2A93B] text-[#17251C] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E4EBE5] grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/farmer"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#E9F6EE] text-[#16834A] text-center"
            >
              {t('কৃষক ড্যাশবোর্ড', 'Farmer Dashboard')}
            </Link>
            <Link
              href="/retailer"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#fef3c7] text-[#17251C] text-center"
            >
              {t('হোলসেল ড্যাশবোর্ড', 'Retailer Dashboard')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

