'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type ConnectionStatus = 'waiting' | 'scanning' | 'connected' | 'error'

export default function OnboardingPage() {
  const router = useRouter()
  const [status, setStatus] = useState<ConnectionStatus>('waiting')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [error, setError] = useState('')

  // In production this polls your Connection Manager API for QR code
  // For now shows the UI with loading state
  useEffect(() => {
    // Simulate QR code loading (replace with real API call)
    const timer = setTimeout(() => {
      // This will be replaced by: fetch('/api/whatsapp/qr?userId=xxx')
      setQrCode('placeholder')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  function handleSkip() {
    router.push('/dashboard')
  }

  function handleContinue() {
    if (status === 'connected') {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-margin-mobile md:p-margin-desktop font-sans antialiased">
      <main className="w-full max-w-[800px] bg-surface-container-lowest rounded-xl shadow-ambient flex flex-col overflow-hidden relative">

        {/* Header & Progress */}
        <div className="px-6 pt-8 pb-4 md:px-10 flex flex-col gap-6 border-b border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
              </div>
              <span className="font-bold text-primary" style={{ fontSize: '18px' }}>Rindell AI</span>
            </div>
            <span className="text-label-sm text-on-surface-variant">Step 2 of 3</span>
          </div>

          {/* Progress bar */}
          <div className="w-full flex gap-2 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-primary flex-1 rounded-full" />
            <div className="h-full bg-primary flex-1 rounded-full relative overflow-hidden">
              <div
                className="absolute inset-0 shimmer -translate-x-full"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
              />
            </div>
            <div className="h-full bg-surface-variant flex-1 rounded-full" />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row gap-12 md:gap-16">

          {/* Left: Instructions */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-headline-md text-on-surface mb-3">Connect WhatsApp</h1>
            <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
              Link your account to interact with your AI Analyst directly through your chats. It&apos;s secure and takes just a moment.
            </p>

            <ol className="space-y-6">
              {[
                'Open WhatsApp on your phone',
                (<>Tap <strong>Settings</strong> <span className="text-outline mx-1">&gt;</span> <strong>Linked Devices</strong></>),
                (<>Tap <strong>Link a Device</strong></>),
                'Scan the QR code shown here',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-label-sm font-bold
                    ${i === 3 ? 'bg-primary/10 ring-2 ring-primary/20 text-primary' : 'bg-surface-container-high text-primary'}`}>
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <span className={`text-body-md text-on-surface ${i === 3 ? 'font-medium' : ''}`}>
                      {step}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: QR Code */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative bg-surface p-6 rounded-2xl border-2 border-dashed border-outline-variant/50 qr-pulse shadow-sm">
              {/* Corner markers */}
              {[
                'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg -translate-x-1 -translate-y-1',
                'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg translate-x-1 -translate-y-1',
                'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg -translate-x-1 translate-y-1',
                'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg translate-x-1 translate-y-1',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-4 h-4 border-primary ${cls}`} />
              ))}

              {/* QR Code area */}
              <div className="w-60 h-60 flex items-center justify-center">
                {!qrCode ? (
                  <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-[48px] animate-spin">progress_activity</span>
                    <p className="text-label-sm text-on-surface-variant">Generating QR code...</p>
                  </div>
                ) : status === 'connected' ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary fill text-[48px]">check_circle</span>
                    </div>
                    <p className="text-body-md font-semibold text-secondary">WhatsApp Connected!</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* QR placeholder - in production, render actual QR from API */}
                    <div className="w-48 h-48 bg-on-surface rounded-lg flex items-center justify-center">
                      <div className="w-44 h-44 bg-surface-container-lowest rounded p-2">
                        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-full h-full">
                          {Array.from({ length: 49 }).map((_, i) => {
                            const corners = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48]
                            const inner = [8,9,10,11,12,15,19,22,26,29,33,36,37,38,39,40]
                            const filled = corners.includes(i) || [16,17,18,23,24,25,30,31,32].includes(i)
                            return (
                              <div
                                key={i}
                                className={`rounded-sm ${filled ? 'bg-on-surface' : 'bg-surface-container-lowest'}`}
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className={`mt-8 flex items-center gap-3 px-4 py-2.5 rounded-full border
              ${status === 'connected'
                ? 'bg-secondary/10 border-secondary/20 text-secondary'
                : 'bg-secondary/10 border-secondary/20 text-secondary'}`}>
              <span className={`material-symbols-outlined text-[20px] ${status === 'connected' ? 'fill' : 'animate-spin'}`}>
                {status === 'connected' ? 'check_circle' : 'sync'}
              </span>
              <span className="text-label-sm font-medium">
                {status === 'connected' ? 'Connected successfully!' : 'Waiting for scan...'}
              </span>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-error-container rounded-lg">
                <span className="material-symbols-outlined text-on-error-container text-[18px]">error</span>
                <p className="text-label-sm text-on-error-container">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 md:px-10 bg-surface border-t border-outline-variant/30 flex items-center justify-between mt-auto">
          <button
            onClick={handleSkip}
            className="text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Skip for now
          </button>
          <button
            onClick={handleContinue}
            disabled={status !== 'connected'}
            className={`text-label-sm px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all
              ${status === 'connected'
                ? 'bg-primary text-on-primary hover:bg-primary-container shadow-primary-sm'
                : 'bg-surface-variant text-on-surface-variant/50 cursor-not-allowed'}`}
          >
            Continue
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  )
}
