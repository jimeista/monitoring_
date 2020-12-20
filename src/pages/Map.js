import React, { useEffect, useState } from 'react'

const Map = (props) => {
  const [data, setData] = useState()

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false)

    return () => window.removeEventListener('message', receiveMessage, false)
  }, [])

  function receiveMessage(event) {
    // if (event.origin !== 'https://sc.smartalmaty.kz') return

    console.log(event)
    console.log(event.data)
    event.source.postMessage(
      'hi there yourself!  the secret response ' + 'is: rheeeeet!',
      event.origin
    )
  }

  return <div>Map ...</div>
}

export default React.memo(Map)
