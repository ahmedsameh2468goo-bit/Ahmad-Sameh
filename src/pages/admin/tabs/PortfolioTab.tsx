import React, { useState } from 'react';
import {
  Film,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  Save,
  Play,
  AlertCircle,
  ExternalLink,
  Globe,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ConfirmModal } from '../../../components/ConfirmModal';
import {
  detectVideoPlatform,
  isValidUrl,
  VideoPlatformType,
} from '../../../utils/validators';
import { PortfolioProject } from '../../../types';

export const PortfolioTab: React.FC = () => {
  const {
    data,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    reorderPortfolio,
  } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState({
    serviceType: '',
    title: '',
    description: '',
    videoUrl: '',
    externalUrl: '',
  });
  const [urlError, setUrlError] = useState<string | null>(null);
  const [externalUrlError, setExternalUrlError] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      serviceType: '',
      title: '',
      description: '',
      videoUrl: '',
      externalUrl: '',
    });
    setUrlError(null);
    setExternalUrlError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      serviceType: project.serviceType || '',
      title: project.title || '',
      description: project.description || '',
      videoUrl: project.videoUrl || project.youtubeUrl || '',
      externalUrl: project.externalUrl || '',
    });
    setUrlError(null);
    setExternalUrlError(null);
    setIsModalOpen(true);
  };

  const detectedModalPlatform = detectVideoPlatform(formData.videoUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError(null);
    setExternalUrlError(null);

    const trimmedServiceType = formData.serviceType.trim();
    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();
    const trimmedVideoUrl = formData.videoUrl.trim();
    const trimmedExternalUrl = formData.externalUrl.trim();

    if (!trimmedTitle) {
      toast.error('يرجى إدخال عنوان المشروع');
      return;
    }

    if (!trimmedVideoUrl) {
      setUrlError('يرجى إدخال رابط الفيديو');
      toast.error('يرجى إدخال رابط الفيديو');
      return;
    }

    if (!isValidUrl(trimmedVideoUrl)) {
      setUrlError('رابط الفيديو غير صالح. يجب أن يبدأ بـ https:// أو http://');
      toast.error('رابط الفيديو غير صالح');
      return;
    }

    if (trimmedExternalUrl && !isValidUrl(trimmedExternalUrl)) {
      setExternalUrlError('رابط الموقع الخارجي غير صالح. يجب أن يبدأ بـ https:// أو http://');
      toast.error('رابط الموقع الخارجي غير صالح');
      return;
    }

    const payload = {
      serviceType: trimmedServiceType || 'خدمة إبداعية',
      title: trimmedTitle,
      description: trimmedDescription,
      videoUrl: trimmedVideoUrl,
      youtubeUrl: trimmedVideoUrl, // for backward compatibility
      externalUrl: trimmedExternalUrl || '',
    };

    if (editingProject) {
      updatePortfolioProject(editingProject.id, payload);
      toast.success('تم تحديث بطاقة المشروع بنجاح');
    } else {
      addPortfolioProject(payload);
      toast.success('تمت إضافة بطاقة المشروع الجديد بنجاح');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deletePortfolioProject(deleteTargetId);
      toast.success('تم حذف المشروع بنجاح');
      setDeleteTargetId(null);
    }
  };

  const renderPlatformBadge = (platform: VideoPlatformType, platformName: string) => {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
        <Sparkles className="w-3 h-3 text-amber-500" />
        <span>{platformName}</span>
      </span>
    );
  };

  return (
    <div id="admin-portfolio-tab" className="space-y-8" dir="rtl">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Film className="w-5 h-5 text-blue-600" />
            <span>إدارة قسم &quot;أعمالي&quot; (Portfolio)</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            تحكم كامل في بطاقات المشاريع: نوع الخدمة، العنوان، النص التوضيحي، رابط الفيديو، ورابط الموقع على النت
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          id="admin-add-portfolio-btn"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عمل جديد</span>
        </button>
      </div>

      {/* Projects Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.portfolio.length > 0 ? (
          data.portfolio.map((project, index) => {
            const videoUrl = project.videoUrl || project.youtubeUrl || '';
            const detected = detectVideoPlatform(videoUrl);
            const hasExternal = Boolean(project.externalUrl && project.externalUrl.trim().length > 0);

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  {/* Media Banner Preview */}
                  <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                    {detected.thumbnailUrl ? (
                      <img
                        src={detected.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-slate-400 space-y-1">
                        <Film className="w-10 h-10 text-slate-500" />
                        <span className="text-xs font-bold text-slate-300">
                          {detected.badgeLabel}
                        </span>
                      </div>
                    )}

                    {videoUrl && (
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-slate-900/30 hover:bg-slate-900/10 flex items-center justify-center transition-colors"
                        title={detected.watchLabel}
                      >
                        <div className="w-11 h-11 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white translate-x-0.5" />
                        </div>
                      </a>
                    )}

                    {/* Platform Tag */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-[11px] font-bold text-white flex items-center gap-1">
                      <span>{detected.platformName}</span>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-5 space-y-3">
                    {/* Service Type Tag */}
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/70">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        <span>{project.serviceType || 'خدمة إبداعية'}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 text-lg leading-snug">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed whitespace-pre-line">
                      {project.description || 'لا يوجد نص توضيحي مضاف'}
                    </p>

                    {/* External Link Indicator */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                      {hasExternal ? (
                        <a
                          href={project.externalUrl!.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium hover:underline"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>رابط الموقع: {project.externalUrl}</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">
                          بدون رابط موقع خارجي (مخفي تلقائياً في البطاقة)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Controls */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  {/* Reordering */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => reorderPortfolio(index, index - 1)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30 cursor-pointer"
                      title="تحريك للأعلى"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === data.portfolio.length - 1}
                      onClick={() => reorderPortfolio(index, index + 1)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30 cursor-pointer"
                      title="تحريك للأسفل"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                      title="تعديل البطاقة"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(project.id)}
                      className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                      title="حذف البطاقة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 p-12 bg-white rounded-3xl border border-dashed border-slate-300 text-center text-slate-400 text-sm">
            لا توجد أعمال مضافة حالياً. اضغط على &quot;إضافة عمل جديد&quot; لإضافة أول بطاقة عمل.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingProject ? 'تعديل بطاقة العمل' : 'إضافة عمل جديد إلى المعرض'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4">
              {/* Field 1: Service Type (نوع الخدمة) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  نوع الخدمة <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  placeholder="مثال: إنشاء موقع، مونتاج فيديو ريلز، تصميم هوية بصرية..."
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden transition-all"
                />
                <span className="text-[11px] text-slate-400 block">
                  النص التعريفي للخدمة الذي يظهر كشارة في أعلى البطاقة
                </span>
              </div>

              {/* Field 2: Project Title (عنوان المشروع) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  عنوان المشروع <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: فيديو ترويجي سينمائي لشركة تقنية"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden transition-all"
                />
              </div>

              {/* Field 3: Project Description (نص توضيحي للمشروع) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  نص توضيحي للمشروع
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="تفاصيل وشرح عن فكرة المشروع والتقنيات والمؤثرات أو المراحل المنجزة..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden transition-all leading-relaxed"
                />
              </div>

              {/* Field 4: Media/Video Link (رابط الفيديو) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 block">
                    رابط الفيديو <span className="text-rose-500">*</span>
                  </label>
                  {formData.videoUrl.trim() && (
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      المنصة المكتشفة: {detectedModalPlatform.platformName}
                    </span>
                  )}
                </div>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, videoUrl: e.target.value });
                    if (urlError) setUrlError(null);
                  }}
                  placeholder="https://www.youtube.com/watch?v=... أو TikTok أو Instagram أو أي رابط"
                  required
                  className={`w-full p-3 bg-slate-50 border ${
                    urlError ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
                  } focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all`}
                />
                <span className="text-[11px] text-slate-400 block">
                  يقبل روابط الفيديو من يوتيوب، تيك توك، إنستغرام، فيميو، أو أي رابط فيديو على الإنترنت
                </span>
                {urlError && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{urlError}</span>
                  </p>
                )}
              </div>

              {/* Field 5: External Project Link (رابط الموقع على النت - اختياري) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  رابط الموقع على النت / الرابط الخارجي (اختياري)
                </label>
                <input
                  type="url"
                  value={formData.externalUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, externalUrl: e.target.value });
                    if (externalUrlError) setExternalUrlError(null);
                  }}
                  placeholder="https://example.com (اتركه فارغاً إذا لم يتوفر رابط خارجي)"
                  className={`w-full p-3 bg-slate-50 border ${
                    externalUrlError ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
                  } focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all`}
                />
                <span className="text-[11px] text-slate-400 block">
                  حقل اختياري — إذا تُرِك فارغاً، فسيتم إخفاء زر الموقع تلقائياً من بطاقة المشروع.
                </span>
                {externalUrlError && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{externalUrlError}</span>
                  </p>
                )}
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProject ? 'حفظ التعديلات' : 'إضافة العمل'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="تأكيد حذف العمل"
        message="هل أنت متأكد من حذف بطاقة هذا العمل من قسم الأعمال؟ سيتم التحديث في قاعدة البيانات فوراً."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

