'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockDiseases } from '../../data/agricultureData';
import { CropDisease } from '../../types';
import {
  Stethoscope,
  UploadCloud,
  Camera,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ShieldAlert,
  Sprout,
  HelpCircle,
  FileText,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function CropDoctorPage() {
  const { language, t } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState('Potato');
  const [selectedSymptom, setSelectedSymptom] = useState('black_spots');
  const [cropStage, setCropStage] = useState('vegetative');
  const [imagePreview, setImagePreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisReport, setDiagnosisReport] = useState<CropDisease | null>(mockDiseases[0]);

  const crops = [
    { id: 'Potato', nameBn: 'আলু (Potato)', nameEn: 'Potato' },
    { id: 'Paddy', nameBn: 'ধান (Paddy)', nameEn: 'Paddy / Rice' },
    { id: 'Tomato', nameBn: 'টমেটো (Tomato)', nameEn: 'Tomato' },
    { id: 'Mustard', nameBn: 'সরিষা (Mustard)', nameEn: 'Mustard' },
    { id: 'Wheat', nameBn: 'গম (Wheat)', nameEn: 'Wheat' },
    { id: 'Brinjal', nameBn: 'বেগুন (Brinjal)', nameEn: 'Brinjal / Eggplant' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const runAiDiagnosis = () => {
    setIsAnalyzing(true);
    setDiagnosisReport(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Match sample disease based on selected crop
      const match = mockDiseases.find((d) => d.cropEn.toLowerCase() === selectedCrop.toLowerCase()) || mockDiseases[0];
      setDiagnosisReport(match);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
          <Stethoscope className="w-3.5 h-3.5 text-[#16834A]" />
          <span>{t('কৃত্রিম বুদ্ধিমত্তা চালিত শস্য রোগ নির্ণয়', 'AI Plant Pathology Doctor')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17251C] tracking-tight">
          {t('AI ক্রপ ডক্টর — গাছের ছবি তুলুন, মুহূর্তেই চিকিৎসা জানুন', 'AI Crop Doctor — Instant Plant Disease Diagnosis')}
        </h1>
        <p className="text-sm sm:text-base text-[#68766D] leading-relaxed">
          {t(
            'গাছের রোগাক্রান্ত পাতা, কাণ্ড বা ফলের ছবি আপলোড করুন। AgroCare AI দ্রুত রোগ শনাক্ত করে জৈব ও অনুমোদিত রাসায়নিক প্রতিকারের সঠিক ডোজ জানাবে।',
            'Upload a clear leaf or stem photo of your damaged plant. AgroCare AI analyzes symptoms and outputs proven management protocols with verified label dosages.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Input Form & Image Upload */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
          <h2 className="font-extrabold text-base text-[#17251C] pb-3 border-b border-[#E4EBE5]">
            ১. {t('ফসলের তথ্য ও লক্ষণ দিন', 'Step 1: Crop Information & Symptoms')}
          </h2>

          {/* Crop Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#17251C]">
              {t('আক্রান্ত ফসল নির্বাচন করুন:', 'Select Damaged Crop:')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {crops.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCrop(c.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${selectedCrop === c.id
                      ? 'bg-[#16834A] text-white border-[#16834A] shadow-xs'
                      : 'bg-[#F8FAF8] text-[#17251C] border-[#E4EBE5] hover:border-[#16834A]'
                    }`}
                >
                  {language === 'bn' ? c.nameBn : c.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#17251C]">
              {t('প্রধান লক্ষণসমূহ:', 'Observed Symptoms:')}
            </label>
            <select
              value={selectedSymptom}
              onChange={(e) => setSelectedSymptom(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-[#F8FAF8] border border-[#E4EBE5] text-[#17251C] focus:outline-none focus:border-[#16834A]"
            >
              <option value="black_spots">{t('পাতায় কালো বা জলছাপ দাগ (Black or water-soaked spots)', 'Black / water-soaked spots')}</option>
              <option value="yellowing">{t('পাতা হলুদ হয়ে শুকিয়ে যাওয়া (Yellowing and drying leaves)', 'Yellowing leaves')}</option>
              <option value="leaf_curl">{t('পাতা কুঁকড়ে ছোট হয়ে যাওয়া (Leaf curling & stunting)', 'Leaf curling')}</option>
              <option value="wilting">{t('হঠাৎ গাছ শুকিয়ে ঢলে পড়া (Sudden wilting)', 'Sudden wilting')}</option>
              <option value="white_insects">{t('গাছের গোড়ায় বা পাতার নিচে সাদা মাছি/পোকা (Sucking insects)', 'Sucking insects')}</option>
            </select>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#17251C]">
              {t('গাছের আক্রান্ত অংশের ছবি আপলোড করুন:', 'Upload Plant Leaf Photo:')}
            </label>
            <div className="border-2 border-dashed border-[#16834A]/40 rounded-2xl p-4 text-center bg-[#F8FAF8] hover:bg-[#E9F6EE]/30 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <UploadCloud className="w-8 h-8 text-[#16834A] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#17251C]">
                {t('ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন', 'Click to upload or drag image here')}
              </p>
              <p className="text-[10px] text-[#68766D] mt-1">PNG, JPG, JPEG (Max 10MB)</p>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative rounded-2xl overflow-hidden h-40 bg-slate-900 border border-[#E4EBE5]">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                {t('পরীক্ষার জন্য নির্বাচিত ছবি', 'Selected Sample')}
              </span>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={runAiDiagnosis}
            disabled={isAnalyzing}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-extrabold text-sm shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t('AI মডেল বিশ্লেষণ করছে...', 'AI Model Analyzing...')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t('AI রোগ বিশ্লেষণ করুন', 'Analyze Crop Disease')}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Diagnosis Report */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
            <h2 className="font-extrabold text-base text-[#17251C]">
              ২. {t('AI রোগ নির্ণয় প্রতিবেদন', 'Step 2: AI Diagnosis Report')}
            </h2>
            {diagnosisReport && (
              <span className="bg-[#E9F6EE] text-[#16834A] font-extrabold text-xs px-3 py-1 rounded-full border border-[#16834A]/20">
                {t('নির্ভুলতা: ৯৬%', 'Confidence: 96%')}
              </span>
            )}
          </div>

          {isAnalyzing ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E9F6EE] text-[#16834A] flex items-center justify-center mx-auto animate-bounce">
                <Stethoscope className="w-8 h-8" />
              </div>
              <p className="font-bold text-sm text-[#17251C]">
                {t('ছবির ক্ষত ও প্যাথোজেন প্যাটার্ন বিশ্লেষণ করা হচ্ছে...', 'Analyzing leaf lesion patterns with Agronomy AI model...')}
              </p>
              <p className="text-xs text-[#68766D]">
                {t('অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।', 'Please wait a moment.')}
              </p>
            </div>
          ) : diagnosisReport ? (
            <div className="space-y-6 animate-in fade-in">
              {/* Disease Summary Box */}
              <div className="bg-[#E9F6EE] border border-[#16834A]/30 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#106B3B] bg-white px-2.5 py-0.5 rounded-full">
                    {t('শনাক্তকৃত রোগ', 'Identified Disease')}
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {t('আক্রমণের তীব্রতা: উচ্চ', 'Severity: High')}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#17251C]">
                  {language === 'bn' ? diagnosisReport.diseaseNameBn : diagnosisReport.diseaseNameEn}
                </h3>
                <p className="text-xs text-[#68766D] font-mono">
                  {t('রোগ সৃষ্টিকারী জীবাণু: ', 'Pathogen: ')} <strong>{diagnosisReport.pathogen}</strong>
                </p>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#17251C]">
                  {t('লক্ষণসমূহ (Symptoms):', 'Observed Symptoms:')}
                </h4>
                <p className="text-xs text-[#68766D] leading-relaxed bg-[#F8FAF8] p-3 rounded-xl border border-[#E4EBE5]">
                  {diagnosisReport.symptomsBn}
                </p>
              </div>

              {/* Organic Care (জৈব সমাধান) */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#16834A] flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-[#16834A]" />
                  {t('জৈব ও প্রাকৃতিক প্রতিকার (Organic Remedy):', 'Organic & Non-Chemical Remedy:')}
                </h4>
                <p className="text-xs text-[#17251C] leading-relaxed bg-[#E9F6EE]/50 p-3 rounded-xl border border-[#16834A]/20">
                  {diagnosisReport.organicRemedyBn}
                </p>
              </div>

              {/* Chemical Care & Prescription (অনুমোদিত রাসায়নিক প্রতিকার) */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#F2A93B] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#F2A93B]" />
                  {t('অনুমোদিত রাসায়নিক সমাধান ও ডোজ (Chemical Protocol):', 'Chemical Protocol & Dosage:')}
                </h4>
                <p className="text-xs text-[#17251C] leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200">
                  {diagnosisReport.chemicalRemedyBn}
                </p>
              </div>

              {/* Direct Purchase Link */}
              <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E4EBE5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#17251C]">
                    {t('প্রয়োজনীয় ওষুধ সরাসরি অর্ডার করতে চান?', 'Need the prescribed medicine delivered?')}
                  </p>
                  <p className="text-[11px] text-[#68766D]">
                    {t('মেনকোজেব বা রিডোমিল গোল্ড ঘরে বসে পান।', 'Order genuine Mancozeb or Ridomil Gold.')}
                  </p>
                </div>
                <Link
                  href="/shop?category=Pesticides"
                  className="px-4 py-2 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-bold shrink-0 transition-colors"
                >
                  {t('ওষুধ কিনুন', 'Buy Now')}
                </Link>
              </div>

              {/* Expert Escalation */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <Link
                  href="/expert"
                  className="inline-flex items-center gap-1.5 text-[#16834A] font-bold hover:underline"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t('কৃষি বিশেষজ্ঞের সাথে কথা বলুন', 'Consult Agriculture Expert')}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => alert(t('রিপোর্টটি সফলভাবে সেভ করা হয়েছে!', 'Report saved to your farmer profile!'))}
                  className="inline-flex items-center gap-1.5 text-[#68766D] hover:text-[#17251C] font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('প্রতিবেদন সংরক্ষণ করুন', 'Save Report')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-[#68766D] space-y-2">
              <Stethoscope className="w-10 h-10 mx-auto text-[#68766D]/40" />
              <p className="text-xs">
                {t('বামপাশের ফর্মটি পূরণ করে ছবি আপলোড করুন এবং রোগ বিশ্লেষণ বাটনে চাপ দিন।', 'Upload image and run AI diagnosis to view results.')}
              </p>
            </div>
          )}

          {/* Regulatory Disclaimer */}
          <div className="pt-4 border-t border-[#E4EBE5] text-[10px] text-[#68766D] flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              {t(
                'আইনি সতর্কতা: AI ক্রপ ডক্টর শুধুমাত্র প্রাথমিক রোগ শনাক্তকরণ ও পরামর্শের জন্য। মারাত্মক ক্ষতি বা বিশেষ পরিস্থিতিতে স্থানীয় কৃষি আধিকারিক বা বিশেষজ্ঞের পরামর্শ নেওয়া বাঞ্ছনীয়।',
                'Legal Disclaimer: AI Crop Doctor provides preliminary diagnostic assistance. For severe crop damage, consult a certified agronomist.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

