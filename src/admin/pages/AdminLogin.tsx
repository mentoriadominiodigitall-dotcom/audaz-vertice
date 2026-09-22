import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password, displayName);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-audaz-black">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-audaz-red/10 blur-[120px]" />

      <div className="relative w-full max-w-md px-6">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2 text-audaz-white-muted transition-colors hover:text-audaz-white"
        >
          <ArrowLeft size={16} />
          Voltar ao site
        </Link>

        <div className="glass-panel p-8">
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="font-display text-2xl font-bold text-audaz-white">Audaz</span>
              <span className="font-display text-2xl font-light text-audaz-red">Vértice</span>
            </div>
            <p className="text-sm text-audaz-white-muted">
              {mode === 'login' ? 'Acesse o painel administrativo' : 'Crie sua conta de administrador'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                  Nome
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Seu nome"
                  className="input-base"
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-audaz-white-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@audaz.com"
                  className="input-base pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-audaz-white-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-audaz-red/30 bg-audaz-red/10 px-4 py-3 text-sm text-audaz-red">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? 'Carregando...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError(null);
              }}
              className="text-sm text-audaz-white-muted transition-colors hover:text-audaz-white"
            >
              {mode === 'login'
                ? 'Não tem conta? Criar agora'
                : 'Já tem conta? Fazer login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
