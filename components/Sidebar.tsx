'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/dashboard/upload', label: 'Upload', icon: 'upload_file' },
  { href: '/dashboard/history', label: 'History', icon: 'history' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
  { href: '/dashboard/billing', label: 'Billing', icon: 'account_balance_wallet' },
]

interface SidebarProps {
  userEmail?: string
  userInitial?: string
}

export default function Sidebar({ userEmail, userInitial = 'R' }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-low border-r border-outline-variant flex flex-col p-gutter z-20 hidden md:flex">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-headline-md">
          R
        </div>
        <div>
          <h1 className="font-bold text-primary" style={{ fontSize: '18px', lineHeight: '24px' }}>
            Rindell AI
          </h1>
          <p className="text-label-sm text-on-surface-variant">AI Analyst</p>
        </div>
      </div>

      {/* New Analysis CTA */}
      <Link
        href="/dashboard/upload"
        className="w-full bg-primary-container text-on-primary py-3 rounded-lg text-label-sm flex items-center justify-center gap-2 mb-8 hover:opacity-90 transition-opacity shadow-primary-sm"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        New Analysis
      </Link>

      {/* Main Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-sm transition-all',
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1'
              )}
            >
              <span
                className={cn(
                  'material-symbols-outlined text-[20px]',
                  isActive && 'fill'
                )}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-outline-variant flex flex-col gap-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-label-sm"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
          Help
        </Link>
        <button
          className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-label-sm w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout
        </button>

        {/* User info at bottom */}
        {userEmail && (
          <div className="mt-4 px-3 py-3 flex items-center gap-3 bg-surface-container rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
              {userInitial}
            </div>
            <div className="overflow-hidden">
              <p className="text-label-sm text-on-surface truncate">{userEmail}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
