'use client'

import { Bell } from 'lucide-react'
import '../styles/header.css'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

function formatDate() {
  const d = new Date()
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export default function Header({ title }) {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h1 className="admin-header-title">{title}</h1>
        <p className="admin-header-date">{formatDate()}</p>
      </div>

      <div className="admin-header-right">
        <button className="admin-header-bell" aria-label="Notifications">
          <Bell size={16} />
          <span className="admin-header-bell-dot" />
        </button>

        <div className="admin-user-chip">
          <div className="admin-user-avatar">A</div>
          <span className="admin-user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}
