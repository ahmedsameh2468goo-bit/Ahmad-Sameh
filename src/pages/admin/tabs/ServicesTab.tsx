import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, X, Save } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { ServiceItem } from '../../../types';

export const ServicesTab: React.FC = () => {
  const {
    data,
    addService,
    updateService,
    deleteService,
    reorderServices,
    toggleServiceVisibility,
  } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({ title: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({ title: service.title, description: service.description });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('يرجى إدخال اسم الخدمة');
      return;
    }

    if (editingService) {
      updateService(editingService.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
      toast.success('تم تحديث الخدمة بنجاح');
    } else {
      addService({
        title: formData.title.trim(),
        description: formData.description.trim(),
        isVisible: true,
      });
      toast.success('تمت إضافة الخدمة بنجاح');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteService(deleteTargetId);
      toast.success('تم حذف الخدمة بنجاح');
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-services-tab" className="space-y-8" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>إدارة الخدمات (Services)</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            إضافة وتعديل وحذف وترتيب الخدمات المعروضة في الصفحة الرئيسية وصفحة الخدمات
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          id="admin-add-service-btn"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
        {data.services.length > 0 ? (
          data.services.map((service, index) => (
            <div
              key={service.id}
              className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                !service.isVisible ? 'bg-slate-50/70 opacity-65' : 'hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">
                      {service.title}
                    </h3>
                    {!service.isVisible && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                        مخفية
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 max-w-xl leading-relaxed">
                    {service.description || 'لا يوجد وصف'}
                  </p>
                </div>
              </div>

              {/* Actions & Reordering */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {/* Reorder Up */}
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderServices(index, index - 1)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Reorder Down */}
                <button
                  type="button"
                  disabled={index === data.services.length - 1}
                  onClick={() => reorderServices(index, index + 1)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Toggle Visibility */}
                <button
                  type="button"
                  onClick={() => {
                    toggleServiceVisibility(service.id);
                    toast.info(service.isVisible ? 'تم إخفاء الخدمة' : 'تم إظهار الخدمة');
                  }}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    service.isVisible
                      ? 'text-emerald-600 hover:bg-emerald-50'
                      : 'text-slate-400 hover:bg-slate-200'
                  }`}
                  title={service.isVisible ? 'إخفاء الخدمة' : 'إظهار الخدمة'}
                >
                  {service.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => openEditModal(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="تعديل الخدمة"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(service.id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="حذف الخدمة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">
            لا توجد خدمات حالياً. اضغط على زر &quot;إضافة خدمة جديدة&quot; للبدء.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
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
                  عنوان / اسم الخدمة
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: مونتاج وصناعة الفيديو"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  وصف تفصيلي للخدمة
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="اكتب وصفاً موجزاً وجذاباً لما تقدمه في هذه الخدمة..."
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
                  <span>{editingService ? 'حفظ التعديلات' : 'إضافة الخدمة'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="تأكيد حذف الخدمة"
        message="هل أنت متأكد من حذف هذه الخدمة نهائياً؟ سيتم إزالتها فوراً من الموقع."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
