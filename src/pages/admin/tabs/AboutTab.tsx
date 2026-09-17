import React, { useState } from 'react';
import {
  Sparkles,
  Save,
  Tag,
  Plus,
  Trash2,
  Edit2,
  FolderGit2,
  X,
  BookOpen,
  User,
  Quote,
  Layers,
} from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { AboutProject } from '../../../types';

export const AboutTab: React.FC = () => {
  const {
    data,
    updateGlobalSettings,
    addAboutProject,
    updateAboutProject,
    deleteAboutProject,
    addInterest,
    deleteInterest,
  } = useData();
  const toast = useToast();

  // About Header & Philosophy Form
  const [aboutSettings, setAboutSettings] = useState({
    aboutTitle: data.global_settings.aboutTitle || 'من هو أحمد سامح؟',
    jobTitle: data.global_settings.jobTitle || 'صانع محتوى ومطور تجارب رقمية',
    aboutSubtitle: data.global_settings.aboutSubtitle || 'الحركة هي عالمي • والذكاء الرقمي أداتي',
    philosophyTitle: data.global_settings.philosophyTitle || 'فلسفة "الحركة هي عالمي"',
    philosophyDescription:
      data.global_settings.philosophyDescription ||
      'الحركة ليست مجرد انتقال من نقطة لأخرى، بل هي الإيقاع الذي يحرك القصة في الفيديو، والسرعة التي تحل خوارزميات التحدي، والتفاعل الإنساني الحي الذي يجعل التجارب الرقمية تنبض بالحياة.',
  });

  // Tag creation state
  const [newTagInput, setNewTagInput] = useState('');

  // Project modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AboutProject | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    status: 'جاري العمل عليه',
    description: '',
    link: '',
  });
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Save General About & Philosophy Settings
  const handleSaveAboutMeta = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalSettings({
      aboutTitle: aboutSettings.aboutTitle.trim() || 'من هو أحمد سامح؟',
      jobTitle: aboutSettings.jobTitle.trim(),
      aboutSubtitle: aboutSettings.aboutSubtitle.trim(),
      philosophyTitle: aboutSettings.philosophyTitle.trim() || 'فلسفة "الحركة هي عالمي"',
      philosophyDescription: aboutSettings.philosophyDescription.trim(),
    });
    toast.success('تم حفظ وتحديث بيانات قسم "عني أكثر" وفلسفة الحركة بنجاح');
  };

  // Tag handlers
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    addInterest(newTagInput.trim());
    setNewTagInput('');
    toast.success('تمت إضافة شارة الاهتمام');
  };

  // Projects handlers
  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      status: 'جاري العمل عليه',
      description: '',
      link: '',
    });
    setIsModalOpen(true);
  };

  const openEditProjectModal = (project: AboutProject) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      status: project.status || 'جاري العمل عليه',
      description: project.description,
      link: project.link || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      toast.error('يرجى كتابة عنوان المشروع');
      return;
    }

    if (editingProject) {
      updateAboutProject(editingProject.id, {
        title: projectForm.title.trim(),
        status: projectForm.status.trim() || 'جاري العمل عليه',
        description: projectForm.description.trim(),
        link: projectForm.link.trim() || undefined,
      });
      toast.success('تم تحديث المشروع بنجاح');
    } else {
      addAboutProject({
        title: projectForm.title.trim(),
        status: projectForm.status.trim() || 'جاري العمل عليه',
        description: projectForm.description.trim(),
        link: projectForm.link.trim() || undefined,
      });
      toast.success('تمت إضافة المشروع الجديد إلى قائمة المشاريع');
    }

    setIsModalOpen(false);
  };

  const handleDeleteProject = () => {
    if (deleteTargetId) {
      deleteAboutProject(deleteTargetId);
      toast.success('تم حذف المشروع');
      setDeleteTargetId(null);
    }
  };

  return (
    <div id="admin-about-tab" className="space-y-10" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-600" />
          <span>إدارة قسم &quot;عني أكثر&quot; (About Section)</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          تخصيص العناوين، صندوق فلسفة الحركة، شارات الاهتمامات اللانهائية، ومعرض المشاريع الحالية.
        </p>
      </div>

      {/* 1. Main Titles & Philosophy Box Form */}
      <form
        onSubmit={handleSaveAboutMeta}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-600" />
            <h3 className="text-base font-black text-slate-900">العناوين وصندوق الفلسفة</h3>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#00d9fe]" />
            <span>حفظ بيانات القسم</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">العنوان الرئيسي للقسم (Main Title)</label>
            <input
              type="text"
              value={aboutSettings.aboutTitle}
              onChange={(e) => setAboutSettings({ ...aboutSettings, aboutTitle: e.target.value })}
              placeholder="مثال: من هو أحمد سامح؟"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden transition-all shadow-2xs"
            />
          </div>

          {/* Optional Job Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">المسمى المهني الاختياري (Job Title)</label>
            <input
              type="text"
              value={aboutSettings.jobTitle}
              onChange={(e) => setAboutSettings({ ...aboutSettings, jobTitle: e.target.value })}
              placeholder="مثال: صانع محتوى ومطور تجارب رقمية"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden transition-all shadow-2xs"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-700">العنوان الفرعي (Subtitle)</label>
            <input
              type="text"
              value={aboutSettings.aboutSubtitle}
              onChange={(e) => setAboutSettings({ ...aboutSettings, aboutSubtitle: e.target.value })}
              placeholder="مثال: الحركة هي عالمي • والذكاء الرقمي أداتي"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Philosophy Box Customization */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-black text-slate-800">تخصيص صندوق فلسفة الحركة (Movement Philosophy Box)</span>
          </div>

          <div className="space-y-4 bg-cyan-50/40 p-5 rounded-2xl border border-cyan-100">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">عنوان صندوق الفلسفة (Philosophy Title)</label>
              <input
                type="text"
                value={aboutSettings.philosophyTitle}
                onChange={(e) => setAboutSettings({ ...aboutSettings, philosophyTitle: e.target.value })}
                placeholder='فلسفة "الحركة هي عالمي"'
                className="w-full p-3 bg-white border border-slate-200 focus:border-[#00d9fe] rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">النص التوضيحي المطول لصندوق الفلسفة (Philosophy Long Description)</label>
              <textarea
                rows={3}
                value={aboutSettings.philosophyDescription}
                onChange={(e) => setAboutSettings({ ...aboutSettings, philosophyDescription: e.target.value })}
                placeholder="اكتب فلسفتك ورؤيتك حول الحركة والإبداع والسرعة..."
                className="w-full p-3 bg-white border border-slate-200 focus:border-[#00d9fe] rounded-xl text-slate-900 text-sm font-medium focus:outline-hidden transition-all leading-relaxed"
              />
            </div>
          </div>
        </div>
      </form>

      {/* 2. Passion & Interests Tags (Infinite dynamic chips) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-cyan-600" />
              <span>شارات الشغف والاهتمامات (Passion & Interests Tags)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              أضف شارات لا نهائية متحركة تعبر عن اهتماماتك ومجالات شغفك (تظهر كبطاقات تفاعلية أنيقة).
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full w-fit">
            {data.interests.length} شارة نشطة
          </span>
        </div>

        {/* Add Tag Input */}
        <form onSubmit={handleAddTag} className="flex gap-3">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            placeholder="أضف اهتماماً أو شغفاً جديداً (مثال: روبوتات، تصميم ثلاثي الأبعاد...)"
            className="flex-1 p-3.5 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden transition-all shadow-2xs"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة شارة</span>
          </button>
        </form>

        {/* Render tags */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {data.interests.map((tag) => (
            <div
              key={tag.id}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-cyan-50/60 border border-slate-200/80 hover:border-[#00d9fe]/50 rounded-xl text-xs font-bold text-slate-800 transition-all group"
            >
              <span>{tag.title}</span>
              <button
                type="button"
                onClick={() => deleteInterest(tag.id)}
                className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                title="حذف هذه الشارة"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Current Projects Showcase (Infinite Cards or "لا يوجد حاليا") */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-cyan-600" />
              <span>مشاريع حالية قيد التطوير (Current Projects Showcase)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              استعراض المشاريع التي تعمل عليها حالياً. إذا كانت القائمة فارغة، سيظهر في الموقع العام مربع &quot;لا يوجد حالياً&quot; بشكل أنيق.
            </p>
          </div>
          <button
            type="button"
            onClick={openAddProjectModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مشروع جديد</span>
          </button>
        </div>

        {data.about_projects.length === 0 ? (
          <div className="p-8 text-center bg-slate-50/70 border border-dashed border-slate-200 rounded-2xl space-y-2">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-800 text-sm">القائمة فارغة حالياً</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              سيتم عرض مربع &quot;لا يوجد حالياً&quot; بشكل احترافي للزوار في صفحة الموقع العام لإعلامهم بعدم وجود مشاريع إضافية قيد التطوير حالياً.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.about_projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 relative group hover:border-[#00d9fe] hover:bg-white transition-all shadow-2xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-700 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-black text-slate-900 text-sm">{proj.title}</h4>
                    {proj.status && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                        {proj.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditProjectModal(proj)}
                      className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors cursor-pointer"
                      title="تعديل"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(proj.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {proj.link && (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-cyan-600">
                    <span className="truncate" dir="ltr">{proj.link}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">
                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">عنوان المشروع (Title) *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="مثال: منصة إدارة الإيقاع البصري"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">شارة حالة المشروع (Status Tag)</label>
                  <div className="flex gap-1.5">
                    {['جاري العمل عليه', 'مكتمل', 'قريباً'].map((suggested) => (
                      <button
                        key={suggested}
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, status: suggested })}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 text-slate-600 transition-colors"
                      >
                        {suggested}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                  placeholder="مثال: جاري العمل عليه / مكتمل"
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm font-bold focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">وصف المشروع (Description) *</label>
                <textarea
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="وصف تفصيلي لأهداف المشروع ومخرجاته..."
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">رابط خارجي للمشروع (اختياري)</label>
                <input
                  type="url"
                  dir="ltr"
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-[#00d9fe] focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-hidden text-right"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProject ? 'تحديث' : 'حفظ المشروع'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="تأكيد حذف المشروع"
        message="هل أنت متأكد من رغبتك في حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="نعم، احذف المشروع"
        cancelText="إلغاء"
        isDestructive
        onConfirm={handleDeleteProject}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
