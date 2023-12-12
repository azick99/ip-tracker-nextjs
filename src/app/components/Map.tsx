'use client'
import L, { LatLngExpression } from 'leaflet'
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css'

type MapComponentProps = {
  lat: number; lng: number 
}


function MapComponent({ lat, lng }: MapComponentProps) {
  useEffect(() => {
    const map = L.map('map').setView([lat, lng], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map)

    const marker = L.marker([lat, lng]).addTo(map)
    marker.bindPopup('<b>You are here!</b>').openPopup()

    const popup = L.popup()

    function onMapClick(e: { latlng: LatLngExpression }) {
      popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map)
      ;[lat, lng]
    }

    map.on('click', onMapClick)

    return () => {
      map.off('click', onMapClick)
      map.remove()
    }
  }, [lat, lng])

  return <div id="map" style={{ height: '79vh' }} />
}

export default MapComponent
