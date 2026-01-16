import { useState, useEffect } from 'react';
import { LoginSection } from './components/LoginSection';
import { PostLoginDashboard } from './components/post-login/PostLoginDashboard';
import { Header } from './components/Header';
import { SectorsSections } from './components/SectorsSections';
import { MostAccessedSection } from './components/MostAccessedSection';
import { SearchBar } from './components/SearchBar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [textScale, setTextScale] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseFloat(localStorage.getItem('textScale') || '1');
    }
    return 1;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--text-scale', textScale.toString());
    // Forçar reflow para aplicar mudanças
    root.style.fontSize = (16 * textScale) + 'px';
  }, [textScale]);

  const handleTextScaleChange = (scale: number) => {
    setTextScale(scale);
    localStorage.setItem('textScale', scale.toString());
  };

  if (showLogin && !isLoggedIn) {
    return (
      <div className="min-h-screen bg-app">
        <Header 
          isLoggedIn={isLoggedIn} 
          onLogout={() => setIsLoggedIn(false)} 
          onBackClick={() => setShowLogin(false)}
          showBackButton={true}
          textScale={textScale}
          onTextScaleChange={handleTextScaleChange}
        />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <LoginSection onLogin={() => setIsLoggedIn(true)} />
        </main>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <PostLoginDashboard 
        onLogout={() => setIsLoggedIn(false)} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        textScale={textScale}
        onTextScaleChange={handleTextScaleChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-app">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogout={() => setIsLoggedIn(false)} 
        onLoginClick={() => setShowLogin(true)}
        textScale={textScale}
        onTextScaleChange={handleTextScaleChange}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12 page-border">
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