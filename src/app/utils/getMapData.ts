export const getMapData = async (ip: string) => {
    const res = await fetch(`http://localhost:3000/api/map?&ipAddress=${ip}`)
    const mapData: MapData = await res.json()
    return mapData
  }
  