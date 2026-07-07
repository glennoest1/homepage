import { AlertCircle, ShieldCheck } from 'lucide-react';
import { EntranceItem } from './EntranceItem';

export function EntranceListCard({ links, loading, error, onSelect }) {
  return (
    <section className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-white/86 p-4 shadow-[0_20px_60px_rgba(25,73,135,0.08)] backdrop-blur md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky-700">Available entrances</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Alternative verified routes</h2>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
          <ShieldCheck size={16} />
          {loading ? 'Syncing' : `${links.length} active`}
        </span>
      </div>

      {error ? (
        <div className="mb-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <span>{error}</span>
        </div>
      ) : null}

      <div className="grid gap-3">
        {links.map((link) => (
          <EntranceItem key={link.id} {...link} onSelect={() => onSelect(link)} />
        ))}
      </div>
    </section>
  );
}
