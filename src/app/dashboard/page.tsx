'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, Loader2 } from 'lucide-react';

export default function DashboardHubPage() {
  const router = useRouter();
  const { role } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    switch (role) {
      case 'farmer':
        router.replace('/farmer');
        break;
      case 'retailer':
        router.replace('/retailer');
        break;
      case 'supplier':
        router.replace('/supplier');
        break;
      case 'expert':
        router.replace('/expert');
        break;
      case 'delivery':
        router.replace('/delivery');
        break;
      case 'admin':
      case 'super_admin':
        router.replace('/admin');
        break;
      default:
        router.replace('/login');
        break;
    }
  }, [role, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center shadow-soft animate-spin">
        <Loader2 className="w-6 h-6" />
      </div>
      <p className="text-xs font-bold text-[#17251C]">
        {t('আপনার ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...', 'Redirecting to your dashboard...')}
      </p>
    </div>
  );
}

