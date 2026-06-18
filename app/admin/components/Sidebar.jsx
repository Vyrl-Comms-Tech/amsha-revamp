'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Newspaper,
  Layers,
  LogOut,
  ChevronLeft,
  FilePlus,
  Brain,
  TableProperties,
} from 'lucide-react'
import '../styles/sidebar.css'

const NAV = [
  {
    section: 'Overview',
    items: [
      { href: '/admin',             label: 'Dashboard',    icon: LayoutDashboard },
    ],
  },
  {
    section: 'Tables',
    items: [
      { href: '/admin/all',         label: 'All Content',  icon: Layers },
      { href: '/admin/blogs',       label: 'Blog Posts',   icon: FileText },
      { href: '/admin/education',   label: 'Education',    icon: GraduationCap },
      { href: '/admin/news',        label: 'News',         icon: Newspaper },
    ],
  },
  {
    section: 'Add Content',
    items: [
      { href: '/admin/add-content', label: 'Add Content',  icon: FilePlus },
    ],
  },
  {
    section: 'Training table',
    items: [
      { href: '/admin/trainings', label: 'Trainings', icon: TableProperties },
    ],
  },
  {
    section: 'Add Trainings',
    items: [
      { href: '/admin/training',         label: 'Add Training',  icon: Brain },
    ],
  },
 
]

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    router.push('/admin/login')
  }

  return (
    <aside className={`admin-sidebar${collapsed ? ' admin-sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="admin-sidebar-top">
        <Image
          src="/logo.svg"
          alt="Amsha Advisory"
          width={32}
          height={32}
          className="admin-sidebar-logo-img"
        />
        <div className="admin-sidebar-brand-wrap">
          <p className="admin-sidebar-brand">Amsha Advisory</p>
          <p className="admin-sidebar-sub">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="admin-sidebar-nav">
        {NAV.map((group) => (
          <div key={group.section}>
            <p className="admin-nav-group-label">{group.section}</p>
            {group.items.map(({ href, label, icon: Icon }) => {
              const active =
                href === '/admin'
                  ? pathname === '/admin'
                  : pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`admin-nav-link${active ? ' admin-nav-link--active' : ''}`}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="admin-nav-icon" />
                  <span className="admin-nav-label">{label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer — Logout + Collapse */}
      <div className="admin-sidebar-footer">
        <button
          className="admin-logout-btn"
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="admin-logout-icon" />
          <span className="admin-sidebar-footer-label">Logout</span>
        </button>

        <button
          className="admin-collapse-btn"
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className="admin-collapse-icon-svg" />
          <span className="admin-sidebar-footer-label">Collapse</span>
        </button>
      </div>
    </aside>
  )
}
