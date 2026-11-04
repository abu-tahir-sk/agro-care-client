'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Home, ShoppingBag, Stethoscope, Package, User } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { totalItems } = useCart();
  const { role } = useAuth();

  const getAccountHref = () => {
    switch (role) {
      case 'farmer':
        return '/farmer';
      case 'retailer':
        return '/retailer';
      case 'supplier':
        return '/supplier';
      case 'expert':
        return '/expert';
      case 'admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  const navItems = [
    { href: '/', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { href: '/shop', labelBn: 'বাজার', labelEn: 'Shop', icon: ShoppingBag },
    { href: '/crop-doctor', labelBn: 'ডক্টর', labelEn: 'Doctor', icon: Stethoscope, highlight: true },
    { href: '/cart', labelBn: 'ব্যাগ', labelEn: 'Cart', icon: Package, badge: totalItems > 0 ? totalItems : undefined },
    { href: getAccountHref(), labelBn: 'একাউন্ট', labelEn: 'Account', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E4EBE5] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-2">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center relative py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-[#16834A] font-black'
                  : 'text-[#68766D] hover:text-[#17251C]'
              }`}
            >
              <div className="relative">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
                    item.highlight
                      ? 'bg-[#16834A] text-white shadow-soft -mt-3 ring-4 ring-white'
                      : isActive
                      ? 'bg-[#E9F6EE] text-[#16834A]'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${item.highlight ? 'font-black text-[#16834A]' : ''}`}>
                {t(item.labelBn, item.labelEn)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

