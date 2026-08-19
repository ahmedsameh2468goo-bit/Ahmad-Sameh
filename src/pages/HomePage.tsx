import React from 'react';
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
  Send,
  MessageCircle,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { generateWhatsAppUrl } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const HomePage: React.FC = () => {
  const { data } = useData();
  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const activeServices = data.services.filter((s) => s.isVisible);

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
      className="min-h-screen bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white"
      dir="rtl"
    >
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F0F9FF] via-white to-white"
      >
        {/* Subtle top ambient radial lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-[#E0F2FE]/40 via-[#F0F9FF]/20 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          {/* Centered Circular Profile Avatar with #EAB308 Gold Border (2px) - Enlarged to 220px+ */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative mb-8"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 bg-white border-2 border-[#EAB308] shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#EFF6FF] flex items-center justify-center">
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
          </motion.div>

          {/* Main Title: Bold Display in Primary Blue #2563EB */}
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-4xl sm:text-6xl font-black text-[#2563EB] tracking-tight mb-4"
          >
            {displayName}
          </motion.h1>

          {/* Subtitle / Bio: Text Gray #4B5563 */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="max-w-2xl text-base sm:text-lg text-[#4B5563] font-normal leading-relaxed mb-8 px-2"
          >
            {data.global_settings.bio && data.global_settings.bio.trim() !== '' ? (
              <p>{data.global_settings.bio}</p>
            ) : (
              <EmptyFallback message="لا يوجد حالياً" compact />
            )}
          </motion.div>

          {/* Action Buttons: Primary Blue + Secondary White with Gold Border */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            {/* Primary Blue Button #2563EB with White text */}
            <Link
              to="/services"
              id="hero-explore-services-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm sm:text-base font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>استكشف الخدمات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            {/* Secondary Button: White bg, Gold Border #EAB308, Text #1E293B */}
            <Link
              to="/portfolio"
              id="hero-portfolio-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#1E293B] text-sm sm:text-base font-bold rounded-xl border-2 border-[#EAB308] shadow-xs hover:border-[#ca9a07] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Film className="w-4 h-4 text-[#2563EB]" />
              <span>معرض الأعمال</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="home-services-section" className="max-w-6xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-block">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                الخدمات
              </h2>
              {/* Short Gold / Yellow Accent Line #F59E0B */}
              <div className="w-12 h-1 bg-[#F59E0B] rounded-full mt-2" />
            </div>
          </div>

          <Link
            to="/services"
            id="view-all-services-link"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-blue-800 transition-colors group"
          >
            <span>عرض جميع الخدمات</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Service Cards Grid */}
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
                  className="bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-xs hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Light Blue Icon Box #EFF6FF with #2563EB Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Service Title #0F172A */}
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                      {service.title}
                    </h3>

                    {/* Service Description #64748B */}
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Card Button: #2563EB bg, mail icon, white text "تواصل الآن" */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={contactUrl}
                      target={data.global_settings.whatsapp ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-white" />
                      <span>تواصل الآن</span>
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
      <section id="home-contact-section" className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="space-y-6">
          {/* Centered Title with Short Yellow Line #F59E0B */}
          <div className="inline-block text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              تواصل معي
            </h2>
            <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto mt-2" />
          </div>

          <p className="text-sm sm:text-base text-[#4B5563] max-w-lg mx-auto leading-relaxed">
            أنا متاح دائماً لمناقشة أفكار المشاريع الجديدة، الاستشارات التقنية، والتعاون الإبداعي.
          </p>

          {/* Pill Shaped Button (rounded-full), White bg, Gold Border #EAB308 */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {data.global_settings.email && (
              <a
                href={`mailto:${data.global_settings.email}`}
                id="contact-email-pill-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-white hover:bg-amber-50/40 text-[#1E293B] font-bold text-sm sm:text-base rounded-full border-2 border-[#EAB308] shadow-xs hover:border-[#ca9a07] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>راسلني عبر البريد</span>
              </a>
            )}

            {data.global_settings.whatsapp && (
              <a
                href={generateWhatsAppUrl(
                  data.global_settings.whatsapp,
                  `مرحباً ${displayName}، أود التواصل معك`
                )}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-pill-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-full shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>محادثة واتساب</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

