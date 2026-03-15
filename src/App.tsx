import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import BrandIntelligence from './pages/BrandIntelligence'
import ContentStudio from './pages/ContentStudio'
import Analytics from './pages/Analytics'
import BrandGuard from './pages/BrandGuard'
import GenerationStudio from './pages/GenerationStudio'
import Team from './pages/Team'
import Settings from './pages/Settings'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/brand-intelligence', element: <BrandIntelligence /> },
      { path: '/content-studio', element: <ContentStudio /> },
      { path: '/analytics', element: <Analytics /> },
      { path: '/brand-guard', element: <BrandGuard /> },
      { path: '/generation-studio', element: <GenerationStudio /> },
      { path: '/team', element: <Team /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
