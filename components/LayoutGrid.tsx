import React from 'react';
import { NewsArticle, Theme, Language } from '../types';
import { ArticleCard } from './ArticleCard';

interface LayoutGridProps {
  articles: NewsArticle[];
  theme: Theme;
  language: Language;
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({ articles, theme, language }) => {
  
  // --- WIZARD LAYOUT: Masonry / Columns ---
  // Uses CSS columns to allow items to flow naturally like a Pinterest board or old scrapbook
  if (theme === 'wizard') {
    return (
      <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 p-4">
        {articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            theme={theme} 
            language={language}
          />
        ))}
      </div>
    );
  }

  // --- MODERN LAYOUT: Asymmetrical Grid / Bento Box ---
  // High variance in cell sizes, dense packing
  if (theme === 'modern') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
        {articles.map((article, index) => {
          // Layout logic for Modern theme
          let gridClass = "col-span-1";
          if (article.isHero) {
            gridClass = "md:col-span-2 lg:col-span-2 row-span-2";
          } else if (index === 1 || index === 2) {
             gridClass = "md:col-span-1 row-span-1";
          }
          
          return (
            <div key={article.id} className={`${gridClass} h-full`}>
                <ArticleCard 
                    article={article} 
                    theme={theme} 
                    language={language}
                    className="h-full"
                />
            </div>
          );
        })}
      </div>
    );
  }

  // --- CLASSIC LAYOUT: Structured Newspaper Grid ---
  // Strict columns, vertical dividers
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
      {articles.map((article, index) => {
         // Layout logic for Classic theme
         // Hero takes full width on top or large portion
         let colSpan = "md:col-span-4"; // Default 1/3 width (on 12 col grid)
         
         if (article.isHero) {
            colSpan = "md:col-span-8"; // Hero takes 2/3
         } else if (index === 1) {
            colSpan = "md:col-span-4"; // Secondary top story
         } else {
             colSpan = "md:col-span-3"; // Smaller stories
         }

        return (
            <div key={article.id} className={`${colSpan} relative flex flex-col`}>
                <ArticleCard 
                    article={article} 
                    theme={theme} 
                    language={language}
                />
                {/* Vertical Divider Logic: Add divider to the right of items, except the last in a visual row */}
                {(theme === 'classic' && !article.isHero && (index + 1) % 4 !== 0) && (
                     <div className="hidden lg:block absolute -right-4 top-0 h-full w-px bg-gray-300"></div>
                )}
            </div>
        );
      })}
    </div>
  );
};