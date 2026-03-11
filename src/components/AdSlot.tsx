'use client'

import React from 'react'

interface AdSlotProps {
  isDarkMode: boolean
}

export default function AdSlot({ isDarkMode }: AdSlotProps) {
  // 300x250 standard IAB medium rectangle proportions
  // 300/250 = 1.2
  // If width is 180px, height should be 180 / 1.2 = 150px

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'center'
    }}>
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '10px',
        textTransform: 'uppercase',
        color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
        letterSpacing: '0.05em'
      }}>
        Advertisement
      </span>
      <div style={{
        width: '180px',
        height: '150px',
        border: `1.5px dashed ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
      }}>
        {/* TODO: Replace with real ad network embed */}
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '9px',
          color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
        }}>
          300×250
        </span>
      </div>
    </div>
  )
}
