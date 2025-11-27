import React from 'react';
import { NewsArticle, Language, Theme } from '../types';

interface ArticleCardProps {
  article: NewsArticle;
  language: Language;
  theme: Theme;
  className?: string; // Allow parent to inject classes
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, language, theme, className = '' }) => {
  const { headline, subheadline, category, author, location, content, imageUrl, isHero, imageCaption } = article;

  const getText = (obj: any) => {
    if (!obj) return '';
    return obj[language] || obj['en'] || '';
  };

  const titleText = getText(headline);
  const subTitleText = getText(subheadline);
  const categoryText = getText(category);
  const authorText = getText(author);
  const locationText = getText(location);
  const contentText = getText(content);
  const captionText = getText(imageCaption);

  const paragraphs = contentText.split('\n').filter((p: string) => p.trim() !== '');

  // --- MODERN THEME CARD ---
  if (theme === 'modern') {
    return (
      <article className={`flex flex-col h-full bg-white transition-all group ${className}`}>
        {/* Modern: Image first, bold and clean */}
        {imageUrl && (
            <figure className="mb-4 overflow-hidden relative w-full aspect-video md:aspect-auto">
                <img 
                  src={imageUrl} 
                  alt={captionText} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
            </figure>
        )}
        
        <div className="flex flex-col flex-grow px-4 pb-4">
            <div className="mb-3 flex items-center gap-3">
                <span className="bg-black text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wider">{categoryText}</span>
                <span className="text-xs font-modern text-gray-400 font-bold uppercase">{locationText}</span>
            </div>

            <h2 className={`font-modern font-black leading-[0.95] mb-3 text-black tracking-tighter hover:text-gray-700 transition-colors ${isHero ? 'text-4xl md:text-5xl lg:text-7xl' : 'text-xl md:text-2xl'}`}>
            {titleText}
            </h2>

            {subTitleText && isHero && (
            <p className="font-modern font-medium text-xl leading-tight text-gray-500 mb-4">{subTitleText}</p>
            )}

            <div className={`font-modern text-gray-800 leading-relaxed font-normal ${isHero ? 'text-lg md:text-xl mt-2' : 'text-sm mt-auto'}`}>
                {paragraphs.slice(0, isHero ? 4 : 2).map((para, idx) => (
                    <p key={idx} className="mb-3 line-clamp-4">{para}</p>
                ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center opacity-60">
                <span className="text-xs font-bold uppercase">{authorText}</span>
                <span className="text-xs">●</span>
            </div>
        </div>
      </article>
    );
  }

  // --- WIZARD THEME CARD ---
  if (theme === 'wizard') {
    return (
      <article className={`break-inside-avoid mb-8 relative border-[3px] border-[#3e2b15] bg-[#f0e6d2] p-3 shadow-[0_4px_8px_rgba(0,0,0,0.1)] ${className}`}>
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-[3px] border-l-[3px] border-[#3e2b15]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-[3px] border-r-[3px] border-[#3e2b15]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[3px] border-l-[3px] border-[#3e2b15]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[3px] border-r-[3px] border-[#3e2b15]"></div>

        <div className="text-center mb-3 border-b-2 border-[#3e2b15] pb-2 mx-2 border-double">
            <h2 className={`font-wizard font-bold leading-none mb-2 text-[#2a1a08] ${isHero ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>
            {titleText}
            </h2>
        </div>

        {imageUrl && (
            <figure className={`mb-3 border-[3px] border-[#1a1108] p-0.5 bg-[#2a1a08] overflow-hidden relative shadow-lg mx-1`}>
                <div className="wizard-img-container aspect-[4/3]">
                    <img 
                        src={imageUrl} 
                        alt={captionText} 
                        className="wizard-img"
                    />
                </div>
                 <div className="bg-[#2a1a08] text-[#e3d4ad] text-[10px] text-center py-1 font-serif italic tracking-wider">
                    {captionText || "Moving Picture"}
                </div>
            </figure>
        )}

        <div className={`font-serif text-[#2a1a08] leading-snug text-justify px-2 ${isHero ? 'text-lg' : 'text-sm'}`}>
             <div className="flex justify-center mb-2">
                <span className="font-wizard text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                    {locationText}
                </span>
             </div>
             {paragraphs.map((para, idx) => (
            <p key={idx} className={`mb-3 ${idx === 0 ? 'first-letter:font-wizard first-letter:text-5xl first-letter:float-left first-letter:mr-1 first-letter:mt-[-5px]' : ''}`}>
                {para}
            </p>
            ))}
        </div>
      </article>
    );
  }

  // --- CLASSIC THEME CARD (Default) ---
  return (
    <article className={`flex flex-col h-full ${className}`}>
      
      {/* Header Section */}
      <div className="mb-3 px-1">
        <div className="flex justify-between items-center border-b border-black pb-1 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-sans">{categoryText}</span>
            <span className="text-[10px] font-serif italic text-gray-500">{locationText}</span>
        </div>
        <h2 className={`font-display font-bold leading-tight mb-2 text-ink ${isHero ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-xl md:text-2xl'}`}>
          {titleText}
        </h2>
        {subTitleText && (
          <h3 className={`font-serif italic text-gray-800 mb-3 leading-tight ${isHero ? 'text-xl md:text-2xl' : 'text-base'}`}>
            {subTitleText}
          </h3>
        )}
        <div className="text-[10px] font-sans uppercase tracking-wide text-gray-500 mb-3">
          {language === 'en' ? 'By ' : '文 / '} <span className="font-bold text-black">{authorText}</span>
        </div>
      </div>

      {/* Image Section */}
      {imageUrl && (
        <figure className={`mb-4 relative group`}>
            <div className="overflow-hidden border border-black/10">
                <img 
                src={imageUrl} 
                alt={captionText || titleText} 
                className="w-full h-auto object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                style={{ maxHeight: isHero ? '500px' : '250px' }}
                />
            </div>
            {captionText && <figcaption className="text-[10px] font-sans text-gray-500 mt-1 text-right">{captionText}</figcaption>}
        </figure>
      )}

      {/* Content Body */}
      <div className={`font-serif text-gray-900 leading-relaxed text-justify px-1 ${isHero ? 'text-lg columns-1 md:columns-2 gap-6' : 'text-sm'}`}>
        {paragraphs.map((para: string, idx: number) => (
          <p key={idx} className={`mb-3 ${idx === 0 ? 'drop-cap' : ''}`}>
            {para}
          </p>
        ))}
      </div>
    </article>
  );
};