import React, { useState } from 'react';
import {
  Share2,
  Save,
  Instagram,
  Youtube,
  Video,
  Twitter,
  AtSign,
  Tv,
  Linkedin,
  MessageCircle,
  Info,
} from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';

export const SocialsTab: React.FC = () => {
  const { data, updateSocialLinks } = useData();
  const toast = useToast();

  const [formData, setFormData] = useState({
    instagram: data.social_links.instagram || '',
    youtube: data.social_links.youtube || '',
    tiktok: data.social_links.tiktok || '',
    x: data.social_links.x || data.social_links.twitter || '',
    threads: data.social_links.threads || '',
    linkedin: data.social_links.linkedin || '',
    kick: data.social_links.kick || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks({
      instagram: formData.instagram.trim(),
      youtube: formData.youtube.trim(),
      tiktok: formData.tiktok.trim(),
      x: formData.x.trim(),
      twitter: formData.x.trim(),
      threads: formData.threads.trim(),
      linkedin: formData.linkedin.trim(),
      kick: formData.kick.trim(),
    });
    toast.success('تم حفظ وتحديث روابط الحسابات ومزامنتها بنجاح');
  };

  return (
    <div id="admin-socials-tab" className="space-y-8" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-cyan-600" />
          <span>حساباتك الرسمية (Social Accounts)</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          إدارة روابط المنصات الرسمية الـ 7 المعتمدة: Instagram، YouTube، TikTok، X، Threads، LinkedIn، و Kick.
        </p>
      </div>

      {/* Conditional visibility notice banner */}
      <div className="bg-cyan-50/80 border border-[#00d9fe]/40 p-4 rounded-2xl flex items-start gap-3 text-slate-800 text-sm">
        <Info className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">قاعدة الإخفاء الديناميكي للبطاقات (Conditional Rendering):</p>
          <p className="text-xs sm:text-sm text-slate-600">
            جميع روابط المنصات اختيارية. إذا تُرك حقل أي منصة فارغاً، فسيتم إخفاء بطاقتها بالكامل وبشكل تلقائي من صفحة الموقع العام.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Instagram */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>إنستغرام (Instagram)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/aahmd_saamh"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة إنستغرام</span>
          </div>

          {/* 2. YouTube */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Youtube className="w-4 h-4 text-[#FF0000]" />
              <span>يوتيوب (YouTube)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.youtube}
              onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
              placeholder="https://youtube.com/@aahmd_saamh"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة يوتيوب</span>
          </div>

          {/* 3. TikTok */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-600" />
              <span>تيك توك (TikTok)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.tiktok}
              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              placeholder="https://tiktok.com/@aahmd_saamh"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة تيك توك</span>
          </div>

          {/* 4. X (Twitter) */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Twitter className="w-4 h-4 text-slate-900" />
              <span>إكس (X / Twitter)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.x}
              onChange={(e) => setFormData({ ...formData, x: e.target.value })}
              placeholder="https://x.com/aahmd_saamh"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة X</span>
          </div>

          {/* 5. Threads */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <AtSign className="w-4 h-4 text-slate-800" />
              <span>ثريدز (Threads)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.threads}
              onChange={(e) => setFormData({ ...formData, threads: e.target.value })}
              placeholder="https://threads.net/@aahmd_saamh"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة ثريدز</span>
          </div>

          {/* 6. LinkedIn */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-[#0077B5]" />
              <span>لينكد إن (LinkedIn)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/aahmd-saamh"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة لينكد إن</span>
          </div>

          {/* 7. Kick */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#53FC18]" />
              <span>كيك للبث المباشر (Kick)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.kick}
              onChange={(e) => setFormData({ ...formData, kick: e.target.value })}
              placeholder="https://kick.com/aahmd_saamh"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة Kick</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ روابط الحسابات</span>
          </button>
        </div>
      </form>
    </div>
  );
};


