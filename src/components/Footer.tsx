import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Footer: React.FC = () => {
  const { data } = useData();
  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-white border-t border-gray-100 mt-20 py-10 text-center"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto px-4 space-y-5">
        {/* Centered Brand Name */}
        <div className="inline-flex items-center justify-center gap-2">
          <span className="text-lg sm:text-xl font-black text-[#0F172A] tracking-tight">
            {displayName}
          </span>
        </div>

        {/* Navigation Links Row */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-[#64748B]">
          <Link to="/services" className="hover:text-[#2563EB] transition-colors">
            الخدمات
          </Link>
          <Link to="/portfolio" className="hover:text-[#2563EB] transition-colors">
            معرض الأعمال
          </Link>
          <Link to="/socials" className="hover:text-[#2563EB] transition-colors">
            حساباتي
          </Link>
          <Link to="/about" className="hover:text-[#2563EB] transition-colors">
            عني أكثر
          </Link>
        </nav>

        {/* Copyright and Admin Link */}
        <div className="pt-3 border-t border-slate-50 flex flex-wrap items-center justify-center gap-2 text-xs text-[#64748B]">
          <span>© {currentYear} {displayName}. جميع الحقوق محفوظة.</span>
          <span>-</span>
          <Link
            to="/admin"
            id="footer-admin-link"
            className="inline-flex items-center gap-1 text-[#64748B] hover:text-[#2563EB] transition-colors"
          >
            <Shield className="w-3 h-3 text-slate-400" />
            <span>لوحة التحكم</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};


