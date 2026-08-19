import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Mail,
  Video,
  Code,
  Palette,
  Bot,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { generateWhatsAppUrl } from '../utils/validators';
import { EmptyFallback } from '../components/EmptyFallback';

export const ServicesPage: React.FC = () => {
  const { data } = useData();
  const displayName = data.global_settings.displayName || 'أحمد سامح';

  const visibleServices = data.services.filter((s) => s.isVisible);
  
  // Default list of topics if database list is empty
  const defaultTopicNames = [
    'الذكاء الاصطناعي',
    'Vibe Coding',
    'الأنيميشن',
    'التحريك',
    'مكعب الروبيك'
  ];

  const topicsList =
    data.topics_of_interest && data.topics_of_interest.length > 0
      ? data.topics_of_interest.map((t) => t.title)
      : defaultTopicNames;

  // Icon assignment based on service title
  const getServiceIcon = (title: string, index: number) => {
    const t = title.toLowerCase();
    if (t.includes('مونتاج') || t.includes('فيديو') || t.includes('video')) return Video;
    if (t.includes('ويب') || t.includes('تطوير') || t.includes('برمج') || t.includes('web') || t.includes('code')) return Code;
    if (t.includes('هوية') || t.includes('جرافيك') || t.includes('تصميم') || t.includes('design')) return Palette;
    if (t.includes('ذكاء') || t.includes('ai') || t.includes('vibe')) return Bot;
    const fallbackIcons = [Layers, Video, Code, Palette, Bot, Sparkles];
    return fallbackIcons[index % fallbackIcons.length];
  };

  return (
    <div
      id="services-page-container"
      className="min-h-screen bg-white text-slate-900 py-12 md:py-16 max-w-6xl mx-auto px-4 space-y-20"
      dir="rtl"
    >
      {/* 1. SERVICES HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          الخدمات
        </h1>
        {/* Accent Yellow Short Line #F59E0B */}
        <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto" />
        <p className="text-base sm:text-lg text-[#64748B] font-medium pt-1">
          كل ما أقدمه من خدمات بجودة واحترافية
        </p>
      </div>

      {/* 2. SERVICES CARDS LAYOUT */}
      <section id="services-list-section">
        {visibleServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleServices.map((service, index) => {
              const IconComponent = getServiceIcon(service.title, index);
              const contactUrl = data.global_settings.whatsapp
                ? generateWhatsAppUrl(
                    data.global_settings.whatsapp,
                    `مرحباً ${displayName}، أود الاستفسار وطلب خدمة: ${service.title}`
                  )
                : data.global_settings.email
                ? `mailto:${data.global_settings.email}?subject=${encodeURIComponent(
                    `طلب خدمة: ${service.title}`
                  )}`
                : '#';

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Light Blue Icon Box #EFF6FF with #2563EB Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Service Title #0F172A */}
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2 leading-snug">
                      {service.title}
                    </h3>

                    {/* Service Description #64748B */}
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA Button: #2563EB with envelope icon and white text "تواصل الآن" */}
                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <a
                      href={contactUrl}
                      target={data.global_settings.whatsapp ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-white" />
                      <span>تواصل الآن</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <EmptyFallback message="لا توجد خدمات متاحة حالياً" />
        )}
      </section>

      {/* 3. TOPICS / INTERESTS SECTION */}
      <section id="topics-section" className="text-center space-y-8 pt-8">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            موضوعات مهتم بها حالياً
          </h2>
          {/* Accent Yellow Short Line #F59E0B */}
          <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto" />
        </div>

        {/* Pill Tags: rounded-full, bg #E0F2FE, text #1D4ED8 */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {topicsList.map((topicName, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="inline-flex items-center px-5 py-2.5 bg-[#E0F2FE] text-[#1D4ED8] font-bold text-sm sm:text-base rounded-full shadow-2xs hover:bg-blue-100 transition-colors"
            >
              {topicName}
            </motion.span>
          ))}
        </div>
      </section>
    </div>
  );
};

