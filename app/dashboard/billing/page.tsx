'use client'

import { useState } from 'react'
import Link from 'next/link'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/mo',
    docs: '2 documents/month',
    features: ['Standard Analysis', 'WhatsApp connection', 'Web upload'],
    cta: 'Downgrade',
    current: false,
    popular: false,
  },
  {
    id: 'student',
    name: 'Student',
    price: '$10',
    period: '/mo',
    docs: '10 documents/month',
    features: ['Deep Analysis', 'Assignment Solver', 'Export to PDF', 'Priority processing'],
    cta: 'Active',
    current: true,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/mo',
    docs: 'Unlimited Documents',
    features: ['Everything in Student', 'Custom prompts', 'API access', 'Priority support'],
    cta: 'Upgrade',
    current: false,
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '$99',
    period: '/mo',
    docs: 'Unlimited Documents',
    features: ['Everything in Pro', 'Team accounts (5)', 'Custom branding', 'Dedicated support'],
    cta: 'Contact Sales',
    current: false,
    popular: false,
  },
]

const billingHistory = [
  { date: 'Sep 15, 2024', amount: '$10.00', status: 'Paid', invoice: '#INV-001' },
  { date: 'Aug 15, 2024', amount: '$10.00', status: 'Paid', invoice: '#INV-002' },
  { date: 'Jul 15, 2024', amount: '$10.00', status: 'Paid', invoice: '#INV-003' },
]

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Current Plan Banner */}
      <div className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-primary fill text-[24px]">workspace_premium</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-headline-md font-bold text-on-surface">Student Plan</h3>
              <span className="text-[11px] bg-secondary-container/20 text-on-secondary-container px-2 py-0.5 rounded-full font-semibold">Current</span>
            </div>
            <p className="text-label-sm text-on-surface-variant">$10/mo · Renews on Oct 15, 2024</p>
          </div>
        </div>
        <div className="flex-1 max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-label-sm text-on-surface-variant">Usage this month</span>
            <span className="text-label-sm text-primary font-bold">70%</span>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-2">
            <div className="bg-primary-container h-2 rounded-full transition-all" style={{ width: '70%' }} />
          </div>
          <p className="text-[11px] text-on-surface-variant mt-1.5">7 of 10 documents used</p>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-label-sm font-medium ${billingCycle === 'monthly' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Monthly</span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
          className={`relative w-12 h-6 rounded-full transition-colors ${billingCycle === 'annual' ? 'bg-secondary' : 'bg-surface-variant'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-label-sm font-medium ${billingCycle === 'annual' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Annual</span>
          <span className="text-[10px] bg-secondary-container/20 text-on-secondary-container px-2 py-0.5 rounded-full font-bold">Save 20%</span>
        </div>
      </div>

      {/* Plan Cards */}
      <div>
        <h2 className="text-headline-md font-bold text-on-surface mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border flex flex-col p-6 relative transition-shadow hover:shadow-card-hover
                ${plan.current
                  ? 'border-2 border-primary bg-primary/5 shadow-card'
                  : plan.popular
                  ? 'border-secondary/30 bg-secondary-container/5'
                  : 'border-outline-variant bg-surface-container-lowest'}`}
            >
              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  CURRENT PLAN
                </div>
              )}
              {plan.popular && !plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-5">
                <p className="text-label-sm text-on-surface-variant mb-1">{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-black text-on-surface tracking-tight">
                    {billingCycle === 'annual' && plan.price !== '$0'
                      ? `$${Math.round(parseInt(plan.price.replace('$', '')) * 0.8)}`
                      : plan.price}
                  </span>
                  <span className="text-body-md text-on-surface-variant mb-1">{plan.period}</span>
                </div>
                <p className="text-[11px] text-primary font-semibold">{plan.docs}</p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[14px] flex-shrink-0">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 rounded-lg text-label-sm font-bold text-center transition-all
                  ${plan.current
                    ? 'bg-surface-variant text-on-surface-variant cursor-default'
                    : plan.id === 'free'
                    ? 'border border-outline-variant text-on-surface hover:bg-surface-container-low'
                    : 'bg-primary text-on-primary hover:bg-primary-container shadow-primary-sm'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Method */}
        <div className="card p-6 flex flex-col gap-5">
          <h3 className="text-headline-md font-semibold text-on-surface">Payment Method</h3>
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-on-surface rounded flex items-center justify-center">
                <span className="text-surface text-[10px] font-black tracking-widest">VISA</span>
              </div>
              <div>
                <p className="text-label-sm text-on-surface font-semibold">Visa ending in 4242</p>
                <p className="text-[12px] text-on-surface-variant">Expires 12/2025</p>
              </div>
            </div>
            <span className="text-[10px] bg-secondary-container/20 text-on-secondary-container px-2 py-1 rounded-full font-semibold">Default</span>
          </div>
          <button className="flex items-center gap-2 text-label-sm text-primary hover:text-primary-container transition-colors font-semibold self-start">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Update Payment Method
          </button>
        </div>

        {/* Billing History */}
        <div className="card p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-md font-semibold text-on-surface">Billing History</h3>
            <button className="text-label-sm text-primary hover:text-primary-container font-semibold transition-colors">
              Download All
            </button>
          </div>
          <div className="divide-y divide-outline-variant/50">
            {billingHistory.map((item) => (
              <div key={item.invoice} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-label-sm text-on-surface font-semibold">{item.date}</p>
                  <p className="text-[12px] text-on-surface-variant">{item.invoice}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-label-sm text-on-surface font-semibold">{item.amount}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-secondary font-medium">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    {item.status}
                  </span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
