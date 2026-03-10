'use client'

import React, { useState, useEffect, useRef } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */

const BUILDER_DATA = [
  { id: '1', username: 'kislay', name: 'Kislay', avatar: 'https://res.cloudinary.com/dxkpmcrel/image/upload/v1772955240/buildinprocess/profiles/user_69798b91b7529f4a0815a9a3.jpg', location: 'Bengaluru, India', lat: 12.9716, lng: 77.5946, tagline: 'Building BuildInProcess — OS for founders', productsCount: 3, profileUrl: 'https://buildinprocess.com/@kislay' },
  { id: '2', username: 'riteshsinha4146', name: 'Ritesh Sinha', avatar: 'https://res.cloudinary.com/dxkpmcrel/image/upload/v1772811750/buildinprocess/profiles/user_69a72c5babafc5dc195e2ba1.jpg', location: 'Mumbai, India', lat: 19.076, lng: 72.8777, tagline: 'Shipping WeKraft', productsCount: 1, profileUrl: 'https://buildinprocess.com/@riteshsinha4146' },
  { id: '3', username: 'henry', name: 'Henry', avatar: 'https://res.cloudinary.com/dxkpmcrel/image/upload/v1772811738/buildinprocess/profiles/user_6979721df3a7a996a2defc3d.jpg', location: 'London, UK', lat: 51.5074, lng: -0.1278, tagline: 'Indie hacker. Building in public since 2023.', productsCount: 2, profileUrl: 'https://buildinprocess.com/@henry' },
  { id: '4', username: 'aditi_rajj23', name: 'Aditi Raj', avatar: 'https://res.cloudinary.com/dxkpmcrel/image/upload/v1772811744/buildinprocess/profiles/user_697e2945331d39ba9d828b49.jpg', location: 'Delhi, India', lat: 28.6139, lng: 77.209, tagline: 'Designer-turned-founder.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@aditi_rajj23' },
  { id: '5', username: 'pirolla40', name: 'Paul Irolla', avatar: 'https://res.cloudinary.com/dxkpmcrel/image/upload/v1772811745/buildinprocess/profiles/user_69878dd9482fb1b8b261fc9e.jpg', location: 'Paris, France', lat: 48.8566, lng: 2.3522, tagline: 'Solo founder. Ex-agency. Now ships fast.', productsCount: 2, profileUrl: 'https://buildinprocess.com/@pirolla40' },
  { id: '6', username: 'duongphudong', name: 'Dong Phu Duong', avatar: '', location: 'Ho Chi Minh City, Vietnam', lat: 10.8231, lng: 106.6297, tagline: 'Building SaaS tools for SE Asia.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@duongphudong' },
  { id: '7', username: 'mostypc7', name: 'Juraj Kollar', avatar: '', location: 'Bratislava, Slovakia', lat: 48.1486, lng: 17.1077, tagline: 'PC builder and dev.', productsCount: 2, profileUrl: 'https://buildinprocess.com/@mostypc7' },
  { id: '8', username: 'calchiwo', name: 'Caleb Wodi', avatar: '', location: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792, tagline: 'Bootstrapped. Building African fintech tools.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@calchiwo' },
  { id: '9', username: 'abdulroqeeboladipo', name: 'Oladipo Abdulroqib', avatar: '', location: 'Abuja, Nigeria', lat: 9.0579, lng: 7.4951, tagline: 'Full-stack dev. Shipping one thing at a time.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@abdulroqeeboladipo' },
  { id: '10', username: 'lincolnlesola567', name: 'Lincoln Lesola', avatar: '', location: 'Cape Town, South Africa', lat: -33.9249, lng: 18.4241, tagline: 'Building dev tools for African startups.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@lincolnlesola567' },
  { id: '11', username: 'maxim.bort.devel', name: 'Maxim Bortnikov', avatar: '', location: 'Berlin, Germany', lat: 52.52, lng: 13.405, tagline: 'Open source contributor.', productsCount: 3, profileUrl: 'https://buildinprocess.com/@maxim.bort.devel' },
  { id: '12', username: 'thesukhjitbajwa', name: 'Sukhjit Bajwa', avatar: '', location: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, tagline: 'Canadian indie hacker. SaaS + no-code.', productsCount: 2, profileUrl: 'https://buildinprocess.com/@thesukhjitbajwa' },
  { id: '13', username: 'pradeepyad089', name: 'Pradeep Yadav', avatar: '', location: 'Pune, India', lat: 18.5204, lng: 73.8567, tagline: 'Backend engineer shipping side projects.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@pradeepyad089' },
  { id: '14', username: 'pastable', name: 'Kit Pastable', avatar: '', location: 'San Francisco, USA', lat: 37.7749, lng: -122.4194, tagline: 'Building Pastable.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@pastable' },
  { id: '15', username: 'suresh', name: 'Suresh', avatar: '', location: 'Chennai, India', lat: 13.0827, lng: 80.2707, tagline: 'AI SEO tools.', productsCount: 2, profileUrl: 'https://buildinprocess.com/@suresh' },
]

const BUILDER_COUNTRIES = new Set(['IND', 'GBR', 'FRA', 'DEU', 'NGA', 'ZAF', 'SVK', 'VNM', 'CAN', 'USA'])

const DAY_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const NIGHT_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-night.jpg'
const BUMP_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-topology.png'
const COUNTRIES_GEOJSON = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson'

export default function GlobeApp() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const globeContainerRef = useRef<HTMLDivElement>(null)
  const globeInstance = useRef<any>(null)

  const initGlobe = async () => {
    if (!globeContainerRef.current || !(window as any).Globe) return
    try {
      const res = await fetch(COUNTRIES_GEOJSON)
      const countries = await res.json()

      const globe = (window as any).Globe()(globeContainerRef.current)
        // SATELLITE TEXTURE — DO NOT CHANGE TO NULL
        .globeImageUrl(DAY_TEXTURE)
        .bumpImageUrl(BUMP_TEXTURE)
        .backgroundColor('#f8fafc')
        .showAtmosphere(true)
        .atmosphereColor('#4a90e2')
        .atmosphereAltitude(0.15)
        // Country overlays on top of texture
        .polygonsData(countries.features)
        .polygonAltitude((d: any) => {
          const code = d.properties.ISO_A3 || d.properties.ADM0_A3
          return BUILDER_COUNTRIES.has(code) ? 0.04 : 0.005
        })
        .polygonCapColor((d: any) => {
          const code = d.properties.ISO_A3 || d.properties.ADM0_A3
          return BUILDER_COUNTRIES.has(code) ? 'rgba(217,45,32,0.35)' : 'rgba(0,0,0,0)'
        })
        .polygonSideColor((d: any) => {
          const code = d.properties.ISO_A3 || d.properties.ADM0_A3
          return BUILDER_COUNTRIES.has(code) ? 'rgba(217,45,32,0.2)' : 'rgba(0,0,0,0)'
        })
        .polygonStrokeColor((d: any) => {
          const code = d.properties.ISO_A3 || d.properties.ADM0_A3
          return BUILDER_COUNTRIES.has(code) ? '#D92D20' : 'rgba(255,255,255,0.1)'
        })
        // Avatar markers
        .htmlElementsData(BUILDER_DATA)
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlAltitude(0.06)
        .htmlElement((user: any) => {
          const el = document.createElement('div')
          el.style.cssText = 'position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;pointer-events:auto;'
          const initials = user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
          const avatarHtml = user.avatar
            ? `<img src="${user.avatar}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
               <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:10px;font-weight:bold;color:rgba(26,26,26,0.7);font-family:'IBM Plex Mono',monospace">${initials}</div>`
            : `<div style="display:flex;width:100%;height:100%;align-items:center;justify-content:center;font-size:10px;font-weight:bold;color:rgba(26,26,26,0.7);font-family:'IBM Plex Mono',monospace">${initials}</div>`
          el.innerHTML = `
            <div style="width:32px;height:32px;border-radius:50%;border:2px solid #D92D20;background:#1A1A1A;overflow:hidden;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(217,45,32,0.6);transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">
              ${avatarHtml}
            </div>
            <div class="marker-tooltip" style="position:absolute;bottom:calc(100% + 6px);background:#D92D20;color:white;font-family:'IBM Plex Mono',monospace;font-size:10px;padding:2px 8px;border-radius:2px;white-space:nowrap;opacity:0;transition:opacity 0.2s;pointer-events:none;text-transform:uppercase;letter-spacing:0.05em;">
              ${user.name}
            </div>`
          const tooltip = el.querySelector('.marker-tooltip') as HTMLElement
          el.addEventListener('mouseenter', () => { if (tooltip) tooltip.style.opacity = '1' })
          el.addEventListener('mouseleave', () => { if (tooltip) tooltip.style.opacity = '0' })
          el.onclick = () => handleMarkerClick(user)
          return el
        })

      // Pulse animation for builder countries
      let t = 0
      const pulse = () => {
        t += 0.05
        const alt = 0.04 + Math.sin(t) * 0.01
        globe.polygonAltitude((d: any) => {
          const code = d.properties.ISO_A3 || d.properties.ADM0_A3
          return BUILDER_COUNTRIES.has(code) ? alt : 0.005
        })
        requestAnimationFrame(pulse)
      }
      pulse()

      globeInstance.current = globe
      globe.pointOfView({ altitude: 2.2 }, 0)
      setLoading(false)

      const ro = new ResizeObserver(() => {
        if (globeContainerRef.current) {
          globe.width(globeContainerRef.current.clientWidth)
          globe.height(globeContainerRef.current.clientHeight)
        }
      })
      ro.observe(globeContainerRef.current)

    } catch (err) {
      console.error('Globe init failed:', err)
      setLoading(false)
    }
  }

  // Load globe.gl script
  useEffect(() => {
    if ((window as any).Globe) { initGlobe(); return; }
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/globe.gl'
    script.async = true
    script.onload = () => initGlobe()
    document.body.appendChild(script)
    return () => { if (document.body.contains(script)) document.body.removeChild(script) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Theme switch — update texture and background
  useEffect(() => {
    if (!globeInstance.current) return
    globeInstance.current
      .globeImageUrl(isDarkMode ? NIGHT_TEXTURE : DAY_TEXTURE)
      .backgroundColor(isDarkMode ? '#050505' : '#f8fafc')
      .atmosphereColor(isDarkMode ? '#3a76f0' : '#4a90e2')
  }, [isDarkMode])

  const handleMarkerClick = (user: any) => {
    if (!globeInstance.current) return
    setSelectedUser(null)
    globeInstance.current.pointOfView({ lat: user.lat, lng: user.lng, altitude: 1.4 }, 1200)
    setTimeout(() => setSelectedUser(user), 1000)
  }

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        body { margin:0; overflow:hidden; font-family:'IBM Plex Mono',monospace; background:${isDarkMode ? '#050505' : '#f8fafc'}; transition: background 0.5s; }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#1A1A1A; }
        .toggle-btn { position:relative;width:44px;height:22px;background:${isDarkMode ? '#222' : '#e2e8f0'};border-radius:11px;cursor:pointer;border:1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};transition:all 0.3s; }
        .toggle-dot { position:absolute;top:2px;left:${isDarkMode ? '24px' : '2px'};width:16px;height:16px;background:${isDarkMode ? '#f8fafc' : '#64748b'};border-radius:50%;transition:all 0.3s cubic-bezier(0.4,0,0.2,1); }
      `}</style>

      <div style={{ display:'flex', flexDirection:'column', height:'100vh', width:'100%', background: isDarkMode ? '#050505' : '#f8fafc', transition:'background 0.5s', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>

        {/* Header */}
        <header style={{ position:'fixed', top:0, left:0, right:0, height:'56px', borderBottom:`1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, background: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(248,250,252,0.8)', backdropFilter:'blur(8px)', zIndex:30, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px' }}>
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ color:'#D92D20', fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'3px' }}>
              BUILDINPROCESS
            </div>
            <h1 style={{ fontFamily:"'Anton',Impact,sans-serif", fontSize:'22px', lineHeight:1, letterSpacing:'0.1em', textTransform:'uppercase', margin:0, color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
              BUILDER GLOBE
            </h1>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'24px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', textTransform:'uppercase', letterSpacing:'0.15em', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                {isDarkMode ? 'DARK' : 'LIGHT'}
              </span>
              <div className="toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                <div className="toggle-dot" />
              </div>
            </div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', gap:'6px' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#D92D20', animation:'pulse 2s infinite' }} />
              {BUILDER_DATA.length} builders
            </div>
          </div>
        </header>

        {/* Globe */}
        <main style={{ marginTop:'56px', flex:1, position:'relative', overflow:'hidden' }}>
          {loading && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', letterSpacing:'0.1em', opacity:0.5, zIndex:10, color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
              LOADING BUILDERS...
            </div>
          )}
          <div ref={globeContainerRef} style={{ width:'100%', height:'100%' }} />

          {/* Profile Widget */}
          {selectedUser && (
            <>
              <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={() => setSelectedUser(null)} />
              <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:50, width:'340px', background: isDarkMode ? '#0A0A0A' : 'white', border:`1px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius:'4px', padding:'20px', display:'flex', flexDirection:'column', gap:'14px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ color:'#D92D20', fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>BUILDINPROCESS</span>
                  <button onClick={() => setSelectedUser(null)} style={{ background:'none', border:'none', fontSize:'20px', cursor:'pointer', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', lineHeight:1 }}>&times;</button>
                </div>

                <div style={{ display:'flex', gap:'14px', alignItems:'center' }}>
                  <div style={{ width:'52px', height:'52px', borderRadius:'4px', overflow:'hidden', background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
                    {selectedUser.avatar
                      ? <img src={selectedUser.avatar} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt={selectedUser.name} />
                      : <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'14px', fontWeight:700, color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>{getInitials(selectedUser.name)}</span>
                    }
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Anton',sans-serif", fontSize:'20px', textTransform:'uppercase', letterSpacing:'0.08em', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{selectedUser.name}</div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'11px', color:'#D92D20', marginTop:'3px', fontWeight:700 }}>@{selectedUser.username}</div>
                  </div>
                </div>

                <div style={{ height:'1px', background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', textTransform:'uppercase', letterSpacing:'0.1em', color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)', fontWeight:700 }}>LOCATION</span>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#334155' }}>{selectedUser.location.toUpperCase()}</span>
                </div>

                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'11px', lineHeight:1.6, borderLeft:'2px solid #D92D20', paddingLeft:'12px', margin:0, fontStyle:'italic', color: isDarkMode ? 'rgba(255,255,255,0.6)' : '#475569' }}>
                  &quot;{selectedUser.tagline}&quot;
                </p>

                <div style={{ height:'1px', background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

                <div style={{ border:`1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, borderRadius:'2px', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', textTransform:'uppercase', letterSpacing:'0.1em', color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)', fontWeight:700 }}>PRODUCTS</span>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'20px', fontWeight:700, color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{selectedUser.productsCount}</span>
                </div>

                <a href={selectedUser.profileUrl} target="_blank" rel="noopener noreferrer" style={{ display:'block', width:'100%', background: isDarkMode ? '#f8fafc' : '#0f172a', color: isDarkMode ? '#0f172a' : '#f8fafc', fontFamily:"'IBM Plex Mono',monospace", fontSize:'11px', fontWeight:700, padding:'12px', textAlign:'center', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.15em', borderRadius:'2px' }}
                  onMouseOver={e => (e.currentTarget.style.background = '#D92D20')}
                  onMouseOut={e => (e.currentTarget.style.background = isDarkMode ? '#f8fafc' : '#0f172a')}
                >
                  VIEW PROFILE →
                </a>
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer style={{ height:'32px', borderTop:`1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', textTransform:'uppercase', letterSpacing:'0.15em', color: isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.35)', background: isDarkMode ? '#000' : 'white' }}>
          <span>buildinprocess.com</span>
          <span>{selectedUser ? `{ LAT: ${selectedUser.lat.toFixed(4)}, LNG: ${selectedUser.lng.toFixed(4)} }` : ''}</span>
          <span>{BUILDER_DATA.length} builders</span>
        </footer>
      </div>
    </>
  )
}
