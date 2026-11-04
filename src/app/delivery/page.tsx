'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Truck,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Navigation,
  Clock,
  ShieldCheck,
  Package,
} from 'lucide-react';

interface DeliveryOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  district: string;
  items: string;
  paymentMethod: 'COD' | 'Prepaid UPI';
  amount: number;
  status: 'Out for Delivery' | 'Delivered' | 'Failed';
  pickupHub: string;
}

function DeliveryDashboardContent() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'active' | 'history'>(
    urlTab === 'history' ? 'history' : 'active'
  );

  React.useEffect(() => {
    if (urlTab === 'history' || urlTab === 'active') {
      setActiveTab(urlTab);
    }
  }, [urlTab]);
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: 'AC-ORD-9812',
      customerName: 'বিপ্লব মণ্ডল (Biplab Mondal)',
      phone: '+91 98321 44521',
      address: 'গ্রাম: মঙ্গলকোট, ব্লক: ভাতার, পিন: 713125',
      district: 'পূর্ব বর্ধমান (Purba Bardhaman)',
      items: 'ইফকো ডিএপি (২ ব্যাগ), বায়ার কনফিডোর (১ বোতল)',
      paymentMethod: 'COD',
      amount: 3160,
      status: 'Out for Delivery',
      pickupHub: 'Burdwan Central Agro Hub',
    },
    {
      id: 'AC-ORD-9820',
      customerName: 'প্রভাত সেনগুপ্ত (Prabhat Sengupta)',
      phone: '+91 94331 55620',
      address: 'শান্তিপুর রোড, কালনা গেট',
      district: 'পূর্ব বর্ধমান',
      items: 'স্বর্ণা-সাব১ ধানের বীজ (১০ কেজি)',
      paymentMethod: 'Prepaid UPI',
      amount: 590,
      status: 'Out for Delivery',
      pickupHub: 'Burdwan Central Agro Hub',
    },
    {
      id: 'AC-ORD-9450',
      customerName: 'তারকনাথ মাঝি',
      phone: '+91 91234 56789',
      address: 'মেমারী স্টেশন সংলগ্ন চক',
      district: 'পূর্ব বর্ধমান',
      items: 'গ্রো-মোর জৈব তরল সার (১ লিটার)',
      paymentMethod: 'Prepaid UPI',
      amount: 380,
      status: 'Delivered',
      pickupHub: 'Burdwan Central Agro Hub',
    },
  ]);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === '1234' || otpInput.length >= 4) {
      if (selectedOrder) {
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? { ...o, status: 'Delivered' } : o))
        );
        setSuccessToast(
          t(
            `অর্ডার ${selectedOrder.id} সফলভাবে গ্রাহককে হস্তান্তর করা হয়েছে!`,
            `Order ${selectedOrder.id} successfully delivered!`
          )
        );
      }
      setSelectedOrder(null);
      setOtpInput('');
      setOtpError(false);
      setTimeout(() => setSuccessToast(null), 4000);
    } else {
      setOtpError(true);
    }
  };

  const activeOrders = orders.filter((o) => o.status === 'Out for Delivery');
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast */}
      {successToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#16834A] text-white px-5 py-3 rounded-2xl shadow-elevated flex items-center gap-2 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#17251C] text-white p-8 rounded-3xl shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A] text-white text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>{t('ডেলিভারি স্টাফ পোর্টাল', 'AgroCare Delivery Fleet')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {user?.name || 'সুজয় দাস (Sujoy Das)'}
          </h1>
          <p className="text-xs text-white/70">
            {t('অ্যাসাইন করা হাব: বর্ধমান সেন্ট্রাল ডিপো • সক্রিয় ডিউটি', 'Assigned Hub: Burdwan Central Hub • On-Duty')}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'active' ? 'bg-[#16834A] text-white shadow-soft' : 'text-white/80 hover:text-white'
              }`}
          >
            {t(`চলমান ডেলিভারি (${activeOrders.length})`, `Active (${activeOrders.length})`)}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-[#16834A] text-white shadow-soft' : 'text-white/80 hover:text-white'
              }`}
          >
            {t(`সম্পন্ন হিস্ট্রি (${deliveredOrders.length})`, `Delivered (${deliveredOrders.length})`)}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-1">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('আজকের মোট অ্যাসাইন', 'Assigned Today')}</span>
          <p className="text-2xl font-black text-[#17251C]">{orders.length} টি</p>
          <p className="text-[11px] text-[#68766D]">{t('বর্ধমান গ্রামীণ রুট', 'Burdwan Rural Route')}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-1">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('বাকি ডেলিভারি', 'Pending Drop-offs')}</span>
          <p className="text-2xl font-black text-amber-600">{activeOrders.length} টি</p>
          <p className="text-[11px] text-[#68766D]">{t('OTP ভেরিফিকেশন সাপেক্ষে হস্তান্তর', 'Requires customer OTP')}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-1">
          <span className="text-[#68766D] text-xs font-bold uppercase">{t('সফল হস্তান্তর', 'Delivered Success')}</span>
          <p className="text-2xl font-black text-[#16834A]">{deliveredOrders.length} টি</p>
          <p className="text-[11px] text-[#68766D]">{t('১০০% ওটিপি ভেরিফাইড', '100% verified with OTP')}</p>
        </div>
      </div>

      {/* Active Delivery Orders List */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <h2 className="text-lg font-black text-[#17251C] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#16834A]" />
            <span>{t('বর্তমান সক্রিয় অর্ডারসমূহ (Active Orders)', 'Active Delivery Orders')}</span>
          </h2>

          {activeOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#E4EBE5] text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#16834A] mx-auto" />
              <p className="text-sm font-bold text-[#17251C]">
                {t('আজকের সমস্ত ডেলিভারি সফলভাবে সম্পন্ন হয়েছে!', 'All deliveries completed for today!')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-[#E4EBE5] p-6 shadow-card space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
                      <span className="text-xs font-mono font-bold text-[#16834A] bg-[#E9F6EE] px-2.5 py-1 rounded-full">
                        {order.id}
                      </span>
                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-full ${order.paymentMethod === 'COD'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-100 text-emerald-800'
                          }`}
                      >
                        {order.paymentMethod === 'COD' ? `COD: ₹${order.amount} সংগ্রহ করুন` : 'Prepaid (টাকা নেওয়া আছে)'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <p className="text-base font-black text-[#17251C]">{order.customerName}</p>
                      <div className="flex items-center gap-2 text-[#68766D]">
                        <Phone className="w-3.5 h-3.5 text-[#16834A]" />
                        <a href={`tel:${order.phone}`} className="hover:underline font-bold text-[#17251C]">
                          {order.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-[#68766D]">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                        <span>{order.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#68766D] pt-1">
                        <Package className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-medium text-[#17251C]">{order.items}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#E4EBE5]">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(order.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl border border-[#E4EBE5] hover:bg-slate-50 text-xs font-bold text-center flex items-center justify-center gap-1.5 text-[#17251C]"
                    >
                      <Navigation className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t('ম্যাপে রুট', 'Navigation')}</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setOtpError(false);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-soft"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>{t('OTP দিয়ে ডেলিভারি', 'Deliver with OTP')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delivered History List */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] overflow-hidden shadow-card">
          <div className="p-6 border-b border-[#E4EBE5]">
            <h2 className="text-lg font-black text-[#17251C]">
              {t('সফলভাবে সম্পন্ন ডেলিভারি তালিকা', 'Completed Delivery Records')}
            </h2>
          </div>
          <div className="divide-y divide-[#E4EBE5]">
            {deliveredOrders.map((order) => (
              <div key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#16834A]">{order.id}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {t('ডেলিভারি সম্পন্ন (OTP Verified)', 'Delivered')}
                    </span>
                  </div>
                  <p className="font-bold text-[#17251C]">{order.customerName} • {order.phone}</p>
                  <p className="text-[#68766D]">{order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#17251C]">₹{order.amount}</p>
                  <span className="text-[11px] text-[#68766D]">{order.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-2xl animate-scale-up">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#17251C]">
                {t('গ্রাহকের ওটিপি যাচাই করুন', 'Enter Customer OTP')}
              </h3>
              <p className="text-xs text-[#68766D]">
                {t('গ্রাহক ', 'Customer ')} <span className="font-bold">{selectedOrder.customerName}</span>-এর ফোনে প্রেরিত ৪ সংখ্যার কোড লিখুন:
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="উদা: 1234"
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value);
                    setOtpError(false);
                  }}
                  className="w-full text-center text-2xl font-mono font-black py-3 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] tracking-widest"
                />
                {otpError && (
                  <p className="text-[11px] text-rose-600 font-bold mt-1 text-center">
                    {t('ভুল ওটিপি! অনুগ্রহ করে পুনরায় চেষ্টা করুন।', 'Invalid OTP! Please try again.')}
                  </p>
                )}
                <p className="text-[10px] text-[#68766D] text-center mt-1.5">
                  {t('⚡ ডেমো কোড: 1234 ব্যবহার করুন', '⚡ Demo Code: use 1234')}
                </p>
              </div>

              {selectedOrder.paymentMethod === 'COD' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{t(`অনুগ্রহ করে নগদ ₹${selectedOrder.amount} গ্রহণ করুন`, `Please collect cash ₹${selectedOrder.amount}`)}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E4EBE5] text-xs font-bold text-[#68766D] hover:bg-slate-50"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-black shadow-soft"
                >
                  {t('যাচাই ও হস্তান্তর', 'Verify & Deliver')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DeliveryDashboard() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-[#68766D]">Loading Delivery Console...</div>}>
      <DeliveryDashboardContent />
    </Suspense>
  );
}

