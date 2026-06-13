import * as React from "react"

interface BlueprintProps {
  type: "upright-chiller" | "upright-freezer" | "underbench" | "showcase" | "ice-machine" | "coldroom"
}

export function Blueprint({ type }: BlueprintProps) {
  switch (type) {
    case "upright-chiller":
    case "upright-freezer":
      return (
        <svg viewBox="0 0 160 200" className="w-full h-44 text-foreground/30 stroke-current fill-none">
          <rect x="30" y="10" width="100" height="180" rx="3" strokeWidth="1.5" />
          <line x1="30" y1="90" x2="130" y2="90" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="80" y1="10" x2="80" y2="190" strokeWidth="0.75" strokeDasharray="3 3" />
          <rect x="40" y="20" width="80" height="15" rx="1" strokeWidth="0.75" fill="currentColor" className="fill-foreground/5" />
          <text x="50" y="30" fontSize="8" className="fill-foreground font-mono font-semibold">Q-TEMP CONTROL</text>
          <rect x="115" y="80" width="6" height="30" rx="1" strokeWidth="1" />
          <rect x="42" y="50" width="76" height="30" strokeWidth="0.75" />
          <rect x="42" y="100" width="76" height="30" strokeWidth="0.75" />
          <rect x="42" y="145" width="76" height="30" strokeWidth="0.75" />
        </svg>
      )
    case "underbench":
      return (
        <svg viewBox="0 0 200 130" className="w-full h-44 text-foreground/30 stroke-current fill-none">
          <rect x="20" y="20" width="160" height="90" rx="3" strokeWidth="1.5" />
          <rect x="18" y="15" width="164" height="6" rx="1" strokeWidth="1.5" fill="currentColor" className="fill-foreground/5" />
          <line x1="100" y1="20" x2="100" y2="110" strokeWidth="1.5" />
          <rect x="85" y="50" width="6" height="25" rx="1" strokeWidth="1" />
          <rect x="109" y="50" width="6" height="25" rx="1" strokeWidth="1" />
          <circle cx="100" cy="30" r="2" strokeWidth="0.75" fill="currentColor" />
          <line x1="20" y1="110" x2="30" y2="125" strokeWidth="1.5" />
          <line x1="180" y1="110" x2="170" y2="125" strokeWidth="1.5" />
        </svg>
      )
    case "showcase":
      return (
        <svg viewBox="0 0 180 150" className="w-full h-44 text-foreground/30 stroke-current fill-none">
          <path d="M 20 130 L 20 60 A 60 60 0 0 1 120 20 L 160 20 L 160 130 Z" strokeWidth="1.5" />
          <line x1="20" y1="130" x2="160" y2="130" strokeWidth="1.5" />
          <rect x="25" y="130" width="130" height="15" strokeWidth="1" fill="currentColor" className="fill-foreground/5" />
          <line x1="30" y1="85" x2="150" y2="85" strokeWidth="1" />
          <line x1="45" y1="50" x2="140" y2="50" strokeWidth="1" />
          <text x="35" y="115" fontSize="8" className="fill-foreground font-mono">DOUBLE GLAZED</text>
        </svg>
      )
    case "ice-machine":
      return (
        <svg viewBox="0 0 160 160" className="w-full h-44 text-foreground/30 stroke-current fill-none">
          <rect x="30" y="20" width="100" height="120" rx="3" strokeWidth="1.5" />
          <rect x="40" y="35" width="80" height="35" rx="1" strokeWidth="1" fill="currentColor" className="fill-foreground/5" />
          <line x1="40" y1="52" x2="120" y2="52" strokeWidth="0.75" strokeDasharray="2 2" />
          <rect x="40" y="85" width="80" height="40" rx="2" strokeWidth="1" />
          <circle cx="50" cy="105" r="4" strokeWidth="0.75" />
          <text x="62" y="110" fontSize="7" className="fill-foreground font-mono">ICE CHAMBER</text>
        </svg>
      )
    case "coldroom":
    default:
      return (
        <svg viewBox="0 0 180 160" className="w-full h-44 text-foreground/30 stroke-current fill-none">
          <rect x="20" y="20" width="140" height="120" rx="1" strokeWidth="1.5" />
          <rect x="35" y="20" width="90" height="120" strokeWidth="0.75" strokeDasharray="3 3" />
          <rect x="70" y="35" width="40" height="90" strokeWidth="1.5" />
          <circle cx="78" cy="80" r="3" strokeWidth="1" fill="currentColor" />
          <text x="75" y="135" fontSize="8" className="fill-foreground font-mono font-semibold">MONOBLOCK</text>
        </svg>
      )
  }
}
