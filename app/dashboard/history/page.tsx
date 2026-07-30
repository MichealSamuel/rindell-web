'use client'

import { useState } from 'react'
import { formatDate, formatBytes } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const mockHistory = [
  { id: '1', file_name: 'Q3_Financial_Report.pdf', file_size_bytes: 2516582, file_type: 'application/pdf', source: 'web', created_at: '2023-10-24', analysis_type: 'general_summary', status: 'completed', summary: '## Rindell Analysis\n\n**Document Type:** Q3 Financial Report\n\n### Overview\n\nThis document presents the Q3 financial results for the organization, covering revenue, expenses, and net profit margins across all business units.\n\n### Key Information\n\n- Total Revenue: $4.2M (+18% YoY)\n- Net Profit: $890K\n- Operating Expenses: $3.31M\n- EBITDA Margin: 22%\n\n### Bottom Line\n\nStrong quarter with revenue growth outpacing expense growth, indicating improving operational efficiency.' },
  { id: '2', file_name: 'Project_Apollo_Brief.docx', file_size_bytes: 1153433, file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', source: 'whatsapp', created_at: '2023-10-22', analysis_type: 'study_guide', status: 'completed', summary: '## Rindell Analysis\n\n**Document Type:** Project Brief\n\n### Overview\n\nProject Apollo is a 6-month initiative aimed at expanding market reach into three new territories while maintaining current customer satisfaction levels.\n\n### Key Information\n\n- Timeline: Q1-Q2 2024\n- Budget: $250,000\n- Team Size: 12 members\n- Target Markets: Lagos, Abuja, Port Harcourt\n\n### Bottom Line\n\nAmbitious but well-scoped project with clear milestones and adequate budget allocation.' },
  { id: '3', file_name: 'Market_Analysis_2024.pdf', file_size_bytes: 6082150, file_type: 'application/pdf', source: 'web', created_at: '2023-10-20', analysis_type: 'key_points', status: 'processing', summary: null },
  { id: '4', file_name: 'Meeting_Notes_Sales.docx', file_size_bytes: 419430, file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', source: 'whatsapp', created_at: '2023-10-18', analysis_type: 'general_summary', status: 'completed', summary: '## Rindell Analysis\n\n**Document Type:** Meeting Notes\n\n### Overview\n\nSales team Q4 planning meeting notes covering pipeline review, target adjustments, and strategy for the final quarter.\n\n### Key Information\n\n- Q4 Target: $1.8M\n- Current Pipeline: $2.3M\n- At-risk deals: 3 accounts\n- New initiatives: 2 campaigns launching November\n\n### Bottom Line\n\nTeam is well-positioned to hit Q4 targets with strong pipeline coverage.' },
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

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<typeof mockHistory[0] | null>(null)

  const filtered = mockHistory.filter(item => {
    const matchesSearch = item.file_name.toLowerCase().includes(search.toLowerCase())
    const matchesSource = sourceFilter === 'all' || item.source === sourceFilter
    return matchesSearch && matchesSource
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            placeholder="Search analysis history..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-48">
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              className="input-field appearance-none pr-10 cursor-pointer"
            >
              <option value="all">All Sources</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="web">Web Upload</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">expand_more</span>
            </div>
          </div>
          <button className="p-2.5 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors text-on-surface-variant flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col ${selectedItem ? 'lg:flex-row gap-6' : ''}`}>
        {/* Table */}
        <div className={`card overflow-hidden ${selectedItem ? 'lg:w-1/2' : 'w-full'}`}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-on-surface-variant text-[32px]">history</span>
              </div>
              <p className="text-label-sm text-on-surface font-semibold mb-2">No analyses found</p>
              <p className="text-[12px] text-on-surface-variant">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50 border-b border-outline-variant/50">
                    {['File', 'Source', 'Date', 'Type', 'Status', 'Action'].map((h, i) => (
                      <th key={h} className={`py-4 px-6 text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider ${i === 5 ? 'text-right' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filtered.map(item => (
                    <tr
                      key={item.id}
                      className={`hover:bg-surface-container-lowest/80 transition-colors group cursor-pointer
                        ${selectedItem?.id === item.id ? 'bg-primary-fixed/30' : ''}`}
                      onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <FileIcon mimeType={item.file_type} />
                          <div>
                            <p className="text-label-sm font-medium text-on-surface group-hover:text-primary transition-colors truncate max-w-[160px]">
                              {item.file_name}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">{formatBytes(item.file_size_bytes)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px]">
                            {item.source === 'whatsapp' ? 'forum' : 'computer'}
                          </span>
                          <span className="text-label-sm capitalize">{item.source === 'whatsapp' ? 'WhatsApp' : 'Web'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-label-sm text-on-surface-variant whitespace-nowrap">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="py-4 px-6 text-label-sm text-on-surface-variant capitalize">
                        {item.analysis_type.replace(/_/g, ' ')}
                      </td>
                      <td className="py-4 px-6">
                        {item.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-secondary-container/20 text-on-secondary-container border border-secondary/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-variant text-on-surface-variant">
                            <span className="material-symbols-outlined text-[12px] animate-spin">sync</span>
                            Processing
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {item.status === 'completed' && (
                          <button
                            onClick={e => { e.stopPropagation(); setSelectedItem(selectedItem?.id === item.id ? null : item) }}
                            className="text-primary font-semibold text-label-sm hover:text-primary-container transition-colors"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="px-6 py-4 border-t border-outline-variant/50 flex items-center justify-between bg-surface">
              <p className="text-label-sm text-on-surface-variant">
                Showing <span className="font-semibold text-on-surface">1 to {filtered.length}</span> of {filtered.length} results
              </p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-label-sm font-bold">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedItem && (
          <div className="lg:w-1/2 card flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between bg-surface">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileIcon mimeType={selectedItem.file_type} />
                <div className="overflow-hidden">
                  <h4 className="text-label-sm text-on-surface font-semibold truncate">{selectedItem.file_name}</h4>
                  <p className="text-[11px] text-on-surface-variant">{formatDate(selectedItem.created_at)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0 p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 analysis-content bg-surface-container-lowest">
              {selectedItem.summary ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedItem.summary}
                </ReactMarkdown>
              ) : (
                <p className="text-label-sm text-on-surface-variant">No summary available.</p>
              )}
            </div>
            <div className="px-5 py-3 border-t border-outline-variant bg-surface flex justify-end gap-2">
              <button
                onClick={() => { if (selectedItem.summary) { navigator.clipboard.writeText(selectedItem.summary) } }}
                className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-label-sm"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                Copy
              </button>
              <button className="flex items-center gap-1.5 text-primary hover:text-primary-container transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-label-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
