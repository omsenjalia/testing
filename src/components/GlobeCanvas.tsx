"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Globe, { GlobeMethods } from "react-globe.gl"
import { User } from "@/types/user"
import { createUserMarker } from "./UserMarker"

interface GlobeCanvasProps {
  users: User[]
  onUserClick: (user: User) => void
  sidebarOpen: boolean
}

export default function GlobeCanvas({ users, onUserClick, sidebarOpen }: GlobeCanvasProps) {
  const globeRef = useRef<GlobeMethods>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [landData, setLandData] = useState<object[]>([])

  const updateDimensions = useCallback(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768
    const sidebarWidth = (isDesktop && sidebarOpen) ? 300 : 0
    setDimensions({
      width: (typeof window !== 'undefined' ? window.innerWidth : 1200) - sidebarWidth,
      height: typeof window !== 'undefined' ? window.innerHeight : 800,
    })
  }, [sidebarOpen])

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
      // Configure globe
      const controls = globeRef.current.controls() as { autoRotate: boolean; autoRotateSpeed: number }
      if (controls) {
        controls.autoRotate = !sidebarOpen
        controls.autoRotateSpeed = 0.5
      }

      // Initial position if not already set
      if (!sidebarOpen) {
          globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
      }
    }
  }, [sidebarOpen])

  const handlePointClick = (u: User) => {
    onUserClick(u)

    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: u.lat,
        lng: u.lng,
        altitude: 1.5
      }, 1000)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#111111] z-0 flex">
      <div
        className="transition-all duration-300 ease-in-out h-full overflow-hidden"
        style={{ width: dimensions.width }}
      >
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#111111"
          showAtmosphere={false}

          // Ocean color
          globeImageUrl={undefined}

          // Polygons for land masses
          polygonsData={landData}
          polygonCapColor={() => '#2a2a2a'} // Land color
          polygonSideColor={() => '#2a2a2a'}
          polygonStrokeColor={() => '#3d3d3d'} // Border color

          htmlElementsData={users}
          htmlElement={(d: object) => createUserMarker(d as User, () => handlePointClick(d as User))}
        />
      </div>
    </div>
  )
}
