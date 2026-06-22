'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, X, Mail, Phone, Building2, Tag } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import DeleteConfirmPopup from './DeleteConfirmPopup'
import '../styles/content-table.css'
import '../styles/training-table.css'
import '../styles/contact-table.css'

const PAGE_SIZE = 10

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function ViewModal({ contact, onClose }) {
  if (!contact) return null
  return (
    <div className="tt-modal-overlay" onClick={onClose}>
      <div className="tt-modal ct-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tt-modal-header">
          <h3 className="tt-modal-title">{contact.companyName}</h3>
          <button className="tt-modal-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="tt-modal-body">
          <div className="tt-modal-meta-grid">
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Field of Activity</span>
              <span className="tt-modal-value">{contact.fieldOfActivity || '—'}</span>
            </div>
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Source</span>
              <span className="tt-modal-value">
                  {contact.pageSource || '—'}
              </span>
            </div>
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Phone</span>
              <span className="tt-modal-value ct-contact-line">
                <Phone size={12} />
                {contact.phone || '—'}
              </span>
            </div>
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Email</span>
              <span className="tt-modal-value ct-contact-line">
                <Mail size={12} />
                <a href={`mailto:${contact.email}`} className="ct-email-link">{contact.email || '—'}</a>
              </span>
            </div>
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Submitted</span>
              <span className="tt-modal-value">{formatDate(contact.createdAt)}</span>
            </div>
          </div>

          <div className="tt-modal-desc-section">
            <span className="tt-modal-label">Message</span>
            {contact.message ? (
              <p className="tt-modal-text">{contact.message}</p>
            ) : (
              <p className="tt-modal-text tt-modal-text--empty">No message provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactTable() {
  const { api, accessToken } = useAdmin()

  const [search, setSearch]     = useState('')
  const [page, setPage]         = useState(1)
  const [items, setItems]       = useState([])
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, page: 1 })
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [viewTarget, setViewTarget]     = useState(null)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', String(PAGE_SIZE))

      const { data } = await api.get(`/contact/get?${params}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      setItems(data.data?.data ?? [])
      setPagination(data.data?.pagination ?? { total: 0, totalPages: 1, page: 1 })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load contacts.')
      setItems([])
      setPagination({ total: 0, totalPages: 1, page: 1 })
    } finally {
      setLoading(false)
    }
  }, [api, accessToken, page])

  useEffect(() => { fetchContacts() }, [fetchContacts])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return items
    return items.filter((item) =>
      (item.companyName ?? '').toLowerCase().includes(q) ||
      (item.email ?? '').toLowerCase().includes(q)
    )
  }, [items, search])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/contact/delete?id=${deleteTarget.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      setDeleteTarget(null)
      fetchContacts()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete contact.')
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  const { totalPages, total } = pagination

  return (
    <>
      <DeleteConfirmPopup
        isOpen={Boolean(deleteTarget)}
        itemName={deleteTarget?.name}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <ViewModal contact={viewTarget} onClose={() => setViewTarget(null)} />

      <div className="admin-table-card">
        {/* Toolbar */}
        <div className="admin-table-toolbar">
          <span className="admin-table-heading">Contact Us</span>

          <div className="admin-search-wrap">
            <Search className="admin-search-icon" />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search by company or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="tt-error-banner">
            {error}
            <button className="tt-error-close" onClick={() => setError(null)}>
              <X size={13} />
            </button>
          </div>
        )}

        {/* Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Field of Activity</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Source</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="tt-table-empty">Loading…</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="tt-table-empty">No contacts found.</td>
                </tr>
              ) : filtered.map((item) => (
                <tr key={item._id}>
                  <td className="admin-table-cell-title ct-company-cell" title={item.companyName}>
                    <Building2 size={13} className="ct-row-icon" />
                    {item.companyName}
                  </td>
                  <td className="ct-field-cell">{item.fieldOfActivity || '—'}</td>
                  <td className="ct-phone-cell">{item.phone || '—'}</td>
                  <td className="ct-email-cell">
                    <a href={`mailto:${item.email}`} className="ct-email-link" title={item.email}>
                      {item.email}
                    </a>
                  </td>
                  <td>
                    <span className={'admin-badge'}>
                      {item.pageSource ?? item.pageSource ?? '—'}
                    </span>
                  </td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <div className="admin-action-group">
                      <button
                        className="admin-action-btn"
                        title="View details"
                        onClick={() => setViewTarget(item)}
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                        onClick={() => setDeleteTarget({ id: item._id, name: item.companyName })}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="admin-table-footer">
          <span className="admin-table-count">
            Showing {filtered.length} of {total} entries
          </span>
          <div className="admin-pagination">
            <button
              className="admin-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`admin-page-btn${page === p ? ' admin-page-btn--active' : ''}`}
                onClick={() => setPage(p)}
                disabled={loading}
              >
                {p}
              </button>
            ))}
            <button
              className="admin-page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
