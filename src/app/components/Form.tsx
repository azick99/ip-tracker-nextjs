'use client'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import IpInfoContainer from './IpInfoContainer'
import Image from 'next/image'
import { getMapData } from '../api/map/route'
import MapComponent from './Map'
import Spinner from './Spinner'

// type FormProps = {
//   ipData: MapData
//   setIpData: Dispatch<SetStateAction<MapData>>
// }

const Form = () => {
  const [ipData, setIpData] = useState<MapData>({} as MapData)
  const [text, setText] = useState<string>('')
  const [status, setStatus] = useState<'submitting' | 'successed' | 'idle'>(
    'idle'
  )

  const handleOnClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setStatus('submitting')
      const data = await getMapData(text)
      setIpData(data)
      setStatus('successed')
    } catch (error) {
      console.log(error)
    }
  }

  const location = ipData.location
  const noData = Object.keys(ipData).length === 0
  return (
    <>
      <form onSubmit={handleOnClick}>
        <h1 className="fs-700 text-white text-medium">IP Address Tracker</h1>
        <div className="input-con">
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            name="text"
            value={text}
            placeholder="Search for any IP address or domain"
            disabled={status === 'submitting'}
          />

          <span>
            {status === 'submitting' ? (
              <button
                disabled
                type="button"
                className="bg-primary/80 rounded-r-2xl px-6 py-5"
              >
                <Spinner />
              </button>
            ) : (
              <button
                type="submit"
                className=" bg-primary rounded-r-2xl px-6 py-5"
              >
                <Image
                  src="icon-arrow.svg"
                  alt="arrow"
                  width={15}
                  height={15}
                />
              </button>
            )}
          </span>
        </div>
        <div>
          <IpInfoContainer ipData={ipData} noData={noData} />
        </div>
      </form>
      {location?.lat || location?.lng ? (
        <MapComponent lat={location.lat} lng={location.lng} />
      ) : (
        <MapComponent lat={52.248869} lng={21.02202} />
      )}
    </>
  )
} 

export default Form
