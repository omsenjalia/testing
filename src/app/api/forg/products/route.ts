import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  const apiKey = process.env.FORG_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.forg.to/v1/users/${username}/products`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: 'User products not found' }, { status: 404 })
      }
      if (res.status === 401) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      if (res.status === 429) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
      }
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
