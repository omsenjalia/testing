/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useRef, useEffect } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SearchBarProps {
  builders: any[]
  onSelectUser: (user: any) => void
  isDarkMode: boolean
  onOpenNoLocation: () => void
}

export default function SearchBar({ builders, onSelectUser, isDarkMode, onOpenNoLocation }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noLocation, setNoLocation] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    setIsLoading(true)
    setError(null)
    setNoLocation(false)

    try {
      const userRes = await fetch(`/api/forg/user?username=${encodeURIComponent(query)}`)
      if (!userRes.ok) {
        if (userRes.status === 404) {
          onSelectUser({ username: query, error: 'Builder not found' })
        } else {
          setError('Failed to fetch builder')
        }
        setIsLoading(false)
        return
      }

      const userData = await userRes.json()

      const productsRes = await fetch(`/api/forg/products?username=${encodeURIComponent(query)}`)
      let productsData = []
      if (productsRes.ok) {
        productsData = await productsRes.json()
      }

      const fullUserData = {
        ...userData,
        products: productsData.slice(0, 3)
      }

      onSelectUser(fullUserData)
      if (!userData.location) {
        setNoLocation(true)
      }
      setIsFocused(false)
      setQuery('')
    } catch (error) {
      console.error('Search error:', error)
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBuilders = builders.filter(b =>
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.username.toLowerCase().includes(query.toLowerCase()) ||
    (b.location && b.location.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '320px' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search a builder... (e.g. kislay)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setError(null)
            setNoLocation(false)
          }}
          onFocus={() => setIsFocused(true)}
        style={{
          width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${isFocused ? '#D92D20' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '2px',
            padding: '8px 12px',
          fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: '#fff',
          outline: 'none',
          transition: 'all 0.2s'
        }}
      />
      </form>

      {isFocused && (noLocation || (query.length > 0 && builders.filter(b => (!b.lat || !b.lng) && (b.name.toLowerCase().includes(query.toLowerCase()) || b.username.toLowerCase().includes(query.toLowerCase()))).length > 0)) && (
        <div
          onClick={onOpenNoLocation}
          style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#D92D20', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D92D20' }} />
          LOCATION UNAVAILABLE
        </div>
      )}

      {error && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', background: '#0A0A0A', border: '1.5px solid #D92D20', borderRadius: '4px', padding: '12px', color: '#fff', fontSize: '11px', fontFamily: "'IBM Plex Mono', monospace", zIndex: 100 }}>
          {error}
        </div>
      )}

      {isLoading && (
        <div style={{ position: 'absolute', right: '12px', top: '10px' }}>
          <div style={{ width: '14px', height: '14px', border: '2px solid rgba(217,45,32,0.3)', borderTopColor: '#D92D20', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {isFocused && query.length > 0 && !isLoading && !error && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '8px',
          background: isDarkMode ? '#0A0A0A' : '#fff',
          border: `1.5px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
          borderRadius: '4px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 100
        }}>
          {filteredBuilders.map(user => (
            <div
              key={user.id}
              onClick={() => {
                setIsFocused(false);
                setQuery('');
                onSelectUser(user);
              }}
              style={{ padding: '10px 12px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isDarkMode ? 'rgba(217,45,32,0.1)' : 'rgba(217,45,32,0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <img
                src={user.profileImage || user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.displayName || user.name || user.username)}&backgroundColor=1a1a1a&textColor=ffffff&fontSize=40`}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #D92D20' }}
                alt={user.displayName || user.name}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: '13px', textTransform: 'uppercase', color: isDarkMode ? '#fff' : '#000' }}>{user.displayName || user.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#D92D20', fontWeight: 700 }}>@{user.username}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: (!user.lat || !user.lng) ? '#D92D20' : (isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'), fontWeight: (!user.lat || !user.lng) ? 700 : 400 }}>
                    {(!user.lat || !user.lng) ? 'LOCATION UNAVAILABLE' : user.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredBuilders.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
              NO BUILDERS FOUND
            </div>
          )}
        </div>
      )}
    </div>
  )
}
