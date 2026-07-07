import React from 'react';
import { EntranceListCard } from './EntranceListCard';
import { FooterSection } from './FooterSection';
import { HeroEntranceCard } from './HeroEntranceCard';
import { useNavigationLinks } from '../hooks/useNavigationLinks';
import { redirectToEntrance, sortByPriority } from '../lib/navigation';

export function TransitNavigation() {
  const { links, loading, error } = useNavigationLinks();
  const primaryLink = React.useMemo(() => sortByPriority(links)[0], [links]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f4f7fc] to-[#ffffff] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center">
        <HeroEntranceCard
          primaryLink={primaryLink}
          loading={loading}
          onEnter={() => redirectToEntrance(primaryLink)}
        />
        <EntranceListCard
          links={links}
          loading={loading}
          error={error}
          onSelect={(link) => redirectToEntrance(link)}
        />
        <FooterSection />
      </div>
    </main>
  );
}
