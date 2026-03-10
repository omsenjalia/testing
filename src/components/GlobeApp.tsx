"use client";

import React, { useState, useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { BUILDER_DATA, BUILDER_COUNTRIES } from '@/data/builders';
import { patchIndiaBorders } from '@/lib/patchIndiaBorders';
import { User } from '@/types/user';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function GlobeApp() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [countries, setCountries] = useState<any>(null);
  const [pulseAlt, setPulseAlt] = useState(0.04);
  const globeRef = useRef<GlobeMethods>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson');
        const data = await res.json();
        const patchedFeatures = patchIndiaBorders(data.features);
        setCountries({ ...data, features: patchedFeatures });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch countries', err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ altitude: 2.2 }, 0);
    }
  }, [loading]);

  // Pulse animation logic
  useEffect(() => {
    let t = 0;
    let requestRef: number;

    const animate = () => {
      t += 0.05;
      const pulse = 0.04 + Math.sin(t) * 0.01;
      setPulseAlt(pulse);
      requestRef = requestAnimationFrame(animate);
    };

    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, []);

  const handleMarkerClick = (user: User) => {
    if (!globeRef.current) return;
    setSelectedUser(null);
    globeRef.current.pointOfView({ lat: user.lat, lng: user.lng, altitude: 1.4 }, 1000);
    setTimeout(() => setSelectedUser(user), 900);
  };

  const theme = {
    bg: isDarkMode ? '#111111' : '#F3EFE7',
    globeOcean: isDarkMode ? '#111111' : '#DCD9D0',
    globeLand: '#2A2A2A',
    globeBorders: '#3A3A3A',
    highlightCap: isDarkMode ? 'rgba(243, 239, 231, 0.2)' : 'rgba(26,26,26,0.35)',
    highlightStroke: isDarkMode ? '#F3EFE7' : '#1A1A1A',
    textPrimary: isDarkMode ? '#F3EFE7' : '#1A1A1A',
    textMuted: isDarkMode ? 'rgba(255,255,255,0.4)' : '#888888',
    headerBg: isDarkMode ? 'rgba(0,0,0,0.6)' : '#F3EFE7',
    widgetBg: isDarkMode ? '#1A1A1A' : '#F3EFE7',
    widgetBorder: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #1A1A1A',
    buttonBg: isDarkMode ? '#F3EFE7' : '#1A1A1A',
    buttonText: isDarkMode ? '#1A1A1A' : '#F3EFE7',
    buttonHover: isDarkMode ? '#D4CFC6' : '#333333',
    footerBorder: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #1A1A1A',
  };

  return (
    <div style={{ backgroundColor: theme.bg }} className="fixed inset-0 flex flex-col transition-colors duration-500">
      {/* Header */}
      <header
        style={{
          backgroundColor: theme.headerBg,
          borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : '#1A1A1A'}`,
          backdropFilter: isDarkMode ? 'blur(8px)' : 'none'
        }}
        className="h-12 flex items-center justify-between px-6 z-20"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold text-[#cc2a2a] leading-tight tracking-wider uppercase">BuildInProcess</span>
          <h1 className="text-xl font-['Anton'] leading-none tracking-tight text-[var(--text-primary)]" style={{ color: theme.textPrimary }}>BUILDER GLOBE</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-[11px] font-mono font-medium" style={{ color: theme.textPrimary }}>
            {BUILDER_DATA.length} builders
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold" style={{ color: theme.textMuted }}>{isDarkMode ? 'DARK' : 'LIGHT'}</span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative w-11 h-[22px] rounded-full transition-colors border"
              style={{
                backgroundColor: isDarkMode ? '#222' : '#e2e8f0',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}
            >
              <div
                className="absolute top-[2px] w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  left: isDarkMode ? '24px' : '2px',
                  backgroundColor: isDarkMode ? '#F3EFE7' : '#1A1A1A'
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Globe Container */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[12px]" style={{ color: theme.textMuted }}>
            LOADING BUILDERS...
          </div>
        ) : (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor={theme.globeOcean}
            atmosphereColor={isDarkMode ? 'rgba(100,100,100,0.3)' : 'rgba(180,175,165,0.4)'}
            atmosphereAltitude={0.12}
            showAtmosphere={true}
            globeImageUrl={null}

            polygonsData={countries?.features || []}
            polygonAltitude={(d: any) => {
              const code = d.properties.ISO_A3 || d.properties.ADM0_A3;
              return BUILDER_COUNTRIES.has(code) ? pulseAlt : 0.005;
            }}
            polygonCapColor={(d: any) => {
              const code = d.properties.ISO_A3 || d.properties.ADM0_A3;
              return BUILDER_COUNTRIES.has(code) ? theme.highlightCap : theme.globeLand;
            }}
            polygonSideColor={() => '#1A1A1A'}
            polygonStrokeColor={(d: any) => {
              const code = d.properties.ISO_A3 || d.properties.ADM0_A3;
              return BUILDER_COUNTRIES.has(code) ? theme.highlightStroke : theme.globeBorders;
            }}

            htmlElementsData={BUILDER_DATA}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.06}
            htmlElement={(user: any) => {
              const el = document.createElement('div');
              el.className = 'marker-group relative flex flex-col items-center justify-center cursor-pointer';
              el.style.pointerEvents = 'auto';

              const initials = user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
              const avatarHtml = user.avatar
                ? `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
                   <div class="hidden w-full h-full items-center justify-center text-[10px] font-bold text-[#1A1A1A]/70 font-['IBM_Plex_Mono']">${initials}</div>`
                : `<div class="w-full h-full flex items-center justify-center text-[10px] font-bold text-[#1A1A1A]/70 font-['IBM_Plex_Mono']">${initials}</div>`;

              el.innerHTML = `
                <div class="w-8 h-8 rounded-full border border-[#1A1A1A] bg-[#E5E3DB] overflow-hidden flex items-center justify-center transition-transform hover:scale-110">
                  ${avatarHtml}
                </div>
                <div class="marker-tooltip absolute bottom-full mb-1 px-2 py-0.5 bg-[#1A1A1A] text-[#F3EFE7] font-['IBM_Plex_Mono'] text-[10px] whitespace-nowrap opacity-0 transition-all duration-200 pointer-events-none rounded-[2px] z-50">
                  ${user.name}
                </div>`;

              el.onclick = () => handleMarkerClick(user);
              return el;
            }}
          />
        )}

        {/* User Widget */}
        {selectedUser && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] z-30 animate-in fade-in zoom-in duration-300 rounded-[4px] overflow-hidden shadow-2xl"
            style={{
              backgroundColor: theme.widgetBg,
              border: theme.widgetBorder,
              color: theme.textPrimary
            }}
          >
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold text-[#cc2a2a] uppercase tracking-widest">BuildInProcess</span>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-[14px] hover:opacity-70 transition-opacity"
                >
                  [×]
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-[#1A1A1A] bg-[#E5E3DB] overflow-hidden flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold opacity-30">
                      {selectedUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <h2 className="text-lg font-bold leading-tight truncate">{selectedUser.name}</h2>
                  <span className="text-[12px] font-mono truncate" style={{ color: theme.textMuted }}>@{selectedUser.username}</span>
                </div>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#1A1A1A' }} />

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider" style={{ color: theme.textMuted }}>Location</span>
                <p className="text-[13px]">{selectedUser.location}</p>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#1A1A1A' }} />

              <div className="pl-3 border-l-2 border-[#cc2a2a]">
                <p className="text-[13px] italic font-mono leading-relaxed">
                  &quot;{selectedUser.tagline}&quot;
                </p>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#1A1A1A' }} />

              <div className="border border-[#1A1A1A] p-3 flex items-center justify-between" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : '#1A1A1A' }}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Products</span>
                <span className="text-xl font-bold leading-none">{selectedUser.productsCount}</span>
              </div>

              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#1A1A1A' }} />

              <a
                href={selectedUser.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center text-[11px] font-mono font-bold transition-colors"
                style={{
                  backgroundColor: theme.buttonBg,
                  color: theme.buttonText
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.buttonHover)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.buttonBg)}
              >
                VIEW PROFILE →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{ borderTop: theme.footerBorder }}
        className="h-8 flex items-center justify-between px-6 z-20 text-[9px] font-mono font-bold uppercase"
      >
        <span style={{ color: theme.textMuted }}>buildinprocess.com</span>
        <span style={{ color: theme.textMuted }}>
          {selectedUser ? `{ LAT: ${selectedUser.lat.toFixed(4)}, LNG: ${selectedUser.lng.toFixed(4)} }` : ''}
        </span>
        <span style={{ color: theme.textMuted }}>{BUILDER_DATA.length} builders</span>
      </footer>
    </div>
  );
}
