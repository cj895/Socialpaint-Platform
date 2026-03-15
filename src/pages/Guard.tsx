import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle, CheckCircle, XCircle, Clock,
  ChevronRight, ArrowRight,
} from 'lucide-react'
import { flaggedItems, analyticsData } from '../data/mockData'

type StatusType = 'pending' | 'investigating' | 'resolved-updated' | 'resolved-exception' | 'dismissed'
type FilterType = 'all' | 'pending' | 'investigating' | 'resolved' | 'dismissed'

const filterSegments: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'investigating', label: 'Investigating' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'dismissed', label: 'Dismissed' },
]

const statusLabel: Record<StatusType, string> = {
  pending: 'Pending',
  investigating: 'Investigating',
  'resolved-updated': 'Resolved',
  'resolved-exception': 'Resolved',
  dismissed: 'Dismissed',
}

const statusColorClass: Record<string, string> = {
  pending: 'text-signal-amber',
  investigating: 'text-accent',
  resolved: 'text-signal-green',
  'resolved-updated': 'text-signal-green',
  'resolved-exception': 'text-signal-green',
  dismissed: 'text-muted',
}

function getDisplayStatus(status: StatusType): string {
  if (status === 'resolved-updated' || status === 'resolved-exception') return 'resolved'
  return status
}

function matchesFilter(status: StatusType, filter: FilterType): boolean {
  if (filter === 'all') return true
  if (filter === 'resolved') return status === 'resolved-updated' || status === 'resolved-exception'
  return status === filter
}

function getScoreBadgeClasses(score: number): string {
  if (score < 60) return 'bg-signal-red/10 text-signal-red'
  if (score < 70) return 'bg-signal-amber/10 text-signal-amber'
  return 'bg-surface text-muted'
}

function getScoreColor(score: number): string {
  if (score < 60) return '#dc3545'
  if (score < 70) return '#d97706'
  return 'rgba(15,15,15,0.45)'
}

// Extract color hex from violation detail if present
function extractColors(detail: string): { detected: string; brand: string } | null {
  const hexMatch = detail.match(/#[0-9A-Fa-f]{6}/g)
  if (hexMatch && hexMatch.length >= 2) {
    return { detected: hexMatch[0], brand: hexMatch[1] }
  }
  return null
}

// Brand rules reference for comparison panel
function getBrandStandard(rule: string): { label: string; value: string; color?: string } {
  switch (rule) {
    case 'Color mismatch':
      return { label: 'Brand Primary', value: 'Deep Forest', color: '#1B4332' }
    case 'Voice deviation':
      return { label: 'Expected Tone', value: 'Confident, Approachable, Concise' }
    case 'Typography mismatch':
      return { label: 'Brand Font', value: 'Inter / DM Serif Display' }
    case 'Logo misuse':
      return { label: 'Logo Rule', value: 'Clear space required on all sides' }
    case 'Imagery style':
      return { label: 'Photo Style', value: 'Warm natural light, minimal compositions' }
    default:
      return { label: 'Standard', value: 'See brand system' }
  }
}

export default function Guard() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [selectedItem, setSelectedItem] = useState<string>(flaggedItems[0].id)
  const [itemStatuses, setItemStatuses] = useState<Record<string, string>>(
    () => Object.fromEntries(flaggedItems.map((item) => [item.id, item.status]))
  )
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)

  const pendingCount = flaggedItems.filter((i) => {
    const s = itemStatuses[i.id]
    return s === 'pending'
  }).length

  const investigatingCount = flaggedItems.filter((i) => {
    const s = itemStatuses[i.id]
    return s === 'investigating'
  }).length

  const filteredItems = flaggedItems.filter((item) =>
    matchesFilter(itemStatuses[item.id] as StatusType, activeFilter)
  )

  const selected = flaggedItems.find((i) => i.id === selectedItem) ?? null

  const topViolation = analyticsData.violationTypes[0]
  const top3Violations = analyticsData.violationTypes.slice(0, 3)

  function updateStatus(id: string, status: string) {
    setItemStatuses((prev) => ({ ...prev, [id]: status }))
  }

  function handleItemClick(id: string) {
    setSelectedItem(id)
    setMobileDetailOpen(true)
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Page Header */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 600 }} className="text-ink">Guard</h1>
            <span className="caption">Brand compliance review</span>
          </div>
          <div className="font-mono text-[13px] text-muted pt-2">
            {flaggedItems.length} total &middot; {pendingCount} pending &middot; {analyticsData.flaggedPercent}% flag rate
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-5 mb-4">
          <div className="bg-surface rounded-lg p-1 inline-flex">
            {filterSegments.map((seg) => {
              const isActive = activeFilter === seg.key
              const badge =
                seg.key === 'pending' ? pendingCount :
                seg.key === 'investigating' ? investigatingCount :
                null
              return (
                <button
                  key={seg.key}
                  onClick={() => setActiveFilter(seg.key)}
                  className={`px-3 py-1.5 rounded-md text-[13px] transition-all duration-[120ms] cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-sm'
                      : 'text-muted hover:text-ink'
                  }`}
                  style={{ fontWeight: isActive ? 500 : 400 }}
                >
                  {seg.label}
                  {badge !== null && badge > 0 && (
                    <span className="font-mono text-[11px] ml-1.5 opacity-60">{badge}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Triage Split */}
      <div className="flex" style={{ height: 'calc(100vh - 140px)' }}>
        {/* LEFT — List Panel */}
        <div
          className={`w-full lg:w-[40%] border-r border-border overflow-y-auto ${
            mobileDetailOpen ? 'hidden lg:block' : 'block'
          }`}
        >
          {filteredItems.length === 0 && (
            <div className="flex items-center justify-center h-40 text-muted text-[14px]">
              No items match this filter
            </div>
          )}
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedItem
            const status = itemStatuses[item.id] as StatusType
            const displayStatus = getDisplayStatus(status)

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-4 py-3.5 border-b border-border cursor-pointer transition-all duration-[120ms] ${
                  isSelected
                    ? 'bg-accent-light border-l-2 border-l-accent'
                    : 'hover:bg-surface/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Score Badge */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[13px] shrink-0 ${getScoreBadgeClasses(item.score)}`}
                    style={{ fontWeight: 600 }}
                  >
                    {item.score}
                  </div>

                  {/* Center Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[14px] text-ink truncate"
                      style={{ fontWeight: 500 }}
                    >
                      {item.prompt}
                    </div>
                    <div className="caption mt-0.5">
                      {item.user} &middot; {item.team} &middot; {item.date}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`text-[11px] shrink-0 ${statusColorClass[status] || statusColorClass[displayStatus]}`}
                    style={{ fontWeight: 500 }}
                  >
                    {statusLabel[status]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT — Detail Panel */}
        <div
          className={`w-full lg:w-[60%] overflow-y-auto p-6 ${
            mobileDetailOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Mobile Back Button */}
          {mobileDetailOpen && (
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="lg:hidden mb-4 text-[13px] text-accent cursor-pointer flex items-center gap-1"
              style={{ fontWeight: 500 }}
            >
              <ChevronRight className="rotate-180" size={16} strokeWidth={1.5} />
              Back
            </button>
          )}

          {!selected ? (
            <div className="flex items-center justify-center h-full text-muted text-[14px]">
              Select an item to review
            </div>
          ) : (
            <div className="max-w-2xl">
              {/* Detail Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600 }} className="text-ink">
                    {selected.prompt}
                  </h2>
                  <p className="text-[14px] text-muted mt-1">
                    Generated by {selected.user} &middot; {selected.team} &middot; {selected.date}
                  </p>
                </div>
                <div
                  className="font-mono shrink-0"
                  style={{ fontSize: 32, fontWeight: 600, color: getScoreColor(selected.score) }}
                >
                  {selected.score}
                </div>
              </div>

              {/* Generated Preview */}
              <div
                className="bg-surface rounded-xl flex items-center justify-center mb-6"
                style={{
                  height: 240,
                  background: 'linear-gradient(135deg, #1B4332 0%, #52796F 50%, #D4A373 100%)',
                }}
              >
                <span className="text-white/60 text-[14px]" style={{ fontWeight: 500 }}>
                  Generated Preview
                </span>
              </div>

              {/* Violations */}
              <div className="mb-6">
                <div className="caption mb-3">VIOLATIONS</div>
                {selected.violations.map((v, idx) => {
                  const colors = extractColors(v.detail)
                  return (
                    <div
                      key={idx}
                      className="bg-surface rounded-xl p-4 border border-border mb-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} strokeWidth={1.5} className="text-signal-red" />
                        <span className="text-[14px] text-ink" style={{ fontWeight: 600 }}>
                          {v.rule}
                        </span>
                      </div>
                      <p className="text-[14px] text-muted">{v.detail}</p>
                      {colors && (
                        <div className="flex items-center gap-2 mt-3">
                          <div
                            className="w-6 h-6 rounded border border-border"
                            style={{ backgroundColor: colors.detected }}
                            title={colors.detected}
                          />
                          <ArrowRight size={14} strokeWidth={1.5} className="text-muted" />
                          <div
                            className="w-6 h-6 rounded border border-border"
                            style={{ backgroundColor: colors.brand }}
                            title={colors.brand}
                          />
                          <span className="font-mono text-[11px] text-muted">
                            {colors.detected} → {colors.brand}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Side-by-Side Comparison */}
              <div className="mb-6">
                <div className="caption mb-3">COMPARISON</div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Generated */}
                  <div>
                    <div className="caption mb-2">GENERATED</div>
                    <div
                      className="bg-surface rounded-xl flex items-center justify-center"
                      style={{
                        height: 120,
                        background: 'linear-gradient(135deg, #1B4332 0%, #52796F 50%, #D4A373 100%)',
                      }}
                    >
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 500 }}>
                        Preview
                      </span>
                    </div>
                  </div>
                  {/* Brand Standard */}
                  <div>
                    <div className="caption mb-2">BRAND STANDARD</div>
                    <div className="bg-surface rounded-xl p-4 border border-border" style={{ height: 120, overflow: 'auto' }}>
                      {selected.violations.map((v, idx) => {
                        const standard = getBrandStandard(v.rule)
                        return (
                          <div key={idx} className="mb-2 last:mb-0">
                            <div className="text-[11px] text-muted" style={{ fontWeight: 500 }}>
                              {standard.label}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {standard.color && (
                                <div
                                  className="w-4 h-4 rounded border border-border shrink-0"
                                  style={{ backgroundColor: standard.color }}
                                />
                              )}
                              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>
                                {standard.value}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button
                  onClick={() => updateStatus(selected.id, 'investigating')}
                  className="border border-border bg-transparent h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms] hover:border-border-hover inline-flex items-center gap-2"
                  style={{ fontWeight: 500 }}
                >
                  <Clock size={16} strokeWidth={1.5} />
                  Mark Investigating
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'resolved-updated')}
                  className="bg-ink text-white h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms] hover:opacity-90 inline-flex items-center gap-2"
                  style={{ fontWeight: 500 }}
                >
                  <CheckCircle size={16} strokeWidth={1.5} />
                  Resolved — Updated
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'resolved-exception')}
                  className="border border-border bg-transparent h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms] hover:border-border-hover"
                  style={{ fontWeight: 500 }}
                >
                  Exception
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'dismissed')}
                  className="border border-border bg-transparent h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms] hover:border-border-hover hover:text-signal-red inline-flex items-center gap-2"
                  style={{ fontWeight: 500 }}
                >
                  <XCircle size={16} strokeWidth={1.5} />
                  Dismiss
                </button>
              </div>

              {/* Insights */}
              <div className="border-t border-border pt-5">
                <div className="caption mb-3">INSIGHTS</div>
                <p className="text-[14px] text-ink mb-2">
                  Most common: <span style={{ fontWeight: 600 }}>{topViolation.type}</span>
                </p>
                <div className="space-y-1.5 mb-4">
                  {top3Violations.map((v) => (
                    <div key={v.type} className="flex items-center justify-between text-[13px]">
                      <span className="text-muted">{v.type}</span>
                      <span className="font-mono text-[13px] text-ink" style={{ fontWeight: 500 }}>
                        {v.count}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/brand-system"
                  className="text-accent text-[13px] inline-flex items-center gap-1 hover:underline"
                  style={{ fontWeight: 500 }}
                >
                  Improve your brand system
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
