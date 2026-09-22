import { useEffect, useState } from 'react';
import { Search, Trash2, Check, CheckCheck, Download, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Message } from '@/types';

export default function MessagesInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'responded'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Message | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    setMessages((data as Message[]) || []);
    setLoading(false);
  };

  useEffect(() => { loadMessages(); }, []);

  const handleResponded = async (id: string, responded: boolean) => {
    await supabase.from('messages').update({ responded }).eq('id', id);
    loadMessages();
    if (selected?.id === id) setSelected({ ...selected, responded });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir esta mensagem?')) return;
    await supabase.from('messages').delete().eq('id', id);
    if (selected?.id === id) setSelected(null);
    loadMessages();
  };

  const handleExport = () => {
    const csv = ['Name,Email,Company,Message,Date,Responded'];
    messages.forEach(m => {
      csv.push(`"${m.name}","${m.email}","${m.company}","${m.message.replace(/"/g, '""')}","${new Date(m.created_at).toLocaleDateString('pt-BR')}",${m.responded ? 'Yes' : 'No'}`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'messages.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = messages.filter(m => {
    if (filter === 'unread' && m.responded) return false;
    if (filter === 'responded' && !m.responded) return false;
    if (search && !`${m.name} ${m.email} ${m.message}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">Mensagens</h1><p className="mt-1 text-sm text-white/40">{messages.filter(m => !m.responded).length} não respondidas</p></div>
        <button onClick={handleExport} className="btn-secondary"><Download size={16} /> Exportar CSV</button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Buscar mensagens..." value={search} onChange={e => setSearch(e.target.value)} className="input-base pl-10" />
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'responded'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${filter === f ? 'bg-audaz-red/10 text-audaz-red' : 'bg-white/5 text-white/40 hover:text-white'}`}>
              {f === 'all' ? 'Todas' : f === 'unread' ? 'Não respondidas' : 'Respondidas'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        {/* List */}
        <div className="space-y-2">
          {loading ? (
            <p className="py-8 text-center text-sm text-white/30">Carregando...</p>
          ) : filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/30">Nenhuma mensagem</p>
          ) : (
            filtered.map(m => (
              <button key={m.id} onClick={() => setSelected(m)} className={`w-full rounded-xl border p-4 text-left transition-all ${selected?.id === m.id ? 'border-audaz-red/30 bg-audaz-red/5' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {!m.responded && <span className="h-2 w-2 rounded-full bg-audaz-red" />}
                    <span className="font-display text-sm font-semibold text-white">{m.name}</span>
                  </div>
                  <span className="text-xs text-white/30">{new Date(m.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="mt-1 text-xs text-white/40 truncate">{m.email}</p>
                <p className="mt-1 text-xs text-white/30 line-clamp-1">{m.message}</p>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {!selected ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <Mail size={40} className="text-white/20" />
              <p className="mt-4 text-sm text-white/30">Selecione uma mensagem para ver os detalhes</p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold text-white">{selected.name}</h2>
                  <p className="text-sm text-white/40">{selected.email}</p>
                  {selected.company && <p className="text-sm text-white/40">{selected.company}</p>}
                </div>
                <span className="text-xs text-white/30">{new Date(selected.created_at).toLocaleString('pt-BR')}</span>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-sm leading-relaxed text-white/80">{selected.message}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => handleResponded(selected.id, !selected.responded)} className={selected.responded ? 'btn-secondary' : 'btn-primary'}>
                  {selected.responded ? <><CheckCheck size={16} /> Respondida</> : <><Check size={16} /> Marcar como respondida</>}
                </button>
                <a href={`mailto:${selected.email}?subject=Re: Contato - Audaz Vértice Digital`} className="btn-secondary">
                  <Mail size={16} /> Responder por email
                </a>
                <button onClick={() => handleDelete(selected.id)} className="inline-flex items-center gap-2 rounded-full border border-audaz-red/20 px-5 py-3 text-sm font-semibold text-audaz-red transition-colors hover:bg-audaz-red/10">
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
