export const getRelativeTime = (deadline) => {
  const now = new Date();
  const target = new Date(deadline);
  const diffMs = target - now;

  if (diffMs <= 0) return "Berakhir";

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffDays > 0) return `${diffDays} hari lagi`;
  if (diffHours > 0) return `${diffHours} jam lagi`;
  return "Segera berakhir";
};
