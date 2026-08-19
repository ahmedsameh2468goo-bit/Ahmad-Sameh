import React from 'react';
import { motion } from 'motion/react';
import { User, Sparkles, FolderGit2, Compass, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EmptyFallback } from '../components/EmptyFallback';

export const AboutMePage: React.FC = () => {
  const { data } = useData();
  const aboutProjects = data.about_projects;
  const interests = data.interests;

  return (
    <div id="about-page-container" className="space-y-16 py-6 md:py-10 max-w-5xl mx-auto px-4" dir="rtl">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold">
          <User className="w-3.5 h-3.5" />
          <span>عني وعن شغفي</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          عني أكثر
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          تعرف أكثر على اهتماماتي المتنوعة ومسيرتي في عالم التكنولوجيا والإبداع وصناعة المحتوى.
        </p>
      </div>

      {/* 1. PROJECTS SECTION */}
      <section id="about-projects-section" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              المشاريع والمسيرة
            </h2>
            <p className="text-xs text-slate-500">
              مشاريع إضافية وتجارب مبنية ومطورة
            </p>
          </div>
        </div>

        {aboutProjects && aboutProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                {proj.link && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      <span>رابط المشروع</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyFallback message="لا يوجد حالياً" />
        )}
      </section>

      {/* 2. INTERESTS SECTION ("مهتم بـ") */}
      <section id="about-interests-section" className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              مهتم بـ
            </h2>
            <p className="text-xs text-slate-500">
              مجموعة متنوعة من المجالات والاهتمامات الشخصية والمهنية
            </p>
          </div>
        </div>

        {interests && interests.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {interests.map((interest, idx) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all hover:scale-[1.02] group"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-amber-500 transition-colors shrink-0" />
                <span className="text-sm font-bold text-slate-800 leading-tight">
                  {interest.title}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyFallback message="لا يوجد حالياً" compact />
        )}
      </section>
    </div>
  );
};
