export function sortByPriority(links) {
  return [...links].sort((first, second) => Number(first.priority ?? 99) - Number(second.priority ?? 99));
}

export function redirectToEntrance(link) {
  if (!link?.targetUrl) {
    return;
  }

  window.location.href = link.targetUrl;
}
