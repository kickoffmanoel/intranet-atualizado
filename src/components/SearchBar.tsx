import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 group-focus-within:transition-colors transition-colors" style={{color: '#F7941D'}} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar sistemas, serviços ou documentos..."
          className="w-full pl-14 pr-6 py-4 text-lg bg-white rounded-2xl shadow-lg outline-none transition-all placeholder:text-slate-400"
          style={{borderWidth: '2px', borderColor: '#F7941D'}}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="text-xl">×</span>
          </button>
        )}
      </div>
      {searchQuery && (
        <p className="text-sm text-slate-600 mt-3 text-center">
          Buscando por: <span className="font-semibold" style={{color: '#004A8D'}}>"{searchQuery}"</span>
        </p>
      )}
    </div>
  );
}
