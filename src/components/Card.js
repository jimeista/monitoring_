import React, { useEffect, useState } from 'react'

export const Card = (props) => {
  const [classname, setClassName] = useState('')

  useEffect(() => {
    const timeout = setIndexTimeOut(props.index, props.length)
    setTimeout(() => {
      setClassName('active')
    }, [timeout * 1000])

    return () => setClassName('')
  }, [props.index, props.length])

  return (
    <div className={`${classname} card card_style_main`}>
      <div id={'style_img' + props.cardId} className='img_p' />
      <div id={props.cardId}>
        <div className='card-row'>
          <span className='text_data_style'>DATA</span>
          <span className={'card-value'}>
            {props.value} {props.measurement}
          </span>
        </div>
        <div className='card-bordered' />
        <div className='card-row'>
          <span>RU</span>
          <div>{props.ru}</div>
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
      return 23
    case 8:
      return length === 9 || length === 10 ? 29 : length === 8 ? 26 : 32
    case 9:
      return 26
    case 10:
      return length === 10 ? 32 : 35
    case 11:
      return 29
    case 12:
      return 38
    case 13:
      return 43
    case 14:
      return length === 15 || length === 16 ? 49 : length === 14 ? 46 : 52
    case 15:
      return 46
    case 16:
      return length === 16 ? 52 : 55
    case 17:
      return 49
    default:
      return null
  }
}
