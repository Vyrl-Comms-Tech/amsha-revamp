'use client'

import axios from 'axios'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  withCredentials: true,
})

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading]         = useState(true)
  const router= useRouter()
  const timerRef = useRef(null)
  // Stable ref so scheduleRefresh can call silentRefresh without stale closures
  const silentRefreshRef= useRef(null)

  const scheduleRefresh = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    // Refresh 1 min before the 15-min access token expiry
    timerRef.current = setTimeout(() => silentRefreshRef.current?.(), 14 * 60 * 1000)
  }, [])

  const silentRefresh = useCallback(async () => {
    try {
      const { data } = await api.get('/admin/refresh-token')
      setAccessToken(data.accessToken)
      scheduleRefresh()
    } catch {
      setAccessToken(null)
    }
  }, [scheduleRefresh])

  silentRefreshRef.current = silentRefresh

  // Restore session on mount via the httpOnly refresh-token cookie
  useEffect(() => {
    silentRefresh().finally(() => setLoading(false))
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [silentRefresh])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/admin/login', { email, password })

    console.log("Admin Data", data)
    setAccessToken(data.accessToken)
    scheduleRefresh()
  }, [scheduleRefresh])

  const logout = useCallback(async () => {
    try {
      await api.post('/admin/logout')
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current)
      setAccessToken(null)
      router.push('/admin/login')
    }
  }, [router])

  return (
    <AdminContext.Provider value={{ accessToken, loading, login, logout, api }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
