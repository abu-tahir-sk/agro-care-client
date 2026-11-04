export type UserRole =
  | 'guest'
  | 'farmer'
  | 'retailer'
  | 'supplier'
  | 'expert'
  | 'delivery'
  | 'admin'
  | 'super_admin';

export type Language = 'bn' | 'en';

export interface ProductVariant {
  id: string;
  packSize: string;
  mrp: number;
  sellingPrice: number;
  retailerPrice: number;
  moq: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  brand: string;
  manufacturer: string;
  category: 'Fertilizers' | 'Seeds' | 'Pesticides' | 'Organic' | 'Tools' | 'Irrigation';
  categoryBn: string;
  thumbnail: string;
  gallery: string[];
  descriptionEn: string;
  descriptionBn: string;
  activeIngredients: string;
  suitableCrops: string[];
  usageInstructionsBn: string;
  safetyInstructionsBn: string;
  mrp: number;
  sellingPrice: number; // Farmer retail price
  retailerPrice: number; // Retailer wholesale price
  moq: number; // Minimum Order Quantity for Wholesale
  tierPricing: {
    minQty: number;
    pricePerUnit: number;
  }[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  seasonal?: boolean;
  batchNumber?: string;
  expiryDate?: string;
  licenseRequired?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isWholesale?: boolean;
}

export interface CropGuide {
  id: string;
  nameBn: string;
  nameEn: string;
  image: string;
  season: string;
  suitableSoil: string;
  sowingPeriod: string;
  harvestPeriod: string;
  waterRequirement: string;
  recommendedFertilizer: string;
  commonDiseases: string[];
  avgYield: string;
}

export interface CropDisease {
  id: string;
  cropBn: string;
  cropEn: string;
  diseaseNameBn: string;
  diseaseNameEn: string;
  pathogen: string;
  symptomsBn: string;
  preventionBn: string;
  organicRemedyBn: string;
  chemicalRemedyBn: string;
  severity: 'Low' | 'Medium' | 'High';
  image: string;
}

export interface WeatherInfo {
  district: string;
  districtBn: string;
  temp: number;
  humidity: number;
  rainfall: string;
  condition: string;
  advisoryBn: string;
}

export interface GovernmentScheme {
  id: string;
  nameBn: string;
  nameEn: string;
  department: string;
  financialBenefit: string;
  eligibilityBn: string;
  applicationProcessBn: string;
  portalUrl: string;
}

