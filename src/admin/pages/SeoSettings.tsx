import { useEffect, useState } from 'react';
import { Save, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { SeoSettings } from '@/types';

export default function SeoSettings() {
  const { content, refresh } = useContent();
  const [form, setForm] = useState<Partial<SeoSettings>>({});
  const [schemaText, setSchemaText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content.seoSettings) {
      setForm(content.seoSettings);
      setSchemaText(JSON.stringify(content.seoSettings.schema_org, null, 2));
    }
  }, [content.seoSettings]);

  const handleChange = (field: keyof SeoSettings, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    let schemaObj = {};
    try { schemaObj = JSON.parse(schemaText || '{}'); } catch { /* keep empty */ }
    const { id, created_at, updated_at, schema_org, ...updateData } = form;
    await supabase.from('seo_settings').update({ ...updateData, schema_org: schemaObj }).eq('id', id as string);
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields: Array<{ key: keyof SeoSettings; label: string; type?: string }> = [
    { key: 'meta_title', label: 'Meta Title' },
    { key: 'meta_description', label: 'Meta Description', type: 'textarea' },
    { key: 'keywords', label: 'Keywords (separadas por vírgula)' },
    { key: 'og_image', label: 'Open Graph Image (URL)' },
    { key: 'og_type', label: 'Open Graph Type' },
    { key: 'twitter_card', label: 'Twitter Card Type' },
    { key: 'robots', label: 'Robots' },
    { key: 'canonical', label: 'Canonical URL' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">SEO</h1><p className="mt-1 text-sm text-white/40">Otimização para motores de busca</p></div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Salvando...' : saved ? <><Check size={16} /> Salvo!</> : <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.key}>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea value={(form[field.key] as string) || ''} onChange={e => handleChange(field.key, e.target.value)} rows={3} className="input-base resize-none" />
            ) : (
              <input type="text" value={(form[field.key] as string) || ''} onChange={e => handleChange(field.key, e.target.value)} className="input-base" />
            )}
          </div>
        ))}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">Schema.org (JSON)</label>
          <textarea value={schemaText} onChange={e => setSchemaText(e.target.value)} rows={10} className="input-base resize-none font-mono text-xs" />
        </div>
      </div>
    </div>
  );
}
