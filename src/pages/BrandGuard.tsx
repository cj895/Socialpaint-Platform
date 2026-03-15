import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShieldCheck, AlertTriangle, Eye, CheckCircle, XCircle,
  ChevronRight, Filter, BarChart3, Clock, User,
} from 'lucide-react'
import AnimatedCard from '../components/AnimatedCard'
import SectionTag from '../components/SectionTag'
import { flaggedItems, analyticsData } from '../data/mockData'

type StatusType = 'pending' | 'investigating' | 'resolved-updated' | 'resolved-exception' | 'dismissed'
type FilterType = 'all' | 'pending' | 'investigating' | 'resolved' | 'dismissed'

const statusLabels: Record<StatusType, string> = {
  pending: 'Pending',
  investigating: 'Investigating',
  'resolved-updated': 'Resolved — Updated',
  'resolved-exception': 'Resolved — Exception',
  dismissed: 'Dismissed',
}

const statusColors: Record<StatusType, string> = {
  pending: '#ed7472',
  investigating: '#d4a373',
  'resolved-updated': '#4a7c59',
  'resolved-exception': '#4a7c59',
  dismissed: 'rgba(35,31,35,0.4)',
}

function scoreBadgeColor(score: number) {
  if (score < 60) return '#e94560'
  if (score < 70) return '#d4a373'
  return '#c9b458'
}

export default function BrandGuard() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [itemStatuses, setItemStatuses] = useState<Record<string, StatusType>>(
    () => Object.fromEntries(flaggedItems.map((item) => [item.id, item.status]))
  )

  const pendingCount = flaggedItems.filter((i) => itemStatuses[i.id] === 'pending').length
  const avgScore = Math.round(flaggedItems.reduce((sum, i) => sum + i.score, 0) / flaggedItems.length)
  const topViolation = analyticsData.violationTypes[0]

  const filteredItems = flaggedItems.filter((item) => {
    if (activeFilter === 'all') return true
    const s = itemStatuses[item.id]
    if (activeFilter === 'resolved') return s === 'resolved-updated' || s === 'resolved-exception'
    return s === activeFilter
  })

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'investigating', label: 'Investigating' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'dismissed', label: 'Dismissed' },
  ]

  function updateStatus(id: string, status: StatusType) {
    setItemStatuses((prev) => ({ ...prev, [id]: status }))
  }


  return (
    <div className="min-h-screen bg-[#f7f6f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* ---- Page Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="mb-4">
            <SectionTag label="BRAND GUARD" color="#d7e9ff" />
          </div>
          <h1
            className="text-[32px] sm:text-[40px] text-[#231f23] mb-2"
            style={{ fontWeight: 500 }}
          >
            Brand Guard
          </h1>
          <p
            className="text-[16px] sm:text-[18px] text-[rgba(35,31,35,0.6)]"
            style={{ fontWeight: 300 }}
          >
            Catch what's off before it goes out
          </p>
        </motion.div>

        {/* ---- Summary Stats ---- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: 'TOTAL FLAGGED',
              value: flaggedItems.length,
              icon: <ShieldCheck size={18} className="text-[#231f23]" />,
            },
            {
              label: 'PENDING REVIEW',
              value: pendingCount,
              icon: <Clock size={18} className="text-[#ed7472]" />,
            },
            {
              label: 'TOP VIOLATION',
              value: topViolation.type,
              icon: <AlertTriangle size={18} className="text-[#d4a373]" />,
            },
            {
              label: 'AVG FLAGGED SCORE',
              value: avgScore,
              icon: <BarChart3 size={18} className="text-[#231f23]" />,
            },
          ].map((stat, index) => (
            <AnimatedCard key={stat.label} index={index} elevated>
              <div className="flex items-center gap-2 mb-3">
                {stat.icon}
                <span
                  className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                  style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                >
                  {stat.label}
                </span>
              </div>
              <p
                className="text-[24px] sm:text-[28px] text-[#231f23]"
                style={{ fontWeight: 500 }}
              >
                {stat.value}
              </p>
            </AnimatedCard>
          ))}
        </div>

        {/* ---- Filter Bar ---- */}
        <AnimatedCard index={4} elevated className="mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter size={16} style={{ color: 'rgba(35,31,35,0.48)' }} />
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px] mr-2"
              style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
            >
              FILTER BY STATUS
            </span>
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-[13px] transition-colors ${
                  activeFilter === f.key
                    ? 'bg-[#231f23] text-[#f7f6f5]'
                    : 'bg-[rgba(35,31,35,0.08)] text-[#231f23]'
                }`}
                style={{ fontWeight: 400 }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </AnimatedCard>

        {/* ---- Flagged Content Feed ---- */}
        <div className="space-y-4 mb-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isExpanded = selectedItem === item.id
              const currentStatus = itemStatuses[item.id]

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AnimatedCard index={0} elevated>
                    {/* Main Row */}
                    <div
                      className="flex flex-col sm:flex-row gap-4 cursor-pointer"
                      onClick={() => setSelectedItem(isExpanded ? null : item.id)}
                    >
                      {/* Thumbnail Placeholder */}
                      <div
                        className="w-full sm:w-[80px] h-[60px] sm:h-[80px] rounded-[8px] flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: '#d7e9ff' }}
                      >
                        <Eye size={20} style={{ color: 'rgba(35,31,35,0.3)' }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p
                            className="text-[15px] text-[#231f23]"
                            style={{ fontWeight: 500 }}
                          >
                            {item.prompt}
                          </p>
                          {/* Score Badge */}
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] text-white"
                            style={{
                              backgroundColor: scoreBadgeColor(item.score),
                              fontWeight: 400,
                            }}
                          >
                            {item.score}
                          </span>
                          {/* Status Badge */}
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-fragment uppercase tracking-[0.75px]"
                            style={{
                              backgroundColor: `${statusColors[currentStatus]}18`,
                              color: statusColors[currentStatus],
                              fontWeight: 400,
                            }}
                          >
                            {statusLabels[currentStatus]}
                          </span>
                        </div>

                        {/* Violations */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {item.violations.map((v, vi) => (
                            <span
                              key={vi}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[rgba(233,69,96,0.08)] text-[11px] font-fragment tracking-[0.5px]"
                              style={{ color: '#e94560', fontWeight: 400 }}
                            >
                              <AlertTriangle size={10} />
                              {v.rule}
                            </span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3">
                          <span
                            className="font-fragment text-[11px] uppercase tracking-[0.75px] flex items-center gap-1"
                            style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                          >
                            <User size={10} />
                            {item.user} — {item.team}
                          </span>
                          <span
                            className="font-fragment text-[11px] uppercase tracking-[0.75px] flex items-center gap-1"
                            style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                          >
                            <Clock size={10} />
                            {item.date}
                          </span>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight size={20} style={{ color: 'rgba(35,31,35,0.4)' }} />
                        </motion.div>
                      </div>
                    </div>

                    {/* ---- Investigation View (Expanded) ---- */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[rgba(35,31,35,0.08)] mt-5 pt-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              {/* Left — What was generated */}
                              <div>
                                <h4
                                  className="text-[14px] text-[#231f23] mb-3"
                                  style={{ fontWeight: 500 }}
                                >
                                  What was generated
                                </h4>
                                <div
                                  className="w-full h-[200px] rounded-[12px] flex items-center justify-center"
                                  style={{ backgroundColor: '#d7e9ff' }}
                                >
                                  <div className="text-center">
                                    <Eye size={32} style={{ color: 'rgba(35,31,35,0.2)' }} className="mx-auto mb-2" />
                                    <span
                                      className="font-fragment text-[11px] uppercase tracking-[0.75px]"
                                      style={{ color: 'rgba(35,31,35,0.36)', fontWeight: 400 }}
                                    >
                                      GENERATED OUTPUT
                                    </span>
                                  </div>
                                </div>
                                <p
                                  className="mt-3 text-[13px] text-[rgba(35,31,35,0.6)]"
                                  style={{ fontWeight: 300 }}
                                >
                                  Prompt: "{item.prompt}"
                                </p>
                              </div>

                              {/* Right — What brand intelligence says */}
                              <div>
                                <h4
                                  className="text-[14px] text-[#231f23] mb-3"
                                  style={{ fontWeight: 500 }}
                                >
                                  What brand intelligence says
                                </h4>
                                <div className="space-y-3">
                                  {item.violations.map((v, vi) => (
                                    <div
                                      key={vi}
                                      className="bg-[rgba(233,69,96,0.05)] rounded-[10px] p-4 border border-[rgba(233,69,96,0.12)]"
                                    >
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <XCircle size={14} className="text-[#e94560]" />
                                        <span
                                          className="text-[13px] text-[#e94560]"
                                          style={{ fontWeight: 500 }}
                                        >
                                          {v.rule}
                                        </span>
                                      </div>
                                      <p
                                        className="text-[13px] text-[rgba(35,31,35,0.6)] pl-[22px]"
                                        style={{ fontWeight: 300 }}
                                      >
                                        {v.detail}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Status Management Buttons */}
                            <div className="flex flex-wrap gap-3">
                              <button
                                onClick={() => updateStatus(item.id, 'investigating')}
                                className={`px-5 py-3 rounded-lg text-[13px] transition-colors ${
                                  currentStatus === 'investigating'
                                    ? 'bg-[#231f23] text-[#f7f6f5]'
                                    : 'bg-[rgba(35,31,35,0.08)] text-[#231f23]'
                                }`}
                                style={{ fontWeight: 400 }}
                              >
                                <span className="flex items-center gap-2">
                                  <Eye size={14} />
                                  Mark Investigating
                                </span>
                              </button>
                              <button
                                onClick={() => updateStatus(item.id, 'resolved-updated')}
                                className={`px-5 py-3 rounded-lg text-[13px] transition-colors ${
                                  currentStatus === 'resolved-updated'
                                    ? 'bg-[#4a7c59] text-white'
                                    : 'bg-[rgba(35,31,35,0.08)] text-[#231f23]'
                                }`}
                                style={{ fontWeight: 400 }}
                              >
                                <span className="flex items-center gap-2">
                                  <CheckCircle size={14} />
                                  Resolved — Updated Brand Intelligence
                                </span>
                              </button>
                              <button
                                onClick={() => updateStatus(item.id, 'resolved-exception')}
                                className={`px-5 py-3 rounded-lg text-[13px] transition-colors ${
                                  currentStatus === 'resolved-exception'
                                    ? 'bg-[#4a7c59] text-white'
                                    : 'bg-[rgba(35,31,35,0.08)] text-[#231f23]'
                                }`}
                                style={{ fontWeight: 400 }}
                              >
                                <span className="flex items-center gap-2">
                                  <CheckCircle size={14} />
                                  Resolved — One-off Exception
                                </span>
                              </button>
                              <button
                                onClick={() => updateStatus(item.id, 'dismissed')}
                                className={`px-5 py-3 rounded-lg text-[13px] transition-colors ${
                                  currentStatus === 'dismissed'
                                    ? 'bg-[rgba(35,31,35,0.4)] text-white'
                                    : 'bg-[rgba(35,31,35,0.08)] text-[#231f23]'
                                }`}
                                style={{ fontWeight: 400 }}
                              >
                                <span className="flex items-center gap-2">
                                  <XCircle size={14} />
                                  Dismiss
                                </span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </AnimatedCard>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <AnimatedCard index={0} elevated>
              <div className="text-center py-8">
                <ShieldCheck size={32} style={{ color: 'rgba(35,31,35,0.2)' }} className="mx-auto mb-3" />
                <p
                  className="text-[15px] text-[rgba(35,31,35,0.48)]"
                  style={{ fontWeight: 400 }}
                >
                  No flagged items match this filter.
                </p>
              </div>
            </AnimatedCard>
          )}
        </div>

        {/* ---- Insights from Flags ---- */}
        <AnimatedCard index={6} elevated>
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={18} className="text-[#231f23]" />
            <h3
              className="text-[18px] text-[#231f23]"
              style={{ fontWeight: 500 }}
            >
              Insights from Flags
            </h3>
          </div>

          <div className="mb-5">
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
            >
              MOST COMMON VIOLATION TYPES
            </span>

            <div className="space-y-3">
              {analyticsData.violationTypes.map((v, i) => {
                const maxCount = analyticsData.violationTypes[0].count
                const pct = Math.round((v.count / maxCount) * 100)
                return (
                  <div key={v.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[13px] text-[#231f23]"
                        style={{ fontWeight: 400 }}
                      >
                        {v.type}
                      </span>
                      <span
                        className="font-fragment text-[12px] tracking-[0.75px]"
                        style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                      >
                        {v.count}
                      </span>
                    </div>
                    <div className="w-full h-[6px] rounded-full bg-[rgba(35,31,35,0.06)]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: i === 0 ? '#e94560' : i === 1 ? '#ed7472' : '#d7e9ff' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="border-t border-[rgba(35,31,35,0.08)] pt-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-[#d4a373] mt-0.5 flex-shrink-0" />
              <p
                className="text-[13px] text-[rgba(35,31,35,0.6)]"
                style={{ fontWeight: 300 }}
              >
                <strong style={{ fontWeight: 500, color: '#231f23' }}>Color mismatch</strong> and{' '}
                <strong style={{ fontWeight: 500, color: '#231f23' }}>Voice deviation</strong> account
                for 62% of all flags. Consider adding more explicit examples to your brand color palette
                and voice guidelines to reduce these recurring violations.
              </p>
            </div>
          </div>
        </AnimatedCard>

      </div>
    </div>
  )
}
