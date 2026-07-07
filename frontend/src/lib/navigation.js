export function sortByPriority(links) {
  return [...links].sort((first, second) => Number(first.priority ?? 99) - Number(second.priority ?? 99));
}

export async function sendClickLog(entranceId) {
  try {
    await fetch(`/api/v1/navigation/click-log?entranceId=${encodeURIComponent(entranceId)}`, {
      method: 'POST',
      keepalive: true
    });
  } catch (error) {
    console.warn('Click log failed.', error);
  }
}

export function redirectToEntrance(link) {
  if (!link?.targetUrl) {
    return;
  }

  sendClickLog(link.id).finally(() => {
    window.location.href = link.targetUrl;
  });
}
