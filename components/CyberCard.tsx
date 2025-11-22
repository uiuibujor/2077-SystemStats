import React, { useState } from 'react';
import { InstallStatus, TechItem, ThemeColors, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CyberCardProps {
  item: TechItem;
  onToggle: (id: string) => void;
  onAnalyze: (item: TechItem) => void;
  onEdit: (item: TechItem) => void;
  analyzing: boolean;
  colors: ThemeColors;
  language: Language;
}

export const CyberCard: React.FC<CyberCardProps> = ({ item, onToggle, onAnalyze, onEdit, analyzing, colors, language }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const isInstalled = item.status === InstallStatus.INSTALLED;
  const t = TRANSLATIONS[language];
  
  // Translation helper
  const getStatusText = (status: InstallStatus) => {
    switch(status) {
      case InstallStatus.INSTALLED: return t['status.installed'];
      case InstallStatus.MISSING: return t['status.missing'];
      case InstallStatus.CORRUPTED: return t['status.corrupted'];
      case InstallStatus.PENDING: return t['status.pending'];
      default: return status;
    }
  };

  const handleToggleClick = () => {
    setIsFlashing(true);
    onToggle(item.id);
    setTimeout(() => setIsFlashing(false), 300);
  };

  // Dynamic styles based on installation status
  const cardBorder = isInstalled ? colors.primary : colors.subtext;
  const cardBg = isInstalled ? colors.surface : colors.bg; // Use surface for installed
  const textColor = isInstalled ? colors.text : colors.subtext;

  return (
    <div className={`relative group p-0 transition-all duration-300 hover:scale-[1.02] drop-shadow-md`}>
        {/* Flash Overlay */}
        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${isFlashing ? 'opacity-40 bg-white' : 'opacity-0'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)' }}></div>

        {/* Main Container Shape */}
        <div 
            className="relative w-full h-full min-h-[180px] border-l-4 p-4 flex flex-col justify-between transition-colors duration-300"
            style={{ 
                borderColor: cardBorder,
                backgroundColor: cardBg,
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)' 
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold uppercase tracking-wider" style={{ color: textColor }}>
                    {item.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono border px-1" style={{ color: colors.subtext, borderColor: colors.subtext }}>
                        {item.version}
                    </span>
                    <button 
                        onClick={() => onEdit(item)}
                        className="text-[10px] opacity-50 hover:opacity-100 hover:underline"
                        style={{ color: textColor }}
                    >
                        {t['card.config']}
                    </button>
                </div>
            </div>

            {/* Category Label */}
            <div className="mb-4">
                 <span className="text-xs font-bold px-2 py-0.5 uppercase" 
                    style={{ 
                        backgroundColor: colors.mode === 'dark' ? '#2a2a2a' : '#e0e0e0',
                        color: colors.subtext
                    }}>
                    {item.category}
                 </span>
            </div>

            {/* Status & Controls */}
            <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold mono-font animate-pulse" style={{ color: isInstalled ? colors.primary : colors.error }}>
                        [{getStatusText(item.status)}]
                    </span>
                    
                    <button 
                        onClick={handleToggleClick}
                        className="text-[10px] uppercase tracking-widest transition-colors border-b border-transparent hover:opacity-80"
                        style={{ color: colors.secondary }}
                    >
                        {t['card.toggle']}
                    </button>
                </div>

                {/* Description Area */}
                {item.description && (
                    <div className="mt-2 text-xs mono-font border-t pt-2 italic leading-tight"
                         style={{ color: colors.secondary, borderColor: `${colors.secondary}40` }}>
                        "{item.description}"
                    </div>
                )}

                {/* Analyze Button */}
                {!item.description && (
                    <button
                        onClick={() => onAnalyze(item)}
                        disabled={analyzing}
                        className={`mt-2 w-full py-1 px-2 text-xs font-bold uppercase tracking-widest transition-colors`}
                        style={{ 
                            backgroundColor: analyzing ? colors.subtext : colors.surface,
                            color: analyzing ? colors.bg : colors.text,
                            border: `1px solid ${analyzing ? 'transparent' : colors.text}`,
                            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                            cursor: analyzing ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {analyzing ? t['card.scanning'] : t['card.scan']}
                    </button>
                )}
            </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-2 h-2" style={{ backgroundColor: isInstalled ? colors.primary : colors.subtext }}></div>
        <div className="absolute bottom-0 left-0 w-2 h-2" style={{ backgroundColor: isInstalled ? colors.primary : colors.subtext }}></div>
    </div>
  );
};