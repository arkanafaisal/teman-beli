export default function LogoIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="10 5 80 90" 
      className={className}
    >
      <defs>
        <mask id="mascot-holes">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <circle cx="35" cy="62" r="6" fill="black" />
          <circle cx="65" cy="62" r="6" fill="black" />
          <path d="M 43 72 Q 50 84, 57 72" fill="none" stroke="black" strokeWidth="4.5" strokeLinecap="round" />
        </mask>
      </defs>

      {/* Bag Handle */}
      <path 
        d="M 35 40 C 35 15, 65 15, 65 40" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
      />
      
      {/* Bag Body with cute face cut out */}
      <rect 
        x="15" 
        y="40" 
        width="70" 
        height="50" 
        rx="14" 
        fill="currentColor" 
        mask="url(#mascot-holes)"
      />

    </svg>
  );
}
