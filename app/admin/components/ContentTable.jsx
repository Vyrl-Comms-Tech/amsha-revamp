'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import DeleteConfirmPopup from './DeleteConfirmPopup'
import '../styles/content-table.css'

const PAGE_SIZE = 8

const CATEGORY_CLASS = {
  blog:      'admin-badge admin-badge--blog',
  education: 'admin-badge admin-badge--education',
  news:      'admin-badge admin-badge--news',
}

const STATUS_CLASS = {
  published: 'admin-badge admin-badge--published',
  draft:     'admin-badge admin-badge--draft',
  archived:  'admin-badge admin-badge--archived',
}

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

const parseTags = (tags) => {
  if (!Array.isArray(tags) || tags.length === 0) return []
  try {
    const first = tags[0]
    return typeof first === 'string' && first.startsWith('[') ? JSON.parse(first) : tags
  } catch {
    return tags
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ContentTable({ defaultCategory }) {
  const locked = defaultCategory && defaultCategory !== 'All'
  const { api, accessToken } = useAdmin()

  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState(defaultCategory ?? 'All')
  const [status, setStatus]       = useState('All')
  const [page, setPage]           = useState(1)
  const [items, setItems]         = useState([])
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, page: 1 })
  const [loading, setLoading]     = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null) 
  const [deleting, setDeleting]         = useState(false)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category !== 'All') params.set('category', category.toLowerCase())
      if (status !== 'All')   params.set('status', status.toLowerCase())
      params.set('page', String(page))
      params.set('limit', String(PAGE_SIZE))
      params.set('completeContent', 'false')

      const { data } = await api.get(`/admin/content/get?${params}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      setItems(data.data?.data ?? [])
      setPagination(data.data?.pagination ?? { total: 0, totalPages: 1, page: 1 })
    } catch {
      setItems([])
      setPagination({ total: 0, totalPages: 1, page: 1 })
    } finally {
      setLoading(false)
    }
  }, [api, accessToken, category, status, page])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  // Reset to page 1 when filters change
  const handleCategoryChange = (val) => { setCategory(val); setPage(1); setSearch('') }
  const handleStatusChange   = (val) => { setStatus(val);   setPage(1); setSearch('') }

  // Client-side search within the current page
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return items
    return items.filter((item) => (item.mainTitle ?? '').toLowerCase().includes(q))
  }, [items, search])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/admin/content/delete?id=${deleteTarget.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      setDeleteTarget(null)
      fetchContent()
    } catch {
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  const { totalPages, total } = pagination

  const LABELS = { Blog: 'Blog Posts', Education: 'Education', News: 'News' }
  const headingLabel = locked ? (LABELS[defaultCategory] ?? defaultCategory) : 'All Content'

  return (
    <>
      <DeleteConfirmPopup
        isOpen={Boolean(deleteTarget)}
        itemName={deleteTarget?.name}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <div className="admin-table-card">
      {/* Toolbar */}
      <div className="admin-table-toolbar">
        <span className="admin-table-heading">{headingLabel}</span>

        <div className="admin-search-wrap">
          <Search className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder={locked ? `Search ${defaultCategory}…` : 'Search content…'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!locked && (
          <select
            className="admin-filter-select"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Blog">Blog</option>
            <option value="Education">Education</option>
            <option value="News">News</option>
          </select>
        )}

        <select
          className="admin-filter-select"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>

        <Link href="/admin/add-content" className="admin-add-btn">
          <Plus size={13} />
          Add New
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--admin-text-subtle)' }}>
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--admin-text-subtle)' }}>
                  No content found.
                </td>
              </tr>
            ) : filtered.map((item) => {
              const tags = parseTags(item.tags)
              return (
                <tr key={item._id}>
                  <td>
                    {item.mainImage?.url ? (
                      <img src={item.mainImage.url} alt="" className="admin-table-thumb" />
                    ) : (
                      <div className="admin-table-thumb admin-table-thumb--empty" />
                    )}
                  </td>
                  <td className="admin-table-cell-title" title={item.mainTitle}>{item.mainTitle}</td>
                  <td><span className={CATEGORY_CLASS[item.category] ?? 'admin-badge'}>{capitalize(item.category)}</span></td>
                  <td><span className={STATUS_CLASS[item.status] ?? 'admin-badge'}>{capitalize(item.status)}</span></td>
                  <td className="admin-table-cell-tags">
                    {tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="admin-tag">{tag}</span>
                    ))}
                    {tags.length > 3 && (
                      <span className="admin-tag admin-tag--more">+{tags.length - 3}</span>
                    )}
                  </td>
                  <td>{formatDate(item.publishDate)}</td>
                  <td>
                    <div className="admin-action-group">
                      <Link href={`/admin/add-content?id=${item._id}`} className="admin-action-btn" title="Edit"><Pencil size={13} /></Link>
                      <button
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                        onClick={() => setDeleteTarget({ id: item._id, name: item.mainTitle })}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
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
