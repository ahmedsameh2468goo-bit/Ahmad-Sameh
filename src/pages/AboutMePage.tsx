import React from 'react';
import { motion } from 'motion/react';
import { Inbox, ExternalLink, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AboutMePage: React.FC = () => {
  const { data } = useData();
  const aboutProjects = data.about_projects;

  // Default interests fallback if none in database
  const defaultInterests = [
    'تطوير الويب',
    'صناعة المحتوى',
    'المونتاج والفيديو',
    'الذكاء الاصطناعي',
    'تصميم الهويات',
    'الأنيميشن',
  ];

  const interestsList =
    data.interests && data.interests.length > 0
      ? data.interests.map((i) => i.title)
      : defaultInterests;

  return (
    <div
      id="about-page-container"
      className="min-h-screen bg-white text-slate-900 py-12 md:py-16 max-w-4xl mx-auto px-4 space-y-20"
      dir="rtl"
    >
      {/* 1. PAGE HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          عني أكثر
        </h1>
        {/* Accent Yellow Short Line #F59E0B */}
        <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto" />
        <p className="text-base sm:text-lg text-[#64748B] font-medium pt-1">
          مشاريع أعمل عليها وأفخر بها
        </p>
      </div>

      {/* 2. PROJECTS SECTION / EMPTY STATE BOX */}
      <section id="about-projects-section" className="w-full">
        {aboutProjects && aboutProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                {proj.link && (
                  <div className="mt-6 pt-3 border-t border-slate-100">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-blue-800 transition-colors"
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
          /* Empty State Box */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center p-12 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-3"
          >
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#94A3B8]">
              <Inbox className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-[#94A3B8]">
              لا يوجد حالياً
            </p>
          </motion.div>
        )}
      </section>

      {/* 3. INTERESTS SECTION ("مهتم بـ") */}
      <section id="about-interests-section" className="text-center space-y-8 pt-6">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            مهتم بـ
          </h2>
          {/* Accent Yellow Short Line #F59E0B */}
          <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto" />
        </div>

        {/* Centered Cloud / Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-2xl mx-auto">
          {interestsList.map((interestName, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="inline-flex items-center px-6 py-2.5 bg-[#FEF3C7] text-[#78350F] font-bold text-sm sm:text-base rounded-full border border-amber-200/50 shadow-2xs hover:bg-amber-100 transition-colors"
            >
              {interestName}
            </motion.span>
          ))}
        </div>
      </section>
    </div>
  );
};

