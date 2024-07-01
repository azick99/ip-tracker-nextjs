import { NextResponse } from 'next/server'
const API_KEY: string = process.env.API_KEY as string

const MAP_DATA_SOURCE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`

const defaultMapData: MapData = {
  ip: '83.24.213.173',
  location: {
    country: 'PL',
    region: 'Warshawa',
    city: 'Warsaw',
    lat: 52.248869,
    lng: 21.02202,
    timezone: '+02:00',
  },
  isp: 'Orange Polska Spolka Akcyjna',
  code: 200,
}

export async function GET(request: Request) {
  const headers = new Headers()
  headers.set('Access-Control-Allow-Origin', '*') // Set to the appropriate origin or '*' for any origin

  try {
    const { searchParams } = new URL(request.url)
    const ip = searchParams.get('ipAddress')
    const res = await fetch(`${MAP_DATA_SOURCE_URL}&ipAddress=${ip}`)
    // Handle non-OK response
    if (ip === null) {
      return NextResponse.json(defaultMapData, { headers })
    }

    const mapData: MapData = await res.json()
    return NextResponse.json(mapData, { headers })
  } catch (error) {
    console.error('Error in GET function:', error)
    return NextResponse.error()
  }
}
