import React, { useState } from 'react';
import { Share2, Save, Instagram, Youtube, Globe, Video } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';

export const SocialsTab: React.FC = () => {
  const { data, updateSocialLinks } = useData();
  const toast = useToast();

  const [formData, setFormData] = useState({
    instagram: data.social_links.instagram || '',
    tiktok: data.social_links.tiktok || '',
    youtube: data.social_links.youtube || '',
    blogger: data.social_links.blogger || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks({
      instagram: formData.instagram.trim(),
      tiktok: formData.tiktok.trim(),
      youtube: formData.youtube.trim(),
      blogger: formData.blogger.trim(),
    });
    toast.success('تم حفظ روابط الحسابات الاجتماعية بنجاح');
  };

  return (
    <div id="admin-socials-tab" className="space-y-8" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-blue-600" />
          <span>إدارة حسابات التواصل الاجتماعي</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          تعديل الروابط المباشرة لصفحة &quot;حساباتي&quot;. في حال ترك أي حقل فارغاً، ستظهر البطاقة بحالة &quot;لا يوجد حالياً&quot;.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {/* Instagram */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>رابط إنستغرام (Instagram)</span>
          </label>
          <input
            type="url"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            placeholder="https://instagram.com/yourprofile"
            className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs"
          />
        </div>

        {/* TikTok */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Video className="w-4 h-4 text-slate-900" />
            <span>رابط تيك توك (TikTok)</span>
          </label>
          <input
            type="url"
            value={formData.tiktok}
            onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
            placeholder="https://tiktok.com/@yourprofile"
            className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs"
          />
        </div>

        {/* YouTube */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Youtube className="w-4 h-4 text-rose-600" />
            <span>رابط قناة يوتيوب (YouTube Channel)</span>
          </label>
          <input
            type="url"
            value={formData.youtube}
            onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
            placeholder="https://youtube.com/@yourchannel"
            className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs"
          />
        </div>

        {/* Blogger */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600" />
            <span>رابط المدونة (Blogger)</span>
          </label>
          <input
            type="url"
            value={formData.blogger}
            onChange={(e) => setFormData({ ...formData, blogger: e.target.value })}
            placeholder="https://yourblog.blogspot.com"
            className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ روابط الحسابات</span>
          </button>
        </div>
      </form>
    </div>
  );
};
