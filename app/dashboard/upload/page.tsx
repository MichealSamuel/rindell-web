'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatBytes } from '@/lib/utils'

const N8N_WEBHOOK_URL = 'https://api.lydlynk.com/webhook/rindell-analyze'
const TEST_USER_ID = '00000000-0000-0000-0000-000000000000' // replace with real auth userId

const analysisTypes = [
  { id: 'general_summary', label: 'General Summary', icon: 'summarize', desc: 'Extract main concepts and overall meaning.' },
  { id: 'study_guide', label: 'Study Guide', icon: 'menu_book', desc: 'Generate flashcards and key study points.' },
  { id: 'assignment_solver', label: 'Assignment Solver', icon: 'task_alt', desc: 'Step-by-step solutions for problems found.' },
  { id: 'key_points', label: 'Key Points', icon: 'key', desc: 'Bulleted list of critical facts and data.' },
]

type Status = 'idle' | 'uploading' | 'processing' | 'done' | 'error'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [analysisType, setAnalysisType] = useState('general_summary')
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0])
      setStatus('idle')
      setResult(null)
      setError('')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  })

  async function handleAnalyze() {
    if (!file) return

    setStatus('uploading')
    setError('')
    setResult(null)

    try {
      const form = new FormData()
      form.append('file', file)
      form.append('filename', file.name)
      form.append('mimeType', file.type)
      form.append('userId', TEST_USER_ID)
      form.append('source', 'web')
      form.append('analysisType', analysisType)

      setStatus('processing')

      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        body: form,
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Server error ${res.status}`)
      }

      const text = await res.text()
      setResult(text)
      setStatus('done')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  function handleCopy() {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleExport() {
    if (!result) return
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rindell-analysis-${file?.name || 'document'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleReset() {
    setFile(null)
    setResult(null)
    setStatus('idle')
    setError('')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Upload + Config */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`relative card p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group min-h-[220px]
            ${isDragActive ? 'border-primary bg-primary-fixed/20 border-2' : 'hover:border-primary hover:bg-surface-container-low border-2 border-dashed'}`}
        >
          <input {...getInputProps()} />
          {/* Inner dashed border indicator */}
          <div className={`absolute inset-2 border-2 border-dashed rounded-xl pointer-events-none transition-all
            ${isDragActive ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`} />

          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 z-10
            ${isDragActive ? 'bg-primary/10' : 'bg-surface-container-high'}`}>
            <span className="material-symbols-outlined text-primary text-[36px]">cloud_upload</span>
          </div>

          {file ? (
            <div className="z-10 flex flex-col items-center">
              <p className="text-primary font-semibold mb-1 text-body-lg">{file.name}</p>
              <p className="text-label-sm text-on-surface-variant">{formatBytes(file.size)} · Click to change</p>
            </div>
          ) : (
            <div className="z-10">
              <h3 className="text-headline-md text-on-surface mb-2">Drag &amp; Drop files here</h3>
              <p className="text-body-md text-on-surface-variant mb-6 max-w-md">
                Supported formats: PDF, DOCX, XLSX, TXT · Maximum file size 50MB
              </p>
              <button
                type="button"
                className="btn-secondary px-6 py-2.5 relative z-20"
                onClick={(e) => e.stopPropagation()}
              >
                Browse Files
              </button>
            </div>
          )}
        </div>

        {/* Analysis Type */}
        <div>
          <h3 className="text-body-lg text-on-surface font-medium mb-4">Select Analysis Type</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analysisTypes.map((type) => (
              <label key={type.id} className="flex cursor-pointer">
                <input
                  type="radio"
                  name="analysis_type"
                  value={type.id}
                  checked={analysisType === type.id}
                  onChange={() => setAnalysisType(type.id)}
                  className="sr-only peer"
                />
                <div className={`w-full card p-4 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all hover:bg-surface-container-low group cursor-pointer
                  ${analysisType === type.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${analysisType === type.id ? 'fill text-primary' : 'text-primary'}`}>
                      {type.icon}
                    </span>
                    <span className="text-label-sm text-on-surface font-semibold">{type.label}</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant text-sm">{type.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-error-container rounded-xl border border-error/20">
            <span className="material-symbols-outlined text-on-error-container text-[20px] flex-shrink-0 mt-0.5">error</span>
            <p className="text-label-sm text-on-error-container">{error}</p>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!file || status === 'uploading' || status === 'processing'}
          className={`w-full py-4 rounded-xl text-label-sm font-bold flex items-center justify-center gap-2 transition-all shadow-primary-sm
            ${!file || status === 'uploading' || status === 'processing'
              ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
              : 'bg-primary text-on-primary hover:bg-primary-container active:scale-[0.99]'}`}
        >
          {status === 'uploading' || status === 'processing' ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              {status === 'uploading' ? 'Uploading...' : 'Analyzing with AI...'}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">analytics</span>
              Analyze Now
            </>
          )}
        </button>
      </div>

      {/* Right Column: Result Panel */}
      <div className="lg:col-span-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body-lg text-on-surface font-medium">
            {status === 'done' ? 'Analysis Result' : 'Recent Result'}
          </h3>
          {status === 'done' && (
            <button onClick={handleReset} className="text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              New
            </button>
          )}
        </div>

        <div className="card flex flex-col flex-1 overflow-hidden min-h-[500px]">
          {/* Card Header */}
          <div className="px-5 py-4 border-b border-outline-variant flex justify-between items-start bg-surface">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0
                ${file ? 'bg-error-container/30 text-error' : 'bg-surface-container text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-[20px]">
                  {file ? 'picture_as_pdf' : 'insert_drive_file'}
                </span>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-label-sm text-on-surface font-semibold truncate">
                  {file ? file.name : 'No file selected'}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  {status === 'done' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-[11px] text-on-surface-variant">Completed</span>
                    </>
                  )}
                  {(status === 'uploading' || status === 'processing') && (
                    <>
                      <span className="material-symbols-outlined text-[12px] text-primary animate-spin">progress_activity</span>
                      <span className="text-[11px] text-on-surface-variant">Processing...</span>
                    </>
                  )}
                  {status === 'idle' && !file && (
                    <span className="text-[11px] text-on-surface-variant">Waiting for upload</span>
                  )}
                  {status === 'idle' && file && (
                    <span className="text-[11px] text-on-surface-variant">Ready to analyze</span>
                  )}
                  {status === 'error' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-error" />
                      <span className="text-[11px] text-error">Failed</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {result && (
              <button className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            )}
          </div>

          {/* Card Body */}
          <div className="flex-1 overflow-y-auto p-5 bg-surface-container-lowest">
            {!result && status !== 'processing' && status !== 'uploading' && (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-on-surface-variant text-[32px]">auto_awesome</span>
                </div>
                <p className="text-label-sm text-on-surface font-medium mb-2">AI Summary Generated Here</p>
                <p className="text-[12px] text-on-surface-variant max-w-[200px] leading-relaxed">
                  Upload a document and click Analyze to see your AI-powered analysis
                </p>
              </div>
            )}

            {(status === 'uploading' || status === 'processing') && (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[32px] animate-spin">progress_activity</span>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface font-medium mb-1">
                    {status === 'uploading' ? 'Uploading document...' : 'AI is analyzing...'}
                  </p>
                  <p className="text-[12px] text-on-surface-variant">This usually takes 10-30 seconds</p>
                </div>
                {/* Loading shimmer lines */}
                <div className="w-full space-y-3 mt-2">
                  {[80, 60, 90, 50, 70].map((w, i) => (
                    <div key={i} className="h-3 bg-surface-container-high rounded-full overflow-hidden relative" style={{ width: `${w}%` }}>
                      <div className="absolute inset-0 shimmer" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', animation: `shimmer 1.5s ${i * 0.1}s infinite` }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && status === 'done' && (
              <div className="analysis-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {result}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Card Footer */}
          {result && status === 'done' && (
            <div className="px-5 py-3 border-t border-outline-variant bg-surface flex justify-end gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-label-sm"
              >
                <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 text-primary hover:text-primary-container transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-label-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
