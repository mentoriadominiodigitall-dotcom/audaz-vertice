import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { FaqItem } from '@/types';

export default function FaqManager() {
  const { content, refresh } = useContent();
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { setItems(content.faqItems); }, [content.faqItems]);

  const startNew = () => { setEditing({ id: '', question: '', answer: '', category: 'Geral', position: items.length + 1 } as FaqItem); setIsNew(true); };
  const startEdit = (item: FaqItem) => { setEditing(item); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;
    if (isNew) { const { id, ...d } = editing; await supabase.from('faq_items').insert(d); }
    else { const { id, ...d } = editing; await supabase.from('faq_items').update(d).eq('id', id); }
    await refresh(); setEditing(null);
  };

  const handleDelete = async (id: string) => { if (!confirm('Excluir esta pergunta?')) return; await supabase.from('faq_items').delete().eq('id', id); await refresh(); };
  const handleDuplicate = async (item: FaqItem) => { const { id, ...dup } = item; await supabase.from('faq_items').insert({ ...dup, question: `${item.question} (cópia)`, position: items.length + 1 }); await refresh(); };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">FAQ</h1><p className="mt-1 text-sm text-white/40">{items.length} perguntas cadastradas</p></div>
        <button onClick={startNew} className="btn-primary"><Plus size={16} /> Nova pergunta</button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="group flex items-start justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-semibold text-white">{item.question}</h3>
                <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/40">{item.category}</span>
              </div>
              <p className="mt-1 text-xs text-white/40 line-clamp-2">{item.answer}</p>
            </div>
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button onClick={() => startEdit(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Edit size={15} /></button>
              <button onClick={() => handleDuplicate(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Copy size={15} /></button>
              <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-audaz-red/60 hover:bg-audaz-red/10"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="glass-panel w-full max-w-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">{isNew ? 'Nova pergunta' : 'Editar pergunta'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Pergunta</label><input type="text" value={editing.question} onChange={e => setEditing({ ...editing, question: e.target.value })} className="input-base" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Resposta</label><textarea value={editing.answer} onChange={e => setEditing({ ...editing, answer: e.target.value })} rows={5} className="input-base resize-none" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Categoria</label><input type="text" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} className="input-base" /></div>
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Ordem</label><input type="number" value={editing.position} onChange={e => setEditing({ ...editing, position: parseInt(e.target.value) || 0 })} className="input-base" /></div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setEditing(null)} className="btn-secondary">Cancelar</button><button onClick={handleSave} className="btn-primary"><Save size={16} /> Salvar</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
