import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit, Trash2, X, Save, GripVertical, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import { getIcon, availableIcons } from '@/lib/icons';
import type { Service } from '@/types';

const emptyService: Omit<Service, 'id'> = {
  icon: 'Zap', title: '', description: '', image: '',
  features: [], slug: '', category: '', position: 0,
};

export default function ServicesManager() {
  const { content, refresh } = useContent();
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featuresText, setFeaturesText] = useState('');

  useEffect(() => { setItems(content.services); }, [content.services]);

  const startNew = () => {
    setEditing({ ...emptyService, id: '', position: items.length + 1 } as Service);
    setFeaturesText('');
    setIsNew(true);
  };

  const startEdit = (item: Service) => {
    setEditing(item);
    setFeaturesText(item.features.join('\n'));
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const features = featuresText.split('\n').filter(f => f.trim());
    const data = { ...editing, features };

    if (isNew) {
      const { id, ...insertData } = data;
      await supabase.from('services').insert(insertData);
    } else {
      const { id, ...updateData } = data;
      await supabase.from('services').update(updateData).eq('id', id);
    }
    await refresh();
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este serviço?')) return;
    await supabase.from('services').delete().eq('id', id);
    await refresh();
  };

  const handleDuplicate = async (item: Service) => {
    const { id, ...dup } = item;
    await supabase.from('services').insert({ ...dup, title: `${item.title} (cópia)`, position: items.length + 1 });
    await refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Serviços</h1>
          <p className="mt-1 text-sm text-white/40">{items.length} serviços cadastrados</p>
        </div>
        <button onClick={startNew} className="btn-primary">
          <Plus size={16} /> Novo serviço
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={item.id} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-audaz-red/10 text-audaz-red">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => startEdit(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white">
                    <Edit size={15} />
                  </button>
                  <button onClick={() => handleDuplicate(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white">
                    <Copy size={15} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-audaz-red/60 hover:bg-audaz-red/10">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <h3 className="mt-3 font-display text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-xs text-white/40 line-clamp-2">{item.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/40">{item.category || 'Sem categoria'}</span>
                <span className="text-xs text-white/30">#{item.position}</span>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="glass-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">{isNew ? 'Novo serviço' : 'Editar serviço'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Título</label>
                  <input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="input-base" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Categoria</label>
                  <input type="text" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} className="input-base" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Descrição</label>
                <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="input-base resize-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Imagem (URL)</label>
                <input type="text" value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} className="input-base" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Ícone</label>
                <select value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })} className="input-base">
                  {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Benefícios (um por linha)</label>
                <textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} rows={4} className="input-base resize-none" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Slug</label>
                  <input type="text" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="input-base" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Ordem</label>
                  <input type="number" value={editing.position} onChange={e => setEditing({ ...editing, position: parseInt(e.target.value) || 0 })} className="input-base" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="btn-secondary">Cancelar</button>
              <button onClick={handleSave} className="btn-primary"><Save size={16} /> Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
