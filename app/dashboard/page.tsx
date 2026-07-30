'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatDate, formatBytes } from '@/lib/utils'

// Mock data - will be replaced with real Supabase data
const recentAnalyses = [
  { id: '1', file_name: 'Marketing_Plan_Q4.pdf', created_at: '2024-10-12', source: 'whatsapp', analysis_type: 'general_summary', file_type: 'application/pdf' },
  { id: '2', file_name: 'Financial_Report_2023.docx', created_at: '2024-10-10', source: 'web', analysis_type: 'general_summary', file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  { id: '3', file_name: 'Q3_Economics_Notes.pdf', created_at: '2024-10-08', source: 'whatsapp', analysis_type: 'study_guide', file_type: 'application/pdf' },
]

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.includes('pdf')) return (
    <div className="w-10 h-10 rounded bg-error-container/30 text-error flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
    </div>
  )
  if (mimeType.includes('word') || mimeType.includes('document')) return (
    <div className="w-10 h-10 rounded bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-[20px]">description</span>
    </div>
  )
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return (
    <div className="w-10 h-10 rounded bg-secondary-container/20 text-secondary flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-[20px]">table_chart</span>
    </div>
  )
  return (
    <div className="w-10 h-10 rounded bg-surface-container text-on-surface-variant flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-[20px]">insert_drive_file</span>
    </div>
  )
}

export default function DashboardPage() {
  const [quickFile, setQuickFile] = useState<File | null>(null)

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) setQuickFile(files[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  })

  return (
    <div className="space-y-gutter">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">Welcome back! 👋</h1>
          <p className="text-label-sm text-on-surface-variant mt-1">Here&apos;s what&apos;s happening with your documents.</p>
        </div>
        <Link href="/dashboard/upload" className="hidden sm:flex btn-primary">
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Analysis
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Docs Processed */}
        <div className="card p-6 flex flex-col justify-between hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-label-sm text-on-surface-variant">Documents Processed</h3>
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">description</span>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-on-surface tracking-tight">34</span>
            <span className="text-sm text-secondary flex items-center mb-1">
              <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>+12%
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-1">This month</p>
        </div>

        {/* WhatsApp Status */}
        <div className="card p-6 flex flex-col justify-between hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-label-sm text-on-surface-variant">WhatsApp Status</h3>
            <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">forum</span>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary-container/20 text-on-secondary-container px-3 py-1.5 rounded-full text-sm font-medium border border-secondary/10">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Connected
            </div>
            <p className="text-label-sm text-on-surface-variant mt-3 font-mono">+234 916 706 6476</p>
          </div>
        </div>

        {/* Plan Usage */}
        <div className="card p-6 flex flex-col justify-between hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-label-sm text-on-surface-variant">Plan Usage</h3>
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">pie_chart</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-on-surface">70%</span>
              <span className="text-label-sm text-on-surface-variant">Student Plan</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-2">
              <div className="bg-primary-container h-2 rounded-full transition-all" style={{ width: '70%' }} />
            </div>
            <p className="text-label-sm text-on-surface-variant mt-2">7 of 10 docs used</p>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Recent Analyses */}
        <div className="lg:col-span-2 card overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-headline-md font-semibold text-on-surface">Recent Analyses</h3>
            <Link href="/dashboard/history" className="text-label-sm text-primary hover:text-primary-container font-semibold transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-4 text-label-sm text-on-surface-variant font-semibold">File Name</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-semibold">Date</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-semibold">Source</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-semibold">Type</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentAnalyses.map((item, i) => (
                  <tr key={item.id} className={`border-b border-outline-variant hover:bg-surface-container-low/50 transition-colors ${i === recentAnalyses.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileIcon mimeType={item.file_type} />
                        <span className="text-on-surface text-label-sm font-medium truncate max-w-[160px]">{item.file_name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-label-sm text-on-surface-variant">{formatDate(item.created_at)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.source === 'whatsapp' ? 'bg-secondary-container/20 text-on-secondary-container' : 'bg-surface-variant text-on-surface-variant'}`} title={item.source === 'whatsapp' ? 'WhatsApp' : 'Web Upload'}>
                        <span className="material-symbols-outlined text-[16px]">{item.source === 'whatsapp' ? 'forum' : 'cloud_upload'}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-variant text-on-surface-variant">
                        {item.analysis_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/dashboard/history`} className="px-3 py-1.5 border border-outline-variant rounded-lg text-label-sm text-on-surface hover:bg-surface-container-low transition-colors">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Upload */}
        <div className="card p-6 flex flex-col">
          <h3 className="text-headline-md font-semibold text-on-surface mb-2">Quick Analysis</h3>
          <p className="text-label-sm text-on-surface-variant mb-6">Drop a file here to instantly begin AI processing.</p>

          <div
            {...getRootProps()}
            className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all group min-h-[200px]
              ${isDragActive ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant hover:border-primary hover:bg-surface-container-low'}`}
          >
            <input {...getInputProps()} />
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${isDragActive ? 'bg-primary/10' : 'bg-primary-fixed'}`}>
              <span className="material-symbols-outlined text-primary text-[32px]">cloud_upload</span>
            </div>
            {quickFile ? (
              <>
                <p className="text-label-sm text-primary font-semibold mb-1 truncate max-w-full px-2">{quickFile.name}</p>
                <p className="text-[11px] text-on-surface-variant">{formatBytes(quickFile.size)}</p>
              </>
            ) : (
              <>
                <p className="text-label-sm text-on-surface font-semibold mb-1">Drag &amp; drop files</p>
                <p className="text-[11px] text-on-surface-variant">PDF, DOCX, XLSX up to 50MB</p>
              </>
            )}
            <button className="mt-5 px-4 py-2 bg-surface-variant text-on-surface border border-outline-variant rounded-lg text-label-sm font-medium hover:bg-surface-container-highest transition-colors">
              Browse Files
            </button>
          </div>

          {quickFile && (
            <Link
              href="/dashboard/upload"
              className="mt-4 w-full btn-primary justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">analytics</span>
              Analyze Now
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
