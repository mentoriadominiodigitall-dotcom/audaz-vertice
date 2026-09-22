import { useState } from 'react';
import { Download, Upload, Database, RefreshCw, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';

const tables = [
  'site_config', 'hero_config', 'section_config', 'nav_links', 'stats',
  'values', 'diferenciais', 'services', 'products', 'process_steps',
  'cases', 'testimonials', 'faq_items', 'blog_posts', 'partners',
  'seo_settings', 'analytics_settings', 'theme_settings',
];

export default function SettingsPage() {
  const { refresh } = useContent();
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleExport = async () => {
    setExporting(true);
    const data: Record<string, unknown> = {};
    for (const table of tables) {
      const { data: rows } = await supabase.from(table).select('*');
      data[table] = rows;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audaz-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
    setMessage('Backup exportado com sucesso!');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      for (const table of tables) {
        if (data[table] && Array.isArray(data[table])) {
          for (const row of data[table]) {
            const { id, created_at, updated_at, ...rowData } = row;
            await supabase.from(table).upsert(rowData, { onConflict: 'id' });
          }
        } else if (data[table] && typeof data[table] === 'object') {
          const { id, created_at, updated_at, ...rowData } = data[table];
          await supabase.from(table).upsert(rowData, { onConflict: 'id' });
        }
      }
      await refresh();
      setMessage('Dados importados com sucesso!');
    } catch {
      setMessage('Erro ao importar. Verifique o arquivo.');
    }
    setImporting(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRestore = async () => {
    if (!confirm('Restaurar dados do backup? Isso substituirá o conteúdo atual.')) return;
    // For single-row tables, we just reload from DB defaults
    setMessage('Use a opção Importar para restaurar um backup.');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Configurações</h1>
        <p className="mt-1 text-sm text-white/40">Backup, restauração e gerenciamento de dados</p>
      </div>

      {message && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-audaz-green/30 bg-audaz-green/10 px-4 py-3 text-sm text-audaz-green">
          <Check size={16} /> {message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Export */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audaz-green/10 text-audaz-green">
            <Download size={22} strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 font-display text-sm font-semibold text-white">Exportar dados</h3>
          <p className="mt-1 text-xs text-white/40">Baixe um backup completo de todo o conteúdo do site em JSON.</p>
          <button onClick={handleExport} disabled={exporting} className="btn-primary mt-4 w-full disabled:opacity-50">
            {exporting ? 'Exportando...' : <><Download size={16} /> Exportar</>}
          </button>
        </div>

        {/* Import */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audaz-yellow/10 text-audaz-yellow">
            <Upload size={22} strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 font-display text-sm font-semibold text-white">Importar dados</h3>
          <p className="mt-1 text-xs text-white/40">Restaure um backup anterior. Substitui o conteúdo atual.</p>
          <label className="btn-secondary mt-4 w-full cursor-pointer">
            {importing ? 'Importando...' : <><Upload size={16} /> Selecionar arquivo</>}
            <input type="file" accept=".json" onChange={handleImport} className="hidden" disabled={importing} />
          </label>
        </div>

        {/* Refresh */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audaz-red/10 text-audaz-red">
            <RefreshCw size={22} strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 font-display text-sm font-semibold text-white">Recarregar</h3>
          <p className="mt-1 text-xs text-white/40">Force a atualização dos dados do site a partir do banco.</p>
          <button onClick={() => refresh()} className="btn-secondary mt-4 w-full">
            <RefreshCw size={16} /> Recarregar
          </button>
        </div>
      </div>

      {/* Database info */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Database size={18} className="text-audaz-red" />
          <h2 className="font-display text-base font-semibold text-white">Tabelas do banco</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {tables.map(t => (
            <div key={t} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-audaz-green" />
              <code className="text-xs text-white/50">{t}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
