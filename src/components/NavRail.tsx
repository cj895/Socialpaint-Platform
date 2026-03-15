import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutGrid,
  Fingerprint,
  PenTool,
  Activity,
  Shield,
} from 'lucide-react'

const workspaces = [
  { to: '/', icon: LayoutGrid, label: 'Command' },
  { to: '/brand-system', icon: Fingerprint, label: 'Brand System' },
  { to: '/create', icon: PenTool, label: 'Create' },
  { to: '/pulse', icon: Activity, label: 'Pulse' },
  { to: '/guard', icon: Shield, label: 'Guard' },
]

export default function NavRail({
  onUserClick,
}: {
  onUserClick: () => void
}) {
  const location = useLocation()

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      {/* Desktop rail */}
      <nav className="hidden lg:flex fixed top-0 left-0 z-50 h-screen w-16 bg-ink flex-col items-center py-5 justify-between">
        {/* Logo */}
        <div className="w-9 h-9 rounded-[10px] bg-white/10 flex items-center justify-center mb-8">
          <span
            className="text-white text-[13px]"
            style={{ fontWeight: 600 }}
          >
            SP
          </span>
        </div>

        {/* Workspace icons */}
        <div className="flex-1 flex flex-col items-center gap-1">
          {workspaces.map((ws) => {
            const active = isActive(ws.to)
            return (
              <NavLink
                key={ws.to}
                to={ws.to}
                className="relative group w-11 h-11 flex items-center justify-center rounded-lg transition-colors duration-120"
                style={{
                  background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
              >
                {active && (
                  <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-accent" />
                )}
                <ws.icon
                  size={18}
                  strokeWidth={1.5}
                  style={{
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.35)',
                    transition: 'color 120ms ease-out',
                  }}
                />
                {/* Tooltip */}
                <div className="absolute left-14 px-2.5 py-1.5 bg-ink text-white text-[12px] rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50" style={{ fontWeight: 500 }}>
                  {ws.label}
                </div>
              </NavLink>
            )
          })}
        </div>

        {/* User avatar */}
        <button
          onClick={onUserClick}
          className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center cursor-pointer border-0 transition-all duration-120 hover:bg-accent/30"
        >
          <span className="text-white text-[11px]" style={{ fontWeight: 600 }}>
            ER
          </span>
        </button>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-14 bg-ink flex items-center justify-around px-2">
        {workspaces.map((ws) => {
          const active = isActive(ws.to)
          return (
            <NavLink
              key={ws.to}
              to={ws.to}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
            >
              {active && (
                <div className="absolute top-0 w-8 h-[2px] rounded-b bg-accent" />
              )}
              <ws.icon
                size={18}
                strokeWidth={1.5}
                style={{
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.35)',
                }}
              />
              <span
                className="text-[9px]"
                style={{
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.35)',
                  fontWeight: 500,
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
