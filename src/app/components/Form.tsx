'use client'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { getMapData } from '../utils/getMapData'
import arrowIcon from '../../assets/icon-arrow.svg'
function SubmitButton() {
  return (
    <button type="submit" className=" bg-primary rounded-r-2xl px-6 py-4">
      <Image
        src={arrowIcon}
        alt="arrow"
        width={15}
        height={15}
        loading="eager"
      />
    </button>
  )
}



const Form = ({
  setIpData,
}: {
  setIpData: Dispatch<SetStateAction<MapData>>
}) => {
  const [text, setText] = useState<string>('')
  const handleSubmitIp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setText('')
    try {
      const mapData = await getMapData(text)

      setIpData(mapData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex" onSubmit={handleSubmitIp}>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        name="ipAddress"
        id="ipAddress"
        value={text}
        placeholder="Search for any IP address or domain"
      />
      <SubmitButton />
    </form>
  )
}
export default Form

//  status === 'submitting' ? (
//   <button
//     disabled
//     type="button"
//     className="bg-primary/80 rounded-r-2xl px-6 py-4"
//   >
//
//   </button>
