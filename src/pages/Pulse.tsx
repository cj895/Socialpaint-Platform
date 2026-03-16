import { Link } from 'react-router-dom'
import {
  TrendingUp, Users, FileImage, Shield, ArrowRight,
} from 'lucide-react'
import {
  LineChart, Line, XAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { analyticsData } from '../data/mockData'

/* ------------------------------------------------------------------ */
/*  Shared tooltip style                                               */
/* ------------------------------------------------------------------ */
const tooltipStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  fontSize: 13,
}

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */

/** Section label using the .caption class from index.css */
function Caption({ children }: { children: React.ReactNode }) {
  return <p className="caption mb-4">{children}</p>
}

/** Card wrapper — surface bg, border, rounded */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-6 bg-surface border border-border ${className}`}>
      {children}
    </div>
  )
}

/** Horizontal bar used in ranked lists */
function ProgressBar({
  value,
  max,
  color = 'bg-ink',
  trackColor = 'bg-border',
}: {
  value: number
  max: number
  color?: string
  trackColor?: string
}) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className={`h-[3px] rounded-sm ${trackColor}`}>
      <div
        className={`h-[3px] rounded-sm ${color} transition-[width] duration-150 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

/** Recommendation card */
function RecommendationCard({
  icon,
  title,
  description,
  linkLabel,
  linkTo,
}: {
  icon: React.ReactNode
  title: string
  description: string
  linkLabel: string
  linkTo: string
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-subtle">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted mb-3">{description}</p>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
          >
            {linkLabel} <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function Pulse() {
  const { weeklyTrend, teamActivity, topUsers, formatBreakdown, violationTypes } = analyticsData

  const maxTeam = Math.max(...teamActivity.map((t) => t.count))
  const maxFormat = Math.max(...formatBreakdown.map((f) => f.count))
  const maxViolation = Math.max(...violationTypes.map((v) => v.count))

  return (
    <div className="font-sans text-ink">
      {/* ============================================================ */}
      {/* PAGE HEADER                                                   */}
      {/* ============================================================ */}
      <div className="mb-12">
        <h1 className="text-[28px] font-semibold tracking-tight">Pulse</h1>
        <p className="text-sm text-muted mt-1">Brand performance intelligence</p>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1 -- Team Activity                                    */}
      {/* ============================================================ */}
      <section>
        <Caption>TEAM ACTIVITY</Caption>

        {/* Weekly trend chart card */}
        <Card>
          <div className="mb-2">
            <span className="text-5xl font-semibold tracking-tighter leading-none">
              {analyticsData.totalGenerated.month}
            </span>
            <p className="text-sm text-muted mt-1">generated this month</p>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid vertical={false} stroke="rgba(15,15,15,0.04)" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: 'rgba(15,15,15,0.4)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--color-ink)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 3-column breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Top Teams */}
          <Card>
            <Caption>TOP TEAMS</Caption>
            <div className="flex flex-col gap-3">
              {teamActivity.slice(0, 5).map((t, i) => (
                <div key={t.team}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13px] text-muted w-4 inline-block">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{t.team}</span>
                    </div>
                    <span className="font-mono text-[13px] text-muted">{t.count}</span>
                  </div>
                  <div className="ml-6">
                    <ProgressBar value={t.count} max={maxTeam} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Users */}
          <Card>
            <Caption>TOP USERS</Caption>
            <div className="flex flex-col gap-3">
              {topUsers.map((u, i) => (
                <div key={u.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[13px] text-muted w-4 inline-block">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-sm font-medium">{u.name}</span>
                      <span className="text-[13px] text-muted ml-1.5">{u.team}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[13px] text-muted">{u.count}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Formats */}
          <Card>
            <Caption>FORMATS</Caption>
            <div className="flex flex-col gap-3">
              {formatBreakdown.map((f) => (
                <div key={f.format}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{f.format}</span>
                    <span className="font-mono text-[13px] text-muted">{f.count}</span>
                  </div>
                  <ProgressBar value={f.count} max={maxFormat} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 -- Brand Compliance                                 */}
      {/* ============================================================ */}
      <section className="mt-12">
        <Caption>BRAND COMPLIANCE</Caption>

        {/* Score + compliance ratio */}
        <Card className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Left: avg alignment score */}
          <div className="md:col-span-3">
            <p className="caption mb-2">AVG ALIGNMENT SCORE</p>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-semibold tracking-tighter leading-none">
                {analyticsData.avgAlignmentScore}
              </span>
              <div className="flex items-center gap-1 text-signal-green">
                <TrendingUp size={16} strokeWidth={1.5} />
                <span className="text-sm font-medium">+2 pts</span>
              </div>
            </div>
          </div>

          {/* Right: compliance ratio bar */}
          <div className="md:col-span-2">
            <div className="h-2 rounded-full overflow-hidden flex bg-border">
              <div
                className="bg-signal-green rounded-l-full"
                style={{ width: `${analyticsData.passedPercent}%` }}
              />
              <div
                className="bg-signal-red rounded-r-full"
                style={{ width: `${analyticsData.flaggedPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[13px] font-medium text-signal-green">
                {analyticsData.passedPercent}% passed
              </span>
              <span className="text-[13px] font-medium text-signal-red">
                {analyticsData.flaggedPercent}% flagged
              </span>
            </div>
          </div>
        </Card>

        {/* Compliance trend chart */}
        <Card className="mt-6">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid vertical={false} stroke="rgba(15,15,15,0.04)" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: 'rgba(15,15,15,0.4)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-signal-green)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top violations */}
        <Card className="mt-6">
          <Caption>TOP VIOLATIONS</Caption>
          <div className="flex flex-col gap-4">
            {violationTypes.map((v) => (
              <div key={v.type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{v.type}</span>
                  <span className="font-mono text-[13px] text-muted">{v.count}</span>
                </div>
                <ProgressBar
                  value={v.count}
                  max={maxViolation}
                  color="bg-signal-red"
                  trackColor="bg-signal-red/20"
                />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 -- Recommendations                                  */}
      {/* ============================================================ */}
      <section className="mt-12">
        <Caption>RECOMMENDATIONS</Caption>

        <div className="flex flex-col gap-4">
          <RecommendationCard
            icon={<FileImage size={18} strokeWidth={1.5} className="text-muted" />}
            title="Strengthen your color system"
            description="Color mismatch is your #1 violation type with 34 occurrences. Review and expand your color palette to cover common use cases."
            linkLabel="Review color system"
            linkTo="/brand-system"
          />

          <RecommendationCard
            icon={<Shield size={18} strokeWidth={1.5} className="text-muted" />}
            title="Tighten your brand voice guidelines"
            description="Voice deviation accounts for 28 flags this month. Add more examples of preferred and avoided language to help your team stay on-brand."
            linkLabel="Review voice guidelines"
            linkTo="/brand-system"
          />

          <RecommendationCard
            icon={<Users size={18} strokeWidth={1.5} className="text-muted" />}
            title="Standardize typography across teams"
            description="Typography mismatch has 19 occurrences, often from teams using system fonts instead of brand fonts. Distribute font files and update your onboarding guide."
            linkLabel="Review typography system"
            linkTo="/brand-system"
          />
        </div>
      </section>
    </div>
  )
}
