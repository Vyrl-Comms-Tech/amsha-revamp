'use client'

import { useEffect, useState } from 'react'
import { FileText, GraduationCap, Newspaper, LayoutDashboard } from 'lucide-react'
import ContentTable from '../components/ContentTable'
import { useAdmin } from '../context/AdminContext'
import '../styles/dashboard.css'

const STAT_CONFIG = [
  { label: 'Total Blog Posts', icon: FileText,        key: 'blog'      },
  { label: 'Total Education',  icon: GraduationCap,   key: 'education' },
  { label: 'Total News',       icon: Newspaper,       key: 'news'      },
  { label: 'All Content',      icon: LayoutDashboard, key: 'total'     },
]

export default function AdminDashboardPage() {
  const { api, accessToken } = useAdmin()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/admin/content/stats', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(({ data }) => setStats(data.data))
      .catch(() => {})
  }, [api, accessToken])

  return (
    <>
      <div className="admin-page-top">
        <div>
          <h2 className="admin-page-title">Dashboard</h2>
          <p className="admin-page-desc">Overview of all your content</p>
        </div>
      </div>

      <div className="admin-stats-row">
        {STAT_CONFIG.map(({ label, icon: Icon, key }) => {
          const value = stats?.[key]
          return (
            <div key={label} className="admin-stat-card">
              <div className="admin-stat-icon-box">
                <Icon size={18} />
              </div>
              <div className="admin-stat-body">
                <p className="admin-stat-label">{label}</p>
                <p className="admin-stat-value">{value ?? '—'}</p>
                {/* <p className="admin-stat-meta">{stats == null ? 'Loading…' : value === 0 ? 'No content yet' : ''}</p> */}
              </div>
            </div>
          )
        })}
      </div>

      <ContentTable />
    </>
  )
}
