import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Command from './pages/Command'
import BrandSystem from './pages/BrandSystem'
import Create from './pages/Create'
import Pulse from './pages/Pulse'
import Guard from './pages/Guard'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Command /> },
      { path: '/brand-system', element: <BrandSystem /> },
      { path: '/create', element: <Create /> },
      { path: '/pulse', element: <Pulse /> },
      { path: '/guard', element: <Guard /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
