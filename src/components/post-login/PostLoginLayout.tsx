import { 
  Search, 
  FileText, 
  BookOpen, 
  User, 
  Settings, 
  Calendar, 
  Lock, 
  LogOut, 
  ChevronRight, 
  LayoutGrid,
  Phone,
  Briefcase,
  Scale,
  ShieldCheck,
  Globe,
  GraduationCap,
  Users,
  FileCheck,
  Building2,
  Languages,
  MoreHorizontal,
  ClipboardCheck,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function PostLoginLayout() {
  const categories = [
    { label: 'SENAC MAIS.', icon: Globe },
    { label: 'ASSESSORIA JURÍDICA', icon: Scale },
    { label: 'CIPA', icon: ShieldCheck },
    { label: 'DOCUMENTOS', icon: FileText },
    { label: 'GERCOM', icon: MessageSquare },
    { label: 'GPC', icon: Users },
    { label: 'GDI', icon: LayoutGrid },
    { label: 'DEP', icon: Building2 },
    { label: 'GTI', icon: Settings },
    { label: 'FACULDADE', icon: GraduationCap },
    { label: 'GSI', icon: ShieldCheck },
    { label: 'GCF', icon: FileCheck },
    { label: 'GLC', icon: Briefcase },
    { label: 'DAF', icon: Building2 },
    { label: 'IDIOMAS', icon: Languages },
    { label: 'OUTROS', icon: MoreHorizontal },
    { label: 'PSG', icon: GraduationCap },
    { label: 'AVALIAÇÃO DE DESEMPENHO', icon: ClipboardCheck },
  ];

  const manualProcedures = [
    'Diretoria de Adm e Finanças',
    'Diretoria de Educação Profissional',
    'Gerência de Tecnologia da Informação',
    'Documentação PDTI/CODETI',
    'Gerência de Licitação e Compras',
    'Gerência de Contabilidade e Finanças',
    'Gerência de Pessoas e Cultura',
    'Gerência de Serviços e Infraestrutura',
    'Conselho Regional',
    'Gerência de Planejamento e Gestão',
    'Unidades Operacionais',
    'Central de Atendimento Senac',
    'Central de Oportunidades do Egresso',
    'Escritório de Inovação'
  ];

  const diarySystems = [
    'Solicitação',
    'Diretor/Gerentes',
    'Prestação',
    'Funcionário',
    'Financeiro',
    'Relatório',
    'Relatório dos Atrasados',
    'Relatório dos Inadimplentes',
    'Sistema'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* Coluna Esquerda - Conteúdo Principal */}
      <div className="lg:col-span-8 space-y-6">
        {/* Boas-vindas e Pesquisa */}
        <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-blue-600" />
              SEJA BEM VINDO À INTRANET
            </CardTitle>
            <p className="text-sm text-slate-600">
              Esta é a página de entrada do nosso ambiente virtual. Utilize os serviços disponíveis abaixo ou na barra de navegação.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Pesquisar ramais</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="Digite o nome ou setor..." className="pl-10" />
                </div>
                <Button className="bg-blue-700 hover:bg-blue-800">
                  PESQUISA DE RAMAIS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentos e Manuais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Documentos cadastrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <select className="w-full p-2 rounded-md border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-teal-500">
                <option>Selecione um documento...</option>
              </select>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                Manual de Procedimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <Accordion type="single" collapsible className="w-full">
                  {manualProcedures.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="border-slate-100">
                      <AccordionTrigger className="text-xs py-2 hover:text-blue-600 text-left">
                        {item}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-slate-500">
                        Conteúdo do manual para {item}...
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Sistemas SIG e SGA */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex flex-col gap-1 bg-white/80 hover:bg-blue-50 border-blue-100 group transition-all">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Acompanhamento</span>
            <span className="text-2xl font-black text-blue-900 group-hover:scale-110 transition-transform">SIG</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-1 bg-white/80 hover:bg-teal-50 border-teal-100 group transition-all">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Sistema de Gestão de Arquivos</span>
            <span className="text-2xl font-black text-teal-900 group-hover:scale-110 transition-transform">SGA</span>
          </Button>
        </div>
      </div>

      {/* Coluna Direita - Perfil e Categorias */}
      <div className="lg:col-span-4 space-y-6">
        {/* Perfil do Usuário */}
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-800 to-blue-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80 flex items-center gap-2">
              <User className="w-4 h-4" />
              PERFIL DO USUÁRIO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">MANOEL RODRIGUES SILVA NETO</h3>
                <p className="text-xs opacity-80">GTI-Sistemas</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 pt-2">
              <button className="text-left text-xs hover:underline flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Salário/férias/calendário pagamentos
              </button>
              <button className="text-left text-xs hover:underline flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Alterar senha da Intranet
              </button>
              <button className="text-left text-xs text-red-300 hover:text-red-200 flex items-center gap-2 font-semibold pt-2">
                <LogOut className="w-3 h-3" /> Sair da Intranet
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Categorias e Setores */}
        <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-800">NAVEGAÇÃO POR SETORES</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="divide-y divide-slate-100">
                {categories.map((cat, i) => (
                  <div key={i}>
                    {cat.label === 'SISTEMA DE DIÁRIAS' ? (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="diarias" className="border-none">
                          <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 hover:no-underline group">
                            <div className="flex items-center gap-3">
                              <cat.icon className="w-4 h-4 text-blue-600" />
                              <span className="text-xs font-bold text-blue-800 group-hover:text-blue-600">{cat.label}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="bg-slate-50/50 px-4 pb-2">
                            <div className="grid grid-cols-1 gap-1 pl-7">
                              {diarySystems.map((sys, j) => (
                                <button key={j} className="text-left text-[11px] py-1 text-slate-600 hover:text-blue-600 hover:underline">
                                  • {sys}
                                </button>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 group transition-colors">
                        <div className="flex items-center gap-3">
                          <cat.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-800">{cat.label}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


