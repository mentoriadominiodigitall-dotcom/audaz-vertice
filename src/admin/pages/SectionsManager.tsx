import { useEffect, useState } from 'react';
import { Save, Check, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { SectionConfig } from '@/types';

export default function SectionsManager() {
  const { content, refresh } = useContent();
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSections(content.sectionConfigs);
  }, [content.sectionConfigs]);

  const handleToggle = (id: string, enabled: boolean) => {
    setSections(sections.map(s => s.id === id ? { ...s, enabled } : s));
  };

  const handleField = (id: string, field: keyof SectionConfig, value: string | number) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = async () => {
    setSaving(true);
    await Promise.all(
      sections.map(s =>
        supabase.from('section_config').update({
          title: s.title, subtitle: s.subtitle, description: s.description,
          enabled: s.enabled, position: s.position,
        }).eq('id', s.id)
      )
    );
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Seções</h1>
          <p className="mt-1 text-sm text-white/40">Ative, desative e edite títulos das seções</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Salvando...' : saved ? <><Check size={16} /> Salvo!</> : <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display text-base font-semibold text-white">{section.section_label}</span>
                <code className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/40">{section.section_key}</code>
              </div>
              <button
                onClick={() => handleToggle(section.id, !section.enabled)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  section.enabled
                    ? 'bg-audaz-green/10 text-audaz-green'
                    : 'bg-white/5 text-white/40'
                }`}
              >
                {section.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                {section.enabled ? 'Ativa' : 'Inativa'}
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Título</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleField(section.id, 'title', e.target.value)}
                  className="input-base"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Subtítulo</label>
                <input
                  type="text"
                  value={section.subtitle}
                  onChange={(e) => handleField(section.id, 'subtitle', e.target.value)}
                  className="input-base"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Descrição</label>
                <textarea
                  value={section.description}
                  onChange={(e) => handleField(section.id, 'description', e.target.value)}
                  rows={2}
                  className="input-base resize-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Ordem</label>
                <input
                  type="number"
                  value={section.position}
                  onChange={(e) => handleField(section.id, 'position', parseInt(e.target.value) || 0)}
                  className="input-base"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
