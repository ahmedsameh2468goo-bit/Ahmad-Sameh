import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowUpRight,
  Layers,
  Film,
  Share2,
  User,
  Home,
  Copy,
  Check,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { generateWhatsAppUrl } from '../utils/validators';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const { data } = useData();
  const toast = useToast();
  const [copiedHeader, setCopiedHeader] = useState(false);

  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const username = data.global_settings.username || 'aahmd_saamh';

  // 5 exact sections strictly
  const navLinks = [
    { name: 'الرئيسية', targetId: 'hero', icon: Home },
    { name: 'الخدمات', targetId: 'services', icon: Layers },
    { name: 'معرض الأعمال', targetId: 'portfolio', icon: Film },
    { name: 'حساباتي', targetId: 'socials', icon: Share2 },
    { name: 'عني أكثر', targetId: 'about', icon: User },
  ];

  // Active section observer on scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const link of navLinks) {
        const el = document.getElementById(link.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${targetId}`;
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(targetId);
    }
  };

  const handleCopyHeaderUsername = (e: React.MouseEvent) => {
    e.stopPropagation();
    const handle = `@${username.replace(/^@/, '')}`;
    navigator.clipboard.writeText(handle);
    setCopiedHeader(true);
    toast.success(`تم نسخ اسم المستخدم: ${handle}`);
    setTimeout(() => setCopiedHeader(false), 2000);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all shadow-xs"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            id="brand-logo-link"
            className="flex items-center gap-3.5 group focus:outline-hidden text-right cursor-pointer"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#00d9fe] via-blue-500 to-[#00d9fe] p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(0,217,254,0.45)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                {data.global_settings.heroImage ? (
                  <img
                    src={data.global_settings.heroImage}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-black text-base text-slate-900 tracking-tighter">
                    {displayName.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-[#00d9fe] border-2 border-white rounded-full shadow-xs"></div>
            </div>

            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:text-cyan-600 transition-colors">
                {displayName}
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-800 transition-colors dir-ltr">
                <span>@{username.replace(/^@/, '')}</span>
                {/* Small elegant icon-only copy button */}
                <span
                  onClick={handleCopyHeaderUsername}
                  title="نسخ اسم المستخدم"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  {copiedHeader ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            id="desktop-navbar"
            className="hidden lg:flex items-center gap-1 bg-slate-100/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 shadow-inner"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.targetId;
              return (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => scrollToSection(link.targetId)}
                  id={`nav-link-${link.targetId}`}
                  className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 bg-white border border-[#00d9fe] shadow-sm shadow-cyan-500/20'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Direct CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            {data.global_settings.whatsapp ? (
              <a
                href={generateWhatsAppUrl(
                  data.global_settings.whatsapp,
                  `مرحباً ${displayName}، أود التواصل معك بخصوص مشروع جديد`
                )}
                target="_blank"
                rel="noopener noreferrer"
                id="header-whatsapp-cta"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00d9fe] hover:bg-[#38e1fe] text-slate-950 text-sm font-black rounded-xl shadow-md hover:shadow-cyan-400/40 hover:scale-[1.03] active:scale-[0.98] transition-all group"
              >
                <span>تواصل معي</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00d9fe] hover:bg-[#38e1fe] text-slate-950 text-sm font-black rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <span>تواصل معي</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6" />}
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
            className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.targetId;
              return (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => scrollToSection(link.targetId)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all text-right cursor-pointer ${
                    isActive
                      ? 'bg-cyan-50 text-slate-950 border border-[#00d9fe]'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}

            {data.global_settings.whatsapp && (
              <div className="pt-3 border-t border-slate-200 mt-3">
                <a
                  href={generateWhatsAppUrl(
                    data.global_settings.whatsapp,
                    `مرحباً ${displayName}، أود التواصل معك`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#00d9fe] text-slate-950 font-black rounded-xl shadow-md"
                >
                  <span>تواصل عبر واتساب</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950" />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
