'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Stethoscope,
  Store,
  ShieldCheck,
  CloudSun,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  FileText,
  CheckCircle2,
} from 'lucide-react';

interface SlideItem {
  id: number;
  tagBn: string;
  tagEn: string;
  tagIcon: any;
  titleBn1: string;
  titleBn2: string;
  titleEn1: string;
  titleEn2: string;
  descBn: string;
  descEn: string;
  primaryBtnTextBn: string;
  primaryBtnTextEn: string;
  primaryBtnHref: string;
  primaryBtnIcon: any;
  secondaryBtnTextBn: string;
  secondaryBtnTextEn: string;
  secondaryBtnHref: string;
  secondaryBtnIcon: any;
  image: string;
  badgeTopText: string;
  badgeTopTitleBn: string;
  badgeTopTitleEn: string;
  badgeBottomTextBn: string;
  badgeBottomTextEn: string;
  accentColor: string;
  bgGradient: string;
}

export default function HeroSlider() {
  const { language, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const slides: SlideItem[] = [
    {
      id: 1,
      tagBn: 'পশ্চিমবঙ্গের ১ নম্বর স্মার্ট এগ্রিটেক প্ল্যাটফর্ম',
      tagEn: "West Bengal's No. 1 Agritech Platform",
      tagIcon: Sparkles,
      titleBn1: 'স্মার্ট কৃষির সঠিক দিশা,',
      titleBn2: 'ফসলের সুরক্ষায় AgroCare',
      titleEn1: 'Smart Agriculture for',
      titleEn2: 'Higher Yield & Healthy Crops',
      descBn:
        'কৃষকদের জন্য খাঁটি বীজ, অনুমোদিত সার ও কীটনাশক খুচরা দরে; কৃষি দোকানদারদের জন্য হোলসেল পাইকারি বাজার এবং ফসলের রোগ নির্ণয়ে আধুনিক AI ক্রপ ডক্টর।',
      descEn:
        'Genuine seeds, certified fertilizers, and pest protection at transparent retail rates, wholesale B2B marketplace for shopkeepers, and instant AI disease diagnostics.',
      primaryBtnTextBn: 'কৃষি বাজার দেখুন',
      primaryBtnTextEn: 'Shop Agri-Inputs',
      primaryBtnHref: '/shop',
      primaryBtnIcon: ShoppingBag,
      secondaryBtnTextBn: 'AI ক্রপ ডক্টর (রোগ স্ক্যান)',
      secondaryBtnTextEn: 'AI Crop Doctor',
      secondaryBtnHref: '/crop-doctor',
      secondaryBtnIcon: Stethoscope,
      image:
        'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1000&auto=format&fit=crop&q=80',
      badgeTopText: 'AI DIAGNOSIS READY',
      badgeTopTitleBn: '৯৮% নির্ভুল রোগ নির্ণয়',
      badgeTopTitleEn: '98% Diagnostic Accuracy',
      badgeBottomTextBn:
        'ফসলের সুরক্ষা ও ফলন বৃদ্ধিতে সঠিক সার ও কীটনাশকের সময়োচিত ব্যবহার নিশ্চিত করুন।',
      badgeBottomTextEn:
        'Ensure timely fertilizer dosage and pest protection for bumper crop production.',
      accentColor: '#16834A',
      bgGradient: 'from-[#E9F6EE] via-[#F8FAF8] to-[#F8FAF8]',
    },
    {
      id: 2,
      tagBn: 'কৃত্রিম বুদ্ধিমত্তার মাধ্যমে আধুনিক কৃষি চিকিৎসা',
      tagEn: 'Instant AI Plant Pathology & Computer Vision',
      tagIcon: Stethoscope,
      titleBn1: 'AI ক্রপ ডক্টর — এক ক্লিকে',
      titleBn2: 'ফসলের রোগ নির্ণয় ও সমাধান',
      titleEn1: 'AI Crop Doctor — Instant',
      titleEn2: 'Plant Diagnosis & Rx Solutions',
      descBn:
        'আক্রান্ত পাতার ছবি মোবাইল থেকে আপলোড করলেই কম্পিউটার ভিশন মডেল শনাক্ত করবে নাবি ধসা, পাতা ঝলসানো কিংবা পোকার আক্রমণ এবং তাৎক্ষণিক প্রেসক্রিপশন দেবে।',
      descEn:
        'Upload a picture of diseased leaves directly from your mobile. Advanced vision models diagnose blight, fungal scorch, and pest infestation with immediate dosage plans.',
      primaryBtnTextBn: 'এখনই রোগ স্ক্যান করুন',
      primaryBtnTextEn: 'Scan Plant Disease Now',
      primaryBtnHref: '/crop-doctor',
      primaryBtnIcon: Stethoscope,
      secondaryBtnTextBn: 'রোগের লাইব্রেরি দেখুন',
      secondaryBtnTextEn: 'Explore Disease Library',
      secondaryBtnHref: '/disease-library',
      secondaryBtnIcon: FileText,
      image:
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1000&auto=format&fit=crop&q=80',
      badgeTopText: 'COMPUTER VISION AI',
      badgeTopTitleBn: 'BCKV বিজ্ঞানী দ্বারা অনুমোদিত',
      badgeTopTitleEn: 'Validated by BCKV Pathologists',
      badgeBottomTextBn:
        'আমন ধান, আলু, টমেটো, সরিষা ও বেগুনের ৪০+ রোগের বিজ্ঞানসম্মত প্রতিকার গাইড।',
      badgeBottomTextEn:
        'Scientific cure and preventative schedules for 40+ field crops in Bengal.',
      accentColor: '#059669',
      bgGradient: 'from-emerald-100/60 via-[#F8FAF8] to-[#F8FAF8]',
    },
    {
      id: 3,
      tagBn: 'দোকানদার ও রিটেইলারদের পাইকারি হাব',
      tagEn: 'B2B Wholesale Hub for Agri-Dealers',
      tagIcon: Store,
      titleBn1: 'কৃষি দোকানদারদের জন্য',
      titleBn2: 'হোলসেল বাল্ক মার্কেটপ্লেস',
      titleEn1: 'Wholesale B2B Marketplace',
      titleEn2: 'for Verified Agri Retailers',
      descBn:
        'সরাসরি সার্টিফাইড প্রস্তুতকারক ও ডিস্ট্রিবিউটরদের থেকে বাল্ক অর্ডারে কিনুন। স্পেশাল রেট, GST ইনভয়েস, সহজ পেমেন্ট ও FEFO এক্সপায়ারি ট্র্যাকিং সুবিধা।',
      descEn:
        'Procure directly from verified pesticide and fertilizer distributors. Enjoy bulk tier discounts, automated GST invoices, and strict FEFO dispatch freshness.',
      primaryBtnTextBn: 'হোলসেল মার্কেট প্রবেশ করুন',
      primaryBtnTextEn: 'Enter B2B Marketplace',
      primaryBtnHref: '/wholesale',
      primaryBtnIcon: Store,
      secondaryBtnTextBn: 'দোকানদার হিসেবে নিবন্ধন',
      secondaryBtnTextEn: 'Register as Retailer',
      secondaryBtnHref: '/register',
      secondaryBtnIcon: Award,
      image:
        'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=1000&auto=format&fit=crop&q=80',
      badgeTopText: 'FEFO BATCH CERTIFIED',
      badgeTopTitleBn: '২,৪০০+ ভেরিফাইড দোকান',
      badgeTopTitleEn: '2,400+ Verified Dealerships',
      badgeBottomTextBn:
        'ন্যূনতম অর্ডারে বিশেষ পাইকারি দর ও সরাসরি গুদাম থেকে সুপারফাস্ট ট্রাক সরবরাহ।',
      badgeBottomTextEn:
        'Tiered wholesale pricing with guaranteed doorstep hub dispatches.',
      accentColor: '#D97706',
      bgGradient: 'from-amber-100/60 via-[#F8FAF8] to-[#F8FAF8]',
    },
    {
      id: 4,
      tagBn: 'বিজ্ঞানসম্মত কৃষি ও নিখুঁত পূর্বাভাস',
      tagEn: 'Precision Agronomy & Meteorological Guidance',
      tagIcon: CloudSun,
      titleBn1: 'সুষম সার ক্যালকুলেটর ও',
      titleBn2: 'জেলাভিত্তিক লাইভ আবহাওয়া',
      titleEn1: 'Fertilizer Calculator &',
      titleEn2: 'District Weather Alerts',
      descBn:
        'জমির আয়তন (বিঘা/একর) ও মাটির উর্বরতা অনুযায়ী ইউরিয়া, ডিএপি ও পটাশের সঠিক ডোজ গণনা করুন এবং ৭ দিনের বৃষ্টি ও আর্দ্রতার পূর্বাভাস দেখে স্প্রে করুন।',
      descEn:
        'Calculate precise N-P-K fertilizer bags based on bigha/acre and soil test metrics. Schedule pesticide spray avoiding rain and windy windows with 7-day bulletins.',
      primaryBtnTextBn: 'সার ক্যালকুলেটর খুলুন',
      primaryBtnTextEn: 'Fertilizer Calculator',
      primaryBtnHref: '/calculator',
      primaryBtnIcon: Calculator,
      secondaryBtnTextBn: 'আবহাওয়া বুলেটিন দেখুন',
      secondaryBtnTextEn: '7-Day Weather Radar',
      secondaryBtnHref: '/weather',
      secondaryBtnIcon: CloudSun,
      image:
        'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1000&auto=format&fit=crop&q=80',
      badgeTopText: 'PRECISION FARMING',
      badgeTopTitleBn: 'সঠিক স্প্রে সময় সতর্কতা',
      badgeTopTitleEn: 'Smart Spray Advisory Active',
      badgeBottomTextBn:
        'পশ্চিমবঙ্গের ২৩টি জেলার প্রতিটি ব্লকের জন্য দৈনিক তাপমাত্রা, বৃষ্টি ও বাতাসের লাইভ ট্র্যাকিং।',
      badgeBottomTextEn:
        'Live rain radar, wind speed, and humidity indicators for 23 West Bengal districts.',
      accentColor: '#0284C7',
      bgGradient: 'from-sky-100/60 via-[#F8FAF8] to-[#F8FAF8]',
    },
  ];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  const slide = slides[current];
  const TagIcon = slide.tagIcon;
  const PrimaryIcon = slide.primaryBtnIcon;
  const SecondaryIcon = slide.secondaryBtnIcon;

  // Slide Animation Variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-b ${slide.bgGradient} pt-8 pb-16 sm:pb-20 border-b border-[#E4EBE5] transition-colors duration-700`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16834A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Tag */}
              <motion.div
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#E4EBE5] text-xs font-bold shadow-xs"
                style={{ color: slide.accentColor }}
              >
                <TagIcon className="w-3.5 h-3.5" />
                <span>{t(slide.tagBn, slide.tagEn)}</span>
              </motion.div>

              {/* Slide Heading */}
              <motion.div
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#17251C] leading-[1.15] tracking-tight">
                  {t(slide.titleBn1, slide.titleEn1)}
                  <span
                    className="block mt-1 sm:mt-2 transition-colors duration-300"
                    style={{ color: slide.accentColor }}
                  >
                    {t(slide.titleBn2, slide.titleEn2)}
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle / Description */}
              <motion.p
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-base sm:text-lg text-[#68766D] max-w-xl leading-relaxed"
              >
                {t(slide.descBn, slide.descEn)}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                custom={4}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href={slide.primaryBtnHref}
                  className="px-7 py-3.5 rounded-2xl text-white font-bold text-sm shadow-soft hover:shadow-elevated transition-all flex items-center gap-2 group transform active:scale-95"
                  style={{ backgroundColor: slide.accentColor }}
                >
                  <PrimaryIcon className="w-4 h-4" />
                  <span>{t(slide.primaryBtnTextBn, slide.primaryBtnTextEn)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={slide.secondaryBtnHref}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#E9F6EE] border-2 text-[#17251C] font-bold text-sm transition-all shadow-xs flex items-center gap-2 hover:border-[#16834A] transform active:scale-95"
                  style={{ borderColor: '#E4EBE5' }}
                >
                  <SecondaryIcon className="w-4 h-4" style={{ color: slide.accentColor }} />
                  <span>{t(slide.secondaryBtnTextBn, slide.secondaryBtnTextEn)}</span>
                </Link>
              </motion.div>

              {/* Trust Indicators Bar */}
              <motion.div
                custom={5}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E4EBE5] text-xs"
              >
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#16834A]">৫০,০০০+</p>
                  <p className="text-[#68766D] font-medium">{t('নিবন্ধিত কৃষক', 'Registered Farmers')}</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#F2A93B]">২,৪০০+</p>
                  <p className="text-[#68766D] font-medium">{t('পাইকারি দোকানদার', 'Agri-Retailers B2B')}</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#106B3B]">১০০%</p>
                  <p className="text-[#68766D] font-medium">{t('খাঁটি ও সার্টিফাইড', 'Genuine & Certified')}</p>
                </div>
              </motion.div>
            </div>

            {/* Right Visual Column (Image + Floating Badges with motion) */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white bg-slate-900 group"
              >
                <img
                  src={slide.image}
                  alt={slide.titleEn1}
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Floating Top Badge with gentle float effect */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-elevated border border-white/40 flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: slide.accentColor }}
                  >
                    <TagIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider block"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.badgeTopText}
                    </span>
                    <span className="text-xs font-bold text-[#17251C]">
                      {t(slide.badgeTopTitleBn, slide.badgeTopTitleEn)}
                    </span>
                  </div>
                </motion.div>

                {/* Bottom Overlay Info Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-xs space-y-1.5 shadow-soft"
                >
                  <div className="flex items-center justify-between font-bold pb-1 border-b border-[#E4EBE5]">
                    <span className="flex items-center gap-1.5 text-[#106B3B]">
                      <ShieldCheck className="w-4 h-4 text-[#16834A]" />
                      <span>{t('পশ্চিমবঙ্গ কৃষি নির্দেশিকা ভিত্তিক', 'Govt Licensed & Compliant')}</span>
                    </span>
                    <span className="bg-[#E9F6EE] text-[#16834A] font-extrabold px-2 py-0.5 rounded text-[10px]">
                      WB AGRI VERIFIED
                    </span>
                  </div>
                  <p className="text-[#17251C] font-semibold text-[11px] sm:text-xs leading-snug">
                    {t(slide.badgeBottomTextBn, slide.badgeBottomTextEn)}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls (Arrows + Dots + Play/Pause) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E4EBE5]/60">
          {/* Slide Dots with animated progress */}
          <div className="flex items-center gap-2">
            {slides.map((s, index) => (
              <button
                key={s.id}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`transition-all duration-300 rounded-full ${index === current
                    ? 'w-8 h-2.5 bg-[#16834A]'
                    : 'w-2.5 h-2.5 bg-[#C9D6CC] hover:bg-[#A3B8A8]'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter & Prev / Next Arrows */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#68766D]">
              ০{current + 1} / ০{slides.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#E9F6EE] border border-[#E4EBE5] flex items-center justify-center text-[#17251C] transition-colors shadow-xs active:scale-90"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#E9F6EE] border border-[#E4EBE5] flex items-center justify-center text-[#17251C] transition-colors shadow-xs active:scale-90"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

