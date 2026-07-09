import React from 'react';
import { defaultLinks } from '../data/defaultLinks';
import { sortByPriority } from '../lib/navigation';

export function useNavigationLinks() {
  const links = React.useMemo(() => sortByPriority(defaultLinks), []);

  return { links, loading: false, error: '' };
}
