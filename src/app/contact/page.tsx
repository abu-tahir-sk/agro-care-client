'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', district: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('যোগাযোগ ও কৃষক সহায়তা কেন্দ্র', 'AgroCare Support Center')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('আমরা আপনাকে সাহায্য করতে সবসময় পাশে আছি', 'Get in Touch with AgroCare Support')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'কৃষি পণ্য অর্ডার, পাইকারি ক্রয়, লাইসেন্স ভেরিফিকেশন বা বিশেষজ্ঞের পরামর্শ পেতে যোগাযোগ করুন।',
            'Connect with our dedicated agriculture coordinators, logistics specialists, and agronomists.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#17251C] text-white rounded-3xl p-8 space-y-6 shadow-elevated">
            <h3 className="text-xl font-black">
              {t('সরাসরি হেল্পলাইন ও অফিস', 'Direct Helplines')}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-white/60 block">{t('কৃষক টোল-ফ্রি হেল্পলাইন:', 'Farmer Hotline:')}</span>
                  <a href="tel:18001234567" className="font-bold text-base hover:underline text-emerald-300">
                    1800 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-white/60 block">{t('হোয়াটসঅ্যাপ সহায়তা (WhatsApp):', 'WhatsApp Support:')}</span>
                  <span className="font-bold text-base text-white">+91 98321 00000</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-white/60 block">{t('ইমেইল যোগাযোগ:', 'Email Support:')}</span>
                  <span className="font-bold text-white">support@agrocare.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <span className="text-white/60 block">{t('সেন্ট্রাল অফিস ও ওয়্যারহাউস:', 'Central Headquarters:')}</span>
                  <p className="text-white leading-relaxed">
                    সেক্টর ৫, সল্টলেক, কলকাতা - ৭০০০৯১, পশ্চিমবঙ্গ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E4EBE5] p-8 shadow-card">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-lg font-black text-[#17251C] pb-2 border-b border-[#E4EBE5]">
                {t('আমাদের বার্তা পাঠান', 'Send us a Message')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('আপনার নাম *', 'Your Name *')}</label>
                  <input
                    type="text"
                    required
                    placeholder="উদা: অমল দত্ত"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('মোবাইল নম্বর *', 'Phone Number *')}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98321 44521"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#17251C]">{t('আপনার জেলা', 'District')}</label>
                <input
                  type="text"
                  placeholder="পূর্ব বর্ধমান / হুগলী / নদীয়া"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#17251C]">{t('বার্তা বা জিজ্ঞাসা *', 'Message / Query *')}</label>
                <textarea
                  required
                  rows={4}
                  placeholder={t('আপনার প্রশ্ন বিস্তারিত লিখুন...', 'Write your questions here...')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-xs shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t('বার্তা পাঠান', 'Submit Message')}</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#17251C]">
                {t('আপনার বার্তা সফলভাবে গৃহীত হয়েছে!', 'Message Sent Successfully!')}
              </h3>
              <p className="text-xs text-[#68766D] max-w-sm mx-auto">
                {t('আমাদের গ্রাহক সেবা প্রতিনিধি অতি দ্রুত আপনার সাথে যোগাযোগ করবেন।', 'Our customer coordinator will connect with you shortly.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

