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
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'ahmed_sameh_portfolio_data_v1';
const SUPABASE_TABLE = 'portfolio_data';
const ROW_ID = 'default';

export const INITIAL_DATA: AppDataState = {
  global_settings: {
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

export type CloudSyncStatus = 'connected' | 'syncing' | 'offline' | 'error';

interface DataContextType {
  data: AppDataState;
  cloudSyncStatus: CloudSyncStatus;
  isCloudSyncing: boolean;
  lastSyncedAt: Date | null;
  syncWithCloud: () => Promise<void>;
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
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const isInitialMount = useRef(true);
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
  const pushToSupabase = useCallback(async (stateToSave: AppDataState) => {
    setIsCloudSyncing(true);
    setCloudSyncStatus('syncing');
    try {
      const { error } = await supabase.from(SUPABASE_TABLE).upsert(
        {
          id: ROW_ID,
          state: stateToSave,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

      if (error) {
        console.warn('Supabase upsert warning:', error.message);
        setCloudSyncStatus('offline');
      } else {
        setCloudSyncStatus('connected');
        setLastSyncedAt(new Date());
      }
    } catch (err) {
      console.warn('Failed to push to Supabase:', err);
      setCloudSyncStatus('offline');
    } finally {
      setIsCloudSyncing(false);
    }
  }, []);

  // Fetch initial data from Supabase and set up real-time subscription
  const fetchFromSupabase = useCallback(async () => {
    setIsCloudSyncing(true);
    setCloudSyncStatus('syncing');
    try {
      const { data: row, error } = await supabase
        .from(SUPABASE_TABLE)
        .select('*')
        .eq('id', ROW_ID)
        .maybeSingle();

      if (error) {
        console.warn('Supabase initial fetch warning:', error.message);
        setCloudSyncStatus('offline');
      } else if (row && row.state) {
        const cloudState = typeof row.state === 'string' ? JSON.parse(row.state) : row.state;
        setData((prev) => ({
          ...prev,
          ...cloudState,
          global_settings: {
            ...INITIAL_DATA.global_settings,
            ...(cloudState.global_settings || {}),
          },
          social_links: {
            ...INITIAL_DATA.social_links,
            ...(cloudState.social_links || {}),
          },
        }));
        setCloudSyncStatus('connected');
        setLastSyncedAt(new Date(row.updated_at || Date.now()));
      } else {
        // Row doesn't exist yet, seed it with current data
        await pushToSupabase(dataRef.current);
      }
    } catch (err) {
      console.warn('Error during Supabase initial fetch:', err);
      setCloudSyncStatus('offline');
    } finally {
      setIsCloudSyncing(false);
    }
  }, [pushToSupabase]);

  // Initial load & real-time subscription
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
          if (payload.new && (payload.new as any).id === ROW_ID) {
            const rowState = (payload.new as any).state;
            if (rowState) {
              const updatedState =
                typeof rowState === 'string' ? JSON.parse(rowState) : rowState;
              setData((prev) => ({
                ...prev,
                ...updatedState,
                global_settings: {
                  ...INITIAL_DATA.global_settings,
                  ...(updatedState.global_settings || {}),
                },
                social_links: {
                  ...INITIAL_DATA.social_links,
                  ...(updatedState.social_links || {}),
                },
              }));
              setLastSyncedAt(new Date());
              setCloudSyncStatus('connected');
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

  // Sync state changes to Supabase (after initial mount)
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

  const syncWithCloud = async () => {
    await fetchFromSupabase();
  };

  return (
    <DataContext.Provider
      value={{
        data,
        cloudSyncStatus,
        isCloudSyncing,
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
