import React from 'react';
import { Language, ThemeColors } from '../types';
import { TRANSLATIONS } from '../constants';

interface GlitchHeaderProps {
  colors: ThemeColors;
  language: Language;
}

export const GlitchHeader: React.FC<GlitchHeaderProps> = ({ colors, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <header 
        className={`relative w-full p-6 mb-8 border-b-2 transition-colors duration-300`}
        style={{ 
            borderColor: colors.primary, 
            backgroundColor: colors.bg 
        }}
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 
            className={`text-5xl font-black uppercase tracking-tighter glitch-text`} 
            style={{ 
                color: colors.primary,
                textShadow: `2px 2px 0px ${colors.mode === 'dark' ? '#000' : colors.error}` 
            }}
          >
            {t['app.title']}
          </h1>
          <p className={`tracking-widest text-sm mt-1 font-bold`} style={{ color: colors.secondary }}>
            {t['header.subtitle']} <span className="animate-pulse" style={{ color: colors.error }}>{t['header.signal']}</span>
          </p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs mono-font" style={{ color: colors.subtext }}>{t['header.region']}</div>
          <div className="text-xs mono-font" style={{ color: colors.subtext }}>{t['header.connection']}</div>
          <div className="text-xs mono-font mt-1 font-bold" style={{ color: colors.primary }}>{t['header.daemon']}</div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ backgroundColor: colors.primary, clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
      <div className="absolute bottom-[-6px] left-[20%] w-4 h-4" style={{ backgroundColor: colors.primary }}></div>
      <div className="absolute bottom-[-6px] left-[22%] w-24 h-1" style={{ backgroundColor: colors.secondary }}></div>
    </header>
  );
};