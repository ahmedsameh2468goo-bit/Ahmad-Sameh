import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  Youtube,
  Video,
  Twitter,
  AtSign,
  Tv,
  Linkedin,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { generateWhatsAppUrl } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const SocialsPage: React.FC = () => {
  const { data } = useData();
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const displayName = data.global_settings.displayName || 'أحمد سامح';
  const username = data.global_settings.username || 'aahmd_saiimd';
  const tagline = data.global_settings.tagline || 'اليوزر النيم الموحد في كل منصات الكوكب';
  const socials = data.social_links;

  const handleCopyUsername = () => {
    const handle = `@${username.replace(/^@/, '')}`;
    navigator.clipboard.writeText(handle);
    setCopied(true);
    toast.success(`تم نسخ اليوزر الموحد: ${handle}`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to format whatsapp link if provided as number
  const getWhatsAppLink = (val?: string) => {
    if (!val || !val.trim()) return '';
    const clean = val.trim();
    if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
    return generateWhatsAppUrl(clean, `مرحباً ${displayName}، أود التواصل معك`);
  };

  // The 8 strictly supported platforms
  const allPlatforms = [
    {
      id: 'whatsapp',
      name: 'واتساب',
      englishName: 'WhatsApp',
      handle: username ? `@${username.replace(/^@/, '')}` : 'محادثة مباشرة',
      url: getWhatsAppLink(socials.whatsapp),
      icon: MessageCircle,
      accentColor: '#25D366',
      badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      id: 'instagram',
      name: 'إنستغرام',
      englishName: 'Instagram',
      handle: username ? `@${username.replace(/^@/, '')}` : '',
      url: socials.instagram || '',
      icon: Instagram,
      accentColor: '#E1306C',
      badgeBg: 'bg-pink-50 text-pink-600 border-pink-200',
    },
    {
      id: 'youtube',
      name: 'يوتيوب',
      englishName: 'YouTube',
      handle: username ? `@${username.replace(/^@/, '')}` : '',
      url: socials.youtube || '',
      icon: Youtube,
      accentColor: '#FF0000',
      badgeBg: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      id: 'tiktok',
      name: 'تيك توك',
      englishName: 'TikTok',
      handle: username ? `@${username.replace(/^@/, '')}` : '',
      url: socials.tiktok || '',
      icon: Video,
      accentColor: '#00d9fe',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      id: 'x',
      name: 'إكس',
      englishName: 'X',
      handle: username ? `@${username.replace(/^@/, '')}` : '',
      url: socials.x || socials.twitter || '',
      icon: Twitter,
      accentColor: '#0F172A',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    {
      id: 'threads',
      name: 'ثريدز',
      englishName: 'Threads',
      handle: username ? `@${username.replace(/^@/, '')}` : '',
      url: socials.threads || '',
      icon: AtSign,
      accentColor: '#111827',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    {
      id: 'kick',
      name: 'كيك',
      englishName: 'Kick',
      handle: username ? `@${username.replace(/^@/, '')}` : '',
      url: socials.kick || '',
      icon: Tv,
      accentColor: '#53FC18',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    },
    {
      id: 'linkedin',
      name: 'لينكد إن',
      englishName: 'LinkedIn',
      handle: username ? `@${username.replace(/^@/, '')}` : '',
      url: socials.linkedin || '',
      icon: Linkedin,
      accentColor: '#0A66C2',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  ];

  // Conditional Rendering Logic:
  // If an admin leaves a platform's URL empty/blank in the database, that platform card MUST NOT appear at all on the public site
  const visiblePlatforms = allPlatforms.filter(
    (platform) => platform.url && platform.url.trim().length > 0
  );

  return (
    <div
      id="socials-page-container"
      className="min-h-screen bg-[#f6f6e9] text-slate-900 py-10 md:py-16 max-w-6xl mx-auto px-4 space-y-12 selection:bg-[#00d9fe] selection:text-slate-900"
      dir="rtl"
    >
      {/* 1. HEADER & BRANDING SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00d9fe]/50 shadow-[0_2px_12px_rgba(0,217,254,0.18)]">
          <Sparkles className="w-4 h-4 text-[#00d9fe]" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">التواجد الرقمي الموحد</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          حساباتي الرسمية
        </h1>

        <div className="w-14 h-1.5 bg-gradient-to-r from-[#00d9fe] via-blue-500 to-[#00d9fe] rounded-full mx-auto" />

        {/* Unified Username & Tagline Banner */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleCopyUsername}
            title="اضغط لنسخ اليوزر الموحد"
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#00d9fe]/60 shadow-[0_2px_14px_rgba(0,217,254,0.2)] hover:shadow-[0_4px_22px_rgba(0,217,254,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-[#00d9fe] shadow-[0_0_8px_#00d9fe]" />
            <span className="font-mono text-sm sm:text-base font-bold text-slate-900 tracking-wider dir-ltr">
              @{username.replace(/^@/, '')}
            </span>
            <div className="p-1 rounded-full text-slate-400 group-hover:text-[#00d9fe] transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </div>
          </button>

          {tagline && tagline.trim() !== '' && (
            <p className="text-sm font-semibold text-slate-600 bg-white/70 px-4 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              {tagline}
            </p>
          )}
        </div>
      </div>

      {/* 2. DYNAMIC SOCIAL MEDIA CARDS */}
      {visiblePlatforms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visiblePlatforms.map((platform, idx) => {
            const Icon = platform.icon;

            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.35 }}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#00d9fe]/60 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center justify-between group"
              >
                <div className="flex flex-col items-center w-full space-y-4">
                  {/* Icon Box with Electric Cyan & Platform Hover Glow */}
                  <div className="relative w-16 h-16 rounded-2xl bg-cyan-50/70 border border-[#00d9fe]/30 flex items-center justify-center text-slate-800 group-hover:scale-110 group-hover:bg-[#00d9fe] group-hover:text-slate-950 group-hover:shadow-[0_0_25px_rgba(0,217,254,0.5)] transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Platform Titles */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {platform.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-400 block tracking-wider font-mono">
                      {platform.englishName}
                    </span>
                  </div>

                  {/* Username badge inside card */}
                  {platform.handle && (
                    <span className="inline-block text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200/70 dir-ltr font-mono">
                      {platform.handle}
                    </span>
                  )}
                </div>

                {/* Visit Account Button */}
                <div className="w-full mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-[#00d9fe] text-white hover:text-slate-950 font-bold text-sm rounded-xl shadow-xs hover:shadow-[0_4px_20px_rgba(0,217,254,0.4)] active:scale-[0.98] transition-all duration-300 cursor-pointer group/btn"
                  >
                    <span>زيارة الحساب</span>
                    <ExternalLink className="w-4 h-4 text-[#00d9fe] group-hover/btn:text-slate-950 transition-colors" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyFallback message="لم تتم إضافة أي روابط حسابات حتى الآن" />
      )}
    </div>
  );
};



