import { useEffect, useState } from 'react';
import { Save, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { SiteConfig } from '@/types';

export default function GeneralInfo() {
  const { content, refresh } = useContent();
  const [form, setForm] = useState<Partial<SiteConfig>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content.siteConfig) setForm(content.siteConfig);
  }, [content.siteConfig]);

  const handleChange = (field: keyof SiteConfig, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, created_at, updated_at, ...updateData } = form;
    await supabase.from('site_config').update(updateData).eq('id', id as string);
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields: Array<{ key: keyof SiteConfig; label: string; type?: string }> = [
    { key: 'company_name', label: 'Nome da empresa' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'slogan', label: 'Slogan' },
    { key: 'phone', label: 'Telefone' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'email', label: 'Email' },
    { key: 'instagram', label: 'Instagram (URL)' },
    { key: 'facebook', label: 'Facebook (URL)' },
    { key: 'linkedin', label: 'LinkedIn (URL)' },
    { key: 'tiktok', label: 'TikTok (URL)' },
    { key: 'address', label: 'Endereço' },
    { key: 'hours', label: 'Horário de atendimento' },
    { key: 'logo_light', label: 'Logo clara (URL)' },
    { key: 'logo_dark', label: 'Logo escura (URL)' },
    { key: 'favicon', label: 'Favicon (URL)' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Informações Gerais</h1>
          <p className="mt-1 text-sm text-white/40">Dados de contato e identidade da empresa</p>
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
      </div>
    </div>
  );
}
