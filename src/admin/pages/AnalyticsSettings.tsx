import { useEffect, useState } from 'react';
import { Save, Check, BarChart3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { AnalyticsSettings } from '@/types';

export default function AnalyticsSettings() {
  const { content, refresh } = useContent();
  const [form, setForm] = useState<Partial<AnalyticsSettings>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (content.analyticsSettings) setForm(content.analyticsSettings); }, [content.analyticsSettings]);

  const handleChange = (field: keyof AnalyticsSettings, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, created_at, updated_at, ...updateData } = form;
    await supabase.from('analytics_settings').update(updateData).eq('id', id as string);
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields: Array<{ key: keyof AnalyticsSettings; label: string; placeholder: string }> = [
    { key: 'ga4_id', label: 'Google Analytics 4 ID', placeholder: 'G-XXXXXXXXXX' },
    { key: 'gtm_id', label: 'Google Tag Manager ID', placeholder: 'GTM-XXXXXXX' },
    { key: 'meta_pixel_id', label: 'Meta Pixel ID', placeholder: '123456789012345' },
    { key: 'microsoft_clarity_id', label: 'Microsoft Clarity ID', placeholder: 'abcdef1234' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-white">Analytics</h1><p className="mt-1 text-sm text-white/40">Configure ferramentas de rastreamento</p></div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Salvando...' : saved ? <><Check size={16} /> Salvo!</> : <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-audaz-green" />
          <h2 className="font-display text-base font-semibold text-white">IDs de Rastreamento</h2>
        </div>
        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.key}>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/40">{field.label}</label>
              <input type="text" value={(form[field.key] as string) || ''} onChange={e => handleChange(field.key, e.target.value)} placeholder={field.placeholder} className="input-base" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/30">Os scripts serão injetados automaticamente no site após salvar. Deixe em branco para desativar.</p>
      </div>
    </div>
  );
}
