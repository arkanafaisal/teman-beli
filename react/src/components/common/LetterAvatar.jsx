export const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else {
    return name.length > 1 ? name[0].toUpperCase() + name[1].toLowerCase() : name[0].toUpperCase();
  }
};

const colors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-rose-500", 
  "bg-amber-500", "bg-cyan-500", "bg-fuchsia-500", "bg-orange-500"
];

const getColorFromName = (name) => {
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export default function LetterAvatar({ name, sizeClasses = "w-10 h-10 text-sm" }) {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div className={`${sizeClasses} ${bgColor} rounded-full flex items-center justify-center font-bold text-text-inverted tracking-wide shrink-0 shadow-sm`}>
      {initials}
    </div>
  );
}
