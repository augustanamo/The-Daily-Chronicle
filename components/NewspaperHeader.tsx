import React from 'react';
import { Language, Theme } from '../types';

interface NewspaperHeaderProps {
  date: Date;
  onRefresh: () => void;
  isLoading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const NewspaperHeader: React.FC<NewspaperHeaderProps> = ({ 
  date, 
  onRefresh, 
  isLoading, 
  language, 
  setLanguage,
  theme,
  setTheme
}) => {
  const formattedDate = language === 'en' 
    ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  // Translation helpers
  const t = {
    vol: language === 'en' ? "Vol. CXXIV, No. 42,102" : "第124卷 第42,102期",
    price: language === 'en' ? "$1.50" : "¥ 1.50",
    weatherTitle: language === 'en' ? "Weather" : "天气",
    weatherDesc: language === 'en' ? "Clear skies, light breeze." : "晴朗，微风。",
    editionTitle: language === 'en' ? "Edition" : "版本",
    loading: language === 'en' ? "Printing..." : "印刷中...",
    latest: language === 'en' ? "Latest" : "最新",
    refresh: language === 'en' ? "Click to Refresh" : "点击刷新",
    tagline: language === 'en' ? "\"All the News That's Fit to Print — And Nothing Else.\"" : "“刊载一切适宜刊登的新闻——仅此而已。”",
    mobileBtnLoading: language === 'en' ? "Updating..." : "更新中...",
    mobileBtn: language === 'en' ? "Refresh" : "刷新",
    titleClassic: language === 'en' ? "The Daily Chronicle" : "每日纪事报",
    titleModern: language === 'en' ? "DAILY NOW" : "今日新闻",
    titleWizard: language === 'en' ? "The Daily Prophet" : "预言家日报",
    owl: language === 'en' ? "Owls are on the way..." : "猫头鹰正在路上...",
    tech: language === 'en' ? "Syncing to Cloud..." : "云端同步中...",
  };

  // Theme Switcher Component
  const ThemeSwitcher = () => (
    <div className="flex gap-4 text-xs font-bold uppercase tracking-wider items-center justify-center md:justify-end">
        <button onClick={() => setTheme('classic')} className={`${theme === 'classic' ? 'underline decoration-2 underline-offset-4' : 'opacity-50 hover:opacity-100'}`}>Classic</button>
        <button onClick={() => setTheme('modern')} className={`${theme === 'modern' ? 'bg-black text-white px-2 py-1' : 'opacity-50 hover:opacity-100'}`}>Modern</button>
        <button onClick={() => setTheme('wizard')} className={`${theme === 'wizard' ? 'font-wizard text-lg capitalize' : 'opacity-50 hover:opacity-100'}`}>Wizard</button>
    </div>
  );

  // Language Switcher Component
  const LangSwitcher = () => (
    <div className="flex gap-2 font-bold cursor-pointer z-10 text-xs items-center">
        <button 
            onClick={() => setLanguage('en')} 
            className={`${language === 'en' ? 'underline decoration-2' : 'opacity-50 hover:opacity-100'}`}
        >
            EN
        </button>
        <span className="opacity-30">|</span>
        <button 
            onClick={() => setLanguage('zh')} 
            className={`${language === 'zh' ? 'underline decoration-2' : 'opacity-50 hover:opacity-100'}`}
        >
            中文
        </button>
    </div>
  );

  // --- WIZARD THEME HEADER ---
  if (theme === 'wizard') {
    return (
        <header className="w-full mb-12 relative text-[#2a1a08]">
            {/* Top Bar */}
            <div className="flex justify-between items-center py-1 border-b border-[#2a1a08] opacity-80 px-2">
                <LangSwitcher />
                <span className="font-wizard font-bold tracking-widest text-sm">{formattedDate}</span>
                <ThemeSwitcher />
            </div>

            {/* Main Title */}
            <div className="py-6 text-center relative">
                <h1 className="font-wizard font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none animate-pulse">
                    {t.titleWizard}
                </h1>
                
                {/* Decorative Flanking Elements */}
                <div className="hidden md:block absolute top-1/2 left-8 -translate-y-1/2 w-24 h-24 border-4 border-double border-[#2a1a08] rotate-45 flex items-center justify-center">
                    <span className="font-wizard text-3xl -rotate-45"> {language === 'en' ? 'Owl' : '邮'} </span>
                </div>
                <div className="hidden md:block absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 border-4 border-double border-[#2a1a08] rotate-45 flex items-center justify-center">
                    <span className="font-wizard text-3xl -rotate-45"> {language === 'en' ? 'Post' : '局'} </span>
                </div>
            </div>

            {/* Status Bar */}
            <div className="border-t-4 border-b-4 border-double border-[#2a1a08] py-2 flex justify-center items-center gap-8">
                 <button onClick={onRefresh} disabled={isLoading} className="font-wizard text-xl hover:scale-110 transition-transform">
                    {isLoading ? t.owl : t.refresh}
                 </button>
                 <span className="text-2xl">✨</span>
                 <span className="font-wizard font-bold">{t.price} / 5 Knuts</span>
            </div>
        </header>
    );
  }

  // --- MODERN THEME HEADER ---
  if (theme === 'modern') {
    return (
        <header className="w-full mb-8 text-black">
            <div className="flex flex-col md:flex-row justify-between items-center py-4 border-b-4 border-black mb-6">
                <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto justify-between md:justify-start">
                    <h1 className="font-modern font-black text-5xl md:text-6xl tracking-tighter italic">
                        {t.titleModern}
                    </h1>
                    <div className="md:hidden">
                        <ThemeSwitcher />
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                             <ThemeSwitcher />
                        </div>
                        <LangSwitcher />
                    </div>
                    <span className="font-modern font-bold text-sm uppercase bg-black text-white px-2 mt-1">
                        {formattedDate}
                    </span>
                     <button onClick={onRefresh} disabled={isLoading} className="text-xs font-bold uppercase hover:text-red-600 transition-colors mt-1">
                        {isLoading ? t.tech : `● ${t.latest}`}
                     </button>
                </div>
            </div>
        </header>
    );
  }

  // --- CLASSIC THEME HEADER (Default) ---
  return (
    <header className="w-full mb-8">
      {/* Top Meta Bar */}
      <div className="flex justify-between items-center py-2 px-1 border-b-2 border-black text-xs md:text-sm font-sans uppercase tracking-widest relative">
        <div className="flex gap-4">
           <span>{t.vol}</span>
           <span className="hidden sm:inline">{t.price}</span>
        </div>
        <span className="hidden md:block absolute left-1/2 -translate-x-1/2">{formattedDate}</span>
        <div className="flex items-center gap-4">
             <LangSwitcher />
             <ThemeSwitcher />
        </div>
      </div>

      {/* Main Title / Masthead */}
      <div className="py-8 text-center border-b-4 border-double border-black relative">
        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-9xl tracking-tight text-ink scale-y-110">
          {t.titleClassic}
        </h1>
        
        {/* Weather/Ear Piece Left (Hidden on mobile) */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-32 border border-black p-2 text-center rotate-1">
          <h4 className="font-bold uppercase text-xs border-b border-black mb-1">{t.weatherTitle}</h4>
          <p className="font-serif italic text-sm">{t.weatherDesc}</p>
        </div>

        {/* Action/Ear Piece Right */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-32 border border-black p-2 text-center -rotate-1 group cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={onRefresh}>
          <h4 className="font-bold uppercase text-xs border-b border-black group-hover:border-white mb-1">{t.editionTitle}</h4>
          <p className="font-serif italic text-sm">{isLoading ? t.loading : t.latest}</p>
          <p className="font-bold text-xs mt-1 uppercase">{t.refresh}</p>
        </div>
      </div>

      {/* Quote Bar */}
      <div className="flex justify-center items-center py-2 border-b border-black mb-6">
        <p className="font-serif italic text-sm text-gray-600">
          {t.tagline}
        </p>
      </div>

       {/* Mobile Date & Refresh */}
       <div className="md:hidden flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
           <span className="text-xs font-serif italic">{formattedDate}</span>
           <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="bg-black text-paper px-4 py-1 font-serif uppercase tracking-widest text-xs"
           >
             {isLoading ? t.mobileBtnLoading : t.mobileBtn}
           </button>
       </div>
    </header>
  );
};