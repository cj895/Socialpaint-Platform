import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, AlertTriangle,
  PenTool, Fingerprint, Shield, Sparkles, ChevronRight,
} from 'lucide-react'
import { analyticsData, flaggedItems } from '../data/mockData'

// ---------------------------------------------------------------------------
// Activity feed mock data
// ---------------------------------------------------------------------------
const activityFeed = [
  {
    id: 'a1',
    type: 'generation' as const,
    initials: 'SL',
    description: 'Sarah L. generated an Instagram Post',
    detail: 'Spring product launch announcement',
    score: 94,
    timestamp: '12 min ago',
  },
  {
    id: 'a2',
    type: 'flag' as const,
    initials: 'JK',
    description: 'LinkedIn Post by James K. was flagged',
    detail: 'Color mismatch & voice deviation detected',
    score: 52,
    timestamp: '34 min ago',
  },
  {
    id: 'a3',
    type: 'brand' as const,
    initials: 'DC',
    description: 'David Chen updated the color palette',
    detail: 'Added Coral Pop as CTA highlight',
    timestamp: '1 hr ago',
  },
  {
    id: 'a4',
    type: 'generation' as const,
    initials: 'PM',
    description: 'Priya M. generated a Facebook Post',
    detail: 'Engineering team hiring announcement',
    score: 61,
    timestamp: '1.5 hr ago',
  },
  {
    id: 'a5',
    type: 'flag' as const,
    initials: 'AT',
    description: 'Product launch teaser by Alex T. was flagged',
    detail: 'Logo misuse & off-palette colors',
    score: 48,
    timestamp: '2 hr ago',
  },
  {
    id: 'a6',
    type: 'generation' as const,
    initials: 'SL',
    description: 'Sarah L. generated an X Post',
    detail: "Customer success story — Maria's journey",
    score: 93,
    timestamp: '3 hr ago',
  },
  {
    id: 'a7',
    type: 'brand' as const,
    initials: 'ER',
    description: 'Elena Rodriguez updated voice guidelines',
    detail: 'Refined preferred vocabulary list',
    timestamp: '4 hr ago',
  },
  {
    id: 'a8',
    type: 'generation' as const,
    initials: 'JK',
    description: 'James K. generated a LinkedIn Post',
    detail: 'Team culture spotlight — design team',
    score: 89,
    timestamp: '5 hr ago',
  },
  {
    id: 'a9',
    type: 'flag' as const,
    initials: 'MR',
    description: 'Q1 infographic by Mike R. was flagged',
    detail: 'Chart uses default palette instead of brand',
    score: 58,
    timestamp: '6 hr ago',
  },
  {
    id: 'a10',
    type: 'generation' as const,
    initials: 'AP',
    description: 'Aisha P. generated an Instagram Story',
    detail: 'Weekend wellness tips carousel',
    score: 86,
    timestamp: 'Yesterday',
  },
]

// ---------------------------------------------------------------------------
// Needs Attention items
// ---------------------------------------------------------------------------
const pendingCount = flaggedItems.filter((f) => f.status === 'pending').length
const attentionItems = [
  {
    id: 'n1',
    icon: AlertTriangle,
    label: `${pendingCount} items pending review`,
    path: '/guard',
  },
  {
    id: 'n2',
    icon: Fingerprint,
    label: 'Connect Figma plugin',
    path: '/brand-system',
  },
  {
    id: 'n3',
    icon: PenTool,
    label: 'Voice guidelines need update',
    path: '/brand-system',
  },
  {
    id: 'n4',
    icon: Shield,
    label: 'Review compliance thresholds',
    path: '/guard',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function scoreColor(score: number): string {
  if (score >= 80) return 'var(--color-signal-green)'
  if (score >= 60) return 'var(--color-signal-amber)'
  return 'var(--color-signal-red)'
}

function buildSparklinePath(scores: number[]): string {
  const min = Math.min(...scores)
  const max = Math.max(...scores)
  const range = max - min || 1
  const width = 96
  const height = 28
  const step = width / (scores.length - 1)

  return scores
    .map((s, i) => {
      const x = i * step
      const y = height - ((s - min) / range) * height
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

// ---------------------------------------------------------------------------
// Content format options for Quick Create
// ---------------------------------------------------------------------------
const formatOptions = [
  'Instagram Post',
  'Instagram Story',
  'LinkedIn Post',
  'Facebook Post',
  'X Post',
  'YouTube Thumbnail',
  'Pinterest Pin',
]

// ---------------------------------------------------------------------------
// Command Page
// ---------------------------------------------------------------------------
export default function Command() {
  const [selectedFormat, setSelectedFormat] = useState('Instagram Post')
  const [prompt, setPrompt] = useState('')

  const overallScore = 84
  const complianceRate = analyticsData.passedPercent
  const activeFlagCount = flaggedItems.filter(
    (f) => f.status === 'pending' || f.status === 'investigating',
  ).length

  // Last 7 weeks of scores for the sparkline
  const sparklineScores = analyticsData.weeklyTrend.slice(-7).map((w) => w.score)
  const sparklinePath = buildSparklinePath(sparklineScores)

  return (
    <div className="flex flex-col gap-12">
      {/* ================================================================
          1. Brand Health Bar
          ================================================================ */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand Score */}
          <div className="flex-1 min-w-0">
            <p className="caption mb-1">BRAND SCORE</p>
            <p
              className="text-ink leading-none"
              style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-2px' }}
            >
              {overallScore}
            </p>
            {/* Progress bar */}
            <div className="mt-3 h-1 w-full max-w-[160px] rounded-full bg-surface" style={{ backgroundColor: 'rgba(15,15,15,0.06)' }}>
              <div
                className="h-1 rounded-full"
                style={{
                  width: `${overallScore}%`,
                  backgroundColor: 'var(--color-signal-green)',
                }}
              />
            </div>
          </div>

          {/* Compliance Rate */}
          <div className="flex-1 min-w-0">
            <p className="caption mb-1">COMPLIANCE</p>
            <div className="flex items-end gap-4">
              <p
                className="text-ink leading-none"
                style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-1px' }}
              >
                {complianceRate}%
              </p>
              <svg
                width={96}
                height={28}
                viewBox="0 0 96 28"
                fill="none"
                className="mb-1"
              >
                <path
                  d={sparklinePath}
                  stroke="var(--color-signal-green)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Active Flags */}
          <div className="flex-1 min-w-0">
            <p className="caption mb-1">ACTIVE FLAGS</p>
            <Link to="/guard" className="inline-flex items-center gap-2 group">
              <p
                className="text-ink leading-none"
                style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-1px' }}
              >
                {activeFlagCount}
              </p>
              {activeFlagCount > 0 && (
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-signal-red)' }}
                />
              )}
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================
          2. Main Content — 60 / 40 split
          ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        {/* ----------------------------------------------------------
            LEFT — Activity Feed
            ---------------------------------------------------------- */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="caption">RECENT ACTIVITY</p>
            <Link
              to="/pulse"
              className="text-[13px] text-muted hover:text-ink transition-colors duration-150 flex items-center gap-1"
              style={{ fontWeight: 500 }}
            >
              View all <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="max-h-[600px] overflow-y-auto pr-1">
            {activityFeed.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 py-3 border-b border-border"
              >
                {/* Avatar */}
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px]"
                  style={{
                    fontWeight: 600,
                    backgroundColor: 'rgba(45, 91, 246, 0.1)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {event.initials}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-ink" style={{ fontWeight: 450 }}>
                    {event.description}
                  </p>
                  <p className="text-[13px] text-muted mt-0.5 truncate">
                    {event.detail}
                  </p>
                </div>

                {/* Right side — score badge + timestamp */}
                <div className="shrink-0 flex flex-col items-end gap-1">
                  {event.score !== undefined && (
                    <span
                      className="font-mono text-[12px] px-1.5 py-0.5 rounded"
                      style={{
                        fontWeight: 500,
                        color: scoreColor(event.score),
                        backgroundColor:
                          event.score >= 80
                            ? 'rgba(26, 135, 84, 0.08)'
                            : event.score >= 60
                              ? 'rgba(217, 119, 6, 0.08)'
                              : 'rgba(220, 53, 69, 0.08)',
                      }}
                    >
                      {event.score}
                    </span>
                  )}
                  {event.type === 'flag' && event.score === undefined && (
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--color-signal-red)' }}
                    />
                  )}
                  <span className="font-mono text-[11px] text-muted whitespace-nowrap">
                    {event.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------
            RIGHT — Sidebar
            ---------------------------------------------------------- */}
        <div className="flex flex-col gap-8">
          {/* Quick Create Card */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <h3
              className="text-ink mb-4"
              style={{ fontSize: 18, fontWeight: 600 }}
            >
              Quick Create
            </h3>

            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-white border border-border rounded-lg h-10 px-3 text-[13px] text-ink mb-3 outline-none transition-colors duration-150 hover:border-border-hover focus:border-accent"
              style={{ fontWeight: 450 }}
            >
              {formatOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <textarea
              rows={3}
              placeholder="Describe what you need..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-white border border-border rounded-lg px-3 py-2 text-[13px] text-ink mb-3 outline-none resize-none transition-colors duration-150 hover:border-border-hover focus:border-accent"
              style={{ fontWeight: 400 }}
            />

            <Link to="/create">
              <button
                className="bg-ink text-white h-10 px-4 rounded-lg text-[13px] inline-flex items-center gap-2 transition-opacity duration-150 hover:opacity-80"
                style={{ fontWeight: 500 }}
              >
                <Sparkles size={16} strokeWidth={1.5} />
                Generate
              </button>
            </Link>
          </div>

          {/* Needs Attention */}
          <div>
            <p className="caption mb-3">NEEDS ATTENTION</p>
            <div className="flex flex-col">
              {attentionItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex items-center gap-3 py-3 px-2 -mx-2 rounded-lg transition-colors duration-150 hover:bg-surface group"
                >
                  <item.icon
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-muted"
                  />
                  <span
                    className="flex-1 text-[14px] text-ink"
                    style={{ fontWeight: 450 }}
                  >
                    {item.label}
                  </span>
                  <ChevronRight
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
