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
          const GEOMAP: Record<string, { lat: number; lng: number }> = {
            'india': { lat: 20.5937, lng: 78.9629 }, 'bengaluru': { lat: 12.9716, lng: 77.5946 },
            'bangalore': { lat: 12.9716, lng: 77.5946 }, 'mumbai': { lat: 19.076, lng: 72.8777 },
            'delhi': { lat: 28.6139, lng: 77.209 }, 'pune': { lat: 18.5204, lng: 73.8567 },
            'chennai': { lat: 13.0827, lng: 80.2707 }, 'london': { lat: 51.5074, lng: -0.1278 },
            'uk': { lat: 55.3781, lng: -3.436 }, 'united kingdom': { lat: 55.3781, lng: -3.436 },
            'paris': { lat: 48.8566, lng: 2.3522 }, 'france': { lat: 46.2276, lng: 2.2137 },
            'berlin': { lat: 52.52, lng: 13.405 }, 'germany': { lat: 51.1657, lng: 10.4515 },
            'ho chi minh city': { lat: 10.8231, lng: 106.6297 }, 'vietnam': { lat: 14.0583, lng: 108.2772 },
            'bratislava': { lat: 48.1486, lng: 17.1077 }, 'slovakia': { lat: 48.669, lng: 19.699 },
            'lagos': { lat: 6.5244, lng: 3.3792 }, 'abuja': { lat: 9.0579, lng: 7.4951 },
            'nigeria': { lat: 9.082, lng: 8.6753 }, 'cape town': { lat: -33.9249, lng: 18.4241 },
            'south africa': { lat: -30.5595, lng: 22.9375 }, 'toronto': { lat: 43.6532, lng: -79.3832 },
            'canada': { lat: 56.1304, lng: -106.3468 }, 'san francisco': { lat: 37.7749, lng: -122.4194 },
            'new york': { lat: 40.7128, lng: -74.006 }, 'usa': { lat: 37.0902, lng: -95.7129 },
            'united states': { lat: 37.0902, lng: -95.7129 }, 'singapore': { lat: 1.3521, lng: 103.8198 },
            'tokyo': { lat: 35.6762, lng: 139.6503 }, 'japan': { lat: 36.2048, lng: 138.2529 },
            'sydney': { lat: -33.8688, lng: 151.2093 }, 'australia': { lat: -25.2744, lng: 133.7751 },
            'dubai': { lat: 25.2048, lng: 55.2708 }, 'uae': { lat: 23.4241, lng: 53.8478 },
            'amsterdam': { lat: 52.3676, lng: 4.9041 }, 'netherlands': { lat: 52.1326, lng: 5.2913 },
            'madrid': { lat: 40.4168, lng: -3.7038 }, 'spain': { lat: 40.4637, lng: -3.7492 },
            'rome': { lat: 41.9028, lng: 12.4964 }, 'italy': { lat: 41.8719, lng: 12.5674 },
            'nairobi': { lat: -1.2921, lng: 36.8219 }, 'kenya': { lat: -0.0236, lng: 37.9062 },
            'sao paulo': { lat: -23.5505, lng: -46.6333 }, 'brazil': { lat: -14.235, lng: -51.9253 },
            'mexico city': { lat: 19.4326, lng: -99.1332 }, 'mexico': { lat: 23.6345, lng: -102.5528 },
          }
          const loc = userData.location.toLowerCase().trim()
          for (const key in GEOMAP) {
            if (loc.includes(key)) {
              const jitter = () => (Math.random() - 0.5) * 0.08
              lat = GEOMAP[key].lat + jitter()
              lng = GEOMAP[key].lng + jitter()
              break
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
