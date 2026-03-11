/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.FORG_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.forg.to/v1/products?limit=50', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: res.status })
    }

    const json = await res.json()
    const products = json.data || []

    // Extract unique owners
    const ownersMap = new Map()
    products.forEach((p: any) => {
        if (p.owner && p.owner.username) {
            ownersMap.set(p.owner.username, p.owner)
        }
    })

    const builders = Array.from(ownersMap.values())
    return NextResponse.json(builders)
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
