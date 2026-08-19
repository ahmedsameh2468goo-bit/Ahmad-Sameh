import React from 'react';
import { motion } from 'motion/react';
import { Film, Play, ExternalLink, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { validateYouTubeUrl } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const PortfolioPage: React.FC = () => {
  const { data } = useData();
  const portfolioProjects = data.portfolio;

  return (
    <div id="portfolio-page-container" className="space-y-16 py-6 md:py-10 max-w-6xl mx-auto px-4" dir="rtl">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          معرض الأعمال
        </h1>
        {/* Accent Yellow Short Line #F59E0B */}
        <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto" />
        <p className="text-base sm:text-lg text-[#64748B] font-medium pt-1">
          الأعمال تتحدث بصوت أعلى من الكلمات.
        </p>
      </div>

      {/* Projects Grid */}
      <section id="portfolio-grid-section">
        {portfolioProjects && portfolioProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => {
              const ytValidation = validateYouTubeUrl(project.youtubeUrl);
              const ytThumbnail = ytValidation.videoId
                ? `https://img.youtube.com/vi/${ytValidation.videoId}/hqdefault.jpg`
                : null;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between group"
                >
                  {/* YouTube Thumbnail Preview */}
                  <div className="relative aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
                    {ytThumbnail ? (
                      <img
                        src={ytThumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                        <Film className="w-12 h-12 text-slate-600" />
                      </div>
                    )}

                    {/* Overlay Play icon */}
                    <a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors"
                      title="مشاهدة على يوتيوب"
                    >
                      <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-600 transition-all">
                        <Play className="w-6 h-6 fill-white translate-x-0.5" />
                      </div>
                    </a>

                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[11px] font-bold text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>يوتيوب</span>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* YouTube CTA button */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <a
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-600 font-bold text-sm rounded-xl transition-all shadow-2xs"
                      >
                        <Play className="w-4 h-4 text-rose-600 fill-rose-600" />
                        <span>مشاهدة المشروع على يوتيوب</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <EmptyFallback message="لا يوجد حالياً" />
        )}
      </section>
    </div>
  );
};
