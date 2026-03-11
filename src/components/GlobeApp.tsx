/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import ProfileWidget from './ProfileWidget'
import AdSlot from './AdSlot'

/* eslint-disable @typescript-eslint/no-explicit-any */

const BUILDER_DATA = [
  { id: '1', username: 'kislay', name: 'Kislay', avatar: 'https://res.cloudinary.com/dxkpmcrel/image/upload/v1772955240/buildinprocess/profiles/user_69798b91b7529f4a0815a9a3.jpg', location: 'Bengaluru, India', lat: 12.9716, lng: 77.5946, tagline: 'Building Forg — OS for founders', productsCount: 3, profileUrl: 'https://buildinprocess.com/@kislay' },
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
  { id: '16', username: 'ghost_builder', name: 'Ghost Builder', avatar: '', location: 'Unknown', lat: null, lng: null, tagline: 'Building in the shadows.', productsCount: 0, profileUrl: 'https://buildinprocess.com/@ghost_builder' },
  { id: '17', username: 'nomad_dev', name: 'Nomad Dev', avatar: '', location: 'Everywhere', lat: null, lng: null, tagline: 'Digital nomad shipping from cafes.', productsCount: 4, profileUrl: 'https://buildinprocess.com/@nomad_dev' },
  { id: '18', username: 'hidden_gem', name: 'Hidden Gem', avatar: '', location: 'Classified', lat: null, lng: null, tagline: 'Stealth mode startup founder.', productsCount: 1, profileUrl: 'https://buildinprocess.com/@hidden_gem' },
]


const BUILDER_COUNTRIES = new Set(['IND', 'GBR', 'FRA', 'DEU', 'NGA', 'ZAF', 'SVK', 'VNM', 'CAN', 'USA'])

const DAY_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const NIGHT_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-night.jpg'
const BUMP_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-topology.png'
const COUNTRIES_GEOJSON = 'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'

export default function GlobeApp() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isNoLocationPanelOpen, setIsNoLocationPanelOpen] = useState(false)
  const globeContainerRef = useRef<HTMLDivElement>(null)
  const globeInstance = useRef<any>(null)

  const initGlobe = async () => {
    if (!globeContainerRef.current || !(window as any).Globe) return
    try {
      const countriesRes = await fetch(COUNTRIES_GEOJSON)
      const countries = await countriesRes.json()

      const globe = (window as any).Globe()(globeContainerRef.current)
        // SATELLITE TEXTURE — DO NOT CHANGE TO NULL
        .globeImageUrl(isDarkMode ? NIGHT_TEXTURE : DAY_TEXTURE)
        .bumpImageUrl(isDarkMode ? null : BUMP_TEXTURE)
        .backgroundColor('#050505')
        .showAtmosphere(true)
        .atmosphereColor(isDarkMode ? '#3a76f0' : '#4a90e2')
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
        .htmlElementsData(BUILDER_DATA.filter(u => u.lat && u.lng))
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlAltitude(0.06)
        .htmlElement((user: any) => {
          const el = document.createElement('div')
          el.style.cssText = 'position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;pointer-events:auto;'

          const displayName = user.displayName || user.name || user.username
          const avatarSrc = user.profileImage || user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=1a1a1a&textColor=ffffff&fontSize=40`

          const avatarHtml = `
            <img
              src="${avatarSrc}"
              alt="${displayName}"
              style="width:100%;height:100%;object-fit:cover;"
              onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=1a1a1a&textColor=ffffff&fontSize=40'"
            />
          `
          el.innerHTML = `
            <div style="width:32px;height:32px;border-radius:50%;border:2px solid #D92D20;background:#1A1A1A;overflow:hidden;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(217,45,32,0.6);transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">
              ${avatarHtml}
            </div>
            <div class="marker-tooltip" style="position:absolute;bottom:calc(100% + 6px);background:#D92D20;color:white;font-family:'IBM Plex Mono',monospace;font-size:10px;padding:2px 8px;border-radius:2px;white-space:nowrap;opacity:0;transition:opacity 0.2s;pointer-events:none;text-transform:uppercase;letter-spacing:0.05em;">
              ${displayName}
            </div>`
          const tooltip = el.querySelector('.marker-tooltip') as HTMLElement
          el.addEventListener('mouseenter', () => { if (tooltip) tooltip.style.opacity = '1' })
          el.addEventListener('mouseleave', () => { if (tooltip) tooltip.style.opacity = '0' })
          el.onclick = () => handleMarkerClick(user)
          return el
        })


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
      .bumpImageUrl(isDarkMode ? null : BUMP_TEXTURE)
      .backgroundColor(isDarkMode ? '#050505' : '#f8fafc')
      .atmosphereColor(isDarkMode ? '#3a76f0' : '#4a90e2')
  }, [isDarkMode])



  const GEOMAP: Record<string, { lat: number, lng: number }> = {
    'india': { lat: 20.5937, lng: 78.9629 },
    'bengaluru': { lat: 12.9716, lng: 77.5946 },
    'mumbai': { lat: 19.076, lng: 72.8777 },
    'delhi': { lat: 28.6139, lng: 77.209 },
    'pune': { lat: 18.5204, lng: 73.8567 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'uk': { lat: 55.3781, lng: -3.436 },
    'paris': { lat: 48.8566, lng: 2.3522 },
    'france': { lat: 46.2276, lng: 2.2137 },
    'berlin': { lat: 52.52, lng: 13.405 },
    'germany': { lat: 51.1657, lng: 10.4515 },
    'ho chi minh city': { lat: 10.8231, lng: 106.6297 },
    'vietnam': { lat: 14.0583, lng: 108.2772 },
    'bratislava': { lat: 48.1486, lng: 17.1077 },
    'slovakia': { lat: 48.669, lng: 19.699 },
    'lagos': { lat: 6.5244, lng: 3.3792 },
    'abuja': { lat: 9.0579, lng: 7.4951 },
    'nigeria': { lat: 9.082, lng: 8.6753 },
    'cape town': { lat: -33.9249, lng: 18.4241 },
    'south africa': { lat: -30.5595, lng: 22.9375 },
    'toronto': { lat: 43.6532, lng: -79.3832 },
    'canada': { lat: 56.1304, lng: -106.3468 },
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'usa': { lat: 37.0902, lng: -95.7129 },
  }

  const getLatLngFromLocation = (location: string) => {
    if (!location) return null
    const loc = location.toLowerCase().trim()
    for (const key in GEOMAP) {
      if (loc.includes(key)) return GEOMAP[key]
    }
    return null
  }

  const handleMarkerClick = (user: any) => {
    if (!globeInstance.current) return
    setSelectedUser(null)

    const coords = (user.lat && user.lng)
      ? { lat: user.lat, lng: user.lng }
      : getLatLngFromLocation(user.location)

    if (coords) {
      globeInstance.current.pointOfView({ lat: coords.lat, lng: coords.lng, altitude: 1.4 }, 1200)
    }
    setTimeout(() => setSelectedUser(user), 1200)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        body { margin:0; overflow:hidden; font-family:'IBM Plex Mono',monospace; background: ${isDarkMode ? '#050505' : '#f8fafc'}; transition: background 0.5s; color: ${isDarkMode ? '#f8fafc' : '#050505'}; }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:${isDarkMode ? '#1A1A1A' : '#e2e8f0'}; }
        .toggle-btn { position:relative;width:44px;height:22px;background:${isDarkMode ? '#222' : '#e2e8f0'};border-radius:11px;cursor:pointer;border:1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};transition:all 0.3s; }
        .toggle-dot { position:absolute;top:2px;left:${isDarkMode ? '24px' : '2px'};width:16px;height:16px;background:${isDarkMode ? '#f8fafc' : '#64748b'};border-radius:50%;transition:all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .ad-sidebar { position:fixed; top:56px; bottom:32px; width:180px; z-index:20; display:flex; flex-direction:column; gap:20px; background: ${isDarkMode ? 'rgba(5,5,5,0.6)' : 'rgba(248,250,252,0.6)'}; backdrop-filter: blur(4px); padding-top: 40px; }
        @media (max-width: 768px) { .ad-sidebar { display: none; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>

      <div style={{ display:'flex', flexDirection:'column', height:'100vh', width:'100%', background: isDarkMode ? '#050505' : '#f8fafc', color: isDarkMode ? '#f8fafc' : '#050505' }}>

        {/* Header */}
        <header style={{ position:'fixed', top:0, left:0, right:0, height:'56px', borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, background: isDarkMode ? 'rgba(5,5,5,0.8)' : 'rgba(248,250,252,0.8)', backdropFilter:'blur(8px)', zIndex:30, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px' }}>
          <div style={{ display:'flex', alignItems: 'center' }}>
            <a href="https://forg.to" target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:'12px', textDecoration:'none' }}>
              <img src="https://api.forg.to/logo.png" alt="forg.to" style={{ height:'24px', width:'auto' }} />
              <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ color:'#D92D20', fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'3px' }}>
                  FORG
                </div>
                <h1 style={{ fontFamily:"'Anton',Impact,sans-serif", fontSize:'22px', lineHeight:1, letterSpacing:'0.1em', textTransform:'uppercase', margin:0, color: isDarkMode ? '#f8fafc' : '#050505' }}>
                  GLOBE
                </h1>
              </div>
            </a>
          </div>

          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '12px' }}>
            <SearchBar
              builders={BUILDER_DATA}
              onSelectUser={(user) => handleMarkerClick(user)}
              isDarkMode={isDarkMode}
            />
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'24px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div
                onClick={() => setIsNoLocationPanelOpen(true)}
                style={{ cursor:'pointer', background:'#D92D20', color:'white', fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', fontWeight:700, padding:'4px 8px', borderRadius:'2px', letterSpacing:'0.05em', display:'flex', alignItems:'center', gap:'6px' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                ? {BUILDER_DATA.filter(b => !b.lat || !b.lng).length} BUILDERS — LOCATION UNKNOWN
              </div>

              {/* Theme Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                  {isDarkMode ? 'DARK' : 'LIGHT'}
                </span>
                <div className="toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                  <div className="toggle-dot" />
                </div>
              </div>

              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', gap:'6px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#D92D20' }} />
                {BUILDER_DATA.length} builders
              </div>
            </div>
          </div>
        </header>

        {/* Globe */}
        <main style={{ marginTop:'56px', flex:1, position:'relative', overflow:'hidden' }}>
          {/* Left Sidebar */}
          <aside className="ad-sidebar" style={{ left: 0, borderRight: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
            <AdSlot isDarkMode={isDarkMode} />
          </aside>

          {/* Right Sidebar */}
          <aside className="ad-sidebar" style={{ right: 0, borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
            <AdSlot isDarkMode={isDarkMode} />
          </aside>

          {loading && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', letterSpacing:'0.1em', zIndex:10, color: isDarkMode ? '#f8fafc' : '#050505', background: isDarkMode ? '#050505' : '#f8fafc' }}>
              LOADING BUILDERS...
            </div>
          )}
          <div ref={globeContainerRef} style={{ width:'100%', height:'100%' }} />

          {/* Profile Widget */}
          <ProfileWidget
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            isDarkMode={isDarkMode}
          />
        </main>

        {/* No-Location Builders Panel */}
        {isNoLocationPanelOpen && (
          <>
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 60 }} onClick={() => setIsNoLocationPanelOpen(false)} />
            <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '400px', background: isDarkMode ? '#0A0A0A' : '#fff', borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, zIndex: 70, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'slideIn 0.3s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#D92D20', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>FORG</div>
                  <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '24px', textTransform: 'uppercase', margin: 0, color: isDarkMode ? '#fff' : '#000' }}>UNKNOWN LOCATIONS</h2>
                </div>
                <button onClick={() => setIsNoLocationPanelOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>&times;</button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {BUILDER_DATA.filter(b => !b.lat || !b.lng).map((user: any) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setIsNoLocationPanelOpen(false);
                    }}
                    style={{ border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderRadius: '4px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: '16px', alignItems: 'center' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D92D20')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}
                  >
                    <img
                      src={(user as any).profileImage || (user as any).avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent((user as any).displayName || user.name || user.username)}&backgroundColor=1a1a1a&textColor=ffffff&fontSize=40`}
                      style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
                      alt={(user as any).displayName || user.name}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Anton', sans-serif", fontSize: '16px', textTransform: 'uppercase', color: isDarkMode ? '#fff' : '#000' }}>{(user as any).displayName || user.name}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#D92D20', fontWeight: 700 }}>@{user.username}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginTop: '4px' }}>{user.tagline || (user as any).bio}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer style={{ height:'32px', borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', fontFamily:"'IBM Plex Mono',monospace", fontSize:'9px', textTransform:'uppercase', letterSpacing:'0.15em', color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', background: isDarkMode ? '#050505' : '#f8fafc' }}>
          <span>forg.to</span>
          <span>{selectedUser && selectedUser.lat && selectedUser.lng ? `{ LAT: ${selectedUser.lat.toFixed(4)}, LNG: ${selectedUser.lng.toFixed(4)} }` : ''}</span>
          <span>{BUILDER_DATA.length} builders</span>
        </footer>
      </div>
    </>
  )
}
