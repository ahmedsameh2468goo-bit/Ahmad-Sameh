import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, MessageCircle, Shield, Heart } from 'lucide-react';
import { useData } from '../context/DataContext';
import { generateWhatsAppUrl } from '../utils/validators';

export const Footer: React.FC = () => {
  const { data } = useData();
  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-white border-t border-slate-200 mt-20 text-slate-600"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm sm:text-base shadow-sm">
                {displayName.slice(0, 2)}
              </div>
              <span className="text-xl font-black text-slate-900">{displayName}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              {data.global_settings.bio || 'لا يوجد حالياً'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>روابط سريعة</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  الخدمات والموضوعات
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  معرض الأعمال
                </Link>
              </li>
              <li>
                <Link to="/socials" className="hover:text-blue-600 transition-colors">
                  حساباتي
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  عني أكثر والاهتمامات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info & Admin shortcut */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              التواصل المباشر
            </h4>
            <div className="space-y-2 text-sm">
              {data.global_settings.email && (
                <a
                  href={`mailto:${data.global_settings.email}`}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors border border-slate-100"
                >
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-sans text-xs sm:text-sm truncate">
                    {data.global_settings.email}
                  </span>
                </a>
              )}

              {data.global_settings.whatsapp && (
                <a
                  href={generateWhatsAppUrl(data.global_settings.whatsapp, `مرحباً ${displayName}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 transition-colors border border-slate-100"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-sans text-xs sm:text-sm">
                    {data.global_settings.whatsapp}
                  </span>
                </a>
              )}
            </div>

            <div className="pt-2">
              <Link
                to="/admin"
                id="footer-admin-link"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors font-medium"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>لوحة تحكم المشرف</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} {displayName}. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            <span>صُنِع بشغف وإتقان</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
