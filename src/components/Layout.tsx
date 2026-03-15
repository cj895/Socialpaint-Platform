import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-[rgba(35,31,35,0.08)] px-4 py-3 flex items-center gap-3">
        <button onClick={() => setSidebarOpen(true)} className="p-1">
          <Menu size={20} />
        </button>
        <span className="text-sm" style={{ fontWeight: 500 }}>SocialPaint</span>
      </div>

      {/* Main content */}
      <main className="lg:ml-[240px] pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
