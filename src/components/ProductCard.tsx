'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, ShieldCheck, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addToCart, cart } = useCart();

  const isItemInCart = cart.some((item) => item.product.id === product.id);
  const discountPercent = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  return (
    <div className="group bg-white rounded-2xl border border-[#E4EBE5] overflow-hidden shadow-card hover:shadow-elevated hover:border-[#16834A]/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Thumbnail & Badges */}
        <div className="relative h-48 w-full bg-[#F8FAF8] overflow-hidden">
          <img
            src={product.thumbnail}
            alt={language === 'bn' ? product.nameBn : product.nameEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Category Chip */}
          <span className="absolute top-3 left-3 bg-[#106B3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {language === 'bn' ? product.categoryBn : product.category}
          </span>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute top-3 right-3 bg-[#F2A93B] text-[#17251C] text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
              {discountPercent}% {t('ছাড়', 'OFF')}
            </span>
          )}

          {/* License Check */}
          {product.licenseRequired && (
            <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-[#F2A93B]" />
              {t('লাইসেন্স আবশ্যক', 'Licensed Item')}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-[#68766D]">
            <span className="font-semibold">{product.brand}</span>
            <div className="flex items-center gap-1 text-[#F2A93B]">
              <Star className="w-3.5 h-3.5 fill-[#F2A93B]" />
              <span className="font-bold text-[#17251C]">{product.rating}</span>
              <span className="text-[11px] text-[#68766D]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-bold text-sm text-[#17251C] group-hover:text-[#16834A] transition-colors line-clamp-2 leading-snug">
              {language === 'bn' ? product.nameBn : product.nameEn}
            </h3>
          </Link>

          {/* Active Ingredient */}
          <p className="text-[11px] text-[#68766D] line-clamp-1">
            <span className="font-medium">{t('উপাদান: ', 'Composition: ')}</span>
            {product.activeIngredients}
          </p>

          {/* Pricing Box (Dual: Retail & Wholesale) */}
          <div className="pt-2 border-t border-[#E4EBE5] space-y-1">
            {/* Farmer Retail Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-[#16834A]">
                ₹{product.sellingPrice}
              </span>
              <span className="text-xs text-[#68766D] line-through">
                ₹{product.mrp}
              </span>
              <span className="text-[10px] text-[#16834A] font-bold">
                ({t('খুচরা মূল্য', 'Retail')})
              </span>
            </div>

            {/* Retailer Wholesale Price */}
            <div className="text-[11px] bg-[#E9F6EE] px-2 py-1 rounded-md text-[#106B3B] font-semibold flex items-center justify-between">
              <span>{t('হোলসেল দর:', 'Wholesale:')} <strong>₹{product.retailerPrice}</strong></span>
              <span className="text-[10px] bg-white px-1.5 py-0.2 rounded border border-[#16834A]/30">
                MOQ: {product.moq} pcs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product, 1, false)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${isItemInCart
              ? 'bg-[#E9F6EE] text-[#16834A] border border-[#16834A]/40'
              : 'bg-[#16834A] hover:bg-[#106B3B] text-white hover:shadow-soft'
            }`}
        >
          {isItemInCart ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{t('ব্যাগে যুক্ত রয়েছে', 'Added to Cart')}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{t('কার্টে যোগ করুন', 'Add to Cart')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

