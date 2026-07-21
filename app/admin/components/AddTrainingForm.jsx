'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ImagePlus,
  X,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  AlignLeft,
  List,
} from 'lucide-react'
import '../styles/add-content.css'
import '../styles/add-training.css'
import { useAdmin } from '../context/AdminContext'
import { useSearchParams } from 'next/navigation'

const DELIVERY_MODES = ['Online', 'Offline', 'Hybrid']

const INITIAL = {
  title: '',
  category: '',
  descMode: 'text',
  description: '',
  bullets: [''],
  deliveryModes: [],
  status: 'published',
  image: null,
}

function parseApiError(error) {
  const msg = error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.'
  return msg
}

export default function AddTrainingForm() {
  const [form, setForm] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const fileRef = useRef(null)
  const imageFileRef = useRef(null)
  const toastTimerRef = useRef(null)
  const { api, accessToken } = useAdmin()
  const searchParams = useSearchParams()
  const trainingId = searchParams.get('id')
  const isEditing = Boolean(trainingId)

  function showError(message) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ visible: true, message })
    toastTimerRef.current = setTimeout(() => setToast({ visible: false, message: '' }), 4500)
  }

  useEffect(() => {
    return () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current) }
  }, [])

  useEffect(() => {
    if (!trainingId) return
    const fetchTraining = async () => {
      try {
        const res = await api.get(`/admin/training/get?id=${trainingId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const d = res.data.data
        const hasBullets = Array.isArray(d.bullets) && d.bullets.length > 0
        setForm({
          title: d.title || '',
          category: d.category || '',
          descMode: hasBullets ? 'bullets' : 'text',
          description: d.description || '',
          bullets: hasBullets ? d.bullets : [''],
          deliveryModes: d.deliveryModes || [],
          status: d.status || 'published',
          image: d.image?.url || d.image || null,
        })
      } catch {
        showError('Failed to load training')
      }
    }
    fetchTraining()
  }, [trainingId, accessToken])

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // ── Bullet helpers ──────────────────────────────────────────
  function updateBullet(index, value) {
    const next = [...form.bullets]
    next[index] = value
    set('bullets', next)
  }

  function addBullet() {
    set('bullets', [...form.bullets, ''])
  }

  function removeBullet(index) {
    if (form.bullets.length === 1) {
      set('bullets', [''])
      return
    }
    set('bullets', form.bullets.filter((_, i) => i !== index))
  }

  function handleBulletKeyDown(e, index) {
    if (e.key === 'Enter') {
      e.preventDefault()
      set('bullets', [
        ...form.bullets.slice(0, index + 1),
        '',
        ...form.bullets.slice(index + 1),
      ])
      setTimeout(() => {
        const inputs = document.querySelectorAll('.at-bullet-input')
        inputs[index + 1]?.focus()
      }, 0)
    }
    if (e.key === 'Backspace' && form.bullets[index] === '' && form.bullets.length > 1) {
      e.preventDefault()
      const next = form.bullets.filter((_, i) => i !== index)
      set('bullets', next)
      setTimeout(() => {
        const inputs = document.querySelectorAll('.at-bullet-input')
        inputs[Math.max(0, index - 1)]?.focus()
      }, 0)
    }
  }

  // ── Delivery mode toggle ────────────────────────────────────
  function toggleDelivery(mode) {
    set(
      'deliveryModes',
      form.deliveryModes.includes(mode)
        ? form.deliveryModes.filter((m) => m !== mode)
        : [...form.deliveryModes, mode]
    )
  }

  // ── Image ───────────────────────────────────────────────────
  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      showError('Image must be under 3MB. Please compress or resize it.')
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

  // ── Reset ───────────────────────────────────────────────────
  function handleReset() {
    setForm(INITIAL)
    imageFileRef.current = null
    if (fileRef.current) fileRef.current.value = ''
  }

  // ── Submit ──────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return

    if (!form.title.trim()) {
      showError('Please enter a training title.')
      return
    }
    // if (!form.category.trim()) {
    //   showError('Please enter a category.')
    //   return
    // }

    const descriptionEmpty = form.descMode === 'text'
      ? !form.description || form.description === '<p></p>'
      : form.bullets.every((b) => !b.trim())

    if (descriptionEmpty) {
      showError('Please add a description or at least one bullet point.')
      return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('category', form.category)
    formData.append('descMode', form.descMode)
    if (form.descMode === 'text') {
      formData.append('description', form.description)
    } else {
      formData.append('bullets', JSON.stringify(form.bullets.filter((b) => b.trim())))
    }
    formData.append('deliveryModes', JSON.stringify(form.deliveryModes))
    formData.append('status', form.status)
    if (imageFileRef.current) {
      formData.append('image', imageFileRef.current)
    }

    try {
      if (isEditing) {
        await api.put(`/admin/training/update?id=${trainingId}`, formData, {
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await api.post('/admin/training/create', formData, {
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
        })
      }
      setShowSuccess(true)
    } catch (error) {
      showError(parseApiError(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="add-content-page">

      {/* Error toast */}
      {toast.visible && (
        <div className="ac-toast">
          <AlertCircle size={16} className="ac-toast-icon" />
          <span className="ac-toast-msg">{toast.message}</span>
          <button type="button" className="ac-toast-close" onClick={() => setToast({ visible: false, message: '' })}>
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
            <h3 className="ac-modal-title">{isEditing ? 'Updated!' : 'Training Added!'}</h3>
            <p className="ac-modal-desc">
              {isEditing
                ? 'Your training has been updated successfully.'
                : 'The training has been created successfully.'}
            </p>
            <div className="ac-modal-actions">
              {!isEditing && (
                <button
                  type="button"
                  className="add-content-btn-primary"
                  onClick={() => { setShowSuccess(false); handleReset() }}
                >
                  Add Another
                </button>
              )}
              <Link href="/admin" className="add-content-btn-secondary ac-modal-link">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="add-content-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/admin" className="add-content-page-back">
            <ArrowLeft size={14} />
            Back
          </Link>
          <span style={{ color: 'var(--admin-text-subtle)', fontSize: 13 }}>/</span>
          <h2 className="add-content-page-title">{isEditing ? 'Edit Training' : 'Add Training'}</h2>
          {isEditing && (
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
              padding: '2px 8px', borderRadius: 4,
              background: 'var(--admin-accent, #f59e0b)', color: '#fff', textTransform: 'uppercase',
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
          <button className="add-content-btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting
              ? isEditing ? 'Saving…' : 'Saving…'
              : isEditing ? 'Save Changes' : 'Add Training'}
          </button>
        </div>
      </div>

      {/* Layout */}
      <form className="add-content-layout" onSubmit={handleSubmit}>

        {/* LEFT */}
        <div className="add-content-left">

          {/* Title + Category */}
          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">Training Details</p>
            </div>
            <div className="add-content-card-body">
              <div className="add-content-field">
                <label className="add-content-label add-content-label--req">Service</label>
                <input
                  type="text"
                  className="add-content-input"
                  placeholder="e.g. Behavioral, Soft Skills & Workplace Effectiveness Training"
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  required
                />
                <p className="add-content-tag-hint">Type your service...</p>
              </div>

              <div className="add-content-field">
                <label className="add-content-label add-content-label--req">Title</label>
                <input
                  type="text"
                  className="add-content-input"
                  placeholder="e.g. Critical Thinking & Problem Solving for Corporate Professionals"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  required
                />
              </div>

            </div>
          </div>

          {/* Description / Bullet Points */}
          <div className="add-content-card">
            <div className="add-content-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p className="add-content-card-title">Description</p>
              <div className="at-mode-toggle">
                <button
                  type="button"
                  className={`at-mode-btn${form.descMode === 'text' ? ' at-mode-btn--active' : ''}`}
                  onClick={() => set('descMode', 'text')}
                  title="Rich text description"
                >
                  <AlignLeft size={12} style={{ marginRight: 4 }} />
                  Text
                </button>
                <button
                  type="button"
                  className={`at-mode-btn${form.descMode === 'bullets' ? ' at-mode-btn--active' : ''}`}
                  onClick={() => set('descMode', 'bullets')}
                  title="Bullet point list"
                >
                  <List size={12} style={{ marginRight: 4 }} />
                  Bullet Points
                </button>
              </div>
            </div>

            {form.descMode === 'text' ? (
              <div className="add-content-card-body">
                <textarea
                  className="add-content-textarea"
                  placeholder="Describe the training program, objectives, and what participants will gain…"
                  rows={7}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  style={{ minHeight: 140 }}
                />
              </div>
            ) : (
              <div className="add-content-card-body">
                <p className="add-content-tag-hint" style={{ marginBottom: 4 }}>
                  Each line becomes a bullet point on the training card. Press Enter to add a new item.
                </p>
                <div className="at-bullets-list">
                  {form.bullets.map((bullet, i) => (
                    <div key={i} className="at-bullet-row">
                      <span className="at-bullet-dot">•</span>
                      <input
                        type="text"
                        className="add-content-input at-bullet-input"
                        placeholder={`Bullet point ${i + 1}…`}
                        value={bullet}
                        onChange={(e) => updateBullet(i, e.target.value)}
                        onKeyDown={(e) => handleBulletKeyDown(e, i)}
                      />
                      <button
                        type="button"
                        className="at-bullet-remove"
                        onClick={() => removeBullet(i)}
                        title="Remove this bullet"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="at-add-bullet-btn"
                  onClick={addBullet}
                >
                  <Plus size={13} style={{ marginRight: 4 }} />
                  Add bullet point
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Featured Image (optional) */}
          <div className="add-content-card">
            <div className="add-content-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p className="add-content-card-title">Featured Image</p>
              <span className="at-optional-badge">Optional</span>
            </div>
            <div className="add-content-card-body">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                id="at-img-input"
              />
              <label htmlFor="at-img-input" className="add-content-img-upload">
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
                    <p className="add-content-img-hint">PNG, JPG, WEBP · Max 2MB</p>
                  </div>
                )}
              </label>
              {form.image && (
                <button type="button" className="add-content-btn-ghost" onClick={clearImage} style={{ marginTop: 6, fontSize: 12 }}>
                  Remove image
                </button>
              )}
            </div>
          </div>

          {/* Delivery Mode */}
          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">Delivery Mode</p>
            </div>
            <div className="add-content-card-body">
              <p className="add-content-tag-hint" style={{ marginBottom: 6 }}>Select all that apply.</p>
              <div className="at-delivery-group">
                {DELIVERY_MODES.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={`at-delivery-chip${form.deliveryModes.includes(mode) ? ' at-delivery-chip--on' : ''}`}
                    onClick={() => toggleDelivery(mode)}
                  >
                    {form.deliveryModes.includes(mode) && <CheckCircle size={12} style={{ marginRight: 4 }} />}
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="add-content-card">
            <div className="add-content-card-header">
              <p className="add-content-card-title">Status</p>
            </div>
            <div className="add-content-card-body">
              <div className="at-delivery-group">
                <button
                  type="button"
                  className={`at-delivery-chip at-status-chip--draft${form.status === 'draft' ? ' at-delivery-chip--on at-status-chip--draft-on' : ''}`}
                  onClick={() => set('status', 'draft')}
                >
                  {form.status === 'draft' && <CheckCircle size={12} style={{ marginRight: 4 }} />}
                  Draft
                </button>
                <button
                  type="button"
                  className={`at-delivery-chip at-status-chip--published${form.status === 'published' ? ' at-delivery-chip--on at-status-chip--published-on' : ''}`}
                  onClick={() => set('status', 'published')}
                >
                  {form.status === 'published' && <CheckCircle size={12} style={{ marginRight: 4 }} />}
                  Published
                </button>
              </div>
              <p className="add-content-tag-hint" style={{ marginTop: 8 }}>
                {form.status === 'draft' ? 'Saved as draft — not visible to the public.' : 'Live and visible to the public.'}
              </p>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
