import React from 'react';
import { Language, ThemeColors, ThemePreset } from '../types';
import { THEME_PALETTES, TRANSLATIONS } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemePreset;
  onThemeChange: (theme: ThemePreset) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  colors: ThemeColors;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  currentLanguage,
  onLanguageChange,
  colors
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage];

  const presets = [
    { id: ThemePreset.NETRUNNER, label: t['theme.netrunner'], desc: t['theme.netrunner.desc'] },
    { id: ThemePreset.ARASAKA, label: t['theme.arasaka'], desc: t['theme.arasaka.desc'] },
    { id: ThemePreset.MILITECH, label: t['theme.militech'], desc: t['theme.militech.desc'] },
    { id: ThemePreset.NEON_CITY, label: t['theme.neon'], desc: t['theme.neon.desc'] },
    { id: ThemePreset.MATRIX, label: t['theme.matrix'], desc: t['theme.matrix.desc'] },
    { id: ThemePreset.NOMAD, label: t['theme.nomad'], desc: t['theme.nomad.desc'] },
    { id: ThemePreset.FROST, label: t['theme.frost'], desc: t['theme.frost.desc'] },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl p-1"
        style={{ 
            backgroundColor: colors.bg,
            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)' 
        }}
      >
        {/* Border Container */}
        <div className="border-2 p-8 h-full flex flex-col gap-8" style={{ borderColor: colors.primary }}>
            
            {/* Header */}
            <div className="flex justify-between items-start border-b pb-4" style={{ borderColor: colors.secondary }}>
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter" style={{ color: colors.primary }}>
                        {t['settings.title']}
                    </h2>
                    <p className="text-xs font-mono mt-1 opacity-70" style={{ color: colors.text }}>
                        {t['settings.subtitle']}
                    </p>
                </div>
                <button onClick={onClose} className="text-xl font-bold hover:opacity-70" style={{ color: colors.error }}>
                    [X]
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[60vh] pr-2">
                
                {/* Theme Selection */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: colors.text }}>
                        <span className="w-2 h-2" style={{ backgroundColor: colors.secondary }}></span>
                        {t['settings.theme']}
                    </h3>
                    <div className="flex flex-col gap-3">
                        {presets.map((preset) => {
                            const isActive = currentTheme === preset.id;
                            const palette = THEME_PALETTES[preset.id];
                            
                            return (
                                <button
                                    key={preset.id}
                                    onClick={() => onThemeChange(preset.id)}
                                    className={`relative p-3 text-left border transition-all duration-300 group overflow-hidden`}
                                    style={{ 
                                        borderColor: isActive ? colors.primary : colors.subtext,
                                        backgroundColor: isActive ? `${colors.primary}10` : 'transparent'
                                    }}
                                >
                                    <div className="relative z-10 flex justify-between items-center">
                                        <div>
                                            <div className="font-bold font-mono text-sm" style={{ color: isActive ? colors.primary : colors.text }}>
                                                {preset.label}
                                            </div>
                                            <div className="text-[10px] mt-1 opacity-70" style={{ color: colors.subtext }}>
                                                {preset.desc}
                                            </div>
                                        </div>
                                        {/* Color Preview Dots */}
                                        <div className="flex gap-1">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.primary }}></div>
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.bg, border: '1px solid gray' }}></div>
                                        </div>
                                    </div>
                                    
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px] border-transparent" 
                                             style={{ borderTopColor: colors.primary }}></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Language & System */}
                <div className="space-y-8">
                    
                    {/* Language */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: colors.text }}>
                            <span className="w-2 h-2" style={{ backgroundColor: colors.secondary }}></span>
                            {t['settings.lang']}
                        </h3>
                        <div className="flex border p-1" style={{ borderColor: colors.subtext }}>
                            <button 
                                onClick={() => onLanguageChange('zh-CN')}
                                className={`flex-1 py-2 text-xs font-bold uppercase transition-colors`}
                                style={{ 
                                    backgroundColor: currentLanguage === 'zh-CN' ? colors.primary : 'transparent',
                                    color: currentLanguage === 'zh-CN' ? colors.bg : colors.subtext
                                }}
                            >
                                {t['settings.lang.cn']}
                            </button>
                            <button 
                                onClick={() => onLanguageChange('en-US')}
                                className={`flex-1 py-2 text-xs font-bold uppercase transition-colors`}
                                style={{ 
                                    backgroundColor: currentLanguage === 'en-US' ? colors.primary : 'transparent',
                                    color: currentLanguage === 'en-US' ? colors.bg : colors.subtext
                                }}
                            >
                                {t['settings.lang.en']}
                            </button>
                        </div>
                        <p className="text-[10px] font-mono opacity-50" style={{ color: colors.text }}>
                            {t['settings.warning']}
                        </p>
                    </div>

                    {/* System Info */}
                    <div className="p-4 border border-dashed space-y-2" style={{ borderColor: colors.subtext, backgroundColor: `${colors.surface}80` }}>
                        <div className="flex justify-between text-xs font-mono">
                            <span style={{ color: colors.subtext }}>{t['settings.kernel']}</span>
                            <span style={{ color: colors.secondary }}>v2.77.4</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono">
                            <span style={{ color: colors.subtext }}>{t['settings.engine']}</span>
                            <span style={{ color: colors.secondary }}>React 19 Fiber</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono">
                            <span style={{ color: colors.subtext }}>{t['settings.ai']}</span>
                            <span className="text-green-500">Gemini 2.5 Flash</span>
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            onClick={onClose}
                            className="w-full py-3 font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: colors.primary, color: colors.bg }}
                        >
                            {t['settings.save']}
                        </button>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};