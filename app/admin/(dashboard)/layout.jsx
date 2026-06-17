'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useAdmin } from '../context/AdminContext'
import '../styles/admin-vars.css'
import '../styles/layout.css'

function getTitle(pathname) {
  if (pathname === '/admin') return 'Dashboard'
  if (pathname.startsWith('/admin/add-content')) return 'Add Content'
  if (pathname.startsWith('/admin/all')) return 'All Content'
  if (pathname.startsWith('/admin/blog')) return 'Blog Posts'
  if (pathname.startsWith('/admin/education')) return 'Education'
  if (pathname.startsWith('/admin/news')) return 'News'
  return 'Dashboard'
}

export default function AdminDashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname                  = usePathname()
  const router                    = useRouter()
  const { accessToken, loading }  = useAdmin()

  useEffect(() => {
    if (!loading && !accessToken) {
      router.replace('/admin/login')
    }
  }, [accessToken, loading, router])

  if (loading || !accessToken) return null

  return (
    <div className="admin-root">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="admin-main">
        <Header title={getTitle(pathname)} />
        <main 
          data-lenis-prevent 
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="admin-content">{children}</main>
      </div>
    </div>
  )
}
