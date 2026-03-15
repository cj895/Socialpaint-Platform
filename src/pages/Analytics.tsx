import { motion } from 'motion/react'
import {
  BarChart3, Users, FileImage, ShieldCheck,
  ArrowUp, ArrowDown,
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import AnimatedCard from '../components/AnimatedCard'
import SectionTag from '../components/SectionTag'
import { analyticsData } from '../data/mockData'

const CHART_COLORS = ['#cebffa', '#ccfdcf', '#d7e9ff', '#f4e7c7', '#ffe1d6', '#ed7472', '#231f23']

const statCards = [
  {
    label: 'Total Generated This Month',
    value: analyticsData.totalGenerated.month,
    icon: FileImage,
    trend: 14.2,
    up: true,
  },
  {
    label: 'Active Users',
    value: analyticsData.activeUsers,
    icon: Users,
    trend: 8.5,
    up: true,
  },
  {
    label: 'Avg Alignment Score',
    value: analyticsData.avgAlignmentScore,
    icon: ShieldCheck,
    trend: 3.1,
    up: true,
  },
  {
    label: 'Flagged Rate',
    value: `${analyticsData.flaggedPercent}%`,
    icon: BarChart3,
    trend: 2.4,
    up: false,
  },
]

export default function Analytics() {
  const maxViolation = Math.max(...analyticsData.violationTypes.map(v => v.count))

  return (
    <div className="space-y-10 pb-16">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <SectionTag label="ANALYTICS" color="#f4e7c7" />
        <h1
          className="text-[32px] sm:text-[40px] tracking-[-0.5px] text-[#231f23]"
          style={{ fontWeight: 500 }}
        >
          Analytics
        </h1>
        <p
          className="text-[16px] text-[rgba(35,31,35,0.6)] max-w-lg"
          style={{ fontWeight: 300 }}
        >
          Know what's working and why
        </p>
      </motion.div>

      {/* ── Usage Overview Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <AnimatedCard key={card.label} index={i} elevated>
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                style={{ backgroundColor: '#f4e7c7' }}
              >
                <card.icon size={20} className="text-[#231f23]" />
              </div>
              <div
                className={`flex items-center gap-1 text-[12px] ${
                  card.up ? 'text-[#22863a]' : 'text-[#ed7472]'
                }`}
                style={{ fontWeight: 400 }}
              >
                {card.up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span className="font-fragment">{card.trend}%</span>
              </div>
            </div>
            <p
              className="text-[28px] sm:text-[32px] text-[#231f23] tracking-[-0.5px]"
              style={{ fontWeight: 500 }}
            >
              {card.value}
            </p>
            <p
              className="font-fragment uppercase text-[11px] tracking-[0.75px] mt-1"
              style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
            >
              {card.label}
            </p>
          </AnimatedCard>
        ))}
      </div>

      {/* ── Generation Trend Chart ── */}
      <AnimatedCard index={4} elevated>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-[20px] text-[#231f23]"
              style={{ fontWeight: 500 }}
            >
              Generation Trend
            </h2>
            <p
              className="font-fragment uppercase text-[11px] tracking-[0.75px] mt-1"
              style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
            >
              CONTENT GENERATED PER WEEK
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#cebffa' }} />
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                Count
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ccfdcf' }} />
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                Score
              </span>
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData.weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(35,31,35,0.06)" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: 'rgba(35,31,35,0.48)' }}
              axisLine={{ stroke: 'rgba(35,31,35,0.08)' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="count"
              tick={{ fontSize: 11, fill: 'rgba(35,31,35,0.48)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="score"
              orientation="right"
              domain={[70, 100]}
              tick={{ fontSize: 11, fill: 'rgba(35,31,35,0.48)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid rgba(35,31,35,0.08)',
                borderRadius: 12,
                fontSize: 13,
              }}
            />
            <Line
              yAxisId="count"
              type="monotone"
              dataKey="count"
              stroke="#cebffa"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#cebffa', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="score"
              type="monotone"
              dataKey="score"
              stroke="#ccfdcf"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#ccfdcf', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </AnimatedCard>

      {/* ── Content Format Breakdown + Team Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Content Format Breakdown */}
        <AnimatedCard index={5} elevated>
          <h2
            className="text-[20px] text-[#231f23] mb-1"
            style={{ fontWeight: 500 }}
          >
            Content Format Breakdown
          </h2>
          <p
            className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-6"
            style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
          >
            GENERATIONS BY FORMAT
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={analyticsData.formatBreakdown}
              layout="vertical"
              margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="rgba(35,31,35,0.06)" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: 'rgba(35,31,35,0.48)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="format"
                type="category"
                width={120}
                tick={{ fontSize: 12, fill: 'rgba(35,31,35,0.64)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(35,31,35,0.08)',
                  borderRadius: 12,
                  fontSize: 13,
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                {analyticsData.formatBreakdown.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>

        {/* Team Activity */}
        <AnimatedCard index={6} elevated>
          <h2
            className="text-[20px] text-[#231f23] mb-1"
            style={{ fontWeight: 500 }}
          >
            Team Activity
          </h2>
          <p
            className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-6"
            style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
          >
            GENERATIONS BY TEAM
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={analyticsData.teamActivity}
              layout="vertical"
              margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="rgba(35,31,35,0.06)" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: 'rgba(35,31,35,0.48)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="team"
                type="category"
                width={90}
                tick={{ fontSize: 12, fill: 'rgba(35,31,35,0.64)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(35,31,35,0.08)',
                  borderRadius: 12,
                  fontSize: 13,
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                {analyticsData.teamActivity.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </div>

      {/* ── Top Users ── */}
      <AnimatedCard index={7} elevated>
        <h2
          className="text-[20px] text-[#231f23] mb-1"
          style={{ fontWeight: 500 }}
        >
          Top Users
        </h2>
        <p
          className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-5"
          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
        >
          MOST ACTIVE CREATORS THIS MONTH
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[rgba(35,31,35,0.08)]">
                {['Rank', 'Name', 'Team', 'Generations'].map(h => (
                  <th
                    key={h}
                    className="font-fragment uppercase text-[11px] tracking-[0.75px] pb-3 pr-4"
                    style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {analyticsData.topUsers.map((user, i) => (
                <tr
                  key={user.name}
                  className="border-b border-[rgba(35,31,35,0.04)] last:border-0"
                >
                  <td
                    className="py-3 pr-4 text-[14px] text-[rgba(35,31,35,0.48)]"
                    style={{ fontWeight: 400 }}
                  >
                    {i + 1}
                  </td>
                  <td
                    className="py-3 pr-4 text-[14px] text-[#231f23]"
                    style={{ fontWeight: 400 }}
                  >
                    {user.name}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[12px] font-fragment uppercase tracking-[0.75px]"
                      style={{
                        backgroundColor: '#f4e7c7',
                        color: '#231f23',
                        fontWeight: 400,
                      }}
                    >
                      {user.team}
                    </span>
                  </td>
                  <td
                    className="py-3 pr-4 text-[14px] text-[#231f23]"
                    style={{ fontWeight: 500 }}
                  >
                    {user.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* ── Brand Compliance Overview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Score + Pass/Flag */}
        <AnimatedCard index={8} elevated className="lg:col-span-1">
          <h2
            className="text-[20px] text-[#231f23] mb-1"
            style={{ fontWeight: 500 }}
          >
            Brand Compliance
          </h2>
          <p
            className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-6"
            style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
          >
            ALIGNMENT OVERVIEW
          </p>

          <div className="flex items-end gap-2 mb-6">
            <span
              className="text-[56px] leading-none text-[#231f23] tracking-[-1px]"
              style={{ fontWeight: 500 }}
            >
              {analyticsData.avgAlignmentScore}
            </span>
            <span
              className="text-[16px] text-[rgba(35,31,35,0.48)] mb-1"
              style={{ fontWeight: 300 }}
            >
              / 100
            </span>
          </div>

          {/* Pass / Flag bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                Pass rate
              </span>
              <span
                className="text-[14px] text-[#231f23]"
                style={{ fontWeight: 500 }}
              >
                {analyticsData.passedPercent}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[rgba(35,31,35,0.06)] overflow-hidden flex">
              <motion.div
                className="h-full rounded-l-full"
                style={{ backgroundColor: '#ccfdcf' }}
                initial={{ width: 0 }}
                animate={{ width: `${analyticsData.passedPercent}%` }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              />
              <motion.div
                className="h-full rounded-r-full"
                style={{ backgroundColor: '#ed7472' }}
                initial={{ width: 0 }}
                animate={{ width: `${analyticsData.flaggedPercent}%` }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ccfdcf' }} />
                <span
                  className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  Passed
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ed7472' }} />
                <span
                  className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  Flagged
                </span>
              </span>
            </div>
          </div>
        </AnimatedCard>

        {/* Compliance Trend */}
        <AnimatedCard index={9} elevated className="lg:col-span-2">
          <h2
            className="text-[20px] text-[#231f23] mb-1"
            style={{ fontWeight: 500 }}
          >
            Compliance Trend
          </h2>
          <p
            className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-6"
            style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
          >
            AVERAGE ALIGNMENT SCORE OVER TIME
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={analyticsData.weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(35,31,35,0.06)" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: 'rgba(35,31,35,0.48)' }}
                axisLine={{ stroke: 'rgba(35,31,35,0.08)' }}
                tickLine={false}
              />
              <YAxis
                domain={[70, 100]}
                tick={{ fontSize: 11, fill: 'rgba(35,31,35,0.48)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(35,31,35,0.08)',
                  borderRadius: 12,
                  fontSize: 13,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#cebffa"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#cebffa', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </div>

      {/* ── Top Violation Types ── */}
      <AnimatedCard index={10} elevated>
        <h2
          className="text-[20px] text-[#231f23] mb-1"
          style={{ fontWeight: 500 }}
        >
          Top Violation Types
        </h2>
        <p
          className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-5"
          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
        >
          MOST COMMON BRAND RULE VIOLATIONS
        </p>
        <div className="space-y-3">
          {analyticsData.violationTypes.map((v, i) => (
            <div key={v.type} className="flex items-center gap-4">
              <span
                className="w-5 text-right text-[13px] text-[rgba(35,31,35,0.36)] shrink-0"
                style={{ fontWeight: 400 }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-[14px] text-[#231f23]"
                    style={{ fontWeight: 400 }}
                  >
                    {v.type}
                  </span>
                  <span
                    className="font-fragment text-[12px] tracking-[0.75px] text-[rgba(35,31,35,0.48)]"
                    style={{ fontWeight: 400 }}
                  >
                    {v.count}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[rgba(35,31,35,0.06)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(v.count / maxViolation) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.15 * i, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  )
}
