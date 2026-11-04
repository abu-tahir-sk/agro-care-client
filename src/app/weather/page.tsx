'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockDistrictsWeather } from '../../data/agricultureData';
import { CloudSun, Droplets, Thermometer, Wind, AlertCircle, MapPin } from 'lucide-react';

export default function WeatherPage() {
  const { language, t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState(mockDistrictsWeather[0].district);

  const current = mockDistrictsWeather.find((d) => d.district === selectedDistrict) || mockDistrictsWeather[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <CloudSun className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('কৃষি আবহাওয়া বুলেটিন ও পূর্বাভাস', 'Agrometeorological Advisory')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('আবহাওয়ার পূর্বাভাস ও কৃষক সতর্কতা', 'Real-Time Farm Weather & Forecasts')}
        </h1>
        <p className="text-sm text-[#68766D] leading-relaxed">
          {t(
            'পশ্চিমবঙ্গের প্রতিটি জেলার তাপমাত্রা, বৃষ্টিপাতের সম্ভাবনা ও কৃষি ভিত্তিক আগাম সতর্কতা। প্রতিকূল আবহাওয়ায় ফসল রক্ষা করুন।',
            'District-specific meteorological parameters, precipitation likelihood, and crop protection advisories.'
          )}
        </p>
      </div>

      {/* District Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E4EBE5]">
        {mockDistrictsWeather.map((d) => (
          <button
            key={d.district}
            onClick={() => setSelectedDistrict(d.district)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${selectedDistrict === d.district
                ? 'bg-[#16834A] text-white shadow-soft'
                : 'bg-white text-[#17251C] border border-[#E4EBE5] hover:bg-[#F8FAF8]'
              }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? d.districtBn : d.district}</span>
          </button>
        ))}
      </div>

      {/* Featured Weather Card */}
      <div className="bg-gradient-to-br from-[#16834A] to-[#106B3B] text-white p-8 sm:p-12 rounded-3xl shadow-elevated space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#F2A93B] tracking-wider block mb-1">
              {t('নির্বাচিত জেলা', 'Selected District')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              {language === 'bn' ? current.districtBn : current.district}
            </h2>
            <p className="text-xs text-white/80 mt-1">{current.condition}</p>
          </div>

          <div className="text-right">
            <span className="text-5xl font-black text-white">{current.temp}°C</span>
            <span className="block text-xs text-white/70 mt-1">{t('সর্বোচ্চ / সর্বনিম্ন তাপমাত্রা', 'Max / Min Temp')}</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="bg-white/10 p-3.5 rounded-2xl flex items-center gap-3">
            <Droplets className="w-6 h-6 text-[#F2A93B]" />
            <div>
              <span className="text-white/70 block text-[11px]">{t('বাতাসে আর্দ্রতা', 'Humidity')}</span>
              <span className="font-extrabold text-sm">{current.humidity}%</span>
            </div>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl flex items-center gap-3">
            <CloudSun className="w-6 h-6 text-white" />
            <div>
              <span className="text-white/70 block text-[11px]">{t('বৃষ্টিপাত', 'Rainfall')}</span>
              <span className="font-extrabold text-sm">{current.rainfall}</span>
            </div>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl flex items-center gap-3">
            <Wind className="w-6 h-6 text-teal-300" />
            <div>
              <span className="text-white/70 block text-[11px]">{t('বাতাসের গতি', 'Wind Speed')}</span>
              <span className="font-extrabold text-sm">১২ কিমি/ঘণ্টা</span>
            </div>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-emerald-300" />
            <div>
              <span className="text-white/70 block text-[11px]">{t('আবহাওয়া ঝুঁকি', 'Alert Level')}</span>
              <span className="font-extrabold text-sm text-[#F2A93B]">{t('স্বাভাবিক', 'Normal')}</span>
            </div>
          </div>
        </div>

        {/* Advisory Box */}
        <div className="bg-white text-[#17251C] p-6 rounded-2xl space-y-2 shadow-card">
          <h3 className="font-black text-sm text-[#106B3B] flex items-center gap-2">
            🌾 {t('কৃষি ও মাঠ পরামর্শ (Official Farm Advisory):', 'Agronomy Field Advisory:')}
          </h3>
          <p className="text-xs sm:text-sm text-[#17251C] leading-relaxed">
            {current.advisoryBn}
          </p>
        </div>
      </div>
    </div>
  );
}

