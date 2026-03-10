"use client"

import dynamic from "next/dynamic"

// Dynamic import for GlobeApp component (browser-only)
const GlobeApp = dynamic(() => import("@/components/GlobeApp"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#F3EFE7] flex items-center justify-center font-mono text-[12px] text-[#888888]">
      LOADING BUILDERS...
    </div>
  ),
})

export default function Home() {
  return (
    <main>
      <GlobeApp />
    </main>
  )
}
