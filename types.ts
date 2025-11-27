export interface LocalizedContent {
  en: string;
  zh: string;
}

export interface NewsArticle {
  id: string;
  headline: LocalizedContent;
  subheadline?: LocalizedContent;
  category: LocalizedContent;
  author: LocalizedContent;
  location: LocalizedContent;
  content: LocalizedContent; // The full text in both languages
  imageUrl?: string;
  imageCaption?: LocalizedContent;
  isHero?: boolean; // Determines if it takes up more space
}

export interface NewsState {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export type Language = 'en' | 'zh';

export type Theme = 'classic' | 'modern' | 'wizard';