import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutGrid,
  Fingerprint,
  Sparkles,

  BarChart3,
  Shield,
  Users,
  Settings,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Core',
    items: [
      { to: '/', icon: LayoutGrid, label: 'Dashboard' },
      { to: '/brand-system', icon: Fingerprint, label: 'Brand Intelligence' },
    ],
  },
  {
    label: 'Create',
    items: [
      { to: '/create', icon: Sparkles, label: 'Content Studio' },
    ],
  },
  {
    label: 'Monitor',
    items: [
      { to: '/pulse', icon: BarChart3, label: 'Analytics' },
      { to: '/guard', icon: Shield, label: 'Brand Guard' },
    ],
  },
]

const manageItems = [
  { to: '#team', icon: Users, label: 'Team' },
  { to: '#settings', icon: Settings, label: 'Settings' },
]

export default function NavRail({
  onUserClick,
  onTeamClick,
  onSettingsClick,
}: {
  onUserClick: () => void
  onTeamClick?: () => void
  onSettingsClick?: () => void
}) {
  const location = useLocation()

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:flex fixed top-0 left-0 z-50 h-screen w-60 bg-white flex-col py-6 px-4 overflow-y-auto"
        style={{ borderRight: '1px solid rgba(35,31,35,0.08)' }}
      >
        {/* Logo */}
        <div className="px-2 mb-8">
          <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.5, color: '#231f23' }}>
            social
          </span>
          <span style={{ fontSize: 20, fontWeight: 300, letterSpacing: -0.5, color: 'rgba(35,31,35,0.48)' }}>
            paint
          </span>
        </div>

        {/* Nav groups */}
        <div className="flex-1">
          {navGroups.map((group, gi) => (
            <div key={group.label} className="mb-2">
              <div
                className="font-mono px-2 mb-1.5"
                style={{
                  fontSize: 11,
                  letterSpacing: 0.75,
                  textTransform: 'uppercase' as const,
                  color: 'rgba(35,31,35,0.48)',
                  marginTop: gi === 0 ? 0 : 20,
                }}
              >
                {group.label}
              </div>
              {group.items.map((item) => {
                const active = isActive(item.to)
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 transition-colors duration-150"
                    style={{
                      backgroundColor: active ? '#ececec' : 'transparent',
                      fontWeight: active ? 500 : 400,
                      fontSize: 14,
                      color: '#231f23',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: getAccentBg(item.label),
                      }}
                    >
                      <item.icon size={15} strokeWidth={1.5} />
                    </div>
                    {item.label}
                  </NavLink>
                )
              })}
            </div>
          ))}

          {/* Manage group */}
          <div className="mb-2">
            <div
              className="font-mono px-2 mb-1.5"
              style={{
                fontSize: 11,
                letterSpacing: 0.75,
                textTransform: 'uppercase' as const,
                color: 'rgba(35,31,35,0.48)',
                marginTop: 20,
              }}
            >
              Manage
            </div>
            {manageItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.label === 'Team') onTeamClick?.()
                  else if (item.label === 'Settings') onSettingsClick?.()
                }}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 transition-colors duration-150 w-full text-left cursor-pointer border-0"
                style={{
                  backgroundColor: 'transparent',
                  fontWeight: 400,
                  fontSize: 14,
                  color: '#231f23',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(35,31,35,0.06)' }}
                >
                  <item.icon size={15} strokeWidth={1.5} />
                </div>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom user */}
        <div style={{ borderTop: '1px solid rgba(35,31,35,0.08)', paddingTop: 16 }}>
          <button
            onClick={onUserClick}
            className="flex items-center gap-2.5 px-2 py-2 w-full text-left cursor-pointer border-0 bg-transparent"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: '#ececec',
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(35,31,35,0.64)',
              }}
            >
              AM
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 400, color: '#231f23' }}>Alex Morgan</div>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase' as const,
                  color: 'rgba(35,31,35,0.48)',
                }}
              >
                Design Lead
              </div>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-14 bg-white flex items-center justify-around px-2"
        style={{ borderTop: '1px solid rgba(35,31,35,0.08)' }}
      >
        {navGroups.flatMap(g => g.items).map((ws) => {
          const active = isActive(ws.to)
          return (
            <NavLink
              key={ws.to}
              to={ws.to}
              className="flex flex-col items-center gap-0.5 px-3 py-1 relative"
            >
              {active && (
                <div className="absolute top-0 w-8 h-[2px] rounded-b" style={{ backgroundColor: '#231f23' }} />
              )}
              <ws.icon
                size={18}
                strokeWidth={1.5}
                style={{
                  color: active ? '#231f23' : 'rgba(35,31,35,0.35)',
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  color: active ? '#231f23' : 'rgba(35,31,35,0.35)',
                }}
              >
                {ws.label}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

function getAccentBg(label: string): string {
  switch (label) {
    case 'Dashboard': return 'rgba(35,31,35,0.06)'
    case 'Brand Intelligence': return '#cebffa'
    case 'Content Studio': return '#ccfdcf'
    case 'Analytics': return '#f4e7c7'
    case 'Brand Guard': return '#d7e9ff'
    default: return 'rgba(35,31,35,0.06)'
  }
}
