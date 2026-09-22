import { useEffect, useState } from 'react';
import { Save, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { HeroConfig } from '@/types';

export default function HeroEditor() {
  const { content, refresh } = useContent();
  const [form, setForm] = useState<Partial<HeroConfig>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content.heroConfig) setForm(content.heroConfig);
  }, [content.heroConfig]);

  const handleChange = (field: keyof HeroConfig, value: string | number | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, created_at, updated_at, ...updateData } = form;
    await supabase.from('hero_config').update(updateData).eq('id', id as string);
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields: Array<{ key: keyof HeroConfig; label: string; type?: string }> = [
    { key: 'title_line1', label: 'Título - Linha 1' },
    { key: 'title_line2', label: 'Título - Linha 2' },
    { key: 'title_line3', label: 'Título - Linha 3' },
    { key: 'subtitle', label: 'Subtítulo / Slogan' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'button1_label', label: 'Botão 1 - Texto' },
    { key: 'button1_link', label: 'Botão 1 - Link' },
    { key: 'button2_label', label: 'Botão 2 - Texto' },
    { key: 'button2_link', label: 'Botão 2 - Link' },
    { key: 'background_url', label: 'Imagem/Video de fundo (URL)' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Hero / Banner</h1>
          <p className="mt-1 text-sm text-white/40">Seção principal do topo da página</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Salvando...' : saved ? <><Check size={16} /> Salvo!</> : <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.type === 'textarea' ? 'lg:col-span-2' : ''}>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={(form[field.key] as string) || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
                className="input-base resize-none"
              />
            ) : (
              <input
                type="text"
                value={(form[field.key] as string) || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="input-base"
              />
            )}
          </div>
        ))}

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
            Opacidade do overlay ({(form.overlay_opacity ?? 0.8).toFixed(2)})
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={form.overlay_opacity ?? 0.8}
            onChange={(e) => handleChange('overlay_opacity', parseFloat(e.target.value))}
            className="w-full accent-audaz-red"
          />
        </div>

        <div className="flex items-center gap-3 pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.enabled ?? true}
              onChange={(e) => handleChange('enabled', e.target.checked)}
              className="h-4 w-4 accent-audaz-green"
            />
            <span className="text-sm text-white">Seção ativa</span>
          </label>
        </div>
      </div>
    </div>
  );
}
