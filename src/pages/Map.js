import React, { useEffect, useState } from 'react'

const Map = () => {
  const [data, setData] = useState()

  useEffect(() => {
    let block = JSON.parse(localStorage.getItem('block'))
    let coordinates = JSON.parse(localStorage.getItem('coordinates'))

    setData({ block, ...coordinates })

    return () => localStorage.removeItem('block')
  }, [])

  console.log(data)

  return <div>Map ...</div>
}

export default React.memo(Map)
