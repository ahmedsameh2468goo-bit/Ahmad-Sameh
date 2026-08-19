import React, { useState } from 'react';
import { FolderGit2, Plus, Edit2, Trash2, X, Save, ExternalLink } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { AboutProject } from '../../../types';

export const AboutProjectsTab: React.FC = () => {
  const { data, addAboutProject, updateAboutProject, deleteAboutProject } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AboutProject | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', link: '' });
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', link: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (project: AboutProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      link: project.link || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('يرجى إدخال عنوان المشروع');
      return;
    }

    if (editingProject) {
      updateAboutProject(editingProject.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        link: formData.link.trim() || undefined,
      });
      toast.success('تم تحديث المشروع بنجاح');
    } else {
      addAboutProject({
        title: formData.title.trim(),
        description: formData.description.trim(),
        link: formData.link.trim() || undefined,
      });
      toast.success('تمت إضافة المشروع الجديد');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteAboutProject(deleteTargetId);
      toast.success('تم حذف المشروع');
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-about-projects-tab" className="space-y-8" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-600" />
            <span>مشاريع عني أكثر (About Projects)</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            إضافة وإدارة المشاريع والمسيرة الشخصية المعروضة في صفحة &quot;عني أكثر&quot;.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          id="admin-add-about-proj-btn"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.about_projects.length > 0 ? (
          data.about_projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    {proj.title}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>رابط</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {proj.description || 'لا يوجد وصف'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(proj)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>تعديل</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(proj.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 p-10 bg-white rounded-3xl border border-dashed border-slate-300 text-center text-slate-400 text-sm">
            لا توجد مشاريع إضافية حالياً. سيتم عرض &quot;لا يوجد حالياً&quot; في صفحة عني أكثر.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
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
                  placeholder="مثال: مشروع كتابة وتوثيق..."
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  رابط المشروع (اختياري)
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm font-sans focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  وصف المشروع
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="تفاصيل موجزة عن المشروع..."
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
        message="هل أنت متأكد من حذف هذا المشروع؟"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
