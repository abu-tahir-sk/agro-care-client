'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import DashboardShell from './dashboard/DashboardShell';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Distinct Dashboard Routes
  const dashboardRoutes = [
    '/farmer',
    '/retailer',
    '/supplier',
    '/expert',
    '/delivery',
    '/admin',
    '/dashboard',
  ];

  const isDashboard = dashboardRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isDashboard) {
    // Dedicated Dashboard Console (Separated completely from public site)
    return <DashboardShell>{children}</DashboardShell>;
  }

  // Public Home & E-Commerce Site
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
}

