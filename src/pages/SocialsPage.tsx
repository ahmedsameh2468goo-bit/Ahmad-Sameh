import React from 'react';
import { motion } from 'motion/react';
import {
  Share2,
  Instagram,
  Youtube,
  Globe,
  ArrowUpRight,
  Sparkles,
  Video
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const SocialsPage: React.FC = () => {
  const { data } = useData();
  const socials = data.social_links;

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      arabicName: 'إنستغرام',
      desc: 'كواليس الأعمال والتصاميم اليومية والصور الحصرية.',
      url: socials.instagram,
      icon: Instagram,
      color: 'from-pink-500 to-rose-600',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      hoverBorder: 'hover:border-pink-300',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      arabicName: 'تيك توك',
      desc: 'مقاطع فيديو قصيرة وتجارب سريعة وأفكار إبداعية.',
      url: socials.tiktok,
      icon: Video,
      color: 'from-slate-900 to-slate-800',
      textColor: 'text-slate-900',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      hoverBorder: 'hover:border-slate-400',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      arabicName: 'يوتيوب',
      desc: 'فيديوهات طويلة وشروحات تقنية وأعمال المونتاج الكاملة.',
      url: socials.youtube,
      icon: Youtube,
      color: 'from-rose-600 to-red-700',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      hoverBorder: 'hover:border-rose-300',
    },
    {
      id: 'blogger',
      name: 'Blogger',
      arabicName: 'بلوجر / المدونة',
      desc: 'مقالات وأفكار وتدوينات في التقنية والتطوير والحياة.',
      url: socials.blogger,
      icon: Globe,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverBorder: 'hover:border-amber-300',
    },
  ];

  return (
    <div id="socials-page-container" className="space-y-16 py-6 md:py-10 max-w-5xl mx-auto px-4" dir="rtl">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-bold">
          <Share2 className="w-3.5 h-3.5" />
          <span>التواصل الاجتماعي</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          حساباتي على المنصات
        </h1>
        <p className="text-slate-600 text-lg sm:text-xl font-bold text-blue-600">
          تابع رحلتي على المنصات المختلفة.
        </p>
      </div>

      {/* Social Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform, idx) => {
          const Icon = platform.icon;
          const hasValidLink = Boolean(platform.url && platform.url.trim() !== '');

          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`p-7 bg-white rounded-3xl border ${platform.borderColor} ${platform.hoverBorder} shadow-xs hover:shadow-lg transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${platform.bgColor} ${platform.textColor} flex items-center justify-center shadow-xs`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {platform.name}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {platform.arabicName}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {platform.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                {hasValidLink ? (
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-800 hover:text-blue-600 font-bold text-sm rounded-xl transition-all shadow-2xs"
                  >
                    <span>زيارة الحساب على {platform.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="py-2.5 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs font-semibold text-slate-400">
                    لا يوجد حالياً
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
