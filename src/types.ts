export interface GlobalSettings {
  displayName?: string; // Display name shown across the site
  heroImage: string; // Base64 Data URL or empty
  bio: string;
  whatsapp: string;
  email: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
  order: number;
}

export interface TopicItem {
  id: string;
  title: string;
  order: number;
}

export interface PortfolioProject {
  id: string;
  serviceType: string; // نوع الخدمة (e.g. إنشاء موقع, مونتاج فيديو ريلز, تصميم هوية بصرية)
  title: string; // عنوان المشروع
  description: string; // نص توضيحي للمشروع
  videoUrl: string; // رابط الفيديو على أي منصة
  youtubeUrl?: string; // للتوافقية السابقة
  externalUrl?: string; // رابط الموقع على النت / الرابط الخارجي (اختياري)
  order: number;
}

export interface SocialLinks {
  instagram: string;
  tiktok: string;
  youtube: string;
  blogger: string;
  x?: string;
  twitter?: string;
}

export interface AboutProject {
  id: string;
  title: string;
  description: string;
  link?: string;
  order: number;
}

export interface InterestTag {
  id: string;
  title: string;
  order: number;
}

export interface AppDataState {
  global_settings: GlobalSettings;
  services: ServiceItem[];
  topics_of_interest: TopicItem[];
  portfolio: PortfolioProject[];
  social_links: SocialLinks;
  about_projects: AboutProject[];
  interests: InterestTag[];
}
