import React, { useState } from 'react';
import { Film, Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Save, Play, AlertCircle, ExternalLink } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { validateYouTubeUrl } from '../../../utils/validators';
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
  const [formData, setFormData] = useState({ title: '', description: '', youtubeUrl: '' });
  const [urlError, setUrlError] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', youtubeUrl: '' });
    setUrlError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      youtubeUrl: project.youtubeUrl,
    });
    setUrlError(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError(null);

    if (!formData.title.trim()) {
      toast.error('يرجى إدخال عنوان المشروع');
      return;
    }

    // Validate YouTube URL
    const ytValidation = validateYouTubeUrl(formData.youtubeUrl);
    if (!ytValidation.isValid) {
      setUrlError(ytValidation.error || 'رابط يوتيوب غير صالح');
      toast.error(ytValidation.error || 'رابط يوتيوب غير صالح');
      return;
    }

    if (editingProject) {
      updatePortfolioProject(editingProject.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        youtubeUrl: formData.youtubeUrl.trim(),
      });
      toast.success('تم تحديث المشروع في معرض الأعمال بنجاح');
    } else {
      addPortfolioProject({
        title: formData.title.trim(),
        description: formData.description.trim(),
        youtubeUrl: formData.youtubeUrl.trim(),
      });
      toast.success('تمت إضافة المشروع الجديد بنجاح');
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

  return (
    <div id="admin-portfolio-tab" className="space-y-8" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Film className="w-5 h-5 text-rose-600" />
            <span>إدارة معرض الأعمال (Portfolio)</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            إضافة وتعديل وحذف مشاريع يوتيوب المعروضة في صفحة معرض الأعمال
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          id="admin-add-portfolio-btn"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.portfolio.length > 0 ? (
          data.portfolio.map((project, index) => {
            const yt = validateYouTubeUrl(project.youtubeUrl);
            const thumb = yt.videoId
              ? `https://img.youtube.com/vi/${yt.videoId}/mqdefault.jpg`
              : null;

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Film className="w-10 h-10 text-slate-600" />
                    )}
                    <a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-slate-900/30 hover:bg-slate-900/10 flex items-center justify-center transition-colors"
                      title="فتح على يوتيوب"
                    >
                      <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center">
                        <Play className="w-5 h-5 fill-white translate-x-0.5" />
                      </div>
                    </a>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 text-lg">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  {/* Reordering */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => reorderPortfolio(index, index - 1)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                      title="تحريك للأمام"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === data.portfolio.length - 1}
                      onClick={() => reorderPortfolio(index, index + 1)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                      title="تحريك للخلف"
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
                      title="تعديل"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(project.id)}
                      className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                      title="حذف"
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
            لا توجد مشاريع في معرض الأعمال حالياً. اضغط على &quot;إضافة مشروع جديد&quot; لإضافة أول فيديو.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingProject ? 'تعديل مشروع المعرض' : 'إضافة مشروع جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  عنوان المشروع
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: فيديو مونتاج سينمائي احترافي"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  رابط فيديو يوتيوب (YouTube URL)
                </label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, youtubeUrl: e.target.value });
                    if (urlError) setUrlError(null);
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className={`w-full p-3 bg-slate-50 border ${
                    urlError ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
                  } focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all`}
                />
                <span className="text-[11px] text-slate-400 block">
                  يقبل روابط youtube.com/watch?v= أو youtu.be/ أو shorts
                </span>
                {urlError && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{urlError}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  وصف المشروع
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="تفاصيل مختصرة عن المشروع والمؤثرات أو التقنيات المستخدمة..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden transition-all leading-relaxed"
                />
              </div>

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
                  <span>{editingProject ? 'حفظ التعديلات' : 'إضافة المشروع'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="تأكيد حذف المشروع"
        message="هل أنت متأكد من حذف هذا المشروع من معرض الأعمال؟"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
