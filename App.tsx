import React, { useState, useEffect, useCallback } from 'react';
import { GlitchHeader } from './components/GlitchHeader';
import { CyberCard } from './components/CyberCard';
import { Terminal } from './components/Terminal';
import { CyberModal } from './components/CyberModal';
import { SettingsModal } from './components/SettingsModal';
import { INITIAL_TECH_STACK, THEME_PALETTES, TRANSLATIONS } from './constants';
import { Category, InstallStatus, LogEntry, TechItem, ThemePreset, ThemeColors, Language } from './types';
import { analyzeTech } from './services/geminiService';

// Helper for guessing category based on package name
const guessCategory = (name: string): Category => {
  const lower = name.toLowerCase();
  if (['react', 'vue', 'angular', 'svelte', 'next', 'nuxt', 'tailwind', 'bootstrap', 'framer', 'three', 'vite', 'webpack', 'sass', 'less', 'styled', 'typescript'].some(k => lower.includes(k))) return Category.FRONTEND;
  if (['express', 'nest', 'koa', 'fastify', 'socket', 'cors', 'body-parser', 'axios', 'mongoose', 'sequelize', 'prisma', 'node'].some(k => lower.includes(k))) return Category.BACKEND;
  if (['mongo', 'mysql', 'pg', 'postgres', 'redis', 'sqlite', 'mariadb', 'firebase'].some(k => lower.includes(k))) return Category.DATABASE;
  return Category.RUNTIME;
};

const App: React.FC = () => {
  const [techStack, setTechStack] = useState<TechItem[]>(INITIAL_TECH_STACK);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  
  // New State for Theming & Settings
  const [themePreset, setThemePreset] = useState<ThemePreset>(ThemePreset.NETRUNNER);
  const [language, setLanguage] = useState<Language>('zh-CN');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Derived Color & Translation Object
  const colors: ThemeColors = THEME_PALETTES[themePreset];
  const t = TRANSLATIONS[language];
  
  // Hardware Simulation State
  const [cpuLoad, setCpuLoad] = useState(34);
  const [memLoad, setMemLoad] = useState(56);
  const [netStats, setNetStats] = useState({ up: 4.5, down: 120.2, ping: 24 });
  
  // Scanner Modal State
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const isDark = colors.mode === 'dark';

  // Log Helper
  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [
      ...prev, 
      { 
        id: Date.now(), 
        timestamp: new Date().toLocaleTimeString(language === 'zh-CN' ? 'zh-CN' : 'en-US', { hour12: false }), 
        message, 
        type 
      }
    ].slice(-50)); // Keep last 50 logs
  }, [language]);

  // Initial Boot Sequence
  useEffect(() => {
    addLog(t['log.init'], 'system');
    setTimeout(() => addLog(t['log.ready'], 'info'), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Body Background on Theme Change
  useEffect(() => {
    document.body.style.backgroundColor = colors.bg;
    document.body.style.color = colors.text;
  }, [colors]);

  // Hardware Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
        setCpuLoad(prev => {
            const change = Math.random() * 10 - 5;
            const newVal = Math.max(5, Math.min(99, prev + change));
            return Math.round(newVal);
        });
        setMemLoad(prev => {
            const change = Math.random() * 6 - 3;
            const newVal = Math.max(20, Math.min(90, prev + change));
            return Math.round(newVal);
        });
        setNetStats(prev => ({
            up: Math.max(0, parseFloat((prev.up + (Math.random() * 2 - 1)).toFixed(1))),
            down: Math.max(0, parseFloat((prev.down + (Math.random() * 20 - 10)).toFixed(1))),
            ping: Math.max(10, Math.round(prev.ping + (Math.random() * 10 - 5)))
        }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter Logic
  const filteredStack = filter === 'ALL' 
    ? techStack 
    : techStack.filter(item => item.category === filter);

  // Translation for Filter Display
  const getFilterName = (f: string) => {
    if (f === 'ALL') return t['sidebar.filter.all'];
    return f; 
  }

  // -- Handlers --

  const handleAnalyze = async (item: TechItem) => {
    if (analyzingId) return;
    
    setAnalyzingId(item.id);
    addLog(`${t['log.start_scan']}: ${item.name}...`, 'system');
    
    const statusStr = item.status === InstallStatus.INSTALLED ? t['status.installed'] : t['status.missing'];
    const analysisResult = await analyzeTech(item.name, statusStr, language);
    
    setTechStack(prev => prev.map(t => t.id === item.id ? { ...t, description: analysisResult.text } : t));
    
    if (analysisResult.isOffline) {
        addLog(t['log.offline_fallback'], 'warning');
    }
    
    addLog(`${item.name} ${t['log.scan_complete']}`, 'info');
    setAnalyzingId(null);
  };

  // Manifest Parsing Logic
  const handleManifestScan = (jsonString: string) => {
    try {
        const parsed = JSON.parse(jsonString);
        // Handle dependencies and devDependencies
        const deps = { ...parsed.dependencies, ...parsed.devDependencies };
        
        if (Object.keys(deps).length === 0) {
            addLog("Scan Warning: No dependencies found in manifest.", 'warning');
            return;
        }

        const newItems: TechItem[] = Object.entries(deps).map(([name, version], index) => ({
            id: `auto-${Date.now()}-${index}`,
            name: name,
            version: String(version).replace('^', 'v').replace('~', 'v'), // Format version
            category: guessCategory(name),
            status: InstallStatus.INSTALLED
        }));

        setTechStack(newItems);
        
        // Check if it's the demo data
        if (jsonString.includes("react") && jsonString.includes("socket.io")) {
           addLog(t['log.demo_loaded'], 'system');
        } else {
           addLog(t['log.manifest_loaded'], 'system');
        }
        
        addLog(`${t['log.deps_detected']} ${newItems.length}`, 'info');
        setIsScanModalOpen(false);

    } catch (error) {
        console.error(error);
        addLog(t['log.parse_error'], 'error');
    }
  };

  // Widget Base Styles
  const widgetStyle = {
      borderColor: colors.subtext,
      backgroundColor: colors.surface
  };

  const installedCount = techStack.filter(t => t.status === InstallStatus.INSTALLED).length;
  const totalCount = techStack.length;
  const systemHealth = totalCount > 0 ? 100 : 0; // Auto-detect implies present = installed

  return (
    <div className={`min-h-screen pb-20 font-sans transition-colors duration-500`} style={{ backgroundColor: colors.bg, color: colors.text }}>
      
      <div className="relative z-10 container mx-auto max-w-7xl">
        <GlitchHeader colors={colors} language={language} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-6">
          
          {/* Sidebar / Controls */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* System Status Widget */}
            <div className="border p-4 relative overflow-hidden transition-colors duration-300" style={{ borderColor: colors.subtext, backgroundColor: colors.surface }}>
                <h3 className="font-bold mb-2 text-lg tracking-wider" style={{ color: colors.primary }}>{t['sidebar.integrity']}</h3>
                <div className="text-5xl font-black mb-2 mono-font" style={{ color: colors.text }}>
                    {systemHealth}%
                </div>
                <div className="w-full h-2 mt-2" style={{ backgroundColor: `${colors.subtext}30` }}>
                    <div 
                        className="h-full transition-all duration-500 ease-out"
                        style={{ width: `${systemHealth}%`, backgroundColor: colors.secondary, boxShadow: isDark ? `0 0 10px ${colors.secondary}` : 'none' }}
                    ></div>
                </div>
                <div className="mt-4 text-xs flex justify-between" style={{ color: colors.subtext }}>
                    <span>{t['sidebar.modules']}: {installedCount}</span>
                    <span style={{ color: systemHealth === 100 ? colors.primary : colors.error }}>
                        {systemHealth === 100 ? t['sidebar.status.best'] : t['sidebar.status.unstable']}
                    </span>
                </div>
            </div>

            {/* Resource Monitor Widget (CPU/RAM/NET) */}
            <div className="border p-4 transition-colors duration-300" style={widgetStyle}>
                <h3 className="font-bold mb-3 text-xs uppercase tracking-widest" style={{ color: colors.primary }}>{t['sidebar.hardware']}</h3>
                
                {/* CPU */}
                <div className="mb-3">
                    <div className="flex justify-between text-xs mono-font mb-1">
                        <span>CPU_LOAD</span>
                        <span style={{ color: colors.secondary }}>{cpuLoad}%</span>
                    </div>
                    <div className="w-full h-1" style={{ backgroundColor: `${colors.subtext}30` }}>
                        <div className="h-full" style={{ width: `${cpuLoad}%`, backgroundColor: colors.secondary }}></div>
                    </div>
                </div>

                {/* RAM */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs mono-font mb-1">
                        <span>RAM_ALLOC</span>
                        <span style={{ color: colors.primary }}>{memLoad}%</span>
                    </div>
                    <div className="w-full h-1" style={{ backgroundColor: `${colors.subtext}30` }}>
                        <div className="h-full" style={{ width: `${memLoad}%`, backgroundColor: colors.primary }}></div>
                    </div>
                </div>

                {/* NET */}
                <div className="pt-3 border-t" style={{ borderColor: `${colors.subtext}30` }}>
                    <div className="grid grid-cols-2 gap-2">
                         <div className="flex flex-col">
                            <span className="text-[10px] uppercase" style={{ color: colors.subtext }}>{t['sidebar.upload']}</span>
                            <span className="font-mono font-bold" style={{ color: colors.text }}>{netStats.up}</span>
                         </div>
                         <div className="flex flex-col text-right">
                            <span className="text-[10px] uppercase" style={{ color: colors.subtext }}>{t['sidebar.download']}</span>
                            <span className="font-mono font-bold" style={{ color: colors.text }}>{netStats.down}</span>
                         </div>
                    </div>
                    <div className="mt-2 text-[10px] mono-font flex justify-between" style={{ color: colors.subtext }}>
                        <span>PING: {netStats.ping}ms</span>
                        <span className="animate-pulse text-green-500">● ONLINE</span>
                    </div>
                </div>
            </div>

             {/* Main Action: Scan / Import */}
             <button 
                onClick={() => setIsScanModalOpen(true)}
                className="w-full py-3 px-4 font-bold uppercase tracking-widest transition-all border-2 hover:scale-[1.02] group"
                style={{ 
                    borderColor: colors.primary, 
                    color: colors.primary,
                    backgroundColor: 'transparent'
                 }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary; e.currentTarget.style.color = colors.bg }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.primary }}
            >
                <span className="group-hover:animate-pulse">{t['sidebar.scan_system']}</span>
            </button>

            {/* Settings / Theme Button */}
            <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-full py-2 px-4 text-xs font-bold uppercase tracking-widest border hover:opacity-80 transition-all flex justify-between items-center"
                style={{ borderColor: colors.subtext, color: colors.subtext }}
            >
                <span>{t['sidebar.settings']}</span>
                <span className="w-2 h-2" style={{ backgroundColor: colors.primary }}></span>
            </button>

            {/* Filters */}
            <div className="space-y-2">
                <h4 className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: colors.subtext }}>{t['sidebar.filter']}</h4>
                {['ALL', Category.FRONTEND, Category.BACKEND, Category.DATABASE, Category.RUNTIME].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat as any)}
                        className={`w-full text-left px-4 py-2 text-sm font-bold uppercase tracking-wider border-l-2 transition-all`}
                        style={{
                            borderColor: filter === cat ? colors.primary : colors.subtext,
                            backgroundColor: filter === cat ? `${colors.primary}10` : 'transparent',
                            color: filter === cat ? colors.primary : colors.subtext
                        }}
                    >
                        {getFilterName(cat)}
                    </button>
                ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 flex flex-col h-full">
            
            {/* Tech Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {filteredStack.map(item => (
                    <CyberCard 
                        key={item.id} 
                        item={item} 
                        onAnalyze={handleAnalyze}
                        analyzing={analyzingId === item.id}
                        colors={colors}
                        language={language}
                    />
                ))}
                {filteredStack.length === 0 && (
                     <div className="col-span-full text-center py-20 border-2 border-dashed" style={{ borderColor: colors.subtext, color: colors.subtext }}>
                        <h3 className="text-xl font-bold uppercase mb-2">{t['status.missing']}</h3>
                        <p className="text-sm font-mono opacity-70">NO PROTOCOLS DETECTED. INITIATE SCAN.</p>
                     </div>
                )}
            </div>

            {/* Terminal Component */}
            <div className="mt-auto">
                 <Terminal logs={logs} colors={colors} language={language} />
            </div>
          </div>

        </div>
      </div>

      {/* Scanner Modal */}
      <CyberModal 
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScan={handleManifestScan}
        colors={colors}
        language={language}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentTheme={themePreset}
        onThemeChange={(t) => { setThemePreset(t); addLog(`${TRANSLATIONS[language]['log.visual_reset']}: ${t}`, 'system'); }}
        currentLanguage={language}
        onLanguageChange={(l) => { setLanguage(l); addLog(`${TRANSLATIONS[l]['log.lang_change']}: ${l}`, 'system'); }}
        colors={colors}
      />

      {/* Footer Decoration */}
      <div className="fixed bottom-0 w-full h-2 z-50" style={{ backgroundColor: colors.primary }}></div>
      <div className="fixed bottom-0 right-0 p-4 z-50">
         <span className="px-2 py-1 text-xs font-black border" 
            style={{ backgroundColor: colors.bg, color: colors.primary, borderColor: colors.primary }}>
            VER: 3.0.0_{language === 'zh-CN' ? 'CN' : 'EN'}
         </span>
      </div>
    </div>
  );
};

export default App;