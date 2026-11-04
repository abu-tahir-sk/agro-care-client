'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockProducts } from '../../data/agricultureData';
import ProductCard from '../../components/ProductCard';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ShopPage() {
  const { language, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');

  const categories = [
    { id: 'All', nameBn: 'সকল বিভাগ', nameEn: 'All Categories' },
    { id: 'Fertilizers', nameBn: 'রাসায়নিক ও সার', nameEn: 'Fertilizers' },
    { id: 'Seeds', nameBn: 'বীজ (Seeds)', nameEn: 'Seeds' },
    { id: 'Pesticides', nameBn: 'বালাইনাশক', nameEn: 'Pesticides' },
    { id: 'Organic', nameBn: 'জৈব সার', nameEn: 'Organic' },
    { id: 'Tools', nameBn: 'কৃষি যন্ত্রপাতি', nameEn: 'Tools' },
    { id: 'Irrigation', nameBn: 'সেচ সরঞ্জাম', nameEn: 'Irrigation' },
  ];

  const brands = ['All', 'IFFCO', 'National Seeds Corp', 'Bayer CropScience', 'AgroCare Organics', 'AgroTech Equipment', 'Jain Irrigation'];

  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
        const matchesSearch =
          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameBn.includes(searchQuery) ||
          p.activeIngredients.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesBrand && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.sellingPrice - b.sellingPrice;
        if (sortBy === 'price_desc') return b.sellingPrice - a.sellingPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner / Heading */}
      <div className="bg-[#106B3B] text-white p-8 rounded-3xl shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F2A93B]">
            {t('অফিসিয়াল এগ্রি মার্কেটপ্লেস', 'Official Agri Marketplace')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t('কৃষি বাজার — ১০০% আসল সার, বীজ ও ওষুধ', 'AgroCare Store — 100% Genuine Farm Inputs')}
          </h1>
          <p className="text-xs text-white/80 max-w-xl">
            {t(
              'পশ্চিমবঙ্গের কৃষকদের জন্য সাশ্রয়ী খুচরা মূল্য এবং দোকানদারদের জন্য হোলসেল রেটের সরাসরি সুবিধা।',
              'Fair retail prices for farmers with special wholesale tiered discounts for verified agri-retailers.'
            )}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('পণ্য বা ব্র্যান্ড খুঁজুন...', 'Search product or brand...')}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white text-[#17251C] text-xs focus:outline-none shadow-md"
          />
          <Search className="w-4 h-4 text-[#68766D] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filter */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#E4EBE5] shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
            <h3 className="font-extrabold text-sm text-[#17251C] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#16834A]" />
              {t('ফিল্টার করুন', 'Filters')}
            </h3>
            {(selectedCategory !== 'All' || selectedBrand !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setSearchQuery('');
                }}
                className="text-[11px] font-bold text-[#DC4242] hover:underline"
              >
                {t('রিসেট', 'Clear All')}
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#17251C] block uppercase tracking-wider">
              {t('বিভাগসমূহ', 'Categories')}
            </label>
            <div className="space-y-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${selectedCategory === c.id
                      ? 'bg-[#16834A] text-white font-bold'
                      : 'text-[#17251C] hover:bg-[#F8FAF8]'
                    }`}
                >
                  <span>{language === 'bn' ? c.nameBn : c.nameEn}</span>
                  {selectedCategory === c.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-2 pt-2 border-t border-[#E4EBE5]">
            <label className="text-xs font-bold text-[#17251C] block uppercase tracking-wider">
              {t('ব্র্যান্ড ও প্রস্তুতকারক', 'Brands')}
            </label>
            <div className="space-y-1">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedBrand === b
                      ? 'text-[#16834A] font-bold bg-[#E9F6EE]'
                      : 'text-[#68766D] hover:text-[#17251C]'
                    }`}
                >
                  {b === 'All' ? t('সকল ব্র্যান্ড', 'All Brands') : b}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Count & Sort */}
          <div className="bg-white p-4 rounded-2xl border border-[#E4EBE5] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-[#68766D]">
              {t(
                `মোট ${filteredProducts.length} টি কৃষি পণ্য পাওয়া গেছে`,
                `Showing ${filteredProducts.length} agricultural products`
              )}
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#68766D] font-medium">{t('সাজান:', 'Sort by:')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F8FAF8] border border-[#E4EBE5] p-2 rounded-xl text-xs text-[#17251C] focus:outline-none focus:border-[#16834A]"
              >
                <option value="popular">{t('সর্বাধিক জনপ্রিয় (Popular)', 'Most Popular')}</option>
                <option value="price_asc">{t('দাম: কম থেকে বেশি', 'Price: Low to High')}</option>
                <option value="price_desc">{t('দাম: বেশি থেকে কম', 'Price: High to Low')}</option>
                <option value="rating">{t('উচ্চ রেটিং', 'Highest Rated')}</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl border border-[#E4EBE5] text-center space-y-3">
              <p className="text-base font-bold text-[#17251C]">
                {t('কোনো পণ্য পাওয়া যায়নি', 'No Products Found')}
              </p>
              <p className="text-xs text-[#68766D]">
                {t('অন্য কোনো বিভাগ বা কিওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।', 'Try adjusting your search or filter keywords.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

