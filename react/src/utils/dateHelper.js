export const getRelativeTime = (deadline) => {
  const now = new Date();
  const target = new Date(deadline);
  const diffMs = target - now;

  if (diffMs <= 0) return "Berakhir";

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffDays > 0) return `Berakhir dalam ${diffDays} hari`;
  if (diffHours > 0) return `Berakhir dalam ${diffHours} jam`;
  return "Segera berakhir";
};

export const getFullDateTime = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, '0');

  const day = pad(d.getDate());
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  const currentYear = new Date().getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  const yearString = year === currentYear ? "" : ` ${year}`;

  return `${day} ${month}${yearString}, ${hours}:${minutes}:${seconds}`;
};
