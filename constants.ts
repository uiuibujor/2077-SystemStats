import { Category, InstallStatus, TechItem, ThemePreset, ThemeColors, Language } from './types';

export const INITIAL_TECH_STACK: TechItem[] = [
  // Keeping a small demo set for the initial "Boot" look, 
  // but user is expected to scan their own.
  { id: '1', name: 'Node.js', category: Category.RUNTIME, version: 'v20.11.0', status: InstallStatus.INSTALLED },
  { id: '2', name: 'React', category: Category.FRONTEND, version: 'v18.3.1', status: InstallStatus.INSTALLED },
  { id: '6', name: 'Express', category: Category.BACKEND, version: 'v4.18.2', status: InstallStatus.INSTALLED },
  { id: '8', name: 'Docker', category: Category.RUNTIME, version: 'v24.0.0', status: InstallStatus.INSTALLED },
];

export const THEME_PALETTES: Record<ThemePreset, ThemeColors> = {
  [ThemePreset.NETRUNNER]: {
    mode: 'dark',
    primary: '#fcee0a', // Cyber Yellow
    secondary: '#00f0ff', // Cyan
    bg: '#050505',
    surface: '#121212',
    text: '#e0e0e0',
    subtext: '#9ca3af',
    border: '#fcee0a',
    error: '#ff003c'
  },
  [ThemePreset.ARASAKA]: {
    mode: 'light',
    primary: '#ff003c', // Danger Red
    secondary: '#000000', // Black
    bg: '#f2f2f2',
    surface: '#ffffff',
    text: '#000000',
    subtext: '#4b5563',
    border: '#000000',
    error: '#ff003c'
  },
  [ThemePreset.MILITECH]: {
    mode: 'dark',
    primary: '#5b8c5a', // Camo Green
    secondary: '#d97706', // Orange
    bg: '#1c1c1c',
    surface: '#2d2d2d',
    text: '#d4d4d4',
    subtext: '#a3a3a3',
    border: '#5b8c5a',
    error: '#ef4444'
  },
  [ThemePreset.NEON_CITY]: {
    mode: 'dark',
    primary: '#d946ef', // Magenta
    secondary: '#8b5cf6', // Violet
    bg: '#0f0720', // Deep Navy
    surface: '#1e1b4b',
    text: '#e9d5ff',
    subtext: '#c4b5fd',
    border: '#d946ef',
    error: '#f43f5e'
  },
  [ThemePreset.MATRIX]: {
    mode: 'dark',
    primary: '#00ff41', // Matrix Green
    secondary: '#008f11', // Darker Green
    bg: '#0d0d0d',
    surface: '#001a00',
    text: '#e0ffde',
    subtext: '#3b633b',
    border: '#00ff41',
    error: '#ff003c'
  },
  [ThemePreset.NOMAD]: {
    mode: 'dark',
    primary: '#e0a664', // Sand
    secondary: '#a2442c', // Rust
    bg: '#1f1a16',
    surface: '#2b241d',
    text: '#eaddcf',
    subtext: '#8c7b6e',
    border: '#e0a664',
    error: '#ef4444'
  },
  [ThemePreset.FROST]: {
    mode: 'dark',
    primary: '#00f0ff', // Ice Blue
    secondary: '#ffffff', // White
    bg: '#0a0e17',
    surface: '#111625',
    text: '#e0faff',
    subtext: '#6b8caf',
    border: '#00f0ff',
    error: '#ff3366'
  }
};

// Offline/Fallback Data
export const STATIC_ANALYSIS_DATA: Record<string, Record<Language, string>> = {
  'react': {
    'zh-CN': '前端核心义体。利用虚拟DOM构建高频响应的UI界面，如同神经反射般迅速。组件化设计允许快速更换受损模块。',
    'en-US': 'Frontend core cyberware. Utilizes Virtual DOM for high-reflex UI responses. Component-based design allows hot-swapping of damaged modules.'
  },
  'node.js': {
    'zh-CN': '服务器端运行时引擎。基于V8的高速处理核心，能够维持大量并发连接，是网络黑客维持长时间潜入的必备基础。',
    'en-US': 'Server-side runtime engine. V8-based high-speed core capable of sustaining massive concurrent connections. Essential for long-duration netruns.'
  },
  'typescript': {
    'zh-CN': '强类型编译协议。为代码注入严格的结构化逻辑，有效防御运行时的数据溢出和逻辑漏洞，属于高级ICE防御层。',
    'en-US': 'Strongly typed compilation protocol. Injects strict structural logic to prevent runtime data overflows. Classified as advanced ICE defense.'
  },
  'docker': {
    'zh-CN': '隔离容器技术。将应用程序封装在独立的微型环境中，防止病毒交叉感染，便于在不同服务器节点间快速部署和撤离。',
    'en-US': 'Isolation container tech. Encapsulates apps in independent micro-environments to prevent cross-infection. Enables rapid deployment and extraction.'
  },
  'mongodb': {
    'zh-CN': '非关系型数据仓库。以文档形式存储海量非结构化情报，查询速度极快，适合处理来自街头监控的杂乱数据流。',
    'en-US': 'NoSQL data warehouse. Stores massive unstructured intel as documents. Blazing fast query speed, perfect for processing chaotic street data.'
  },
  'mysql': {
    'zh-CN': '经典关系型数据库。结构严谨的旧时代遗物，但极其可靠。如同荒坂公司的金库，通过严格的表结构锁定每一位数据。',
    'en-US': 'Classic RDBMS. Structured relic of the old net, but incredibly reliable. Like an Arasaka vault, locking down every bit via strict table structures.'
  },
  'vue': {
    'zh-CN': '渐进式前端框架。轻量级义体，适应性极强。可以像插件一样集成到现有系统中，提供双向数据绑定的即时反馈。',
    'en-US': 'Progressive frontend framework. Lightweight cyberware with high adaptability. Integrates like a plugin for immediate two-way data binding feedback.'
  },
  'express': {
    'zh-CN': '极简后端路由框架。快速构建API通道的骨架工具。没有多余的装饰，只有纯粹的速度和灵活性，适合快速搭建临时中继站。',
    'en-US': 'Minimalist backend routing framework. Skeleton tool for rapid API tunneling. No frills, just pure speed and flexibility for temporary relay stations.'
  }
};

// Translation Dictionary
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  'zh-CN': {
    // Header
    'app.title': '系统监视中枢',
    'header.subtitle': 'V.3.0 // 全自动依赖扫描 //',
    'header.signal': '实时信号',
    'header.region': '区域: 夜之城_主网',
    'header.connection': '连接: SECURE_TLS_1.3 (加密)',
    'header.daemon': '守护进程: 活跃',
    
    // Sidebar
    'sidebar.integrity': '系统完整性',
    'sidebar.modules': '已检测模块',
    'sidebar.status.best': '最佳',
    'sidebar.status.unstable': '不稳定',
    'sidebar.hardware': '硬件遥测',
    'sidebar.upload': '上行 (Mb/s)',
    'sidebar.download': '下行 (Mb/s)',
    'sidebar.scan_system': '扫描系统依赖 (Import)',
    'sidebar.settings': '系统设置 / 主题',
    'sidebar.filter': '过滤协议',
    'sidebar.filter.all': '全部显示',
    
    // Cards
    'card.scan': '分析组件',
    'card.scanning': '正在分析...',
    'status.installed': '已检测',
    'status.missing': '未检测到',
    
    // Modal (Scanner)
    'modal.title.scan': '系统清单扫描',
    'modal.desc.scan': '连接至本地项目环境。上传 package.json 或粘贴依赖清单以进行全自动检测。',
    'modal.dropzone': '拖拽 package.json 到此处 或 点击上传',
    'modal.paste_label': '或直接粘贴 JSON 内容:',
    'modal.placeholder.paste': '{\n  "dependencies": {\n    "react": "^18.2.0",\n    ...\n  }\n}',
    'modal.btn.cancel': '取消连接',
    'modal.btn.process': '执行扫描程序',
    'modal.btn.demo': '模拟本地环境 (演示)',
    'modal.error.json': '错误: 无效的 JSON 格式',
    
    // Terminal
    'term.header': '系统日志 // 诊断信息',
    
    // Settings
    'settings.title': '系统设置 // BIOS',
    'settings.subtitle': '配置你的接入仓视觉协议与语言核心。',
    'settings.theme': '视觉界面主题',
    'settings.lang': '语言核心',
    'settings.lang.cn': '中文 (CN)',
    'settings.lang.en': 'English (US)',
    'settings.warning': '注意: 更改语言可能需要重启神经连接。',
    'settings.kernel': '内核版本:',
    'settings.engine': '渲染引擎:',
    'settings.ai': 'AI 链路:',
    'settings.save': '保存并退出',
    
    // Theme Names
    'theme.netrunner': '夜之城 (默认)',
    'theme.netrunner.desc': '标准的街头黑客界面。高对比度黄色。',
    'theme.arasaka': '荒坂公司',
    'theme.arasaka.desc': '企业级无菌界面。红白黑配色。',
    'theme.militech': '军用科技',
    'theme.militech.desc': '战术野战终端。迷彩绿与橙色警告。',
    'theme.neon': '霓虹恶鬼',
    'theme.neon.desc': '超梦体验风格。合成波紫与粉色。',
    'theme.matrix': '矩阵代码',
    'theme.matrix.desc': '复古控制台风格。纯粹的绿色数据流。',
    'theme.nomad': '流浪者',
    'theme.nomad.desc': '废土生存风格。沙尘、铁锈与旧世界。',
    'theme.frost': '极地协议',
    'theme.frost.desc': '冷酷的加密网络。冰蓝与深空灰。',
    
    // Logs
    'log.init': '正在初始化系统监视器...',
    'log.ready': '系统就绪。等待依赖扫描。',
    'log.start_scan': '启动组件分析',
    'log.scan_complete': '分析完成. 情报已上传。',
    'log.manifest_loaded': 'Manifest清单已加载。',
    'log.deps_detected': '检测到依赖项:',
    'log.parse_error': '清单解析失败: JSON 格式错误',
    'log.visual_reset': '视觉协议重置',
    'log.lang_change': '语言核心变更',
    'log.demo_loaded': '已加载模拟环境数据。',
    'log.offline_fallback': 'AI 链路离线。调用本地情报库。',
  },
  'en-US': {
    // Header
    'app.title': 'SYSTEM OVERSEER',
    'header.subtitle': 'V.3.0 // AUTO-DETECT SCANNER //',
    'header.signal': 'LIVE SIGNAL',
    'header.region': 'REGION: NIGHT_CITY_MAIN',
    'header.connection': 'CONN: SECURE_TLS_1.3 (ENCRYPTED)',
    'header.daemon': 'DAEMON: ACTIVE',
    
    // Sidebar
    'sidebar.integrity': 'SYSTEM INTEGRITY',
    'sidebar.modules': 'DETECTED MODULES',
    'sidebar.status.best': 'OPTIMAL',
    'sidebar.status.unstable': 'UNSTABLE',
    'sidebar.hardware': 'HARDWARE TELEMETRY',
    'sidebar.upload': 'UPLINK (Mb/s)',
    'sidebar.download': 'DOWNLINK (Mb/s)',
    'sidebar.scan_system': 'SCAN DEPENDENCIES (Import)',
    'sidebar.settings': 'SYSTEM / THEME',
    'sidebar.filter': 'FILTER PROTOCOLS',
    'sidebar.filter.all': 'SHOW ALL',
    
    // Cards
    'card.scan': 'ANALYZE COMPONENT',
    'card.scanning': 'ANALYZING...',
    'status.installed': 'DETECTED',
    'status.missing': 'MISSING',
    
    // Modal (Scanner)
    'modal.title.scan': 'SYSTEM MANIFEST SCAN',
    'modal.desc.scan': 'Connect to local project environment. Upload package.json or paste manifest for auto-detection.',
    'modal.dropzone': 'Drop package.json here or Click to Upload',
    'modal.paste_label': 'Or paste JSON content directly:',
    'modal.placeholder.paste': '{\n  "dependencies": {\n    "react": "^18.2.0",\n    ...\n  }\n}',
    'modal.btn.cancel': 'ABORT CONNECTION',
    'modal.btn.process': 'EXECUTE SCAN',
    'modal.btn.demo': 'SIMULATE LOCAL ENV (DEMO)',
    'modal.error.json': 'ERROR: INVALID JSON FORMAT',
    
    // Terminal
    'term.header': 'SYSTEM LOG // DIAGNOSTICS',
    
    // Settings
    'settings.title': 'SETTINGS // BIOS',
    'settings.subtitle': 'Configure your cyberdeck visual protocol and language core.',
    'settings.theme': 'VISUAL INTERFACE THEME',
    'settings.lang': 'LANGUAGE CORE',
    'settings.lang.cn': '中文 (CN)',
    'settings.lang.en': 'English (US)',
    'settings.warning': 'NOTE: Changing language may require neural reboot.',
    'settings.kernel': 'KERNEL VERSION:',
    'settings.engine': 'RENDER ENGINE:',
    'settings.ai': 'AI UPLINK:',
    'settings.save': 'SAVE & EXIT',
    
    // Theme Names
    'theme.netrunner': 'NIGHT CITY (DEFAULT)',
    'theme.netrunner.desc': 'Standard street hacker interface. High contrast yellow.',
    'theme.arasaka': 'ARASAKA CORP',
    'theme.arasaka.desc': 'Corporate sterile interface. Red, white, and black.',
    'theme.militech': 'MILITECH',
    'theme.militech.desc': 'Tactical field terminal. Camo green and orange warnings.',
    'theme.neon': 'NEON DEMON',
    'theme.neon.desc': 'Braindance style. Synthwave purple and pink.',
    'theme.matrix': 'THE MATRIX',
    'theme.matrix.desc': 'Retro console style. Pure green data stream.',
    'theme.nomad': 'NOMAD',
    'theme.nomad.desc': 'Wasteland survival style. Sand, rust, and old world tech.',
    'theme.frost': 'FROST PROTOCOL',
    'theme.frost.desc': 'Cold encrypted network. Ice blue and dark grey.',
    
    // Logs
    'log.init': 'Initializing System Overseer...',
    'log.ready': 'System Ready. Awaiting dependency scan.',
    'log.start_scan': 'INITIATING COMPONENT ANALYSIS',
    'log.scan_complete': 'Analysis Complete. Intel uploaded.',
    'log.manifest_loaded': 'Manifest Loaded Successfully.',
    'log.deps_detected': 'Dependencies Detected:',
    'log.parse_error': 'Manifest Parse Failure: Invalid JSON',
    'log.visual_reset': 'Visual Protocol Reset',
    'log.lang_change': 'Language Core Changed',
    'log.demo_loaded': 'Simulation Environment Loaded.',
    'log.offline_fallback': 'AI Link Offline. Accessing Local Intel DB.',
  }
};