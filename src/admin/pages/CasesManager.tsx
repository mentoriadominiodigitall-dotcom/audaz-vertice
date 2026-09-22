import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { CaseItem, CaseResult } from '@/types';

export default function CasesManager() {
  const { content, refresh } = useContent();
  const [items, setItems] = useState<CaseItem[]>([]);
  const [editing, setEditing] = useState<CaseItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [resultsText, setResultsText] = useState('');
  const [tagsText, setTagsText] = useState('');

  useEffect(() => { setItems(content.cases); }, [content.cases]);

  const startNew = () => {
    setEditing({ id: '', client: '', description: '', image: '', results: [], tags: [], position: items.length + 1 } as CaseItem);
    setResultsText(''); setTagsText(''); setIsNew(true);
  };
  const startEdit = (item: CaseItem) => {
    setEditing(item);
    setResultsText(item.results.map(r => `${r.metric}|${r.label}`).join('\n'));
    setTagsText(item.tags.join(', '));
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const results: CaseResult[] = resultsText.split('\n').filter(r => r.trim()).map(line => {
      const [metric, label] = line.split('|');
      return { metric: metric?.trim() || '', label: label?.trim() || '' };
    });
    const tags = tagsText.split(',').map(t => t.trim()).filter(Boolean);
    const data = { ...editing, results, tags };
    if (isNew) { const { id, ...d } = data; await supabase.from('cases').insert(d); }
    else { const { id, ...d } = data; await supabase.from('cases').update(d).eq('id', id); }
    await refresh(); setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este case?')) return;
    await supabase.from('cases').delete().eq('id', id); await refresh();
  };

  const handleDuplicate = async (item: CaseItem) => {
    const { id, ...dup } = item;
    await supabase.from('cases').insert({ ...dup, client: `${item.client} (cópia)`, position: items.length + 1 });
    await refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">Cases</h1><p className="mt-1 text-sm text-white/40">{items.length} cases cadastrados</p></div>
        <button onClick={startNew} className="btn-primary"><Plus size={16} /> Novo case</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div key={item.id} className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            {item.image && <img src={item.image} alt={item.client} className="h-32 w-full object-cover" />}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-sm font-semibold text-white">{item.client}</h3>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => startEdit(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Edit size={15} /></button>
                  <button onClick={() => handleDuplicate(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Copy size={15} /></button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-audaz-red/60 hover:bg-audaz-red/10"><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="mt-1 text-xs text-white/40 line-clamp-2">{item.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.map((t, ti) => <span key={ti} className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/40">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="glass-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">{isNew ? 'Novo case' : 'Editar case'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Cliente</label><input type="text" value={editing.client} onChange={e => setEditing({ ...editing, client: e.target.value })} className="input-base" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Descrição</label><textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="input-base resize-none" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Imagem (URL)</label><input type="text" value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} className="input-base" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Resultados (formato: métrica|label, um por linha)</label><textarea value={resultsText} onChange={e => setResultsText(e.target.value)} rows={4} placeholder="+320%|Tráfego orgânico&#10;+185%|Leads qualificadas" className="input-base resize-none" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Tags (separadas por vírgula)</label><input type="text" value={tagsText} onChange={e => setTagsText(e.target.value)} className="input-base" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Ordem</label><input type="number" value={editing.position} onChange={e => setEditing({ ...editing, position: parseInt(e.target.value) || 0 })} className="input-base" /></div>
            </div>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setEditing(null)} className="btn-secondary">Cancelar</button><button onClick={handleSave} className="btn-primary"><Save size={16} /> Salvar</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
