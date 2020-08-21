import React from 'react'

export const Card = (props) => {
  return (
    <div className={'card'}>
      <span>DATA</span>
      <span className={'card-value'}>
        {props.value} {props.measurement}
      </span>
      <span>RU</span> <div>{props.ru}</div>
      <span>QZ</span>
      <div>{props.kz}</div>
    </div>
  )
}
