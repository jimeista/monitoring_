import React, { useEffect, useState } from 'react'

export const Card = (props) => {
  const [classname, setClassName] = useState({})

  useEffect(() => {
    setTimeout(() => {
      setClassName('active')
    }, [(props.index + 1) * 3000])
  }, [])

  return (
    <div className={`${classname} card`}>
      <div className='card-row'>
        <span>DATA</span>
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
  )
}
