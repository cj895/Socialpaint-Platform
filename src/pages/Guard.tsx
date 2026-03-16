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

const STATUS_COLORS: Record<string, string> = {
  pending: 'var(--color-signal-amber)',
  investigating: 'var(--color-accent)',
  resolved: 'var(--color-signal-green)',
  'resolved-updated': 'var(--color-signal-green)',
  'resolved-exception': 'var(--color-signal-green)',
  dismissed: 'var(--color-muted)',
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

function getScoreBadgeStyle(score: number): React.CSSProperties {
  if (score < 60)
    return { backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }
  if (score < 70)
    return { backgroundColor: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }
  return { backgroundColor: 'var(--color-surface)', color: 'var(--color-muted)' }
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
    <div className="flex flex-col" style={{ minHeight: 0 }}>
      {/* Page Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 600, color: 'var(--color-ink)' }}>Guard</h1>
            <span className="caption">Brand compliance review</span>
          </div>
          <div className="font-mono text-[13px] pt-2" style={{ color: 'var(--color-muted)' }}>
            {flaggedItems.length} total &middot; {pendingCount} pending &middot; {analyticsData.flaggedPercent}% flag rate
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-5 mb-4">
          <div className="rounded-lg p-1 inline-flex" style={{ backgroundColor: 'var(--color-surface)' }}>
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
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? 'var(--color-ink)' : 'var(--color-muted)',
                  }}
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
      <div
        className="flex flex-1 min-h-0 rounded-lg overflow-hidden"
        style={{
          minHeight: 500,
          maxHeight: 'calc(100vh - 250px)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* LEFT — List Panel */}
        <div
          className={`w-full lg:w-[40%] overflow-y-auto ${
            mobileDetailOpen ? 'hidden lg:block' : 'block'
          }`}
          style={{ borderRight: '1px solid var(--color-border)' }}
        >
          {filteredItems.length === 0 && (
            <div className="flex items-center justify-center h-40 text-[14px]" style={{ color: 'var(--color-muted)' }}>
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
                className="px-4 py-3.5 cursor-pointer transition-all duration-[120ms]"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  ...(isSelected
                    ? {
                        backgroundColor: 'var(--color-accent-light)',
                        borderLeft: '2px solid var(--color-accent)',
                      }
                    : {}),
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Score Badge */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[13px] shrink-0"
                    style={{ fontWeight: 600, ...getScoreBadgeStyle(item.score) }}
                  >
                    {item.score}
                  </div>

                  {/* Center Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[14px] truncate"
                      style={{ fontWeight: 500, color: 'var(--color-ink)' }}
                    >
                      {item.prompt}
                    </div>
                    <div className="caption mt-0.5">
                      {item.user} &middot; {item.team} &middot; {item.date}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className="text-[11px] shrink-0"
                    style={{
                      fontWeight: 500,
                      color: STATUS_COLORS[status] || STATUS_COLORS[displayStatus],
                    }}
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
              className="lg:hidden mb-4 text-[13px] cursor-pointer flex items-center gap-1"
              style={{ fontWeight: 500, color: 'var(--color-accent)' }}
            >
              <ChevronRight className="rotate-180" size={16} strokeWidth={1.5} />
              Back
            </button>
          )}

          {!selected ? (
            <div className="flex items-center justify-center h-full text-[14px]" style={{ color: 'var(--color-muted)' }}>
              Select an item to review
            </div>
          ) : (
            <div className="max-w-2xl">
              {/* Detail Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>
                    {selected.prompt}
                  </h2>
                  <p className="text-[14px] mt-1" style={{ color: 'var(--color-muted)' }}>
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
                className="rounded-xl flex items-center justify-center mb-6"
                style={{
                  height: 240,
                  background: 'linear-gradient(135deg, #1B4332 0%, #52796F 50%, #D4A373 100%)',
                }}
              >
                <span className="text-[14px]" style={{ fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
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
                      className="rounded-xl p-4 mb-3"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} strokeWidth={1.5} style={{ color: 'var(--color-signal-red)' }} />
                        <span className="text-[14px]" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                          {v.rule}
                        </span>
                      </div>
                      <p className="text-[14px]" style={{ color: 'var(--color-muted)' }}>{v.detail}</p>
                      {colors && (
                        <div className="flex items-center gap-2 mt-3">
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: colors.detected, border: '1px solid var(--color-border)' }}
                            title={colors.detected}
                          />
                          <ArrowRight size={14} strokeWidth={1.5} style={{ color: 'var(--color-muted)' }} />
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: colors.brand, border: '1px solid var(--color-border)' }}
                            title={colors.brand}
                          />
                          <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted)' }}>
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
                      className="rounded-xl flex items-center justify-center"
                      style={{
                        height: 120,
                        background: 'linear-gradient(135deg, #1B4332 0%, #52796F 50%, #D4A373 100%)',
                      }}
                    >
                      <span className="text-[11px]" style={{ fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
                        Preview
                      </span>
                    </div>
                  </div>
                  {/* Brand Standard */}
                  <div>
                    <div className="caption mb-2">BRAND STANDARD</div>
                    <div
                      className="rounded-xl p-4"
                      style={{
                        height: 120,
                        overflow: 'auto',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {selected.violations.map((v, idx) => {
                        const standard = getBrandStandard(v.rule)
                        return (
                          <div key={idx} className="mb-2 last:mb-0">
                            <div className="text-[11px]" style={{ fontWeight: 500, color: 'var(--color-muted)' }}>
                              {standard.label}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {standard.color && (
                                <div
                                  className="w-4 h-4 rounded shrink-0"
                                  style={{ backgroundColor: standard.color, border: '1px solid var(--color-border)' }}
                                />
                              )}
                              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--color-ink)' }}>
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
                  className="h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms] inline-flex items-center gap-2"
                  style={{
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <Clock size={16} strokeWidth={1.5} />
                  Mark Investigating
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'resolved-updated')}
                  className="h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms] inline-flex items-center gap-2"
                  style={{
                    fontWeight: 500,
                    backgroundColor: 'var(--color-ink)',
                    color: '#fff',
                  }}
                >
                  <CheckCircle size={16} strokeWidth={1.5} />
                  Resolved — Updated
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'resolved-exception')}
                  className="h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms]"
                  style={{
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Exception
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'dismissed')}
                  className="h-10 px-4 rounded-lg text-[13px] cursor-pointer transition-all duration-[120ms] inline-flex items-center gap-2"
                  style={{
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <XCircle size={16} strokeWidth={1.5} />
                  Dismiss
                </button>
              </div>

              {/* Insights */}
              <div className="pt-5" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div className="caption mb-3">INSIGHTS</div>
                <p className="text-[14px] mb-2" style={{ color: 'var(--color-ink)' }}>
                  Most common: <span style={{ fontWeight: 600 }}>{topViolation.type}</span>
                </p>
                <div className="space-y-1.5 mb-4">
                  {top3Violations.map((v) => (
                    <div key={v.type} className="flex items-center justify-between text-[13px]">
                      <span style={{ color: 'var(--color-muted)' }}>{v.type}</span>
                      <span className="font-mono text-[13px]" style={{ fontWeight: 500, color: 'var(--color-ink)' }}>
                        {v.count}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/brand-system"
                  className="text-[13px] inline-flex items-center gap-1 hover:underline"
                  style={{ fontWeight: 500, color: 'var(--color-accent)' }}
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
