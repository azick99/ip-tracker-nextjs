'use client'
import { Suspense, useState } from 'react'
import Form from './components/Form'
import IpInfoContainer from './components/IpInfoContainer'
import MapComponent from './components/Map'

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
export default function Home() {
  const [ipData, setIpData] = useState(defaultMapData)
  let location = ipData.location
  if (ipData.code === 422) {
    location = defaultMapData.location
  }

  return (
    <main>
      <div className="form-container">
        <h1 className="fs-700 text-white text-medium">IP Address Tracker</h1>
        <div className="input-con">
          <Form setIpData={setIpData} />
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <IpInfoContainer ipData={ipData} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <MapComponent lat={location.lat} lng={location.lng} />
      </Suspense>
    </main>
  )
}
