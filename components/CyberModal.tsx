import React, { useState, useRef } from 'react';
import { ThemeColors, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CyberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (jsonString: string) => void;
  colors: ThemeColors;
  language: Language;
}

export const CyberModal: React.FC<CyberModalProps> = ({ isOpen, onClose, onScan, colors, language }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];
  const isDark = colors.mode === 'dark';

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setJsonInput(event.target.result as string);
          setError(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleProcess = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed || (typeof parsed !== 'object')) {
          throw new Error("Invalid JSON");
      }
      onScan(jsonInput);
      setError(null);
      setJsonInput(''); // Clear on success
    } catch (e) {
      setError(t['modal.error.json']);
    }
  };

  const handleDemo = () => {
    const demoData = {
      dependencies: {
        "react": "^18.3.0",
        "typescript": "^5.0.0",
        "vite": "^5.2.0",
        "tailwindcss": "^3.4.1",
        "three": "^0.160.0",
        "express": "^4.19.0",
        "mongodb": "^6.5.0",
        "socket.io": "^4.7.5"
      }
    };
    onScan(JSON.stringify(demoData));
    setJsonInput('');
  };

  const inputStyle = {
      backgroundColor: isDark ? '#0a0a0a' : '#fff',
      borderColor: colors.subtext,
      color: colors.text
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl p-1"
        style={{ 
            backgroundColor: colors.bg,
            clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' 
        }}
      >
        {/* Border Container */}
        <div className="border-2 p-8 h-full flex flex-col gap-6" style={{ borderColor: colors.primary }}>
            
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2" style={{ color: colors.primary }}>
                    {t['modal.title.scan']}
                </h2>
                <p className="text-sm font-mono opacity-80" style={{ color: colors.text }}>
                    {t['modal.desc.scan']}
                </p>
            </div>

            {/* Dropzone */}
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-all hover:opacity-80 group"
                style={{ 
                    borderColor: colors.secondary,
                    backgroundColor: `${colors.surface}50`
                }}
            >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json"
                    onChange={handleFileUpload}
                />
                <div className="text-4xl mb-4 transition-transform group-hover:scale-110" style={{ color: colors.secondary }}>
                    ⤓
                </div>
                <p className="font-bold uppercase tracking-widest text-sm" style={{ color: colors.text }}>
                    {t['modal.dropzone']}
                </p>
            </div>

            {/* Paste Area */}
            <div className="flex-1">
                <label className="block text-xs font-bold uppercase mb-2" style={{ color: colors.subtext }}>
                    {t['modal.paste_label']}
                </label>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder={t['modal.placeholder.paste']}
                    className="w-full h-32 p-4 font-mono text-xs border outline-none resize-none"
                    style={inputStyle}
                />
                {error && (
                    <p className="text-xs font-bold mt-2 animate-pulse" style={{ color: colors.error }}>
                        {error}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t" style={{ borderColor: `${colors.subtext}30` }}>
                <button 
                    onClick={onClose}
                    className="flex-1 py-3 text-sm font-bold uppercase border hover:opacity-70 transition-opacity"
                    style={{ borderColor: colors.subtext, color: colors.subtext }}
                >
                    {t['modal.btn.cancel']}
                </button>
                
                <button 
                    onClick={handleDemo}
                    className="flex-1 py-3 text-sm font-bold uppercase border transition-all hover:bg-opacity-20"
                    style={{ 
                        borderColor: colors.secondary,
                        color: colors.secondary,
                        backgroundColor: `${colors.secondary}10`
                    }}
                >
                    {t['modal.btn.demo']}
                </button>

                <button 
                    onClick={handleProcess}
                    disabled={!jsonInput.trim()}
                    className="flex-1 py-3 text-sm font-bold uppercase transition-all hover:brightness-110"
                    style={{ 
                        backgroundColor: jsonInput.trim() ? colors.primary : colors.subtext,
                        color: colors.bg,
                        opacity: jsonInput.trim() ? 1 : 0.5,
                        cursor: jsonInput.trim() ? 'pointer' : 'not-allowed'
                    }}
                >
                    {t['modal.btn.process']}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};