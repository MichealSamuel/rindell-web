'use client'

import { useState } from 'react'

type Tab = 'account' | 'whatsapp' | 'notifications' | 'security'

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('account')
  const [saved, setSaved] = useState(false)
  const [firstName, setFirstName] = useState('Alex')
  const [lastName, setLastName] = useState('Rivera')
  const [email, setEmail] = useState('alex.rivera@example.com')
  const [phone, setPhone] = useState('(555) 000-1234')

  const [notif, setNotif] = useState({
    whatsapp: true,
    email: true,
    weekly: false,
  })

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'account', label: 'Account' },
    { id: 'whatsapp', label: 'WhatsApp Connection' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ]

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-display-mobile font-bold text-on-surface mb-2">Settings</h1>
        <p className="text-body-md text-on-surface-variant">Manage your account details and integrations.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-outline-variant mb-8 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 px-1 mr-6 border-b-2 text-label-sm font-medium whitespace-nowrap transition-colors
              ${tab === t.id
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-primary'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {tab === 'account' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <form onSubmit={handleSave} className="lg:col-span-8 card p-8 flex flex-col gap-6">
            <h3 className="text-headline-md font-semibold text-on-surface">Profile Information</h3>

            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-2xl font-bold border-2 border-outline-variant">
                  {firstName[0]}{lastName[0]}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
              </div>
              <div>
                <p className="text-label-sm text-on-surface font-semibold">Profile Photo</p>
                <p className="text-[12px] text-on-surface-variant mt-1">JPG or PNG · Max 2MB</p>
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-on-surface font-semibold" htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-on-surface font-semibold" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm text-on-surface font-semibold" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm text-on-surface font-semibold" htmlFor="phone">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">phone</span>
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-field pl-11"
                />
              </div>
            </div>

            {/* Success message */}
            {saved && (
              <div className="flex items-center gap-2 p-3 bg-secondary-container/30 rounded-lg border border-secondary/10">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <p className="text-label-sm text-secondary font-medium">Changes saved successfully!</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="btn-secondary px-6"
                onClick={() => { setFirstName('Alex'); setLastName('Rivera') }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary px-6">
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Changes
              </button>
            </div>
          </form>

          {/* WhatsApp card on right */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-[20px]">forum</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-secondary-container/20 text-on-secondary-container border border-secondary/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Active
                </span>
              </div>
              <h4 className="font-semibold text-on-surface mb-1" style={{ fontSize: '16px' }}>WhatsApp Integration</h4>
              <p className="text-[12px] text-on-surface-variant mb-4">Connected to +1 (555) 000-1234</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-3 border border-error text-error rounded-lg text-label-sm font-semibold hover:bg-error-container transition-colors">
                  Disconnect
                </button>
                <button className="flex-1 py-2 px-3 border border-outline-variant text-on-surface rounded-lg text-label-sm font-semibold hover:bg-surface-container-low transition-colors">
                  Reconnect
                </button>
              </div>
            </div>

            <div className="card p-6 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-[24px]">shield</span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                Your connection is secured with end-to-end encryption.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Tab */}
      {tab === 'whatsapp' && (
        <div className="max-w-2xl">
          <div className="card p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-headline-md font-semibold text-on-surface mb-2">WhatsApp Connection</h3>
              <p className="text-body-md text-on-surface-variant">Manage how Rindell connects to your WhatsApp account.</p>
            </div>

            <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-xl border border-outline-variant">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary fill text-[24px]">forum</span>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface font-semibold">+1 (555) 000-1234</p>
                  <p className="text-[12px] text-on-surface-variant">Connected · Last active 2 hours ago</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-secondary-container/20 text-on-secondary-container">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Active
              </span>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant">
                <div>
                  <p className="text-label-sm text-on-surface font-semibold">Auto-analyze documents</p>
                  <p className="text-[12px] text-on-surface-variant mt-0.5">Automatically analyze documents sent via WhatsApp</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-secondary flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-white translate-x-6 shadow-sm transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant">
                <div>
                  <p className="text-label-sm text-on-surface font-semibold">Send to self-chat</p>
                  <p className="text-[12px] text-on-surface-variant mt-0.5">Deliver summaries to your own WhatsApp chat</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-secondary flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-white translate-x-6 shadow-sm transition-transform" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="btn-secondary flex-1 border-error text-error hover:bg-error-container">
                <span className="material-symbols-outlined text-[18px]">link_off</span>
                Disconnect
              </button>
              <button className="btn-primary flex-1">
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                Reconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {tab === 'notifications' && (
        <div className="max-w-2xl">
          <div className="card p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-headline-md font-semibold text-on-surface mb-2">Notification Preferences</h3>
              <p className="text-body-md text-on-surface-variant">Choose how and when you receive notifications.</p>
            </div>
            {[
              { key: 'whatsapp', label: 'WhatsApp Notifications', desc: 'Receive analysis results directly in WhatsApp' },
              { key: 'email', label: 'Email Notifications', desc: 'Receive a summary email after each analysis' },
              { key: 'weekly', label: 'Weekly Report', desc: 'Get a weekly digest of your document activity' },
            ].map(n => (
              <div key={n.key} className="flex items-center justify-between p-5 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors">
                <div>
                  <p className="text-label-sm text-on-surface font-semibold">{n.label}</p>
                  <p className="text-[12px] text-on-surface-variant mt-0.5">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotif(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof notif] }))}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer flex-shrink-0 ${notif[n.key as keyof typeof notif] ? 'bg-secondary' : 'bg-surface-variant'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notif[n.key as keyof typeof notif] ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
            <button className="btn-primary self-start px-8">Save Preferences</button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {tab === 'security' && (
        <div className="max-w-2xl flex flex-col gap-6">
          <div className="card p-8 flex flex-col gap-6">
            <h3 className="text-headline-md font-semibold text-on-surface">Change Password</h3>
            <div className="flex flex-col gap-4">
              {[
                { id: 'current', label: 'Current Password' },
                { id: 'new', label: 'New Password' },
                { id: 'confirm', label: 'Confirm New Password' },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-on-surface font-semibold">{f.label}</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
              ))}
            </div>
            <button className="btn-primary self-start px-8">Update Password</button>
          </div>

          <div className="card p-8 flex flex-col gap-4">
            <h3 className="text-headline-md font-semibold text-on-surface">Active Sessions</h3>
            {[
              { device: 'Chrome on Windows', location: 'Lagos, Nigeria', time: 'Active now', current: true },
              { device: 'Safari on iPhone', location: 'Lagos, Nigeria', time: '2 hours ago', current: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-outline-variant">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      {s.device.includes('iPhone') ? 'smartphone' : 'computer'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-label-sm text-on-surface font-semibold">{s.device}</p>
                      {s.current && (
                        <span className="text-[10px] bg-secondary-container/20 text-on-secondary-container px-2 py-0.5 rounded-full font-medium">Current</span>
                      )}
                    </div>
                    <p className="text-[12px] text-on-surface-variant">{s.location} · {s.time}</p>
                  </div>
                </div>
                {!s.current && (
                  <button className="text-label-sm text-error hover:text-on-error-container transition-colors font-semibold">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="card p-8 border-error/20">
            <h3 className="text-headline-md font-semibold text-on-surface mb-2">Danger Zone</h3>
            <p className="text-body-md text-on-surface-variant mb-6">Permanently delete your account and all associated data.</p>
            <button className="px-6 py-2.5 border border-error text-error rounded-lg text-label-sm font-semibold hover:bg-error-container transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
