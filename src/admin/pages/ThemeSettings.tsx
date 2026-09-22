import { useEffect, useState } from 'react';
import { Save, Check, Palette, Type } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { ThemeSettings } from '@/types';

export default function ThemeSettings() {
  const { content, refresh } = useContent();
  const [form, setForm] = useState<Partial<ThemeSettings>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (content.themeSettings) setForm(content.themeSettings); }, [content.themeSettings]);

  const handleChange = (field: keyof ThemeSettings, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, created_at, updated_at, ...updateData } = form;
    await supabase.from('theme_settings').update(updateData).eq('id', id as string);
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const colorFields: Array<{ key: keyof ThemeSettings; label: string }> = [
    { key: 'color_primary', label: 'Cor Primária' },
    { key: 'color_secondary', label: 'Cor Secundária' },
    { key: 'color_accent', label: 'Cor de Destaque' },
    { key: 'color_button', label: 'Cor dos Botões' },
    { key: 'color_button_hover', label: 'Cor do Hover dos Botões' },
    { key: 'color_title', label: 'Cor dos Títulos' },
    { key: 'color_text', label: 'Cor dos Textos' },
    { key: 'color_link', label: 'Cor dos Links' },
    { key: 'color_card', label: 'Cor dos Cards' },
    { key: 'color_background', label: 'Cor de Fundo' },
    { key: 'color_hover', label: 'Cor de Hover Geral' },
  ];

  const fontFields: Array<{ key: keyof ThemeSettings; label: string }> = [
    { key: 'font_display', label: 'Fonte de Títulos' },
    { key: 'font_body', label: 'Fonte do Corpo' },
    { key: 'font_base_size', label: 'Tamanho Base' },
    { key: 'font_heading_weight', label: 'Peso dos Títulos' },
    { key: 'font_body_weight', label: 'Peso do Corpo' },
    { key: 'font_heading_line_height', label: 'Altura da Linha (Títulos)' },
    { key: 'font_body_line_height', label: 'Altura da Linha (Corpo)' },
    { key: 'font_letter_spacing', label: 'Espaçamento entre Letras' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">Cores & Fontes</h1><p className="mt-1 text-sm text-white/40">Personalize a aparência do site</p></div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Salvando...' : saved ? <><Check size={16} /> Salvo!</> : <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Colors */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Palette size={18} className="text-audaz-red" />
            <h2 className="font-display text-base font-semibold text-white">Cores</h2>
          </div>
          <div className="space-y-3">
            {colorFields.map(field => (
              <div key={field.key} className="flex items-center gap-3">
                <input
                  type="color"
                  value={(form[field.key] as string) || '#000000'}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                />
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">{field.label}</label>
                  <input type="text" value={(form[field.key] as string) || ''} onChange={e => handleChange(field.key, e.target.value)} className="input-base" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Type size={18} className="text-audaz-yellow" />
            <h2 className="font-display text-base font-semibold text-white">Fontes</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Fonte de Títulos</label>
              <select value={form.font_display || 'Space Grotesk'} onChange={e => handleChange('font_display', e.target.value)} className="input-base">
                <option value="Space Grotesk">Space Grotesk</option>
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Fonte do Corpo</label>
              <select value={form.font_body || 'Inter'} onChange={e => handleChange('font_body', e.target.value)} className="input-base">
                <option value="Inter">Inter</option>
                <option value="Space Grotesk">Space Grotesk</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>
            {fontFields.slice(2).map(field => (
              <div key={field.key}>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">{field.label}</label>
                <input type="text" value={(form[field.key] as string) || ''} onChange={e => handleChange(field.key, e.target.value)} className="input-base" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
