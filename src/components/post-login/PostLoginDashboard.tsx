import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  BookOpen, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  LayoutGrid,
  Globe,
  Scale,
  ShieldCheck,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Languages,
  MoreHorizontal,
  ClipboardCheck,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  CreditCard,
  Phone,
  Lightbulb,
  DollarSign,
  Star,
  Moon,
  Sun,
  Clock,
  AlertCircle,
  Zap,
  Type
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';

export function PostLoginDashboard({ onLogout, searchQuery = '', setSearchQuery, textScale = 1, onTextScaleChange }: { onLogout: () => void; searchQuery?: string; setSearchQuery?: (query: string) => void; textScale?: number; onTextScaleChange?: (scale: number) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [showTextSizeMenu, setShowTextSizeMenu] = useState(false);
  const [selectedScale, setSelectedScale] = useState(textScale);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const docsRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const textSizeRef = useRef<HTMLDivElement>(null);
  
  const effectiveSearchQuery = searchQuery || internalSearchQuery;
  const updateSearch = setSearchQuery || setInternalSearchQuery;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (docsRef.current && !docsRef.current.contains(event.target as Node)) {
        setIsDocsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (textSizeRef.current && !textSizeRef.current.contains(event.target as Node)) {
        setShowTextSizeMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sincronizar selectedScale quando textScale prop mudar
  useEffect(() => {
    setSelectedScale(textScale);
  }, [textScale]);

  // Efeito para salvar tema
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Efeito para aplicar escala de texto
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--text-scale', textScale.toString());
    root.style.fontSize = (16 * textScale) + 'px';
  }, [textScale]);

  // Efeito para salvar favoritos
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Simulação de sugestões de busca
  useEffect(() => {
    if (internalSearchQuery.trim()) {
      const query = internalSearchQuery.toLowerCase();
      const allItems = [
        ...manualProcedures.map(p => ({ ...p, type: 'manual' })),
        { title: 'Relatório de Atividades 2025.pdf', category: 'Documentos', type: 'document', icon: FileText },
        { title: 'Documentação PDTI 2025.pdf', category: 'Documentos', type: 'document', icon: FileText },
      ];
      
      const filtered = allItems.filter(item =>
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      ).slice(0, 5);
      
      setSearchSuggestions(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchDropdown(false);
    }
  }, [internalSearchQuery]);

  const categories = [
    { label: 'RAMAIS', icon: Phone, color: 'text-yellow-600' },
    { label: 'SENAC MAIS.', icon: Globe, color: 'text-yellow-600' },
    { label: 'ASSESSORIA JURÍDICA', icon: Scale, color: 'text-yellow-600' },
    { label: 'CIPA', icon: ShieldCheck, color: 'text-yellow-600' },
    { label: 'DOCUMENTOS', icon: FileText, color: 'text-orange-600' },
    { label: 'GPC', icon: Users, color: 'text-purple-600' },
    { label: 'GDI', icon: LayoutGrid, color: 'text-indigo-600' },
    { label: 'DEP', icon: Building2, color: 'text-cyan-600' },
    { label: 'GTI', icon: Settings, color: 'text-yellow-600' },
    { label: 'FACULDADE', icon: GraduationCap, color: 'text-blue-800' },
    { label: 'GSI', icon: ShieldCheck, color: 'text-yellow-600' },
    { label: 'GCF', icon: FileText, color: 'text-emerald-600' },
    { label: 'GLC', icon: Briefcase, color: 'text-amber-600' },
    { label: 'DAF', icon: Building2, color: 'text-yellow-600' },
    { label: 'IDIOMAS', icon: Languages, color: 'text-pink-600' },
    { label: 'PSG', icon: GraduationCap, color: 'text-yellow-600' },
    { label: 'AVALIAÇÃO DE DESEMPENHO', icon: ClipboardCheck, color: 'text-teal-600' },
  ];

  const manualProcedures = [
    { title: 'Diretoria de Adm e Finanças', category: 'Administrativo', icon: Building2 },
    { title: 'Diretoria de Educação Profissional', category: 'Educação', icon: GraduationCap },
    { title: 'Gerência de Tecnologia da Informação', category: 'TI', icon: Settings },
    { title: 'Documentação PDTI/CODETI', category: 'Documentos', icon: FileText },
    { title: 'Gerência de Licitação e Compras', category: 'Suprimentos', icon: Briefcase },
    { title: 'Gerência de Contabilidade e Finanças', category: 'Financeiro', icon: DollarSign },
    { title: 'Gerência de Pessoas e Cultura', category: 'RH', icon: Users },
    { title: 'Gerência de Serviços e Infraestrutura', category: 'Infra', icon: Settings },
    { title: 'Conselho Regional', category: 'Institucional', icon: ShieldCheck },
    { title: 'Gerência de Planejamento e Gestão', category: 'Gestão', icon: LayoutGrid },
    { title: 'Unidades Operacionais', category: 'Operacional', icon: Building2 },
    { title: 'Central de Atendimento Senac', category: 'Atendimento', icon: Users },
    { title: 'Central de Oportunidades do Egresso', category: 'Egresso', icon: FileText },
    { title: 'Escritório de Inovação', category: 'Inovação', icon: Lightbulb },
  ];

  const toggleFavorite = (title: string) => {
    setFavorites(prev => 
      prev.includes(title) 
        ? prev.filter(f => f !== title)
        : [...prev, title]
    );
  };

  const isFavorite = (title: string) => favorites.includes(title);

  const favoritesProcedures = manualProcedures.filter(p => isFavorite(p.title));

  const notifications = [
    { id: 1, type: 'document', title: 'Novo documento: Guia de TI 2025', time: '5 min', icon: FileText },
    { id: 2, type: 'update', title: 'Manual de RH foi atualizado', time: '1 hora', icon: Zap },
    { id: 3, type: 'ramal', title: 'Ramal da GTI alterado: 3456', time: '2 horas', icon: Phone },
    { id: 4, type: 'news', title: 'Novidade: Novo portal de compras', time: '5 horas', icon: AlertCircle },
  ];

  const recentItems = [
    { title: 'Gerência de Tecnologia da Informação', category: 'TI' },
    { title: 'Documentação PDTI/CODETI', category: 'Documentos' },
    { title: 'Gerência de Pessoas e Cultura', category: 'RH' },
  ];

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`}>
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-r transition-all duration-300 flex flex-col z-40 overflow-y-auto`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-blue-900 text-xl tracking-tight" style={{color: '#004A8D'}}>INTRANET</span>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-blue-50'} transition-all group`}
              >
                <cat.icon className={`w-5 h-5 shrink-0 ${cat.color} group-hover:scale-110 transition-transform`} />
                {isSidebarOpen && <span className="text-sm font-medium truncate" style={{color: isDarkMode ? undefined : '#004A8D'}}>{cat.label}</span>}
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 ${isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'} transition-colors`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="text-sm font-semibold">Sair do Sistema</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`h-16 ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300'} backdrop-blur-md border-b flex items-center justify-between px-8 sticky top-0 z-30`}>
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full" ref={searchRef}>
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? '#004A8D' : 'text-slate-400'}`} style={{color: isDarkMode ? undefined : '#004A8D'}} />
              <Input 
                placeholder="Buscar por manuais, ramais ou sistemas..." 
                value={internalSearchQuery}
                onChange={(e) => setInternalSearchQuery(e.target.value)}
                className={`pl-10 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-none placeholder-slate-400'} focus-visible:ring-1 focus-visible:ring-blue-200 w-full`}
              />
              
              {/* Search Suggestions Dropdown */}
              {showSearchDropdown && searchSuggestions.length > 0 && (
                <div className={`absolute top-full left-0 mt-1 w-96 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50`}>
                  <div className="p-2 space-y-1">
                    {searchSuggestions.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setInternalSearchQuery(item.title)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'}`}
                      >
                        <item.icon className="w-4 h-4 text-blue-600" />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{item.title}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Text Size Toggle */}
            <div className="relative" ref={textSizeRef}>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowTextSizeMenu(!showTextSizeMenu)}
                className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
                title="Aumentar tamanho da letra"
              >
                <Type className="w-5 h-5" />
              </Button>

              {showTextSizeMenu && (
                <div className={`absolute top-full right-0 mt-2 rounded-lg shadow-lg p-2 z-50 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} border`}>
                  {[0.9, 1, 1.15, 1.3].map((scale) => {
                    const roundedSelected = Math.round(selectedScale * 100) / 100;
                    const roundedScale = Math.round(scale * 100) / 100;
                    const isSelected = roundedSelected === roundedScale;
                    return (
                      <button
                        key={scale}
                        onClick={() => {
                          setSelectedScale(scale);
                          onTextScaleChange?.(scale);
                          setShowTextSizeMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm rounded transition-colors whitespace-nowrap ${
                          isSelected
                            ? `${isDarkMode ? 'bg-slate-600 text-slate-200 border-2 border-slate-400 font-semibold' : 'bg-white text-slate-700 border-2 border-black font-semibold'}`
                            : `${isDarkMode ? 'text-slate-200 hover:bg-slate-600' : 'text-slate-700 hover:bg-slate-100'}`
                        }`}
                      >
                        {scale === 0.9 ? 'Menor' : scale === 1 ? 'Normal' : scale === 1.15 ? 'Grande' : 'Muito Grande'}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative" ref={notifRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className={`absolute top-full right-0 mt-2 w-96 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50`}>
                  <div className={`p-4 border-b ${isDarkMode ? 'border-slate-600' : 'border-slate-100'} font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    Notificações
                  </div>
                  <div className="p-2 space-y-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-50'} cursor-pointer`}
                      >
                        <notif.icon className={`w-4 h-4 mt-1 flex-shrink-0 ${
                          notif.type === 'document' ? 'text-blue-600' :
                          notif.type === 'update' ? 'text-yellow-600' :
                          notif.type === 'ramal' ? 'text-green-600' :
                          'text-purple-600'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{notif.title}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className={`h-8 w-px ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'} mx-2`}></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-3 pl-2 pr-1 py-1 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} transition-colors outline-none`}>
                  <div className="text-right hidden sm:block">
                    <p className={`text-sm font-bold leading-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Manoel Rodrigues</p>
                    <p className={`text-[10px] mt-1 uppercase font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>GTI-Sistemas</p>
                  </div>
                  <Avatar className={`h-9 w-9 border-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-600 text-white text-xs font-black">MR</AvatarFallback>
                  </Avatar>
                  <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`w-56 ${isDarkMode ? 'bg-slate-700 border-slate-600' : ''}`}>
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Perfil Completo
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" /> Contracheque
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600 cursor-pointer">
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className={`p-6 space-y-6 overflow-y-auto border border-slate-300 m-4 rounded-lg ${isDarkMode ? 'bg-slate-900 border-slate-600' : 'bg-slate-100'}`}>
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Olá, Manoel! 👋</h1>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Bem-vindo de volta à intranet do SENAC PE.</p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="flex gap-2 items-center relative" ref={docsRef}>
                <Button size="sm" variant="outline" className="gap-2" onClick={() => setIsDocsOpen(!isDocsOpen)}>
                  <FileText className="w-4 h-4" /> Documentos cadastrados
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <CreditCard className="w-4 h-4" /> Salário/férias/calendário pagamentos
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" /> Alterar senha da Intranet
                </Button>
                <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700" onClick={onLogout}>
                  <LogOut className="w-4 h-4" /> Sair do Intranet
                </Button>
                
                {isDocsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-3 space-y-2 z-50">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <FileText className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-semibold text-slate-600 uppercase">Documentos Cadastrados</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Filtrar documentos..."
                      value={internalSearchQuery}
                      onChange={(e) => setInternalSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group" style={{display: internalSearchQuery && !'Relatório de Atividades 2025.pdf'.toLowerCase().includes(internalSearchQuery.toLowerCase()) ? 'none' : 'flex'}}>
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">Relatório de Atividades 2025.pdf</p>
                        <p className="text-xs text-slate-500">2.4 MB • 12/01/2026</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group" style={{display: internalSearchQuery && !'Documentação PDTI 2025.pdf'.toLowerCase().includes(internalSearchQuery.toLowerCase()) ? 'none' : 'flex'}}>
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">Documentação PDTI 2025.pdf</p>
                        <p className="text-xs text-slate-500">1.8 MB • 10/01/2026</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Acessados Recentemente Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                <Clock className="w-5 h-5" />
                Acessados Recentemente
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentItems.map((item, i) => {
                const fullItem = manualProcedures.find(p => p.title === item.title);
                return (
                  <Card 
                    key={i} 
                    className={`group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700' 
                        : 'border-slate-200/60'
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                            {fullItem && <fullItem.icon className="w-4 h-4" />}
                          </div>
                          <button
                            onClick={() => toggleFavorite(item.title)}
                            className="text-yellow-500 hover:scale-125 transition-transform"
                          >
                            <Star 
                              className={`w-4 h-4 ${isFavorite(item.title) ? 'fill-yellow-500' : ''}`}
                            />
                          </button>
                        </div>
                        <div>
                          <p className={`text-[9px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} style={{color: isDarkMode ? undefined : '#004A8D'}}>{item.category}</p>
                          <h3 className={`font-semibold text-sm mt-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Meus Favoritos Section */}
          {favoritesProcedures.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  <Star className="text-yellow-500 fill-yellow-500" />
                  Meus Favoritos
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favoritesProcedures.map((item, i) => (
                  <Card 
                    key={i} 
                    className={`group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border-yellow-300 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-2 hover:border-yellow-400' 
                        : 'border-2 hover:border-yellow-400'
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 ${isDarkMode ? 'bg-blue-900/30 group-hover:bg-blue-600 group-hover:text-white' : 'bg-blue-50 group-hover:bg-blue-600 group-hover:text-white'} transition-colors`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <button
                            onClick={() => toggleFavorite(item.title)}
                            className="text-yellow-500 hover:scale-125 transition-transform"
                          >
                            <Star className="w-5 h-5 fill-yellow-500" />
                          </button>
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} style={{color: isDarkMode ? undefined : '#004A8D'}}>{item.category}</p>
                          <h3 className={`font-bold text-sm mt-1 line-clamp-1 transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-700'}`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div className={`px-3 py-3 flex items-center justify-between ${isDarkMode ? 'bg-slate-700/50 border-t border-slate-700' : 'bg-slate-50 border-t border-slate-100'}`}>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Acessar</span>
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        </div>
                        <ExternalLink className={`w-3 h-3 transition-colors ${isDarkMode ? 'text-slate-500 group-hover:text-yellow-400' : 'text-slate-400 group-hover:text-yellow-600'}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Manual de Procedimentos - Cards Modernos */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                <BookOpen className="" />
                Manual de Procedimentos
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {manualProcedures.filter(item => 
                item.title.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) || 
                item.category.toLowerCase().includes(effectiveSearchQuery.toLowerCase())
              ).map((item, i) => (
                <Card 
                  key={i} 
                  className={`group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 hover:border-blue-600' 
                      : 'border-slate-200/60'
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 ${isDarkMode ? 'bg-blue-900/30 group-hover:bg-blue-600 group-hover:text-white' : 'bg-blue-50 group-hover:bg-blue-600 group-hover:text-white'} transition-colors`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <button
                          onClick={() => toggleFavorite(item.title)}
                          className="text-yellow-500 hover:scale-125 transition-transform"
                        >
                          <Star 
                            className={`w-5 h-5 ${isFavorite(item.title) ? 'fill-yellow-500' : ''}`}
                          />
                        </button>
                      </div>
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} style={{color: isDarkMode ? undefined : '#003D82'}}>{item.category}</p>
                        <h3 className={`font-bold text-sm mt-1 line-clamp-1 transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-700'}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className={`px-3 py-3 flex items-center justify-between ${isDarkMode ? 'bg-slate-700/50 border-t border-slate-700' : 'bg-slate-50 border-t border-slate-100'}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Acessar</span>
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      </div>
                      <ExternalLink className={`w-3 h-3 transition-colors ${isDarkMode ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-400 group-hover:text-blue-600'}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
