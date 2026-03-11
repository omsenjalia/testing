/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.FORG_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    // 1. Fetch recent products to find active builders
    const productsRes = await fetch('https://api.forg.to/v1/products?limit=50', {
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

    // 2. Extract unique usernames
    const usernames = Array.from(new Set(products.map((p: any) => p.owner?.username).filter(Boolean)))

    // 3. Fetch full profiles in parallel to get location data
    const profilePromises = usernames.map(async (username) => {
      try {
        const res = await fetch(`https://api.forg.to/v1/users/${username}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        })
        if (res.ok) return await res.json()
        return null
      } catch (err) {
        console.error(`Failed to fetch profile for ${username}:`, err)
        return null
      }
    })

    const profiles = await Promise.all(profilePromises)
    const builders = profiles.filter(Boolean)

    return NextResponse.json(builders)
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
