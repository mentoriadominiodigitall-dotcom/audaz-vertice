import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save, Copy, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { Testimonial } from '@/types';

export default function TestimonialsManager() {
  const { content, refresh } = useContent();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { setItems(content.testimonials); }, [content.testimonials]);

  const startNew = () => { setEditing({ id: '', name: '', role: '', company: '', text: '', photo: '', rating: 5, position: items.length + 1 } as Testimonial); setIsNew(true); };
  const startEdit = (item: Testimonial) => { setEditing(item); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;
    if (isNew) { const { id, ...d } = editing; await supabase.from('testimonials').insert(d); }
    else { const { id, ...d } = editing; await supabase.from('testimonials').update(d).eq('id', id); }
    await refresh(); setEditing(null);
  };

  const handleDelete = async (id: string) => { if (!confirm('Excluir este depoimento?')) return; await supabase.from('testimonials').delete().eq('id', id); await refresh(); };
  const handleDuplicate = async (item: Testimonial) => { const { id, ...dup } = item; await supabase.from('testimonials').insert({ ...dup, name: `${item.name} (cópia)`, position: items.length + 1 }); await refresh(); };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">Depoimentos</h1><p className="mt-1 text-sm text-white/40">{items.length} depoimentos</p></div>
        <button onClick={startNew} className="btn-primary"><Plus size={16} /> Novo depoimento</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div key={item.id} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {item.photo && <img src={item.photo} alt={item.name} className="h-10 w-10 rounded-full object-cover" />}
                <div><h3 className="font-display text-sm font-semibold text-white">{item.name}</h3><p className="text-xs text-white/40">{item.role} · {item.company}</p></div>
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => startEdit(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Edit size={15} /></button>
                <button onClick={() => handleDuplicate(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Copy size={15} /></button>
                <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-audaz-red/60 hover:bg-audaz-red/10"><Trash2 size={15} /></button>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/40 line-clamp-3">"{item.text}"</p>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={12} className="fill-audaz-yellow text-audaz-yellow" />)}
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="glass-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">{isNew ? 'Novo depoimento' : 'Editar depoimento'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Nome</label><input type="text" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="input-base" /></div>
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Cargo</label><input type="text" value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} className="input-base" /></div>
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Empresa</label><input type="text" value={editing.company} onChange={e => setEditing({ ...editing, company: e.target.value })} className="input-base" /></div>
              </div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Depoimento</label><textarea value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} rows={4} className="input-base resize-none" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Foto (URL)</label><input type="text" value={editing.photo} onChange={e => setEditing({ ...editing, photo: e.target.value })} className="input-base" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Avaliação (1-5)</label><input type="number" min={1} max={5} value={editing.rating} onChange={e => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} className="input-base" /></div>
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
