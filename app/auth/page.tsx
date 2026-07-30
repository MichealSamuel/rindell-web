'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login'

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })
        if (error) throw error
        setSuccess('Account created! Check your email to verify your account.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen flex font-sans antialiased bg-surface-container-lowest text-on-surface">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12 xl:p-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-surface-tint opacity-80 pointer-events-none" />
        <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-secondary-container rounded-full mix-blend-overlay filter blur-[120px] opacity-20 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2 text-on-primary font-bold" style={{ fontSize: '20px' }}>
          <span className="material-symbols-outlined fill text-[24px]">analytics</span>
          Rindell AI
        </div>

        {/* Illustration */}
        <div className="relative z-10 flex-1 flex items-center justify-center mt-16 mb-16">
          <div className="w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl border border-on-primary/10 bg-primary-container/20 backdrop-blur-md flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/40 to-surface-tint/20 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-on-primary/10 backdrop-blur-md border border-on-primary/20 flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined fill text-on-primary text-[40px]">analytics</span>
                </div>
                <p className="text-on-primary/80 text-body-md leading-relaxed max-w-xs">
                  Transforming documents into actionable insights with the power of AI
                </p>
                {/* Animated dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-on-primary/60"
                      style={{ animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-display-mobile text-on-primary mb-4 leading-tight">Your AI Document Analyst.</h1>
          <p className="text-body-lg text-on-primary/80 leading-relaxed">
            Transform static PDFs and spreadsheets into dynamic, actionable insights in seconds.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-[400px] flex flex-col">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 text-primary font-bold mb-10" style={{ fontSize: '20px' }}>
            <span className="material-symbols-outlined fill text-[24px]">analytics</span>
            Rindell AI
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-display-mobile text-on-surface mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-body-md text-on-surface-variant">
              {mode === 'login' ? 'Log in to access your analysis dashboard.' : 'Start analyzing documents with AI for free.'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex p-1 bg-surface-container-low rounded-lg mb-8 relative">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-surface-container-lowest shadow-sm rounded-md transition-transform duration-300 ease-in-out"
              style={{ transform: mode === 'login' ? 'translateX(0)' : 'translateX(calc(100% + 8px))' }}
            />
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-center text-label-sm font-medium z-10 transition-colors ${mode === 'login' ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-center text-label-sm font-medium z-10 transition-colors ${mode === 'signup' ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-sm text-on-surface hover:bg-surface-container-low hover:border-outline transition-all mb-6 shadow-sm group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-outline-variant/50" />
            <span className="text-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">or continue with email</span>
            <div className="flex-1 h-[1px] bg-outline-variant/50" />
          </div>

          {/* Error/Success */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-error-container rounded-lg mb-5">
              <span className="material-symbols-outlined text-on-error-container text-[18px]">error</span>
              <p className="text-label-sm text-on-error-container">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-secondary-container/30 rounded-lg mb-5">
              <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
              <p className="text-label-sm text-secondary">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-label-sm text-on-surface" htmlFor="fullName">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px]">person</span>
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-label-sm text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-label-sm text-on-surface" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary cursor-pointer" />
                  <span className="text-label-sm text-on-surface-variant">Remember me</span>
                </label>
                <a href="#" className="text-label-sm text-primary hover:underline transition-all">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-primary text-on-primary rounded-lg text-label-sm font-bold shadow-sm hover:shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Continue' : 'Create Account'}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-body-md text-on-surface-variant">
            {mode === 'login' ? (
              <>Don&apos;t have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-primary font-bold hover:underline ml-1">Sign up</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-primary font-bold hover:underline ml-1">Log in</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">
      <span className="material-symbols-outlined text-primary animate-spin text-[48px]">progress_activity</span>
    </div>}>
      <AuthForm />
    </Suspense>
  )
}
