import { useState } from 'react';
import { User, Lock, LogIn, Laptop, Server, Mail, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/de9f178bba049917b4f39f2c73ef8985eeacb3f5.png';

interface LoginSectionProps {
  onLogin: () => void;
}

export function LoginSection({ onLogin }: LoginSectionProps) {
  const [loginType, setLoginType] = useState<'intranet' | 'sistema'>('intranet');
  const [chapa, setChapa] = useState('');
  const [senha, setSenha] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowForgotPassword(false);
      setEmail('');
    }, 3000);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Back Button */}
            <button
              onClick={() => setShowForgotPassword(false)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar ao login</span>
            </button>

            {/* Logo */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                <Mail className="text-white w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Esqueci a Senha</h1>
              <p className="text-slate-600 mt-1">
                Digite seu email cadastrado para receber instruções
              </p>
            </div>

            {emailSent ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-green-600 font-medium mb-1">Email enviado com sucesso!</div>
                <p className="text-sm text-green-700">
                  Verifique sua caixa de entrada e spam.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="seu.email@senacpe.com.br"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Enviar instruções
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <img src={logo} alt="SENAC PE" className="h-20 w-auto" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Bem-vindo</h1>
            <p className="text-slate-600 mt-1">Faça login para continuar</p>
          </div>

          {/* Login Type Toggle */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setLoginType('intranet')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium transition-all ${
                loginType === 'intranet'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Intranet</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginType('sistema')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium transition-all ${
                loginType === 'sistema'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Sistema</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Chapa
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={chapa}
                  onChange={(e) => setChapa(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Digite sua chapa"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Entrar</span>
              <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center">
            <button 
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}