import { useRef, useState } from 'react';
import { Upload, Loader2, X, Film, Check, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface MediaUploaderProps {
  bucket?: string;
  folder: string;
  accept?: string;
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  maxSizeMB?: number;
}

const VIDEO_EXTS = ['.mp4', '.webm', '.mov', '.ogg', '.ogv'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

export default function MediaUploader({
  bucket = 'media',
  folder,
  accept = 'video/*,image/*',
  currentUrl,
  onUploaded,
  onRemove,
  label = 'Enviar arquivo de mídia',
  maxSizeMB = 100,
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const isVideo = (url: string | null | undefined): boolean => {
    if (!url) return false;
    const lower = url.toLowerCase().split('?')[0];
    return VIDEO_EXTS.some((ext) => lower.endsWith(ext));
  };

  const isImage = (url: string | null | undefined): boolean => {
    if (!url) return false;
    const lower = url.toLowerCase().split('?')[0];
    return IMAGE_EXTS.some((ext) => lower.endsWith(ext));
  };

  const handleFile = async (file: File) => {
    setError(null);
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setError(`Arquivo muito grande (${sizeMB.toFixed(1)}MB). Máximo: ${maxSizeMB}MB`);
      return;
    }

    setUploading(true);
    setProgress(0);

    const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onUploaded(urlData.publicUrl);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha no upload do arquivo';
      setError(msg);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
        {label}
      </label>

      {currentUrl ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-start gap-4">
            {isVideo(currentUrl) ? (
              <video
                src={currentUrl}
                controls
                muted
                className="h-32 w-48 rounded-lg border border-white/10 object-cover"
              />
            ) : isImage(currentUrl) ? (
              <img
                src={currentUrl}
                alt="Mídia"
                className="h-32 w-48 rounded-lg border border-white/10 object-cover"
              />
            ) : (
              <div className="flex h-32 w-48 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Film size={28} className="text-white/30" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-audaz-green" />
                <span className="text-sm font-medium text-white">Arquivo enviado</span>
                {isVideo(currentUrl) && (
                  <span className="flex items-center gap-1 rounded-full bg-audaz-red/10 px-2 py-0.5 text-xs text-audaz-red">
                    <Film size={10} /> Vídeo
                  </span>
                )}
                {isImage(currentUrl) && (
                  <span className="flex items-center gap-1 rounded-full bg-audaz-green/10 px-2 py-0.5 text-xs text-audaz-green">
                    <ImageIcon size={10} /> Imagem
                  </span>
                )}
              </div>
              <p className="mt-1 truncate text-xs text-white/40">{currentUrl}</p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Trocar arquivo
                </button>
                {onRemove && (
                  <button
                    onClick={onRemove}
                    disabled={uploading}
                    className="flex items-center gap-1 rounded-lg border border-audaz-red/20 px-3 py-1.5 text-xs font-medium text-audaz-red/70 transition-colors hover:bg-audaz-red/10"
                  >
                    <X size={12} /> Remover
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all ${
            dragOver
              ? 'border-audaz-red/50 bg-audaz-red/5'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="animate-spin text-audaz-red" />
              <p className="text-sm text-white/60">Enviando arquivo...</p>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-audaz-red/10">
                <Upload size={22} className="text-audaz-red" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white/80">Clique ou arraste um arquivo</p>
                <p className="mt-1 text-xs text-white/40">
                  Vídeo ou imagem até {maxSizeMB}MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        disabled={uploading}
      />

      {error && <p className="mt-2 text-xs text-audaz-red">{error}</p>}
    </div>
  );
}
