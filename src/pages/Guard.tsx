import { useState } from 'react'
import { flaggedItems } from '../data/mockData'
import type { FlaggedItem } from '../data/mockData'

type StatusType = FlaggedItem['status']
type FilterType = 'all' | 'new' | 'investigating' | 'resolved' | 'dismissed'
type ViolationType = 'Voice' | 'Color' | 'Logo' | 'Font'

/* ── helpers ── */

function getDisplayStatus(status: StatusType): string {
  if (status === 'pending') return 'new'
  if (status === 'resolved-updated' || status === 'resolved-exception') return 'resolved'
  return status
}

function matchesFilter(status: StatusType, filter: FilterType): boolean {
  if (filter === 'all') return true
  const display = getDisplayStatus(status)
  return display === filter
}

function ruleToViolationType(rule: string): ViolationType {
  if (rule.toLowerCase().includes('color')) return 'Color'
  if (rule.toLowerCase().includes('voice')) return 'Voice'
  if (rule.toLowerCase().includes('logo')) return 'Logo'
  if (rule.toLowerCase().includes('typo') || rule.toLowerCase().includes('font')) return 'Font'
  return 'Voice'
}

const violationTagStyles: Record<ViolationType, { bg: string; color: string }> = {
  Color: { bg: 'rgba(233,69,96,0.08)', color: '#e94560' },
  Voice: { bg: 'rgba(245,158,11,0.08)', color: '#d97706' },
  Logo: { bg: 'rgba(79,70,229,0.08)', color: '#4f46e5' },
  Font: { bg: 'rgba(35,31,35,0.06)', color: 'rgba(35,31,35,0.64)' },
}

const statusBadgeStyles: Record<string, { bg: string; color: string }> = {
  new: { bg: 'rgba(233,69,96,0.10)', color: '#e94560' },
  investigating: { bg: 'rgba(217,119,6,0.10)', color: '#d97706' },
  resolved: { bg: 'rgba(74,124,89,0.10)', color: '#4a7c59' },
  dismissed: { bg: 'rgba(35,31,35,0.06)', color: 'rgba(35,31,35,0.48)' },
}

const thumbEmojis: Record<string, string> = {
  fl1: '🎨',
  fl2: '💼',
  fl3: '🚀',
  fl4: '💬',
  fl5: '📊',
}

function getScoreColor(score: number): string {
  if (score < 50) return '#e94560'
  if (score < 65) return '#d97706'
  return '#4a7c59'
}

function extractColors(detail: string): { detected: string; brand: string } | null {
  const hexMatch = detail.match(/#[0-9A-Fa-f]{6}/g)
  if (hexMatch && hexMatch.length >= 2) return { detected: hexMatch[0], brand: hexMatch[1] }
  return null
}

function getBrandStandard(rule: string): { label: string; value: string; color?: string } {
  switch (rule) {
    case 'Color mismatch':
      return { label: 'Brand Primary', value: 'Deep Forest #1B4332', color: '#1B4332' }
    case 'Voice deviation':
      return { label: 'Brand Voice', value: 'Confident, Approachable, Concise' }
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

/* ── mono label style ── */
const monoLabel: React.CSSProperties = {
  fontFamily: "'Fragment Mono', monospace",
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.75px',
}

/* ── card style ── */
const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid rgba(35,31,35,0.08)',
  borderRadius: 16,
}

/* ── component ── */

export default function Guard() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [activeTypeFilter, setActiveTypeFilter] = useState<ViolationType | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  // Counts by display status
  const counts = flaggedItems.reduce(
    (acc, item) => {
      const ds = getDisplayStatus(item.status)
      acc[ds] = (acc[ds] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const totalCount = flaggedItems.length
  const newCount = counts['new'] || 0
  const investigatingCount = counts['investigating'] || 0
  const resolvedCount = counts['resolved'] || 0
  const dismissedCount = counts['dismissed'] || 0

  // Filtered items
  let filteredItems = flaggedItems.filter((item) => matchesFilter(item.status, activeFilter))
  if (activeTypeFilter) {
    filteredItems = filteredItems.filter((item) =>
      item.violations.some((v) => ruleToViolationType(v.rule) === activeTypeFilter),
    )
  }

  const selectedItem = selectedItemId ? flaggedItems.find((i) => i.id === selectedItemId) ?? null : null

  // Score ring conic gradient
  function scoreRing(score: number, size: number): React.CSSProperties {
    const pct = score
    const color = getScoreColor(score)
    return {
      width: size,
      height: size,
      borderRadius: '50%',
      background: `conic-gradient(${color} ${pct * 3.6}deg, rgba(35,31,35,0.08) ${pct * 3.6}deg)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  function scoreRingInner(size: number): React.CSSProperties {
    const inner = size - 6
    return {
      width: inner,
      height: inner,
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  const filterPills: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: totalCount },
    { key: 'new', label: 'New', count: newCount },
    { key: 'investigating', label: 'Investigating', count: investigatingCount },
    { key: 'resolved', label: 'Resolved', count: resolvedCount },
    { key: 'dismissed', label: 'Dismissed', count: dismissedCount },
  ]

  const typeFilters: ViolationType[] = ['Voice', 'Color', 'Logo', 'Font']

  return (
    <div className="flex flex-col gap-6">
      {/* ── Page Header ── */}
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 500, color: '#231f23', margin: 0 }}>Brand Guard</h1>
        <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(35,31,35,0.48)', marginTop: 4, marginBottom: 0 }}>
          Monitor and resolve brand compliance issues across generated content.
        </p>
      </div>

      {/* ── Insights Summary Bar ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Flags */}
        <div style={{ ...cardStyle, padding: '18px 20px' }}>
          <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.48)', marginBottom: 8 }}>Open Flags</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#e94560' }}>7</div>
          <div style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)', marginTop: 4 }}>3 new this week</div>
        </div>
        {/* Investigating */}
        <div style={{ ...cardStyle, padding: '18px 20px' }}>
          <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.48)', marginBottom: 8 }}>Investigating</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#d97706' }}>3</div>
          <div style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)', marginTop: 4 }}>Avg age: 2 days</div>
        </div>
        {/* Resolved This Month */}
        <div style={{ ...cardStyle, padding: '18px 20px' }}>
          <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.48)', marginBottom: 8 }}>Resolved This Month</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#4a7c59' }}>11</div>
          <div style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)', marginTop: 4 }}>4 led to BI updates</div>
        </div>
        {/* Top Violation */}
        <div style={{ ...cardStyle, padding: '18px 20px' }}>
          <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.48)', marginBottom: 8 }}>Top Violation</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#231f23' }}>Voice deviation</div>
          <div style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)', marginTop: 4 }}>42% of all flags</div>
        </div>
      </div>

      {/* ── Filters Row ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterPills.map((pill) => {
          const isActive = activeFilter === pill.key
          return (
            <button
              key={pill.key}
              onClick={() => { setActiveFilter(pill.key); setActiveTypeFilter(null) }}
              className="px-3 py-1.5 cursor-pointer transition-all"
              style={{
                borderRadius: 999,
                border: 'none',
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: isActive ? '#231f23' : 'rgba(35,31,35,0.06)',
                color: isActive ? '#ffffff' : 'rgba(35,31,35,0.64)',
              }}
            >
              {pill.label} <span style={{ ...monoLabel, fontSize: 11, marginLeft: 4 }}>{pill.count}</span>
            </button>
          )
        })}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Type filters */}
        {typeFilters.map((tf) => {
          const isActive = activeTypeFilter === tf
          const tagStyle = violationTagStyles[tf]
          return (
            <button
              key={tf}
              onClick={() => setActiveTypeFilter(isActive ? null : tf)}
              className="px-3 py-1.5 cursor-pointer transition-all"
              style={{
                borderRadius: 999,
                border: 'none',
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: isActive ? tagStyle.color : tagStyle.bg,
                color: isActive ? '#ffffff' : tagStyle.color,
              }}
            >
              {tf}
            </button>
          )
        })}
      </div>

      {/* ── Flagged Content Feed ── */}
      <div className="flex flex-col gap-3">
        {filteredItems.length === 0 && (
          <div
            className="flex items-center justify-center py-12"
            style={{ color: 'rgba(35,31,35,0.48)', fontSize: 14 }}
          >
            No items match this filter.
          </div>
        )}
        {filteredItems.map((item) => {
          const displayStatus = getDisplayStatus(item.status)
          const badge = statusBadgeStyles[displayStatus]
          const isResolved = displayStatus === 'resolved' || displayStatus === 'dismissed'

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItemId(item.id)}
              className="grid gap-4 cursor-pointer transition-all"
              style={{
                ...cardStyle,
                padding: '20px 24px',
                gridTemplateColumns: '80px 1fr auto',
                alignItems: 'start',
                opacity: isResolved ? 0.7 : 1,
              }}
            >
              {/* Thumbnail */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  backgroundColor: 'rgba(35,31,35,0.04)',
                  fontSize: 28,
                }}
              >
                {thumbEmojis[item.id] || '📄'}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 min-w-0">
                <div style={{ fontSize: 15, fontWeight: 500, color: '#231f23' }}>{item.prompt}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* User avatar + name */}
                  <div className="flex items-center gap-1.5">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(35,31,35,0.08)',
                        fontSize: 10,
                        color: 'rgba(35,31,35,0.48)',
                        fontWeight: 500,
                      }}
                    >
                      {item.user.charAt(0)}
                    </div>
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.64)' }}>{item.user}</span>
                  </div>
                  {/* Format badge */}
                  <span
                    style={{
                      ...monoLabel,
                      color: 'rgba(35,31,35,0.48)',
                      padding: '2px 6px',
                      borderRadius: 4,
                      backgroundColor: 'rgba(35,31,35,0.04)',
                    }}
                  >
                    {item.team}
                  </span>
                  {/* Time */}
                  <span style={{ ...monoLabel, color: 'rgba(35,31,35,0.32)' }}>{item.date}</span>
                </div>
                {/* Violation tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.violations.map((v, idx) => {
                    const vType = ruleToViolationType(v.rule)
                    const ts = violationTagStyles[vType]
                    return (
                      <span
                        key={idx}
                        className="px-2 py-0.5"
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          borderRadius: 999,
                          backgroundColor: ts.bg,
                          color: ts.color,
                        }}
                      >
                        {vType}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Right: Score ring + Status badge */}
              <div className="flex flex-col items-center gap-2">
                <div style={scoreRing(item.score, 36)}>
                  <div style={scoreRingInner(36)}>
                    <span
                      style={{
                        fontFamily: "'Fragment Mono', monospace",
                        fontSize: 10,
                        fontWeight: 600,
                        color: getScoreColor(item.score),
                      }}
                    >
                      {item.score}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    ...monoLabel,
                    fontSize: 10,
                    padding: '2px 6px',
                    borderRadius: 4,
                    backgroundColor: badge.bg,
                    color: badge.color,
                  }}
                >
                  {displayStatus}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Investigation Detail Panel ── */}
      {selectedItem && (
        <div style={{ ...cardStyle, padding: '24px 28px', marginTop: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 style={{ fontSize: 18, fontWeight: 500, color: '#231f23', margin: 0 }}>{selectedItem.prompt}</h2>
            <div className="flex items-center gap-3">
              <div style={scoreRing(selectedItem.score, 36)}>
                <div style={scoreRingInner(36)}>
                  <span
                    style={{
                      fontFamily: "'Fragment Mono', monospace",
                      fontSize: 10,
                      fontWeight: 600,
                      color: getScoreColor(selectedItem.score),
                    }}
                  >
                    {selectedItem.score}
                  </span>
                </div>
              </div>
              {(() => {
                const ds = getDisplayStatus(selectedItem.status)
                const b = statusBadgeStyles[ds]
                return (
                  <span
                    style={{
                      ...monoLabel,
                      fontSize: 10,
                      padding: '3px 8px',
                      borderRadius: 4,
                      backgroundColor: b.bg,
                      color: b.color,
                    }}
                  >
                    {ds}
                  </span>
                )
              })()}
            </div>
          </div>

          {/* Body: 2 column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left: What was generated */}
            <div>
              <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.48)', marginBottom: 12 }}>What was generated</div>
              {/* Preview placeholder */}
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  height: 180,
                  borderRadius: 12,
                  backgroundColor: 'rgba(35,31,35,0.04)',
                  color: 'rgba(35,31,35,0.32)',
                  fontSize: 13,
                }}
              >
                Preview not available
              </div>
              {/* Prompt text */}
              <div
                className="mb-3"
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  backgroundColor: 'rgba(35,31,35,0.03)',
                  fontSize: 14,
                  color: '#231f23',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ ...monoLabel, color: 'rgba(35,31,35,0.32)', display: 'block', marginBottom: 6 }}>Prompt</span>
                {selectedItem.prompt}
              </div>
              {/* Generated by info */}
              <div style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)' }}>
                Generated by <span style={{ fontWeight: 500, color: '#231f23' }}>{selectedItem.user}</span>
                {' '}&middot; {selectedItem.team} &middot; {selectedItem.date}
              </div>
            </div>

            {/* Right: Brand rules violated */}
            <div>
              <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.48)', marginBottom: 12 }}>Brand rules violated</div>
              <div className="flex flex-col gap-3">
                {selectedItem.violations.map((v, idx) => {
                  const vType = ruleToViolationType(v.rule)
                  const colors = extractColors(v.detail)
                  const standard = getBrandStandard(v.rule)

                  // Severity dot color
                  const severityColor =
                    vType === 'Color' ? '#e94560' :
                    vType === 'Voice' ? '#d97706' :
                    vType === 'Logo' ? '#4f46e5' :
                    'rgba(35,31,35,0.48)'

                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid rgba(35,31,35,0.08)',
                        borderRadius: 12,
                        padding: 16,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {/* Severity dot */}
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: severityColor,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 14, fontWeight: 500, color: '#231f23' }}>{v.rule}</span>
                      </div>

                      {/* Comparison grid */}
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {/* Detected */}
                        <div>
                          <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.32)', marginBottom: 6 }}>Detected</div>
                          {colors ? (
                            <div className="flex items-center gap-2">
                              <div
                                style={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: 4,
                                  backgroundColor: colors.detected,
                                  border: '1px solid rgba(35,31,35,0.08)',
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 12, color: 'rgba(35,31,35,0.64)' }}>
                                {colors.detected}
                              </span>
                            </div>
                          ) : (
                            <div style={{ fontSize: 13, color: 'rgba(35,31,35,0.64)', lineHeight: 1.4 }}>
                              {v.detail}
                            </div>
                          )}
                        </div>
                        {/* Brand standard */}
                        <div>
                          <div style={{ ...monoLabel, color: 'rgba(35,31,35,0.32)', marginBottom: 6 }}>
                            {standard.label}
                          </div>
                          {standard.color ? (
                            <div className="flex items-center gap-2">
                              <div
                                style={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: 4,
                                  backgroundColor: standard.color,
                                  border: '1px solid rgba(35,31,35,0.08)',
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 12, color: 'rgba(35,31,35,0.64)' }}>
                                {standard.color}
                              </span>
                            </div>
                          ) : (
                            <div style={{ fontSize: 13, color: 'rgba(35,31,35,0.64)', lineHeight: 1.4 }}>
                              {standard.value}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex items-center gap-3 pt-5 flex-wrap"
            style={{ borderTop: '1px solid rgba(35,31,35,0.08)' }}
          >
            <button
              className="px-4 py-2 cursor-pointer transition-all"
              style={{
                borderRadius: 8,
                border: '1px solid rgba(35,31,35,0.12)',
                backgroundColor: '#ffffff',
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(35,31,35,0.64)',
              }}
            >
              Dismiss
            </button>
            <button
              className="px-4 py-2 cursor-pointer transition-all"
              style={{
                borderRadius: 8,
                border: '1px solid rgba(35,31,35,0.12)',
                backgroundColor: '#ffffff',
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(35,31,35,0.64)',
              }}
            >
              One-off Exception
            </button>
            <button
              className="px-4 py-2 cursor-pointer transition-all"
              style={{
                borderRadius: 8,
                border: 'none',
                backgroundColor: '#231f23',
                fontSize: 13,
                fontWeight: 500,
                color: '#ffffff',
              }}
            >
              Update Brand Intelligence
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
