'use client'

import React from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ProfileWidgetProps {
  user: any
  onClose: () => void
  isDarkMode: boolean
}

export default function ProfileWidget({ user, onClose, isDarkMode }: ProfileWidgetProps) {
  if (!user) return null

  if (user.error === 'Builder not found') {
    return (
      <>
        <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={onClose} />
        <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:50, width:'340px', background: '#0A0A0A', border:'1.5px solid #D92D20', borderRadius:'4px', padding:'24px', display:'flex', flexDirection:'column', gap:'16px', textAlign: 'center' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', width: '100%' }}>
            <span style={{ color:'#D92D20', fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>FORG</span>
            <button onClick={onClose} style={{ background:'none', border:'none', fontSize:'20px', cursor:'pointer', color: 'rgba(255,255,255,0.4)', lineHeight:1 }}>&times;</button>
          </div>
          <div style={{ fontFamily:"'Anton',sans-serif", fontSize:'24px', color: '#f8fafc', textTransform: 'uppercase' }}>Builder not found</div>
          <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            We couldn&apos;t find a builder with the username <span style={{ color: '#D92D20' }}>@{user.username}</span>.
          </p>
          <button
            onClick={onClose}
            style={{ width:'100%', background: '#f8fafc', color: '#050505', fontFamily:"'IBM Plex Mono',monospace", fontSize:'11px', fontWeight:700, padding:'12px', borderRadius:'2px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
          >
            Close
          </button>
        </div>
      </>
    )
  }

  const avatarSrc = user.profileImage || user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.displayName || user.name || user.username)}&backgroundColor=1a1a1a&textColor=ffffff&fontSize=40`

  return (
    <>
      <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={onClose} />
      <div style={{
        position:'fixed',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        zIndex:50,
        width:'340px',
        background: isDarkMode ? '#0A0A0A' : 'white',
        border:`1px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
        borderRadius:'4px',
        padding:'20px',
        display:'flex',
        flexDirection:'column',
        gap:'14px'
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:'#D92D20', fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>FORG</span>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:'20px', cursor:'pointer', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', lineHeight:1 }}>&times;</button>
        </div>

        <div style={{ display:'flex', gap:'14px', alignItems:'center' }}>
          <div style={{ width:'52px', height:'52px', borderRadius:'4px', overflow:'hidden', background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
            <img
              src={avatarSrc}
              style={{ width:'100%', height:'100%', objectFit:'cover' }}
              alt={user.name}
              onError={(e: any) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=1a1a1a&textColor=ffffff&fontSize=40`
              }}
            />
          </div>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ fontFamily:"'Anton',sans-serif", fontSize:'20px', textTransform:'uppercase', letterSpacing:'0.08em', color: '#f8fafc' }}>{user.displayName || user.name}</div>
              {user.isPremium && (
                <div style={{ background: '#D92D20', color: '#fff', fontSize: '8px', padding: '1px 4px', borderRadius: '2px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>PREMIUM</div>
              )}
            </div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'11px', color:'#D92D20', marginTop:'3px', fontWeight:700 }}>@{user.username}</div>
          </div>
        </div>

        <div style={{ height:'1px', background: 'rgba(255,255,255,0.1)' }} />

        {user.location && user.location !== 'Unknown' && user.location !== 'Classified' && user.location !== 'Everywhere' ? (
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', textTransform:'uppercase', letterSpacing:'0.1em', color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)', fontWeight:700 }}>LOCATION</span>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#334155' }}>{user.location.toUpperCase()}</span>
          </div>
        ) : (
          <div style={{ border: '1.5px solid #D92D20', borderRadius: '2px', padding: '10px', background: 'rgba(217,45,32,0.05)' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: '#D92D20', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.4 }}>
              LOCATION NOT SET — IF THIS IS YOU, EDIT YOUR PROFILE AT FORG.TO TO ADD YOUR LOCATION AND APPEAR ON THE GLOBE.
            </div>
          </div>
        )}

        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'11px', lineHeight:1.6, borderLeft:'2px solid #D92D20', paddingLeft:'12px', margin:0, fontStyle:'italic', color: isDarkMode ? 'rgba(255,255,255,0.6)' : '#475569' }}>
          &quot;{user.tagline}&quot;
        </p>

        <div style={{ height:'1px', background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius:'2px', padding:'8px', display:'flex', flexDirection: 'column', alignItems:'center', background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'8px', textTransform:'uppercase', letterSpacing:'0.1em', color: 'rgba(255,255,255,0.4)', fontWeight:700 }}>PRODUCTS</span>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'16px', fontWeight:700, color: '#f8fafc' }}>{user.stats?.products ?? user.productsCount ?? 0}</span>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius:'2px', padding:'8px', display:'flex', flexDirection: 'column', alignItems:'center', background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'8px', textTransform:'uppercase', letterSpacing:'0.1em', color: 'rgba(255,255,255,0.4)', fontWeight:700 }}>UPDATES</span>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'16px', fontWeight:700, color: '#f8fafc' }}>{user.stats?.updates ?? 0}</span>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius:'2px', padding:'8px', display:'flex', flexDirection: 'column', alignItems:'center', background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'8px', textTransform:'uppercase', letterSpacing:'0.1em', color: 'rgba(255,255,255,0.4)', fontWeight:700 }}>FOLLOWERS</span>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'16px', fontWeight:700, color: '#f8fafc' }}>{user.stats?.followers ?? 0}</span>
          </div>
        </div>

        {user.products && user.products.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', textTransform:'uppercase', letterSpacing:'0.1em', color: 'rgba(255,255,255,0.4)', fontWeight:700 }}>TOP PRODUCTS</span>
            {user.products.map((p: any) => (
              <div key={p.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px', padding: '6px' }}>
                <img src={p.logo || 'https://api.forg.to/logo.png'} style={{ width: '24px', height: '24px', borderRadius: '2px' }} alt={p.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.tagline}</div>
                </div>
                <div style={{ fontSize: '8px', color: '#D92D20', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", textTransform: 'uppercase' }}>{p.status}</div>
              </div>
            ))}
          </div>
        )}

        <a href={user.profileUrl || `https://forg.to/@${user.username}`} target="_blank" rel="noopener noreferrer" style={{ display:'block', width:'100%', background: isDarkMode ? '#f8fafc' : '#0f172a', color: isDarkMode ? '#0f172a' : '#f8fafc', fontFamily:"'IBM Plex Mono',monospace", fontSize:'11px', fontWeight:700, padding:'12px', textAlign:'center', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.15em', borderRadius:'2px' }}
          onMouseOver={e => (e.currentTarget.style.background = '#D92D20')}
          onMouseOut={e => (e.currentTarget.style.background = isDarkMode ? '#f8fafc' : '#0f172a')}
        >
          VIEW PROFILE →
        </a>
      </div>
    </>
  )
}
