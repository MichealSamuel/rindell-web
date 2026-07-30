import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateString)
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'picture_as_pdf'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'description'
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'table_chart'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'slideshow'
  return 'insert_drive_file'
}

export function getFileIconColor(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'text-error bg-error-container/30'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'text-primary bg-primary-fixed'
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'text-secondary bg-secondary-container/20'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'text-tertiary bg-tertiary-fixed'
  return 'text-on-surface-variant bg-surface-container'
}

export const SUPPORTED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/plain',
]

export const PLAN_LIMITS: Record<string, number> = {
  free: 2,
  student: 10,
  pro: 99999,
  business: 99999,
}

export const PLAN_LABELS: Record<string, string> = {
  free: 'Free',
  student: 'Student',
  pro: 'Pro',
  business: 'Business',
}

export const PLAN_PRICES: Record<string, string> = {
  free: '$0',
  student: '$10',
  pro: '$29',
  business: '$99',
}
