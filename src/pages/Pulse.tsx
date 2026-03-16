import { useState } from 'react'
import {
  AreaChart, Area, LineChart, Line, XAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { analyticsData } from '../data/mockData'

/* ------------------------------------------------------------------ */
/*  Design tokens (inline)                                             */
/* ------------------------------------------------------------------ */
const INK = '#231f23'
const MUTED_48 = 'rgba(35,31,35,0.48)'
const MUTED_64 = 'rgba(35,31,35,0.64)'
const MUTED_32 = 'rgba(35,31,35,0.32)'
const GREEN = '#4a7c59'
const RED = '#e94560'
const AMBER = '#d97706'
const DOT_GREEN = '#ccfdcf'
const DOT_GOLD = '#f4e7c7'
const DOT_PURPLE = '#cebffa'
const DOT_BLUE = '#d7e9ff'
const DOT_PEACH = '#ffe1d6'

const CARD_STYLE: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid rgba(35,31,35,0.08)',
  borderRadius: 16,
  padding: 24,
}

const MONO_LABEL: React.CSSProperties = {
  fontFamily: 'Fragment Mono, monospace',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: 0.75,
  color: MUTED_48,
}

const tooltipStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 8,
  border: '1px solid rgba(35,31,35,0.08)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  fontSize: 13,
}

/* ------------------------------------------------------------------ */
/*  Mock chart data                                                    */
/* ------------------------------------------------------------------ */
const volumeData = analyticsData.weeklyTrend.map((w) => ({
  name: w.week,
  value: w.count,
}))

const qualityData = analyticsData.weeklyTrend.map((w) => ({
  name: w.week,
  alignment: w.score,
  flags: Math.round(100 - w.score + (Math.random() * 4 - 2)),
}))

const topFormats = [
  { label: 'Instagram Post', count: 412, pct: 85, color: DOT_GREEN },
  { label: 'LinkedIn', count: 268, pct: 55, color: DOT_PURPLE },
  { label: 'X Post', count: 196, pct: 40, color: DOT_GOLD },
  { label: 'Instagram Story', count: 155, pct: 32, color: DOT_PEACH },
  { label: 'Facebook', count: 108, pct: 22, color: DOT_BLUE },
  { label: 'Other', count: 108, pct: 18, color: '#e5e5e5' },
]

const commonViolations = [
  { label: 'Color mismatch', count: 34 },
  { label: 'Voice deviation', count: 28 },
  { label: 'Typography', count: 19 },
  { label: 'Logo misuse', count: 11 },
]

const userActivity = [
  { name: 'Elena Rodriguez', initials: 'ER', dept: 'Marketing', generated: 142, exported: 118, alignment: 96, flagged: 1 },
  { name: 'David Chen', initials: 'DC', dept: 'Design', generated: 128, exported: 104, alignment: 93, flagged: 2 },
  { name: 'Sarah Lawrence', initials: 'SL', dept: 'Marketing', generated: 97, exported: 82, alignment: 91, flagged: 3 },
  { name: 'James Kim', initials: 'JK', dept: 'Sales', generated: 89, exported: 71, alignment: 87, flagged: 4 },
  { name: 'Priya Mehta', initials: 'PM', dept: 'HR', generated: 76, exported: 58, alignment: 84, flagged: 5 },
  { name: 'Alex Torres', initials: 'AT', dept: 'Product', generated: 64, exported: 49, alignment: 79, flagged: 7 },
  { name: 'Mike Reynolds', initials: 'MR', dept: 'Finance', generated: 41, exported: 32, alignment: 74, flagged: 9 },
  { name: 'Aisha Patel', initials: 'AP', dept: 'Engineering', generated: 38, exported: 28, alignment: 82, flagged: 3 },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function alignmentColor(score: number): { bg: string; text: string } {
  if (score >= 90) return { bg: 'rgba(74,124,89,0.12)', text: GREEN }
  if (score >= 80) return { bg: 'rgba(217,119,6,0.12)', text: AMBER }
  return { bg: 'rgba(233,69,96,0.12)', text: RED }
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function Pulse() {
  const [period, setPeriod] = useState<'Week' | 'Month' | 'All Time'>('Month')

  const periods: ('Week' | 'Month' | 'All Time')[] = ['Week', 'Month', 'All Time']

  return (
    <div style={{ color: INK }}>
      {/* ============================================================ */}
      {/* PAGE HEADER                                                   */}
      {/* ============================================================ */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: INK }}>Analytics</h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: MUTED_48, marginTop: 4 }}>
            Track generation volume, brand compliance, and team activity
          </p>
        </div>
        <div className="flex items-center" style={{ borderRadius: 10, border: '1px solid rgba(35,31,35,0.08)', overflow: 'hidden' }}>
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-4 py-2"
              style={{
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: period === p ? INK : '#ffffff',
                color: period === p ? '#ffffff' : MUTED_64,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* METRICS ROW                                                   */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Total Generated */}
        <div style={CARD_STYLE}>
          <div className="flex items-center justify-between mb-3">
            <span style={MONO_LABEL}>Total Generated</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: DOT_GREEN, display: 'inline-block' }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: INK, lineHeight: 1 }}>1,247</div>
          <div className="mt-2" style={{ fontSize: 13, color: GREEN, fontWeight: 500 }}>
            ↑ 18% vs last month
          </div>
        </div>

        {/* Active Users */}
        <div style={CARD_STYLE}>
          <div className="flex items-center justify-between mb-3">
            <span style={MONO_LABEL}>Active Users</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: DOT_GOLD, display: 'inline-block' }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: INK, lineHeight: 1 }}>34</div>
          <div className="mt-2" style={{ fontSize: 13, color: GREEN, fontWeight: 500 }}>
            ↑ 6 new this month
          </div>
        </div>

        {/* Avg per User */}
        <div style={CARD_STYLE}>
          <div className="flex items-center justify-between mb-3">
            <span style={MONO_LABEL}>Avg per User</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: DOT_PURPLE, display: 'inline-block' }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: INK, lineHeight: 1 }}>36.7</div>
          <div className="mt-2" style={{ fontSize: 13, color: GREEN, fontWeight: 500 }}>
            ↑ 12% vs last month
          </div>
        </div>

        {/* Exports */}
        <div style={CARD_STYLE}>
          <div className="flex items-center justify-between mb-3">
            <span style={MONO_LABEL}>Exports</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: DOT_BLUE, display: 'inline-block' }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: INK, lineHeight: 1 }}>892</div>
          <div className="mt-2" style={{ fontSize: 13, color: GREEN, fontWeight: 500 }}>
            ↑ 24% vs last month
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CHART ROW 1: Generation Volume + Top Formats                  */}
      {/* ============================================================ */}
      <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Generation Volume */}
        <div style={CARD_STYLE}>
          <div className="flex items-center justify-between mb-1">
            <span style={{ fontSize: 16, fontWeight: 500, color: INK }}>Generation Volume</span>
          </div>
          <div className="mb-4">
            <span style={MONO_LABEL}>Daily average: 42</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GREEN} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={GREEN} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(35,31,35,0.06)" />
              <XAxis
                dataKey="name"
                tick={{ fontFamily: 'Fragment Mono, monospace', fontSize: 11, fill: MUTED_48 } as Record<string, unknown>}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={GREEN}
                strokeWidth={2.5}
                fill="url(#greenGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Formats */}
        <div style={CARD_STYLE}>
          <div className="mb-5">
            <span style={{ fontSize: 16, fontWeight: 500, color: INK }}>Top Formats</span>
          </div>
          <div className="flex flex-col gap-4">
            {topFormats.map((f) => (
              <div key={f.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 13, fontWeight: 400, color: INK }}>{f.label}</span>
                  <span style={{ ...MONO_LABEL, color: MUTED_48 }}>{f.count}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(35,31,35,0.04)' }}>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: f.color,
                      width: `${f.pct}%`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CHART ROW 2: Brand Compliance + Quality Trends                */}
      {/* ============================================================ */}
      <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Brand Compliance */}
        <div style={CARD_STYLE}>
          <div className="mb-5">
            <span style={{ fontSize: 16, fontWeight: 500, color: INK }}>Brand Compliance</span>
          </div>

          <div className="flex items-start gap-8">
            {/* Donut chart */}
            <div className="flex flex-col items-center" style={{ minWidth: 160 }}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: `conic-gradient(${GREEN} 0deg 259.2deg, ${AMBER} 259.2deg 309.6deg, ${RED} 309.6deg 360deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 600, color: INK, lineHeight: 1 }}>91%</span>
                  <span style={{ fontSize: 11, color: MUTED_48, marginTop: 2 }}>Average</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: GREEN, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: MUTED_64 }}>Passed 72%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: AMBER, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: MUTED_64 }}>Warning 14%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: RED, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: MUTED_64 }}>Failed 14%</span>
                </div>
              </div>
            </div>

            {/* Right side stats */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div style={{ ...CARD_STYLE, padding: 16 }}>
                  <span style={MONO_LABEL}>vs Last Month</span>
                  <div className="mt-1" style={{ fontSize: 20, fontWeight: 600, color: GREEN }}>+3.2%</div>
                </div>
                <div style={{ ...CARD_STYLE, padding: 16 }}>
                  <span style={MONO_LABEL}>Flags This Month</span>
                  <div className="mt-1" style={{ fontSize: 20, fontWeight: 600, color: AMBER }}>14</div>
                </div>
              </div>

              {/* Insight callout */}
              <div
                className="flex items-start gap-3 p-4"
                style={{
                  backgroundColor: 'rgba(74,124,89,0.06)',
                  borderRadius: 12,
                  border: '1px solid rgba(74,124,89,0.12)',
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: INK }}>Brand compliance improved 3.2% this month. </span>
                  <span style={{ fontSize: 13, color: MUTED_64 }}>
                    Color consistency is the biggest area for improvement with 34 flags.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Trends */}
        <div style={CARD_STYLE}>
          <div className="mb-5">
            <span style={{ fontSize: 16, fontWeight: 500, color: INK }}>Quality Trends</span>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <span style={{ width: 12, height: 2, backgroundColor: DOT_PURPLE, display: 'inline-block', borderRadius: 1 }} />
              <span style={{ fontSize: 11, color: MUTED_64 }}>Alignment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ width: 12, height: 2, backgroundColor: RED, display: 'inline-block', borderRadius: 1, borderTop: `1px dashed ${RED}` }} />
              <span style={{ fontSize: 11, color: MUTED_64 }}>Flags</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={qualityData}>
              <CartesianGrid vertical={false} stroke="rgba(35,31,35,0.06)" />
              <XAxis
                dataKey="name"
                tick={{ fontFamily: 'Fragment Mono, monospace', fontSize: 10, fill: MUTED_48 } as Record<string, unknown>}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="alignment" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="flags" stroke={RED} strokeWidth={2} strokeDasharray="4 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>

          {/* Most Common Violations */}
          <div className="mt-5">
            <span style={{ ...MONO_LABEL, display: 'block', marginBottom: 10 }}>Most Common Violations</span>
            <div className="flex flex-col gap-3">
              {commonViolations.map((v) => (
                <div key={v.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: 12, color: MUTED_64 }}>{v.label}</span>
                    <span style={{ ...MONO_LABEL, color: MUTED_32 }}>{v.count}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(35,31,35,0.04)' }}>
                    <div
                      style={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: RED,
                        opacity: 0.6,
                        width: `${(v.count / 34) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* USER ACTIVITY TABLE                                           */}
      {/* ============================================================ */}
      <div style={CARD_STYLE}>
        <div className="mb-5">
          <span style={{ fontSize: 16, fontWeight: 500, color: INK }}>User Activity</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(35,31,35,0.08)' }}>
                {['User', 'Department', 'Generated', 'Exported', 'Avg Alignment', 'Flagged'].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4"
                    style={{ ...MONO_LABEL, fontWeight: 500 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userActivity.map((u) => {
                const ac = alignmentColor(u.alignment)
                return (
                  <tr
                    key={u.name}
                    style={{ borderBottom: '1px solid rgba(35,31,35,0.04)' }}
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(35,31,35,0.06)',
                            fontSize: 11,
                            fontWeight: 600,
                            color: MUTED_64,
                          }}
                        >
                          {u.initials}
                        </div>
                        <span style={{ fontWeight: 500, color: INK }}>{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4" style={{ color: MUTED_64 }}>{u.dept}</td>
                    <td className="py-3 pr-4" style={{ fontFamily: 'Fragment Mono, monospace', color: INK }}>{u.generated}</td>
                    <td className="py-3 pr-4" style={{ fontFamily: 'Fragment Mono, monospace', color: INK }}>{u.exported}</td>
                    <td className="py-3 pr-4">
                      <span
                        className="inline-block px-2.5 py-0.5"
                        style={{
                          borderRadius: 20,
                          backgroundColor: ac.bg,
                          color: ac.text,
                          fontFamily: 'Fragment Mono, monospace',
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {u.alignment}%
                      </span>
                    </td>
                    <td className="py-3" style={{ fontFamily: 'Fragment Mono, monospace', color: u.flagged >= 5 ? RED : MUTED_48 }}>
                      {u.flagged}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
