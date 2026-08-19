import React from 'react';
import { motion } from 'motion/react';
import { Layers, Sparkles, MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { generateWhatsAppUrl } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const ServicesPage: React.FC = () => {
  const { data } = useData();

  const visibleServices = data.services.filter((s) => s.isVisible);
  const topics = data.topics_of_interest;

  return (
    <div id="services-page-container" className="space-y-16 py-6 md:py-10 max-w-6xl mx-auto px-4" dir="rtl">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>خدماتي ومجالات تخصصي</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          الخدمات الاحترافية
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          حلول تقنية وإبداعية مصممة بعناية لمساعدتك في بناء وتطوير أفكارك ومشروعاتك بأعلى معايير الجودة والسرعة.
        </p>
      </div>

      {/* Services Grid */}
      <section id="services-list-section" className="space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <span>قائمة الخدمات المتاحة</span>
        </h2>

        {visibleServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      خدمة #{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>تسليم متميز ودعم مستمر</span>
                  </span>

                  <a
                    href={generateWhatsAppUrl(
                      data.global_settings.whatsapp,
                      `مرحباً أحمد، أود الاستفسار وطلب خدمة: ${service.title}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                  >
                    <span>طلب الخدمة</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyFallback message="لا يوجد حالياً" />
        )}
      </section>

      {/* Topics of Interest Section ("موضوعات مهتم بها حالياً") */}
      <section id="topics-section" className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">
              موضوعات مهتم بها حالياً
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              مجالات استكشافية وتقنيات أعمل على التعمق فيها وتطبيقها
            </p>
          </div>
        </div>

        {topics && topics.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {topics.map((topic, idx) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs rounded-xl text-sm font-bold text-slate-800 transition-all hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{topic.title}</span>
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
