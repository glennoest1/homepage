import React from 'react';
import { defaultLinks } from '../data/defaultLinks';
import { sortByPriority } from '../lib/navigation';

export function useNavigationLinks() {
  const [links, setLinks] = React.useState(defaultLinks);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const controller = new AbortController();

    fetch('/api/v1/navigation/active-links', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Navigation request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const activeLinks = Array.isArray(data) && data.length > 0 ? data : defaultLinks;
        setLinks(sortByPriority(activeLinks));
        setError('');
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setLinks(defaultLinks);
          setError('Live addresses are temporarily unavailable. Showing verified fallback routes.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { links, loading, error };
}
