import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, ArrowUp } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Footer: React.FC = () => {
  const { data } = useData();
  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const username = data.global_settings.username || 'aahmd_saamh';
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-slate-100/80 border-t border-slate-200 mt-20 py-12 text-center text-slate-600 relative overflow-hidden"
      dir="rtl"
    >
      {/* Subtle Electric Cyan Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl h-[2px] bg-gradient-to-r from-transparent via-[#00d9fe] to-transparent" />

      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Brand and Username */}
        <div className="flex flex-col items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-2xl font-black text-slate-900 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            <span>{displayName}</span>
            <Sparkles className="w-4 h-4 text-[#00d9fe]" />
          </button>
          <span className="font-mono text-xs sm:text-sm font-bold text-slate-500 dir-ltr bg-white px-3 py-0.5 rounded-full border border-slate-200">
            @{username.replace(/^@/, '')}
          </span>
        </div>

        {/* 5 Quick Links */}
        <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-sm font-bold text-slate-600">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="hover:text-cyan-600 hover:scale-105 transition-all cursor-pointer"
          >
            الرئيسية
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('services')}
            className="hover:text-cyan-600 hover:scale-105 transition-all cursor-pointer"
          >
            الخدمات
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('portfolio')}
            className="hover:text-cyan-600 hover:scale-105 transition-all cursor-pointer"
          >
            معرض الأعمال
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('socials')}
            className="hover:text-cyan-600 hover:scale-105 transition-all cursor-pointer"
          >
            حساباتي
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="hover:text-cyan-600 hover:scale-105 transition-all cursor-pointer"
          >
            عني أكثر
          </button>
        </nav>

        {/* Back to top button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={scrollToTop}
            title="العودة للأعلى"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-950 hover:border-[#00d9fe] shadow-xs transition-all cursor-pointer"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-600" />
          </button>
        </div>

        {/* Copyright and Admin link */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {currentYear} {displayName} — الحركة هي عالمي. جميع الحقوق محفوظة.</span>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-cyan-600 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>بوابة الإدارة</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
