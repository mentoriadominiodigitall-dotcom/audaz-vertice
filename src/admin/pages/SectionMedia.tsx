import { useEffect, useState } from 'react';
import { Save, Check, Film, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';
import type { SectionConfig } from '@/types';
import MediaUploader from '@/admin/components/MediaUploader';

export default function SectionMedia() {
  const { content, refresh } = useContent();
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  useEffect(() => {
    setSections(content.sectionConfigs);
  }, [content.sectionConfigs]);

  const updateVideoUrl = (id: string, url: string | null) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, video_url: url } : s)),
    );
  };

  const saveToDatabase = async (id: string, url: string | null) => {
    setSaving(id);
    setErrorId(null);
    try {
      const { error } = await supabase
        .from('section_config')
        .update({ video_url: url })
        .eq('id', id);

      if (error) throw error;

      await refresh();
      setSavedId(id);
      setTimeout(() => setSavedId(null), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao salvar';
      setErrorId(id);
      console.error('Save error:', msg);
    } finally {
      setSaving(null);
    }
  };

  const handleSave = async (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section) return;
    await saveToDatabase(id, section.video_url ?? null);
  };

  const handleUploaded = async (id: string, url: string) => {
    updateVideoUrl(id, url);
    await saveToDatabase(id, url);
  };

  const handleRemove = async (id: string) => {
    updateVideoUrl(id, null);
    await saveToDatabase(id, null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Vídeos das Seções</h1>
        <p className="mt-1 text-sm text-white/40">
          Envie um vídeo para cada seção do site. O vídeo será salvo automaticamente e aparecerá como fundo da seção no site.
        </p>
      </div>

      <div className="space-y-4">
        {sections.length === 0 && (
          <p className="text-sm text-white/40">Nenhuma seção encontrada.</p>
        )}

        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-audaz-red/10 text-audaz-red">
                  <Film size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-white">
                    {section.section_label}
                  </h3>
                  <p className="text-xs text-white/40">
                    Chave: {section.section_key} {section.enabled ? '' : '· inativa'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {savedId === section.id && (
                  <span className="flex items-center gap-1 text-xs text-audaz-green">
                    <Check size={14} /> Salvo!
                  </span>
                )}
                {errorId === section.id && (
                  <span className="flex items-center gap-1 text-xs text-audaz-red">
                    <AlertCircle size={14} /> Erro
                  </span>
                )}
                <button
                  onClick={() => handleSave(section.id)}
                  disabled={saving === section.id}
                  className="flex items-center gap-1.5 rounded-lg bg-audaz-red px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-audaz-red/90 disabled:opacity-50"
                >
                  {saving === section.id ? 'Salvando...' : <><Save size={13} /> Salvar</>}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <MediaUploader
                folder={`sections/${section.section_key}`}
                accept="video/*,image/*"
                currentUrl={section.video_url}
                onUploaded={(url) => handleUploaded(section.id, url)}
                onRemove={() => handleRemove(section.id)}
                label="Vídeo ou imagem de fundo da seção"
                maxSizeMB={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
