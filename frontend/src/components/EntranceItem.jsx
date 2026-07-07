import { ChevronRight, Cloud, Globe2, House, Megaphone, Radio, Route, ShieldCheck } from 'lucide-react';

const iconMap = {
  home: House,
  cloud: Cloud,
  globe: Globe2,
  megaphone: Megaphone,
  route: Route,
  shield: ShieldCheck,
  radio: Radio
};

export function EntranceItem({ id, title, description, targetUrl, iconType, priority, onSelect }) {
  const Icon = iconMap[iconType] ?? Globe2;

  return (
    <button
      className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(14,116,144,0.12)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
      type="button"
      onClick={onSelect}
      aria-label={`Open ${title}`}
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-sky-100 group-hover:text-sky-700">
        <Icon size={23} strokeWidth={1.8} />
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-base font-extrabold text-slate-950">{title}</span>
          {priority === 1 ? (
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-700">Main</span>
          ) : null}
        </span>
        <span className="mt-1 block text-sm leading-6 text-slate-600">{description}</span>
        <span className="mt-2 block truncate text-xs font-semibold text-slate-400">{targetUrl}</span>
      </span>

      <span className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-400 transition group-hover:translate-x-1 group-hover:border-sky-300 group-hover:text-sky-700">
        <ChevronRight size={20} />
      </span>
      <span className="sr-only">Entrance id {id}</span>
    </button>
  );
}
