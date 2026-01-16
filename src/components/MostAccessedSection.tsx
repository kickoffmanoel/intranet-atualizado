import { Star } from 'lucide-react';
import { SystemCard } from './SystemCard';

const mostAccessedItems = [
  { title: 'Abrir Chamado', icon: '🎧', color: 'from-purple-500 to-purple-600', url: '#' },
  { title: 'WebMail', icon: '📧', color: '', url: '#' },
  { title: 'Portal RH', icon: '👥', color: '', url: '#' },
  { title: 'SEI', icon: '📝', color: '', url: '#' },
  { title: 'SIG', icon: '📊', color: 'f', url: '#' },
  { title: 'GLC - Fluxos', description: 'material de apoio, solicitação de cadastro', icon: '📁', color: 'from-blue-500 to-blue-600', url: '#' },
  { title: 'CRM', icon: '📞', color: 'from-fuchsia-500 to-fuchsia-600', url: '#' },
  { title: 'Dashboard Corporativo', icon: '📈', color: 'from-sky-500 to-sky-600', url: '#' },
];

interface MostAccessedSectionProps {
  searchQuery?: string;
}

export function MostAccessedSection({ searchQuery = '' }: MostAccessedSectionProps) {
  const filteredItems = mostAccessedItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery && filteredItems.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
          <Star className="w-8 h-8 text-white fill-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Mais Acessados
          </h2>
          <p className="text-slate-600 text-sm">Acesso rápido aos sistemas mais utilizados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item, index) => (
          <SystemCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}