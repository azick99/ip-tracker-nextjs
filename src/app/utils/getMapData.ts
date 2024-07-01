
export const getMapData = async (ip: string) => {
  const res = await fetch(`https://ip-tracker-web.vercel.app/api/map?ipAddress=${ip}`)
  const mapData: MapData = await res.json()
  return mapData
}
