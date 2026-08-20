import React from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  Youtube,
  Globe,
  ExternalLink,
  Video
} from 'lucide-react';
import { useData } from '../context/DataContext';

// Vector Icon for X Platform
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const SocialsPage: React.FC = () => {
  const { data } = useData();
  const socials = data.social_links;

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'إنستغرام',
      url: socials.instagram,
      icon: Instagram,
    },
    {
      id: 'tiktok',
      name: 'تيك توك',
      url: socials.tiktok,
      icon: Video,
    },
    {
      id: 'youtube',
      name: 'يوتيوب',
      url: socials.youtube,
      icon: Youtube,
    },
    {
      id: 'blogger',
      name: 'بلوجر',
      url: socials.blogger,
      icon: Globe,
    },
    {
      id: 'x',
      name: 'إكس',
      url: socials.x || socials.twitter || '',
      icon: XIcon,
    },
  ];

  // If X link is empty, hide the X card automatically as requested
  const visiblePlatforms = socialPlatforms.filter(
    (platform) => platform.id !== 'x' || (platform.url && platform.url.trim() !== '')
  );

  return (
    <div
      id="socials-page-container"
      className="min-h-screen bg-white text-slate-900 py-12 md:py-16 max-w-6xl mx-auto px-4 space-y-14"
      dir="rtl"
    >
      {/* 1. HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          حساباتي
        </h1>
        {/* Accent Yellow Line #F59E0B */}
        <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto" />
        <p className="text-base sm:text-lg text-[#64748B] font-medium pt-1">
          تابع رحلتي على المنصات المختلفة.
        </p>
      </div>

      {/* 2. SOCIAL MEDIA CARDS (Centered Cards Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {visiblePlatforms.map((platform, idx) => {
          const Icon = platform.icon;
          const hasValidLink = Boolean(platform.url && platform.url.trim() !== '');

          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-blue-100 transition-all flex flex-col items-center text-center justify-between group"
            >
              <div className="flex flex-col items-center w-full space-y-4">
                {/* Light Blue Icon Box #EFF6FF with High Radius rounded-2xl & #2563EB Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Platform Name: Bold #0F172A centered */}
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {platform.name}
                </h3>
              </div>

              {/* Action Button: #2563EB with rounded-xl, ExternalLink icon, white text "زيارة الحساب" */}
              <div className="w-full mt-6 pt-4 border-t border-slate-50">
                {hasValidLink ? (
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>زيارة الحساب</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 text-slate-400 font-bold text-sm rounded-xl cursor-not-allowed"
                  >
                    <span>غير متوفر حالياً</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


