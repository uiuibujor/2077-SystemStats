import React, { useEffect, useRef } from 'react';
import { LogEntry, ThemeColors, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface TerminalProps {
  logs: LogEntry[];
  colors: ThemeColors;
  language: Language;
}

export const Terminal: React.FC<TerminalProps> = ({ logs, colors, language }) => {
  const endRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div 
        className="w-full h-64 border-2 relative overflow-hidden flex flex-col mt-4 md:mt-0 transition-colors duration-300"
        style={{ 
            backgroundColor: colors.mode === 'dark' ? '#000' : '#e5e5e5', // Force slightly darker/lighter than main bg for terminal
            borderColor: colors.subtext 
        }}
    >
      {/* Terminal Header */}
      <div className="px-2 py-1 flex justify-between items-center" style={{ backgroundColor: colors.subtext }}>
        <span className="text-[10px] font-bold tracking-widest" style={{ color: colors.bg }}>{t['term.header']}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.error }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs md:text-sm space-y-1 opacity-90">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3">
            <span style={{ color: colors.subtext }}>[{log.timestamp}]</span>
            <span style={{
                color: log.type === 'error' ? colors.error :
                       log.type === 'warning' ? colors.primary :
                       log.type === 'info' ? colors.secondary :
                       colors.text
            }}>
              {log.type.toUpperCase()}: {log.message}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Decorative overlay lines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};