import { BookOpen, FlaskConical, Popcorn, Home, Package, Headphones, Coffee, Soup, Printer, ShoppingBasket, Ticket } from "lucide-react";

export const getCategoryIcon = (emoji, className = "w-5 h-5") => {
  const defaultProps = { className, strokeWidth: 2.5 };
  
  switch (emoji) {
    // Categories
    case "📚": return <BookOpen {...defaultProps} />;
    case "🧪": return <FlaskConical {...defaultProps} />;
    case "🍿": return <Popcorn {...defaultProps} />;
    case "🏠": return <Home {...defaultProps} />;
    case "📦": return <Package {...defaultProps} />;
    case "🎧": return <Headphones {...defaultProps} />;
    case "☕": return <Coffee {...defaultProps} />;
    case "🍛": return <Soup {...defaultProps} />;
    case "🖨️": return <Printer {...defaultProps} />;
    case "🧺": return <ShoppingBasket {...defaultProps} />;
    case "🎟️": return <Ticket {...defaultProps} />;
    
    default: return <span className={className.includes("w-") ? "text-lg" : ""}>{emoji}</span>;
  }
};

export const getCategoryColor = (emoji) => {
  switch (emoji) {
    case "📚": return "text-primary-base bg-primary-soft";
    case "🧪": return "text-success-base bg-success-soft";
    case "🍿": return "text-warning-text bg-warning-soft";
    case "🏠": return "text-danger-base bg-danger-soft";
    case "📦": return "text-primary-base bg-primary-soft";
    case "🎧": return "text-danger-base bg-danger-soft";
    case "☕": return "text-warning-text bg-warning-soft";
    case "🍛": return "text-success-base bg-success-soft";
    case "🖨️": return "text-primary-base bg-primary-soft";
    case "🧺": return "text-danger-base bg-danger-soft";
    case "🎟️": return "text-warning-text bg-warning-soft";
    default: return "text-text-base bg-bg-subtle";
  }
};
