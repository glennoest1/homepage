import { ArrowRight, Check, Globe2, Sparkles } from 'lucide-react';

export function HeroEntranceCard({ primaryLink, loading, onEnter }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-dashed border-sky-300/80 bg-white/78 p-6 shadow-[0_24px_80px_rgba(25,73,135,0.12)] backdrop-blur md:p-10">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
      <div className="grid place-items-center text-center">
        <div className="relative mb-7">
          <div className="absolute inset-[-1.1rem] rounded-full bg-sky-300/30 blur-2xl" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full border border-sky-200 bg-gradient-to-br from-white to-sky-100 text-sky-700 shadow-[0_18px_45px_rgba(14,116,144,0.2)]">
            <Globe2 size={46} strokeWidth={1.7} />
          </div>
          <span className="absolute -right-1 top-2 grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white shadow-lg">
            <Check size={17} />
          </span>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
          <Sparkles size={14} />
          Verified transit hub
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-black tracking-normal text-slate-950 sm:text-5xl md:text-7xl">
          Latest Address Entrance
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Choose a verified entrance below or continue through the highest-priority route selected by the navigation service.
        </p>

        <button
          className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-base font-extrabold text-white shadow-[0_20px_45px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          disabled={!primaryLink || loading}
          onClick={onEnter}
        >
          {loading ? 'Checking routes...' : 'Enter Latest Address'}
          <ArrowRight size={20} />
        </button>

        {primaryLink ? (
          <p className="mt-4 text-sm font-medium text-slate-500">Primary route: {primaryLink.title}</p>
        ) : null}
      </div>
    </section>
  );
}
