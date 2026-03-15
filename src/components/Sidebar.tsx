import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Fingerprint,
  Paintbrush,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Users,
  Settings,
} from 'lucide-react'
import { motion } from 'motion/react'

const navGroups = [
  {
    label: 'Core',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard', color: '#231f23' },
      { to: '/brand-intelligence', icon: Fingerprint, label: 'Brand Intelligence', color: '#cebffa' },
    ],
  },
  {
    label: 'Create',
    items: [
      { to: '/content-studio', icon: Paintbrush, label: 'Content Studio', color: '#ccfdcf' },
      { to: '/generation-studio', icon: Sparkles, label: 'Generation Studio', color: '#ffe1d6' },
    ],
  },
  {
    label: 'Monitor',
    items: [
      { to: '/analytics', icon: BarChart3, label: 'Analytics', color: '#f4e7c7' },
      { to: '/brand-guard', icon: ShieldCheck, label: 'Brand Guard', color: '#d7e9ff' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { to: '/team', icon: Users, label: 'Team', color: '#231f23' },
      { to: '/settings', icon: Settings, label: 'Settings', color: '#231f23' },
    ],
  },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[240px] bg-white flex flex-col
          border-r border-[rgba(35,31,35,0.08)] transition-transform duration-200
          lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="px-5 py-6 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-[10px] bg-[#231f23] flex items-center justify-center"
          >
            <span className="text-[#f7f6f5] text-xs" style={{ fontWeight: 600 }}>SP</span>
          </div>
          <span className="text-[15px] tracking-[-0.3px]" style={{ fontWeight: 500 }}>
            SocialPaint
          </span>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <div
                className="font-fragment uppercase text-[11px] tracking-[0.75px] px-2 mb-2"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                {group.label}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive = item.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.to)

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className="relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                      style={{ fontWeight: 400, color: '#231f23' }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-[#ececec] rounded-lg"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <span className="relative flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-[10px] flex items-center justify-center"
                          style={{ backgroundColor: item.color + '30' }}
                        >
                          <item.icon size={16} style={{ color: item.color === '#231f23' ? '#231f23' : item.color.replace('fd', 'a0').replace('fa', '80').replace('ff', 'bb').replace('c7', '90').replace('d6', 'a0') }} />
                        </span>
                        <span className="relative">{item.label}</span>
                      </span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User area */}
        <div className="px-4 py-4 border-t border-[rgba(35,31,35,0.08)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#cebffa] flex items-center justify-center">
              <span className="text-xs" style={{ fontWeight: 500 }}>ER</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm" style={{ fontWeight: 400 }}>Elena Rodriguez</span>
              <span className="font-fragment text-[11px]" style={{ color: 'rgba(35,31,35,0.48)' }}>
                Admin
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
