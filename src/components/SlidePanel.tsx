import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Users, Settings, Clock, Search, Bell, Globe } from 'lucide-react'
import { teamMembers } from '../data/mockData'

interface SlidePanelProps {
  open: boolean
  onClose: () => void
  view: 'team' | 'settings'
  onViewChange: (v: 'team' | 'settings') => void
}

function TeamView() {
  const [search, setSearch] = useState('')
  const filtered = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.team.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(15,15,15,0.3)' }} />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2.5 text-[13px] outline-none focus:border-border-hover"
          style={{ fontWeight: 400 }}
        />
      </div>
      <div className="space-y-1">
        {filtered.map((m) => (
          <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors duration-120">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-accent text-[11px]" style={{ fontWeight: 600 }}>
                {m.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] truncate" style={{ fontWeight: 500 }}>{m.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px]" style={{ color: 'rgba(15,15,15,0.4)', fontWeight: 500 }}>{m.role}</span>
                <span className="text-[11px]" style={{ color: 'rgba(15,15,15,0.25)' }}>·</span>
                <span className="text-[11px]" style={{ color: 'rgba(15,15,15,0.4)' }}>{m.team}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={11} style={{ color: 'rgba(15,15,15,0.25)' }} />
              <span className="font-mono text-[11px]" style={{ color: 'rgba(15,15,15,0.3)' }}>{m.lastActive.slice(5)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsView() {
  const [threshold, setThreshold] = useState(70)
  const [notifications, setNotifications] = useState({
    generation: true,
    flag: true,
    weekly: false,
    monthly: true,
  })
  const [showKey, setShowKey] = useState(false)

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="w-9 h-5 rounded-full transition-colors duration-150 flex items-center border-0 cursor-pointer"
      style={{ background: checked ? '#2d5bf6' : 'rgba(15,15,15,0.1)', padding: '2px' }}
    >
      <div
        className="w-4 h-4 rounded-full bg-white transition-transform duration-150"
        style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
      />
    </button>
  )

  return (
    <div className="space-y-8">
      {/* General */}
      <div>
        <div className="caption mb-3">General</div>
        <div className="space-y-3">
          <div>
            <label className="text-[12px] mb-1 block" style={{ color: 'rgba(15,15,15,0.5)', fontWeight: 500 }}>Company</label>
            <input defaultValue="Meridian Labs" className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-[13px] outline-none focus:border-border-hover" style={{ fontWeight: 400 }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: 'rgba(15,15,15,0.5)', fontWeight: 500 }}>Timezone</label>
              <select className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-[13px] outline-none" style={{ fontWeight: 400 }}>
                <option>America/New_York</option>
                <option>America/Chicago</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: 'rgba(15,15,15,0.5)', fontWeight: 500 }}>Language</label>
              <select className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-[13px] outline-none" style={{ fontWeight: 400 }}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <div className="caption mb-3">Notifications</div>
        <div className="space-y-3">
          {[
            { key: 'generation' as const, label: 'Email on generation' },
            { key: 'flag' as const, label: 'Email on flag' },
            { key: 'weekly' as const, label: 'Weekly digest' },
            { key: 'monthly' as const, label: 'Monthly report' },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between">
              <span className="text-[13px]" style={{ fontWeight: 400 }}>{n.label}</span>
              <Toggle checked={notifications[n.key]} onChange={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key] }))} />
            </div>
          ))}
        </div>
      </div>

      {/* Guard Threshold */}
      <div>
        <div className="caption mb-3">Brand Guard Threshold</div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={100}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono text-[13px] w-10 text-right" style={{ fontWeight: 500 }}>{threshold}</span>
        </div>
        <p className="text-[12px] mt-1" style={{ color: 'rgba(15,15,15,0.4)' }}>Content scoring below this threshold is flagged for review.</p>
      </div>

      {/* Integrations */}
      <div>
        <div className="caption mb-3">Integrations</div>
        <div className="space-y-2">
          {[
            { icon: Globe, label: 'Figma Plugin', status: 'Not connected' },
            { icon: Bell, label: 'Slack', status: 'Connected' },
          ].map((int) => (
            <div key={int.label} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex items-center gap-2.5">
                <int.icon size={15} style={{ color: 'rgba(15,15,15,0.4)' }} />
                <span className="text-[13px]" style={{ fontWeight: 500 }}>{int.label}</span>
              </div>
              <span className="text-[11px]" style={{ color: int.status === 'Connected' ? '#1a8754' : 'rgba(15,15,15,0.35)', fontWeight: 500 }}>{int.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* API */}
      <div>
        <div className="caption mb-3">API Access</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 font-mono text-[12px]" style={{ color: 'rgba(15,15,15,0.5)' }}>
            {showKey ? 'sp_live_a8f3k29d4m1n7x2b' : '••••••••••••••••••'}
          </div>
          <button onClick={() => setShowKey(!showKey)} className="px-3 py-2 text-[12px] bg-surface border border-border rounded-lg cursor-pointer hover:bg-border transition-colors" style={{ fontWeight: 500 }}>
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SlidePanel({ open, onClose, view, onViewChange }: SlidePanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/20 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-50 h-screen w-[400px] max-w-[90vw] bg-paper border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
                <button
                  onClick={() => onViewChange('team')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] border-0 cursor-pointer transition-colors"
                  style={{
                    background: view === 'team' ? '#fff' : 'transparent',
                    fontWeight: view === 'team' ? 500 : 400,
                    boxShadow: view === 'team' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  <Users size={14} />
                  Team
                </button>
                <button
                  onClick={() => onViewChange('settings')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] border-0 cursor-pointer transition-colors"
                  style={{
                    background: view === 'settings' ? '#fff' : 'transparent',
                    fontWeight: view === 'settings' ? 500 : 400,
                    boxShadow: view === 'settings' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  <Settings size={14} />
                  Settings
                </button>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface cursor-pointer border-0 bg-transparent transition-colors">
                <X size={16} style={{ color: 'rgba(15,15,15,0.5)' }} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {view === 'team' ? <TeamView /> : <SettingsView />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
