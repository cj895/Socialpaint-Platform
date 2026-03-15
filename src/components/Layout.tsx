import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavRail from './NavRail'
import SlidePanel from './SlidePanel'

export default function Layout() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelView, setPanelView] = useState<'team' | 'settings'>('team')

  const openPanel = () => setPanelOpen(true)

  return (
    <div className="min-h-screen bg-paper">
      <NavRail onUserClick={openPanel} />

      <main className="lg:ml-16 pb-16 lg:pb-0 min-h-screen">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-6 md:py-10">
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
