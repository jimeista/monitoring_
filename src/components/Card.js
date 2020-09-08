import React, { useEffect, useState } from 'react'

export const Card = (props) => {
  const [classname, setClassName] = useState({})

  useEffect(() => {
    const timeout = setIndexTimeOut(props.index, props.length)
    setTimeout(() => {
      setClassName('active')
    }, [timeout * 1000])
  }, [])

  return (
    <div className={`${classname} card card_style_main`}>
      <div id={props.id}>
        <div className='card-row'>
          <span className='text_data_style'>DATA</span>
          <span className={'card-value'}>
            {props.value} {props.measurement}
          </span>
        </div>
        <div className='card-bordered' />
        <div className='card-row'>
          <span>RU</span> <div>{props.ru}</div>
        </div>
        <div className='card-bordered' />
        <div className='card-row'>
          <span>QZ</span>
          <div>{props.kz}</div>
        </div>
      </div>
    </div>
  )
}

const setIndexTimeOut = (index, length) => {
  switch (index) {
    case 1:
      return 3
    case 2:
      return 12
    case 3:
      return 6
    case 4:
      return 15
    case 5:
      return 9
    case 6:
      return 18
    case 7:
      return 21
    case 8:
      return length === 9 || length === 10 ? 27 : length === 8 ? 24 : 30
    case 9:
      return 24
    case 10:
      return length === 10 ? 30 : 33
    case 11:
      return 27
    case 12:
      return 36
    case 13:
      return 39
    case 14:
      return length === 15 || length === 16 ? 45 : length === 14 ? 42 : 48
    case 15:
      return 42
    case 16:
      return length === 16 ? 48 : 51
    case 17:
      return 45
    default:
      return null
  }
}
