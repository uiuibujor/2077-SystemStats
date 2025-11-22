import { Category, InstallStatus, TechItem, ThemePreset, ThemeColors, Language } from './types';

export const INITIAL_TECH_STACK: TechItem[] = [
  { id: '1', name: 'Node.js', category: Category.RUNTIME, version: 'v20.11.0', status: InstallStatus.INSTALLED },
  { id: '2', name: 'React', category: Category.FRONTEND, version: 'v18.3.1', status: InstallStatus.INSTALLED },
  { id: '3', name: 'Vue.js', category: Category.FRONTEND, version: 'v3.4.0', status: InstallStatus.MISSING },
  { id: '4', name: 'PostgreSQL', category: Category.DATABASE, version: 'v16.1', status: InstallStatus.INSTALLED },
  { id: '5', name: 'MongoDB', category: Category.DATABASE, version: 'v7.0', status: InstallStatus.MISSING },
  { id: '6', name: 'Express', category: Category.BACKEND, version: 'v4.18.2', status: InstallStatus.INSTALLED },
  { id: '7', name: 'NestJS', category: Category.BACKEND, version: 'v10.0.0', status: InstallStatus.MISSING },
  { id: '8', name: 'Docker', category: Category.RUNTIME, version: 'v24.0.0', status: InstallStatus.INSTALLED },
  { id: '9', name: 'Python', category: Category.RUNTIME, version: 'v3.12', status: InstallStatus.INSTALLED },
  { id: '10', name: 'Redis', category: Category.DATABASE, version: 'v7.2', status: InstallStatus.MISSING },
];

// Database for Auto-Detection Simulation
export const TECH_PRESETS: Record<string, { category: Category; version: string }> = {
  // Runtime / Languages
  'Node.js': { category: Category.RUNTIME, version: 'v20.11.0' },
  'Python': { category: Category.RUNTIME, version: 'v3.12.2' },
  'Go': { category: Category.RUNTIME, version: 'v1.22.0' },
  'Rust': { category: Category.RUNTIME, version: 'v1.76.0' },
  'Java': { category: Category.RUNTIME, version: 'v21.0.2' },
  'Docker': { category: Category.RUNTIME, version: 'v25.0.3' },
  'Kubernetes': { category: Category.RUNTIME, version: 'v1.29.2' },

  // Frontend
  'React': { category: Category.FRONTEND, version: 'v18.3.1' },
  'Vue.js': { category: Category.FRONTEND, version: 'v3.4.21' },
  'Angular': { category: Category.FRONTEND, version: 'v17.2.0' },
  'Svelte': { category: Category.FRONTEND, version: 'v4.2.12' },
  'Next.js': { category: Category.FRONTEND, version: 'v14.1.0' },
  'Nuxt': { category: Category.FRONTEND, version: 'v3.10.3' },
  'Tailwind CSS': { category: Category.FRONTEND, version: 'v3.4.1' },
  'TypeScript': { category: Category.FRONTEND, version: 'v5.4.2' },

  // Backend
  'Express': { category: Category.BACKEND, version: 'v4.18.3' },
  'NestJS': { category: Category.BACKEND, version: 'v10.3.3' },
  'Spring Boot': { category: Category.BACKEND, version: 'v3.2.3' },
  'Django': { category: Category.BACKEND, version: 'v5.0.3' },
  'FastAPI': { category: Category.BACKEND, version: 'v0.110.0' },
  'Laravel': { category: Category.BACKEND, version: 'v10.47.0' },
  'ASP.NET Core': { category: Category.BACKEND, version: 'v8.0.2' },

  // Database
  'PostgreSQL': { category: Category.DATABASE, version: 'v16.2' },
  'MySQL': { category: Category.DATABASE, version: 'v8.3.0' },
  'MongoDB': { category: Category.DATABASE, version: 'v7.0.6' },
  'Redis': { category: Category.DATABASE, version: 'v7.2.4' },
  'SQLite': { category: Category.DATABASE, version: 'v3.45.1' },
  'Elasticsearch': { category: Category.DATABASE, version: 'v8.12.2' },
};

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

// Translation Dictionary
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  'zh-CN': {
    // Header
    'app.title': '系统监视中枢',
    'header.subtitle': 'V.2.77 // 黑客接入界面 //',
    'header.signal': '实时信号',
    'header.region': '区域: 夜之城_主网',
    'header.connection': '连接: SECURE_TLS_1.3 (加密)',
    'header.daemon': '守护进程: 活跃',
    
    // Sidebar
    'sidebar.integrity': '系统完整性',
    'sidebar.modules': '模块',
    'sidebar.status.best': '最佳',
    'sidebar.status.unstable': '不稳定',
    'sidebar.hardware': '硬件遥测',
    'sidebar.upload': '上行 (Mb/s)',
    'sidebar.download': '下行 (Mb/s)',
    'sidebar.add_protocol': '+ 注册新组件',
    'sidebar.settings': '系统设置 / 主题',
    'sidebar.filter': '过滤协议',
    'sidebar.filter.all': '全部显示',
    'sidebar.force_install': '强制安装所有组件',
    
    // Cards
    'card.config': '[配置]',
    'card.toggle': '切换状态',
    'card.scan': '运行诊断程序',
    'card.scanning': '正在扫描...',
    'status.installed': '已安装',
    'status.missing': '未检测到',
    'status.corrupted': '损坏',
    'status.pending': '挂起',
    
    // Modal
    'modal.title.add': '接入新协议',
    'modal.title.edit': '编辑组件配置',
    'modal.mode.auto': 'AUTO_SCAN_ACTIVE',
    'modal.mode.manual': 'MANUAL_OVERRIDE',
    'modal.label.name': '目标组件名称',
    'modal.placeholder.name': '输入或选择 (如: React, Python...)',
    'modal.scanner.status': '扫描器状态',
    'modal.scanner.locked': '目标已锁定',
    'modal.scanner.waiting': '等待输入...',
    'modal.scanner.category': '分类识别:',
    'modal.scanner.version': '版本信号:',
    'modal.scanner.install': '安装状态:',
    'modal.scanner.confirmed': '已确认 (INSTALLED)',
    'modal.scanner.nosignal': '[ 无信号 ]',
    'modal.label.comp_name': '组件名称',
    'modal.label.version': '版本号',
    'modal.label.category': '分类',
    'modal.label.status': '当前状态',
    'modal.btn.cancel': '取消',
    'modal.btn.delete': '删除',
    'modal.btn.save': '保存覆写',
    'modal.btn.inject': '执行注入',
    
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
    'log.ready': '系统就绪。等待指令输入。',
    'log.status_change': '状态变更',
    'log.start_scan': '启动深度扫描',
    'log.scan_complete': '扫描完成. 情报已上传。',
    'log.batch_script': '正在执行 PowerShell 批量部署脚本...',
    'log.batch_complete': '批量操作完成。所有系统上线。',
    'log.config_update': '配置已更新',
    'log.new_protocol': '新协议已注册',
    'log.protocol_deleted': '协议已清除',
    'log.visual_reset': '视觉协议重置',
    'log.lang_change': '语言核心变更',
  },
  'en-US': {
    // Header
    'app.title': 'SYSTEM OVERSEER',
    'header.subtitle': 'V.2.77 // NETRUNNER INTERFACE //',
    'header.signal': 'LIVE SIGNAL',
    'header.region': 'REGION: NIGHT_CITY_MAIN',
    'header.connection': 'CONN: SECURE_TLS_1.3 (ENCRYPTED)',
    'header.daemon': 'DAEMON: ACTIVE',
    
    // Sidebar
    'sidebar.integrity': 'SYSTEM INTEGRITY',
    'sidebar.modules': 'MODULES',
    'sidebar.status.best': 'OPTIMAL',
    'sidebar.status.unstable': 'UNSTABLE',
    'sidebar.hardware': 'HARDWARE TELEMETRY',
    'sidebar.upload': 'UPLINK (Mb/s)',
    'sidebar.download': 'DOWNLINK (Mb/s)',
    'sidebar.add_protocol': '+ REGISTER PROTOCOL',
    'sidebar.settings': 'SYSTEM / THEME',
    'sidebar.filter': 'FILTER PROTOCOLS',
    'sidebar.filter.all': 'SHOW ALL',
    'sidebar.force_install': 'FORCE INSTALL ALL',
    
    // Cards
    'card.config': '[CONFIG]',
    'card.toggle': 'TOGGLE STATE',
    'card.scan': 'RUN DIAGNOSTIC',
    'card.scanning': 'SCANNING...',
    'status.installed': 'INSTALLED',
    'status.missing': 'MISSING',
    'status.corrupted': 'CORRUPTED',
    'status.pending': 'PENDING',
    
    // Modal
    'modal.title.add': 'INJECT NEW PROTOCOL',
    'modal.title.edit': 'EDIT COMPONENT CONFIG',
    'modal.mode.auto': 'AUTO_SCAN_ACTIVE',
    'modal.mode.manual': 'MANUAL_OVERRIDE',
    'modal.label.name': 'TARGET COMPONENT',
    'modal.placeholder.name': 'Type or Select (e.g., React, Python...)',
    'modal.scanner.status': 'SCANNER STATUS',
    'modal.scanner.locked': 'TARGET LOCKED',
    'modal.scanner.waiting': 'AWAITING INPUT...',
    'modal.scanner.category': 'CATEGORY ID:',
    'modal.scanner.version': 'VERSION SIG:',
    'modal.scanner.install': 'INSTALL STATE:',
    'modal.scanner.confirmed': 'CONFIRMED (INSTALLED)',
    'modal.scanner.nosignal': '[ NO SIGNAL ]',
    'modal.label.comp_name': 'COMPONENT NAME',
    'modal.label.version': 'VERSION',
    'modal.label.category': 'CATEGORY',
    'modal.label.status': 'CURRENT STATUS',
    'modal.btn.cancel': 'CANCEL',
    'modal.btn.delete': 'DELETE',
    'modal.btn.save': 'OVERWRITE',
    'modal.btn.inject': 'EXECUTE INJECTION',
    
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
    'log.ready': 'System Ready. Awaiting input.',
    'log.status_change': 'STATUS CHANGE',
    'log.start_scan': 'INITIATING DEEP SCAN',
    'log.scan_complete': 'Scan Complete. Intel uploaded.',
    'log.batch_script': 'Executing PowerShell batch deployment script...',
    'log.batch_complete': 'Batch operation complete. All systems online.',
    'log.config_update': 'Config Updated',
    'log.new_protocol': 'New Protocol Registered',
    'log.protocol_deleted': 'Protocol Purged',
    'log.visual_reset': 'Visual Protocol Reset',
    'log.lang_change': 'Language Core Changed',
  }
};