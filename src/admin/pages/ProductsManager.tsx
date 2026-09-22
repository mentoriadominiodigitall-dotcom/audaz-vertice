import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { Product } from '@/types';

const empty: Omit<Product, 'id'> = {
  title: '', category: '', price: '', description: '', image: '', status: 'active', position: 0,
};

export default function ProductsManager() {
  const { content, refresh } = useContent();
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { setItems(content.products); }, [content.products]);

  const startNew = () => { setEditing({ ...empty, id: '', position: items.length + 1 } as Product); setIsNew(true); };
  const startEdit = (item: Product) => { setEditing(item); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;
    if (isNew) { const { id, ...d } = editing; await supabase.from('products').insert(d); }
    else { const { id, ...d } = editing; await supabase.from('products').update(d).eq('id', id); }
    await refresh(); setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este produto?')) return;
    await supabase.from('products').delete().eq('id', id); await refresh();
  };

  const handleDuplicate = async (item: Product) => {
    const { id, ...dup } = item;
    await supabase.from('products').insert({ ...dup, title: `${item.title} (cópia)`, position: items.length + 1 });
    await refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">Produtos</h1><p className="mt-1 text-sm text-white/40">{items.length} produtos cadastrados</p></div>
        <button onClick={startNew} className="btn-primary"><Plus size={16} /> Novo produto</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(item => (
          <div key={item.id} className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            {item.image && <img src={item.image} alt={item.title} className="h-32 w-full object-cover" />}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-sm font-semibold text-white">{item.title}</h3>
                  <span className="mt-1 inline-block rounded bg-white/5 px-2 py-0.5 text-xs text-white/40">{item.category}</span>
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => startEdit(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Edit size={15} /></button>
                  <button onClick={() => handleDuplicate(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Copy size={15} /></button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-audaz-red/60 hover:bg-audaz-red/10"><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="mt-2 text-xs text-white/40 line-clamp-2">{item.description}</p>
              <p className="mt-2 font-display text-sm font-bold text-audaz-green">{item.price}</p>
              <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs ${item.status === 'active' ? 'bg-audaz-green/10 text-audaz-green' : 'bg-white/5 text-white/40'}`}>
                {item.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="glass-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">{isNew ? 'Novo produto' : 'Editar produto'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Título</label><input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="input-base" /></div>
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Categoria</label><input type="text" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} className="input-base" /></div>
              </div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Preço</label><input type="text" value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })} className="input-base" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Descrição</label><textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="input-base resize-none" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Imagem (URL)</label><input type="text" value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} className="input-base" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Status</label>
                  <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} className="input-base">
                    <option value="active">Ativo</option><option value="inactive">Inativo</option>
                  </select>
                </div>
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
