import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return p + 3;
      });
    }, 24);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-audaz-black transition-all duration-700 ${
        done ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100'
      }`}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl font-bold tracking-tight text-audaz-white">
            Audaz
          </span>
          <span className="font-display text-2xl font-light tracking-tight text-audaz-red">
            Vértice
          </span>
        </div>

        <div className="h-px w-48 overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-audaz-red to-audaz-green transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-body text-xs font-medium tracking-[0.3em] text-white/40">
          {progress}%
        </span>
      </div>
    </div>
  );
}
