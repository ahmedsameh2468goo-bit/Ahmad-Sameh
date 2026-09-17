export interface GlobalSettings {
  displayName?: string; // Display name shown across the site
  username?: string; // Unified username (e.g., aahmd_saamh)
  tagline?: string; // Custom descriptive tagline under username
  heroImage: string; // Base64 Data URL or URL
  bio: string; // Main Bio / Intro text
  whatsapp: string; // WhatsApp phone number used dynamically for service requests
  email?: string; // Contact email (optional)
  // About Section Fields
  aboutTitle?: string; // Main title (e.g. من هو أحمد سامح؟)
  jobTitle?: string; // Optional job title
  aboutSubtitle?: string; // Subtitle
  philosophyTitle?: string; // Editable philosophy box title
  philosophyDescription?: string; // Editable philosophy box long text
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
  serviceType: string; // نوع الخدمة
  title: string; // عنوان المشروع
  coverImage?: string; // 16:9 widescreen Header Image (1920x1080)
  description: string; // نص توضيحي للمشروع
  videoUrl: string; // رابط الفيديو على أي منصة
  youtubeUrl?: string; // للتوافقية السابقة
  externalUrl?: string; // رابط خارجي اختياري
  order: number;
}

export interface SocialLinks {
  whatsapp?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  x?: string;
  threads?: string;
  kick?: string;
  linkedin?: string;
  // Legacy fields for backward compatibility
  blogger?: string;
  twitter?: string;
}

export interface AboutProject {
  id: string;
  title: string;
  status?: string; // e.g., جاري العمل عليه / مكتمل
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
