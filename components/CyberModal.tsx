import React, { useState, useEffect } from 'react';
import { Category, InstallStatus, TechItem, ThemeColors, Language } from '../types';
import { TECH_PRESETS, TRANSLATIONS } from '../constants';

interface CyberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: TechItem) => void;
  onDelete: (id: string) => void;
  initialData: TechItem | null;
  colors: ThemeColors;
  language: Language;
}

export const CyberModal: React.FC<CyberModalProps> = ({ isOpen, onClose, onSave, onDelete, initialData, colors, language }) => {
  const isEditMode = !!initialData;
  const isDark = colors.mode === 'dark';
  const t = TRANSLATIONS[language];
  
  // Form State
  const [formData, setFormData] = useState<Partial<TechItem>>({
    name: '',
    version: '',
    category: Category.RUNTIME,
    status: InstallStatus.INSTALLED
  });

  // State for "Add Mode" auto-detection visualization
  const [detectedInfo, setDetectedInfo] = useState<{ category: string; version: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
        setDetectedInfo(null);
      } else {
        setFormData({
            name: '',
            version: '', 
            category: Category.RUNTIME,
            status: InstallStatus.INSTALLED
        });
        setDetectedInfo(null);
      }
    }
  }, [isOpen, initialData]);

  const handleNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
    
    if (!isEditMode) {
      const preset = TECH_PRESETS[name];
      if (preset) {
        setDetectedInfo({ category: preset.category, version: preset.version });
        setFormData(prev => ({ 
            ...prev, 
            name, 
            category: preset.category, 
            version: preset.version,
            status: InstallStatus.INSTALLED 
        }));
      } else {
        if (name.length > 2) {
            const simulatedVersion = `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}.0_beta`;
            setDetectedInfo({ category: '未知协议 (默认: Runtime)', version: simulatedVersion });
            setFormData(prev => ({ 
                ...prev, 
                name, 
                category: Category.RUNTIME, 
                version: simulatedVersion,
                status: InstallStatus.INSTALLED
            }));
        } else {
            setDetectedInfo(null);
        }
      }
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.version) {
      onSave({
        id: initialData ? initialData.id : Date.now().toString(),
        name: formData.name,
        version: formData.version,
        category: formData.category as Category,
        status: formData.status as InstallStatus,
        description: initialData?.description
      });
      onClose();
    }
  };

  // Dynamic Input Style
  const inputStyle = {
      backgroundColor: isDark ? '#1a1a1a' : '#fff',
      borderColor: colors.subtext,
      color: colors.text
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md p-1"
        style={{ 
            backgroundColor: colors.bg,
            clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' 
        }}
      >
        {/* Border Container */}
        <div className="border-2 p-6 h-full" style={{ borderColor: colors.primary }}>
            
            <h2 className="text-2xl font-black uppercase mb-6 flex justify-between items-center" style={{ color: colors.text }}>
                {isEditMode ? t['modal.title.edit'] : t['modal.title.add']}
                <span className="text-xs font-mono animate-pulse" style={{ color: colors.primary }}>
                    {isEditMode ? t['modal.mode.manual'] : t['modal.mode.auto']}
                </span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* MODE: ADD (Simplified) */}
                {!isEditMode && (
                    <div className="space-y-6">
                         <div>
                            <label className="block text-xs font-bold uppercase mb-2" style={{ color: colors.secondary }}>{t['modal.label.name']}</label>
                            <input 
                                list="tech-presets"
                                type="text" 
                                value={formData.name}
                                onChange={e => handleNameChange(e.target.value)}
                                className="w-full p-3 text-lg font-mono border-2 outline-none focus:border-current"
                                style={{ ...inputStyle, borderColor: colors.subtext }}
                                placeholder={t['modal.placeholder.name']}
                                autoFocus
                                required
                            />
                            <datalist id="tech-presets">
                                {Object.keys(TECH_PRESETS).map(key => (
                                    <option key={key} value={key} />
                                ))}
                            </datalist>
                        </div>

                        {/* Auto Detection Display */}
                        <div className="p-4 border border-dashed" style={{ borderColor: colors.subtext, backgroundColor: `${colors.surface}80` }}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-2 h-2 rounded-full ${detectedInfo ? 'animate-ping' : ''}`} 
                                     style={{ backgroundColor: detectedInfo ? '#22c55e' : colors.error }}></div>
                                <span className="text-xs font-bold uppercase" style={{ color: colors.subtext }}>
                                    {t['modal.scanner.status']}: {detectedInfo ? t['modal.scanner.locked'] : t['modal.scanner.waiting']}
                                </span>
                            </div>
                            
                            {detectedInfo ? (
                                <div className="space-y-2 animate-pulse">
                                    <div className="flex justify-between text-sm font-mono">
                                        <span style={{ color: colors.subtext }}>{t['modal.scanner.category']}</span>
                                        <span style={{ color: colors.secondary }}>{detectedInfo.category}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-mono">
                                        <span style={{ color: colors.subtext }}>{t['modal.scanner.version']}</span>
                                        <span style={{ color: colors.primary }}>{detectedInfo.version}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-mono">
                                        <span style={{ color: colors.subtext }}>{t['modal.scanner.install']}</span>
                                        <span className="text-green-500">{t['modal.scanner.confirmed']}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4 text-xs mono-font opacity-50" style={{ color: colors.text }}>
                                    {t['modal.scanner.nosignal']}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* MODE: EDIT (Full Control) */}
                {isEditMode && (
                    <>
                        {/* Name Input */}
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1" style={{ color: colors.secondary }}>{t['modal.label.comp_name']}</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full p-2 text-sm font-mono border outline-none"
                                style={inputStyle}
                                required
                            />
                        </div>

                        {/* Version Input */}
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1" style={{ color: colors.secondary }}>{t['modal.label.version']}</label>
                            <input 
                                type="text" 
                                value={formData.version}
                                onChange={e => setFormData({...formData, version: e.target.value})}
                                className="w-full p-2 text-sm font-mono border outline-none"
                                style={inputStyle}
                                required
                            />
                        </div>

                        {/* Category Select */}
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1" style={{ color: colors.secondary }}>{t['modal.label.category']}</label>
                            <select 
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value as Category})}
                                className="w-full p-2 text-sm font-mono border outline-none"
                                style={inputStyle}
                            >
                                {Object.values(Category).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Select */}
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1" style={{ color: colors.secondary }}>{t['modal.label.status']}</label>
                            <select 
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value as InstallStatus})}
                                className="w-full p-2 text-sm font-mono border outline-none"
                                style={inputStyle}
                            >
                                {Object.values(InstallStatus).map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="flex-1 py-2 text-xs font-bold uppercase border hover:opacity-70 transition-opacity"
                        style={{ borderColor: colors.subtext, color: colors.subtext }}
                    >
                        {t['modal.btn.cancel']}
                    </button>
                    
                    {isEditMode && (
                        <button 
                            type="button" 
                            onClick={() => { onDelete(initialData.id); onClose(); }}
                            className="flex-1 py-2 text-xs font-bold uppercase text-white hover:opacity-80"
                            style={{ backgroundColor: colors.error }}
                        >
                            {t['modal.btn.delete']}
                        </button>
                    )}

                    <button 
                        type="submit" 
                        disabled={!isEditMode && !detectedInfo}
                        className="flex-1 py-2 text-xs font-bold uppercase transition-all hover:opacity-90"
                        style={{ 
                            backgroundColor: (!isEditMode && !detectedInfo) ? colors.subtext : colors.primary,
                            color: colors.bg,
                            opacity: (!isEditMode && !detectedInfo) ? 0.5 : 1,
                            cursor: (!isEditMode && !detectedInfo) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isEditMode ? t['modal.btn.save'] : t['modal.btn.inject']}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};