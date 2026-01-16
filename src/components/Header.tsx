import { Users, Mail, Phone, MessageSquare, Search, User, LogOut, Home } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/de9f178bba049917b4f39f2c73ef8985eeacb3f5.png';

const QUICK_LINKS = [
  // Ícones padronizados (sem fundo) no estilo do print.
  { label: 'Portal RH', icon: Users, url: '#' },
  { label: 'WebMail', icon: Mail, url: '#' },
  { label: 'Ramais', icon: Phone, url: '#' },
  { label: 'Senac Mais', icon: MessageSquare, url: '#' },
] as const;

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick?: () => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

export function Header({ isLoggedIn, onLogout, onLoginClick, onBackClick, showBackButton = false }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
      {/* Um pouco mais "colado" nas margens, como no print */}
      <div className="w-full px-16 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="SENAC PE" className="h-12 w-auto" />
          </div>
          
          {/* Search Bar - Only visible when logged in */}
          {isLoggedIn && (
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar sistemas..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center gap-2 ml-auto">
            {isLoggedIn ? (
              <>
                <button 
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700"
                  title="Ramais"
                >
                  <Phone className="w-6 h-6" />
                </button>
                
                <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700">
                  <User className="w-6 h-6" />
                </button>

                <div className="h-6 w-px bg-slate-300 mx-1"></div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden lg:inline">Sair</span>
                </button>
              </>
            ) : showBackButton ? (
              <button
                onClick={onBackClick}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-100 transition-all group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full text-white group-hover:scale-110 transition-transform shadow-md">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Voltar</span>
              </button>
            ) : (
              <div className="flex items-center justify-end gap-6">
                {/* Botão de acesso no início */}
                <button
                  onClick={onLoginClick}
                  className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-800 rounded-full text-white group-hover:scale-110 transition-transform shadow-md">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Acessar Intranet</span>
                </button>

                {/* Demais ícones na mesma linha */}
                {QUICK_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target={item.url !== '#' ? '_blank' : undefined}
                      rel={item.url !== '#' ? 'noreferrer' : undefined}
                      className="group flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors"
                      title={item.label}
                    >
                      <Icon className="w-7 h-7 text-teal-600 group-hover:text-teal-700" />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 whitespace-nowrap">
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation - Only when logged in */}
      {isLoggedIn && (
        <div className="border-t border-slate-200 bg-slate-50/50">
          <div className="w-full px-16">
            <nav className="flex items-center gap-1 overflow-x-auto">
              <NavItem icon={<Users className="w-4 h-4" />} label="Portal RH" />
              <NavItem icon={<Mail className="w-4 h-4" />} label="WebMail" />
              <NavItem icon={<Phone className="w-4 h-4" />} label="Ramais" />
              <NavItem icon={<MessageSquare className="w-4 h-4" />} label="Senac Mais" />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-3 rounded-t-lg hover:bg-white transition-colors text-slate-700 hover:text-blue-600 whitespace-nowrap">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}