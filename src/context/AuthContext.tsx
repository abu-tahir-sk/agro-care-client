'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  location: string;
  verified: boolean;
  farmArea?: string;
  shopName?: string;
  gstNumber?: string;
}

interface AuthContextType {
  role: UserRole;
  user: UserProfile | null;
  setRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const mockUsers: Record<UserRole, UserProfile | null> = {
  guest: null,
  farmer: {
    id: 'f-101',
    name: 'বিপ্লব মণ্ডল (Biplab Mondal)',
    phone: '+91 98321 44521',
    role: 'farmer',
    location: 'বর্ধমান (Burdwan, WB)',
    verified: true,
    farmArea: '৩.৫ একর (3.5 Acres)',
  },
  retailer: {
    id: 'r-202',
    name: 'অমল দত্ত (Amal Dutta)',
    phone: '+91 94340 78210',
    role: 'retailer',
    location: 'আরামবাগ, হুগলী (Arambagh, Hooghly)',
    verified: true,
    shopName: 'দত্ত কৃষি ভাণ্ডার (Dutta Krishi Bhandar)',
    gstNumber: '19AAECD1234F1Z5',
  },
  supplier: {
    id: 's-303',
    name: 'IFFCO বেঙ্গল ডিস্ট্রিবিউটর',
    phone: '+91 98000 11223',
    role: 'supplier',
    location: 'কলকাতা সেন্ট্রাল ওয়্যারহাউস',
    verified: true,
  },
  expert: {
    id: 'e-404',
    name: 'ড. শুভাশিস রায় (Dr. Subhashis Roy)',
    phone: '+91 94770 99887',
    role: 'expert',
    location: 'বিধানচন্দ্র কৃষি বিশ্ববিদ্যালয় (BCKV)',
    verified: true,
  },
  delivery: {
    id: 'd-505',
    name: 'সুজয় দাস (Sujoy Das)',
    phone: '+91 97321 00112',
    role: 'delivery',
    location: 'নদীয়া হাব (Nadia Hub)',
    verified: true,
  },
  admin: {
    id: 'a-001',
    name: 'AgroCare Central Admin',
    phone: '+91 90000 00001',
    role: 'admin',
    location: 'AgroCare HQ, Kolkata',
    verified: true,
  },
  super_admin: {
    id: 'sa-001',
    name: 'AgroCare Super Admin',
    phone: '+91 90000 00000',
    role: 'super_admin',
    location: 'AgroCare HQ, Kolkata',
    verified: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('farmer'); // default demo role as farmer
  const [user, setUser] = useState<UserProfile | null>(mockUsers['farmer']);

  useEffect(() => {
    const savedRole = localStorage.getItem('agrocare_role') as UserRole;
    if (savedRole && mockUsers[savedRole] !== undefined) {
      setRoleState(savedRole);
      setUser(mockUsers[savedRole]);
    }
  }, []);

  const loginAs = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(mockUsers[newRole]);
    localStorage.setItem('agrocare_role', newRole);
  };

  const logout = () => {
    setRoleState('guest');
    setUser(null);
    localStorage.removeItem('agrocare_role');
  };

  return (
    <AuthContext.Provider value={{ role, user, setRole: setRoleState, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

