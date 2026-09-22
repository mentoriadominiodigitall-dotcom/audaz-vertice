import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { BlogPost } from '@/types';

export default function BlogManager() {
  const { content, refresh } = useContent();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { setItems(content.blogPosts); }, [content.blogPosts]);

  const startNew = () => {
    setEditing({ id: '', title: '', excerpt: '', content: '', category: '', author: 'Equipe Audaz', publish_date: new Date().toISOString().split('T')[0], read_time: '5 min', image: '', slug: '', published: true, position: items.length + 1 } as BlogPost);
    setIsNew(true);
  };
  const startEdit = (item: BlogPost) => { setEditing(item); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;
    const data = { ...editing, publish_date: editing.publish_date || null };
    if (isNew) { const { id, ...d } = data; await supabase.from('blog_posts').insert(d); }
    else { const { id, ...d } = data; await supabase.from('blog_posts').update(d).eq('id', id); }
    await refresh(); setEditing(null);
  };

  const handleDelete = async (id: string) => { if (!confirm('Excluir este artigo?')) return; await supabase.from('blog_posts').delete().eq('id', id); await refresh(); };
  const handleDuplicate = async (item: BlogPost) => { const { id, ...dup } = item; await supabase.from('blog_posts').insert({ ...dup, title: `${item.title} (cópia)`, position: items.length + 1 }); await refresh(); };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">Blog</h1><p className="mt-1 text-sm text-white/40">{items.length} artigos publicados</p></div>
        <button onClick={startNew} className="btn-primary"><Plus size={16} /> Novo artigo</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div key={item.id} className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            {item.image && <img src={item.image} alt={item.title} className="h-32 w-full object-cover" />}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-display text-sm font-semibold text-white line-clamp-2">{item.title}</h3>
                  <span className="mt-1 inline-block rounded bg-white/5 px-2 py-0.5 text-xs text-white/40">{item.category}</span>
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => startEdit(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Edit size={15} /></button>
                  <button onClick={() => handleDuplicate(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white"><Copy size={15} /></button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-audaz-red/60 hover:bg-audaz-red/10"><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="mt-2 text-xs text-white/40 line-clamp-2">{item.excerpt}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-white/30">
                <span>{item.author}</span> · <span>{item.read_time}</span>
                {item.published ? <span className="rounded bg-audaz-green/10 px-2 py-0.5 text-audaz-green">Publicado</span> : <span className="rounded bg-white/5 px-2 py-0.5 text-white/40">Rascunho</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="glass-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">{isNew ? 'Novo artigo' : 'Editar artigo'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Título</label><input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="input-base" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Resumo</label><textarea value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="input-base resize-none" /></div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Conteúdo</label><textarea value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} rows={8} className="input-base resize-none" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Categoria</label><input type="text" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} className="input-base" /></div>
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Autor</label><input type="text" value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} className="input-base" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Data</label><input type="date" value={editing.publish_date || ''} onChange={e => setEditing({ ...editing, publish_date: e.target.value })} className="input-base" /></div>
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Tempo de leitura</label><input type="text" value={editing.read_time} onChange={e => setEditing({ ...editing, read_time: e.target.value })} className="input-base" /></div>
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Slug</label><input type="text" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="input-base" /></div>
              </div>
              <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Imagem (URL)</label><input type="text" value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} className="input-base" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Ordem</label><input type="number" value={editing.position} onChange={e => setEditing({ ...editing, position: parseInt(e.target.value) || 0 })} className="input-base" /></div>
                <label className="flex items-center gap-2 pt-6 cursor-pointer">
                  <input type="checkbox" checked={editing.published} onChange={e => setEditing({ ...editing, published: e.target.checked })} className="h-4 w-4 accent-audaz-green" />
                  <span className="text-sm text-white">Publicado</span>
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setEditing(null)} className="btn-secondary">Cancelar</button><button onClick={handleSave} className="btn-primary"><Save size={16} /> Salvar</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
