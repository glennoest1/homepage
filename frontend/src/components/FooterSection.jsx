import { Mail, Rss, Send, ShieldCheck, Twitter } from 'lucide-react';

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/', icon: Send },
  { label: 'X', href: 'https://x.com/', icon: Twitter },
  { label: 'Mail', href: 'mailto:support@example.com', icon: Mail },
  { label: 'RSS', href: '/rss.xml', icon: Rss }
];

export function FooterSection() {
  return (
    <footer className="mt-8 pb-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
            key={label}
            href={href}
            aria-label={label}
          >
            <Icon size={19} />
          </a>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
        <ShieldCheck className="mt-0.5 shrink-0" size={20} />
        <p>
          Bookmark this navigation page and verify the shield status before entering. Fresh entrances may rotate during
          traffic spikes or maintenance windows.
        </p>
      </div>
    </footer>
  );
}
