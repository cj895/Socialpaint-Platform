import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavRail from './NavRail'
import SlidePanel from './SlidePanel'

export default function Layout() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelView, setPanelView] = useState<'team' | 'settings'>('team')

  const openPanel = () => setPanelOpen(true)

  return (
    <div className="min-h-screen" style={{ background: '#f7f6f5' }}>
      <NavRail
        onUserClick={openPanel}
        onTeamClick={() => { setPanelView('team'); setPanelOpen(true) }}
        onSettingsClick={() => { setPanelView('settings'); setPanelOpen(true) }}
      />

      <main className="lg:ml-60 pb-16 lg:pb-0 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 md:py-10">
          <Outlet />
        </div>
      </main>

      <SlidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        view={panelView}
        onViewChange={setPanelView}
      />
    </div>
  )
}
