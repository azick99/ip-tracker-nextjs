import { NextResponse } from 'next/server'
const API_KEY: string = process.env.MAP_API_KEY as string

if (!API_KEY) {
  throw new Error('MAP_API_KEY is not set in the environment')
}

const MAP_DATA_SOURCE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`

/// work with Nexts/Docs
export async function GET(request: Request) {
  const headers = new Headers()
  headers.set('Access-Control-Allow-Origin', '*') // Set to the appropriate origin or '*' for any origin

  try {
    const { searchParams } = new URL(request.url)
    const ip = searchParams.get('ipAddress')
    const res = await fetch(`${MAP_DATA_SOURCE_URL}&ipAddress=${ip}`)

    // Handle non-OK response
    if (!res.ok) {
      return NextResponse.error()
    }

    const mapData: MapData = await res.json()
    return NextResponse.json(mapData, { headers })
  } catch (error) {
    console.error('Error in GET function:', error)
    return NextResponse.error()
  }
}
