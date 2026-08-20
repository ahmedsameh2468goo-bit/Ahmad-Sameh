import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  AppDataState,
  GlobalSettings,
  ServiceItem,
  TopicItem,
  PortfolioProject,
  SocialLinks,
  AboutProject,
  InterestTag,
} from '../types';
import { supabase, SUPABASE_URL } from '../lib/supabase';

const STORAGE_KEY = 'ahmed_sameh_portfolio_data_v1';
const SUPABASE_TABLE = 'portfolio_data';
const ROW_ID = 'default';

export const INITIAL_DATA: AppDataState = {
  global_settings: {
    displayName: 'أحمد سامح',
    heroImage: '',
    bio: 'صانع محتوى ومطور شغوف بالتقنية والذكاء الاصطناعي وصناعة التجارب الرقمية المميزة وتصميم الأفكار الإبداعية.',
    whatsapp: '201000000000',
    email: 'ahmedsameh2468goo@gmail.com',
  },
  services: [
    {
      id: 'srv-1',
      title: 'مونتاج وصناعة المحتوى المرئي',
      description: 'تحرير وتعديل مقاطع الفيديو بجودة سينمائية وتأثيرات احترافية تناسب مختلف المنصات الرقمية.',
      isVisible: true,
      order: 1,
    },
    {
      id: 'srv-2',
      title: 'تطوير وتصميم الويب',
      description: 'بناء واجهات مستخدم ومواقع ويب حديثة وسريعة ومتجاوبة مع كافة الشاشات وأحدث المعايير.',
      isVisible: true,
      order: 2,
    },
    {
      id: 'srv-3',
      title: 'الهوية البصرية والجرافيك',
      description: 'تصميم هويات بصرية متكاملة وشعارات وتصاميم سوشيال ميديا جذابة ذات طابع ابتكاري.',
      isVisible: true,
      order: 3,
    },
    {
      id: 'srv-4',
      title: 'الذكاء الاصطناعي و Vibe Coding',
      description: 'توظيف تقنيات الذكاء الاصطناعي لبناء حلول سريعة وتطوير مشاريع بأعلى كفاءة وإنتاجية.',
      isVisible: true,
      order: 4,
    },
  ],
  topics_of_interest: [
    { id: 'top-1', title: 'الذكاء الاصطناعي', order: 1 },
    { id: 'top-2', title: 'Vibe Coding', order: 2 },
    { id: 'top-3', title: 'الأنيميشن', order: 3 },
    { id: 'top-4', title: 'التحريك', order: 4 },
    { id: 'top-5', title: 'مكعب الروبيك', order: 5 },
  ],
  portfolio: [
    {
      id: 'port-1',
      title: 'مشروع مونتاج وتأثيرات بصرية سينمائية',
      description: 'استعراض مهارات المونتاج وتعديل الألوان والتأثيرات الصوتية في إنتاج فيديو قصير جذاب.',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      order: 1,
    },
    {
      id: 'port-2',
      title: 'شرح وتطبيق عملي على Vibe Coding',
      description: 'جلسة برمجة تفاعلية باستخدام أدوات الذكاء الاصطناعي لبناء تطبيق ويب في دقائق معدودة.',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      order: 2,
    },
    {
      id: 'port-3',
      title: 'رحلة حل واحتراف مكعب الروبيك في ثوانٍ',
      description: 'فيديو تعليمي وممتع يوضح الخوارزميات والاستراتيجيات السريعة لحل مكعب الروبيك.',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      order: 3,
    },
  ],
  social_links: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
    blogger: 'https://blogger.com',
    x: 'https://x.com',
  },
  about_projects: [],
  interests: [
    { id: 'int-1', title: 'مونتاج الفيديوهات', order: 1 },
    { id: 'int-2', title: 'الهوية البصرية', order: 2 },
    { id: 'int-3', title: 'الجرافيك ديزاين', order: 3 },
    { id: 'int-4', title: 'مكعب الروبيك', order: 4 },
    { id: 'int-5', title: 'Vibe Coding', order: 5 },
    { id: 'int-6', title: 'الفلسفة', order: 6 },
    { id: 'int-7', title: 'الخيال العلمي', order: 7 },
    { id: 'int-8', title: 'ريادة الأعمال', order: 8 },
    { id: 'int-9', title: 'الذكاء الاصطناعي', order: 9 },
    { id: 'int-10', title: 'كتابة القصص والروايات', order: 10 },
    { id: 'int-11', title: 'الأنيميشن والتحريك', order: 11 },
    { id: 'int-12', title: 'صناعة المحتوى', order: 12 },
    { id: 'int-13', title: 'البودكاست', order: 13 },
    { id: 'int-14', title: 'القراءة', order: 14 },
    { id: 'int-15', title: 'التكنولوجيا', order: 15 },
    { id: 'int-16', title: 'الإخراج', order: 16 },
    { id: 'int-17', title: 'الأفلام', order: 17 },
    { id: 'int-18', title: 'المسلسلات', order: 18 },
  ],
};

export type CloudSyncStatus = 'connected' | 'syncing' | 'offline' | 'error' | 'table_missing';

interface DataContextType {
  data: AppDataState;
  cloudSyncStatus: CloudSyncStatus;
  isCloudSyncing: boolean;
  cloudErrorDetails: string | null;
  lastSyncedAt: Date | null;
  syncWithCloud: () => Promise<boolean>;
  updateGlobalSettings: (settings: Partial<GlobalSettings>) => void;
  // Services
  addService: (service: Omit<ServiceItem, 'id' | 'order'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  reorderServices: (fromIndex: number, toIndex: number) => void;
  toggleServiceVisibility: (id: string) => void;
  // Topics
  addTopic: (title: string) => void;
  updateTopic: (id: string, title: string) => void;
  deleteTopic: (id: string) => void;
  reorderTopics: (fromIndex: number, toIndex: number) => void;
  // Portfolio
  addPortfolioProject: (project: Omit<PortfolioProject, 'id' | 'order'>) => void;
  updatePortfolioProject: (id: string, project: Partial<PortfolioProject>) => void;
  deletePortfolioProject: (id: string) => void;
  reorderPortfolio: (fromIndex: number, toIndex: number) => void;
  // Social links
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  // About Projects
  addAboutProject: (project: Omit<AboutProject, 'id' | 'order'>) => void;
  updateAboutProject: (id: string, project: Partial<AboutProject>) => void;
  deleteAboutProject: (id: string) => void;
  // Interests
  addInterest: (title: string) => void;
  updateInterest: (id: string, title: string) => void;
  deleteInterest: (id: string) => void;
  // Backup & Reset
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppDataState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_DATA,
          ...parsed,
          global_settings: {
            ...INITIAL_DATA.global_settings,
            ...(parsed.global_settings || {}),
          },
          social_links: {
            ...INITIAL_DATA.social_links,
            ...(parsed.social_links || {}),
          },
        };
      }
    } catch (e) {
      console.error('Failed to load local data cache', e);
    }
    return INITIAL_DATA;
  });

  const [cloudSyncStatus, setCloudSyncStatus] = useState<CloudSyncStatus>('syncing');
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [cloudErrorDetails, setCloudErrorDetails] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const activeRowIdRef = useRef<string | number>(ROW_ID);

  const dataRef = useRef(data);
  dataRef.current = data;

  // Local storage cache persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to update local storage cache', e);
    }
  }, [data]);

  // Helper to push state to Supabase
  const pushToSupabase = useCallback(async (stateToSave: AppDataState): Promise<boolean> => {
    setIsCloudSyncing(true);
    setCloudSyncStatus('syncing');
    try {
      const targetId = activeRowIdRef.current || ROW_ID;
      const { error } = await supabase.from(SUPABASE_TABLE).upsert(
        {
          id: targetId,
          state: stateToSave,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

      if (error) {
        console.warn('Supabase upsert warning:', error.message);
        if (error.message.includes('schema cache') || error.message.includes('not find') || error.message.includes('relation')) {
          setCloudSyncStatus('table_missing');
          setCloudErrorDetails(`جدول ${SUPABASE_TABLE} غير موجود في قاعدة Supabase. يرجى إنشاء الجدول باستخدام كود SQL الموضح.`);
        } else {
          setCloudSyncStatus('error');
          setCloudErrorDetails(error.message);
        }
        return false;
      } else {
        setCloudSyncStatus('connected');
        setCloudErrorDetails(null);
        setLastSyncedAt(new Date());
        return true;
      }
    } catch (err: any) {
      console.warn('Failed to push to Supabase:', err);
      setCloudSyncStatus('error');
      setCloudErrorDetails(err?.message || 'فشل الاتصال بقاعدة البيانات');
      return false;
    } finally {
      setIsCloudSyncing(false);
    }
  }, []);

  // Fetch data publicly from Supabase for all visitors
  const fetchFromSupabase = useCallback(async (): Promise<boolean> => {
    setIsCloudSyncing(true);
    setCloudSyncStatus('syncing');
    try {
      // 1. Try querying portfolio_data with limit(1) to support any row ID (default, 1, uuid, etc.)
      const { data: rows, error } = await supabase
        .from(SUPABASE_TABLE)
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.warn('Supabase public fetch error:', error.message);
        if (error.message.includes('schema cache') || error.message.includes('not find') || error.message.includes('relation')) {
          setCloudSyncStatus('table_missing');
          setCloudErrorDetails(`جدول ${SUPABASE_TABLE} غير موجود في قاعدة Supabase. يمكنك إنشاؤه بنقرة واحدة من لوحة التحكم.`);
        } else {
          setCloudSyncStatus('offline');
          setCloudErrorDetails(error.message);
        }
        return false;
      }

      if (rows && rows.length > 0) {
        const row = rows[0];
        if (row.id) {
          activeRowIdRef.current = row.id;
        }

        let cloudState: Partial<AppDataState> | null = null;

        if (row.state) {
          cloudState = typeof row.state === 'string' ? JSON.parse(row.state) : row.state;
        } else if (row.displayName || row.bio || row.whatsapp || row.email) {
          // If table was structured with individual columns
          cloudState = {
            global_settings: {
              displayName: row.displayName || row.display_name || INITIAL_DATA.global_settings.displayName,
              heroImage: row.heroImage || row.hero_image || '',
              bio: row.bio || '',
              whatsapp: row.whatsapp || '',
              email: row.email || '',
            },
          };
        }

        if (cloudState) {
          setData((prev) => {
            const merged: AppDataState = {
              ...INITIAL_DATA,
              ...prev,
              ...cloudState,
              global_settings: {
                ...INITIAL_DATA.global_settings,
                ...(prev.global_settings || {}),
                ...(cloudState?.global_settings || {}),
              },
              social_links: {
                ...INITIAL_DATA.social_links,
                ...(prev.social_links || {}),
                ...(cloudState?.social_links || {}),
              },
              services: Array.isArray(cloudState?.services) ? cloudState.services : prev.services,
              portfolio: Array.isArray(cloudState?.portfolio) ? cloudState.portfolio : prev.portfolio,
              topics_of_interest: Array.isArray(cloudState?.topics_of_interest)
                ? cloudState.topics_of_interest
                : prev.topics_of_interest,
              interests: Array.isArray(cloudState?.interests) ? cloudState.interests : prev.interests,
              about_projects: Array.isArray(cloudState?.about_projects)
                ? cloudState.about_projects
                : prev.about_projects,
            };
            return merged;
          });
          setCloudSyncStatus('connected');
          setCloudErrorDetails(null);
          setLastSyncedAt(new Date(row.updated_at || Date.now()));
          return true;
        }
      } else {
        // Table exists but is currently empty. Seed it with the current data.
        await pushToSupabase(dataRef.current);
        setCloudSyncStatus('connected');
        return true;
      }
    } catch (err: any) {
      console.warn('Error during Supabase initial fetch:', err);
      setCloudSyncStatus('offline');
      setCloudErrorDetails(err?.message || 'تعذر جلب البيانات من الخادم السحابي');
      return false;
    } finally {
      setIsCloudSyncing(false);
    }
    return false;
  }, [pushToSupabase]);

  // Initial load & real-time subscription for all clients
  useEffect(() => {
    fetchFromSupabase();

    // Set up Realtime listener so all users see changes immediately
    const channel = supabase
      .channel('portfolio_data_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: SUPABASE_TABLE,
        },
        (payload) => {
          if (payload.new) {
            const rowState = (payload.new as any).state;
            if (rowState) {
              const updatedState =
                typeof rowState === 'string' ? JSON.parse(rowState) : rowState;
              setData((prev) => ({
                ...INITIAL_DATA,
                ...prev,
                ...updatedState,
                global_settings: {
                  ...INITIAL_DATA.global_settings,
                  ...(prev.global_settings || {}),
                  ...(updatedState.global_settings || {}),
                },
                social_links: {
                  ...INITIAL_DATA.social_links,
                  ...(prev.social_links || {}),
                  ...(updatedState.social_links || {}),
                },
                services: Array.isArray(updatedState.services) ? updatedState.services : prev.services,
                portfolio: Array.isArray(updatedState.portfolio) ? updatedState.portfolio : prev.portfolio,
                topics_of_interest: Array.isArray(updatedState.topics_of_interest)
                  ? updatedState.topics_of_interest
                  : prev.topics_of_interest,
                interests: Array.isArray(updatedState.interests) ? updatedState.interests : prev.interests,
                about_projects: Array.isArray(updatedState.about_projects)
                  ? updatedState.about_projects
                  : prev.about_projects,
              }));
              setLastSyncedAt(new Date());
              setCloudSyncStatus('connected');
              setCloudErrorDetails(null);
            }
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setCloudSyncStatus('connected');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchFromSupabase]);

  // Sync state changes to Supabase
  const commitState = (updater: (prev: AppDataState) => AppDataState) => {
    setData((prev) => {
      const next = updater(prev);
      // Asynchronously push to Supabase
      pushToSupabase(next);
      return next;
    });
  };

  const updateGlobalSettings = (newSettings: Partial<GlobalSettings>) => {
    commitState((prev) => ({
      ...prev,
      global_settings: {
        ...prev.global_settings,
        ...newSettings,
      },
    }));
  };

  const addService = (service: Omit<ServiceItem, 'id' | 'order'>) => {
    commitState((prev) => {
      const newService: ServiceItem = {
        ...service,
        id: `srv-${Date.now()}`,
        order: prev.services.length + 1,
      };
      return {
        ...prev,
        services: [...prev.services, newService],
      };
    });
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    commitState((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteService = (id: string) => {
    commitState((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const toggleServiceVisibility = (id: string) => {
    commitState((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s)),
    }));
  };

  const reorderServices = (fromIndex: number, toIndex: number) => {
    commitState((prev) => {
      const items = [...prev.services];
      if (toIndex < 0 || toIndex >= items.length) return prev;
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return {
        ...prev,
        services: items.map((item, idx) => ({ ...item, order: idx + 1 })),
      };
    });
  };

  const addTopic = (title: string) => {
    if (!title.trim()) return;
    commitState((prev) => ({
      ...prev,
      topics_of_interest: [
        ...prev.topics_of_interest,
        { id: `top-${Date.now()}`, title: title.trim(), order: prev.topics_of_interest.length + 1 },
      ],
    }));
  };

  const updateTopic = (id: string, title: string) => {
    if (!title.trim()) return;
    commitState((prev) => ({
      ...prev,
      topics_of_interest: prev.topics_of_interest.map((t) =>
        t.id === id ? { ...t, title: title.trim() } : t
      ),
    }));
  };

  const deleteTopic = (id: string) => {
    commitState((prev) => ({
      ...prev,
      topics_of_interest: prev.topics_of_interest.filter((t) => t.id !== id),
    }));
  };

  const reorderTopics = (fromIndex: number, toIndex: number) => {
    commitState((prev) => {
      const items = [...prev.topics_of_interest];
      if (toIndex < 0 || toIndex >= items.length) return prev;
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return {
        ...prev,
        topics_of_interest: items.map((item, idx) => ({ ...item, order: idx + 1 })),
      };
    });
  };

  const addPortfolioProject = (project: Omit<PortfolioProject, 'id' | 'order'>) => {
    commitState((prev) => ({
      ...prev,
      portfolio: [
        ...prev.portfolio,
        { ...project, id: `port-${Date.now()}`, order: prev.portfolio.length + 1 },
      ],
    }));
  };

  const updatePortfolioProject = (id: string, updated: Partial<PortfolioProject>) => {
    commitState((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deletePortfolioProject = (id: string) => {
    commitState((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => p.id !== id),
    }));
  };

  const reorderPortfolio = (fromIndex: number, toIndex: number) => {
    commitState((prev) => {
      const items = [...prev.portfolio];
      if (toIndex < 0 || toIndex >= items.length) return prev;
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return {
        ...prev,
        portfolio: items.map((item, idx) => ({ ...item, order: idx + 1 })),
      };
    });
  };

  const updateSocialLinks = (links: Partial<SocialLinks>) => {
    commitState((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        ...links,
      },
    }));
  };

  const addAboutProject = (project: Omit<AboutProject, 'id' | 'order'>) => {
    commitState((prev) => ({
      ...prev,
      about_projects: [
        ...prev.about_projects,
        { ...project, id: `abp-${Date.now()}`, order: prev.about_projects.length + 1 },
      ],
    }));
  };

  const updateAboutProject = (id: string, updated: Partial<AboutProject>) => {
    commitState((prev) => ({
      ...prev,
      about_projects: prev.about_projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteAboutProject = (id: string) => {
    commitState((prev) => ({
      ...prev,
      about_projects: prev.about_projects.filter((p) => p.id !== id),
    }));
  };

  const addInterest = (title: string) => {
    if (!title.trim()) return;
    commitState((prev) => ({
      ...prev,
      interests: [
        ...prev.interests,
        { id: `int-${Date.now()}`, title: title.trim(), order: prev.interests.length + 1 },
      ],
    }));
  };

  const updateInterest = (id: string, title: string) => {
    if (!title.trim()) return;
    commitState((prev) => ({
      ...prev,
      interests: prev.interests.map((item) =>
        item.id === id ? { ...item, title: title.trim() } : item
      ),
    }));
  };

  const deleteInterest = (id: string) => {
    commitState((prev) => ({
      ...prev,
      interests: prev.interests.filter((item) => item.id !== id),
    }));
  };

  const exportDataJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        const nextState: AppDataState = {
          ...INITIAL_DATA,
          ...parsed,
          global_settings: {
            ...INITIAL_DATA.global_settings,
            ...(parsed.global_settings || {}),
          },
          social_links: {
            ...INITIAL_DATA.social_links,
            ...(parsed.social_links || {}),
          },
        };
        commitState(() => nextState);
        return true;
      }
    } catch (err) {
      console.error('Import error', err);
    }
    return false;
  };

  const resetToDefaults = () => {
    commitState(() => INITIAL_DATA);
  };

  const syncWithCloud = async (): Promise<boolean> => {
    return await fetchFromSupabase();
  };

  return (
    <DataContext.Provider
      value={{
        data,
        cloudSyncStatus,
        isCloudSyncing,
        cloudErrorDetails,
        lastSyncedAt,
        syncWithCloud,
        updateGlobalSettings,
        addService,
        updateService,
        deleteService,
        reorderServices,
        toggleServiceVisibility,
        addTopic,
        updateTopic,
        deleteTopic,
        reorderTopics,
        addPortfolioProject,
        updatePortfolioProject,
        deletePortfolioProject,
        reorderPortfolio,
        updateSocialLinks,
        addAboutProject,
        updateAboutProject,
        deleteAboutProject,
        addInterest,
        updateInterest,
        deleteInterest,
        exportDataJSON,
        importDataJSON,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

