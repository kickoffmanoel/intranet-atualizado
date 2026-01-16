import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SystemCard } from './SystemCard';

interface System {
  title: string;
  icon: string;
  color: string;
  url?: string;
  description?: string;
}

interface SectorCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  systems: System[];
}

export function SectorCard({ title, icon, color, systems }: SectorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-all"
      >
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${color} rounded-2xl shadow-lg`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-600">{systems.length} sistemas disponíveis</p>
          </div>
        </div>
        <ChevronDown 
          className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Systems Grid */}
      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {systems.map((system, index) => (
              <SystemCard key={index} {...system} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}