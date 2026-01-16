import { SectorCard } from './SectorCard';
import { 
  Users, 
  FileText, 
  Laptop, 
  MessageSquare,
} from 'lucide-react';

const sectors = [
  {
    title: 'Pessoas & Educação',
    icon: <Users className="w-6 h-6" />,
    color: 'from-slate-600 to-slate-700',
    systems: [
      // RH
      { title: 'Portal RH', icon: '👥', color: '', url: '#' },
      { title: 'Auxílio Creche', icon: '👶', color: 'from-pink-500 to-pink-600', url: '#' },
      { title: 'Contratação de Instrutores', icon: '👔', color: 'from-blue-500 to-blue-600', url: '#' },
      { title: 'Termo Compromisso', icon: '📄', color: '', url: '#' },
      // Acadêmico
      { title: 'Gestão Faculdade Senac', icon: '🎓', color: 'from-blue-500 to-blue-600', url: '#' },
      { title: 'Acompanhamento Vestibular', icon: '📊', color: '', url: '#' },
      { title: 'Matrículas Jovem Aprendiz', icon: '👨‍🎓', color: 'from-indigo-500 to-indigo-600', url: '#' },
      { title: 'Acompanhamento do Aluno', icon: '📚', color: '', url: '#' },
      { title: 'Produção Faculdade', icon: '🎯', color: 'from-violet-500 to-violet-600', url: '#' },
      { title: 'Histórico Acadêmico', icon: '📋', color: '', url: '#' },
      { title: 'Relatório Desempenho Alunos', icon: '📈', color: '', url: '#' },
      { title: 'Matrículas de PCD e Transtornos - 2025', icon: '♿', color: 'from-blue-500 to-blue-600', url: '#' },
      { title: 'Plano Educacional Individual', icon: '📝', color: 'from-purple-500 to-purple-600', url: '#' },
      { title: 'Agendamento Psicopedagógico', icon: '🧠', color: '', url: '#' },
    ]
  },
  {
    title: 'Gestão & Administração',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-slate-600 to-slate-700',
    systems: [
      // Administrativo
      { title: 'GLC - Fluxos', description: 'material de apoio, solicitação de cadastro', icon: '📁', color: '', url: '#' },
      { title: 'GSID - Fluxos e Normativos', icon: '📋', color: '', url: '#' },
      { title: 'SIG', icon: '📊', color: '', url: '#' },
      { title: 'Dashboard Corporativo', icon: '📈', color: '', url: '#' },
      { title: 'SEI', icon: '📝', color: '', url: '#' },
      // Financeiro e Contratos
      { title: 'Licitação', icon: '⚖️', color: '', url: '#' },
      { title: 'Gestão de Prestação de Serviço', icon: '🤝', color: '', url: '#' },
      { title: 'Controle de Pagamento', icon: '💳', color: '', url: '#' },
      { title: 'Planilha Formação de Preço', icon: '💰', color: 'f', url: '#' },
      { title: 'Gestão de Inadimplentes', icon: '💸', color: '', url: '#' },
      { title: 'Assinamos', icon: '✍️', color: '', url: '#' },
      // Documentação
      { title: 'DEP - Manuais de Referência', icon: '📚', color: '', url: '#' },
      { title: 'Manual do Usuário SEI', icon: '📖', color: 'from-lime-500 to-lime-600', url: '#' },
      { title: 'Gestão Congresso', icon: '🏛️', color: 'from-lime-500 to-lime-600', url: '#' },
    ]
  },
  {
    title: 'Tecnologia & Sistemas',
    icon: <Laptop className="w-6 h-6" />,
    color: 'from-slate-600 to-slate-700',
    systems: [
      { title: 'MxM - WebManager', icon: '💻', color: 'from-indigo-500 to-indigo-600', url: '#' },
      { title: 'GLPI - DN', icon: '🔧', color: '', url: '#' },
      { title: 'Portal GTI', icon: '💻', color: 'from-purple-500 to-purple-600', url: '#' },
      { title: 'Ambiente Remoto Rede Física', icon: '🌐', color: '', url: '#' },
      { title: 'Gerenciamento de Bots', icon: '🤖', color: 'from-blue-500 to-blue-600', url: '#' },
    ]
  },
  {
    title: 'Atendimento & Comunicação',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'from-slate-600 to-slate-700',
    systems: [
      // Suporte e Comunicação
      { title: 'Abrir Chamado', icon: '🎧', color: 'from-purple-500 to-purple-600', url: '#' },
      { title: 'CRM', icon: '📞', color: 'from-fuchsia-500 to-fuchsia-600', url: '#' },
      { title: 'Serviços Gerais', icon: '🔨', color: '', url: '#' },
      // Eventos e Agenda
      { title: 'Eventos', icon: '🎉', color: '', url: '#' },
      { title: 'Agenda UIP', icon: '📅', color: '', url: '#' },
      { title: 'Minha Agenda UIP', icon: '📆', color: '', url: '#' },
      // Relacionamento
      { title: 'Relacionamento com Comunidade', icon: '🤝', color: '', url: '#' },
      { title: 'Uso de Imagem', icon: '📷', color: '', url: '#' },
    ]
  },
];

interface SectorsSectionsProps {
  searchQuery?: string;
}

export function SectorsSections({ searchQuery = '' }: SectorsSectionsProps) {
  const filteredSectors = sectors.map(sector => ({
    ...sector,
    systems: sector.systems.filter(system =>
      system.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(sector => sector.systems.length > 0);

  if (searchQuery && filteredSectors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-slate-600">
          Nenhum sistema encontrado para "<span className="font-semibold text-blue-600">{searchQuery}</span>"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Sistemas por Setor
        </h2>
        <p className="text-slate-600 text-lg">Encontre facilmente o sistema que você precisa</p>
      </div>

      {/* Coluna única para evitar o efeito de "coluna vazia" quando um setor é expandido */}
      <div className="flex flex-col gap-6">
        {filteredSectors.map((sector, index) => (
          <SectorCard key={index} {...sector} />
        ))}
      </div>
    </div>
  );
}