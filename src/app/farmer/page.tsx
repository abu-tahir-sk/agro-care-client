'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  mockProducts,
  mockCropGuides,
  mockDiseases,
  mockDistrictsWeather,
  mockSchemes,
} from '../../data/agricultureData';
import {
  Sprout,
  ShoppingBag,
  Stethoscope,
  CloudSun,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  TrendingUp,
  Activity,
  Calculator,
  Users,
  Package,
  Award,
  UploadCloud,
  Search,
  ShieldAlert,
  Sparkles,
  ShieldCheck,
  Send,
  PlusCircle,
  ThumbsUp,
  Share2,
  MessageSquare,
} from 'lucide-react';

function FarmerDashboardContent() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const currentTab = searchParams.get('tab') || 'overview';

  // --- STATE FOR CROPS TAB ---
  const [cropSearch, setCropSearch] = useState('');
  const [cropSeasonFilter, setCropSeasonFilter] = useState('All');

  // --- STATE FOR CROP DOCTOR TAB ---
  const [selectedCrop, setSelectedCrop] = useState('Potato');
  const [cropStage, setCropStage] = useState('vegetative');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisReport, setDiagnosisReport] = useState<any>(mockDiseases[0]);

  // --- STATE FOR FERTILIZER CALCULATOR TAB ---
  const [calcCrop, setCalcCrop] = useState('potato');
  const [calcUnit, setCalcUnit] = useState<'bigha' | 'acre'>('bigha');
  const [calcArea, setCalcArea] = useState<number>(3);
  const [calcFertility, setCalcFertility] = useState<'normal' | 'low' | 'high'>('normal');

  // --- STATE FOR SOIL HEALTH TAB ---
  const [soilUploaded, setSoilUploaded] = useState(false);

  // --- STATE FOR WEATHER TAB ---
  const [selectedDistrict, setSelectedDistrict] = useState(mockDistrictsWeather[0].district);

  // --- STATE FOR TRACK ORDERS TAB ---
  const [trackOrderId, setTrackOrderId] = useState('AC-ORD-9812');

  // --- STATE FOR COMMUNITY TAB ---
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 'p-1',
      author: 'বিপ্লব মণ্ডল',
      location: 'মঙ্গলকোট, পূর্ব বর্ধমান',
      time: '২ ঘণ্টা পূর্বে',
      title: 'আলু গাছের গোড়া পচে গাছ ঢলে পড়ছে — কী ওষুধ দিলে কাজ হবে?',
      content:
        'কুফরি জ্যোতি জাতের আলুর বয়স ৩৫ দিন। কুয়াশায় গাছের গোড়া নরম হয়ে কালচে দাগ হয়ে গেছে। বিশেষজ্ঞ স্যারের পরামর্শ চাই।',
      likes: 18,
      comments: 6,
      expertAnswer:
        'এটি আলু ফসলের নাবি ধসা (Late Blight)। প্রতি লিটার জলে ২ গ্রাম রিডোমিল গোল্ড (Metalaxyl + Mancozeb) স্প্রে করুন এবং জমিতে জল জমতে দেবেন না।',
    },
    {
      id: 'p-2',
      author: 'তারকনাথ মাঝি',
      location: 'মেমারী, বর্ধমান',
      time: '৫ ঘণ্টা পূর্বে',
      title: 'স্বর্ণা-সাব১ ধানের শীষ আসার মুখে কোন সার স্প্রে করব?',
      content: 'ফুল আসার শেষ ধাপে কী স্প্রে করলে দানা পুষ্ট ও চকচকে হবে?',
      likes: 24,
      comments: 9,
      expertAnswer:
        '০:০:৫০ (পটাশিয়াম সালফেট) প্রতি লিটার জলে ৫ গ্রাম এবং বোরন ২০% ১ গ্রাম মিশিয়ে বিকেলের দিকে স্প্রে করুন।',
    },
  ]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  // Calculator computations
  const cropDoses: Record<string, { urea: number; dap: number; mop: number; compost: number; nameBn: string }> = {
    potato: { urea: 35, dap: 50, mop: 30, compost: 500, nameBn: 'আলু (Potato)' },
    paddy: { urea: 25, dap: 20, mop: 15, compost: 300, nameBn: 'আমন/বোরো ধান (Paddy)' },
    tomato: { urea: 20, dap: 25, mop: 20, compost: 400, nameBn: 'টমেটো (Tomato)' },
    mustard: { urea: 15, dap: 20, mop: 10, compost: 250, nameBn: 'সরিষা (Mustard)' },
    wheat: { urea: 30, dap: 25, mop: 15, compost: 300, nameBn: 'গম (Wheat)' },
  };
  const multiplier = calcUnit === 'acre' ? 3 : 1;
  const fertilityFactor = calcFertility === 'low' ? 1.2 : calcFertility === 'high' ? 0.85 : 1.0;
  const currentDose = cropDoses[calcCrop] || cropDoses.potato;
  const totalUrea = Math.round(currentDose.urea * calcArea * multiplier * fertilityFactor);
  const totalDap = Math.round(currentDose.dap * calcArea * multiplier * fertilityFactor);
  const totalMop = Math.round(currentDose.mop * calcArea * multiplier * fertilityFactor);
  const totalCompost = Math.round(currentDose.compost * calcArea * multiplier * fertilityFactor);
  const estimatedCost = Math.round(totalUrea * 6 + totalDap * 27 + totalMop * 34);

  // My crops in Overview
  const myCrops = [
    {
      name: 'আমন ধান (Aman Paddy)',
      variety: 'স্বর্ণা-সাব১',
      area: '২.০ একর',
      stage: 'দানা গঠন পর্যায় (Grain Filling)',
      health: 'উত্তম (Healthy)',
      plantedDate: '১৫ জুলাই ২০২৬',
      expectedHarvest: '২০ নভেম্বর ২০২৬',
    },
    {
      name: 'রবি আলু (Potato)',
      variety: 'কুফরি জ্যোতি (Kufri Jyoti)',
      area: '১.৫ একর',
      stage: 'চারা গজানো সম্পন্ন (Vegetative)',
      health: 'নজরদারি প্রয়োজন (Monitor for Blight)',
      plantedDate: '২৫ অক্টোবর ২০২৬',
      expectedHarvest: '১৫ জানুয়ারি ২০২৭',
    },
  ];

  const recentOrders = [
    { id: 'AC-ORD-9812', date: '২৮ অক্টোবর ২০২৬', items: 'ইফকো ডিএপি (২ ব্যাগ), বায়ার কনফিডোর (১ বোতল)', total: 3160, status: 'পথে রয়েছে (In Transit)' },
    { id: 'AC-ORD-9450', date: '১২ অক্টোবর ২০২৬', items: 'স্বর্ণা-সাব১ ধানের বীজ (১০ কেজি)', total: 590, status: 'ডেলিভারি সম্পন্ন (Delivered)' },
  ];

  const handleRunAiDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const match = mockDiseases.find((d) => d.cropEn.toLowerCase() === selectedCrop.toLowerCase()) || mockDiseases[0];
      setDiagnosisReport(match);
    }, 800);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    setCommunityPosts([
      {
        id: `p-${Date.now()}`,
        author: user?.name || 'বিপ্লব মণ্ডল',
        location: user?.location || 'পূর্ব বর্ধমান',
        time: 'এখনই',
        title: newPostTitle,
        content: newPostContent,
        likes: 1,
        comments: 0,
        expertAnswer: '',
      },
      ...communityPosts,
    ]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowPostModal(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ─────────────────────────────────────────────────────────────
          1. TAB: OVERVIEW (Default Dashboard)
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'overview' && (
        <div className="space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#106B3B] to-[#16834A] text-white p-8 rounded-3xl shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F2A93B] bg-white/10 px-3 py-1 rounded-full">
                {t('কৃষক ড্যাশবোর্ড • পশ্চিমবঙ্গ', 'Farmer Dashboard • West Bengal')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">
                {t('স্বাগতম, ', 'Welcome, ')} {user?.name || 'বিপ্লব মণ্ডল (Biplab Mondal)'}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F2A93B]" /> {user?.location || 'মঙ্গলকোট, পূর্ব বর্ধমান'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-300" /> {t('মোট জমি: ৩.৫ একর (দোআঁশ মাটি)', 'Farm Area: 3.5 Acres')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/farmer?tab=crop-doctor"
                className="px-5 py-2.5 rounded-xl bg-[#F2A93B] hover:bg-[#e09322] text-[#17251C] font-black text-xs transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{t('AI ক্রপ ডক্টর', 'Crop Doctor')}</span>
              </Link>
              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-xl bg-white text-[#16834A] hover:bg-[#E9F6EE] font-bold text-xs transition-colors shadow-xs"
              >
                {t('পাবলিক শপ', 'Public Shop')}
              </Link>
            </div>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('বর্তমান সক্রিয় ফসল', 'Active Crops')}</span>
                <Sprout className="w-4 h-4 text-[#16834A]" />
              </div>
              <p className="text-2xl font-black text-[#17251C]">২ টি ফসল</p>
              <p className="text-[11px] text-[#16834A] font-semibold">{t('ধান ও আলু মাঠপর্যায়ে', 'Paddy & Potato')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('মোট অর্ডার', 'Total Orders')}</span>
                <ShoppingBag className="w-4 h-4 text-[#F2A93B]" />
              </div>
              <p className="text-2xl font-black text-[#17251C]">৮ টি</p>
              <p className="text-[11px] text-[#68766D] font-medium">{t('১টি অর্ডার ট্রানজিটে রয়েছে', '1 order in transit')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('AI রোগ স্ক্যান রিপোর্ট', 'AI Health Reports')}</span>
                <Stethoscope className="w-4 h-4 text-[#16834A]" />
              </div>
              <p className="text-2xl font-black text-[#17251C]">৪ টি</p>
              <p className="text-[11px] text-[#16834A] font-semibold">{t('সর্বশেষ: আলু নাবি ধসা সতর্কবার্তা', 'Latest: Potato Blight')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E4EBE5] shadow-card space-y-2">
              <div className="flex items-center justify-between text-[#68766D] text-xs">
                <span>{t('মাঠের আবহাওয়া', 'Field Weather')}</span>
                <CloudSun className="w-4 h-4 text-[#106B3B]" />
              </div>
              <p className="text-2xl font-black text-[#17251C]">২৯°C</p>
              <p className="text-[11px] text-emerald-700 font-semibold">{t('সেচের জন্য অনুকূল', 'Ideal for Irrigation')}</p>
            </div>
          </div>

          {/* Main Grid: My Crops & Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
                <h2 className="font-extrabold text-base text-[#17251C] flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-[#16834A]" />
                  {t('আমার মাঠের বর্তমান ফসল (My Crops)', 'My Crops on the Field')}
                </h2>
                <Link
                  href="/farmer?tab=crops"
                  className="text-xs font-bold text-[#16834A] hover:underline"
                >
                  {t('ফসল নির্দেশিকা দেখুন', 'View Crop Guides')} →
                </Link>
              </div>

              <div className="space-y-4">
                {myCrops.map((c, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-black text-sm text-[#17251C]">{c.name}</h3>
                        <p className="text-xs text-[#68766D]">জাত: {c.variety} • এলাকা: {c.area}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                        c.health.includes('Healthy') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.health}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-[#E4EBE5] text-[#68766D]">
                      <div>
                        <span className="block font-medium">বর্তমান পর্যায়:</span>
                        <strong className="text-[#17251C]">{c.stage}</strong>
                      </div>
                      <div>
                        <span className="block font-medium">বপন / রোপণ:</span>
                        <strong className="text-[#17251C]">{c.plantedDate}</strong>
                      </div>
                      <div>
                        <span className="block font-medium">প্রত্যাশিত ফসল তোলা:</span>
                        <strong className="text-[#16834A]">{c.expectedHarvest}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Upcoming Tasks & Recent Order */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card space-y-4">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#17251C] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#16834A]" />
                  {t('আসন্ন কৃষি কাজ (Upcoming Tasks)', 'Upcoming Farm Tasks')}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 block">০৫ নভেম্বর ২০২৬</span>
                    <p className="font-bold text-[#17251C]">আলু জমিতে ইউরিয়া ও জিপসাম সার প্রয়োগ</p>
                    <span className="text-[10px] text-[#68766D]">গাছের সুস্থ বৃদ্ধির জন্য সেচের পর সার দিন</span>
                  </div>
                  <div className="p-3 bg-[#E9F6EE] border border-[#16834A]/20 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-[#106B3B] block">১০ নভেম্বর ২০২৬</span>
                    <p className="font-bold text-[#17251C]">আমন ধানের জমিতে পানি নিষ্কাশন প্রস্তুতি</p>
                    <span className="text-[10px] text-[#68766D]">ফসল পাকার ১০ দিন পূর্বে পানি শুকিয়ে ফেলুন</span>
                  </div>
                </div>
              </div>

              {/* Order snippet */}
              <div className="bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4EBE5]">
                  <h3 className="font-bold text-xs uppercase text-[#17251C] flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#F2A93B]" />
                    {t('সাম্প্রতিক অর্ডার', 'Recent Order')}
                  </h3>
                  <Link href="/farmer?tab=track-orders" className="text-[11px] font-bold text-[#16834A] hover:underline">
                    {t('ট্র্যাক করুন', 'Track')} →
                  </Link>
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-mono font-bold text-[#16834A]">{recentOrders[0].id}</span>
                  <p className="text-[#17251C] font-medium">{recentOrders[0].items}</p>
                  <p className="text-[11px] text-[#68766D]">মোট: ₹{recentOrders[0].total} • {recentOrders[0].status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. TAB: CROPS (Crop Cultivation Guides)
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'crops' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card">
            <div>
              <h2 className="text-xl font-black text-[#17251C]">
                {t('পশ্চিমবঙ্গের প্রধান ফসল চাষ নির্দেশিকা', 'Crop Cultivation Guides')}
              </h2>
              <p className="text-xs text-[#68766D]">
                {t('মাটি, বীজ বপন, সার প্রয়োগ ক্যালেন্ডার ও ফলন সংক্রান্ত তথ্য।', 'Soil, sowing, fertilizer schedules and yield guides.')}
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={t('ফসল খুঁজুন...', 'Search crop...')}
                value={cropSearch}
                onChange={(e) => setCropSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E4EBE5] text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCropGuides
              .filter((c) => c.nameBn.includes(cropSearch) || c.nameEn.toLowerCase().includes(cropSearch.toLowerCase()))
              .map((crop) => (
                <div key={crop.id} className="bg-white rounded-3xl border border-[#E4EBE5] overflow-hidden shadow-card">
                  <div className="relative h-48 w-full bg-slate-900">
                    <img src={crop.image} alt={crop.nameEn} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="bg-[#16834A] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {crop.season}
                      </span>
                      <h3 className="text-lg font-black">{crop.nameBn}</h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#E4EBE5]">
                      <div>
                        <span className="text-[#68766D] block font-medium">উপযুক্ত মাটি:</span>
                        <strong className="text-[#17251C]">{crop.suitableSoil}</strong>
                      </div>
                      <div>
                        <span className="text-[#68766D] block font-medium">বপন / রোপণ:</span>
                        <strong className="text-[#17251C]">{crop.sowingPeriod}</strong>
                      </div>
                      <div>
                        <span className="text-[#68766D] block font-medium">ফসল তোলা:</span>
                        <strong className="text-[#17251C]">{crop.harvestPeriod}</strong>
                      </div>
                      <div>
                        <span className="text-[#68766D] block font-medium">ফলন:</span>
                        <strong className="text-[#16834A]">{crop.avgYield}</strong>
                      </div>
                    </div>
                    <div className="p-3 bg-[#E9F6EE] rounded-xl text-xs space-y-1">
                      <span className="font-bold text-[#106B3B] block">সার প্রয়োগের নির্দেশিকা:</span>
                      <p className="text-[#17251C]">{crop.recommendedFertilizer}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. TAB: CROP DOCTOR (AI Diagnostic Scanner)
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'crop-doctor' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5 text-[#16834A]" />
                <span>{t('AI ক্রপ ডক্টর স্ক্যানার', 'AI Plant Doctor')}</span>
              </div>
              <h2 className="text-2xl font-black text-[#17251C]">
                {t('গাছের ছবি ও লক্ষণ বিশ্লেষণ করে তাৎক্ষণিক সমাধান', 'Instant Crop Disease Diagnosis & Prescription')}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Scan Inputs */}
              <div className="lg:col-span-5 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('ফসল নির্বাচন করুন:', 'Select Crop:')}</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] bg-white font-bold text-xs"
                  >
                    <option value="Potato">আলু (Potato)</option>
                    <option value="Paddy">ধান (Paddy)</option>
                    <option value="Tomato">টমেটো (Tomato)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('আক্রান্ত গাছের ছবি:', 'Leaf Image Preview:')}</label>
                  <div className="border-2 border-dashed border-[#16834A]/40 rounded-2xl p-4 text-center bg-[#E9F6EE]/30 space-y-2">
                    <img
                      src={diagnosisReport?.image || 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800'}
                      alt="Crop Leaf"
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <span className="text-[10px] text-[#68766D] block">আক্রান্ত অংশের স্পষ্ট ছবি নির্বাচন করুন</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRunAiDiagnosis}
                  disabled={isAnalyzing}
                  className="w-full py-3.5 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white font-black text-xs shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#F2A93B]" />
                  <span>{isAnalyzing ? t('বিশ্লেষণ হচ্ছে...', 'Analyzing...') : t('AI রোগ স্ক্যান চালান', 'Run AI Disease Scan')}</span>
                </button>
              </div>

              {/* Diagnosis Output */}
              <div className="lg:col-span-7 bg-[#F8FAF8] rounded-3xl border border-[#E4EBE5] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
                  <div>
                    <span className="text-[10px] font-bold text-[#68766D] uppercase">শনাক্তকৃত রোগ:</span>
                    <h3 className="text-lg font-black text-[#17251C]">{diagnosisReport.diseaseNameBn}</h3>
                  </div>
                  <span className="bg-rose-100 text-rose-800 text-xs font-black px-3 py-1 rounded-full">
                    {diagnosisReport.severity} Severity • 96%
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-[#68766D] block">লক্ষণসমূহ:</span>
                    <p className="text-[#17251C] mt-0.5">{diagnosisReport.symptomsBn}</p>
                  </div>

                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 space-y-1">
                    <span className="font-black text-rose-900 uppercase text-[10px] flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      রাসায়নিক চিকিৎসাপত্র:
                    </span>
                    <p className="text-rose-950 font-bold">{diagnosisReport.chemicalRemedyBn}</p>
                  </div>

                  <div className="p-4 bg-[#E9F6EE] rounded-2xl border border-[#16834A]/20 space-y-1">
                    <span className="font-black text-[#106B3B] uppercase text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      জৈব প্রতিরোধ পদ্ধতি:
                    </span>
                    <p className="text-[#17251C]">{diagnosisReport.organicRemedyBn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. TAB: FERTILIZER CALCULATOR
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-5">
              <h2 className="text-lg font-black text-[#17251C] border-b border-[#E4EBE5] pb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#16834A]" />
                {t('জমির পরিমাপ অনুযায়ী সার ক্যালকুলেটর', 'Fertilizer Dosage Calculator')}
              </h2>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('ফসল নির্বাচন:', 'Crop:')}</label>
                  <select
                    value={calcCrop}
                    onChange={(e) => setCalcCrop(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] bg-white font-bold"
                  >
                    {Object.entries(cropDoses).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.nameBn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('জমির পরিমাণ:', 'Land Area:')}</label>
                    <input
                      type="number"
                      min="0.5"
                      value={calcArea}
                      onChange={(e) => setCalcArea(parseFloat(e.target.value) || 1)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#17251C]">{t('একক (Unit):', 'Unit:')}</label>
                    <select
                      value={calcUnit}
                      onChange={(e) => setCalcUnit(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] bg-white font-bold"
                    >
                      <option value="bigha">বিঘা (Bigha)</option>
                      <option value="acre">একর (Acre)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#17251C]">{t('মাটির উর্বরতা মাত্রা:', 'Soil Fertility:')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'low', label: 'কম উর্বর' },
                      { id: 'normal', label: 'স্বাভাবিক' },
                      { id: 'high', label: 'উচ্চ উর্বর' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setCalcFertility(f.id as any)}
                        className={`py-2 rounded-xl border text-xs font-bold ${
                          calcFertility === f.id ? 'border-[#16834A] bg-[#E9F6EE] text-[#16834A]' : 'border-[#E4EBE5]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#17251C] text-white rounded-3xl p-6 sm:p-8 shadow-elevated space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase text-[#F2A93B] font-bold">প্রস্তাবিত সারের পরিমাণ</span>
                <span className="font-mono text-xs bg-white/10 px-3 py-1 rounded-full">{calcArea} {calcUnit}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-white/70 block">ইউরিয়া (Urea)</span>
                  <p className="text-2xl font-black text-emerald-400">{totalUrea} কেজি</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-white/70 block">ডিএপি (DAP)</span>
                  <p className="text-2xl font-black text-amber-400">{totalDap} কেজি</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-white/70 block">পটাশ (MOP)</span>
                  <p className="text-2xl font-black text-rose-400">{totalMop} কেজি</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-white/70 block">জৈব কম্পোস্ট</span>
                  <p className="text-2xl font-black text-lime-400">{totalCompost} কেজি</p>
                </div>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl flex items-center justify-between">
                <span className="text-xs text-white/70">আনুমানিক মোট সার ব্যয়:</span>
                <strong className="text-2xl font-black text-[#F2A93B]">₹{estimatedCost}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. TAB: SOIL HEALTH
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'soil-health' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4EBE5]">
            <div>
              <h2 className="text-xl font-black text-[#17251C] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#16834A]" />
                {t('মৃত্তিকা স্বাস্থ্য কার্ড ও পুষ্টি নিরীক্ষণ', 'Soil Health Card Scorecard')}
              </h2>
              <p className="text-xs text-[#68766D]">প্লট নং: ১৪৮, মৌজা: মঙ্গলকোট, পূর্ব বর্ধমান</p>
            </div>
            <button
              onClick={() => setSoilUploaded(true)}
              className="px-4 py-2 rounded-xl bg-[#E9F6EE] hover:bg-[#D9EFDF] text-[#16834A] text-xs font-bold flex items-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{soilUploaded ? '✅ কার্ড আপলোড সম্পন্ন' : 'নতুন কার্ড আপলোড করুন'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-1">
              <span className="text-[#68766D] font-medium block">মাটির পিএইচ (pH)</span>
              <p className="text-xl font-black text-[#17251C]">৬.২</p>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">স্বাভাবিক</span>
            </div>
            <div className="p-4 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-1">
              <span className="text-[#68766D] font-medium block">জৈব কার্বন (%)</span>
              <p className="text-xl font-black text-amber-600">০.৫৮ %</p>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full inline-block">ঘাটতি রয়েছে</span>
            </div>
            <div className="p-4 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-1">
              <span className="text-[#68766D] font-medium block">নাইট্রোজেন (N)</span>
              <p className="text-xl font-black text-rose-600">২১০ কেজি</p>
              <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full inline-block">কম</span>
            </div>
            <div className="p-4 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-1">
              <span className="text-[#68766D] font-medium block">ফসফরাস (P)</span>
              <p className="text-xl font-black text-emerald-600">১৮ কেজি</p>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">পর্যাপ্ত</span>
            </div>
            <div className="p-4 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-1">
              <span className="text-[#68766D] font-medium block">জিঙ্ক (Zn)</span>
              <p className="text-xl font-black text-[#17251C]">০.৬৫ ppm</p>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">স্বাভাবিক</span>
            </div>
            <div className="p-4 rounded-2xl border border-[#E4EBE5] bg-[#F8FAF8] space-y-1">
              <span className="text-[#68766D] font-medium block">বোরন (B)</span>
              <p className="text-xl font-black text-rose-600">০.৪৫ ppm</p>
              <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full inline-block">ঘাটতি</span>
            </div>
          </div>

          <div className="p-4 bg-[#E9F6EE] rounded-2xl border border-[#16834A]/20 text-xs space-y-1">
            <span className="font-bold text-[#106B3B] block">বিশেষজ্ঞ মাটির সুপারিশ:</span>
            <p className="text-[#17251C]">জমিতে বিঘায় ৩০০ কেজি ভার্মিকম্পোস্ট এবং ১.৫ কেজি বোরন শেষ চাষের সময় মাটির সাথে মেশান।</p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. TAB: WEATHER
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'weather' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4EBE5]">
            <div>
              <h2 className="text-xl font-black text-[#17251C] flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-[#16834A]" />
                {t('কৃষি আবহাওয়া বুলেটিন ও পূর্বাভাস', 'Agrometeorological Advisory')}
              </h2>
              <p className="text-xs text-[#68766D]">পশ্চিমবঙ্গের জেলাভিত্তিক আবহাওয়া ও কৃষক সতর্কতা</p>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {mockDistrictsWeather.map((d) => (
                <button
                  key={d.district}
                  onClick={() => setSelectedDistrict(d.district)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap ${
                    selectedDistrict === d.district
                      ? 'bg-[#16834A] text-white shadow-soft'
                      : 'bg-slate-50 text-[#68766D]'
                  }`}
                >
                  {d.districtBn}
                </button>
              ))}
            </div>
          </div>

          {(() => {
            const current = mockDistrictsWeather.find((d) => d.district === selectedDistrict) || mockDistrictsWeather[0];
            return (
              <div className="bg-gradient-to-br from-[#16834A] to-[#106B3B] text-white p-8 rounded-3xl shadow-elevated space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/20">
                  <div>
                    <span className="text-xs uppercase text-[#F2A93B] font-bold">নির্বাচিত জেলা</span>
                    <h3 className="text-2xl font-black">{current.districtBn} ({current.district})</h3>
                  </div>
                  <p className="text-3xl font-black">{current.temp}°C</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-white/70 block">বাতাসে আর্দ্রতা</span>
                    <strong className="text-base">{current.humidity}%</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-white/70 block">বৃষ্টিপাতের সম্ভাবনা</span>
                    <strong className="text-base">{current.rainfall}</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-white/70 block">আবহাওয়ার রূপ</span>
                    <strong className="text-base">{current.condition}</strong>
                  </div>
                </div>
                <div className="p-4 bg-white/15 rounded-2xl text-xs space-y-1">
                  <span className="font-bold text-[#F2A93B] block">কৃষি পরামর্শ ও সতর্কতা:</span>
                  <p className="leading-relaxed">{current.advisoryBn}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. TAB: TRACK ORDERS
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'track-orders' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EBE5] shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E4EBE5]">
            <div>
              <h2 className="text-xl font-black text-[#17251C] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#16834A]" />
                {t('অর্ডার ট্র্যাকিং ও ডেলিভারি অবস্থান', 'Live Order Tracking')}
              </h2>
              <span className="text-xs text-[#68766D]">অর্ডার নম্বর: AC-ORD-9812</span>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
              পথে রয়েছে (Out for Delivery)
            </span>
          </div>

          <div className="p-6 bg-[#F8FAF8] rounded-2xl border border-[#E4EBE5] space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[#68766D] block">আইটেমসমূহ:</span>
                <strong className="text-[#17251C]">ইফকো ডিএপি সার (২ ব্যাগ), বায়ার কনফিডোর (১ বোতল)</strong>
              </div>
              <div>
                <span className="text-[#68766D] block">ডেলিভারি ঠিকানা:</span>
                <strong className="text-[#17251C]">গ্রাম: মঙ্গলকোট, ব্লক: ভাতার, পূর্ব বর্ধমান</strong>
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-[#E4EBE5]">
              <span className="font-bold text-[#17251C] block">অগ্রগতি টাইমলাইন:</span>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="px-2.5 py-1 bg-[#16834A] text-white rounded-lg font-bold">১. গৃহীত</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-[#16834A] text-white rounded-lg font-bold">২. প্যাকিং</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-[#16834A] text-white rounded-lg font-bold">৩. হাবে প্রেরণ</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-[#F2A93B] text-[#17251C] rounded-lg font-black animate-pulse">৪. পথে রয়েছে</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-500 rounded-lg">৫. হস্তান্তর</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. TAB: COMMUNITY FORUM
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'community' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E4EBE5]">
            <div>
              <h2 className="text-xl font-black text-[#17251C] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#16834A]" />
                {t('কৃষক সম্প্রদায় ও প্রশ্নোত্তর ফোরাম', 'Farmer Community')}
              </h2>
              <p className="text-xs text-[#68766D]">অভিজ্ঞ কৃষক ও বিশেষজ্ঞদের সাথে মতামত বিনিময় করুন</p>
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-4 py-2 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-bold flex items-center gap-1.5 shadow-soft"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('প্রশ্ন জিজ্ঞাসা করুন', 'Ask Question')}</span>
            </button>
          </div>

          <div className="space-y-4">
            {communityPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E9F6EE] text-[#16834A] font-bold flex items-center justify-center">
                      {post.author.slice(0, 1)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#17251C]">{post.author}</h4>
                      <p className="text-[10px] text-[#68766D]">{post.location} • {post.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#16834A] bg-[#E9F6EE] px-2 py-0.5 rounded-full">কৃষক</span>
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#17251C]">{post.title}</h3>
                  <p className="text-[#68766D] mt-1">{post.content}</p>
                </div>
                {post.expertAnswer && (
                  <div className="p-4 bg-[#E9F6EE] rounded-2xl border border-[#16834A]/20 space-y-1">
                    <span className="font-bold text-[#106B3B] flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      বিশেষজ্ঞের সমাধান (BCKV Expert Verified):
                    </span>
                    <p className="text-[#17251C]">{post.expertAnswer}</p>
                  </div>
                )}
                <div className="flex items-center gap-4 text-[#68766D] pt-2 border-t border-[#E4EBE5]">
                  <span className="flex items-center gap-1 font-bold"><ThumbsUp className="w-3.5 h-3.5" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {post.comments} মন্তব্য</span>
                </div>
              </div>
            ))}
          </div>

          {showPostModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
                <h3 className="text-base font-black text-[#17251C]">নতুন প্রশ্ন পোস্ট করুন</h3>
                <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold block mb-1">সমস্যা বা শিরোনাম:</label>
                    <input
                      type="text"
                      required
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="উদা: বেগুনের ডগা পচে যাচ্ছে..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5]"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">বিস্তারিত বর্ণনা:</label>
                    <textarea
                      required
                      rows={3}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="ফসলের বয়স ও লক্ষণ লিখুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EBE5]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowPostModal(false)} className="px-4 py-2 border rounded-xl">বাতিল</button>
                    <button type="submit" className="px-5 py-2 bg-[#16834A] text-white rounded-xl font-bold">পোস্ট করুন</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. TAB: GOVERNMENT SCHEMES
         ───────────────────────────────────────────────────────────── */}
      {currentTab === 'schemes' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E4EBE5] shadow-card">
            <h2 className="text-xl font-black text-[#17251C] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#16834A]" />
              {t('সরকারি কৃষি কল্যাণ ও আর্থিক সহায়তা প্রকল্প', 'Government Agriculture Schemes')}
            </h2>
            <p className="text-xs text-[#68766D] mt-1">কৃষক বন্ধু, পিএম-কিষাণ ও বাংলা শস্য বীমা সংক্রান্ত তথ্য</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-3xl border border-[#E4EBE5] p-6 shadow-card space-y-4 text-xs">
                <span className="text-[10px] font-bold text-[#68766D] uppercase block">{scheme.department}</span>
                <h3 className="font-black text-base text-[#17251C]">{scheme.nameBn}</h3>
                <div className="p-3 bg-[#E9F6EE] rounded-xl border border-[#16834A]/20">
                  <span className="font-extrabold text-[10px] text-[#106B3B] block">আর্থিক অনুদান:</span>
                  <p className="font-bold text-[#17251C]">{scheme.financialBenefit}</p>
                </div>
                <div>
                  <span className="font-bold text-[#68766D] block">যোগ্যতা:</span>
                  <p className="text-[#17251C]">{scheme.eligibilityBn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FarmerDashboard() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs">ড্যাশবোর্ড লোড হচ্ছে...</div>}>
      <FarmerDashboardContent />
    </Suspense>
  );
}
