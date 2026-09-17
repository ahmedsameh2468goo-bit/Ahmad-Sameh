import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export const Footer: React.FC = () => {
  const { data } = useData();
  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const username = data.global_settings.username || 'aahmd_saiimd';
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-[#f6f6e9] border-t border-slate-200/80 mt-20 py-12 text-center"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto px-4 space-y-5">
        {/* Centered Brand Name with username */}
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-xl font-black text-slate-900 tracking-tight">
            {displayName}
          </span>
          <span className="font-mono text-xs font-bold text-slate-500 dir-ltr">
            @{username.replace(/^@/, '')}
          </span>
        </div>

        {/* Navigation Links Row */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600">
          <Link to="/services" className="hover:text-blue-600 hover:scale-105 transition-all">
            الخدمات
          </Link>
          <Link to="/portfolio" className="hover:text-blue-600 hover:scale-105 transition-all">
            معرض الأعمال
          </Link>
          <Link to="/socials" className="hover:text-blue-600 hover:scale-105 transition-all">
            حساباتي
          </Link>
          <Link to="/about" className="hover:text-blue-600 hover:scale-105 transition-all">
            عني أكثر
          </Link>
        </nav>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span>© {currentYear} {displayName}. جميع الحقوق محفوظة.</span>
        </div>
      </div>
    </footer>
  );
};


