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
  title: string;
  description: string;
  youtubeUrl: string;
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
