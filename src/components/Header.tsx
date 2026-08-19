import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Shield,
  Layers,
  Film,
  Share2,
  User,
  Home
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { generateWhatsAppUrl } from '../utils/validators';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data } = useData();

  const displayName = data.global_settings.displayName || 'أحمد سامح';

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'الخدمات', path: '/services', icon: Layers },
    { name: 'معرض الأعمال', path: '/portfolio', icon: Film },
    { name: 'حساباتي', path: '/socials', icon: Share2 },
    { name: 'عني أكثر', path: '/about', icon: User },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                {data.global_settings.heroImage ? (
                  <img
                    src={data.global_settings.heroImage}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-extrabold text-sm sm:text-base text-blue-600 tracking-tighter">
                    {displayName.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full shadow-xs"></div>
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                {displayName}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>الملف التعريفي الرسمي</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav id="desktop-navbar" className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.path.replace('/', '') || 'home'}`}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'text-blue-600 bg-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`
                  }
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* CTA & Admin Quick access */}
          <div className="hidden lg:flex items-center gap-3">
            {data.global_settings.whatsapp && (
              <a
                href={generateWhatsAppUrl(data.global_settings.whatsapp, `مرحباً ${displayName}، أود التواصل معك بخصوص مشروع`)}
                target="_blank"
                rel="noopener noreferrer"
                id="header-whatsapp-cta"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>تواصل معي</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            <Link
              to="/admin"
              id="header-admin-btn"
              title="لوحة الإدارة"
              className="p-2.5 text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-xl transition-colors border border-slate-200/80"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/admin"
              id="mobile-header-admin-btn"
              className="p-2 text-slate-500 hover:text-blue-600 bg-slate-100 rounded-xl border border-slate-200"
            >
              <Shield className="w-4 h-4" />
            </Link>

            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border border-blue-200/60'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}

            {data.global_settings.whatsapp && (
              <div className="pt-3 border-t border-slate-100 mt-2">
                <a
                  href={generateWhatsAppUrl(data.global_settings.whatsapp, `مرحباً ${displayName}، أود التواصل معك`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md"
                >
                  <span>تواصل عبر واتساب</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
