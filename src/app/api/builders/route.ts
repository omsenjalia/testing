/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  const apiKey = process.env.FORG_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    // 1. Fetch products from api.forg.to
    const productsRes = await fetch('https://api.forg.to/api/v1/products?limit=100', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!productsRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: productsRes.status })
    }

    const productsJson = await productsRes.json()
    const products = productsJson.data || []

    // 2. Extract unique owners and count products
    const ownersMap = new Map<string, { username: string, displayName: string, profileImage: string, productsCount: number }>()
    products.forEach((p: any) => {
      if (p.owner && p.owner.username) {
        const existing = ownersMap.get(p.owner.username)
        if (existing) {
          existing.productsCount += 1
        } else {
          ownersMap.set(p.owner.username, {
            username: p.owner.username,
            displayName: p.owner.displayName,
            profileImage: p.owner.profileImage,
            productsCount: 1
          })
        }
      }
    })

    const uniqueUsernames = Array.from(ownersMap.keys())
    const builders: any[] = []

    // 3. For each unique owner, fetch their profile to get location and geocode
    for (const username of uniqueUsernames) {
      try {
        const userRes = await fetch(`https://api.forg.to/api/v1/users/${username}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        })

        if (!userRes.ok) continue
        const userJson = await userRes.json()
        const userData = userJson.data
        const ownerInfo = ownersMap.get(username)!

        let lat = null
        let lng = null
        const locationLabel = userData?.location || "Unknown"

        if (userData && userData.location && !["Space", "Earth", "Everywhere"].includes(userData.location)) {
          // 4. Geocode estimation using Nominatim
          // Wait 1.1s to respect rate limits
          await new Promise(r => setTimeout(r, 1100))

          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(userData.location)}&format=json&limit=1`,
            { headers: { 'User-Agent': 'forg-globe/1.0' } }
          )

          if (geoRes.ok) {
            const geoJson = await geoRes.json()
            if (geoJson && geoJson.length > 0) {
              // Add a small random jitter (approx 2-5km) to prevent perfect overlap
              const jitter = () => (Math.random() - 0.5) * 0.08
              lat = parseFloat(geoJson[0].lat) + jitter()
              lng = parseFloat(geoJson[0].lon) + jitter()
            }
          }
        }

        builders.push({
          id: userData?.id || username,
          username: username,
          name: ownerInfo.displayName || username,
          avatar: ownerInfo.profileImage || "",
          location: locationLabel,
          lat: lat,
          lng: lng,
          tagline: userData?.bio || "",
          productsCount: ownerInfo.productsCount,
          profileUrl: `https://forg.to/@${username}`,
          isPremium: userData?.isPremium || false,
          stats: userData?.stats || { products: ownerInfo.productsCount, updates: 0, followers: 0, following: 0 }
        })
      } catch (err) {
        console.error(`Error processing builder ${username}:`, err)
      }
    }

    return NextResponse.json({ builders })
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
