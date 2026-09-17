import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Copy,
  Check,
  ArrowDown,
  ArrowUpRight,
  Video,
  Code,
  Palette,
  Bot,
  Layers,
  Film,
  Play,
  ExternalLink,
  Youtube,
  Instagram,
  Twitter,
  AtSign,
  Tv,
  Linkedin,
  MessageCircle,
  Mail,
  Briefcase,
  User,
  Send,
  Share2,
  X,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { generateWhatsAppUrl, detectVideoPlatform, VideoPlatformType } from '../utils/validators';

export const HomePage: React.FC = () => {
  const { data } = useData();
  const toast = useToast();

  // State
  const [copiedUser, setCopiedUser] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<{ url: string; title: string; embedUrl?: string } | null>(null);

  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const username = data.global_settings.username || 'aahmd_saamh';
  const tagline = data.global_settings.tagline || 'اليوزر النيم الموحد في كل منصات الكوكب';
  const bio = data.global_settings.bio || 'صانع محتوى ومطور شغوف بالتقنية والذكاء الاصطناعي وصناعة التجارب الرقمية المميزة وتصميم الأفكار الإبداعية.';

  // Services (active and visible)
  const visibleServices = data.services.filter((s) => s.isVisible);

  // Portfolio
  const portfolioProjects = data.portfolio;

  // Copy Username Handler
  const handleCopyUsername = () => {
    const handle = `@${username.replace(/^@/, '')}`;
    navigator.clipboard.writeText(handle);
    setCopiedUser(true);
    toast.success(`تم نسخ اسم المستخدم: ${handle}`);
    setTimeout(() => setCopiedUser(false), 2000);
  };

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to map platform icon
  const renderPlatformIcon = (platform: VideoPlatformType) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-rose-500" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'tiktok':
        return <Video className="w-4 h-4 text-cyan-600" />;
      default:
        return <Play className="w-4 h-4 text-cyan-600 fill-cyan-600" />;
    }
  };

  // Helper for service icons
  const getServiceIcon = (title: string, index: number) => {
    const t = title.toLowerCase();
    if (t.includes('مونتاج') || t.includes('فيديو') || t.includes('video')) return Video;
    if (t.includes('ويب') || t.includes('تطوير') || t.includes('برمج') || t.includes('web') || t.includes('code')) return Code;
    if (t.includes('هوية') || t.includes('جرافيك') || t.includes('تصميم') || t.includes('design')) return Palette;
    if (t.includes('ذكاء') || t.includes('ai') || t.includes('vibe')) return Bot;
    const fallbackIcons = [Layers, Video, Code, Palette, Bot, Sparkles];
    return fallbackIcons[index % fallbackIcons.length];
  };

  // Supported Social Platforms (Exclusively 8: WhatsApp, Instagram, YouTube, TikTok, X, Threads, Kick, LinkedIn)
  const socials = data.social_links;
  const getWhatsAppLink = (val?: string) => {
    if (!val || !val.trim()) return '';
    const clean = val.trim();
    if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
    return generateWhatsAppUrl(clean, `مرحباً ${displayName}، أود التواصل معك`);
  };

  const allSupportedPlatforms = [
    {
      id: 'whatsapp',
      name: 'واتساب',
      englishName: 'WhatsApp',
      url: getWhatsAppLink(socials.whatsapp),
      icon: MessageCircle,
      accentBorder: 'hover:border-[#25D366]',
      iconBg: 'bg-[#25D366]/10 text-[#25D366]',
    },
    {
      id: 'instagram',
      name: 'إنستغرام',
      englishName: 'Instagram',
      url: socials.instagram || '',
      icon: Instagram,
      accentBorder: 'hover:border-[#E1306C]',
      iconBg: 'bg-pink-50 text-[#E1306C]',
    },
    {
      id: 'youtube',
      name: 'يوتيوب',
      englishName: 'YouTube',
      url: socials.youtube || '',
      icon: Youtube,
      accentBorder: 'hover:border-[#FF0000]',
      iconBg: 'bg-red-50 text-[#FF0000]',
    },
    {
      id: 'tiktok',
      name: 'تيك توك',
      englishName: 'TikTok',
      url: socials.tiktok || '',
      icon: Video,
      accentBorder: 'hover:border-[#00d9fe]',
      iconBg: 'bg-cyan-50 text-cyan-600',
    },
    {
      id: 'x',
      name: 'إكس',
      englishName: 'X (Twitter)',
      url: socials.x || socials.twitter || '',
      icon: Twitter,
      accentBorder: 'hover:border-slate-800',
      iconBg: 'bg-slate-100 text-slate-900',
    },
    {
      id: 'threads',
      name: 'ثريدز',
      englishName: 'Threads',
      url: socials.threads || '',
      icon: AtSign,
      accentBorder: 'hover:border-slate-700',
      iconBg: 'bg-slate-100 text-slate-800',
    },
    {
      id: 'kick',
      name: 'كيك',
      englishName: 'Kick',
      url: socials.kick || '',
      icon: Tv,
      accentBorder: 'hover:border-emerald-500',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'linkedin',
      name: 'لينكد إن',
      englishName: 'LinkedIn',
      url: socials.linkedin || '',
      icon: Linkedin,
      accentBorder: 'hover:border-[#0A66C2]',
      iconBg: 'bg-blue-50 text-[#0A66C2]',
    },
  ];

  // Conditional Rendering Logic:
  // If a platform URL is empty in Supabase, hide its card completely from the public site.
  const visibleSocialPlatforms = allSupportedPlatforms.filter(
    (p) => p.url && p.url.trim().length > 0
  );

  return (
    <div
      id="one-page-scroll-container"
      className="bg-slate-50 text-slate-900 selection:bg-[#00d9fe] selection:text-slate-950 font-sans min-h-screen"
      dir="rtl"
    >
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (#hero)                                                   */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-[85vh] flex flex-col items-center justify-center pt-12 pb-20 px-4 overflow-hidden border-b border-slate-200/80"
      >
        {/* Subtle Ambient Light Glows with Signature Electric Cyan Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-cyan-100/50 via-blue-50/40 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#00d9fe]/10 blur-[90px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-7 z-10">
          {/* Movement is My World Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-xs text-xs sm:text-sm font-bold text-slate-800"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d9fe] shadow-[0_0_8px_#00d9fe]" />
            <span>الحركة هي عالمي • والذكاء الرقمي أداتي</span>
          </motion.div>

          {/* Profile Picture with Signature Electric Cyan Floating Ring */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative"
          >
            <div className="hero-image-container relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-tr from-[#00d9fe] via-blue-500 to-[#00d9fe] shadow-[0_10px_35px_rgba(0,217,254,0.35)] flex items-center justify-center">
              <div className="w-full h-full rounded-full p-1 bg-white flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
                  {data.global_settings.heroImage ? (
                    <img
                      src={data.global_settings.heroImage}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-black text-3xl sm:text-4xl text-slate-900 tracking-tighter">
                      {displayName.slice(0, 2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Glowing Accent Badge */}
            <div className="absolute bottom-2 left-2 bg-[#00d9fe] text-slate-950 p-2 rounded-full border-2 border-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Display Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
              {displayName}
            </h1>

            {/* Unified Username & Small Icon-Only Copy Button */}
            <div className="pt-1 flex flex-col items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm hover:border-[#00d9fe] transition-all">
                <span className="w-2 h-2 rounded-full bg-[#00d9fe] shadow-[0_0_8px_#00d9fe]" />
                <span className="font-mono text-base sm:text-lg font-black text-slate-900 tracking-wider dir-ltr">
                  @{username.replace(/^@/, '')}
                </span>

                {/* Elegant icon-only copy button */}
                <button
                  type="button"
                  onClick={handleCopyUsername}
                  id="hero-copy-username-btn"
                  title="نسخ اسم المستخدم"
                  aria-label="نسخ اسم المستخدم"
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-950 hover:bg-cyan-50 transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  {copiedUser ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Custom Subtitle Tagline (fully editable from Admin Dashboard) */}
              {tagline && tagline.trim() !== '' && (
                <p className="text-sm sm:text-base font-bold text-slate-600 bg-white/80 px-5 py-1 rounded-full border border-slate-200/80 shadow-2xs max-w-md">
                  {tagline}
                </p>
              )}
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {bio}
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.28 }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2 w-full max-w-lg"
          >
            <button
              type="button"
              onClick={() => scrollTo('portfolio')}
              className="px-6 py-3.5 rounded-2xl bg-[#00d9fe] hover:bg-[#38e1fe] text-slate-950 font-black text-sm sm:text-base shadow-md hover:shadow-cyan-400/30 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <Film className="w-4 h-4" />
              <span>تصفح معرض الأعمال</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('services')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base border border-slate-200 hover:border-[#00d9fe] shadow-xs hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-600" />
              <span>استكشف الخدمات</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('socials')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-bold text-sm border border-slate-200 hover:border-[#00d9fe] shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-cyan-600" />
              <span>حساباتي الرسمية</span>
            </button>
          </motion.div>

          {/* Down Indicator */}
          <div className="pt-6">
            <button
              type="button"
              onClick={() => scrollTo('services')}
              className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-cyan-600 hover:border-[#00d9fe] shadow-xs transition-all animate-bounce cursor-pointer"
              title="انتقل للأسفل"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SERVICES SECTION (#services)                                           */}
      {/* ========================================================================= */}
      <section
        id="services"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200/80 scroll-mt-20"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200 text-cyan-700 text-xs font-bold shadow-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>ما أقدمه من قيمة واحترافية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            الخدمات
          </h2>
          <div className="w-14 h-1 bg-[#00d9fe] rounded-full mx-auto" />
          <p className="text-slate-600 text-base sm:text-lg">
            حلول متكاملة في صناعة المحتوى المرئي، هندسة الويب وتطوير الواجهات، والذكاء الاصطناعي.
          </p>
        </div>

        {visibleServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleServices.map((service, index) => {
              const IconComponent = getServiceIcon(service.title, index);

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between hover:border-[#00d9fe] hover:shadow-[0_10px_30px_rgba(0,217,254,0.18)] hover:-translate-y-1.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="space-y-5">
                    {/* Icon Box with Electric Cyan Hover */}
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 group-hover:bg-[#00d9fe] group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      SERVICE #{String(index + 1).padStart(2, '0')}
                    </span>

                    {data.global_settings.whatsapp && (
                      <a
                        href={generateWhatsAppUrl(
                          data.global_settings.whatsapp,
                          `مرحباً ${displayName}، أود الاستفسار عن خدمة: ${service.title}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-600 hover:text-slate-950 transition-colors group/cta"
                      >
                        <span>طلب الخدمة</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
            لم تتم إضافة أي خدمات نشطة حالياً.
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. PORTFOLIO SECTION (#portfolio)                                         */}
      {/* ========================================================================= */}
      <section
        id="portfolio"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200/80 scroll-mt-20"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200 text-cyan-700 text-xs font-bold shadow-xs">
            <Film className="w-3.5 h-3.5 text-cyan-600" />
            <span>الأعمال تتحدث بصوت أعلى</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            معرض الأعمال
          </h2>
          <div className="w-14 h-1 bg-[#00d9fe] rounded-full mx-auto" />
          <p className="text-slate-600 text-base sm:text-lg">
            نماذج مختارة من أعمال المونتاج، الفيديو، والمشاريع الرقمية الإبداعية.
          </p>
        </div>

        {portfolioProjects && portfolioProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {portfolioProjects.map((project, index) => {
              const videoUrl = project.videoUrl || project.youtubeUrl || '';
              const detected = detectVideoPlatform(videoUrl);
              const hasExternal = Boolean(project.externalUrl && project.externalUrl.trim().length > 0);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-[#00d9fe] hover:shadow-[0_12px_35px_rgba(0,217,254,0.18)] hover:-translate-y-1.5 transition-all duration-300 group shadow-xs"
                >
                  {/* Media / Video Banner */}
                  <div className="relative aspect-video bg-slate-900 overflow-hidden flex items-center justify-center border-b border-slate-100">
                    {detected.thumbnailUrl ? (
                      <img
                        src={detected.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300 space-y-2 bg-gradient-to-br from-slate-900 to-slate-800">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#00d9fe]">
                          {renderPlatformIcon(detected.platform)}
                        </div>
                        <span className="text-xs font-semibold text-slate-300">
                          {detected.badgeLabel}
                        </span>
                      </div>
                    )}

                    {/* Clickable Play overlay */}
                    {videoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          if (detected.embedUrl) {
                            setActiveVideoModal({
                              url: videoUrl,
                              title: project.title,
                              embedUrl: detected.embedUrl,
                            });
                          } else {
                            window.open(videoUrl, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/15 transition-colors cursor-pointer"
                        title={detected.watchLabel}
                      >
                        <div className="w-13 h-13 rounded-full bg-[#00d9fe] hover:bg-[#38e1fe] text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />
                        </div>
                      </button>
                    )}

                    {/* Platform Tag */}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-xl text-[11px] font-bold text-white flex items-center gap-1.5 border border-slate-700/80">
                      {renderPlatformIcon(detected.platform)}
                      <span>{detected.platformName}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      {/* Service Type Badge */}
                      {project.serviceType && (
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                            <Briefcase className="w-3 h-3 text-cyan-600" />
                            <span>{project.serviceType}</span>
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                      {videoUrl ? (
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-cyan-600 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 text-cyan-600" />
                          <span>{detected.watchLabel}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">عرض المشروع</span>
                      )}

                      {hasExternal && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#00d9fe] text-xs font-bold text-slate-700 hover:text-slate-950 transition-all"
                        >
                          <span>رابط خارجي</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
            لم تتم إضافة مشاريع إلى معرض الأعمال بعد.
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. SOCIAL ACCOUNTS SECTION (#socials)                                     */}
      {/* ========================================================================= */}
      <section
        id="socials"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200/80 scroll-mt-20"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200 text-cyan-700 text-xs font-bold shadow-xs">
            <Share2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>التواجد الرقمي المعتمد</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            حساباتي
          </h2>
          <div className="w-14 h-1 bg-[#00d9fe] rounded-full mx-auto" />
          <p className="text-slate-600 text-base sm:text-lg">
            تابع كافة أعمالي ونشاطاتي عبر منصات التواصل الاجتماعي الرسمية.
          </p>

          {/* Unified Username Capsule with Clean Icon-Only Copy Button */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs hover:border-[#00d9fe] transition-all">
              <div className="w-2 h-2 rounded-full bg-[#00d9fe] shadow-[0_0_8px_#00d9fe]" />
              <span className="font-mono text-sm sm:text-base font-bold text-slate-900 dir-ltr">
                @{username.replace(/^@/, '')}
              </span>
              <button
                type="button"
                onClick={handleCopyUsername}
                title="نسخ اسم المستخدم"
                aria-label="نسخ اسم المستخدم"
                className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {copiedUser ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Rendering:
            Supports ONLY WhatsApp, Instagram, YouTube, TikTok, X, Threads, Kick, LinkedIn.
            If URL is empty, card is completely hidden. */}
        {visibleSocialPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleSocialPlatforms.map((platform, idx) => {
              const Icon = platform.icon;

              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                  className={`bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs ${platform.accentBorder} hover:shadow-[0_10px_30px_rgba(0,217,254,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center justify-between group`}
                >
                  <div className="flex flex-col items-center w-full space-y-4">
                    {/* Platform Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${platform.iconBg} border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xs`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Platform Titles */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {platform.name}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 block tracking-wider font-mono">
                        {platform.englishName}
                      </span>
                    </div>

                    {/* Unified Handle Badge */}
                    <span className="inline-block text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 dir-ltr font-mono">
                      @{username.replace(/^@/, '')}
                    </span>
                  </div>

                  {/* Visit Link Button */}
                  <div className="w-full mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-[#00d9fe] text-white hover:text-slate-950 font-black text-sm rounded-xl shadow-xs active:scale-[0.98] transition-all duration-300 cursor-pointer group/btn"
                    >
                      <span>زيارة الحساب</span>
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover/btn:text-slate-950 transition-colors" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
            لم تتم إضافة أي روابط حسابات حتى الآن.
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. ABOUT & CONTACT SECTION (#about)                                       */}
      {/* ========================================================================= */}
      <section
        id="about"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200 text-cyan-700 text-xs font-bold shadow-xs">
            <User className="w-3.5 h-3.5 text-cyan-600" />
            <span>الهوية، الرؤية والتواصل المباشر</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            عني أكثر وتواصل معي
          </h2>
          <div className="w-14 h-1 bg-[#00d9fe] rounded-full mx-auto" />
          <p className="text-slate-600 text-base sm:text-lg">
            أفكار تحرك العالم، وتواصل مباشر لبدء مشاريع رقمية وإبداعية استثنائية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* About Me Story Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xs">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  من هو {displayName}؟
                </h3>
                <p className="text-sm font-mono text-cyan-700 font-bold dir-ltr text-right">
                  @{username.replace(/^@/, '')} • Motion & Tech Creator
                </p>
              </div>

              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {bio}
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span>فلسفة &quot;الحركة هي عالمي&quot;:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  الحركة ليست مجرد انتقال من نقطة لأخرى، بل هي الإيقاع الذي يحرك القصة في الفيديو، والسرعة التي تحل خوارزميات التحدي، والتفاعل الإنساني الحي الذي يجعل التجارب الرقمية تنبض بالحياة.
                </p>
              </div>

              {/* Interests Pill Cloud */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 block">مجالات الشغف والاهتمام:</span>
                <div className="flex flex-wrap gap-2">
                  {(data.interests && data.interests.length > 0
                    ? data.interests
                    : [
                        { id: '1', title: 'مونتاج الفيديوهات السينمائية' },
                        { id: '2', title: 'مكعب الروبيك السريع' },
                        { id: '3', title: 'Vibe Coding' },
                        { id: '4', title: 'الذكاء الاصطناعي' },
                        { id: '5', title: 'تصميم الهوية البصرية' },
                        { id: '6', title: 'الأنيميشن والتحريك' },
                      ]
                  ).map((item) => (
                    <span
                      key={item.id}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 hover:border-[#00d9fe] hover:bg-cyan-50 hover:text-cyan-900 transition-colors"
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Direct Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* WhatsApp Direct Card */}
            {data.global_settings.whatsapp && (
              <div className="bg-white rounded-3xl border border-slate-200 p-7 hover:border-emerald-500 hover:shadow-[0_8px_30px_rgba(37,211,102,0.15)] transition-all space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900">محادثة مباشرة عبر واتساب</h4>
                    <span className="text-xs text-slate-500">رد سريع لمناقشة المشاريع والأعمال</span>
                  </div>
                </div>

                <a
                  href={generateWhatsAppUrl(
                    data.global_settings.whatsapp,
                    `مرحباً ${displayName}، أود التواصل معك لمناقشة مشروع جديد`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>بدء محادثة واتساب فورية</span>
                </a>
              </div>
            )}

            {/* Email Card */}
            {data.global_settings.email && (
              <div className="bg-white rounded-3xl border border-slate-200 p-7 hover:border-[#00d9fe] hover:shadow-[0_8px_30px_rgba(0,217,254,0.15)] transition-all space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-lg font-black text-slate-900">البريد الإلكتروني</h4>
                    <span className="text-xs text-slate-500 font-mono block truncate dir-ltr text-right">
                      {data.global_settings.email}
                    </span>
                  </div>
                </div>

                <a
                  href={`mailto:${data.global_settings.email}?subject=تواصل بخصوص مشروع مع ${displayName}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-slate-900 hover:bg-[#00d9fe] text-white hover:text-slate-950 font-black text-sm transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>إرسال بريد إلكتروني</span>
                </a>
              </div>
            )}

            {/* Quick Copy Info Box */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs text-slate-500 block font-bold">اسم المستخدم الموحد:</span>
                <span className="font-mono text-sm font-black text-slate-900 dir-ltr inline-block">
                  @{username.replace(/^@/, '')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyUsername}
                title="نسخ اسم المستخدم"
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#00d9fe] text-slate-700 hover:text-slate-950 transition-colors cursor-pointer inline-flex items-center justify-center"
              >
                {copiedUser ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Video Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full border border-slate-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-black text-base text-slate-900 truncate">{activeVideoModal.title}</h3>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video bg-black">
                {activeVideoModal.embedUrl && (
                  <iframe
                    src={activeVideoModal.embedUrl}
                    title={activeVideoModal.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
