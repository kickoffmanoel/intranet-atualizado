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
  DollarSign
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

export function PostLoginDashboard({ onLogout, searchQuery = '', setSearchQuery }: { onLogout: () => void; searchQuery?: string; setSearchQuery?: (query: string) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const docsRef = useRef<HTMLDivElement>(null);
  
  const effectiveSearchQuery = searchQuery || internalSearchQuery;
  const updateSearch = setSearchQuery || setInternalSearchQuery;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (docsRef.current && !docsRef.current.contains(event.target as Node)) {
        setIsDocsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { label: 'RAMAIS', icon: Phone, color: 'text-yellow-600' },
    { label: 'SENAC MAIS.', icon: Globe, color: 'text-yellow-600' },
    { label: 'ASSESSORIA JURÍDICA', icon: Scale, color: 'text-slate-600' },
    { label: 'CIPA', icon: ShieldCheck, color: 'text-yellow-600' },
    { label: 'DOCUMENTOS', icon: FileText, color: 'text-orange-600' },
    { label: 'GPC', icon: Users, color: 'text-purple-600' },
    { label: 'GDI', icon: LayoutGrid, color: 'text-indigo-600' },
    { label: 'DEP', icon: Building2, color: 'text-cyan-600' },
    { label: 'GTI', icon: Settings, color: 'text-slate-700' },
    { label: 'FACULDADE', icon: GraduationCap, color: 'text-blue-800' },
    { label: 'GSI', icon: ShieldCheck, color: 'text-yellow-600' },
    { label: 'GCF', icon: FileText, color: 'text-emerald-600' },
    { label: 'GLC', icon: Briefcase, color: 'text-amber-600' },
    { label: 'DAF', icon: Building2, color: 'text-slate-600' },
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

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col sticky top-0 h-screen z-40`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-blue-900 text-xl tracking-tight">INTRANET</span>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-slate-500"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all group"
              >
                <cat.icon className={`w-5 h-5 shrink-0 ${cat.color} group-hover:scale-110 transition-transform`} />
                {isSidebarOpen && <span className="text-sm font-medium truncate">{cat.label}</span>}
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="text-sm font-semibold">Sair do Sistema</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Buscar por manuais, ramais ou sistemas..." 
                className="pl-10 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-blue-200 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition-colors outline-none">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-800 leading-none">Manoel Rodrigues</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">GTI-Sistemas</p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-blue-100">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">MR</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Perfil Completo
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" /> Contracheque / Férias
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 space-y-8 overflow-y-auto">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Olá, Manoel! 👋</h1>
              <p className="text-slate-500">Bem-vindo de volta à intranet do SENAC PE.</p>
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
                  <LogOut className="w-4 h-4" /> Sair da Intranet
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

          {/* Manual de Procedimentos - Cards Modernos */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="" />
                Manual de Procedimentos
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {manualProcedures.filter(item => 
                item.title.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) || 
                item.category.toLowerCase().includes(effectiveSearchQuery.toLowerCase())
              ).map((item, i) => (
                <Card key={i} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200/60 cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-5 space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{item.category}</p>
                        <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-1 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="px-3 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-medium">Acessar</span>
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
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
