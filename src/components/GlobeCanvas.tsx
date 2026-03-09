"use client"

import { useEffect, useRef, useState, useCallback } from "react"
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [landData, setLandData] = useState<object[]>([])

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: typeof window !== 'undefined' ? window.innerWidth : 1200,
      height: typeof window !== 'undefined' ? window.innerHeight : 800,
    })
  }, [])

  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [updateDimensions])

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

  const handlePointClick = (u: User) => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: u.lat, lng: u.lng, altitude: 1.8 },
        800
      )
    }

    // Show widget after fly-to:
    setTimeout(() => {
      onUserClick(u)
    }, 850)
  }

  // Create a base64 gray pixel for globe texture
  // This is #c8c3b8
  const globeTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8vG9vPQAI9gNReZis6wAAAABJRU5ErkJggg==";

  return (
    <div className="fixed inset-0 bg-[#c8c3b8] z-0 flex">
      <div
        className="h-full overflow-hidden"
        style={{ width: dimensions.width }}
      >
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#c8c3b8"
          showAtmosphere={false}

          // Ocean color/texture
          globeImageUrl={globeTexture}

          // Polygons for land masses
          polygonsData={landData}
          polygonCapColor={() => '#2a2a2a'} // Land color
          polygonSideColor={() => '#2a2a2a'}
          polygonStrokeColor={() => '#555555'} // Border color

          htmlElementsData={users}
          htmlElement={(d: object) => createUserMarker(d as User, () => handlePointClick(d as User))}
        />
      </div>
    </div>
  )
}
