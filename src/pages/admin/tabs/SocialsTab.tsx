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
    whatsapp: data.social_links.whatsapp || '',
    instagram: data.social_links.instagram || '',
    youtube: data.social_links.youtube || '',
    tiktok: data.social_links.tiktok || '',
    x: data.social_links.x || data.social_links.twitter || '',
    threads: data.social_links.threads || '',
    kick: data.social_links.kick || '',
    linkedin: data.social_links.linkedin || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks({
      whatsapp: formData.whatsapp.trim(),
      instagram: formData.instagram.trim(),
      youtube: formData.youtube.trim(),
      tiktok: formData.tiktok.trim(),
      x: formData.x.trim(),
      twitter: formData.x.trim(),
      threads: formData.threads.trim(),
      kick: formData.kick.trim(),
      linkedin: formData.linkedin.trim(),
    });
    toast.success('تم حفظ وتحديث روابط الحسابات ومزامنتها بنجاح');
  };

  return (
    <div id="admin-socials-tab" className="space-y-8" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-blue-600" />
          <span>إدارة حسابات التواصل الاجتماعي</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          إدارة روابط منصاتك الرسمية الـ 8 المعتمدة.
        </p>
      </div>

      {/* Conditional visibility notice banner */}
      <div className="bg-cyan-50/80 border border-[#00d9fe]/40 p-4 rounded-2xl flex items-start gap-3 text-slate-800 text-sm">
        <Info className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">قاعدة الإخفاء الديناميكي للبطاقات:</p>
          <p className="text-xs sm:text-sm text-slate-600">
            أي منصة تترك الرابط الخاص بها فارغاً سيتم إخفاء بطاقتها بالكامل وبشكل تلقائي من صفحة &quot;حساباتي&quot; العامة. المنصات التي تضع لها رابطاً هي فقط التي ستظهر للزوار.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. WhatsApp */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>واتساب (رقم الهاتف مع كود الدولة أو رابط مباشر)</span>
            </label>
            <input
              type="text"
              dir="ltr"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="مثال: 201012345678 أو https://wa.me/..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة واتساب</span>
          </div>

          {/* 2. Instagram */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>إنستغرام (Instagram)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/aahmd_saiimd"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة إنستغرام</span>
          </div>

          {/* 3. YouTube */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Youtube className="w-4 h-4 text-rose-600" />
              <span>يوتيوب (YouTube)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.youtube}
              onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
              placeholder="https://youtube.com/@aahmd_saiimd"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة يوتيوب</span>
          </div>

          {/* 4. TikTok */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Video className="w-4 h-4 text-slate-900" />
              <span>تيك توك (TikTok)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.tiktok}
              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              placeholder="https://tiktok.com/@aahmd_saiimd"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة تيك توك</span>
          </div>

          {/* 5. X (Twitter) */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Twitter className="w-4 h-4 text-slate-900" />
              <span>إكس (X)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.x}
              onChange={(e) => setFormData({ ...formData, x: e.target.value })}
              placeholder="https://x.com/aahmd_saiimd"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة إكس</span>
          </div>

          {/* 6. Threads */}
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
              placeholder="https://threads.net/@aahmd_saiimd"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة ثريدز</span>
          </div>

          {/* 7. Kick */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Tv className="w-4 h-4 text-emerald-600" />
              <span>كيك (Kick)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.kick}
              onChange={(e) => setFormData({ ...formData, kick: e.target.value })}
              placeholder="https://kick.com/aahmd_saiimd"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة كيك</span>
          </div>

          {/* 8. LinkedIn */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-700" />
              <span>لينكد إن (LinkedIn)</span>
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/aahmd_saiimd"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs text-right"
            />
            <span className="text-[11px] text-slate-400">اتركه فارغاً لإخفاء بطاقة لينكد إن</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ ومزامنة روابط المنصات</span>
          </button>
        </div>
      </form>
    </div>
  );
};


