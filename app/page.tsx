'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-sans antialiased">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/50">
        <div className="max-w-container-max mx-auto px-margin-desktop h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold" style={{ fontSize: '20px' }}>
            <span className="material-symbols-outlined fill text-[24px]">analytics</span>
            Rindell AI
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors">How it Works</a>
            <a href="#features" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="text-label-sm text-primary font-medium hover:underline transition-all">
              Login
            </Link>
            <Link href="/auth?mode=signup" className="btn-primary py-2.5 px-5 text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-margin-desktop md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary-container/30 text-secondary border border-secondary/20 px-3 py-1.5 rounded-full text-label-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Powered by Groq + Llama 3.3 70B
            </div>
            <h1 className="text-display-mobile lg:text-display-lg text-on-surface mb-6 leading-tight">
              Your AI Document Analyst,{' '}
              <span className="text-primary">Right in WhatsApp</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Send PDFs, Word docs, spreadsheets, or any document via WhatsApp and get instant intelligent analysis, summaries, and step-by-step solutions — in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?mode=signup" className="btn-whatsapp py-4 px-8 text-base font-semibold shadow-md">
                <span className="material-symbols-outlined text-[22px]">chat</span>
                Get Started Free
              </Link>
              <a href="#how-it-works" className="btn-secondary py-4 px-8 text-base">
                See How It Works
              </a>
            </div>
            <p className="text-label-sm text-on-surface-variant mt-5">
              ✓ No credit card required  ✓ 2 free analyses/month  ✓ Setup in 2 minutes
            </p>
          </div>

          {/* Right — WhatsApp Chat Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[380px] bg-on-surface rounded-2xl shadow-ambient overflow-hidden">
              {/* Chat Header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-whatsapp-green flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Rindell AI</p>
                  <p className="text-white/70 text-xs">Online</p>
                </div>
              </div>
              {/* Chat Background */}
              <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[340px]">
                {/* User message — document */}
                <div className="flex justify-end">
                  <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2.5 max-w-[80%] shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[#128C7E] text-[18px]">picture_as_pdf</span>
                      <span className="text-xs font-medium text-on-surface">Q3_Economics_Notes.pdf</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">Can you summarize chapter 4 and give me 3 practice questions?</p>
                    <p className="text-[10px] text-on-surface-variant/60 text-right mt-1">10:42 AM</p>
                  </div>
                </div>
                {/* Analyzing state */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                    <p className="text-xs text-on-surface-variant italic">Analyzing document...</p>
                  </div>
                </div>
                {/* Rindell response */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg rounded-tl-none px-3 py-2.5 max-w-[85%] shadow-sm">
                    <p className="text-xs font-semibold text-on-surface mb-1.5">📊 Chapter 4 Summary:</p>
                    <p className="text-xs text-on-surface-variant mb-2">Focuses on Macroeconomic indicators. Key takeaways: GDP measures total output, inflation tracks price levels...</p>
                    <p className="text-xs font-semibold text-on-surface mb-1">✏️ Practice Questions:</p>
                    <p className="text-xs text-on-surface-variant">1. Define real vs nominal GDP.</p>
                    <p className="text-xs text-on-surface-variant">2. How does CPI differ from the GDP deflator?</p>
                    <p className="text-xs text-on-surface-variant">3. What causes demand-pull inflation?</p>
                    <p className="text-[10px] text-on-surface-variant/60 text-right mt-1.5">10:43 AM ✓✓</p>
                  </div>
                </div>
              </div>
              {/* Chat Input */}
              <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-on-surface-variant">
                  Type a message
                </div>
                <div className="w-9 h-9 rounded-full bg-whatsapp-green flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[18px]">mic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-surface-container-low px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <p className="text-label-sm text-primary font-semibold uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="text-display-mobile text-on-surface mb-4">How Rindell Works</h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">Three steps to intelligent document analysis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: 'link', title: 'Connect WhatsApp', desc: 'Sign up and scan a QR code to link your WhatsApp account to Rindell. Takes under 2 minutes.' },
              { step: '02', icon: 'upload_file', title: 'Send Any Document', desc: 'Send a PDF, Word doc, spreadsheet, or PowerPoint to your Rindell chat. Or upload directly on the web.' },
              { step: '03', icon: 'auto_awesome', title: 'Get Instant Analysis', desc: 'Rindell AI reads, understands, and delivers a detailed analysis back to you in seconds.' },
            ].map((item) => (
              <div key={item.step} className="card p-8 relative overflow-hidden group hover:shadow-card-hover transition-shadow">
                <div className="absolute top-4 right-6 text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors select-none">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-[24px]">{item.icon}</span>
                </div>
                <h3 className="text-headline-md mb-3">{item.title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <p className="text-label-sm text-primary font-semibold uppercase tracking-wider mb-3">Capabilities</p>
            <h2 className="text-display-mobile text-on-surface mb-4">Built for Everyone</h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Students, professionals, business owners — Rindell adapts its analysis to match your document type
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'school', title: 'Assignment Solver', desc: 'Step-by-step solutions with full working shown. Great for homework, past papers, and practice questions.' },
              { icon: 'summarize', title: 'Document Summary', desc: 'Key points and overview extracted from any document — reports, memos, research papers, and more.' },
              { icon: 'gavel', title: 'Contract Analysis', desc: 'Flags risky clauses, obligations, deadlines and penalties. Know exactly what you\'re signing.' },
              { icon: 'trending_up', title: 'Financial Review', desc: 'Extracts key figures, assesses risk, highlights assumptions and trends in financial documents.' },
              { icon: 'description', title: 'Multi-Format Support', desc: 'PDF, Word, Excel, PowerPoint — Rindell handles all major document formats without extra steps.' },
              { icon: 'bolt', title: 'Instant Delivery', desc: 'Average processing time under 10 seconds. Your analysis arrives before you put your phone down.' },
            ].map((f) => (
              <div key={f.title} className="card p-6 hover:shadow-card-hover transition-shadow group">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-[20px]">{f.icon}</span>
                </div>
                <h3 className="font-semibold text-on-surface mb-2" style={{ fontSize: '16px' }}>{f.title}</h3>
                <p className="text-label-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-surface-container-low px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-display-mobile text-on-surface mb-4">Who Uses Rindell?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'school', label: 'Students', color: 'bg-primary-fixed text-primary', items: ['Solve assignments instantly', 'Summarize lecture notes', 'Generate practice questions', 'Understand complex topics'] },
              { icon: 'work', label: 'Professionals', color: 'bg-secondary-container/30 text-secondary', items: ['Analyze contracts quickly', 'Summarize long reports', 'Extract key decisions', 'Review financial statements'] },
              { icon: 'business', label: 'Business Owners', color: 'bg-surface-container-high text-on-surface', items: ['Review business proposals', 'Analyze market research', 'Understand legal documents', 'Process client documents'] },
            ].map((uc) => (
              <div key={uc.label} className="card p-8">
                <div className={`w-12 h-12 rounded-xl ${uc.color} flex items-center justify-center mb-6`}>
                  <span className="material-symbols-outlined text-[24px]">{uc.icon}</span>
                </div>
                <h3 className="text-headline-md mb-5">{uc.label}</h3>
                <ul className="space-y-3">
                  {uc.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <p className="text-label-sm text-primary font-semibold uppercase tracking-wider mb-3">Simple Pricing</p>
            <h2 className="text-display-mobile text-on-surface mb-4">Start Free, Scale as You Grow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { plan: 'Free', price: '$0', period: '/mo', docs: '2 docs/month', features: ['Basic analysis', 'WhatsApp connection', 'Web upload'], cta: 'Get Started', highlight: false },
              { plan: 'Student', price: '$10', period: '/mo', docs: '10 docs/month', features: ['Deep analysis', 'Assignment solver', 'Export to PDF', 'Priority processing'], cta: 'Get Student', highlight: true },
              { plan: 'Pro', price: '$29', period: '/mo', docs: 'Unlimited docs', features: ['Everything in Student', 'Custom prompts', 'API access', 'Priority support'], cta: 'Go Pro', highlight: false },
              { plan: 'Business', price: '$99', period: '/mo', docs: 'Unlimited docs', features: ['Everything in Pro', 'Team accounts (5)', 'Custom branding', 'Dedicated support'], cta: 'Contact Sales', highlight: false },
            ].map((p) => (
              <div key={p.plan} className={`rounded-xl border p-6 flex flex-col relative ${p.highlight ? 'border-2 border-primary bg-primary/5 shadow-card' : 'border-outline-variant bg-surface-container-lowest'}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary-container text-[11px] font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-label-sm text-on-surface-variant mb-1">{p.plan}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-display-mobile text-on-surface">{p.price}</span>
                    <span className="text-body-md text-on-surface-variant mb-1">{p.period}</span>
                  </div>
                  <p className="text-label-sm text-primary font-medium mt-1">{p.docs}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-label-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth?mode=signup" className={`w-full py-2.5 rounded-lg text-label-sm font-semibold text-center transition-all ${p.highlight ? 'bg-primary text-on-primary hover:bg-primary-container' : 'border border-outline text-primary hover:bg-surface-container-low'}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="text-display-mobile text-on-primary mb-6">Ready to Analyze Smarter?</h2>
          <p className="text-body-lg text-on-primary/80 mb-10 max-w-xl mx-auto">
            Join hundreds of students and professionals getting instant AI-powered document insights.
          </p>
          <Link href="/auth?mode=signup" className="inline-flex items-center gap-2 bg-whatsapp-green text-white py-4 px-10 rounded-lg font-semibold text-base hover:bg-whatsapp-dark transition-colors shadow-lg">
            <span className="material-symbols-outlined text-[22px]">chat</span>
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant py-12 px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-primary font-bold" style={{ fontSize: '18px' }}>
            <span className="material-symbols-outlined fill text-[22px]">analytics</span>
            Rindell AI
          </div>
          <div className="flex items-center gap-8 text-label-sm text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">WhatsApp Bot</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
          </div>
          <p className="text-label-sm text-on-surface-variant">© 2026 Rindell AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
