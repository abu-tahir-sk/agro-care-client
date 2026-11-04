'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function TrackOrderPage() {
  const { language, t } = useLanguage();

  const [orderId, setOrderId] = useState('AC-ORD-9812');
  const [searchedOrder, setSearchedOrder] = useState<any>({
    id: 'AC-ORD-9812',
    date: '২৮ অক্টোবর ২০২৬, সকাল ১০:৩০',
    expectedDelivery: '০৪ নভেম্বর ২০২৬',
    items: [
      { name: 'ইফকো ডিএপি (১৮:৪৬:০) ৫০ কেজি ব্যাগ', qty: 2, price: 2700 },
      { name: 'বায়ার কনফিডোর কীটনাশক ২৫০ মিলি', qty: 1, price: 460 },
    ],
    total: 3160,
    shippingAddress: 'গ্রাম: মঙ্গলকোট, ব্লক: ভাতার, পূর্ব বর্ধমান, 713125',
    currentStage: 4, // 0: Placed, 1: Confirmed, 2: Packed, 3: Shipped, 4: Out for Delivery, 5: Delivered
    stages: [
      { label: 'অর্ডার গৃহীত হয়েছে (Placed)', time: '২৮ অক্টোবর, ১০:৩০ AM', done: true },
      { label: 'নিশ্চিত ও পেমেন্ট যাচাই (Confirmed)', time: '২৮ অক্টোবর, ১২:১৫ PM', done: true },
      { label: 'গুদাম থেকে প্যাকিং সম্পন্ন (Packed)', time: '২৯ অক্টোবর, ০৩:০০ PM', done: true },
      { label: 'ডেলিভারি হাবের উদ্দেশ্যে রওনা (Shipped)', time: '৩০ অক্টোবর, ০৯:০০ AM', done: true },
      { label: 'ডেলিভারি পার্টনারের কাছে (Out for Delivery)', time: 'আজ সকাল ০৮:৪৫', done: true, current: true },
      { label: 'গ্রাহককে হস্তান্তর (Delivered)', time: 'আনুমানিক আজ বিকাল ৫:০০', done: false },
    ],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      // simulate refresh or find
      setSearchedOrder({ ...searchedOrder, id: orderId.trim().toUpperCase() });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto shadow-soft">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17251C]">
          {t('অর্ডার ট্র্যাকিং ও ডেলিভারি স্ট্যাটাস', 'Track Your Order')}
        </h1>
        <p className="text-xs text-[#68766D]">
          {t('আপনার অর্ডার নম্বর (যেমন AC-ORD-9812) লিখে ডেলিভারি অগ্রগতি দেখুন।', 'Enter your Order Tracking ID to inspect real-time progress.')}
        </p>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="AC-ORD-9812"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs font-mono font-bold"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-black shadow-soft transition-all"
        >
          {t('খুঁজুন', 'Track')}
        </button>
      </form>

      {/* Tracking Result Card */}
      {searchedOrder && (
        <div className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-10 shadow-card space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E4EBE5] gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#68766D] uppercase tracking-wider block">
                {t('অর্ডার শনাক্তকরণ নম্বর:', 'Order Reference ID:')}
              </span>
              <h2 className="text-xl font-mono font-black text-[#16834A]">
                {searchedOrder.id}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold text-[#68766D] uppercase tracking-wider block">
                {t('প্রত্যাশিত ডেলিভারি:', 'Expected Delivery:')}
              </span>
              <p className="text-sm font-bold text-[#17251C]">
                {searchedOrder.expectedDelivery}
              </p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase text-[#17251C] tracking-wider">
              {t('ডেলিভারি পর্যায়ক্রম (Progress Stages):', 'Shipment Progress:')}
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4EBE5]">
              {searchedOrder.stages.map((stage: any, idx: number) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs ${stage.current
                        ? 'bg-[#16834A] text-white ring-4 ring-[#E9F6EE] animate-pulse'
                        : stage.done
                          ? 'bg-[#16834A] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                  >
                    {stage.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <div>
                    <h4
                      className={`text-xs ${stage.current ? 'font-black text-[#16834A]' : stage.done ? 'font-bold text-[#17251C]' : 'text-slate-400'
                        }`}
                    >
                      {stage.label}
                    </h4>
                    <span className="text-[11px] text-[#68766D]">{stage.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destination & Order Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E4EBE5] text-xs">
            <div className="space-y-2">
              <span className="font-bold text-[#17251C] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                {t('ডেলিভারি ঠিকানা (Shipping Destination):', 'Shipping Address:')}
              </span>
              <p className="text-[#68766D] leading-relaxed pl-5">
                {searchedOrder.shippingAddress}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[#17251C] flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-500" />
                {t('অর্ডারের আইটেমসমূহ:', 'Order Items:')}
              </span>
              <div className="pl-5 space-y-1">
                {searchedOrder.items.map((item: any, i: number) => (
                  <p key={i} className="text-[#68766D]">
                    {item.name} × {item.qty}
                  </p>
                ))}
                <p className="font-bold text-[#17251C] pt-1">
                  {t('মোট মূল্য:', 'Total:')} ₹{searchedOrder.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

