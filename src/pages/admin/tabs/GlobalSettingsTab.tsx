import React, { useState } from 'react';
import { Settings, Save, Mail, MessageCircle, FileText, CheckCircle2, User } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ImageUploader } from '../../../components/ImageUploader';
import { isValidEmail, sanitizeWhatsAppNumber } from '../../../utils/validators';

export const GlobalSettingsTab: React.FC = () => {
  const { data, updateGlobalSettings } = useData();
  const toast = useToast();

  const [formData, setFormData] = useState({
    displayName: data.global_settings.displayName || 'أحمد سامح',
    heroImage: data.global_settings.heroImage || '',
    bio: data.global_settings.bio || '',
    whatsapp: data.global_settings.whatsapp || '',
    email: data.global_settings.email || '',
  });

  const [errors, setErrors] = useState<{ email?: string; whatsapp?: string }>({});

  const handleImageUploaded = (base64String: string) => {
    setFormData((prev) => ({ ...prev, heroImage: base64String }));
    toast.info('تم تحميل ومعالجة الصورة بنجاح');
  };

  const handleImageRemoved = () => {
    setFormData((prev) => ({ ...prev, heroImage: '' }));
    toast.info('تم إزالة الصورة');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; whatsapp?: string } = {};

    // Validate email
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = 'يرجى إدخال عنوان بريد إلكتروني صالح (مثال: name@domain.com)';
    }

    // Validate whatsapp
    const sanitizedPhone = sanitizeWhatsAppNumber(formData.whatsapp);
    if (formData.whatsapp.trim() && sanitizedPhone.length < 8) {
      newErrors.whatsapp = 'يرجى إدخال رقم هاتف صالح يتضمن كود الدولة';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('يرجى تصحيح الأخطاء قبل الحفظ');
      return;
    }

    setErrors({});
    updateGlobalSettings({
      displayName: formData.displayName.trim() || 'أحمد سامح',
      heroImage: formData.heroImage,
      bio: formData.bio,
      whatsapp: sanitizedPhone,
      email: formData.email.trim(),
    });

    toast.success('تم حفظ الإعدادات العامة وتحديث الموقع بنجاح');
  };

  return (
    <div id="admin-global-settings-tab" className="space-y-8" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <span>الإعدادات العامة والملف الشخصي</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          إدارة الاسم الظاهر، الصورة الشخصية، النبذة التعريفية، ومعلومات التواصل الرئيسية
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        {/* 1. Display Name Input */}
        <div className="space-y-2 pb-6 border-b border-slate-100">
          <label
            htmlFor="admin-display-name-input"
            className="text-sm font-bold text-slate-800 flex items-center gap-2"
          >
            <User className="w-4 h-4 text-blue-600" />
            <span>الاسم الظاهر (في الهيدر والموقع) / Display Name</span>
          </label>
          <input
            id="admin-display-name-input"
            type="text"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            placeholder="أدخل الاسم الجديد (مثال: أحمد سامح)"
            className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden transition-all shadow-2xs"
          />
          <span className="text-xs text-slate-400">
            هذا الاسم سيظهر فوراً في الهيدر، الفوتر، والصفحة الرئيسية وكافة أرجاء الموقع بمجرد الحفظ.
          </span>
        </div>

        {/* 2. Direct Image Uploader */}
        <div className="pb-6 border-b border-slate-100">
          <ImageUploader
            currentImage={formData.heroImage}
            onImageUploaded={handleImageUploaded}
            onImageRemoved={handleImageRemoved}
          />
        </div>

        {/* 3. Main Bio */}
        <div className="space-y-2">
          <label
            htmlFor="admin-bio-input"
            className="text-sm font-bold text-slate-800 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>النبذة التعريفية الرئيسية (Bio)</span>
          </label>
          <textarea
            id="admin-bio-input"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="أدخل نبذة تعريفية تعبر عن خبراتك ومجالات اهتمامك..."
            className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-900 text-sm focus:outline-hidden transition-all shadow-2xs leading-relaxed"
          />
          <span className="text-xs text-slate-400">
            في حالة ترك الحقل فارغاً، سيتم عرض النص التلقائي &quot;لا يوجد حالياً&quot; في الواجهة العامة.
          </span>
        </div>

        {/* 4. Contact Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          {/* WhatsApp */}
          <div className="space-y-2">
            <label
              htmlFor="admin-whatsapp-input"
              className="text-sm font-bold text-slate-800 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>رقم الواتساب (مع كود الدولة)</span>
            </label>
            <input
              id="admin-whatsapp-input"
              type="text"
              value={formData.whatsapp}
              onChange={(e) => {
                setFormData({ ...formData, whatsapp: e.target.value });
                if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
              }}
              placeholder="مثال: 201012345678"
              className={`w-full p-3.5 bg-slate-50 border ${
                errors.whatsapp ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
              } focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs`}
            />
            {errors.whatsapp && (
              <p className="text-xs text-rose-600 font-medium">{errors.whatsapp}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="admin-email-input"
              className="text-sm font-bold text-slate-800 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>البريد الإلكتروني الرسمي</span>
            </label>
            <input
              id="admin-email-input"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="name@example.com"
              className={`w-full p-3.5 bg-slate-50 border ${
                errors.email ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
              } focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all shadow-2xs`}
            />
            {errors.email && (
              <p className="text-xs text-rose-600 font-medium">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
          <button
            id="admin-save-settings-btn"
            type="submit"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ التعديلات العامة</span>
          </button>
        </div>
      </form>
    </div>
  );
};
