'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  Search, Plus, Pencil, Trash2,
  ChevronLeft, ChevronRight, Eye, X,
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import DeleteConfirmPopup from './DeleteConfirmPopup'
import '../styles/content-table.css'
import '../styles/training-table.css'

const PAGE_SIZE = 10

const STATUS_CLASS = {
  published: 'admin-badge admin-badge--published',
  draft: 'admin-badge admin-badge--draft',
}

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function ViewModal({ training, onClose }) {
  if (!training) return null
  return (
    <div className="tt-modal-overlay" onClick={onClose}>
      <div className="tt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tt-modal-header">
          <h3 className="tt-modal-title">{training.title}</h3>
          <button className="tt-modal-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {training.image?.url && (
          <img src={training.image.url} alt="" className="tt-modal-image" />
        )}

        <div className="tt-modal-body">
          <div className="tt-modal-meta-grid">
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Category</span>
              <span className="tt-modal-value">{training.category || '—'}</span>
            </div>
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Status</span>
              <span className={STATUS_CLASS[training.status] ?? 'admin-badge'}>
                {capitalize(training.status)}
              </span>
            </div>
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Delivery</span>
              <span className="tt-modal-value">
                {training.deliveryModes?.length ? training.deliveryModes.join(', ') : '—'}
              </span>
            </div>
            <div className="tt-modal-meta-item">
              <span className="tt-modal-label">Created</span>
              <span className="tt-modal-value">{formatDate(training.createdAt)}</span>
            </div>
          </div>

          <div className="tt-modal-desc-section">
            <span className="tt-modal-label">Description</span>
            {training.descMode === 'bullets' && training.bullets?.length ? (
              <ul className="tt-modal-bullets">
                {training.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            ) : training.description ? (
              <p className="tt-modal-text">{training.description}</p>
            ) : (
              <p className="tt-modal-text tt-modal-text--empty">No description provided.</p>
            )}
          </div>
        </div>

        <div className="tt-modal-footer">
          <Link
            href={`/admin/training?id=${training._id}`}
            className="admin-add-btn"
            style={{ textDecoration: 'none' }}
          >
            <Pencil size={13} />
            Edit Training
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function TrainingTable() {
  const { api, accessToken } = useAdmin()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [deliveryFilter, setDeliveryFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, page: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [viewTarget, setViewTarget] = useState(null)

  const fetchTrainings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (status !== 'All') params.set('status', status.toLowerCase())
      if (deliveryFilter !== 'All') params.set('deliveryModes', deliveryFilter)
      params.set('page', String(page))
      params.set('limit', String(PAGE_SIZE))

      const { data } = await api.get(`/admin/training/get?${params}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      setItems(data.data?.data ?? [])
      setPagination(data.data?.pagination ?? { total: 0, totalPages: 1, page: 1 })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load trainings.')
      setItems([])
      setPagination({ total: 0, totalPages: 1, page: 1 })
    } finally {
      setLoading(false)
    }
  }, [api, accessToken, status, deliveryFilter, page])

  useEffect(() => { fetchTrainings() }, [fetchTrainings])

  const handleStatusChange = (val) => { setStatus(val); setPage(1); setSearch('') }
  const handleDeliveryChange = (val) => { setDeliveryFilter(val); setPage(1); setSearch('') }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return items
    return items.filter((item) => (item.title ?? '').toLowerCase().includes(q))
  }, [items, search])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/admin/training/delete?id=${deleteTarget.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      setDeleteTarget(null)
      fetchTrainings()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete training.')
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
      <ViewModal training={viewTarget} onClose={() => setViewTarget(null)} />

      <div className="admin-table-card">
        {/* Toolbar */}
        <div className="admin-table-toolbar">
          <span className="admin-table-heading">Trainings</span>

          <div className="admin-search-wrap">
            <Search className="admin-search-icon" />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search trainings…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="admin-filter-select"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <select
            className="admin-filter-select"
            value={deliveryFilter}
            onChange={(e) => handleDeliveryChange(e.target.value)}
          >
            <option value="All">All Delivery Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <Link href="/admin/training" className="admin-add-btn">
            <Plus size={13} />
            Add Training
          </Link>
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
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Delivery</th>
                <th>Status</th>
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
                  <td colSpan={7} className="tt-table-empty">No trainings found.</td>
                </tr>
              ) : filtered.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.image?.url ? (
                      <img src={item.image.url || "/blog1.png"} alt="" className="admin-table-thumb" />
                    ) : (
                      <div className="admin-table-thumb admin-table-thumb--empty" />
                    )}
                  </td>
                  <td className="admin-table-cell-title" title={item.title}>{item.title}</td>
                  <td>
                    {item.category ? (
                      <span className="admin-badge admin-badge--education tt-category-badge">
                        {item.category}
                      </span>
                    ) : <span className="tt-empty-cell">—</span>}
                  </td>
                  <td className="tt-delivery-cell">
                    {item.deliveryModes?.length
                      ? item.deliveryModes.map((m) => (
                          <span key={m} className="admin-tag">{m}</span>
                        ))
                      : <span className="tt-empty-cell">—</span>}
                  </td>
                  <td>
                    <span className={STATUS_CLASS[item.status] ?? 'admin-badge'}>
                      {capitalize(item.status)}
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
                      <Link
                        href={`/admin/training?id=${item._id}`}
                        className="admin-action-btn"
                        title="Edit"
                      >
                        <Pencil size={13} />
                      </Link>
                      <button
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                        onClick={() => setDeleteTarget({ id: item._id, name: item.title })}
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
