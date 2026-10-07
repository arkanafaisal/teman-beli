import { BookOpen, FlaskConical, Popcorn, Home, Package, Headphones, Coffee, Soup, Printer, ShoppingBasket, Ticket, Laptop } from "lucide-react";

export const getCategoryIcon = (emoji, className = "w-5 h-5") => {
  const defaultProps = { className, strokeWidth: 2.5 };

  switch (emoji) {
    // Categories
    case "📚":
    case "KAMPUS": return <BookOpen {...defaultProps} />;
    case "🧪": return <FlaskConical {...defaultProps} />;
    case "🍿": return <Popcorn {...defaultProps} />;
    case "🏠":
    case "KOS": return <Home {...defaultProps} />;
    case "📦": return <Package {...defaultProps} />;
    case "🎧": return <Headphones {...defaultProps} />;
    case "☕": return <Coffee {...defaultProps} />;
    case "🍛":
    case "PANGAN": 
    case "MAKAN": return <Soup {...defaultProps} />;
    case "🖨️": return <Printer {...defaultProps} />;
    case "🧺": return <ShoppingBasket {...defaultProps} />;
    case "🎟️": return <Ticket {...defaultProps} />;
    case "💻":
    case "DIGITAL": return <Laptop {...defaultProps} />;

    default: return <span className={className.includes("w-") ? "text-base" : ""}>{emoji}</span>;
  }
};

export const getCategoryColor = (keyOrEmoji) => {
  switch (keyOrEmoji) {
    case "📚":
    case "KAMPUS": return "text-primary-base bg-primary-soft";
    case "🧪": return "text-success-base bg-success-soft";
    case "🍿": return "text-warning-text bg-warning-soft";
    case "🏠":
    case "KOS": return "text-danger-base bg-danger-soft";
    case "📦": return "text-primary-base bg-primary-soft";
    case "🎧": return "text-danger-base bg-danger-soft";
    case "☕": return "text-warning-text bg-warning-soft";
    case "🍛":
    case "PANGAN":
    case "MAKAN": return "text-success-base bg-success-soft";
    case "🖨️": return "text-primary-base bg-primary-soft";
    case "🎟️": return "text-warning-text bg-warning-soft";
    case "💻":
    case "DIGITAL": return "text-primary-base bg-primary-soft";
    default: return "text-text-base bg-bg-subtle";
  }
};

export const getCategoryStyles = (keyOrEmoji) => {
  const badgeBg = getCategoryColor(keyOrEmoji);
  const bgClass = badgeBg.split(' ').find(c => c.startsWith('bg-')) || 'bg-bg-subtle';
  
  let avatarBg = bgClass.replace('-soft', '-base');
  if (avatarBg === 'bg-bg-subtle') avatarBg = 'bg-primary-base';
  
  return { badgeBg, avatarBg };
};
