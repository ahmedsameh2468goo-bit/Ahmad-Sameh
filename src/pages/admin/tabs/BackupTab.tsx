import React, { useState, useRef } from 'react';
import { Database, Download, Upload, RotateCcw, Cloud, CheckCircle2, RefreshCw } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { SUPABASE_URL } from '../../../lib/supabase';

export const BackupTab: React.FC = () => {
  const {
    exportDataJSON,
    importDataJSON,
    resetToDefaults,
    cloudSyncStatus,
    isCloudSyncing,
    lastSyncedAt,
    syncWithCloud,
  } = useData();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahmed-sameh-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('تم تصدير النسخة الاحتياطية بنجاح');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataJSON(content);
        if (success) {
          toast.success('تم استيراد واستعادة البيانات ومزامنتها سحابياً بنجاح');
        } else {
          toast.error('ملف النسخة الاحتياطية غير صالح أو تالف');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetConfirm = () => {
    resetToDefaults();
    toast.success('تمت استعادة البيانات الافتراضية ومزامنتها سحابياً');
    setIsResetModalOpen(false);
  };

  const handleManualSync = async () => {
    await syncWithCloud();
    toast.success('تمت المزامنة السحابية الفورية بنجاح');
  };

  return (
    <div id="admin-backup-tab" className="space-y-8" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>النسخ الاحتياطي وإدارة قاعدة بيانات Supabase</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          الموقع متصل سحابياً بقاعدة بيانات Supabase ويتم تحديث التغييرات فورياً ولحظياً لجميع الزوار.
        </p>
      </div>

      {/* Supabase Cloud Connection Status Card */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50/40 rounded-3xl border border-blue-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
            <Cloud className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">
                اتصال Supabase السحابي اللحظي
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  cloudSyncStatus === 'connected'
                    ? 'bg-emerald-100 text-emerald-800'
                    : cloudSyncStatus === 'syncing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    cloudSyncStatus === 'connected'
                      ? 'bg-emerald-500 animate-pulse'
                      : cloudSyncStatus === 'syncing'
                      ? 'bg-blue-500 animate-spin'
                      : 'bg-amber-500'
                  }`}
                />
                <span>
                  {cloudSyncStatus === 'connected'
                    ? 'متصل ونشط'
                    : cloudSyncStatus === 'syncing'
                    ? 'جاري المزامنة...'
                    : 'مزامنة احتياطية'}
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono" dir="ltr">
              {SUPABASE_URL}
            </p>
            {lastSyncedAt && (
              <p className="text-[11px] text-slate-400">
                آخر مزامنة ناجحة: {lastSyncedAt.toLocaleTimeString('ar-EG')}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleManualSync}
          disabled={isCloudSyncing}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin text-blue-600' : ''}`} />
          <span>مزامنة فورية الآن</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Backup */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              تصدير نسخة احتياطية (JSON)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              قم بتنزيل ملف يحتوي على كافة الخدمات، معرض الأعمال، الإعدادات العامة، وروابط التواصل لحفظها على جهازك.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>تنزيل النسخة الاحتياطية</span>
          </button>
        </div>

        {/* Import Backup */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              استيراد واستعادة نسخة (JSON)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              اختر ملف JSON سبق تصديره لاستعادة كافة البيانات المحفوظة وتحديث الموقع وقاعدة Supabase على الفور.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>اختيار ملف للاستيراد</span>
          </button>
        </div>

        {/* Reset to Factory Defaults */}
        <div className="col-span-1 md:col-span-2 p-6 bg-rose-50/50 rounded-3xl border border-rose-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-900">
                استعادة البيانات الافتراضية الأصلية
              </h3>
              <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                سيؤدي هذا الإجراء إلى إعادة ضبط كافة البيانات إلى القيم التأسيسية للموقع وحفظها في Supabase.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
          >
            إعادة الضبط
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isResetModalOpen}
        title="تأكيد إعادة الضبط إلى الإعدادات الافتراضية"
        message="هل أنت متأكد من استعادة البيانات الافتراضية؟ سيتم تحديث قاعدة بيانات Supabase."
        confirmLabel="نعم، أعد الضبط"
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
};
