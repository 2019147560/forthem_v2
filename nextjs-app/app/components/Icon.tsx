export const Icon = ({ name, size = 16, ...rest }: { name: string; size?: number; [key: string]: unknown }) => {
  const s = size
  const common = {
    width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    ...rest,
  }
  switch (name) {
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
    case 'chev-down': return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>
    case 'chev-right': return <svg {...common}><path d="m9 6 6 6-6 6" /></svg>
    case 'chev-left': return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>
    case 'check': return <svg {...common}><path d="m5 12 5 5L20 7" /></svg>
    case 'x': return <svg {...common}><path d="M18 6 6 18M6 6l12 12" /></svg>
    case 'reset': return <svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
    case 'grid': return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
    case 'list': return <svg {...common}><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" /></svg>
    case 'bookmark': return <svg {...common}><path d="M5 3h14v18l-7-5-7 5z" /></svg>
    case 'bell': return <svg {...common}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></svg>
    case 'home': return <svg {...common}><path d="m3 11 9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z" /></svg>
    case 'arrow-up-right': return <svg {...common}><path d="M7 17 17 7M9 7h8v8" /></svg>
    case 'phone': return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
    case 'plus': return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
    default: return null
  }
}
