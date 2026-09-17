import React from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Youtube,
  Instagram,
  Video,
  ExternalLink,
  Globe,
  Sparkles,
  Briefcase,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { detectVideoPlatform, VideoPlatformType } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const PortfolioPage: React.FC = () => {
  const { data } = useData();
  const portfolioProjects = data.portfolio;

  const renderPlatformIcon = (platform: VideoPlatformType) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-rose-600" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'tiktok':
        return <Video className="w-4 h-4 text-slate-800" />;
      default:
        return <Play className="w-4 h-4 text-blue-600 fill-blue-600" />;
    }
  };

  return (
    <div
      id="portfolio-page-container"
      className="min-h-screen bg-slate-50 text-slate-900 space-y-16 py-8 md:py-14 max-w-6xl mx-auto px-4 selection:bg-[#00d9fe] selection:text-slate-950"
      dir="rtl"
    >
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          معرض الأعمال
        </h1>
        {/* Accent Electric Cyan Short Line */}
        <div className="w-12 h-1 bg-[#00d9fe] rounded-full mx-auto" />
        <p className="text-base sm:text-lg text-slate-600 font-medium pt-1">
          الأعمال تتحدث بصوت أعلى من الكلمات.
        </p>
      </div>

      {/* Projects Grid */}
      <section id="portfolio-grid-section">
        {portfolioProjects && portfolioProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => {
              const videoUrl = project.videoUrl || project.youtubeUrl || '';
              const detected = detectVideoPlatform(videoUrl);
              const hasExternalLink = Boolean(
                project.externalUrl && project.externalUrl.trim().length > 0
              );

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  {/* Media / Video Preview Banner */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 overflow-hidden flex items-center justify-center">
                    {detected.thumbnailUrl ? (
                      <img
                        src={detected.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300 space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-inner">
                          {renderPlatformIcon(detected.platform)}
                        </div>
                        <span className="text-xs font-semibold text-slate-300">
                          {detected.badgeLabel}
                        </span>
                      </div>
                    )}

                    {/* Overlay Clickable Play button */}
                    {videoUrl && (
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/15 transition-colors"
                        title={detected.watchLabel}
                      >
                        <div className="w-14 h-14 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/30 group-hover:scale-110 transition-all">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                      </a>
                    )}

                    {/* Platform Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/65 backdrop-blur-md rounded-lg text-[11px] font-bold text-white flex items-center gap-1.5 shadow-xs">
                      {detected.platform === 'youtube' ? (
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      ) : (
                        renderPlatformIcon(detected.platform)
                      )}
                      <span>{detected.platformName}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      {/* 1. Service Type (نوع الخدمة) */}
                      {project.serviceType && (
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
                            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                            <span>{project.serviceType}</span>
                          </span>
                        </div>
                      )}

                      {/* 2. Project Title (عنوان المشروع) */}
                      <h3 className="text-xl font-black text-[#0F172A] leading-snug group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>

                      {/* 3. Project Description (نص توضيحي للمشروع) */}
                      <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>

                    {/* 4. Action Buttons (رابط الفيديو + رابط الموقع/الرابط الخارجي الاختياري) */}
                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      {/* Media/Video Link Button */}
                      {videoUrl && (
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-blue-700 font-bold text-sm rounded-xl transition-all shadow-2xs group/btn"
                        >
                          {renderPlatformIcon(detected.platform)}
                          <span>{detected.watchLabel}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                        </a>
                      )}

                      {/* Optional External Project Link Button */}
                      {hasExternalLink && (
                        <a
                          href={project.externalUrl!.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-blue-600 font-bold text-sm rounded-xl transition-all shadow-2xs group/ext"
                        >
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span>زيارة موقع المشروع</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/ext:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <EmptyFallback message="لا يوجد أعمال مضافة حالياً" />
        )}
      </section>
    </div>
  );
};
