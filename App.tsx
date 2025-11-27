import React, { useState, useEffect, useCallback } from 'react';
import { NewspaperHeader } from './components/NewspaperHeader';
import { LayoutGrid } from './components/LayoutGrid';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { fetchDailyNews } from './services/geminiService';
import { NewsArticle, Language, Theme } from './types';

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const [language, setLanguage] = useState<Language>('zh'); 
  const [theme, setTheme] = useState<Theme>('classic');

  const loadNews = useCallback(async () => {
    setIsLoading(true);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const news = await fetchDailyNews(currentDate);
      setArticles(news);
    } catch (err) {
      console.error("Failed to load news", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Dynamic Background classes based on theme
  const getThemeBackground = () => {
    switch (theme) {
        case 'modern': return 'bg-[#f5f5f7]';
        case 'wizard': return 'bg-[#e3d4ad] bg-[url("https://www.transparenttextures.com/patterns/aged-paper.png")]';
        case 'classic': default: return 'bg-paper';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeBackground()} text-ink transition-colors duration-500 ease-in-out`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        
        <NewspaperHeader 
          date={currentDate} 
          onRefresh={loadNews} 
          isLoading={isLoading}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Divider only for classic */}
            {theme === 'classic' && <div className="w-full h-px bg-black mb-8"></div>}
            
            <LayoutGrid 
                articles={articles} 
                theme={theme} 
                language={language} 
            />
          </>
        )}

        <footer className={`mt-16 pt-8 text-center ${theme === 'wizard' ? 'border-t-4 border-double border-[#2a1a08]' : 'border-t border-gray-300'}`}>
            <p className={`text-xs uppercase tracking-widest ${theme === 'modern' ? 'font-modern font-bold' : 'font-sans text-gray-500'}`}>
                {language === 'en' ? "The Daily Chronicle" : "每日纪事报"} © {currentDate.getFullYear()} • Powered by Gemini
            </p>
        </footer>

      </main>
    </div>
  );
};

export default App;