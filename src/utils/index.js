export function formatDate(d) {
  if (!d) return;
  let date = new Date(d);
  return date.toLocaleDateString();
}