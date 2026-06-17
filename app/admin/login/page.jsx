'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import '../styles/admin-vars.css'
import '../styles/login.css'

export default function AdminLoginPage() {
  const router                          = useRouter()
  const { login }                       = useAdmin()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [error, setError]               = useState('')
  const [submitting, setSubmitting]     = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      router.push('/admin')
    } catch (err) {
      setError(err?.response?.data?.message ?? err.message ?? 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-login-root">
      <div className="admin-login-grid" />
      <div className="admin-login-glow" />

      <div className="admin-login-wrap">
        <div className="admin-login-top">
          <h1 className="admin-login-title">Welcome back</h1>
          <p className="admin-login-tagline">Sign in to the admin panel</p>
        </div>

        <div className="admin-login-card">
          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div>
              <label className="admin-login-label" htmlFor="admin-email">Email address</label>
              <div className="admin-login-field">
                <Mail className="admin-login-field-icon" />
                <input
                  id="admin-email"
                  type="email"
                  className="admin-login-input"
                  placeholder="admin@amsha.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="admin-login-label" htmlFor="admin-password">Password</label>
              <div className="admin-login-field">
                <Lock className="admin-login-field-icon" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: '36px' }}
                />
                <button
                  type="button"
                  className="admin-login-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && <p className="admin-login-error">{error}</p>}
            <button type="submit" className="admin-login-btn" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="admin-login-footer">
          Amsha Advisory &copy; {new Date().getFullYear()} &middot; Admin Panel
        </p>
      </div>
    </div>
  )
}
