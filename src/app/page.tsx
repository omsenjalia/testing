'use client'

import dynamic from 'next/dynamic'

const GlobeApp = dynamic(() => import('@/components/GlobeApp'), {
  ssr: false,
  loading: () => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'IBM Plex Mono, monospace', fontSize:'12px', letterSpacing:'0.1em', color:'#888', background:'#f8fafc' }}>
      LOADING BUILDERS...
    </div>
  )
})

export default function Page() {
  return <GlobeApp />
}
