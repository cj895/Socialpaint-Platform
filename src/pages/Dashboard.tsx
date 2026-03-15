import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  Fingerprint, Paintbrush, ShieldCheck, BarChart3, Sparkles,
  ArrowRight, TrendingUp, Users, FileImage, AlertTriangle,
} from 'lucide-react'
import AnimatedCard from '../components/AnimatedCard'
import SectionTag from '../components/SectionTag'
import { analyticsData, flaggedItems, generationHistory, brandScore } from '../data/mockData'

const statCards = [
  {
    label: 'Total Generated',
    sublabel: 'This month',
    value: analyticsData.totalGenerated.month,
    change: '+18%',
    positive: true,
    icon: FileImage,
    color: '#cebffa',
  },
  {
    label: 'Active Users',
    sublabel: 'Current',
    value: analyticsData.activeUsers,
    change: '+5',
    positive: true,
    icon: Users,
    color: '#ccfdcf',
  },
  {
    label: 'Brand Score',
    sublabel: 'Overall',
    value: `${brandScore.overall}%`,
    change: '+3%',
    positive: true,
    icon: TrendingUp,
    color: '#f4e7c7',
  },
  {
    label: 'Flagged Items',
    sublabel: 'Pending review',
    value: flaggedItems.filter((f) => f.status === 'pending').length,
    change: `${analyticsData.flaggedPercent}%`,
    positive: false,
    icon: AlertTriangle,
    color: '#ffe1d6',
  },
]

const modules = [
  {
    name: 'Brand Intelligence',
    description: 'Define your brand DNA -- voice, colors, typography, and imagery style.',
    icon: Fingerprint,
    color: '#cebffa',
    path: '/brand-intelligence',
  },
  {
    name: 'Content Studio',
    description: 'Create on-brand social content with AI-powered generation tools.',
    icon: Paintbrush,
    color: '#ccfdcf',
    path: '/content-studio',
  },
  {
    name: 'Analytics',
    description: 'Track generation volume, alignment scores, and team activity.',
    icon: BarChart3,
    color: '#f4e7c7',
    path: '/analytics',
  },
  {
    name: 'Brand Guard',
    description: 'Review flagged content and enforce brand consistency standards.',
    icon: ShieldCheck,
    color: '#d7e9ff',
    path: '/brand-guard',
  },
  {
    name: 'Generation Studio',
    description: 'Generate visuals from prompts with real-time brand alignment feedback.',
    icon: Sparkles,
    color: '#ffe1d6',
    path: '/generation-studio',
  },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function scoreColor(score: number) {
  if (score >= 90) return '#4a7c59'
  if (score >= 75) return '#231f23'
  return '#ed7472'
}

export default function Dashboard() {
  const recentActivity = generationHistory.slice(0, 5)
  const completedItems = brandScore.items.filter((i) => i.done).length
  const totalItems = brandScore.items.length

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f5' }}>
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-10 sm:py-14">

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <SectionTag label="Dashboard" color="#231f23" />
          <h1
            className="text-[32px] sm:text-[40px] text-[#231f23] mt-4 leading-[1.1] tracking-[-1px]"
            style={{ fontWeight: 500 }}
          >
            Welcome back, Elena
          </h1>
          <p
            className="text-[15px] leading-[24px] mt-2 max-w-[520px]"
            style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
          >
            Here's a snapshot of your brand activity. Your team generated 142 assets this week with an average alignment score of {analyticsData.avgAlignmentScore}%.
          </p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat, index) => (
            <AnimatedCard key={stat.label} index={index} elevated>
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon size={18} color="#231f23" />
                </div>
                <span
                  className="font-fragment uppercase text-[11px] tracking-[0.75px] px-2 py-1 rounded-full"
                  style={{
                    fontWeight: 400,
                    color: stat.positive ? '#4a7c59' : '#ed7472',
                    backgroundColor: stat.positive ? 'rgba(74,124,89,0.08)' : 'rgba(237,116,114,0.08)',
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <p
                className="text-[28px] text-[#231f23] leading-[1.1] tracking-[-1px]"
                style={{ fontWeight: 500 }}
              >
                {stat.value}
              </p>
              <p
                className="font-fragment uppercase text-[11px] tracking-[0.75px] mt-1.5"
                style={{ fontWeight: 400, color: 'rgba(35,31,35,0.48)' }}
              >
                {stat.label}
              </p>
              <p
                className="text-[12px] mt-0.5"
                style={{ fontWeight: 300, color: 'rgba(35,31,35,0.48)' }}
              >
                {stat.sublabel}
              </p>
            </AnimatedCard>
          ))}
        </div>

        {/* Quick Access Modules */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <SectionTag label="Quick Access" color="#231f23" />
          <h2
            className="text-[24px] sm:text-[28px] text-[#231f23] mt-4 mb-5 leading-[1.1] tracking-[-1px]"
            style={{ fontWeight: 500 }}
          >
            Modules
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {modules.map((mod, index) => (
            <AnimatedCard key={mod.name} index={index + 4} elevated>
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4"
                style={{ backgroundColor: mod.color }}
              >
                <mod.icon size={18} color="#231f23" />
              </div>
              <h3
                className="text-[17px] text-[#231f23] leading-[1.2]"
                style={{ fontWeight: 500 }}
              >
                {mod.name}
              </h3>
              <p
                className="text-[14px] leading-[22px] mt-1.5 mb-5"
                style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
              >
                {mod.description}
              </p>
              <Link
                to={mod.path}
                className="inline-flex items-center gap-1.5 font-fragment uppercase text-[11px] tracking-[0.75px] text-[#231f23] group"
                style={{ fontWeight: 400 }}
              >
                Go to {mod.name}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedCard>
          ))}
        </div>

        {/* Bottom Row: Recent Activity + Brand Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <AnimatedCard index={9}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <SectionTag label="Recent Activity" color="#cebffa" />
                  <h2
                    className="text-[22px] text-[#231f23] mt-3 leading-[1.1] tracking-[-1px]"
                    style={{ fontWeight: 500 }}
                  >
                    Latest Generations
                  </h2>
                </div>
                <Link
                  to="/generation-studio"
                  className="inline-flex items-center gap-1.5 font-fragment uppercase text-[11px] tracking-[0.75px] group"
                  style={{ fontWeight: 400, color: 'rgba(35,31,35,0.48)' }}
                >
                  View all
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="space-y-0">
                {recentActivity.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.08,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex items-center justify-between py-3.5"
                    style={{
                      borderBottom: index < recentActivity.length - 1 ? '1px solid rgba(35,31,35,0.08)' : 'none',
                    }}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p
                        className="text-[14px] text-[#231f23] truncate leading-[22px]"
                        style={{ fontWeight: 400 }}
                      >
                        {item.prompt}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                          style={{ fontWeight: 400, color: 'rgba(35,31,35,0.48)' }}
                        >
                          {item.format}
                        </span>
                        <span
                          className="font-fragment text-[11px] tracking-[0.75px]"
                          style={{ fontWeight: 400, color: 'rgba(35,31,35,0.48)' }}
                        >
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="font-fragment text-[12px] tracking-[0.75px] px-2.5 py-1 rounded-full shrink-0"
                      style={{
                        fontWeight: 500,
                        color: scoreColor(item.score),
                        backgroundColor:
                          item.score >= 90
                            ? 'rgba(74,124,89,0.08)'
                            : item.score >= 75
                              ? 'rgba(35,31,35,0.06)'
                              : 'rgba(237,116,114,0.08)',
                      }}
                    >
                      {item.score}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>

          {/* Brand Score Widget */}
          <div className="lg:col-span-1">
            <AnimatedCard index={10}>
              <SectionTag label="Brand Score" color="#f4e7c7" />
              <div className="flex items-end gap-3 mt-4 mb-6">
                <span
                  className="text-[48px] text-[#231f23] leading-[1] tracking-[-2px]"
                  style={{ fontWeight: 500 }}
                >
                  {brandScore.overall}
                </span>
                <span
                  className="font-fragment uppercase text-[12px] tracking-[0.75px] mb-2"
                  style={{ fontWeight: 400, color: 'rgba(35,31,35,0.48)' }}
                >
                  / 100
                </span>
              </div>

              <div
                className="w-full h-2 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(35,31,35,0.06)' }}
              >
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: '#4a7c59' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${brandScore.overall}%` }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>

              <p
                className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-3"
                style={{ fontWeight: 400, color: 'rgba(35,31,35,0.48)' }}
              >
                Checklist ({completedItems}/{totalItems})
              </p>

              <div className="space-y-2.5">
                {brandScore.items.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.9 + index * 0.06,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex items-center gap-2.5"
                  >
                    <div
                      className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: item.done ? '#4a7c59' : 'rgba(35,31,35,0.06)',
                        border: item.done ? 'none' : '1px solid rgba(35,31,35,0.12)',
                      }}
                    >
                      {item.done && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-[13px] leading-[20px]"
                      style={{
                        fontWeight: 300,
                        color: item.done ? '#231f23' : 'rgba(35,31,35,0.48)',
                      }}
                    >
                      {item.label}
                      {item.count !== undefined && (
                        <span
                          className="font-fragment text-[10px] tracking-[0.75px] ml-1.5"
                          style={{ fontWeight: 400, color: 'rgba(35,31,35,0.36)' }}
                        >
                          ({item.count})
                        </span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>

        </div>

      </div>
    </div>
  )
}
