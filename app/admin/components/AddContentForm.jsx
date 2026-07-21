'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, ImagePlus, X, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import '../styles/add-content.css'
import { useAdmin } from '../context/AdminContext'
import { useSearchParams } from 'next/navigation'
const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false })

const INITIAL = {
  title: '',
  shortDesc: '',
  category: '',
  tags: [],
  tagInput: '',
  metaTitle: '',
  metaDesc: '',
  content: '',
  image: null,
  publishedAt: '',
  status: 'draft',
}

function parseApiError(error) {
  const msg = error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.'
  if (msg.includes('E11000') && msg.includes('slug')) {
    return 'A content with this title already exists. Please use a different title.'
  }
  return msg
}

export default function AddContentForm() {
  const [form, setForm] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const fileRef = useRef(null)
  const imageFileRef = useRef(null)
  const toastTimerRef = useRef(null)
  const { api, accessToken } = useAdmin()
  const searchParams = useSearchParams()
  const contentId = searchParams.get('id')


  function parseTags(tags) {
    if (!tags) return []

    if (Array.isArray(tags)) {
      return tags.flatMap(t => {
        try {
          return JSON.parse(t)
        } catch {
          return t
        }
      })
    }

    if (typeof tags === 'string') {
      try {
        return JSON.parse(tags)
      } catch {
        return [tags]
      }
    }
    return []
  }


  function showError(message) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ visible: true, message })
    toastTimerRef.current = setTimeout(() => setToast({ visible: false, message: '' }), 4500)
  }

  useEffect(() => {
    return () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current) }
  }, [])


  useEffect(() => {
    if (!contentId) return

    const fetchContent = async () => {
      try {
        const res = await api.get(
          `/admin/content/get?id=${contentId}&completeContent=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        const data = res.data.data
        setForm({
          title: data.mainTitle || '',
          shortDesc: data.shortDescription || '',
          category: data.category || '',
          tags: parseTags(data.tags) || [],
          tagInput: '',
          metaTitle: data.metaTitle || '',
          metaDesc: data.metaDescription || '',
          content: data.htmlFormat || '',
          image: data.mainImage?.url || data.mainImage || null,
          publishedAt: data.publishDate
            ? new Date(data.publishDate).toISOString().slice(0, 16)
            : data.createdAt
            ? new Date(data.createdAt).toISOString().slice(0, 16)
            : '',
          status: data.status || 'draft',
        })
      } catch (error) {
        console.log('Fetch error:', error)
        showError('Failed to load content')
      }
    }
    fetchContent()
  }, [contentId, accessToken])

  const isEditing = Boolean(contentId)

  const handlePublish = async (e) => {
    e.preventDefault()
    if (submitting) return

    if (!imageFileRef.current && !form.image) {
      showError('Please upload a featured image before publishing.')
      return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.append('mainTitle', form.title)
    formData.append('shortDescription', form.shortDesc)
    formData.append('category', form.category.toLowerCase())
    formData.append('metaTitle', form.metaTitle)
    formData.append('metaDescription', form.metaDesc)
    formData.append('htmlFormat', form.content)
    formData.append('tags', JSON.stringify(form.tags))
    if (imageFileRef.current) {
      formData.append('mainImage', imageFileRef.current)
    }
    if (isEditing && form.publishedAt) {
      formData.append('publishDate', new Date(form.publishedAt).toISOString())
    }
    if (isEditing) {
      formData.append('status', form.status)
    }

    try {
      if (isEditing) {
        await api.put(`/admin/content/update?id=${contentId}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        await api.post('/admin/content/create', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      setShowSuccess(true)
    } catch (error) {
      showError(parseApiError(error))
    } finally {
      setSubmitting(false)
    }
  }

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleTagKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const tag = form.tagInput.trim().replace(/,$/, '')
      if (tag && !form.tags.includes(tag)) {
        set('tags', [...form.tags, tag])
      }
      set('tagInput', '')
    }
    if (e.key === 'Backspace' && !form.tagInput && form.tags.length) {
      set('tags', form.tags.slice(0, -1))
    }
  }

  function removeTag(tag) {
    set('tags', form.tags.filter((t) => t !== tag))
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 3 * 1024 * 1024) {
      showError('Featured image must be under 3MB. Please compress or resize the image.')
      e.target.value = ''
      return
    }

    imageFileRef.current = file
    const reader = new FileReader()
    reader.onloadend = () => set('image', reader.result)
    reader.readAsDataURL(file)
  }

  function clearImage() {
    set('image', null)
    imageFileRef.current = null
    if (fileRef.current) fileRef.current.value = ''
  }

  function handleReset() {
    setForm(INITIAL)
    imageFileRef.current = null
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="add-content-page">
      {/* Error toast — slides in from left */}
      {toast.visible && (
        <div className="ac-toast">
          <AlertCircle size={16} className="ac-toast-icon" />
          <span className="ac-toast-msg">{toast.message}</span>
          <button
            type="button"
            className="ac-toast-close"
            onClick={() => setToast({ visible: false, message: '' })}
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Success modal */}
      {showSuccess && (
        <div className="ac-modal-overlay">
          <div className="ac-modal">
            <div className="ac-modal-icon-wrap">
              <CheckCircle size={44} />
            </div>
            <h3 className="ac-modal-title">{isEditing ? 'Updated!' : 'Published!'}</h3>
            <p className="ac-modal-desc">
              {isEditing
                ? 'Your content has been updated successfully.'
                : 'Your content has been created successfully.'}
            </p>
            <div className="ac-modal-actions">
              {!isEditing && (
                <button
                  type="button"
                  className="add-content-btn-primary"
                  onClick={() => { setShowSuccess(false); handleReset() }}
                >
                  Create Another
                </button>
              )}
              <Link href="/admin" className="add-content-btn-secondary ac-modal-link">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Page top bar */}
      <div className="add-content-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/admin" className="add-content-page-back">
            <ArrowLeft size={14} />
            Back
          </Link>
          <span style={{ color: 'var(--admin-text-subtle)', fontSize: 13 }}>/</span>
          <h2 className="add-content-page-title">{isEditing ? 'Edit Content' : 'Add Content'}</h2>
          {isEditing && (
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.04em',
              padding: '2px 8px',
              borderRadius: 4,
              background: 'var(--admin-accent, #f59e0b)',
              color: '#fff',
              textTransform: 'uppercase',
            }}>
              Editing
            </span>
          )}
        </div>

        <div className="add-content-actions">
          <button className="add-content-btn-ghost" onClick={handleReset} type="button">
            <RefreshCw size={13} style={{ marginRight: 5 }} />
            Reset
          </button>
          <button
            className="add-content-btn-primary"
            onClick={handlePublish}
            disabled={submitting}
          >
            {submitting
              ? isEditing ? 'Saving…' : 'Publishing…'
              : isEditing ? 'Save Changes' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <form className="add-content-layout" onSubmit={handlePublish}>

        {/* LEFT COLUMN */}
        <div className="add-content-left">

          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">Content</p>
            </div>
            <div className="add-content-card-body">
              <div className="add-content-field">
                <label className="add-content-label add-content-label--req">Title</label>
                <input
                  type="text"
                  className="add-content-input"
                  placeholder="Enter content title…"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  required
                />
              </div>

              <div className="add-content-field">
                <label className="add-content-label">Short Description</label>
                <textarea
                  className="add-content-textarea"
                  placeholder="Brief summary displayed in listing cards…"
                  rows={3}
                  value={form.shortDesc}
                  onChange={(e) => set('shortDesc', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">Body Content</p>
            </div>
            <div style={{ padding: '16px' }}>
              <TiptapEditor
                value={form.content}
                onChange={(html) => set('content', html)}
                onError={showError}
                placeholder="Write your full content here…"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">SEO / Meta</p>
            </div>
            <div className="add-content-card-body">
              <div className="add-content-field">
                <label className="add-content-label">Meta Title</label>
                <input
                  type="text"
                  className="add-content-input"
                  placeholder="SEO page title…"
                  value={form.metaTitle}
                  onChange={(e) => set('metaTitle', e.target.value)}
                  maxLength={60}
                />
                <p className="add-content-tag-hint">{form.metaTitle.length}/60 characters</p>
              </div>

              <div className="add-content-field">
                <label className="add-content-label">Meta Description</label>
                <textarea
                  className="add-content-textarea"
                  placeholder="SEO meta description…"
                  rows={3}
                  value={form.metaDesc}
                  onChange={(e) => set('metaDesc', e.target.value)}
                  maxLength={160}
                  style={{ minHeight: '70px' }}
                />
                <p className="add-content-tag-hint">{form.metaDesc.length}/160 characters</p>
              </div>
            </div>
          </div>

          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">Featured Image</p>
            </div>
            <div className="add-content-card-body">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                id="add-content-img-input"
              />

              <label htmlFor="add-content-img-input" className="add-content-img-upload">
                {form.image ? (
                  <>
                    <img src={form.image} alt="Preview" className="add-content-img-preview" />
                    <div className="add-content-img-overlay">
                      <span className="add-content-img-overlay-text">Change image</span>
                    </div>
                  </>
                ) : (
                  <div className="add-content-img-placeholder">
                    <ImagePlus size={28} className="add-content-img-icon" />
                    <p className="add-content-img-text">Click to upload image</p>
                    <p className="add-content-img-hint">PNG, JPG, WEBP · Max 1MB</p>
                  </div>
                )}
              </label>

              {form.image && (
                <button
                  type="button"
                  className="add-content-btn-ghost"
                  onClick={clearImage}
                  style={{ marginTop: 6, fontSize: 12 }}
                >
                  Remove image
                </button>
              )}
            </div>
          </div>

          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">Publish Settings</p>
            </div>
            <div className="add-content-card-body">
              <div className="add-content-field">
                <label className="add-content-label add-content-label--req">Category</label>
                <select
                  className="add-content-select"
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  required
                >
                  <option value="" disabled>Select category…</option>
                  <option value="blog">Blog</option>
                  <option value="education">Education</option>
                  <option value="news">News</option>
                </select>
              </div>

              {isEditing && (
                <div className="add-content-field">
                  <label className="add-content-label">Status</label>
                  <select
                    className="add-content-select"
                    value={form.status}
                    onChange={(e) => set('status', e.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              )}

              {isEditing && (
                <div className="add-content-field">
                  <label className="add-content-label">Publish Date</label>
                  <input
                    type="datetime-local"
                    className="add-content-input"
                    value={form.publishedAt}
                    onChange={(e) => set('publishedAt', e.target.value)}
                  />
                </div>
              )}

              <div className="add-content-field">
                <label className="add-content-label">Tags</label>

                {form.tags.length > 0 && (
                  <div className="add-content-tags-chips">
                    {form.tags.map((tag) => (
                      <span key={tag} className="add-content-tag-chip">
                        {tag}
                        <button
                          type="button"
                          className="add-content-tag-remove"
                          onClick={() => removeTag(tag)}
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <input
                  type="text"
                  className="add-content-input"
                  placeholder="Type tag and press Enter…"
                  value={form.tagInput}
                  onChange={(e) => set('tagInput', e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <p className="add-content-tag-hint">Press Enter or comma to add a tag</p>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
