"use client"

import { useEffect, useRef, useState } from "react"
import Globe, { GlobeMethods } from "react-globe.gl"
import { User } from "@/types/user"
import { createUserMarker } from "./UserMarker"

interface GlobeCanvasProps {
  users: User[]
  onUserClick: (user: User) => void
  selectedUser: User | null
}

export default function GlobeCanvas({ users, onUserClick, selectedUser }: GlobeCanvasProps) {
  const globeRef = useRef<GlobeMethods>()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [landData, setLandData] = useState<object[]>([])

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Fetch land GeoJSON for monochrome look
    fetch('https://vasturiano.github.io/react-globe.gl/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        if (data && data.features) {
          setLandData(data.features as object[])
        }
      })
      .catch(err => console.error("Failed to fetch land data", err));
  }, [])

  useEffect(() => {
    if (globeRef.current) {
      // Disable auto-rotation
      const controls = globeRef.current.controls() as { autoRotate: boolean; autoRotateSpeed: number }
      if (controls) {
        controls.autoRotate = false
        controls.autoRotateSpeed = 0
      }

      // Initial position if not already set
      if (!selectedUser) {
        globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Create a base64 gray pixel for globe texture
  // This is #c8c3b8
  const globeTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8vG9vPQAI9gNReZis6wAAAABJRU5ErkJggg==";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHtmlElementClick = (el: any) => {
    const userId = (el as HTMLElement).getAttribute('data-user-id')
      ?? (el as HTMLElement).closest('[data-user-id]')?.getAttribute('data-user-id')
    if (!userId) return
    const user = users.find((u) => u.id === userId)
    if (!user) return

    // Fly camera to user
    globeRef.current?.pointOfView(
      { lat: user.lat, lng: user.lng, altitude: 1.8 },
      800
    )

    // Show widget after fly-to
    setTimeout(() => {
      onUserClick(user)
    }, 850)
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#c8c3b8"
        atmosphereColor="#c8c3b8"
        atmosphereAltitude={0.1}
        showAtmosphere={false}

        // Ocean color/texture
        globeImageUrl={globeTexture}

        // Polygons for land masses
        polygonsData={landData}
        polygonCapColor={() => '#2a2a2a'} // Land color
        polygonSideColor={() => '#2a2a2a'}
        polygonStrokeColor={() => '#555555'} // Border color

        htmlElementsData={users}
        htmlElement={(d: object) => createUserMarker(d as User)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...({ onHtmlElementClick } as any)}
      />
    </div>
  )
}
