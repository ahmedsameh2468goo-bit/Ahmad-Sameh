import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Settings,
  Layers,
  Sparkles,
  Film,
  Share2,
  FolderGit2,
  Database,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  UserCheck,
  Cloud,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { GlobalSettingsTab } from './tabs/GlobalSettingsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { TopicsTab } from './tabs/TopicsTab';
import { PortfolioTab } from './tabs/PortfolioTab';
import { SocialsTab } from './tabs/SocialsTab';
import { AboutProjectsTab } from './tabs/AboutProjectsTab';
import { BackupTab } from './tabs/BackupTab';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cloudSyncStatus, isCloudSyncing, syncWithCloud, lastSyncedAt } = useData();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<
    'settings' | 'services' | 'topics' | 'portfolio' | 'socials' | 'about_projects' | 'backup'
  >('settings');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Add noindex nofollow
    let metaRobots = document.querySelector("meta[name='robots']");
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.info('تم تسجيل الخروج بنجاح');
    navigate('/admin/login', { replace: true });
  };

  const handleManualSync = async () => {
    await syncWithCloud();
    toast.success('تمت المزامنة مع قاعدة بيانات Supabase بنجاح');
  };

  const navTabs = [
    { id: 'settings', label: 'الإعدادات العامة', icon: Settings },
    { id: 'services', label: 'الخدمات', icon: Layers },
    { id: 'topics', label: 'الموضوعات والاهتمامات', icon: Sparkles },
    { id: 'portfolio', label: 'معرض الأعمال', icon: Film },
    { id: 'socials', label: 'حساباتي', icon: Share2 },
    { id: 'about_projects', label: 'مشاريع عني أكثر', icon: FolderGit2 },
    { id: 'backup', label: 'النسخ الاحتياطي والبيانات', icon: Database },
  ] as const;

  return (
    <div id="admin-dashboard" className="min-h-screen bg-slate-100 flex flex-col md:flex-row" dir="rtl">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <span className="font-black text-slate-900">لوحة التحكم</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-white border-l border-slate-200 flex flex-col justify-between p-6 transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Admin Header / User profile badge */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shadow-md shadow-blue-600/20">
                AS
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-sm">Ahmed Sameh</h1>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  <span>مشرف مسجل</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Supabase Realtime Status Pill */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-blue-600" />
                <span>قاعدة Supabase</span>
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  cloudSyncStatus === 'connected'
                    ? 'bg-emerald-100 text-emerald-700'
                    : cloudSyncStatus === 'syncing'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    cloudSyncStatus === 'connected'
                      ? 'bg-emerald-500 animate-pulse'
                      : cloudSyncStatus === 'syncing'
                      ? 'bg-blue-500 animate-spin'
                      : 'bg-amber-500'
                  }`}
                />
                <span>
                  {cloudSyncStatus === 'connected'
                    ? 'متصل ولحظي'
                    : cloudSyncStatus === 'syncing'
                    ? 'جاري المزامنة'
                    : 'محلي / احتياطي'}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleManualSync}
              disabled={isCloudSyncing}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:text-blue-600 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isCloudSyncing ? 'animate-spin text-blue-600' : ''}`} />
              <span>مزامنة سحابية الآن</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" id="admin-nav-tabs">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  id={`admin-tab-btn-${tab.id}`}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all text-right cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-100 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <span>زيارة الموقع المباشر</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            id="admin-logout-btn"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <span>تسجيل الخروج</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-5xl mx-auto w-full">
        {activeTab === 'settings' && <GlobalSettingsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'topics' && <TopicsTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'socials' && <SocialsTab />}
        {activeTab === 'about_projects' && <AboutProjectsTab />}
        {activeTab === 'backup' && <BackupTab />}
      </main>
    </div>
  );
};
