import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Mail,
  ArrowLeft,
  Layers,
  Sparkles,
  Film,
  Video,
  Code,
  Palette,
  Bot,
  MessageCircle,
  Copy,
  Check,
  Share2,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { generateWhatsAppUrl } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const HomePage: React.FC = () => {
  const { data } = useData();
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const username = data.global_settings.username || 'aahmd_saiimd';
  const tagline = data.global_settings.tagline || 'اليوزر النيم الموحد في كل منصات الكوكب';
  const activeServices = data.services.filter((s) => s.isVisible);

  const handleCopyUsername = () => {
    const handle = `@${username.replace(/^@/, '')}`;
    navigator.clipboard.writeText(handle);
    setCopied(true);
    toast.success(`تم نسخ اليوزر الموحد: ${handle}`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to assign fitting icons based on service title
  const getServiceIcon = (title: string, index: number) => {
    const t = title.toLowerCase();
    if (t.includes('مونتاج') || t.includes('فيديو') || t.includes('video')) return Video;
    if (t.includes('ويب') || t.includes('تطوير') || t.includes('برمج') || t.includes('web') || t.includes('code')) return Code;
    if (t.includes('هوية') || t.includes('جرافيك') || t.includes('تصميم') || t.includes('design')) return Palette;
    if (t.includes('ذكاء') || t.includes('ai') || t.includes('vibe')) return Bot;
    const fallbackIcons = [Layers, Video, Code, Palette, Bot, Sparkles];
    return fallbackIcons[index % fallbackIcons.length];
  };

  return (
    <div
      id="home-page-container"
      className="min-h-screen bg-[#f6f6e9] text-slate-900 selection:bg-[#00d9fe] selection:text-slate-900"
      dir="rtl"
    >
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden"
      >
        {/* Ambient Electric Cyan & Deep Blue Glow Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#00d9fe]/15 via-[#2563EB]/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          {/* Centered Circular Profile Avatar with Electric Cyan (#00d9fe) Glow Border & Floating Effect */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative mb-6"
          >
            <div className="hero-image-container relative w-52 h-52 sm:w-60 sm:h-60 rounded-full p-1 bg-gradient-to-tr from-[#00d9fe] via-blue-500 to-[#00d9fe] shadow-[0_0_30px_rgba(0,217,254,0.35)] flex items-center justify-center">
              <div className="w-full h-full rounded-full p-1 bg-[#f6f6e9] flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center border border-slate-200/80">
                  {data.global_settings.heroImage ? (
                    <img
                      src={data.global_settings.heroImage}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#2563EB]">
                      <span className="text-5xl sm:text-6xl font-black tracking-tight">
                        {displayName.slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Online pulse indicator badge */}
              <div
                className="absolute bottom-3 left-3 w-5 h-5 bg-[#00d9fe] border-2 border-white rounded-full shadow-[0_0_12px_#00d9fe] animate-pulse"
                title="متاح للمشاريع والتعاون"
              />
            </div>
          </motion.div>

          {/* Unified Username Capsule directly below profile picture */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="flex flex-col items-center gap-2 mb-4"
          >
            <button
              type="button"
              onClick={handleCopyUsername}
              title="اضغط لنسخ اليوزر الموحد"
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#00d9fe]/60 shadow-[0_2px_14px_rgba(0,217,254,0.22)] hover:shadow-[0_4px_22px_rgba(0,217,254,0.45)] hover:border-[#00d9fe] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-[#00d9fe] shadow-[0_0_8px_#00d9fe]" />
              <span className="font-mono text-sm sm:text-base font-bold text-slate-900 tracking-wider dir-ltr">
                @{username.replace(/^@/, '')}
              </span>
              <div className="p-1 rounded-full text-slate-400 group-hover:text-[#00d9fe] transition-colors">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </div>
            </button>

            {/* Subtitle Tagline directly beneath the username */}
            {tagline && tagline.trim() !== '' && (
              <p className="text-xs sm:text-sm font-semibold text-slate-600 bg-white/60 px-4 py-1 rounded-full border border-slate-200/50 shadow-2xs">
                {tagline}
              </p>
            )}
          </motion.div>

          {/* Main Title: Bold Display Name with Electric Cyan subtle accent */}
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2 mb-4"
          >
            <span>{displayName}</span>
          </motion.h1>

          {/* Bio Description */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 px-2"
          >
            {data.global_settings.bio && data.global_settings.bio.trim() !== '' ? (
              <p>{data.global_settings.bio}</p>
            ) : (
              <EmptyFallback message="لا يوجد حالياً" compact />
            )}
          </motion.div>

          {/* Action Buttons: Primary Cyan/Blue + Secondary Portfolio Button */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            {/* Primary Action Button */}
            <Link
              to="/services"
              id="hero-explore-services-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm sm:text-base font-bold rounded-2xl border border-slate-700 shadow-md hover:shadow-[0_0_25px_rgba(0,217,254,0.4)] hover:border-[#00d9fe] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
            >
              <span>استكشف الخدمات</span>
              <ArrowLeft className="w-4 h-4 text-[#00d9fe] group-hover:-translate-x-1 transition-transform" />
            </Link>

            {/* Secondary Portfolio Button */}
            <Link
              to="/portfolio"
              id="hero-portfolio-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-900 text-sm sm:text-base font-bold rounded-2xl border-2 border-slate-200 shadow-xs hover:border-[#00d9fe] hover:shadow-[0_4px_20px_rgba(0,217,254,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Film className="w-4 h-4 text-[#2563EB]" />
              <span>معرض الأعمال</span>
            </Link>

            {/* Quick Social Accounts Button */}
            <Link
              to="/socials"
              id="hero-socials-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cyan-50/70 hover:bg-cyan-100/80 text-cyan-950 text-sm sm:text-base font-bold rounded-2xl border border-[#00d9fe]/50 shadow-xs hover:shadow-[0_4px_18px_rgba(0,217,254,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#00d9fe]" />
              <span>حساباتي الموحدة</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="home-services-section" className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200/80 gap-4">
          <div>
            <div className="inline-block">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>الخدمات الإبداعية</span>
                <Sparkles className="w-5 h-5 text-[#00d9fe]" />
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-[#00d9fe] to-blue-600 rounded-full mt-2" />
            </div>
          </div>

          <Link
            to="/services"
            id="view-all-services-link"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-[#00d9fe] transition-colors group"
          >
            <span>عرض جميع الخدمات</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Service Cards Grid on Cream Background */}
        {activeServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.slice(0, 3).map((service, index) => {
              const IconComponent = getServiceIcon(service.title, index);
              const contactUrl = data.global_settings.whatsapp
                ? generateWhatsAppUrl(
                    data.global_settings.whatsapp,
                    `مرحباً ${displayName}، أود الاستفسار وطلب خدمة: ${service.title}`
                  )
                : data.global_settings.email
                ? `mailto:${data.global_settings.email}?subject=${encodeURIComponent(
                    `طلب خدمة: ${service.title}`
                  )}`
                : '#';

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#00d9fe]/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon Box with Electric Cyan accent */}
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50/70 border border-[#00d9fe]/30 text-[#00d9fe] group-hover:bg-[#00d9fe] group-hover:text-slate-950 group-hover:shadow-[0_0_20px_rgba(0,217,254,0.4)] flex items-center justify-center mb-5 transition-all duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Card Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={contactUrl}
                      target={data.global_settings.whatsapp ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-blue-600 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-[0_4px_18px_rgba(0,217,254,0.35)] transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[#00d9fe]" />
                      <span>طلب الخدمة الآن</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <EmptyFallback message="لا توجد خدمات متاحة حالياً" />
        )}
      </section>

      {/* 3. CONTACT SECTION */}
      <section id="home-contact-section" className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="inline-block text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              تواصل معي مباشرة
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#00d9fe] to-blue-600 rounded-full mx-auto mt-2" />
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            متاح دائماً لمناقشة أفكار المشاريع، استشارات الميديا والذكاء الاصطناعي، والتعاون الإبداعي.
          </p>

          {/* Contact Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {data.global_settings.email && (
              <a
                href={`mailto:${data.global_settings.email}`}
                id="contact-email-pill-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base rounded-full border-2 border-slate-200 hover:border-[#00d9fe] shadow-xs hover:shadow-[0_4px_16px_rgba(0,217,254,0.25)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>راسلني عبر البريد</span>
              </a>
            )}

            {data.global_settings.whatsapp && (
              <a
                href={generateWhatsAppUrl(
                  data.global_settings.whatsapp,
                  `مرحباً ${displayName} (@${username.replace(/^@/, '')})، أود التواصل معك بخصوص مشروع`
                )}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-pill-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#00d9fe] hover:bg-[#00c2e3] text-slate-950 font-black text-sm sm:text-base rounded-full shadow-md shadow-cyan-400/25 hover:shadow-[0_0_25px_rgba(0,217,254,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>محادثة واتساب سريعة</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};


