'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/upload': 'Upload & Analyze',
  '/dashboard/history': 'Analysis History',
  '/dashboard/settings': 'Settings',
  '/dashboard/billing': 'Plans & Billing',
}

export default function TopBar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'Dashboard'

  return (
    <header className="sticky top-0 z-10 bg-surface border-b border-outline-variant/50 shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-on-surface-variant hover:bg-surface-container-highest rounded-full p-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="font-bold text-primary hidden sm:block" style={{ fontSize: '20px' }}>
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <button className="text-on-surface-variant hover:bg-surface-container-highest rounded-full p-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-highest rounded-full p-2 active:scale-95 transition-transform relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-sm font-bold ml-1 border border-outline-variant cursor-pointer hover:opacity-90 transition-opacity">
          R
        </div>
      </div>
    </header>
  )
}
