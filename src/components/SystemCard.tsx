import { ArrowRight } from 'lucide-react';

interface SystemCardProps {
  title: string;
  description?: string;
  icon: string;
  color: string;
  url?: string;
  compact?: boolean;
}

export function SystemCard({ title, description, icon, color: _color, url = '#', compact = false }: SystemCardProps) {
  // Paleta enxuta (evita ficar "muito colorido"), mas com contraste suficiente.
  // Normaliza as cores passadas pelos dados para 3 variações consistentes.
  const c = (_color || '').toLowerCase();
  const gradient =
    c.includes('orange') || c.includes('amber') || c.includes('yellow') || c.includes('red') || c.includes('rose')
      ? 'from-amber-600 to-orange-600'
      : c.includes('teal') || c.includes('cyan') || c.includes('emerald') || c.includes('green')
        ? 'from-teal-600 to-cyan-600'
        : 'from-blue-700 to-indigo-700';

  const hoverBorder =
    gradient === 'from-amber-600 to-orange-600'
      ? 'hover:border-orange-300'
      : gradient === 'from-teal-600 to-cyan-600'
        ? 'hover:border-teal-300'
        : 'hover:border-blue-300';

  const hoverText =
    gradient === 'from-amber-600 to-orange-600'
      ? 'group-hover:text-orange-700'
      : gradient === 'from-teal-600 to-cyan-600'
        ? 'group-hover:text-teal-700'
        : 'group-hover:text-blue-700';

  const hoverArrow =
    gradient === 'from-amber-600 to-orange-600'
      ? 'group-hover:text-orange-700'
      : gradient === 'from-teal-600 to-cyan-600'
        ? 'group-hover:text-teal-700'
        : 'group-hover:text-blue-700';

  const handleClick = () => {
    if (url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 text-left border border-slate-200/50 ${hoverBorder} hover:-translate-y-1 ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>
      
      {/* Icon */}
      <div className="relative flex items-center justify-between mb-3">
        <div className={`flex items-center justify-center ${compact ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br ${gradient} rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
          <span className={compact ? 'text-xl' : 'text-2xl'}>{icon}</span>
        </div>
        <ArrowRight className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-slate-400 ${hoverArrow} group-hover:translate-x-1 transition-all`} />
      </div>
      
      {/* Content */}
      <div className="relative">
        <h3 className={`font-semibold text-slate-800 ${hoverText} transition-colors ${compact ? 'text-sm mb-0.5' : 'mb-1'}`}>
          {title}
        </h3>
        {description && (
          <p className="text-xs text-slate-600 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </button>
  );
}