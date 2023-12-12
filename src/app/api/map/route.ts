import { NextResponse } from 'next/server'

const API_KEY: string = process.env.MAP_API_KEY as string

const MAP_DATA_SOURCE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
/// work with Nexts/Docs
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ip = searchParams.get('ipAddress')
  const res = await fetch(`${MAP_DATA_SOURCE_URL}&ipAddress=${ip}`)
  const mapData: MapData = await res.json()
  return NextResponse.json(mapData)
}

