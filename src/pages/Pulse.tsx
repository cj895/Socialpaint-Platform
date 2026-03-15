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
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const ink = '#0f0f0f'
const surface = '#f3f3f2'
const border = 'rgba(15,15,15,0.06)'
const muted = 'rgba(15,15,15,0.45)'
const accent = '#2d5bf6'
const signalGreen = '#1a8754'
const signalRed = '#dc3545'

/* ------------------------------------------------------------------ */
/*  Shared tooltip style                                               */
/* ------------------------------------------------------------------ */
const tooltipStyle = {
  backgroundColor: '#fff',
  borderRadius: 8,
  border: `1px solid ${border}`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  fontSize: 13,
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Pulse() {
  const { weeklyTrend, teamActivity, topUsers, formatBreakdown, violationTypes } = analyticsData

  const maxTeam = Math.max(...teamActivity.map((t) => t.count))
  const maxFormat = Math.max(...formatBreakdown.map((f) => f.count))
  const maxViolation = Math.max(...violationTypes.map((v) => v.count))

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: ink }}>
      {/* ============================================================ */}
      {/* PAGE HEADER                                                   */}
      {/* ============================================================ */}
      <div className="mb-12">
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.5px' }}>Pulse</h1>
        <p style={{ fontSize: 14, fontWeight: 400, color: muted, marginTop: 4 }}>
          Brand performance intelligence
        </p>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1 — How active is your team?                          */}
      {/* ============================================================ */}
      <section>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: 'rgba(15,15,15,0.4)',
            marginBottom: 16,
          }}
        >
          TEAM ACTIVITY
        </p>

        {/* Weekly trend chart card */}
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: surface, border: `1px solid ${border}` }}
        >
          {/* Overlay stat */}
          <div className="mb-2">
            <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>
              {analyticsData.totalGenerated.month}
            </span>
            <p style={{ fontSize: 14, fontWeight: 400, color: muted, marginTop: 4 }}>
              generated this month
            </p>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={200}>
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
                stroke={ink}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 3-column breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Top Teams */}
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
                marginBottom: 16,
              }}
            >
              TOP TEAMS
            </p>
            <div className="flex flex-col gap-3">
              {teamActivity.slice(0, 5).map((t, i) => (
                <div key={t.team}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono"
                        style={{ fontSize: 13, color: muted, width: 16, display: 'inline-block' }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{t.team}</span>
                    </div>
                    <span className="font-mono" style={{ fontSize: 13, color: muted }}>
                      {t.count}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      borderRadius: 2,
                      backgroundColor: 'rgba(15,15,15,0.06)',
                      marginLeft: 24,
                    }}
                  >
                    <div
                      style={{
                        height: 3,
                        borderRadius: 2,
                        backgroundColor: ink,
                        width: `${(t.count / maxTeam) * 100}%`,
                        transition: 'width 120ms ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Users */}
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
                marginBottom: 16,
              }}
            >
              TOP USERS
            </p>
            <div className="flex flex-col gap-3">
              {topUsers.map((u, i) => (
                <div key={u.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono"
                      style={{ fontSize: 13, color: muted, width: 16, display: 'inline-block' }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</span>
                      <span style={{ fontSize: 13, color: muted, marginLeft: 6 }}>{u.team}</span>
                    </div>
                  </div>
                  <span className="font-mono" style={{ fontSize: 13, color: muted }}>
                    {u.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formats */}
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
                marginBottom: 16,
              }}
            >
              FORMATS
            </p>
            <div className="flex flex-col gap-3">
              {formatBreakdown.map((f) => (
                <div key={f.format}>
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: 14, fontWeight: 400 }}>{f.format}</span>
                    <span className="font-mono" style={{ fontSize: 13, color: muted }}>
                      {f.count}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      borderRadius: 2,
                      backgroundColor: 'rgba(15,15,15,0.06)',
                    }}
                  >
                    <div
                      style={{
                        height: 3,
                        borderRadius: 2,
                        backgroundColor: ink,
                        width: `${(f.count / maxFormat) * 100}%`,
                        transition: 'width 120ms ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Is your brand staying consistent?                 */}
      {/* ============================================================ */}
      <section style={{ marginTop: 48 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: 'rgba(15,15,15,0.4)',
            marginBottom: 16,
          }}
        >
          BRAND COMPLIANCE
        </p>

        {/* Score + compliance ratio */}
        <div
          className="rounded-xl p-6 grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
          style={{ backgroundColor: surface, border: `1px solid ${border}` }}
        >
          {/* Left 60%: avg alignment score */}
          <div className="md:col-span-3">
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
                marginBottom: 8,
              }}
            >
              AVG ALIGNMENT SCORE
            </p>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>
                {analyticsData.avgAlignmentScore}
              </span>
              <div className="flex items-center gap-1" style={{ color: signalGreen }}>
                <TrendingUp size={16} strokeWidth={1.5} />
                <span style={{ fontSize: 14, fontWeight: 500 }}>+2 pts</span>
              </div>
            </div>
          </div>

          {/* Right 40%: compliance ratio bar */}
          <div className="md:col-span-2">
            <div
              style={{
                height: 8,
                borderRadius: 999,
                overflow: 'hidden',
                display: 'flex',
                backgroundColor: 'rgba(15,15,15,0.06)',
              }}
            >
              <div
                style={{
                  width: `${analyticsData.passedPercent}%`,
                  backgroundColor: signalGreen,
                  borderRadius: '999px 0 0 999px',
                }}
              />
              <div
                style={{
                  width: `${analyticsData.flaggedPercent}%`,
                  backgroundColor: signalRed,
                  borderRadius: '0 999px 999px 0',
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span style={{ fontSize: 13, fontWeight: 500, color: signalGreen }}>
                {analyticsData.passedPercent}% passed
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: signalRed }}>
                {analyticsData.flaggedPercent}% flagged
              </span>
            </div>
          </div>
        </div>

        {/* Compliance trend chart */}
        <div
          className="rounded-xl p-6 mt-6"
          style={{ backgroundColor: surface, border: `1px solid ${border}` }}
        >
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
                stroke={signalGreen}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top violations */}
        <div
          className="rounded-xl p-6 mt-6"
          style={{ backgroundColor: surface, border: `1px solid ${border}` }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              color: 'rgba(15,15,15,0.4)',
              marginBottom: 16,
            }}
          >
            TOP VIOLATIONS
          </p>
          <div className="flex flex-col gap-4">
            {violationTypes.map((v) => (
              <div key={v.type}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 14, fontWeight: 400 }}>{v.type}</span>
                  <span className="font-mono" style={{ fontSize: 13, color: muted }}>
                    {v.count}
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(220,53,69,0.2)',
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: signalRed,
                      width: `${(v.count / maxViolation) * 100}%`,
                      transition: 'width 120ms ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Where should you improve?                         */}
      {/* ============================================================ */}
      <section style={{ marginTop: 48 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: 'rgba(15,15,15,0.4)',
            marginBottom: 16,
          }}
        >
          RECOMMENDATIONS
        </p>

        <div className="flex flex-col gap-4">
          {/* Recommendation 1: Color mismatch */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'rgba(15,15,15,0.04)',
                }}
              >
                <FileImage size={18} strokeWidth={1.5} style={{ color: muted }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  Strengthen your color system
                </h3>
                <p style={{ fontSize: 14, fontWeight: 400, color: muted, marginBottom: 12 }}>
                  Color mismatch is your #1 violation type with 34 occurrences. Review and expand
                  your color palette to cover common use cases.
                </p>
                <Link
                  to="/brand-system"
                  className="inline-flex items-center gap-1"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: accent,
                    textDecoration: 'none',
                    transition: 'opacity 120ms ease',
                  }}
                >
                  Review color system <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>

          {/* Recommendation 2: Voice deviation */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'rgba(15,15,15,0.04)',
                }}
              >
                <Shield size={18} strokeWidth={1.5} style={{ color: muted }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  Tighten your brand voice guidelines
                </h3>
                <p style={{ fontSize: 14, fontWeight: 400, color: muted, marginBottom: 12 }}>
                  Voice deviation accounts for 28 flags this month. Add more examples of preferred
                  and avoided language to help your team stay on-brand.
                </p>
                <Link
                  to="/brand-system"
                  className="inline-flex items-center gap-1"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: accent,
                    textDecoration: 'none',
                    transition: 'opacity 120ms ease',
                  }}
                >
                  Review voice guidelines <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>

          {/* Recommendation 3: Typography mismatch */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'rgba(15,15,15,0.04)',
                }}
              >
                <Users size={18} strokeWidth={1.5} style={{ color: muted }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  Standardize typography across teams
                </h3>
                <p style={{ fontSize: 14, fontWeight: 400, color: muted, marginBottom: 12 }}>
                  Typography mismatch has 19 occurrences, often from teams using system fonts instead
                  of brand fonts. Distribute font files and update your onboarding guide.
                </p>
                <Link
                  to="/brand-system"
                  className="inline-flex items-center gap-1"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: accent,
                    textDecoration: 'none',
                    transition: 'opacity 120ms ease',
                  }}
                >
                  Review typography system <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
