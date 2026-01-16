import { useState } from 'react';
import { LoginSection } from './components/LoginSection';
import { PostLoginDashboard } from './components/post-login/PostLoginDashboard';
import { Header } from './components/Header';
import { SectorsSections } from './components/SectorsSections';
import { MostAccessedSection } from './components/MostAccessedSection';
import { SearchBar } from './components/SearchBar';
import bgImage from './assets/fotoBorradaa.png';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (showLogin && !isLoggedIn) {
    return (
      <div className="min-h-screen bg-app" style={{ backgroundImage: `url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' } as React.CSSProperties}>
        <Header 
          isLoggedIn={isLoggedIn} 
          onLogout={() => setIsLoggedIn(false)} 
          onBackClick={() => setShowLogin(false)}
          showBackButton={true}
        />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <LoginSection onLogin={() => setIsLoggedIn(true)} />
        </main>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <PostLoginDashboard onLogout={() => setIsLoggedIn(false)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    );
  }

  return (
    <div className="min-h-screen bg-app" style={{ backgroundImage: `url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' } as React.CSSProperties}>
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogout={() => setIsLoggedIn(false)} 
        onLoginClick={() => setShowLogin(true)} 
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Barra de Pesquisa */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Mais Acessados - Topo */}
        <MostAccessedSection searchQuery={searchQuery} />
        
        {/* Sistemas Organizados por Setor */}
        <SectorsSections searchQuery={searchQuery} />
      </main>
    </div>
  );
}