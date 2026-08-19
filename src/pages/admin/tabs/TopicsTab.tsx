import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Edit2, ArrowUp, ArrowDown, X, Save, Compass } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ConfirmModal } from '../../../components/ConfirmModal';

export const TopicsTab: React.FC = () => {
  const {
    data,
    addTopic,
    updateTopic,
    deleteTopic,
    reorderTopics,
    addInterest,
    updateInterest,
    deleteInterest,
  } = useData();
  const toast = useToast();

  // State for Topics (Services page)
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editingTopicText, setEditingTopicText] = useState('');
  const [deleteTopicTargetId, setDeleteTopicTargetId] = useState<string | null>(null);

  // State for Interests (About Me page)
  const [newInterestTitle, setNewInterestTitle] = useState('');
  const [editingInterestId, setEditingInterestId] = useState<string | null>(null);
  const [editingInterestText, setEditingInterestText] = useState('');
  const [deleteInterestTargetId, setDeleteInterestTargetId] = useState<string | null>(null);

  // Handlers for Topics
  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;
    addTopic(newTopicTitle.trim());
    setNewTopicTitle('');
    toast.success('تمت إضافة الموضوع بنجاح');
  };

  const handleUpdateTopic = (id: string) => {
    if (!editingTopicText.trim()) return;
    updateTopic(id, editingTopicText.trim());
    setEditingTopicId(null);
    toast.success('تم تعديل الموضوع');
  };

  const handleDeleteTopicConfirm = () => {
    if (deleteTopicTargetId) {
      deleteTopic(deleteTopicTargetId);
      toast.success('تم حذف الموضوع');
      setDeleteTopicTargetId(null);
    }
  };

  // Handlers for Interests
  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterestTitle.trim()) return;
    addInterest(newInterestTitle.trim());
    setNewInterestTitle('');
    toast.success('تمت إضافة الاهتمام بنجاح');
  };

  const handleUpdateInterest = (id: string) => {
    if (!editingInterestText.trim()) return;
    updateInterest(id, editingInterestText.trim());
    setEditingInterestId(null);
    toast.success('تم تعديل الاهتمام');
  };

  const handleDeleteInterestConfirm = () => {
    if (deleteInterestTargetId) {
      deleteInterest(deleteInterestTargetId);
      toast.success('تم حذف الاهتمام');
      setDeleteInterestTargetId(null);
    }
  };

  return (
    <div id="admin-topics-tab" className="space-y-12" dir="rtl">
      {/* SECTION 1: Topics of Interest ("موضوعات مهتم بها حالياً") */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>الموضوعات المهتم بها حالياً (صفحة الخدمات)</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            البطاقات الصغيرة التي تظهر أسفل صفحة الخدمات مثل: الذكاء الاصطناعي، Vibe Coding، إلخ.
          </p>
        </div>

        {/* Add input */}
        <form onSubmit={handleAddTopic} className="flex gap-2">
          <input
            type="text"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            placeholder="اكتب اسم موضوع جديد..."
            className="flex-1 p-3 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-900 text-sm focus:outline-hidden shadow-2xs"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shrink-0 shadow-md shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة موضوع</span>
          </button>
        </form>

        {/* Topics List */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          {data.topics_of_interest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.topics_of_interest.map((topic, index) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl gap-2 hover:bg-blue-50/40 transition-colors"
                >
                  {editingTopicId === topic.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={editingTopicText}
                        onChange={(e) => setEditingTopicText(e.target.value)}
                        className="flex-1 p-1.5 bg-white border border-blue-400 rounded-lg text-xs"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateTopic(topic.id)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md"
                        title="حفظ"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTopicId(null)}
                        className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-md"
                        title="إلغاء"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-sm font-bold text-slate-800 truncate">
                          {topic.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => reorderTopics(index, index - 1)}
                          className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                          title="تحريك للأمام"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === data.topics_of_interest.length - 1}
                          onClick={() => reorderTopics(index, index + 1)}
                          className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                          title="تحريك للخلف"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTopicId(topic.id);
                            setEditingTopicText(topic.title);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded-md"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTopicTargetId(topic.id)}
                          className="p-1 text-rose-600 hover:bg-rose-100 rounded-md"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm py-4">لا توجد موضوعات حالياً</p>
          )}
        </div>
      </section>

      {/* SECTION 2: Interests ("مهتم بـ" in About Me) */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            <span>قائمة الاهتمامات الشاملة (صفحة عني أكثر)</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            الوسوم التفاعلية التي تعرض كافة مجالات وشغف أحمد سامح في صفحة &quot;عني أكثر&quot;.
          </p>
        </div>

        {/* Add input */}
        <form onSubmit={handleAddInterest} className="flex gap-2">
          <input
            type="text"
            value={newInterestTitle}
            onChange={(e) => setNewInterestTitle(e.target.value)}
            placeholder="اكتب اسم اهتمام أو مهارة جديدة..."
            className="flex-1 p-3 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-900 text-sm focus:outline-hidden shadow-2xs"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shrink-0 shadow-md shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة اهتمام</span>
          </button>
        </form>

        {/* Interests Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          {data.interests.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {data.interests.map((interest) => (
                <div
                  key={interest.id}
                  className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50/50 transition-colors"
                >
                  {editingInterestId === interest.id ? (
                    <div className="flex items-center gap-1.5 w-full">
                      <input
                        type="text"
                        value={editingInterestText}
                        onChange={(e) => setEditingInterestText(e.target.value)}
                        className="flex-1 p-1 bg-white border border-blue-400 rounded-md text-xs"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateInterest(interest.id)}
                        className="p-1 text-emerald-600"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingInterestId(null)}
                        className="p-1 text-slate-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="truncate">{interest.title}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingInterestId(interest.id);
                            setEditingInterestText(interest.title);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded-md"
                          title="تعديل"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteInterestTargetId(interest.id)}
                          className="p-1 text-rose-600 hover:bg-rose-100 rounded-md"
                          title="حذف"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm py-4">لا توجد اهتمامات حالياً</p>
          )}
        </div>
      </section>

      {/* Delete Confirmation Modals */}
      <ConfirmModal
        isOpen={Boolean(deleteTopicTargetId)}
        title="تأكيد حذف الموضوع"
        message="هل أنت متأكد من حذف هذا الموضوع؟"
        onConfirm={handleDeleteTopicConfirm}
        onCancel={() => setDeleteTopicTargetId(null)}
      />

      <ConfirmModal
        isOpen={Boolean(deleteInterestTargetId)}
        title="تأكيد حذف الاهتمام"
        message="هل أنت متأكد من حذف هذا الاهتمام؟"
        onConfirm={handleDeleteInterestConfirm}
        onCancel={() => setDeleteInterestTargetId(null)}
      />
    </div>
  );
};
