import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Mail,
  ArrowLeft,
  ArrowUpRight,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Film
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { generateWhatsAppUrl } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const HomePage: React.FC = () => {
  const { data } = useData();
  const displayName = data.global_settings.displayName || 'أحمد سامح';

  const activeServices = data.services.filter((s) => s.isVisible);

  return (
    <div id="home-page-container" className="space-y-24 py-6 md:py-12" dir="rtl">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative">
        {/* Background ambient glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-blue-100/50 via-sky-50/50 to-amber-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          {/* Avatar Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative mb-8"
          >
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-1.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-400 shadow-xl shadow-blue-500/15">
              <div className="w-full h-full rounded-[22px] bg-white overflow-hidden flex items-center justify-center border-2 border-white">
                {data.global_settings.heroImage ? (
                  <img
                    src={data.global_settings.heroImage}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4">
                    <span className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">
                      {displayName.slice(0, 2)}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold mt-1">
                      {displayName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Status pill badge */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 bg-white border border-slate-200/80 rounded-full text-xs font-bold text-slate-700 shadow-md whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
              <span className="mr-2">متاح للعمل والمشاريع الجديدة</span>
            </motion.div>
          </motion.div>

          {/* Name Heading */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4"
          >
            {displayName}
          </motion.h1>

          {/* Dynamic Bio */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="max-w-2xl text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8"
          >
            {data.global_settings.bio && data.global_settings.bio.trim() !== '' ? (
              <p>{data.global_settings.bio}</p>
            ) : (
              <EmptyFallback message="لا يوجد حالياً" compact />
            )}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
          >
            {data.global_settings.whatsapp && (
              <a
                href={generateWhatsAppUrl(
                  data.global_settings.whatsapp,
                  `مرحباً ${displayName}، أود بدء محادثة معك بخصوص مشروع`
                )}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>تواصل عبر واتساب</span>
              </a>
            )}

            <Link
              to="/portfolio"
              id="hero-portfolio-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-base font-bold rounded-2xl border border-slate-200 shadow-xs hover:border-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Film className="w-5 h-5 text-blue-600" />
              <span>استكشف أعمالي</span>
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. SHORT SERVICES SECTION */}
      <section id="home-services-section" className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              ما أقدمه
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              الخدمات الرئيسية
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span>عرض كل الخدمات والموضوعات</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {activeServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={generateWhatsAppUrl(
                      data.global_settings.whatsapp,
                      `مرحباً ${displayName}، أود الاستفسار عن خدمة: ${service.title}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
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

      {/* 3. CONTACT SECTION */}
      <section
        id="home-contact-section"
        className="max-w-4xl mx-auto px-4"
      >
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-blue-600/20 text-center relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-4 text-amber-300">
            <Zap className="w-3.5 h-3.5" />
            <span>جاهز للتعاون الفوري</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight">
            هل لديك فكرة أو مشروع ترغب في تنفيذه؟
          </h2>

          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            يمكنك مراسلتي مباشرة عبر واتساب أو البريد الإلكتروني لمناقشة التفاصيل والبدء فوراً.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {data.global_settings.whatsapp ? (
              <a
                href={generateWhatsAppUrl(
                  data.global_settings.whatsapp,
                  `مرحباً ${displayName}، أود التحدث معك حول مشروع جديد`
                )}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-section-whatsapp-cta"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>محادثة واتساب مباشرة</span>
              </a>
            ) : (
              <div className="text-white/80 text-sm">لا يوجد حالياً</div>
            )}

            {data.global_settings.email ? (
              <a
                href={`mailto:${data.global_settings.email}`}
                id="contact-section-email-cta"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-800/80 hover:bg-blue-800 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
              >
                <Mail className="w-5 h-5 text-amber-300" />
                <span>إرسال بريد إلكتروني</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};
